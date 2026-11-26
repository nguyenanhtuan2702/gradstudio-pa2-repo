import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth.js'
import { getRoleHomePath, ROLE_LABELS } from '../auth/roles.js'

export function SiteHeader({ current = 'home' }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [loggingOut, setLoggingOut] = useState(false)
  const homePath = getRoleHomePath(user?.role)
  const navLabel = user?.role === 'admin'
    ? 'Điều hướng quản trị studio'
    : user?.role === 'staff'
      ? 'Điều hướng nhân viên'
      : user?.role === 'superadmin'
        ? 'Điều hướng quản trị hệ thống'
        : 'Điều hướng khách hàng'

  async function handleLogout() {
    setLoggingOut(true)
    let requestFailed = false
    try {
      await logout()
    } catch {
      requestFailed = true
    } finally {
      setLoggingOut(false)
      navigate(requestFailed ? '/login' : '/', {
        replace: true,
        state: requestFailed ? { notice: 'Phiên đã được xóa trên trình duyệt nhưng máy chủ chưa xác nhận đăng xuất.' } : undefined,
      })
    }
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Bỏ qua điều hướng, đến nội dung chính</a>
      <header className="site-header">
        <div className="site-header__inner">
          <Link className="site-logo" to={homePath}>GradStudio</Link>
          <nav className="site-nav" aria-label={navLabel}>
            {user?.role === 'admin' ? (
              <Link to="/studio" aria-current={current === 'studio' ? 'page' : undefined}>Hội thoại</Link>
            ) : user?.role === 'staff' ? (
              <Link to="/staff" aria-current={current === 'staff' ? 'page' : undefined}>Công việc</Link>
            ) : user?.role === 'superadmin' ? (
              <Link to="/superadmin" aria-current={current === 'superadmin' ? 'page' : undefined}>Quản trị hệ thống</Link>
            ) : (
              <>
                <Link to="/#dich-vu" aria-current={current === 'home' ? 'page' : undefined}>Dịch vụ</Link>
                <Link to="/bookings/GS-1024" aria-current={current === 'booking' ? 'page' : undefined}>Lịch chụp của tôi</Link>
              </>
            )}
          </nav>
          <div className="header-account">
            {user ? (
              <>
                <p className="user-profile">
                  <span className="user-avatar" aria-hidden="true">{user.name?.[0] || '?'}</span>
                  <span>{user.name} · {ROLE_LABELS[user.role] || user.role}</span>
                </p>
                <button className="gs-btn gs-btn--ghost header-logout" type="button" onClick={handleLogout} disabled={loggingOut}>
                  {loggingOut ? 'Đang đăng xuất…' : 'Đăng xuất'}
                </button>
              </>
            ) : (
              <Link className="gs-btn gs-btn--secondary" to="/login">Đăng nhập</Link>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p><strong>GradStudio</strong> · Prototype PA#3.</p>
      <p>API mock cung cấp dữ liệu minh họa cho quá trình phát triển.</p>
    </footer>
  )
}
