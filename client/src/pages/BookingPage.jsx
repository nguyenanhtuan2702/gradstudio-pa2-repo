import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CUSTOMER_API_ENDPOINTS } from '../api/customerEndpoints.js'
import BookingPhotoGallery from '../components/BookingPhotoGallery.jsx'
import { SiteFooter, SiteHeader } from '../components/SiteChrome.jsx'
import '../styles/customerFlow.css'

const PREVIEW_BOOKING_SHELL = Object.freeze({
  id: 'GS-1024',
  customerName: 'Nguyễn Thùy Linh',
  shootType: 'Tốt nghiệp cá nhân',
  packageName: 'Gói Tốt nghiệp Premium',
  packageSummary: '2 giờ chụp · 30 ảnh chỉnh',
  dateLabel: 'Thứ Bảy, 24/10/2026',
  makeup: '13:00–14:00 với Mai',
  shoot: '14:00–16:00 với Tuấn · Phòng B',
  status: 'Chờ cọc 30%',
  paymentStatus: 'Chờ cọc',
  total: 1800000,
  deposit: 540000,
  remaining: 1260000,
  maxEditedPhotos: 30,
  previewPhotos: [
    {
      id: 'photo-1',
      bookingId: 'GS-1024',
      title: 'Ảnh tốt nghiệp mẫu 01',
      alt: 'Mèo con nhìn nghiêng giữa những tán cây xanh',
      url: '/assets/images/TotNghiep.jpg',
    },
    {
      id: 'photo-sample-2',
      bookingId: 'GS-1024',
      title: 'Ảnh kỷ yếu mẫu 02 (minh họa bố cục lưới)',
      alt: 'Ba con mèo ngồi cạnh nhau trên nền lá khô',
      url: '/assets/images/KyYeu.jpg',
    },
    {
      id: 'photo-sample-3',
      bookingId: 'GS-1024',
      title: 'Ảnh chân dung mẫu 03 (minh họa bố cục lưới)',
      alt: 'Chân dung cận cảnh mèo lông sáng trên nền tối',
      url: '/assets/images/ChanDung.jpg',
    },
  ],
  remindersSample: [
    {
      id: 'rem-1024-24h',
      title: 'Nhắc lịch make-up và chụp trước 24 giờ',
      scheduledAtLabel: '23/10/2026 · 13:00 (GMT+7)',
      channel: 'Email',
      recipient: 'linh@gradstudio.test',
      emailStatus: 'Chờ kích hoạt sau khi cọc 30%',
    },
  ],
})

function formatCurrency(value) {
  return `${new Intl.NumberFormat('vi-VN').format(value)}đ`
}

