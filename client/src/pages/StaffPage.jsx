import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../auth/useAuth.js'
import { EmptyState } from '../components/AsyncStates.jsx'
import { SiteFooter, SiteHeader } from '../components/SiteChrome.jsx'
import JobCard from '../components/staff/JobCard.jsx'
import PreviewUploadForm from '../components/staff/PreviewUploadForm.jsx'
import { ResourceStatus } from '../components/workspace/Feedback.jsx'
import { errorMessage } from '../components/workspace/format.js'
import useApiList from '../components/workspace/useApiList.js'
import '../styles/workspace.css'

export default function StaffPage() {
  const { user } = useAuth()
  const jobs = useApiList('/api/staff/jobs')
  const [uploads, setUploads] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [refreshError, setRefreshError] = useState('')
  const localUrls = useRef([])

  useEffect(() => () => localUrls.current.forEach((url) => URL.revokeObjectURL(url)), [])

  const bookingIds = [...new Set(jobs.items.map((job) => job.bookingId))]

  function addUpload(photo, file) {
    // The mock does not store file contents, so show the copy chosen on this device.
    const localUrl = URL.createObjectURL(file)
    localUrls.current.push(localUrl)
    setUploads((current) => [...current, { ...photo, localUrl }])
  }

  async function refresh() {
    setRefreshing(true)
    setRefreshError('')
    try {
      await jobs.refresh()
    } catch (error) {
      setRefreshError(errorMessage(error))
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <>
      <SiteHeader current="staff" />
      <main className="site-main gs-stack ops-main" id="main-content">
        <section aria-labelledby="page-title">
          <h1 id="page-title">Công việc của tôi</h1>
          <p className="role-strip">Xin chào {user?.name}. Xem lịch được giao, cập nhật tiến độ và thêm ảnh xem trước cho booking.</p>
        </section>

        <section aria-labelledby="jobs-title">
          <h2 id="jobs-title">Công việc được phân công</h2>
          {jobs.status === 'success' ? (
            <>
              <button className="gs-btn gs-btn--ghost ops-action" type="button" onClick={refresh} disabled={refreshing}>
                {refreshing ? 'Đang cập nhật…' : 'Cập nhật công việc'}
              </button>
              {refreshError && <p className="login-form-error" role="alert">{refreshError}</p>}
              {jobs.items.length === 0 ? (
                <EmptyState title="Chưa có công việc">Công việc xuất hiện sau khi khách thanh toán cọc 30% thành công.</EmptyState>
              ) : (
                <ul className="ops-cards gs-list-reset">
                  {jobs.items.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onUpdated={(saved) => jobs.update((items) => items.map((item) => (item.id === saved.id ? { ...item, ...saved } : item)))}
                    />
                  ))}
                </ul>
              )}
            </>
          ) : (
            <ResourceStatus resource={jobs} loadingLabel="Đang tải công việc…" errorLabel="Chưa tải được công việc." />
          )}
        </section>

        {jobs.status === 'success' && bookingIds.length > 0 && (
          <section aria-labelledby="previews-title">
            <h2 id="previews-title">Thêm ảnh xem trước</h2>
            <div className="ops-cards">
              {bookingIds.map((bookingId) => {
                const added = uploads.filter((photo) => photo.bookingId === bookingId)
                return (
                  <article className="gs-card gs-stack" key={bookingId}>
                    <h3>Booking {bookingId}</h3>
                    <PreviewUploadForm bookingId={bookingId} onUploaded={addUpload} />
                    {added.length > 0 && (
                      <>
                        <h4>Ảnh vừa tải lên</h4>
                        <ul className="gs-stack gs-list-reset">
                          {added.map((photo) => (
                            <li key={photo.id}>
                              <figure className="sample-photo">
                                <img className="ops-preview" src={photo.localUrl} alt={photo.title} />
                                <figcaption>{photo.title} · mã {photo.id}</figcaption>
                              </figure>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </article>
                )
              })}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
