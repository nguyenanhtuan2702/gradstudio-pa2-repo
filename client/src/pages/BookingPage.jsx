import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ApiError } from '../api/apiClient.js'
import { CUSTOMER_API_ENDPOINTS } from '../api/customerEndpoints.js'
import { useAuth } from '../auth/useAuth.js'
import { EmptyState, ErrorState, LoadingState } from '../components/AsyncStates.jsx'
import BookingPhotoGallery from '../components/BookingPhotoGallery.jsx'
import { SiteFooter, SiteHeader } from '../components/SiteChrome.jsx'
import '../styles/customerFlow.css'

const DEFAULT_BOOKING_ID = 'GS-1024'
const WEEKDAY_SHORT = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
const WEEKDAY_LONG = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']

function formatCurrency(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '0đ'
  return `${new Intl.NumberFormat('vi-VN').format(value)}đ`
}

function parseIsoDateUtc(isoDate) {
  if (typeof isoDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return null
  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  if (
    date.getUTCFullYear() !== year
    || date.getUTCMonth() !== month - 1
    || date.getUTCDate() !== day
  ) {
    return null
  }
  return date
}

function formatDateLabelVi(isoDate) {
  const date = parseIsoDateUtc(isoDate)
  if (!date) return isoDate || 'Chưa xác định'
  const weekday = WEEKDAY_LONG[date.getUTCDay()]
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()
  return `${weekday}, ${day}/${month}/${year}`
}

function getIsoWeekNumber(date) {
  const target = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
  const dayNum = target.getUTCDay() || 7
  target.setUTCDate(target.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1))
  return Math.ceil((((target - yearStart) / 86400000) + 1) / 7)
}

function buildWeekStrip(isoDate) {
  const date = parseIsoDateUtc(isoDate)
  if (!date) {
    return {
      heading: 'Tháng 10, 2026 · Tuần 43',
      ariaLabel: 'Các ngày trong tuần, ngày chụp được đánh dấu là Thứ Bảy 24/10',
      days: [
        { short: 'T2', dayNumber: 19, current: false },
        { short: 'T3', dayNumber: 20, current: false },
        { short: 'T4', dayNumber: 21, current: false },
        { short: 'T5', dayNumber: 22, current: false },
        { short: 'T6', dayNumber: 23, current: false },
        { short: 'T7', dayNumber: 24, current: true },
        { short: 'CN', dayNumber: 25, current: false },
      ],
    }
  }

  const month = date.getUTCMonth() + 1
  const year = date.getUTCFullYear()
  const weekNumber = getIsoWeekNumber(date)
  const dayOfWeekIndex = (date.getUTCDay() + 6) % 7 // Monday = 0 .. Sunday = 6
  const monday = new Date(date.getTime())
  monday.setUTCDate(date.getUTCDate() - dayOfWeekIndex)

  const days = WEEKDAY_SHORT.map((short, index) => {
    const currentDay = new Date(monday.getTime())
    currentDay.setUTCDate(monday.getUTCDate() + index)
    return {
      short,
      dayNumber: currentDay.getUTCDate(),
      current: index === dayOfWeekIndex,
    }
  })

  return {
    heading: `Tháng ${month}, ${year} · Tuần ${weekNumber}`,
    ariaLabel: `Các ngày trong tuần, ngày chụp được đánh dấu là ${formatDateLabelVi(isoDate)}`,
    days,
  }
}

function formatScheduledAt(scheduledAt) {
  if (!scheduledAt) return 'Chưa xác định'
  const parsed = new Date(scheduledAt)
  if (Number.isNaN(parsed.getTime())) return String(scheduledAt)
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(parsed)
}

function getBookingStatusBadge(booking) {
  if (booking.cancelled) {
    return {
      className: 'badge badge--bad',
      symbol: '✕',
      label: 'Đã hủy bởi studio',
    }
  }
  if (booking.status === 'Hoàn thành') {
    return {
      className: 'badge badge--ok',
      symbol: '✓',
      label: `Hoàn thành · ${booking.paymentStatus}`,
    }
  }
  if (booking.status === 'Đã đặt lịch') {
    return {
      className: 'badge badge--ok',
      symbol: '✓',
      label: `Đã đặt lịch · ${booking.paymentStatus}`,
    }
  }
  return {
    className: 'badge badge--wait',
    symbol: '◷',
    label: `Đã thống nhất lịch · ${booking.status}`,
  }
}

