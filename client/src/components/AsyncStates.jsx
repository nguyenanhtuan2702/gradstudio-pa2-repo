export function LoadingState({ label = 'Đang tải dữ liệu…' }) {
  return (
    <div className="gs-card async-state" role="status" aria-live="polite">
      <span className="loading-indicator" aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}

export function ErrorState({ error, onRetry, label = 'Chưa tải được dữ liệu.' }) {
  return (
    <div className="gs-card async-state async-state--error" role="alert">
      <h2>{label}</h2>
      <p>{error?.message || 'Đã có lỗi khi kết nối tới máy chủ.'}</p>
      <button className="gs-btn gs-btn--secondary" type="button" onClick={onRetry}>
        Thử tải lại
      </button>
    </div>
  )
}

export function EmptyState({ title = 'Chưa có dữ liệu', children, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`
  return (
    <div className="gs-card async-state">
      <Heading>{title}</Heading>
      {children && <p>{children}</p>}
    </div>
  )
}
