import http from 'node:http'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(root, 'data')
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(dataDir, `${name}.json`), 'utf8'))

const accounts = readJson('accounts')
const catalogue = readJson('catalogue')
let conversations = readJson('conversations')
const bookings = readJson('bookings')
const staff = readJson('staff')
const jobTemplates = staff.map((job) => ({ ...job }))
let admin = readJson('admin')
const payments = new Map()
const createdProposals = new Map()
const uploadedPhotos = new Map()
let nextPhotoNumber = 2

function nextAdminId() {
  const highestId = admin.accounts.reduce((highest, account) => {
    const match = /^u-admin-(\d+)$/.exec(account.id)
    return match ? Math.max(highest, Number(match[1])) : highest
  }, 1)

  return `u-admin-${highestId + 1}`
}

const mode = process.env.MOCK_MODE || 'normal'
const port = Number(process.env.PORT || 3001)
const delay = mode === 'slow' ? 2000 : mode === 'normal' ? 150 : 0

const tokens = new Map()

const sendJson = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(body))
}

const error = (code, message, fields) => ({
  error: { code, message, ...(fields ? { fields } : {}) },
})

const readBody = (req) => new Promise((resolve, reject) => {
  let text = ''
  req.on('data', (chunk) => { text += chunk })
  req.on('end', () => {
    if (!text) return resolve({})
    try { resolve(JSON.parse(text)) } catch { reject(new Error('Invalid JSON')) }
  })
})

const readMultipart = async (req) => {
  const contentType = req.headers['content-type'] || ''
  const boundary = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i)
  if (!boundary) {
    const cause = new Error('Invalid multipart request.')
    cause.statusCode = 400
    throw cause
  }

  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > 10 * 1024 * 1024 + 64 * 1024) {
      const cause = new Error('Ảnh tải lên vượt quá giới hạn 10 MB.')
      cause.statusCode = 400
      throw cause
    }
    chunks.push(chunk)
  }

  const data = Buffer.concat(chunks)
  const delimiter = Buffer.from(`--${boundary[1] || boundary[2]}`)
  const fields = {}
  let cursor = 0
  while ((cursor = data.indexOf(delimiter, cursor)) !== -1) {
    cursor += delimiter.length
    if (data.subarray(cursor, cursor + 2).toString() === '--') break
    if (data.subarray(cursor, cursor + 2).toString() === '\r\n') cursor += 2
    const headerEnd = data.indexOf(Buffer.from('\r\n\r\n'), cursor)
    if (headerEnd < 0) break
    const headers = data.subarray(cursor, headerEnd).toString('utf8')
    const nextDelimiter = data.indexOf(delimiter, headerEnd + 4)
    if (nextDelimiter < 0) break
    let valueEnd = nextDelimiter
    if (data.subarray(valueEnd - 2, valueEnd).toString() === '\r\n') valueEnd -= 2
    const disposition = headers.match(/content-disposition:\s*form-data;([^]*)/i)
    const name = disposition?.[1].match(/(?:^|;)\s*name="([^"]+)"/i)?.[1]
    if (name) {
      const filename = disposition[1].match(/(?:^|;)\s*filename="([^"]*)"/i)?.[1]
      const type = headers.match(/content-type:\s*([^\r\n]+)/i)?.[1]?.trim() || ''
      const value = data.subarray(headerEnd + 4, valueEnd)
      fields[name] = filename === undefined
        ? value.toString('utf8')
        : { filename, type, data: value }
    }
    cursor = nextDelimiter
  }
  return fields
}

const reminderFor = (booking) => ({
  id: `rem-${booking.id.slice(3)}-24h`,
  title: 'Nhắc lịch make-up và chụp trước 24 giờ',
  scheduledAt: reminderTime(booking),
  channel: 'Email',
  recipient: Object.keys(accounts).find((email) => accounts[email].id === booking.customerId),
  emailStatus: 'Đã gửi',
})

const toMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

const timeRangeOverlaps = (requested, busyRange) => {
  const [start, end] = requested.split('–').map(toMinutes)
  const [busyStart, busyEnd] = busyRange.split('–').map(toMinutes)
  return end === undefined ? busyStart <= start && start < busyEnd : start < busyEnd && busyStart < end
}

const staffUnavailability = [
  { date: '2026-10-24', name: 'Mai', time: '08:00–12:00' },
]
const alternateSlots = [
  { makeup: '13:00–14:00', shoot: '14:00–16:00', room: 'Phòng B' },
  { makeup: '16:00–17:00', shoot: '17:00–19:00', room: 'Phòng B' },
]

const holdsSchedule = (booking) => !booking.cancelled && ['Đã đặt lịch', 'Hoàn thành'].includes(booking.status)