export default function BookingPage() {
  const { id = PREVIEW_BOOKING_SHELL.id } = useParams()
  const [depositScenario, setDepositScenario] = useState('success')
  const booking = { ...PREVIEW_BOOKING_SHELL, id }

  return (
    <>
      <SiteHeader current="booking" />
      <main className="site-main gs-stack" id="main-content">
        <section aria-labelledby="page-title">
          <h1 id="page-title">Lịch chụp của tôi</h1>
          <p className="lead">
            Xem lại lịch đã thống nhất với studio. Lịch chỉ được giữ sau khi thanh toán cọc 30% thành công và hệ thống kiểm tra lại tài nguyên.
          </p>
          <p className="role-strip">
            Khung giao diện Ngày 3 kế thừa từ <code>booking.html</code> (PA#2) cho mã <strong>{booking.id}</strong>: hiện hiển thị dữ liệu mẫu để kiểm tra bố cục G7 &amp; G9; truy vấn <code>GET {CUSTOMER_API_ENDPOINTS.getBooking(booking.id)}</code> và thanh toán thử nghiệm sẽ được kết nối ở Ngày 6–7.
          </p>
        </section>

        <div className="booking-grid">
          {/* Cột trái: Lịch tuần 43 + Timeline 3 mốc + Khung Nhắc lịch G7 */}
          <div className="gs-stack">
            <section className="gs-card gs-stack" aria-labelledby="week-title">
              <h2 id="week-title">Tháng 10, 2026 · Tuần 43</h2>
              <ol
                className="week"
                aria-label="Các ngày trong tuần, ngày chụp được đánh dấu là Thứ Bảy 24/10"
              >
                <li><span>T2</span><span>19</span></li>
                <li><span>T3</span><span>20</span></li>
                <li><span>T4</span><span>21</span></li>
                <li><span>T5</span><span>22</span></li>
                <li><span>T6</span><span>23</span></li>
                <li aria-current="date"><span>T7</span><span>24</span></li>
                <li><span>CN</span><span>25</span></li>
              </ol>
              <p className="meta">Ngày được đánh dấu (nền nâu): {booking.dateLabel}.</p>
            </section>

            <section className="gs-card gs-stack" aria-labelledby="timeline-title">
              <h2 id="timeline-title">Lịch trình {booking.dateLabel}</h2>
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
                  <p className="timeline__time">13:00–14:00</p>
                  <h3>Makeup với Mai</h3>
                  <p className="meta">Giờ makeup đã thống nhất</p>
                </li>
                <li>
                  <p className="timeline__time">14:00–16:00</p>
                  <h3>Chụp ảnh với Tuấn</h3>
                  <p className="meta">Phòng B · Giờ chụp đã thống nhất</p>
                </li>
              </ol>
            </section>

            <section className="gs-card gs-stack" aria-labelledby="reminders-title">
              <h2 id="reminders-title">Nhắc lịch &amp; thông báo email</h2>
              <p className="meta">
                Danh sách nhắc lịch từ trường <code>booking.reminders</code> (chỉ kích hoạt sau khi xác nhận đặt cọc 30% thành công ở bước G7; trạng thái email là dữ liệu mô phỏng của API mock).
              </p>
              <ul className="reminder-list gs-list-reset">
                {booking.remindersSample.map((reminder) => (
                  <li className="reminder-item" key={reminder.id}>
                    <div className="reminder-item__head">
                      <h3>{reminder.title}</h3>
                      <span className="badge badge--wait">
                        <span aria-hidden="true">◷</span> {reminder.emailStatus}
                      </span>
                    </div>
                    <p className="meta">
                      Kênh: <strong>{reminder.channel}</strong> · Người nhận: <code>{reminder.recipient}</code>
                    </p>
                    <p className="meta">Thời điểm gửi dự kiến: {reminder.scheduledAtLabel}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Cột phải: Chi tiết gói chụp, bảng giá & khởi tạo cọc 30% (G7) */}
          <section className="gs-card gs-stack" aria-labelledby="booking-title">
            <p className="status-row">
              <span className="meta">Mã booking</span> <strong>{booking.id}</strong>
            </p>
            <p>
              <span className="badge badge--wait">
                <span aria-hidden="true">◷</span> Đã thống nhất lịch · {booking.status}
              </span>
            </p>
            <h2 id="booking-title">{booking.packageName}</h2>
            <dl className="details">
              <div><dt>Khách hàng</dt><dd>{booking.customerName}</dd></div>
              <div><dt>Loại buổi chụp</dt><dd>{booking.shootType}</dd></div>
              <div><dt>Ngày</dt><dd>{booking.dateLabel}</dd></div>
              <div><dt>Makeup</dt><dd>{booking.makeup}</dd></div>
              <div><dt>Chụp ảnh</dt><dd>{booking.shoot}</dd></div>
              <div><dt>Bao gồm</dt><dd>{booking.packageSummary}</dd></div>
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

            <div className="field">
              <label className="gs-label" htmlFor="deposit-scenario">
                Kịch bản cổng thanh toán thử nghiệm (cọc 30%)
              </label>
              <select
                className="gs-select"
                id="deposit-scenario"
                value={depositScenario}
                onChange={(event) => setDepositScenario(event.target.value)}
                aria-describedby="deposit-scenario-help"
              >
                <option value="success">Kịch bản: Thanh toán thành công</option>
                <option value="failure">Kịch bản: Thanh toán thất bại</option>
              </select>
              <p className="gs-help" id="deposit-scenario-help">
                Thành công chỉ chuyển sang Đã đặt lịch sau khi kiểm tra lại tài nguyên; thất bại giữ nguyên Chờ cọc 30%.
              </p>
            </div>

            <button
              className="gs-btn gs-btn--primary gs-btn--block"
              type="button"
              disabled
              aria-describedby="pay-note"
            >
              Thanh toán cọc 30% ({formatCurrency(booking.deposit)})
            </button>
            <p className="note" id="pay-note">
              <strong>Chưa khởi tạo thanh toán trong khung UI Ngày 3.</strong> Booking vẫn ở trạng thái Chờ cọc 30%; lịch chưa được giữ. Ở bước G7, nút này sẽ gọi <code>POST {CUSTOMER_API_ENDPOINTS.startDepositPayment(booking.id)}</code> để mở cổng thanh toán thử nghiệm và chỉ giữ lịch sau khi xác nhận thành công.
            </p>
          </section>
        </div>

        {/* Khu vực G9: Thư viện ảnh preview, chọn tối đa 30 ảnh, thanh toán 70% & nhận ảnh */}
        <BookingPhotoGallery
          bookingId={booking.id}
          previewPhotos={booking.previewPhotos}
          maxEditedPhotos={booking.maxEditedPhotos}
          remainingAmount={booking.remaining}
          paymentStatus={booking.paymentStatus}
          finalFileLink=""
        />

        <nav className="next-step" aria-label="Điều hướng khách hàng">
          <p className="meta">Khách hàng: tiếp tục khám phá dịch vụ và tư vấn</p>
          <Link className="gs-btn gs-btn--secondary" to="/">Quay lại trang dịch vụ</Link>
        </nav>
      </main>
      <SiteFooter />
    </>
  )
}
