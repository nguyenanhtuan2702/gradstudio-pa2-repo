import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

function Header({ role = 'Khách hàng', name = 'Linh', studio = false }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-logo" to="/">GradStudio{studio && <small>Nhân viên studio</small>}</Link>
        <nav className="site-nav" aria-label={studio ? 'Khu vực nhân viên studio' : 'Điều hướng khách hàng'}>
          {studio ? <Link to="/studio" aria-current="page">Hội thoại</Link> : (
            <>
              <Link to="/">Dịch vụ</Link>
              <Link to="/bookings/GS-1024">Lịch chụp của tôi</Link>
            </>
          )}
        </nav>
        <p className="user-profile"><span className="user-avatar" aria-hidden="true">{name[0]}</span><span>{name} · {role}</span></p>
      </div>
    </header>
  )
}

function Footer({ compact = false }) {
  return (
    <footer className="site-footer">
      {compact ? (
        <>
          <p>GradStudio – Prototype React PA#3</p>
          <p>Dữ liệu minh họa: Nguyễn Thùy Linh · 24/10/2026 · GS-1024</p>
        </>
      ) : (
        <>
          <p><strong>GradStudio</strong> — studio ảnh kỷ yếu, tốt nghiệp và chân dung, TP. Hồ Chí Minh.</p>
          <p>Mở cửa 8:00–20:00 mỗi ngày. © 2026 GradStudio</p>
        </>
      )}
    </footer>
  )
}

function IndexPage() {
  return (
    <>
      <Header />
      <main className="site-main gs-stack" id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__body">
            <p className="meta">Studio ảnh tốt nghiệp &amp; chân dung</p>
            <h1 id="hero-title">Lưu lại ngày ra trường theo cách của bạn</h1>
            <p className="lead">Kỷ yếu lớp, tốt nghiệp, chân dung CV — tư vấn ngay trên web và chốt lịch rõ ràng cùng studio.</p>
            <div className="gs-cluster">
              <a className="gs-btn gs-btn--primary" href="#dich-vu">Xem gói chụp</a>
              <a className="gs-btn gs-btn--secondary" href="#chat">Hỏi studio về lịch</a>
            </div>
          </div>
          <figure className="hero__art"><img src="/assets/images/hero1.avif" alt="Ảnh mèo minh họa cho GradStudio" width="493" height="740" fetchPriority="high" /></figure>
        </section>
        <section id="dich-vu" aria-labelledby="services-title">
          <h2 id="services-title">Chọn buổi chụp của bạn</h2>
          <div className="card-grid">
            <article className="gs-card"><div className="service-art"><img className="service-art__image" src="/assets/images/KyYeu.jpg" alt="Ba con mèo trên nền lá khô" /></div><h3>Kỷ yếu lớp</h3><p>Một người đại diện đặt lịch cho cả lớp.</p><p className="price">Từ 350.000đ/người</p><a className="gs-btn gs-btn--secondary" href="#chat">Hỏi về gói này</a></article>
            <article className="gs-card gs-card--sunken"><div className="service-art service-art--b"><img className="service-art__image" src="/assets/images/TotNghiep.jpg" alt="Mèo con nhìn nghiêng giữa tán cây" /></div><h3>Tốt nghiệp</h3><p>Gói Tốt nghiệp Premium gồm 2 giờ chụp và 30 ảnh chỉnh.</p><p className="price">Từ 1.800.000đ</p><a className="gs-btn gs-btn--primary" href="#chat">Hỏi về gói này</a></article>
            <article className="gs-card"><div className="service-art service-art--c"><img className="service-art__image" src="/assets/images/ChanDung.jpg" alt="Chân dung mèo lông sáng" /></div><h3>Chân dung/CV</h3><p>Buổi chụp ngắn, chọn ảnh cần chỉnh và nhận file.</p><p className="price">Từ 690.000đ</p><a className="gs-btn gs-btn--secondary" href="#chat">Hỏi về gói này</a></article>
          </div>
        </section>
        <section id="chat" aria-labelledby="chat-title">
          <h2 id="chat-title">Trò chuyện với studio</h2>
          <div className="gs-card chat">
            <ol className="msg-list gs-list-reset" aria-label="Cuộc trò chuyện mẫu">
              <li className="msg msg--self"><span className="meta">Nguyễn Thùy Linh · 17:20</span><p className="msg__bubble">Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?</p></li>
              <li className="msg msg--other"><span className="meta">GradStudio · 17:21</span><p className="msg__bubble">Để mình kiểm tra lịch cho bạn nhé.</p></li>
            </ol>
            <div className="composer"><label className="gs-label" htmlFor="message">Tin nhắn</label><div className="composer__row"><input className="gs-input" id="message" type="text" disabled /><button className="gs-btn gs-btn--primary" type="button" disabled>Gửi</button></div><p className="gs-help">Gửi tin nhắn chưa khả dụng trong prototype PA#3.</p></div>
          </div>
          <nav className="next-step" aria-label="Bước tiếp theo"><Link className="gs-btn gs-btn--primary" to="/studio">Nhân viên studio: mở cuộc trò chuyện này</Link></nav>
        </section>
      </main>
      <Footer />
    </>
  )
}