const findClash = ({ date, time, room, staffNames, excludeBookingId }) => {
  const unavailable = staffUnavailability.find((entry) => entry.date === date
    && staffNames.includes(entry.name) && timeRangeOverlaps(time, entry.time))
  if (unavailable) {
    return `${unavailable.name} bận ${unavailable.time} nên không thể nhận make-up lúc ${time.slice(0, 5)}.`
  }

  for (const booking of bookings) {
    if (booking.id === excludeBookingId || booking.date !== date || !holdsSchedule(booking)) continue
    const job = staff.find((item) => item.bookingId === booking.id
      && staffNames.includes(item.staffName) && timeRangeOverlaps(time, item.time))
    if (job) return `${job.staffName} bận ${job.time} (booking ${booking.id}).`
    if (booking.room.toLowerCase() === room.toLowerCase() && timeRangeOverlaps(time, booking.shoot)) {
      return `${booking.room} đã được đặt ${booking.shoot} (booking ${booking.id}).`
    }
  }
  return ''
}

const scheduleClashes = (schedule, jobs = jobTemplates, excludeBookingId) => {
  const makeupJob = jobs.find((job) => job.id.endsWith('-makeup'))
  const shootJob = jobs.find((job) => job.id.endsWith('-photo'))
  const makeup = findClash({
    date: schedule.date, time: schedule.makeup, room: makeupJob.room,
    staffNames: [makeupJob.staffName], excludeBookingId,
  })
  const shoot = findClash({
    date: schedule.date, time: schedule.shoot, room: schedule.room,
    staffNames: [shootJob.staffName], excludeBookingId,
  })
  return { ...(makeup && { makeup }), ...(shoot && { shoot }) }
}

const jobsFor = (booking) => staff.filter((job) => job.bookingId === booking.id)

const CLOSED_BOOKING_MESSAGE = 'Booking đã hoàn thành hoặc đã hủy nên không thể đổi hay hủy lịch.'
const SCHEDULE_FIELDS = ['date', 'makeup', 'shoot', 'room']

const isDate = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value)
}

const isTimeRange = (value) => {
  if (typeof value !== 'string') return false
  const found = value.match(/^([01]\d|2[0-3]):([0-5]\d)–([01]\d|2[0-3]):([0-5]\d)$/)
  return Boolean(found) && `${found[3]}${found[4]}` > `${found[1]}${found[2]}`
}

const isHttpUrl = (value) => {
  if (typeof value !== 'string' || value.length > 2000) return false
  try { return ['http:', 'https:'].includes(new URL(value).protocol) } catch { return false }
}

const bookingPatchErrors = (body) => {
  const fields = {}
  const keys = Object.keys(body)
  if (!keys.length) fields.body = 'Gửi ít nhất một trường cần thay đổi.'
  for (const key of keys) {
    if (![...SCHEDULE_FIELDS, 'finalFileLink', 'cancel'].includes(key)) fields[key] = 'Trường này không được phép thay đổi.'
  }
  if ('date' in body && !isDate(body.date)) fields.date = 'Nhập ngày theo YYYY-MM-DD.'
  for (const key of ['makeup', 'shoot']) {
    if (key in body && !isTimeRange(body[key])) fields[key] = 'Nhập khung giờ theo HH:MM–HH:MM, giờ kết thúc sau giờ bắt đầu.'
  }
  if ('room' in body && (typeof body.room !== 'string' || !body.room.trim() || body.room.length > 100)) fields.room = 'Nhập tên phòng từ 1 đến 100 ký tự.'
  if ('finalFileLink' in body && !isHttpUrl(body.finalFileLink)) fields.finalFileLink = 'Nhập đường dẫn http hoặc https hợp lệ.'
  if ('cancel' in body && (body.cancel !== true || keys.length !== 1)) fields.cancel = 'Chỉ gửi riêng cancel = true.'
  return fields
}

const applySchedule = (booking) => {
  for (const job of jobsFor(booking)) {
    job.date = booking.date
    if (job.id.endsWith('-makeup')) job.time = booking.makeup
    if (job.id.endsWith('-photo')) {
      job.time = booking.shoot
      job.room = booking.room
    }
  }
  booking.reminders = booking.reminders.map((reminder) => ({ ...reminder, scheduledAt: reminderTime(booking) }))
}

const reminderTime = (booking) => {
  const dayBefore = new Date(`${booking.date}T00:00:00Z`)
  dayBefore.setUTCDate(dayBefore.getUTCDate() - 1)
  return `${dayBefore.toISOString().slice(0, 10)}T${booking.makeup.slice(0, 5)}:00+07:00`
}

const rejectCancelled = (res, booking) => {
  if (!booking?.cancelled) return false
  sendJson(res, 409, error('CONFLICT', 'Booking đã bị studio hủy.'))
  return true
}

const bearerToken = (req) => {
  const authorization = req.headers.authorization || ''
  return authorization.match(/^Bearer\s+(.+)$/i)?.[1] || ''
}

