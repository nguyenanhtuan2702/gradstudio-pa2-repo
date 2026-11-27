import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import { getRoleHomePath, ROLE_LABELS } from './auth/roles.js'
import { useAuth } from './auth/useAuth.js'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SuperadminPage from './pages/SuperadminPage.jsx'
import { SiteFooter, SiteHeader } from './components/SiteChrome.jsx'

function HomeRoute() {
  const { user } = useAuth()
  if (user && user.role !== 'customer') {
    return <Navigate to={getRoleHomePath(user.role)} replace />
  }
  return <HomePage />
}

function LoginRoute() {
  const { user } = useAuth()
  if (user) return <Navigate to={getRoleHomePath(user.role)} replace />
  return <LoginPage />
}

function StudioPage() {
  return (
    <>
      <SiteHeader current="studio" />
      <main className="site-main gs-stack" id="main-content">
        <h1>Tư vấn và xử lý trùng lịch</h1>
        <p className="role-strip">Khu vực Admin đang chờ tích hợp các luồng G4–G6 và G10 với API PA#3.</p>
        <section className="gs-card page-placeholder" aria-labelledby="studio-preview-title">
          <h2 id="studio-preview-title">Bản xem trước PA#2</h2>
          <p>Nội dung hội thoại và lịch mẫu trên trang này chưa được tải từ API, chưa tạo booking và chưa giữ chỗ.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

function BookingPage() {
  return (
    <>
      <SiteHeader current="booking" />
      <main className="site-main gs-stack" id="main-content">
        <h1>Lịch chụp của tôi</h1>
        <p className="role-strip">Khu vực Customer đang chờ tích hợp G7 và G9 với API PA#3.</p>
        <section className="gs-card page-placeholder" aria-labelledby="booking-preview-title">
          <h2 id="booking-preview-title">Bản xem trước PA#2 · GS-1024</h2>
          <p>Nội dung lịch và khoản cọc hiện là dữ liệu minh họa; chưa truy vấn booking, khởi tạo thanh toán hoặc giữ lịch.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

function RoleHomePage({ role, title, description }) {
  const { user } = useAuth()
  return (
    <>
      <SiteHeader current={role} />
      <main className="site-main gs-stack" id="main-content">
        <h1>{title}</h1>
        <section className="gs-card page-placeholder" aria-labelledby="role-home-title">
          <h2 id="role-home-title">Xin chào, {user?.name}</h2>
          <p>{description}</p>
          <p className="muted">Đã đăng nhập với vai trò {ROLE_LABELS[role]}.</p>
          {role === 'staff' && <p>Danh sách công việc và cập nhật tiến độ thuộc G8, đang được triển khai.</p>}
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="site-main gs-stack" id="main-content">
        <h1>Không tìm thấy trang</h1>
        <p>Địa chỉ này chưa có màn hình trong prototype PA#3.</p>
        <Link className="gs-btn gs-btn--secondary" to="/">Quay lại trang chủ</Link>
      </main>
      <SiteFooter />
    </>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/studio" element={(
        <ProtectedRoute allowedRoles={['admin']}>
          <StudioPage />
        </ProtectedRoute>
      )} />
      <Route path="/bookings/GS-1024" element={(
        <ProtectedRoute allowedRoles={['customer']}>
          <BookingPage />
        </ProtectedRoute>
      )} />
      <Route path="/staff" element={(
        <ProtectedRoute allowedRoles={['staff']}>
          <RoleHomePage role="staff" title="Khu vực nhân viên" description="Trang này là điểm vào của nhân viên studio." />
        </ProtectedRoute>
      )} />
      <Route path="/superadmin" element={(
        <ProtectedRoute allowedRoles={['superadmin']}>
          <SuperadminPage />
        </ProtectedRoute>
      )} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
