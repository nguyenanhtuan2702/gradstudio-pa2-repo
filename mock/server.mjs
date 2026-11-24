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

const consumeBody = (req) => new Promise((resolve) => {
  req.on('end', resolve)
  req.resume()
})

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
        conversation.proposal = { proposalId: 'proposal-linh', status: 'pending', ...body }
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
        sendJson(res, 200, { status: conversation.status, decision: body.decision, proposalId: body.proposalId })
      }
    } else if (method === 'GET' && pathname === '/api/bookings') {
      if (forbidden(req, res, ['customer', 'admin'])) return
      sendJson(res, 200, mode === 'empty' ? { items: [] } : { items: bookings.map(({ packageId, customerId, maxEditedPhotos, previewPhotos, selectedPhotoIds, reminders, finalFileLink, ...item }) => item) })
    } else if (method === 'GET' && match('/api/bookings/:id', pathname)) {
      if (forbidden(req, res, ['customer', 'admin'])) return
      const { id } = match('/api/bookings/:id', pathname)
      const booking = bookings.find((item) => item.id === id)
      if (!booking) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy booking.')) }
      else { sendJson(res, 200, booking) }
    } else if (method === 'POST' && pathname === '/api/bookings') {
      if (forbidden(req, res, ['admin'])) return
      const body = await readBody(req)
      const fields = {}
      for (const field of ['conversationId', 'customerId', 'packageId', 'agreedMakeup', 'agreedShoot']) {
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
      if (!['success', 'failure'].includes(body.scenario)) { status = 400; sendJson(res, status, error('VALIDATION_ERROR', 'Chọn kịch bản thanh toán.', { scenario: 'Chỉ chấp nhận success hoặc failure.' })); }
      else { sendJson(res, 200, { gatewayUrl: `/payments/test/${id}?kind=deposit&scenario=${body.scenario}`, paymentId: 'pay-deposit-1024' }) }
    } else if (method === 'POST' && match('/api/bookings/:id/payments/remaining', pathname)) {
      if (forbidden(req, res, ['customer'])) return
      const { id } = match('/api/bookings/:id/payments/remaining', pathname)
      const booking = bookings.find((item) => item.id === id)
      if (!booking) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy booking.')); return }
      const body = await readBody(req)
      const maxPhotos = booking.maxEditedPhotos || 30
      const scenario = body.scenario || 'success'
      if (!['success', 'failure'].includes(scenario)) { status = 400; sendJson(res, status, error('VALIDATION_ERROR', 'Chọn kịch bản thanh toán.', { scenario: 'Chỉ chấp nhận success hoặc failure.' })); }
      else if (!Array.isArray(body.selectedPhotoIds) || !body.selectedPhotoIds.length || body.selectedPhotoIds.length > maxPhotos) { status = 400; sendJson(res, status, error('VALIDATION_ERROR', 'Số ảnh không hợp lệ.', { selectedPhotoIds: `Chọn ít nhất 1 và tối đa ${maxPhotos} ảnh.` })); }
      else {
        booking.selectedPhotoIds = body.selectedPhotoIds
        sendJson(res, 200, { gatewayUrl: `/payments/test/${id}?kind=remaining&scenario=${scenario}`, paymentId: 'pay-rest-1024', remaining: booking.remaining, selectedPhotoIds: booking.selectedPhotoIds })
      }
    } else if (method === 'POST' && match('/api/bookings/:id/payments/confirm', pathname)) {
      if (forbidden(req, res, ['customer'])) return
      const { id } = match('/api/bookings/:id/payments/confirm', pathname)
      const booking = bookings.find((item) => item.id === id)
      if (!booking) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy booking.')); return }
      const body = await readBody(req)
      const fields = {}
      if (!body.paymentId) fields.paymentId = 'Thiếu mã giao dịch.'
      if (!['deposit', 'remaining'].includes(body.kind)) fields.kind = 'Loại thanh toán phải là deposit hoặc remaining.'
      if (!['success', 'failure'].includes(body.result)) fields.result = 'Kết quả phải là success hoặc failure.'
      if (Object.keys(fields).length) { status = 400; sendJson(res, status, error('VALIDATION_ERROR', 'Dữ liệu xác nhận thanh toán không hợp lệ.', fields)); return }
      if (body.kind === 'deposit') {
        if (body.result === 'success') {
          booking.status = 'Đã đặt lịch'
          booking.paymentStatus = 'Đã cọc 30%'
        } else {
          booking.status = 'Chờ cọc 30%'
          booking.paymentStatus = 'Chờ cọc'
        }
      } else if (body.kind === 'remaining') {
        if (body.result === 'success') {
          booking.paymentStatus = 'Đã thanh toán đủ'
          booking.remaining = 0
        }
      }
      sendJson(res, 200, { bookingId: booking.id, paymentId: body.paymentId, kind: body.kind, result: body.result, status: booking.status, paymentStatus: booking.paymentStatus, remaining: booking.remaining })
    } else if (method === 'POST' && match('/api/bookings/:id/receive', pathname)) {
      if (forbidden(req, res, ['customer'])) return
      const { id } = match('/api/bookings/:id/receive', pathname)
      const booking = bookings.find((item) => item.id === id)
      if (!booking) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy booking.')); return }
      if (booking.remaining > 0 || !booking.finalFileLink) {
        status = 409
        sendJson(res, status, error('CONFLICT', 'Chưa đủ điều kiện nhận ảnh: cần thanh toán đủ 100% và có link file hoàn thiện từ studio.'))
        return
      }
      booking.status = 'Hoàn thành'
      const conv = conversations.find((item) => item.id === booking.conversationId)
      if (conv) conv.status = 'Hoàn thành'
      sendJson(res, 200, booking)
    } else if (method === 'GET' && pathname === '/api/staff/jobs') {
      if (forbidden(req, res, ['staff'])) return
      sendJson(res, 200, mode === 'empty' ? { items: [] } : { items: staff })
    } else if (method === 'PATCH' && pathname.startsWith('/api/staff/jobs/')) {
      if (forbidden(req, res, ['staff'])) return
      const id = pathname.split('/').pop()
      const job = staff.find((item) => item.id === id)
      if (!job) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy công việc.')); }
      else { const body = await readBody(req); job.status = body.status || job.status; sendJson(res, 200, { id: job.id, status: job.status }) }
    } else if (method === 'POST' && match('/api/bookings/:id/photos/preview', pathname)) {
      if (forbidden(req, res, ['staff'])) return
      const { id } = match('/api/bookings/:id/photos/preview', pathname)
      const booking = bookings.find((item) => item.id === id)
      await consumeBody(req)
      if (!booking) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy booking.')); return }
      booking.previewPhotos ||= []
      const nextId = `photo-${booking.previewPhotos.length + 1}`
      const photo = { id: nextId, bookingId: id, title: 'Preview', url: `/uploads/${nextId}.jpg` }
      booking.previewPhotos.push(photo)
      sendJson(res, 201, photo)
    } else if (method === 'PATCH' && match('/api/bookings/:id', pathname)) {
      if (forbidden(req, res, ['admin'])) return
      const { id } = match('/api/bookings/:id', pathname)
      const booking = bookings.find((item) => item.id === id)
      if (!booking) { status = 404; sendJson(res, status, error('NOT_FOUND', 'Không tìm thấy booking.')); return }
      const body = await readBody(req)
      Object.assign(booking, body)
      sendJson(res, 200, booking)
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
    status = cause.message === 'Invalid JSON' ? 400 : 500
    sendJson(res, status, error(status === 400 ? 'VALIDATION_ERROR' : 'INTERNAL_ERROR', status === 400 ? 'JSON không hợp lệ.' : 'Không thể xử lý yêu cầu.', {}))
  } finally {
    if (!res.writableEnded) return
    console.log(`${method} ${pathname} ${res.statusCode || status}`)
  }
})

server.listen(port, () => {
  console.log(`GradStudio mock server listening on http://localhost:${port} (${mode} mode)`)
})
