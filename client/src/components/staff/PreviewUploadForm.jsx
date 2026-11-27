import { useRef } from 'react'
import { useAuth } from '../../auth/useAuth.js'
import Field from '../workspace/Field.jsx'
import { FormMessages } from '../workspace/Feedback.jsx'
import useSubmitForm from '../workspace/useSubmitForm.js'
import { ACCEPTED_TYPES, validatePreview } from './previewFile.js'

/** G8 — checks type and size in the browser, then adds a preview to the booking. */
export default function PreviewUploadForm({ bookingId, onUploaded }) {
  const { request } = useAuth()
  const fileInput = useRef(null)

  const form = useSubmitForm({
    initialValues: { title: '', file: null },
    validate: validatePreview,
    onSubmit: async ({ title, file }) => {
      const body = new FormData()
      body.append('title', title.trim())
      body.append('file', file)
      const photo = await request(`/api/bookings/${bookingId}/photos/preview`, { method: 'POST', body })
      onUploaded(photo, file)
      // A file input cannot be controlled, so clear it through its element.
      if (fileInput.current) fileInput.current.value = ''
      return { reset: { title: '', file: null }, notice: `Đã thêm ảnh “${photo.title}” vào booking ${bookingId}.` }
    },
  })

  const fileId = `preview-file-${bookingId}`
  const error = form.errors.file

  return (
    <form className="gs-stack" onSubmit={form.handleSubmit} noValidate>
      <Field id={`preview-title-${bookingId}`} name="title" label="Tiêu đề ảnh" form={form} type="text" />
      <div className="field">
        <label className="gs-label" htmlFor={fileId}>Tệp ảnh</label>
        <input
          ref={fileInput}
          className="gs-input"
          id={fileId}
          name="file"
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          onChange={(event) => form.setValue('file', event.target.files[0] ?? null)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fileId}-help ${fileId}-error` : `${fileId}-help`}
        />
        <p className="gs-help" id={`${fileId}-help`}>Định dạng JPEG hoặc PNG, tối đa 10 MB.</p>
        {error && <p className="gs-error-text" id={`${fileId}-error`}>{error}</p>}
      </div>
      <FormMessages form={form} />
      <button className="gs-btn gs-btn--primary ops-action" type="submit" disabled={form.submitting}>
        {form.submitting ? 'Đang tải lên…' : 'Tải ảnh lên'}
      </button>
    </form>
  )
}
