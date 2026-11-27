import { useAuth } from '../../auth/useAuth.js'
import Field from '../workspace/Field.jsx'
import { FormMessages, StatusBadge } from '../workspace/Feedback.jsx'
import { formatDate } from '../workspace/format.js'
import useSubmitForm from '../workspace/useSubmitForm.js'

/** The two statuses accepted by PATCH /api/staff/jobs/:id. */
const UPDATABLE_STATUSES = ['Đang thực hiện', 'Hoàn thành']

/** G8 — one assigned job and its progress form. */
export default function JobCard({ job, onUpdated }) {
  const { request } = useAuth()
  const form = useSubmitForm({
    initialValues: { status: UPDATABLE_STATUSES.includes(job.status) ? job.status : '' },
    validate: ({ status }) => (status ? {} : { status: 'Chọn trạng thái mới.' }),
    onSubmit: async ({ status }) => {
      const saved = await request(`/api/staff/jobs/${job.id}`, { method: 'PATCH', body: { status } })
      onUpdated(saved)
      return { notice: `Đã cập nhật: ${saved.status}.` }
    },
  })

  return (
    <li className="gs-card gs-stack">
      <h3>{job.work} · {job.bookingId}</h3>
      <p className="status-row"><StatusBadge status={job.status} /></p>
      <dl className="details">
        <div><dt>Ngày</dt><dd>{formatDate(job.date)}</dd></div>
        <div><dt>Thời gian</dt><dd>{job.time}</dd></div>
        <div><dt>Địa điểm</dt><dd>{job.room}</dd></div>
      </dl>
      <form className="gs-stack ops-subform" onSubmit={form.handleSubmit} noValidate>
        <Field id={`status-${job.id}`} name="status" label="Tiến độ công việc" form={form} as="select">
          <option value="">Chọn trạng thái</option>
          {UPDATABLE_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
        </Field>
        <FormMessages form={form} />
        <button className="gs-btn gs-btn--primary ops-action" type="submit" disabled={form.submitting}>
          {form.submitting ? 'Đang cập nhật…' : 'Cập nhật tiến độ'}
        </button>
      </form>
    </li>
  )
}