const caller = (req) => tokens.get(bearerToken(req)) || null

const forbidden = (req, res, allowed) => {
  const user = caller(req)
  if (!allowed.includes(user?.role)) {
    sendJson(res, user ? 403 : 401, error(user ? 'FORBIDDEN' : 'UNAUTHORIZED', user ? 'Không có quyền truy cập.' : 'Thiếu hoặc sai token.'))
    return true
  }
  return false
}

const match = (pattern, pathname) => {
  const names = []
  const regex = new RegionsToRegex(pattern, names)
  const found = pathname.match(regex)
  if (!found) return null
  return Object.fromEntries(names.map((name, index) => [name, found[index + 1]]))
}

function RegionsToRegex(pattern, names) {
  const source = pattern.split('/').map((segment) => {
    if (segment.startsWith(':')) {
      names.push(segment.slice(1))
      return '([^/]+)'
    }
    return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }).join('/')
  return new RegExp(`^${source}$`)
}

const server = http.createServer(async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, delay))

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
  const pathname = url.pathname
  const method = req.method || 'GET'
  let status = 200

  const respond = (resStatus, body) => {
    status = resStatus
    sendJson(res, resStatus, body)
  }

  try {
    if (mode === 'error' && !(method === 'POST' && pathname === '/api/auth/login')) {
      status = 500
      respond(status, error('INTERNAL_ERROR', 'Mô phỏng lỗi máy chủ.', {}))
      return
    }

    if (method === 'POST' && pathname === '/api/auth/login') {
      const body = await readBody(req)
      const account = accounts[body.email]
      if (!account || account.password !== body.password) {
        status = 401
        sendJson(res, status, error('UNAUTHORIZED', 'E-mail hoặc mật khẩu không đúng.', { email: 'Thông tin đăng nhập không hợp lệ', password: 'Thông tin đăng nhập không hợp lệ' }))
      } else {
        status = 200
        const token = randomUUID()
        tokens.set(token, { email: body.email, ...account })
        sendJson(res, status, { token, user: { id: account.id, name: account.name, role: account.role } })
      }
    } else if (method === 'GET' && pathname.startsWith('/uploads/')) {
      const photo = uploadedPhotos.get(pathname)
      if (!photo) { respond(404, error('NOT_FOUND', 'Không tìm thấy ảnh.')); return }
      res.writeHead(200, { 'Content-Type': photo.type, 'X-Content-Type-Options': 'nosniff' })
      res.end(photo.data)
    } else if (method === 'POST' && pathname === '/api/auth/logout') {
      if (forbidden(req, res, ['customer', 'admin', 'staff', 'superadmin'])) return
      tokens.delete(bearerToken(req))
      sendJson(res, 200, { ok: true })
    } else if (method === 'GET' && pathname === '/api/catalogue') {
      sendJson(res, 200, mode === 'empty' ? { services: [], packages: [], extras: [], photos: [], reviews: [] } : catalogue)
    } else if (method === 'GET' && pathname === '/api/conversations') {
      if (forbidden(req, res, ['customer', 'admin'])) return
      sendJson(res, 200, mode === 'empty' ? { items: [] } : { items: conversations })
    } else if (method === 'POST' && match('/api/conversations/:id/request', pathname)) {
      if (forbidden(req, res, ['customer'])) return
      const { id } = match('/api/conversations/:id/request', pathname)
      const conversation = conversations.find((item) => item.id === id)
      if (!conversation) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy hội thoại.')); return }
      const body = await readBody(req)
      const fields = {}
      if (!body.shootType) fields.shootType = 'Chọn loại buổi chụp.'
      if (!body.preferredDate) fields.preferredDate = 'Chọn ngày chụp.'
      if (!body.preferredTime) fields.preferredTime = 'Chọn giờ mong muốn.'
      if (Object.keys(fields).length) { status = 400; sendJson(res, status, error('VALIDATION_ERROR', 'Dữ liệu không hợp lệ.', fields)); }
      else if (body.preferredTime === '09:00') { status = 409; sendJson(res, status, error('CONFLICT', 'Mai bận 08:00–12:00 nên khung giờ 09:00 không khả dụng.', { preferredTime: 'Mai bận 08:00–12:00 nên không thể nhận make-up lúc 09:00.' })); }
      else { status = 201; sendJson(res, status, { requestId: 'req-linh', conversationId: 'conv-linh', shootType: body.shootType, preferredDate: body.preferredDate, preferredTime: body.preferredTime, extras: body.extras || [], status: 'Đang tư vấn' }); }
    } else if (match('/api/conversations/:id/messages', pathname) && method === 'POST') {
      if (forbidden(req, res, ['customer', 'admin'])) return
      const { id } = match('/api/conversations/:id/messages', pathname)
      const conversation = conversations.find((item) => item.id === id)
      if (!conversation) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy hội thoại.')); return }
      const body = await readBody(req)
      if (!body.text || body.text.length > 2000) { status = 400; sendJson(res, status, error('VALIDATION_ERROR', 'Tin nhắn không hợp lệ.', { text: 'Nội dung tin nhắn phải từ 1 đến 2000 ký tự.' })); }
      else {
        const message = { id: `msg-${conversation.messages.length + 1}`, conversationId: id, text: body.text, sender: caller(req).role }
        conversation.messages.push(message)
        sendJson(res, 200, message)
      }
    } else if (method === 'POST' && pathname === '/api/clash-check') {
      if (forbidden(req, res, ['admin'])) return
      const body = await readBody(req)
      const fields = {}
      if (!isDate(body.date)) fields.date = 'Nhập ngày theo YYYY-MM-DD.'
      if (!isTimeRange(body.time) && !(typeof body.time === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(body.time))) {
        fields.time = 'Nhập giờ HH:MM hoặc khung giờ HH:MM–HH:MM.'
      }
      if (typeof body.room !== 'string' || !body.room.trim()) fields.room = 'Chọn phòng.'
      if (!Array.isArray(body.staff) || !body.staff.length || body.staff.some((name) => typeof name !== 'string' || !name.trim())) {
        fields.staff = 'Chọn ít nhất một nhân sự.'
      }
      if (Object.keys(fields).length) { status = 400; sendJson(res, status, error('VALIDATION_ERROR', 'Thiếu dữ liệu kiểm tra.', fields)); }
      else {
        const reason = findClash({
          date: body.date, time: body.time, room: body.room.trim(), staffNames: body.staff.map((name) => name.trim()),
        })
        const alternate = reason && alternateSlots.find((slot) => !Object.keys(scheduleClashes({ ...slot, date: body.date })).length)
        sendJson(res, 200, {
          hasClash: Boolean(reason),
          reason: reason || 'Không có xung đột tài nguyên.',
          suggestions: alternate ? [{ ...alternate, makeupArtist: jobTemplates[0].staffName, photographer: jobTemplates[1].staffName }] : [],
        })
      }
    } else if (method === 'POST' && match('/api/conversations/:id/proposal', pathname)) {
      if (forbidden(req, res, ['admin'])) return
      const { id } = match('/api/conversations/:id/proposal', pathname)
      const conversation = conversations.find((item) => item.id === id)
      if (!conversation) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy hội thoại.')); }
      else {
        const body = await readBody(req)
        const { makeup, shoot, room } = body
        const fields = bookingPatchErrors({ makeup, shoot, room })
        if (Object.keys(fields).length) { respond(400, error('VALIDATION_ERROR', 'Đề xuất lịch không hợp lệ.', fields)); return }
        const clashes = scheduleClashes({ date: conversation.date, makeup, shoot, room: room.trim() })
        if (Object.keys(clashes).length) { respond(409, error('CONFLICT', Object.values(clashes).join(' '), clashes)); return }
        const previous = conversation.proposal
        const sameSlot = previous?.makeup === makeup && previous.shoot === shoot && previous.room === room.trim()
        conversation.proposal = { makeup, shoot, room: room.trim(), proposalId: sameSlot ? previous.proposalId : randomUUID(), status: 'pending' }
        conversation.status = 'Đang tư vấn'
        sendJson(res, 200, conversation.proposal)
      }
    } else if (method === 'POST' && match('/api/conversations/:id/agree', pathname)) {
      if (forbidden(req, res, ['customer'])) return
      const { id } = match('/api/conversations/:id/agree', pathname)
      const conversation = conversations.find((item) => item.id === id)
      const body = await readBody(req)
      if (!conversation?.proposal || body.proposalId !== conversation.proposal.proposalId) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy đề xuất.')); }
      else if (caller(req).id !== conversation.customerId) { respond(403, error('FORBIDDEN', 'Không có quyền trả lời đề xuất này.')); }
      else if (!['agree', 'decline'].includes(body.decision)) { status = 400; sendJson(res, status, error('VALIDATION_ERROR', 'Quyết định không hợp lệ.', { decision: 'Chọn agree hoặc decline.' })); }
      else {
        if (body.decision === 'agree') {
          conversation.status = 'Đã chốt lịch'
          if (conversation.proposal) conversation.proposal.status = 'agreed'
        } else {
          conversation.status = 'Đang tư vấn'
          if (conversation.proposal) conversation.proposal.status = 'declined'
        }
        sendJson(res, 200, {
          status: conversation.status,
          decision: body.decision,
          proposalId: body.proposalId,
          proposalStatus: conversation.proposal.status,
        })
      }
    } else if (method === 'GET' && pathname === '/api/bookings') {
      if (forbidden(req, res, ['customer', 'admin'])) return
      sendJson(res, 200, mode === 'empty' ? { items: [] } : { items: bookings })
    } else if (method === 'GET' && match('/api/bookings/:id', pathname)) {
      if (forbidden(req, res, ['customer', 'admin'])) return
      const { id } = match('/api/bookings/:id', pathname)
      const booking = bookings.find((item) => item.id === id)
      if (!booking) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy booking.')) }
      else sendJson(res, 200, booking)
    } else if (method === 'POST' && pathname === '/api/bookings') {
      if (forbidden(req, res, ['admin'])) return
      const body = await readBody(req)
      const fields = {}
      for (const field of ['conversationId', 'customerId', 'packageId', 'agreedMakeup', 'agreedShoot', 'room']) {
        if (typeof body[field] !== 'string' || !body[field].trim()) fields[field] = 'Trường này là bắt buộc.'
      }
      const conversation = conversations.find((item) => item.id === body.conversationId)
      const proposal = conversation?.proposal
      const selectedPackage = catalogue.packages.find((item) => item.id === body.packageId)
      if (!selectedPackage) fields.packageId = 'Chọn gói có trong catalogue.'
      if (conversation && body.customerId !== conversation.customerId) fields.customerId = 'Mã khách phải khớp với hội thoại.'
      if (Object.keys(fields).length) { respond(400, error('VALIDATION_ERROR', 'Dữ liệu tạo booking không hợp lệ.', fields)); return }
      if (conversation?.status !== 'Đã chốt lịch' || proposal?.status !== 'agreed') {
        respond(409, error('CONFLICT', 'Khách hàng chưa đồng ý thời gian đề xuất.'))
        return
      }

      const { date } = conversation
      const { makeup, shoot, room } = proposal
      if (body.agreedMakeup !== makeup || body.agreedShoot !== shoot || body.room.trim() !== room) {
        respond(409, error('CONFLICT', 'Giờ và phòng phải khớp với đề xuất đã được khách đồng ý.'))
        return
      }

      const existing = bookings.find((item) => item.conversationId === conversation.id && !item.cancelled)
      const previousProposal = createdProposals.get(existing?.id)
      if (previousProposal === proposal.proposalId && existing.packageId === selectedPackage.id) {
        respond(201, existing)
        return
      }
      if (existing && (previousProposal || existing.status !== 'Chờ cọc 30%')) {
        respond(409, error('CONFLICT', 'Hội thoại đã có booking đang hoạt động.'))
        return
      }
      const clashes = scheduleClashes({ date, makeup, shoot, room })
      if (Object.keys(clashes).length) { respond(409, error('CONFLICT', Object.values(clashes).join(' '), clashes)); return }

      const bookingId = existing?.id ?? `GS-${1024 + bookings.length}`
      const total = selectedPackage.price
      const deposit = Math.round(total * 0.3)
      const booking = existing ?? { id: bookingId, previewPhotos: [] }
      Object.assign(booking, {
        conversationId: conversation.id, customerId: conversation.customerId, customerName: conversation.customerName,
        packageId: selectedPackage.id, packageName: selectedPackage.name,
        date, makeup, shoot, room, status: 'Chờ cọc 30%', paymentStatus: 'Chờ cọc',
        total, deposit, remaining: total - deposit, maxEditedPhotos: selectedPackage.editedPhotos,
        selectedPhotoIds: [], finalFileLink: '', reminders: [],
      })
      if (!existing) {
        bookings.push(booking)
        for (const job of jobTemplates) {
          staff.push({ ...job, id: job.id.replace('1024', bookingId.slice(3)), bookingId, status: 'Chưa phân công' })
        }
      }
      for (const [paymentId, payment] of payments) {
        if (payment.bookingId === bookingId) payments.delete(paymentId)
      }
      applySchedule(booking)
      createdProposals.set(bookingId, proposal.proposalId)
      respond(201, booking)
    } else if (method === 'POST' && match('/api/bookings/:id/deposit/payment', pathname)) {
      if (forbidden(req, res, ['customer'])) return
      const { id } = match('/api/bookings/:id/deposit/payment', pathname)
      const booking = bookings.find((item) => item.id === id)
      if (!booking) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy booking.')); return }
      if (booking.customerId === caller(req).id && rejectCancelled(res, booking)) return
      const body = await readBody(req)
      if (booking.customerId !== caller(req).id) { status = 403; sendJson(res, status, error('FORBIDDEN', 'Không có quyền truy cập booking này.')) }
      else if (booking.status !== 'Chờ cọc 30%' || !['success', 'failure'].includes(body.scenario)) {
        status = booking.status === 'Chờ cọc 30%' ? 400 : 409
        sendJson(res, status, error(status === 400 ? 'VALIDATION_ERROR' : 'CONFLICT', status === 400 ? 'Chọn kịch bản thanh toán.' : 'Booking đã thanh toán cọc.'))
      } else {
        const paymentId = `pay-deposit-${id.slice(3)}${body.scenario === 'failure' ? '-fail' : ''}`
        payments.set(paymentId, { bookingId: id, kind: 'deposit', scenario: body.scenario, confirmed: false })
        sendJson(res, 200, {
          gatewayUrl: `/payments/test/${id}?kind=deposit&scenario=${body.scenario}&paymentId=${paymentId}`,
          paymentId,
        })
      }
    } else if (method === 'POST' && match('/api/bookings/:id/payments/remaining', pathname)) {
      if (forbidden(req, res, ['customer'])) return
      const { id } = match('/api/bookings/:id/payments/remaining', pathname)
      const booking = bookings.find((item) => item.id === id)
      if (!booking) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy booking.')); return }
      if (booking.customerId === caller(req).id && rejectCancelled(res, booking)) return
      const body = await readBody(req)
      const selectedPhotoIds = body.selectedPhotoIds
      const invalidSelection = !Array.isArray(selectedPhotoIds)
        || selectedPhotoIds.length < 1
        || selectedPhotoIds.length > booking.maxEditedPhotos
        || new Set(selectedPhotoIds).size !== selectedPhotoIds.length
        || selectedPhotoIds.some((photoId) => !booking.previewPhotos.some((photo) => photo.id === photoId))
      if (booking.customerId !== caller(req).id) {
        status = 403
        sendJson(res, status, error('FORBIDDEN', 'Không có quyền truy cập booking này.'))
      } else if (booking.paymentStatus !== 'Đã cọc 30%' || booking.remaining <= 0) {
        status = 409
        sendJson(res, status, error('CONFLICT', 'Cần thanh toán cọc trước khi thanh toán phần còn lại.'))
      } else if (invalidSelection || !['success', 'failure'].includes(body.scenario)) {
        status = 400
        sendJson(res, status, error('VALIDATION_ERROR', 'Dữ liệu thanh toán không hợp lệ.', {
          selectedPhotoIds: 'Chọn từ 1 đến 30 ảnh trong thư viện xem trước.',
          scenario: 'Chỉ chấp nhận success hoặc failure.',
        }))
      } else {
        booking.selectedPhotoIds = selectedPhotoIds
        const paymentId = `pay-rest-${id.slice(3)}${body.scenario === 'failure' ? '-fail' : ''}`
        payments.set(paymentId, { bookingId: id, kind: 'remaining', scenario: body.scenario, confirmed: false })
        sendJson(res, 200, {
          gatewayUrl: `/payments/test/${id}?kind=remaining&scenario=${body.scenario}&paymentId=${paymentId}`,
          paymentId,
          remaining: booking.remaining,
        })
      }
    } else if (method === 'POST' && match('/api/bookings/:id/payments/confirm', pathname)) {
      if (forbidden(req, res, ['customer'])) return
      const { id } = match('/api/bookings/:id/payments/confirm', pathname)
      const booking = bookings.find((item) => item.id === id)
      if (!booking) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy booking.')); return }
      if (booking.customerId === caller(req).id && rejectCancelled(res, booking)) return
      const body = await readBody(req)
      const payment = payments.get(body.paymentId)
      if (booking.customerId !== caller(req).id) {
        status = 403
        sendJson(res, status, error('FORBIDDEN', 'Không có quyền truy cập booking này.'))
      } else if (!['deposit', 'remaining'].includes(body.kind) || !['success', 'failure'].includes(body.result)) {
        status = 400
        sendJson(res, status, error('VALIDATION_ERROR', 'Kết quả thanh toán không hợp lệ.', {
          kind: 'Chọn deposit hoặc remaining.',
          result: 'Chọn success hoặc failure.',
        }))
      } else if (!payment || payment.bookingId !== id || payment.kind !== body.kind || payment.scenario !== body.result || payment.confirmed) {
        status = 404
        sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy phiên thanh toán hợp lệ.'))
      } else if (body.result === 'failure') {
        payment.confirmed = true
        payment.result = 'failure'
        sendJson(res, 200, {
          paymentId: body.paymentId,
          kind: body.kind,
          result: body.result,
          bookingStatus: booking.status,
          paymentStatus: booking.paymentStatus,
          remaining: booking.remaining,
        })
      } else if (body.kind === 'deposit') {
        const clashes = scheduleClashes(booking, jobsFor(booking), booking.id)
        if (booking.cancelled || booking.status !== 'Chờ cọc 30%' || Object.keys(clashes).length) {
          status = 409
          sendJson(res, status, error('CONFLICT', Object.values(clashes).join(' ') || 'Booking không còn chờ thanh toán cọc.'))
        } else {
          payment.confirmed = true
          payment.result = 'success'
          booking.status = 'Đã đặt lịch'
          booking.paymentStatus = 'Đã cọc 30%'
          booking.reminders = [reminderFor(booking)]
          for (const job of jobsFor(booking)) job.status = 'Đã phân công'
          sendJson(res, 200, {
            paymentId: body.paymentId,
            kind: body.kind,
            result: body.result,
            bookingStatus: booking.status,
            paymentStatus: booking.paymentStatus,
            remaining: booking.remaining,
          })
        }
      } else {
        payment.confirmed = true
        payment.result = 'success'
        booking.paymentStatus = 'Đã thanh toán đủ'
        booking.remaining = 0
        sendJson(res, 200, {
          paymentId: body.paymentId,
          kind: body.kind,
          result: body.result,
          bookingStatus: booking.status,
          paymentStatus: booking.paymentStatus,
          remaining: booking.remaining,
        })
      }
    } else if (method === 'POST' && match('/api/bookings/:id/receive', pathname)) {
      if (forbidden(req, res, ['customer'])) return
      const { id } = match('/api/bookings/:id/receive', pathname)
      const booking = bookings.find((item) => item.id === id)
      const conversation = booking && conversations.find((item) => item.id === booking.conversationId)
      if (!booking) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy booking.')) }
      else if (booking.customerId !== caller(req).id) {
        status = 403
        sendJson(res, status, error('FORBIDDEN', 'Không có quyền truy cập booking này.'))
      } else if (booking.cancelled) {
        status = 409
        sendJson(res, status, error('CONFLICT', 'Booking đã bị studio hủy.'))
      } else if (booking.remaining !== 0 || booking.paymentStatus !== 'Đã thanh toán đủ' || !booking.finalFileLink) {
        status = 409
        sendJson(res, status, error('CONFLICT', 'Chưa đủ điều kiện nhận ảnh: cần thanh toán đủ 100% và có link file hoàn thiện từ studio.'))
      } else {
        booking.status = 'Hoàn thành'
        if (conversation) conversation.status = 'Hoàn thành'
        sendJson(res, 200, booking)
      }
    } else if (method === 'GET' && pathname === '/api/staff/jobs') {
      if (forbidden(req, res, ['staff'])) return
      const currentStaff = caller(req)
      const assignedJobs = staff.filter((job) => job.staffName === currentStaff.name
        && bookings.some((item) => item.id === job.bookingId && holdsSchedule(item)))
      sendJson(res, 200, mode === 'empty' ? { items: [] } : { items: assignedJobs })
    } else if (method === 'PATCH' && pathname.startsWith('/api/staff/jobs/')) {
      if (forbidden(req, res, ['staff'])) return
      const id = pathname.split('/').pop()
      const job = staff.find((item) => item.id === id)
      if (!job) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy công việc.')); }
      else if (job.staffName !== caller(req).name) {
        status = 403
        sendJson(res, status, error('FORBIDDEN', 'Nhân viên không được phân công công việc này.'))
      }
      else {
        const body = await readBody(req)
        if (!['Đang thực hiện', 'Hoàn thành'].includes(body.status)) {
          status = 400
          sendJson(res, status, error('VALIDATION_ERROR', 'Trạng thái công việc không hợp lệ.', { status: 'Chọn Đang thực hiện hoặc Hoàn thành.' }))
        } else {
          job.status = body.status
          sendJson(res, 200, { id: job.id, status: job.status })
        }
      }
    } else if (method === 'POST' && match('/api/bookings/:id/photos/preview', pathname)) {
      if (forbidden(req, res, ['staff'])) return
      const { id } = match('/api/bookings/:id/photos/preview', pathname)
      const booking = bookings.find((item) => item.id === id)
      if (!booking) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy booking.')); return }
      if (rejectCancelled(res, booking)) return
      if (!holdsSchedule(booking)) {
        status = 409
        sendJson(res, status, error('CONFLICT', 'Chưa có phân công nhân sự cho booking này.'))
        return
      }
      const fields = await readMultipart(req)
      if (rejectCancelled(res, booking)) return
      const uploaded = fields.file
      if (!uploaded || !fields.title || !['image/jpeg', 'image/png'].includes(uploaded.type) || uploaded.data.length > 10 * 1024 * 1024) {
        status = 400
        sendJson(res, status, error('VALIDATION_ERROR', 'Ảnh preview không hợp lệ.', {
          file: 'Tải ảnh JPEG hoặc PNG, tối đa 10 MB.',
          title: 'Nhập tiêu đề ảnh.',
        }))
        return
      }
      const extension = uploaded.type === 'image/png' ? 'png' : 'jpg'
      const photoNumber = nextPhotoNumber++
      const photo = {
        id: `photo-${photoNumber}`,
        bookingId: id,
        title: fields.title,
        url: `/uploads/photo-${photoNumber}.${extension}`,
      }
      uploadedPhotos.set(photo.url, { type: uploaded.type, data: Buffer.from(uploaded.data) })
      booking.previewPhotos.push(photo)
      sendJson(res, 201, photo)
    } else if (method === 'PATCH' && match('/api/bookings/:id', pathname)) {
      if (forbidden(req, res, ['admin'])) return
      const { id } = match('/api/bookings/:id', pathname)
      const booking = bookings.find((item) => item.id === id)
      if (!booking) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy booking.')); return }
      const body = await readBody(req)
      const fields = bookingPatchErrors(body)
      if (Object.keys(fields).length) {
        status = 400
        sendJson(res, status, error('VALIDATION_ERROR', 'Dữ liệu booking không hợp lệ.', fields))
        return
      }
      const changed = SCHEDULE_FIELDS.filter((key) => key in body && body[key] !== booking[key])
      if ((body.cancel || changed.length) && (booking.cancelled || booking.status === 'Hoàn thành')) {
        status = 409
        sendJson(res, status, error('CONFLICT', CLOSED_BOOKING_MESSAGE))
        return
      }
      const clashes = changed.length ? scheduleClashes({ ...booking, ...body }, jobsFor(booking), booking.id) : {}
      if (Object.keys(clashes).length) {
        status = 409
        sendJson(res, status, error('CONFLICT', Object.values(clashes).join(' '), clashes))
      } else if (body.finalFileLink && (booking.cancelled || booking.remaining !== 0 || booking.paymentStatus !== 'Đã thanh toán đủ')) {
        status = 409
        sendJson(res, status, error('CONFLICT', 'Chỉ có thể thêm link ảnh hoàn thiện sau khi khách thanh toán đủ.',
          { finalFileLink: 'Booking chưa thanh toán đủ hoặc đã bị hủy.' }))
      } else if (body.cancel) {
        booking.cancelled = true
        booking.reminders = []
        sendJson(res, 200, booking)
      } else {
        Object.assign(booking, body)
        if (changed.length) applySchedule(booking)
        sendJson(res, 200, booking)
      }
    } else if (method === 'GET' && pathname === '/api/admin/accounts') {
      if (forbidden(req, res, ['superadmin'])) return
      sendJson(res, 200, mode === 'empty' ? { items: [] } : { items: admin.accounts })
    } else if (method === 'POST' && pathname === '/api/admin/accounts') {
      if (forbidden(req, res, ['superadmin'])) return
      const body = await readBody(req)
      if (!body.name || !body.email || !body.password || body.password.length < 8) { status = 400; sendJson(res, status, error('VALIDATION_ERROR', 'Dữ liệu tài khoản không hợp lệ.', { name: 'Nhập họ tên.', email: 'Nhập e-mail hợp lệ.', password: 'Mật khẩu ít nhất 8 ký tự.' })); }
      else if (admin.accounts.some((item) => item.email === body.email)) { status = 409; sendJson(res, status, error('CONFLICT', 'E-mail đã tồn tại.')); }
      else { const account = { id: nextAdminId(), name: body.name, email: body.email, role: 'admin', active: true }; admin.accounts.push(account); sendJson(res, 201, account) }
    } else if (method === 'GET' && pathname === '/api/admin/settings') {
      if (forbidden(req, res, ['superadmin'])) return
      sendJson(res, 200, admin.settings)
    } else if (method === 'PUT' && pathname === '/api/admin/settings') {
      if (forbidden(req, res, ['superadmin'])) return
      const body = await readBody(req)
      const fields = {}
      if (!/^\d{2}:\d{2}$/.test(body.openingTime || '')) fields.openingTime = 'Nhập giờ mở cửa theo HH:MM.'
      if (!/^\d{2}:\d{2}$/.test(body.closingTime || '')) fields.closingTime = 'Nhập giờ đóng cửa theo HH:MM.'
      if (!Number.isInteger(body.reminderHoursBefore) || body.reminderHoursBefore < 1) fields.reminderHoursBefore = 'Nhập số giờ nguyên dương.'
      if (Object.keys(fields).length) { status = 400; sendJson(res, status, error('VALIDATION_ERROR', 'Cài đặt không hợp lệ.', fields)); }
      else { admin.settings = body; sendJson(res, 200, admin.settings) }
    } else {
      status = 404
      sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy endpoint.', {}))
    }
  } catch (cause) {
    status = cause.statusCode || (cause.message === 'Invalid JSON' ? 400 : 500)
    if (status >= 500) console.error(cause)
    const message = cause.message === 'Invalid JSON' ? 'JSON không hợp lệ.' : cause.message
    sendJson(res, status, error(status === 400 ? 'VALIDATION_ERROR' : 'INTERNAL_ERROR', message, {}))
  } finally {
    if (!res.writableEnded) return
    console.log(`${method} ${pathname} ${res.statusCode || status}`)
  }
})

server.listen(port, () => {
  console.log(`GradStudio mock server listening on http://localhost:${port} (${mode} mode)`)
})
