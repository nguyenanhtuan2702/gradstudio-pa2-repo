import { useCallback, useEffect, useRef, useState } from 'react'
import { ApiError } from '../api/apiClient.js'
import { useAuth } from '../auth/useAuth.js'
import { EmptyState, LoadingState } from '../components/AsyncStates.jsx'
import { SiteFooter, SiteHeader } from '../components/SiteChrome.jsx'
import '../styles/superadmin.css'

const ADMIN_ACCOUNTS_PATH = '/api/admin/accounts'
const ADMIN_SETTINGS_PATH = '/api/admin/settings'

const EMPTY_ADMIN_FORM = Object.freeze({ name: '', email: '', password: '' })
const TIME_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function useAdminResource(request, path) {
  const [attempt, setAttempt] = useState(0)
  const [resource, setResource] = useState({ status: 'loading', data: null, error: null })

  useEffect(() => {
    let active = true

    request(path)
      .then((data) => {
        if (active) setResource({ status: 'success', data, error: null })
      })
      .catch((error) => {
        if (active) {
          setResource((current) => ({ status: 'error', data: current.data, error }))
        }
      })

    return () => { active = false }
  }, [request, path, attempt])

  const retry = useCallback(() => {
    setResource((current) => ({ ...current, status: 'loading', error: null }))
    setAttempt((current) => current + 1)
  }, [])

  const updateData = useCallback((update) => {
    setResource((current) => ({
      status: 'success',
      data: typeof update === 'function' ? update(current.data) : update,
      error: null,
    }))
  }, [])

  return { ...resource, retry, updateData }
}

function validateAdminForm(form) {
  const errors = {}
  const name = form.name.trim()
  const email = form.email.trim()

  if (!name) errors.name = 'Nhập họ tên Admin.'
  else if (name.length < 2 || name.length > 100) errors.name = 'Họ tên phải có từ 2 đến 100 ký tự.'

  if (!email) errors.email = 'Nhập email.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Email chưa đúng định dạng.'

  if (!form.password) errors.password = 'Nhập mật khẩu.'
  else if (form.password.length < 8) errors.password = 'Mật khẩu phải có ít nhất 8 ký tự.'

  return errors
}

function validateSettings(values) {
  const errors = {}
  if (!TIME_PATTERN.test(values.openingTime || '')) errors.openingTime = 'Nhập giờ theo định dạng HH:MM.'
  if (!TIME_PATTERN.test(values.closingTime || '')) errors.closingTime = 'Nhập giờ theo định dạng HH:MM.'

  const reminder = Number(values.reminderHoursBefore)
  if (!Number.isInteger(reminder) || reminder < 1) {
    errors.reminderHoursBefore = 'Nhập số giờ nguyên dương.'
  }

  return errors
}

function FieldError({ id, children }) {
  if (!children) return null
  return <p className="gs-error-text" id={id}>{children}</p>
}

function ResourceError({ error, onRetry, title }) {
  return (
    <div className="gs-card async-state async-state--error" role="alert">
      <h3>{title}</h3>
      <p>{error?.message || 'Đã có lỗi khi kết nối tới máy chủ.'}</p>
      <button className="gs-btn gs-btn--secondary" type="button" onClick={onRetry}>
        Thử tải lại
      </button>
    </div>
  )
}

function mergeAccounts(current, createdAccount) {
  const items = current?.items || []
  const byId = new Map(items.map((account) => [account.id, account]))
  byId.set(createdAccount.id, createdAccount)
  return { ...current, items: [...byId.values()] }
}

