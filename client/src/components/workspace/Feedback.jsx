import { useAuth } from '../../auth/useAuth.js'
import { ErrorState, LoadingState } from '../AsyncStates.jsx'
import { statusTone } from './format.js'

export function FormMessages({ form }) {
  return (
    <>
      {form.formError && <p className="login-form-error" role="alert">{form.formError}</p>}
      <p className="ops-notice" role="status">{form.notice}</p>
    </>
  )
}

export function StatusBadge({ status }) {
  const tone = statusTone(status)
  const icon = tone === 'ok' ? '✓' : tone === 'bad' ? '!' : '◷'
  return (
    <span className={`badge badge--${tone}`}>
      <span aria-hidden="true">{icon}</span> {status}
    </span>
  )
}

/** Loading or error view of one resource; renders nothing once data is ready. */
export function ResourceStatus({ resource, loadingLabel, errorLabel }) {
  const { logout } = useAuth()

  if (resource.status === 'loading') return <LoadingState label={loadingLabel} />
  if (resource.status !== 'error') return null

  // The session is cleared even when the server rejects the stale token;
  // ProtectedRoute then sends the user to sign-in and back to this screen.
  const signInAgain = () => logout().catch(() => {})

  return (
    <div className="gs-stack">
      <ErrorState error={resource.error} onRetry={resource.retry} label={errorLabel} />
      {resource.error?.status === 401 && (
        <button className="gs-btn gs-btn--primary ops-action" type="button" onClick={signInAgain}>
          Đăng nhập lại
        </button>
      )}
    </div>
  )
}
