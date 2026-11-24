import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(root, 'data')
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(dataDir, `${name}.json`), 'utf8'))

const accounts = readJson('accounts')
const catalogue = readJson('catalogue')
let conversations = readJson('conversations')
let bookings = readJson('bookings')
let staff = readJson('staff')
let admin = readJson('admin')
const payments = new Map()
let assignmentsActive = false

const mode = process.env.MOCK_MODE || 'normal'
const port = Number(process.env.PORT || 3001)
const delay = mode === 'slow' ? 2000 : mode === 'normal' ? 150 : 0

const tokens = new Map()
for (const [email, account] of Object.entries(accounts)) {
  tokens.set(`token-${account.id}`, { email, ...account })
}

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
  scheduledAt: '2026-10-23T13:00:00+07:00',
  channel: 'Email',
  recipient: 'linh@gradstudio.test',
  emailStatus: 'Đã gửi',
})

const timeRangeOverlaps = (left, right) => {
  const toMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }
  const range = (value) => {
    const [start, end] = value.split('–').map((time) => time.trim())
    return [toMinutes(start), toMinutes(end)]
  }
  const [leftStart, leftEnd] = range(left)
  const [rightStart, rightEnd] = range(right)
  return leftStart < rightEnd && rightStart < leftEnd
}

const caller = (req) => {
  const authorization = req.headers.authorization || ''
  const token = authorization.replace(/^Bearer\s+/i, '')
  return tokens.get(token) || null
}

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
        const token = `token-${account.id}`
        tokens.set(token, { email: body.email, ...account })
        sendJson(res, status, { token, user: { id: account.id, name: account.name, role: account.role } })
      }
    } else if (method === 'POST' && pathname === '/api/auth/logout') {
      if (forbidden(req, res, ['customer', 'admin', 'staff', 'superadmin'])) return
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
      if (!body.date || !body.time) { status = 400; sendJson(res, status, error('VALIDATION_ERROR', 'Thiếu dữ liệu kiểm tra.', { date: 'Chọn ngày.', time: 'Chọn giờ.' })); }
      else { sendJson(res, 200, { hasClash: body.time === '09:00', reason: body.time === '09:00' ? 'Mai bận 08:00–12:00 nên không thể nhận make-up lúc 09:00.' : 'Không có xung đột tài nguyên.', suggestions: body.time === '09:00' ? [{ makeup: '13:00–14:00', makeupArtist: 'Mai', shoot: '14:00–16:00', photographer: 'Tuấn', room: 'Phòng B' }] : [] }) }
    } else if (method === 'POST' && match('/api/conversations/:id/proposal', pathname)) {
      if (forbidden(req, res, ['admin'])) return
      const { id } = match('/api/conversations/:id/proposal', pathname)
      const conversation = conversations.find((item) => item.id === id)
      if (!conversation) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy hội thoại.')); }
      else {
        const body = await readBody(req)
        conversation.proposal = { ...body, proposalId: 'proposal-linh', status: 'pending' }
        sendJson(res, 200, conversation.proposal)
      }
    } else if (method === 'POST' && match('/api/conversations/:id/agree', pathname)) {
      if (forbidden(req, res, ['customer'])) return
      const { id } = match('/api/conversations/:id/agree', pathname)
      const conversation = conversations.find((item) => item.id === id)
      const body = await readBody(req)
      if (!conversation || body.proposalId !== conversation.proposal?.proposalId) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy đề xuất.')); }
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
        if (!body[field]) fields[field] = 'Trường này là bắt buộc.'
      }
      const conversation = conversations.find((item) => item.id === body.conversationId)
      if (Object.keys(fields).length) { status = 400; sendJson(res, status, error('VALIDATION_ERROR', 'Thiếu dữ liệu tạo booking.', fields)); }
      else if (!conversation || conversation.status !== 'Đã chốt lịch') { status = 409; sendJson(res, status, error('CONFLICT', 'Khách hàng chưa đồng ý thời gian đề xuất.')); }
      else { status = 201; sendJson(res, status, bookings[0]) }
    } else if (method === 'POST' && match('/api/bookings/:id/deposit/payment', pathname)) {
      if (forbidden(req, res, ['customer'])) return
      const { id } = match('/api/bookings/:id/deposit/payment', pathname)
      const booking = bookings.find((item) => item.id === id)
      if (!booking) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy booking.')); return }
      const body = await readBody(req)
      if (booking.customerId !== caller(req).id) { status = 403; sendJson(res, status, error('FORBIDDEN', 'Không có quyền truy cập booking này.')) }
      else if (booking.status !== 'Chờ cọc 30%' || !['success', 'failure'].includes(body.scenario)) {
        status = booking.status === 'Chờ cọc 30%' ? 400 : 409
        sendJson(res, status, error(status === 400 ? 'VALIDATION_ERROR' : 'CONFLICT', status === 400 ? 'Chọn kịch bản thanh toán.' : 'Booking đã thanh toán cọc.'))
      } else {
        const paymentId = body.scenario === 'failure' ? 'pay-deposit-1024-fail' : 'pay-deposit-1024'
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
        const paymentId = body.scenario === 'failure' ? 'pay-rest-1024-fail' : 'pay-rest-1024'
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
        const resourcesAvailable = !bookings.some((item) => item.id !== booking.id
          && item.date === booking.date
          && item.status === 'Đã đặt lịch'
          && ((item.makeup && booking.makeup && timeRangeOverlaps(item.makeup, booking.makeup))
            || (item.shoot && booking.shoot && timeRangeOverlaps(item.shoot, booking.shoot))
            || (item.room === booking.room && item.shoot && booking.shoot && timeRangeOverlaps(item.shoot, booking.shoot))))
        if (!resourcesAvailable) {
          status = 409
          sendJson(res, status, error('CONFLICT', 'Tài nguyên không còn khả dụng sau khi kiểm tra lại.'))
        } else {
          payment.confirmed = true
          payment.result = 'success'
          booking.status = 'Đã đặt lịch'
          booking.paymentStatus = 'Đã cọc 30%'
          booking.reminders = [reminderFor(booking)]
          assignmentsActive = true
          for (const job of staff) job.status = 'Đã phân công'
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
      sendJson(res, 200, mode === 'empty' || !assignmentsActive ? { items: [] } : { items: staff })
    } else if (method === 'PATCH' && pathname.startsWith('/api/staff/jobs/')) {
      if (forbidden(req, res, ['staff'])) return
      const id = pathname.split('/').pop()
      const job = staff.find((item) => item.id === id)
      if (!job) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy công việc.')); }
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
      if (!assignmentsActive) {
        status = 409
        sendJson(res, status, error('CONFLICT', 'Chưa có phân công nhân sự cho booking này.'))
        return
      }
      const fields = await readMultipart(req)
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
      const photoNumber = Math.max(0, ...booking.previewPhotos.map((photo) => Number(photo.id.match(/^photo-(\d+)$/)?.[1]) || 0)) + 1
      const photo = {
        id: `photo-${photoNumber}`,
        bookingId: id,
        title: fields.title,
        url: `/uploads/photo-${photoNumber}.${extension}`,
      }
      booking.previewPhotos.push(photo)
      sendJson(res, 201, photo)
    } else if (method === 'PATCH' && match('/api/bookings/:id', pathname)) {
      if (forbidden(req, res, ['admin'])) return
      const { id } = match('/api/bookings/:id', pathname)
      const booking = bookings.find((item) => item.id === id)
      if (!booking) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy booking.')); return }
      const body = await readBody(req)
      if (body.finalFileLink && (booking.remaining !== 0 || booking.paymentStatus !== 'Đã thanh toán đủ')) {
        status = 409
        sendJson(res, status, error('CONFLICT', 'Chỉ có thể thêm link ảnh hoàn thiện sau khi khách thanh toán đủ.'))
      } else {
        Object.assign(booking, body)
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
      else { const account = { id: 'u-admin-2', name: body.name, email: body.email, role: 'admin', active: true }; admin.accounts.push(account); sendJson(res, 201, account) }
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
