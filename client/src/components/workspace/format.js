import { ApiError } from '../../api/apiClient.js'

export const CONVERSATION_STATUSES = Object.freeze(['Chưa trả lời', 'Đang tư vấn', 'Đã chốt lịch', 'Hoàn thành'])

export const ALL_STATUSES = 'Tất cả'

export function filterConversations(conversations, filter) {
  return filter === ALL_STATUSES ? conversations : conversations.filter((item) => item.status === filter)
}

const STATUS_TONES = Object.freeze({
  'Chưa trả lời': 'bad',
  'Đang tư vấn': 'wait',
  'Đã chốt lịch': 'ok',
  'Hoàn thành': 'ok',
  'Chờ cọc 30%': 'wait',
  'Đã đặt lịch': 'ok',
})

export function statusTone(status) {
  return STATUS_TONES[status] || 'wait'
}

export function formatCurrency(value) {
  return Number.isFinite(value) ? `${new Intl.NumberFormat('vi-VN').format(value)}đ` : 'Chưa có'
}

export function formatDate(value) {
  const found = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '')
  if (!found) return value || 'Chưa có ngày'
  const date = new Date(Number(found[1]), Number(found[2]) - 1, Number(found[3]))
  return new Intl.DateTimeFormat('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
}

export function normalizeTimeRange(value) {
  return value.trim().replace(/\s*[-–—]\s*/, '–')
}

export function isTimeRange(value) {
  const found = /^([01]\d|2[0-3]):([0-5]\d)–([01]\d|2[0-3]):([0-5]\d)$/.exec(normalizeTimeRange(value))
  return Boolean(found) && `${found[3]}${found[4]}` > `${found[1]}${found[2]}`
}

export function splitNames(value) {
  return value.split(',').map((name) => name.trim()).filter(Boolean)
}

export function errorMessage(error) {
  return error instanceof ApiError ? error.message : 'Không kết nối được máy chủ. Vui lòng thử lại.'
}
