/**
 * Bản đồ các điểm tích hợp API phía Customer (G3, G6-Customer, G7, G9).
 * Tất cả đường dẫn sử dụng URL tương đối /api/... đi qua apiClient.js và AuthContext.request.
 */
export const CUSTOMER_API_ENDPOINTS = Object.freeze({
  // G3 & G6 — Hội thoại, gửi yêu cầu đặt lịch & phản hồi đề xuất giờ
  listConversations: '/api/conversations',
  sendMessage: (conversationId) => `/api/conversations/${conversationId}/messages`,
  sendBookingRequest: (conversationId) => `/api/conversations/${conversationId}/request`,
  respondProposal: (conversationId) => `/api/conversations/${conversationId}/agree`,

  // G7 — Chi tiết booking & khởi tạo thanh toán cọc 30%
  listBookings: '/api/bookings',
  getBooking: (bookingId) => `/api/bookings/${bookingId}`,
  startDepositPayment: (bookingId) => `/api/bookings/${bookingId}/deposit/payment`,

  // G9 — Chọn ảnh preview (tối đa 30 ảnh), khởi tạo thanh toán 70% & nhận ảnh hoàn thiện
  startRemainingPayment: (bookingId) => `/api/bookings/${bookingId}/payments/remaining`,
  receiveFinalPhotos: (bookingId) => `/api/bookings/${bookingId}/receive`,

  // G7 & G9 — Xác nhận kết quả từ trang Cổng thanh toán thử nghiệm (/payments/test/:id)
  confirmGatewayPayment: (bookingId) => `/api/bookings/${bookingId}/payments/confirm`,
})
