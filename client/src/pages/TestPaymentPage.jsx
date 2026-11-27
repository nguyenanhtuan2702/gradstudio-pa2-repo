import { Link, useParams, useSearchParams } from 'react-router-dom'
import { CUSTOMER_API_ENDPOINTS } from '../api/customerEndpoints.js'
import { SiteFooter, SiteHeader } from '../components/SiteChrome.jsx'
import '../styles/customerFlow.css'

export default function TestPaymentPage() {
  const { id = 'GS-1024' } = useParams()
  const [searchParams] = useSearchParams()

  const kind = searchParams.get('kind') === 'remaining' ? 'remaining' : 'deposit'
  const scenario = searchParams.get('scenario') === 'failure' ? 'failure' : 'success'
  const paymentId = searchParams.get('paymentId') || (kind === 'remaining' ? 'pay-rest-1024' : 'pay-deposit-1024')
  const amountLabel = kind === 'remaining' ? '1.260.000đ (70% còn lại)' : '540.000đ (Cọc 30%)'

  return (
    <>
      <SiteHeader current="booking" />
      <main className="site-main login-main" id="main-content">
        <section className="gs-card gateway-card" aria-labelledby="gateway-title">
          <span className="badge badge--wait">
            <span aria-hidden="true">◷</span> Cổng thanh toán thử nghiệm (Test Gateway)
          </span>
          <h1 id="gateway-title">Xác nhận giao dịch mô phỏng</h1>
          <p className="muted">
            Đây là màn hình mô phỏng kết quả thanh toán cho PA#3 — không thu thông tin thẻ hoặc thực hiện giao dịch tiền thật.
          </p>

          <dl className="details">
            <div><dt>Mã booking</dt><dd>{id}</dd></div>
            <div><dt>Mã phiên thanh toán</dt><dd><code>{paymentId}</code></dd></div>
            <div><dt>Loại khoản thu</dt><dd>{kind === 'remaining' ? 'Thanh toán 70% còn lại' : 'Đặt cọc 30%'}</dd></div>
            <div><dt>Số tiền</dt><dd>{amountLabel}</dd></div>
            <div><dt>Kịch bản đã chọn</dt><dd>{scenario === 'success' ? 'Thành công (success)' : 'Thất bại (failure)'}</dd></div>
          </dl>

          <button
            className="gs-btn gs-btn--primary gs-btn--block"
            type="button"
            disabled
            aria-describedby="gateway-shell-note"
          >
            Xác nhận kết quả mô phỏng ({scenario})
          </button>

          <p className="note" id="gateway-shell-note">
            <strong>Khung giao diện Ngày 3:</strong> Nút xác nhận qua <code>POST {CUSTOMER_API_ENDPOINTS.confirmGatewayPayment(id)}</code> sẽ được kết nối cùng bước G7 (cọc 30%) và G9 (70% còn lại).
          </p>

          <Link className="gs-btn gs-btn--secondary gs-btn--block" to={`/bookings/${id}`}>
            Quay lại chi tiết booking {id}
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