function StudioPage() {
  return (
    <>
      <Header role="Admin" name="Thảo" studio />
      <main className="site-main gs-stack" id="main-content">
        <h1>Tư vấn và xử lý trùng lịch</h1>
        <p className="role-strip">Linh đã đồng ý giờ mới. Lịch chưa được giữ cho đến khi cọc 30% thành công.</p>
        <div className="admin-grid">
          <section className="admin-col" aria-labelledby="chat-title"><h2 id="chat-title">Hội thoại với Nguyễn Thùy Linh</h2><span className="badge badge--ok">Đã chốt lịch</span><div className="gs-card chat"><ol className="msg-list gs-list-reset"><li className="msg msg--other"><p className="msg__bubble">Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?</p></li><li className="msg msg--self"><p className="msg__bubble">Mai bận 08:00–12:00. Makeup 13:00–14:00, chụp 14:00–16:00 tại Phòng B.</p></li><li className="msg msg--other"><p className="msg__bubble">Dạ được, mình chọn 14:00 nhé.</p></li></ol></div></section>
          <section className="admin-col" aria-labelledby="form-title"><h2 id="form-title">Booking mới</h2><div className="gs-card gs-stack"><label className="gs-label" htmlFor="customer">Khách hàng</label><input className="gs-input" id="customer" value="Nguyễn Thùy Linh" readOnly /><label className="gs-label" htmlFor="package">Gói dịch vụ</label><input className="gs-input" id="package" value="Gói Tốt nghiệp Premium" readOnly /><Link className="gs-btn gs-btn--primary gs-btn--block" to="/bookings/GS-1024">Tạo booking</Link><p className="gs-help">Mở booking mẫu; chưa lưu hoặc giữ lịch.</p></div></section>
          <section className="admin-col" aria-labelledby="res-title"><h2 id="res-title">Lịch tài nguyên — 24/10/2026</h2><div className="note note--conflict"><strong>Xung đột: 09:00 không khả dụng</strong><p>Mai bận 08:00–12:00.</p></div><ul className="res-list gs-list-reset"><li className="res res--plan"><h3>Mai · Makeup artist</h3><p>13:00–14:00 — Nguyễn Thùy Linh · Gói Tốt nghiệp Premium</p></li><li className="res res--plan"><h3>Tuấn · Nhiếp ảnh</h3><p>14:00–16:00 · Phòng B · Nguyễn Thùy Linh</p></li></ul></section>
        </div>
        <nav className="next-step"><Link className="gs-btn gs-btn--secondary" to="/bookings/GS-1024">Khách hàng: xem lịch chụp GS-1024</Link></nav>
      </main>
      <Footer compact />
    </>
  )
}

function BookingPage() {
  return (
    <>
      <Header />
      <main className="site-main gs-stack" id="main-content">
        <h1>Lịch chụp của tôi</h1>
        <div className="booking-grid">
          <section className="gs-card gs-stack" aria-labelledby="timeline-title"><h2 id="timeline-title">Thứ Bảy, 24/10/2026</h2><ol className="timeline"><li className="is-unavailable"><p className="timeline__time"><del>09:00</del></p><p>Không khả dụng — Mai bận 08:00–12:00</p></li><li><p className="timeline__time">13:00–14:00</p><h3>Makeup với Mai</h3></li><li><p className="timeline__time">14:00–16:00</p><h3>Chụp ảnh với Tuấn · Phòng B</h3></li></ol></section>
          <section className="gs-card gs-stack" aria-labelledby="booking-title"><p><strong>Mã booking:</strong> GS-1024</p><span className="badge badge--wait">Đã thống nhất lịch · Chờ cọc 30%</span><h2 id="booking-title">Gói Tốt nghiệp Premium</h2><div className="price-box"><p className="price-row"><span>Tổng giá</span><strong>1.800.000đ</strong></p><p className="price-row price-row--due"><span>Cọc 30%</span><strong>540.000đ</strong></p><p className="price-row"><span>Còn lại 70%</span><strong>1.260.000đ</strong></p></div><button className="gs-btn gs-btn--primary gs-btn--block" type="button" disabled>Thanh toán cọc 30%</button><p className="note">Thanh toán chưa khả dụng trong prototype; lịch chưa được giữ.</p></section>
        </div>
      </main>
      <Footer compact />
    </>
  )
}

function NotFound() {
  return <main className="site-main"><h1>Không tìm thấy trang</h1><Link to="/">Quay lại trang chủ</Link></main>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/bookings/GS-1024" element={<BookingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
