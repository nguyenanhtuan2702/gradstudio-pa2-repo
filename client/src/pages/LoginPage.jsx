import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ApiError } from '../api/apiClient.js'
import { useAuth } from '../auth/useAuth.js'
import { getRoleHomePath, roleCanVisitPath } from '../auth/roles.js'
import { SiteFooter, SiteHeader } from '../components/SiteChrome.jsx'

function pathAfterLogin(user, previousLocation) {
  const requestedPath = previousLocation?.pathname
  if (requestedPath && roleCanVisitPath(user.role, requestedPath)) {
    return `${requestedPath}${previousLocation.search || ''}${previousLocation.hash || ''}`
  }
  return getRoleHomePath(user.role)
}

export default function LoginPage() {
  const { login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [notice, setNotice] = useState(location.state?.notice || '')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setFieldErrors({})
    setFormError('')
    setNotice('')

    const nextErrors = {}
    if (!email.trim()) nextErrors.email = 'Nhập email đăng nhập.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = 'Email chưa đúng định dạng.'
    if (!password) nextErrors.password = 'Nhập mật khẩu.'
    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors)
      return
    }

    setSubmitting(true)
    try {
      const user = await login(email.trim(), password)
      navigate(pathAfterLogin(user, location.state?.from), { replace: true })
    } catch (error) {
      if (error instanceof ApiError && Object.keys(error.fields).length) {
        setFieldErrors(error.fields)
        setFormError(error.message)
      } else {
        setFormError(error.message || 'Không thể đăng nhập. Vui lòng thử lại.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SiteHeader current="login" />
      <main className="site-main login-main">
        <section className="gs-card login-card" aria-labelledby="login-title">
          <p className="meta">GradStudio · PA#3</p>
          <h1 id="login-title">Đăng nhập</h1>
          <p className="muted">Đăng nhập bằng tài khoản demo để mở khu vực phù hợp với vai trò của bạn.</p>
          {notice && <p className="login-notice" role="status">{notice}</p>}
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label className="gs-label" htmlFor="login-email">Email</label>
              <input
                className="gs-input"
                id="login-email"
                name="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'login-email-error' : undefined}
                required
              />
              {fieldErrors.email && <p className="gs-error-text" id="login-email-error">{fieldErrors.email}</p>}
            </div>
            <div className="field">
              <label className="gs-label" htmlFor="login-password">Mật khẩu</label>
              <input
                className="gs-input"
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={fieldErrors.password ? 'login-password-error' : undefined}
                required
              />
              {fieldErrors.password && <p className="gs-error-text" id="login-password-error">{fieldErrors.password}</p>}
            </div>
            {formError && <p className="login-form-error" role="alert">{formError}</p>}
            <button className="gs-btn gs-btn--primary gs-btn--block" type="submit" disabled={submitting}>
              {submitting ? 'Đang đăng nhập…' : 'Đăng nhập'}
            </button>
          </form>
          <p className="gs-help">Dùng email và mật khẩu tài khoản demo được ghi trong <code>FRONTEND.md</code> ở thư mục dự án.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