export default function BookingPage() {
  const { id = DEFAULT_BOOKING_ID } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, request } = useAuth()

  const [resource, setResource] = useState(null)
  const [reloadCount, setReloadCount] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [depositScenario, setDepositScenario] = useState('success')
  const [depositSubmitting, setDepositSubmitting] = useState(false)
  const [depositError, setDepositError] = useState('')

  const paymentFeedback = location.state?.paymentFeedback ?? null
  const [dismissedFeedbackKey, setDismissedFeedbackKey] = useState('')
  const currentFeedbackKey = paymentFeedback
    ? `${paymentFeedback.paymentId}-${paymentFeedback.result}-${paymentFeedback.kind}`
    : ''
  const visiblePaymentFeedback = paymentFeedback && dismissedFeedbackKey !== currentFeedbackKey
    ? paymentFeedback
    : null

  const canAccessBooking = isAuthenticated && (user?.role === 'customer' || user?.role === 'admin')
  const isBookingCustomer = isAuthenticated && user?.role === 'customer'
  const requestKey = `${id}:${reloadCount}`

  useEffect(() => {
    if (!canAccessBooking) return undefined
    let active = true

    request(CUSTOMER_API_ENDPOINTS.getBooking(id))
      .then((data) => {
        if (!active) return
        setResource({ key: requestKey, status: 'success', booking: data, error: null })
        setIsRefreshing(false)
      })
      .catch((error) => {
        if (!active) return
        if (error instanceof ApiError && error.status === 404) {
          setResource({ key: requestKey, status: 'not_found', booking: null, error })
        } else {
          setResource((prev) => ({
            key: requestKey,
            status: prev?.booking && prev.booking.id === id ? 'success' : 'error',
            booking: prev?.booking && prev.booking.id === id ? prev.booking : null,
            error,
          }))
        }
        setIsRefreshing(false)
      })

    return () => {
      active = false
    }
  }, [canAccessBooking, id, request, requestKey])

  function handleRetryLoad() {
    setResource(null)
    setReloadCount((current) => current + 1)
  }

  function handleSilentRefresh() {
    setIsRefreshing(true)
    setReloadCount((current) => current + 1)
  }

  const booking = resource?.booking ?? null
  const loadState = !canAccessBooking
    ? 'idle'
    : resource?.key === requestKey || (isRefreshing && resource?.booking)
      ? resource.status
      : 'loading'
  const loadError = resource?.error ?? null

  async function handleStartDepositPayment() {
    if (!booking || depositSubmitting) return
    setDepositError('')
    setDepositSubmitting(true)

    try {
      const session = await request(CUSTOMER_API_ENDPOINTS.startDepositPayment(booking.id), {
        method: 'POST',
        body: { scenario: depositScenario },
      })

      if (!session?.gatewayUrl || !session?.paymentId) {
        throw new Error('Phản hồi khởi tạo thanh toán không có đường dẫn cổng thanh toán.')
      }

      navigate(session.gatewayUrl, {
        state: {
          bookingId: booking.id,
          amount: booking.deposit,
          packageName: booking.packageName,
          returnTo: `/bookings/${booking.id}`,
        },
      })
    } catch (error) {
      setDepositError(error?.message || 'Không thể khởi tạo phiên thanh toán cọc 30%.')
      if (error instanceof ApiError && error.status === 409) {
        handleSilentRefresh()
      }
    } finally {
      setDepositSubmitting(false)
    }
  }

  const dateLabel = booking ? formatDateLabelVi(booking.date) : ''
  const weekStrip = booking ? buildWeekStrip(booking.date) : null
  const reminders = Array.isArray(booking?.reminders) ? booking.reminders : []
  const statusBadge = booking ? getBookingStatusBadge(booking) : null
  const isWaitingDeposit = Boolean(booking && !booking.cancelled && booking.status === 'Chờ cọc 30%')
  const isDepositConfirmed = Boolean(
    booking && !booking.cancelled && (booking.status === 'Đã đặt lịch' || booking.status === 'Hoàn thành'),
  )
  const makeupSummary = booking?.makeup?.includes('Mai')
    ? booking.makeup
    : `${booking?.makeup || '13:00–14:00'} với Mai`
  const shootSummary = booking?.shoot?.includes('Tuấn')
    ? booking.shoot
    : `${booking?.shoot || '14:00–16:00'} với Tuấn · ${booking?.room || 'Phòng B'}`
  const packageSummary = booking?.packageSummary
    || `2 giờ chụp · ${booking?.maxEditedPhotos ?? 30} ảnh chỉnh`

  return (
    <>
      <SiteHeader current="booking" />
      <main className="site-main gs-stack" id="main-content">
        <section className="booking-page-head" aria-labelledby="page-title">
          <div className="booking-page-head__row">
            <div>
              <h1 id="page-title">Lịch chụp của tôi</h1>
              <p className="lead">
                Xem lại lịch đã thống nhất với studio. Lịch chỉ được giữ sau khi thanh toán cọc 30% thành công và hệ thống kiểm tra lại tài nguyên.
              </p>
            </div>
            {canAccessBooking && loadState === 'success' && (
              <button
                className="gs-btn gs-btn--secondary"
                type="button"
                disabled={isRefreshing}
                onClick={handleSilentRefresh}
              >
                {isRefreshing ? 'Đang cập nhật…' : 'Tải lại trạng thái'}
              </button>
            )}
          </div>
        </section>

        {visiblePaymentFeedback && (
          <div
            className={visiblePaymentFeedback.result === 'success' ? 'chat-feedback-ok booking-feedback-banner' : 'chat-feedback-error booking-feedback-banner'}
            role={visiblePaymentFeedback.result === 'success' ? 'status' : 'alert'}
            aria-live="polite"
          >
            <div>
              <p>
                <strong>
                  {visiblePaymentFeedback.result === 'success'
                    ? (visiblePaymentFeedback.kind === 'remaining'
                      ? 'Thanh toán 70% còn lại thành công.'
                      : 'Thanh toán cọc 30% thành công — lịch chụp đã được giữ chỗ.')
                    : (visiblePaymentFeedback.kind === 'remaining'
                      ? 'Thanh toán 70% còn lại thất bại.'
                      : 'Thanh toán cọc 30% thất bại — booking vẫn ở trạng thái Chờ cọc 30%.')}
                </strong>
              </p>
              <p className="meta">
                Phiên <code>{visiblePaymentFeedback.paymentId}</code>
                {' · '}
                Trạng thái booking: <strong>{visiblePaymentFeedback.bookingStatus}</strong>
                {' · '}
                Thanh toán: <strong>{visiblePaymentFeedback.paymentStatus}</strong>
              </p>
            </div>
            <button
              className="gs-btn gs-btn--secondary"
              type="button"
              onClick={() => setDismissedFeedbackKey(currentFeedbackKey)}
            >
              Đóng thông báo
            </button>
          </div>
        )}

        {!canAccessBooking ? (
          <div className="chat-auth-banner" role="region" aria-label="Yêu cầu đăng nhập">
            <p>
              Vui lòng đăng nhập bằng tài khoản <strong>Khách hàng</strong> để xem chi tiết booking <code>{id}</code> và thực hiện thanh toán cọc 30%.
            </p>
            <Link className="gs-btn gs-btn--primary" to="/login">
              Đăng nhập tài khoản Khách hàng
            </Link>
          </div>
        ) : loadState === 'loading' ? (
          <LoadingState label={`Đang tải chi tiết booking ${id}…`} />
        ) : loadState === 'error' ? (
          <ErrorState
            error={loadError}
            label={`Không tải được thông tin booking ${id}.`}
            onRetry={handleRetryLoad}
          />
        ) : loadState === 'not_found' || !booking ? (
          <EmptyState title={`Không tìm thấy booking ${id}`} headingLevel={2}>
            Booking có thể chưa được tạo từ hội thoại hoặc mã đặt lịch không tồn tại. Vui lòng kiểm tra lại hội thoại tư vấn với studio.
          </EmptyState>
        ) : (
          <>
            <div className="booking-grid">
              {/* Cột trái: Lịch tuần + Timeline + Nhắc lịch G7 */}
              <div className="gs-stack">
                <section className="gs-card gs-stack" aria-labelledby="week-title">
                  <h2 id="week-title">{weekStrip.heading}</h2>
                  <ol className="week" aria-label={weekStrip.ariaLabel}>
                    {weekStrip.days.map((day) => (
                      <li
                        key={`${day.short}-${day.dayNumber}`}
                        aria-current={day.current ? 'date' : undefined}
                      >
                        <span>{day.short}</span>
                        <span>{day.dayNumber}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="meta">Ngày được đánh dấu (nền nâu): {dateLabel}.</p>
                </section>

                <section className="gs-card gs-stack" aria-labelledby="timeline-title">
                  <h2 id="timeline-title">Lịch trình {dateLabel}</h2>
                  <ol className="timeline">
                    <li className="is-unavailable">
                      <p className="timeline__time"><del>09:00</del></p>
                      <p>Giờ bạn yêu cầu ban đầu</p>
                      <p>
                        <span className="badge badge--bad">
                          <span aria-hidden="true">✕</span> Không khả dụng
                        </span>
                      </p>
                      <p className="meta">Makeup artist Mai bận 08:00–12:00.</p>
                    </li>
                    <li>
                      <p className="timeline__time">{booking.makeup}</p>
                      <h3>Makeup với Mai</h3>
                      <p className="meta">
                        {booking.cancelled
                          ? 'Lịch makeup đã hủy'
                          : isDepositConfirmed
                            ? 'Đã giữ lịch makeup sau khi xác nhận cọc 30%'
                            : 'Giờ makeup đã thống nhất (chưa giữ chỗ)'}
                      </p>
                    </li>
                    <li>
                      <p className="timeline__time">{booking.shoot}</p>
                      <h3>Chụp ảnh với Tuấn</h3>
                      <p className="meta">
                        {booking.room || 'Phòng B'}
                        {' · '}
                        {booking.cancelled
                          ? 'Lịch chụp đã hủy'
                          : isDepositConfirmed
                            ? 'Đã giữ phòng và nhân sự sau khi xác nhận cọc 30%'
                            : 'Giờ chụp đã thống nhất (chưa giữ chỗ)'}
                      </p>
                    </li>
                  </ol>
                </section>

                <section className="gs-card gs-stack" aria-labelledby="reminders-title">
                  <h2 id="reminders-title">Nhắc lịch &amp; thông báo email</h2>
                  <p className="meta">
                    Danh sách nhắc lịch lấy từ <code>booking.reminders</code> (trạng thái email là dữ liệu mô phỏng của API mock, không gửi email thật).
                  </p>
                  {reminders.length ? (
                    <ul className="reminder-list gs-list-reset">
                      {reminders.map((reminder) => {
                        const isSent = reminder.emailStatus === 'Đã gửi'
                        return (
                          <li className="reminder-item" key={reminder.id}>
                            <div className="reminder-item__head">
                              <h3>{reminder.title}</h3>
                              <span className={`badge ${isSent ? 'badge--ok' : 'badge--wait'}`}>
                                <span aria-hidden="true">{isSent ? '✓' : '◷'}</span> {reminder.emailStatus}
                              </span>
                            </div>
                            <p className="meta">
                              Kênh: <strong>{reminder.channel}</strong> · Người nhận: <code>{reminder.recipient}</code>
                            </p>
                            <p className="meta">
                              Thời điểm gửi: <time dateTime={reminder.scheduledAt}>{formatScheduledAt(reminder.scheduledAt)}</time>
                            </p>
                          </li>
                        )
                      })}
                    </ul>
                  ) : (
                    <EmptyState title="Chưa có lịch nhắc tự động" headingLevel={3}>
                      {booking.cancelled
                        ? 'Booking này đã bị studio hủy nên các lịch nhắc tự động đã tắt.'
                        : `Booking đang ở trạng thái ${booking.status}; nhắc lịch email mô phỏng chỉ được tạo sau khi xác nhận đặt cọc 30% thành công.`}
                    </EmptyState>
                  )}
                </section>
              </div>

              {/* Cột phải: Chi tiết gói chụp, bảng giá & thanh toán cọc 30% (G7) */}
              <section className="gs-card gs-stack" aria-labelledby="booking-title">
                <p className="status-row">
                  <span className="meta">Mã booking</span> <strong>{booking.id}</strong>
                </p>
                <p>
                  <span className={statusBadge.className}>
                    <span aria-hidden="true">{statusBadge.symbol}</span> {statusBadge.label}
                  </span>
                </p>
                <h2 id="booking-title">{booking.packageName}</h2>
                <dl className="details">
                  <div><dt>Khách hàng</dt><dd>{booking.customerName}</dd></div>
                  <div><dt>Loại buổi chụp</dt><dd>{booking.shootType || 'Tốt nghiệp cá nhân'}</dd></div>
                  <div><dt>Ngày</dt><dd>{dateLabel}</dd></div>
                  <div><dt>Makeup</dt><dd>{makeupSummary}</dd></div>
                  <div><dt>Chụp ảnh</dt><dd>{shootSummary}</dd></div>
                  <div><dt>Bao gồm</dt><dd>{packageSummary}</dd></div>
                  <div><dt>Thanh toán</dt><dd>{booking.paymentStatus}</dd></div>
                </dl>

                <div className="price-box">
                  <p className="price-row">
                    <span>Tổng giá</span>
                    <strong>{formatCurrency(booking.total)}</strong>
                  </p>
                  <p className="price-row price-row--due">
                    <span>Cọc 30%</span>
                    <strong>{formatCurrency(booking.deposit)}</strong>
                  </p>
                  <p className="price-row">
                    <span>Còn lại 70% (thanh toán sau buổi chụp)</span>
                    <strong>{formatCurrency(booking.remaining)}</strong>
                  </p>
                </div>

                {booking.cancelled ? (
                  <div className="chat-feedback-error" role="alert">
                    Booking <strong>{booking.id}</strong> đã bị studio hủy. Không thể tiếp tục khởi tạo thanh toán cho lịch này.
                  </div>
                ) : isWaitingDeposit ? (
                  <>
                    <div className="field">
                      <label className="gs-label" htmlFor="deposit-scenario">
                        Kịch bản cổng thanh toán thử nghiệm (cọc 30%)
                      </label>
                      <select
                        className="gs-select"
                        id="deposit-scenario"
                        value={depositScenario}
                        disabled={depositSubmitting || !isBookingCustomer}
                        onChange={(event) => {
                          setDepositScenario(event.target.value)
                          setDepositError('')
                        }}
                        aria-describedby="deposit-scenario-help"
                      >
                        <option value="success">Kịch bản: Thanh toán thành công</option>
                        <option value="failure">Kịch bản: Thanh toán thất bại</option>
                      </select>
                      <p className="gs-help" id="deposit-scenario-help">
                        Khởi tạo phiên thanh toán chưa đổi trạng thái hay giữ lịch. Chỉ khi xác nhận thành công trên cổng thử nghiệm và kiểm tra lại tài nguyên khả dụng, booking mới chuyển sang <strong>Đã đặt lịch</strong>.
                      </p>
                    </div>

                    {depositError && (
                      <p className="chat-feedback-error" role="alert">
                        {depositError}
                      </p>
                    )}

                    <button
                      className="gs-btn gs-btn--primary gs-btn--block"
                      type="button"
                      disabled={depositSubmitting || !isBookingCustomer}
                      aria-describedby="pay-note"
                      onClick={handleStartDepositPayment}
                    >
                      {depositSubmitting
                        ? 'Đang mở cổng thanh toán thử nghiệm…'
                        : `Thanh toán cọc 30% (${formatCurrency(booking.deposit)})`}
                    </button>
                    <p className="note" id="pay-note">
                      <strong>Lưu ý giữ chỗ:</strong> Booking hiện ở trạng thái <strong>Chờ cọc 30%</strong>; nhân sự và phòng chưa được giữ cho đến khi bước xác nhận thanh toán thành công.
                    </p>
                  </>
                ) : (
                  <div className="chat-feedback-ok" role="status">
                    {booking.status === 'Hoàn thành'
                      ? 'Booking đã hoàn tất toàn bộ quy trình đặt lịch, thanh toán và nhận ảnh hoàn thiện.'
                      : 'Khoản cọc 30% đã được xác nhận thành công. Lịch chụp, nhân sự (Mai, Tuấn), phòng chụp và nhắc lịch email mô phỏng đã được kích hoạt.'}
                  </div>
                )}
              </section>
            </div>

            {/* Khu vực G9: Thư viện ảnh preview, chọn tối đa 30 ảnh, thanh toán 70% & nhận ảnh */}
            <BookingPhotoGallery
              bookingId={booking.id}
              previewPhotos={booking.previewPhotos}
              selectedPhotoIds={booking.selectedPhotoIds}
              maxEditedPhotos={booking.maxEditedPhotos}
              remainingAmount={booking.remaining}
              paymentStatus={booking.paymentStatus}
              finalFileLink={booking.finalFileLink}
            />
          </>
        )}

        <nav className="next-step" aria-label="Điều hướng khách hàng">
          <p className="meta">Khách hàng: tiếp tục khám phá dịch vụ và tư vấn</p>
          <Link className="gs-btn gs-btn--secondary" to="/">Quay lại trang dịch vụ</Link>
        </nav>
      </main>
      <SiteFooter />
    </>
  )
}