export default function SuperadminPage() {
  const { request, user } = useAuth()
  const accounts = useAdminResource(request, ADMIN_ACCOUNTS_PATH)
  const settings = useAdminResource(request, ADMIN_SETTINGS_PATH)

  const [adminForm, setAdminForm] = useState(EMPTY_ADMIN_FORM)
  const [adminErrors, setAdminErrors] = useState({})
  const [adminFormError, setAdminFormError] = useState('')
  const [adminSuccess, setAdminSuccess] = useState('')
  const [creatingAdmin, setCreatingAdmin] = useState(false)
  const createLock = useRef(false)

  const [settingsDraft, setSettingsDraft] = useState({})
  const [settingsErrors, setSettingsErrors] = useState({})
  const [settingsFormError, setSettingsFormError] = useState('')
  const [settingsSuccess, setSettingsSuccess] = useState('')
  const [savingSettings, setSavingSettings] = useState(false)
  const settingsLock = useRef(false)

  const settingsBase = settings.data
  const settingsValues = settingsBase
    ? { ...settingsBase, ...settingsDraft }
    : null

  async function handleCreateAdmin(event) {
    event.preventDefault()
    if (createLock.current) return

    setAdminErrors({})
    setAdminFormError('')
    setAdminSuccess('')

    const validationErrors = validateAdminForm(adminForm)
    if (Object.keys(validationErrors).length) {
      setAdminErrors(validationErrors)
      return
    }

    createLock.current = true
    setCreatingAdmin(true)
    try {
      const createdAccount = await request(ADMIN_ACCOUNTS_PATH, {
        method: 'POST',
        body: {
          name: adminForm.name.trim(),
          email: adminForm.email.trim().toLowerCase(),
          password: adminForm.password,
        },
      })

      if (createdAccount?.id) {
        accounts.updateData((current) => mergeAccounts(current, createdAccount))
      }
      setAdminForm(EMPTY_ADMIN_FORM)
      setAdminSuccess('Đã tạo tài khoản Admin thành công.')
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        setAdminErrors(error.fields || {})
        if (!Object.keys(error.fields || {}).length) setAdminFormError(error.message)
      } else if (error instanceof ApiError && error.status === 409) {
        setAdminFormError(error.message || 'Email này đã được sử dụng.')
      } else {
        setAdminFormError(error.message || 'Không thể tạo tài khoản Admin. Vui lòng thử lại.')
      }
    } finally {
      createLock.current = false
      setCreatingAdmin(false)
    }
  }

  function handleAdminFieldChange(field, value) {
    setAdminForm((current) => ({ ...current, [field]: value }))
    setAdminErrors((current) => ({ ...current, [field]: undefined }))
    setAdminFormError('')
    setAdminSuccess('')
  }

  function handleSettingsFieldChange(field, value) {
    setSettingsDraft((current) => ({ ...current, [field]: value }))
    setSettingsErrors((current) => ({ ...current, [field]: undefined }))
    setSettingsFormError('')
    setSettingsSuccess('')
  }

  function handleSettingsRefresh() {
    setSettingsDraft({})
    setSettingsErrors({})
    setSettingsFormError('')
    setSettingsSuccess('')
    settings.retry()
  }

  async function handleSaveSettings(event) {
    event.preventDefault()
    if (settingsLock.current || !settingsValues) return

    setSettingsErrors({})
    setSettingsFormError('')
    setSettingsSuccess('')

    const validationErrors = validateSettings(settingsValues)
    if (Object.keys(validationErrors).length) {
      setSettingsErrors(validationErrors)
      return
    }

    const payload = {
      openingTime: settingsValues.openingTime,
      closingTime: settingsValues.closingTime,
      reminderHoursBefore: Number(settingsValues.reminderHoursBefore),
    }

    settingsLock.current = true
    setSavingSettings(true)
    try {
      const response = await request(ADMIN_SETTINGS_PATH, {
        method: 'PUT',
        body: payload,
      })
      settings.updateData(response)
      setSettingsDraft({})
      setSettingsSuccess('Đã cập nhật cài đặt hệ thống.')
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        setSettingsErrors(error.fields || {})
        if (!Object.keys(error.fields || {}).length) setSettingsFormError(error.message)
      } else if (error instanceof ApiError && error.status === 409) {
        setSettingsFormError(error.message || 'Cài đặt xung đột với lịch hiện có. Dữ liệu bạn nhập vẫn được giữ lại.')
      } else {
        setSettingsFormError(error.message || 'Không thể cập nhật cài đặt. Dữ liệu bạn nhập vẫn được giữ lại.')
      }
    } finally {
      settingsLock.current = false
      setSavingSettings(false)
    }
  }

  return (
    <>
      <SiteHeader current="superadmin" />
      <main className="site-main gs-stack superadmin-page" id="main-content">
        <section className="superadmin-intro" aria-labelledby="superadmin-title">
          <p className="meta">GradStudio · PA#3</p>
          <h1 id="superadmin-title">Quản trị hệ thống</h1>
          <p className="lead">Quản lý tài khoản Admin và cấu hình vận hành của GradStudio.</p>
          <div className="gs-card superadmin-identity" aria-label="Tài khoản đang đăng nhập">
            <span className="user-avatar" aria-hidden="true">{user?.name?.[0] || 'S'}</span>
            <div>
              <p><strong>{user?.name || 'Superadmin'}</strong></p>
              <p className="meta">Quản trị hệ thống · Mã tài khoản: <code>{user?.id || '—'}</code></p>
            </div>
          </div>
        </section>

        <div className="superadmin-grid">
          <section className="gs-card gs-stack superadmin-panel" aria-labelledby="accounts-title">
            <div>
              <h2 id="accounts-title">Tài khoản Admin</h2>
              <p className="meta">Danh sách lấy từ hệ thống. Mật khẩu không được hiển thị.</p>
            </div>

            <form className="gs-stack" onSubmit={handleCreateAdmin} noValidate>
              <h3>Tạo tài khoản Admin</h3>
              <div className="field">
                <label className="gs-label" htmlFor="admin-name">Họ tên</label>
                <input
                  className="gs-input"
                  id="admin-name"
                  name="name"
                  autoComplete="name"
                  value={adminForm.name}
                  onChange={(event) => handleAdminFieldChange('name', event.target.value)}
                  aria-invalid={Boolean(adminErrors.name)}
                  aria-describedby={adminErrors.name ? 'admin-name-error' : undefined}
                  required
                />
                <FieldError id="admin-name-error">{adminErrors.name}</FieldError>
              </div>
              <div className="field">
                <label className="gs-label" htmlFor="admin-email">Email</label>
                <input
                  className="gs-input"
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={adminForm.email}
                  onChange={(event) => handleAdminFieldChange('email', event.target.value)}
                  aria-invalid={Boolean(adminErrors.email)}
                  aria-describedby={adminErrors.email ? 'admin-email-error' : undefined}
                  required
                />
                <FieldError id="admin-email-error">{adminErrors.email}</FieldError>
              </div>
              <div className="field">
                <label className="gs-label" htmlFor="admin-password">Mật khẩu</label>
                <input
                  className="gs-input"
                  id="admin-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={adminForm.password}
                  onChange={(event) => handleAdminFieldChange('password', event.target.value)}
                  aria-invalid={Boolean(adminErrors.password)}
                  aria-describedby={adminErrors.password ? 'admin-password-error' : 'admin-password-help'}
                  required
                />
                <FieldError id="admin-password-error">{adminErrors.password}</FieldError>
                <p className="gs-help" id="admin-password-help">Tối thiểu 8 ký tự. Mật khẩu không xuất hiện trong danh sách.</p>
              </div>
              {adminFormError && <p className="login-form-error" role="alert">{adminFormError}</p>}
              {adminSuccess && <p className="superadmin-success" role="status">{adminSuccess}</p>}
              <button className="gs-btn gs-btn--primary" type="submit" disabled={creatingAdmin}>
                {creatingAdmin ? 'Đang tạo tài khoản…' : 'Tạo tài khoản Admin'}
              </button>
            </form>

            <div className="superadmin-list-area" aria-live="polite">
              <div className="superadmin-list-heading">
                <h3>Danh sách hiện có</h3>
                {accounts.status === 'loading' && accounts.data && <span className="meta">Đang làm mới…</span>}
              </div>
              {accounts.status === 'loading' && !accounts.data && <LoadingState label="Đang tải tài khoản Admin…" />}
              {accounts.status === 'error' && !accounts.data && (
                <ResourceError error={accounts.error} onRetry={accounts.retry} title="Chưa tải được tài khoản Admin" />
              )}
              {accounts.status === 'error' && accounts.data && (
                <div className="login-form-error" role="alert">
                  <p>{accounts.error?.message || 'Chưa làm mới được danh sách Admin.'}</p>
                  <button className="gs-btn gs-btn--secondary" type="button" onClick={accounts.retry}>Thử tải lại</button>
                </div>
              )}
              {accounts.status === 'success' && accounts.data && (accounts.data.items || []).length === 0 && (
                <EmptyState title="Chưa có tài khoản Admin" headingLevel={3}>
                  Tài khoản Admin được tạo sẽ xuất hiện tại đây.
                </EmptyState>
              )}
              {accounts.data && (accounts.data.items || []).length > 0 && (
                <ul className="gs-list-reset superadmin-account-list">
                  {accounts.data.items.map((account) => (
                    <li className="superadmin-account" key={account.id}>
                      <div className="superadmin-account__identity">
                        <strong>{account.name}</strong>
                        <span>{account.email}</span>
                      </div>
                      <div className="superadmin-account__meta">
                        <span className="badge badge--wait">{account.role}</span>
                        <span className={`badge ${account.active ? 'badge--ok' : 'badge--bad'}`}>
                          {account.active ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="gs-card gs-stack superadmin-panel" aria-labelledby="settings-title">
            <div>
              <h2 id="settings-title">Cài đặt hệ thống</h2>
              <p className="meta">Các giá trị hiện tại được tải từ API và có thể cập nhật.</p>
            </div>
            {settings.status === 'loading' && !settings.data && (
              <LoadingState label="Đang tải cài đặt hệ thống…" />
            )}
            {settings.status === 'error' && !settings.data && (
              <ResourceError error={settings.error} onRetry={settings.retry} title="Chưa tải được cài đặt hệ thống" />
            )}
            {settingsValues && (
              <>
                {settings.status === 'error' && (
                  <div className="login-form-error" role="alert">
                    <p>{settings.error?.message || 'Chưa làm mới được cài đặt.'}</p>
                    <button className="gs-btn gs-btn--secondary" type="button" onClick={settings.retry}>Thử tải lại</button>
                  </div>
                )}
                <form className="gs-stack" onSubmit={handleSaveSettings} noValidate>
                  <div className="field">
                    <label className="gs-label" htmlFor="settings-opening-time">Giờ mở cửa</label>
                    <input
                      className="gs-input"
                      id="settings-opening-time"
                      name="openingTime"
                      type="time"
                      value={settingsValues.openingTime || ''}
                      onChange={(event) => handleSettingsFieldChange('openingTime', event.target.value)}
                      aria-invalid={Boolean(settingsErrors.openingTime)}
                      aria-describedby={settingsErrors.openingTime ? 'settings-opening-error' : undefined}
                      required
                    />
                    <FieldError id="settings-opening-error">{settingsErrors.openingTime}</FieldError>
                  </div>
                  <div className="field">
                    <label className="gs-label" htmlFor="settings-closing-time">Giờ đóng cửa</label>
                    <input
                      className="gs-input"
                      id="settings-closing-time"
                      name="closingTime"
                      type="time"
                      value={settingsValues.closingTime || ''}
                      onChange={(event) => handleSettingsFieldChange('closingTime', event.target.value)}
                      aria-invalid={Boolean(settingsErrors.closingTime)}
                      aria-describedby={settingsErrors.closingTime ? 'settings-closing-error' : undefined}
                      required
                    />
                    <FieldError id="settings-closing-error">{settingsErrors.closingTime}</FieldError>
                  </div>
                  <div className="field">
                    <label className="gs-label" htmlFor="settings-reminder-hours">Nhắc lịch trước (giờ)</label>
                    <input
                      className="gs-input"
                      id="settings-reminder-hours"
                      name="reminderHoursBefore"
                      type="number"
                      min="1"
                      step="1"
                      value={settingsValues.reminderHoursBefore ?? ''}
                      onChange={(event) => handleSettingsFieldChange('reminderHoursBefore', event.target.value)}
                      aria-invalid={Boolean(settingsErrors.reminderHoursBefore)}
                      aria-describedby={settingsErrors.reminderHoursBefore ? 'settings-reminder-error' : undefined}
                      required
                    />
                    <FieldError id="settings-reminder-error">{settingsErrors.reminderHoursBefore}</FieldError>
                  </div>
                  {settingsFormError && <p className="login-form-error" role="alert">{settingsFormError}</p>}
                  {settingsSuccess && <p className="superadmin-success" role="status">{settingsSuccess}</p>}
                  <button className="gs-btn gs-btn--primary" type="submit" disabled={savingSettings}>
                    {savingSettings ? 'Đang lưu…' : 'Lưu cài đặt'}
                  </button>
                  <button className="gs-btn gs-btn--secondary" type="button" onClick={handleSettingsRefresh} disabled={savingSettings}>
                    Tải lại cấu hình
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
