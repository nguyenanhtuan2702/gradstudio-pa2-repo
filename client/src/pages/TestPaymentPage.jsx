import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ApiError } from '../api/apiClient.js'
import { CUSTOMER_API_ENDPOINTS } from '../api/customerEndpoints.js'
import { useAuth } from '../auth/useAuth.js'
import { SiteFooter, SiteHeader } from '../components/SiteChrome.jsx'
import '../styles/customerFlow.css'

function formatCurrency(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '0đ'
  return `${new Intl.NumberFormat('vi-VN').format(value)}đ`
}

export default function TestPaymentPage() {
  const { id = 'GS-1024' } = useParams()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, request } = useAuth()

  const rawKind = searchParams.get('kind')
  const rawScenario = searchParams.get('scenario')
  const paymentId = (searchParams.get('paymentId') || '').trim()

  const isValidKind = rawKind === 'deposit' || rawKind === 'remaining'
  const isValidScenario = rawScenario === 'success' || rawScenario === 'failure'
  const hasValidParams = isValidKind && isValidScenario && Boolean(paymentId)

  const kind = rawKind === 'remaining' ? 'remaining' : 'deposit'
  const scenario = rawScenario === 'failure' ? 'failure' : 'success'
  const returnTo = location.state?.returnTo || `/bookings/${id}`

  const [bookingInfo, setBookingInfo] = useState(() => ({
    packageName: location.state?.packageName || '',
    deposit: kind === 'deposit' ? location.state?.amount : undefined,
    remaining: kind === 'remaining' ? location.state?.amount : undefined,
    status: '',
    paymentStatus: '',
  }))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmResult, setConfirmResult] = useState(null)
  const [confirmError, setConfirmError] = useState(null)

  const isCustomer = isAuthenticated && user?.role === 'customer'

  useEffect(() => {
    if (!isCustomer) return undefined
    let active = true

    request(CUSTOMER_API_ENDPOINTS.getBooking(id))
      .then((data) => {
        if (!active || !data) return
        setBookingInfo({
          packageName: data.packageName || '',
          deposit: data.deposit,
          remaining: data.remaining,
          status: data.status || '',
          paymentStatus: data.paymentStatus || '',
        })
      })
      .catch(() => {
        // Keep route/state fallback summary if booking preview fetch fails.
      })

    return () => {
      active = false
    }
  }, [id, isCustomer, request])

  const amountValue = kind === 'remaining'
    ? (typeof bookingInfo.remaining === 'number' ? bookingInfo.remaining : 1260000)
    : (typeof bookingInfo.deposit === 'number' ? bookingInfo.deposit : 540000)

  const amountLabel = kind === 'remaining'
    ? `${formatCurrency(amountValue)} (70% còn lại)`
    : `${formatCurrency(amountValue)} (Cọc 30%)`

  async function handleConfirmPayment() {
    if (!hasValidParams || isSubmitting || confirmResult || !isCustomer) return

    setConfirmError(null)
    setIsSubmitting(true)

    try {
      const result = await request(CUSTOMER_API_ENDPOINTS.confirmGatewayPayment(id), {
        method: 'POST',
        body: {
          paymentId,
          kind,
          result: scenario,
        },
      })

      setConfirmResult(result)
      setBookingInfo((prev) => ({
        ...prev,
        status: result?.bookingStatus ?? prev.status,
        paymentStatus: result?.paymentStatus ?? prev.paymentStatus,
        remaining: typeof result?.remaining === 'number' ? result.remaining : prev.remaining,
      }))
    } catch (error) {
      setConfirmError({
        status: error instanceof ApiError ? error.status : null,
        message: error?.message || 'Không thể xác nhận kết quả thanh toán với máy chủ.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleReturnToBooking() {
    navigate(returnTo, {
      state: confirmResult
        ? {
          paymentFeedback: {
            paymentId: confirmResult.paymentId || paymentId,
            kind: confirmResult.kind || kind,
            result: confirmResult.result || scenario,
            bookingStatus: confirmResult.bookingStatus,
            paymentStatus: confirmResult.paymentStatus,
            remaining: confirmResult.remaining,
          },
        }
        : undefined,
    })
  }

  const badgeProps = confirmResult
    ? confirmResult.result === 'success'
      ? { className: 'badge badge--ok', symbol: '✓', text: 'Giao dịch mô phỏng thành công' }
      : { className: 'badge badge--bad', symbol: '✕', text: 'Giao dịch mô phỏng thất bại' }
    : { className: 'badge badge--wait', symbol: '◷', text: 'Cổng thanh toán thử nghiệm (Test Gateway)' }

  return (
    <>
      <SiteHeader current="booking" />
      <main className="site-main login-main" id="main-content">
        <section className="gs-card gateway-card" aria-labelledby="gateway-title">
          <p>
            <span className={badgeProps.className}>
              <span aria-hidden="true">{badgeProps.symbol}</span> {badgeProps.text}
            </span>
          </p>
          <h1 id="gateway-title">Xác nhận giao dịch mô phỏng</h1>
          <p className="muted">
            Đây là màn hình cổng thanh toán thử nghiệm cho PA#3 — không thu thập thông tin thẻ và không thực hiện giao dịch tiền thật.
          </p>

          {!isCustomer ? (
            <div className="chat-auth-banner" role="alert">
              <p>
                Vui lòng đăng nhập bằng tài khoản <strong>Khách hàng</strong> sở hữu booking <code>{id}</code> để xác nhận phiên thanh toán.
              </p>
              <Link className="gs-btn gs-btn--primary" to="/login">
                Đăng nhập tài khoản Khách hàng
              </Link>
            </div>
          ) : !hasValidParams ? (
            <div className="chat-feedback-error" role="alert">
              Phiên thanh toán không hợp lệ hoặc thiếu tham số (<code>kind</code>, <code>scenario</code>, <code>paymentId</code>). Vui lòng quay lại trang chi tiết booking để khởi tạo phiên thanh toán mới.
            </div>
          ) : (
            <>
              <dl className="details">
                <div><dt>Mã booking</dt><dd><strong>{id}</strong></dd></div>
                {bookingInfo.packageName && (
                  <div><dt>Gói dịch vụ</dt><dd>{bookingInfo.packageName}</dd></div>
                )}
                <div><dt>Mã phiên thanh toán</dt><dd><code>{paymentId}</code></dd></div>
                <div>
                  <dt>Loại khoản thu</dt>
                  <dd>{kind === 'remaining' ? 'Thanh toán 70% còn lại' : 'Đặt cọc 30%'}</dd>
                </div>
                <div><dt>Số tiền</dt><dd><strong>{amountLabel}</strong></dd></div>
                <div>
                  <dt>Kịch bản đã chọn</dt>
                  <dd>{scenario === 'success' ? 'Thành công (success)' : 'Thất bại (failure)'}</dd>
                </div>
                {bookingInfo.status && (
                  <div><dt>Trạng thái booking hiện tại</dt><dd>{bookingInfo.status}</dd></div>
                )}
              </dl>

              {confirmError && (
                <div className="chat-feedback-error" role="alert">
                  <p><strong>Xác nhận giao dịch không thành công{confirmError.status ? ` (HTTP ${confirmError.status})` : ''}:</strong></p>
                  <p>{confirmError.message}</p>
                  {confirmError.status === 409 && (
                    <p className="meta">
                      Hệ thống đã kiểm tra lại tài nguyên/trạng thái booking nên không chuyển booking sang Đã đặt lịch.
                    </p>
                  )}
                </div>
              )}

              {confirmResult ? (
                <div
                  className={confirmResult.result === 'success' ? 'chat-feedback-ok' : 'chat-feedback-error'}
                  role={confirmResult.result === 'success' ? 'status' : 'alert'}
                  aria-live="polite"
                >
                  <p>
                    <strong>
                      {confirmResult.result === 'success'
                        ? (kind === 'remaining'
                          ? 'Đã xác nhận thanh toán đủ 100%.'
                          : 'Đã xác nhận đặt cọc 30% thành công và giữ lịch chụp.')
                        : (kind === 'remaining'
                          ? 'Giao dịch thanh toán 70% còn lại thất bại.'
                          : 'Giao dịch đặt cọc 30% thất bại. Booking vẫn ở trạng thái Chờ cọc 30% và chưa giữ lịch.')}
                    </strong>
                  </p>
                  <p className="meta">
                    Trạng thái booking: <strong>{confirmResult.bookingStatus}</strong>
                    {' · '}
                    Thanh toán: <strong>{confirmResult.paymentStatus}</strong>
                    {' · '}
                    Còn lại: <strong>{formatCurrency(confirmResult.remaining)}</strong>
                  </p>
                </div>
              ) : (
                <>
                  <button
                    className="gs-btn gs-btn--primary gs-btn--block"
                    type="button"
                    disabled={isSubmitting}
                    aria-describedby="gateway-confirm-note"
                    onClick={handleConfirmPayment}
                  >
                    {isSubmitting
                      ? 'Đang xác nhận giao dịch với hệ thống…'
                      : scenario === 'success'
                        ? 'Xác nhận thanh toán thành công'
                        : 'Xác nhận thanh toán thất bại'}
                  </button>

                  <p className="note" id="gateway-confirm-note">
                    {scenario === 'success'
                      ? (kind === 'deposit'
                        ? 'Khi xác nhận thành công, hệ thống sẽ kiểm tra lại nhân sự và phòng chụp trước khi chuyển booking sang Đã đặt lịch và tạo lịch nhắc.'
                        : 'Khi xác nhận thành công, hệ thống sẽ cập nhật trạng thái sang Đã thanh toán đủ và số tiền còn lại bằng 0đ.')
                      : 'Khi xác nhận thất bại, hệ thống giữ nguyên trạng thái trước đó để bạn có thể quay lại trang booking và thử lại.'}
                  </p>
                </>
              )}
            </>
          )}

          {confirmResult ? (
            <button
              className="gs-btn gs-btn--primary gs-btn--block"
              type="button"
              onClick={handleReturnToBooking}
            >
              Quay lại chi tiết booking {id}
            </button>
          ) : (
            <Link className="gs-btn gs-btn--secondary gs-btn--block" to={returnTo}>
              Quay lại chi tiết booking {id}
            </Link>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
