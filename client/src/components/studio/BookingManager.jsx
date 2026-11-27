import { useState } from 'react'
import { useAuth } from '../../auth/useAuth.js'
import { EmptyState } from '../AsyncStates.jsx'
import Field from '../workspace/Field.jsx'
import { FormMessages, ResourceStatus, StatusBadge } from '../workspace/Feedback.jsx'
import {
  errorMessage, formatCurrency, formatDate, isTimeRange, normalizeTimeRange,
} from '../workspace/format.js'
import useSubmitForm from '../workspace/useSubmitForm.js'

const TIME_RANGE_MESSAGE = 'Nhập khung giờ dạng HH:MM–HH:MM, giờ kết thúc sau giờ bắt đầu.'

const validateSchedule = (values) => {
  const errors = {}
  if (!values.date) errors.date = 'Chọn ngày.'
  if (!isTimeRange(values.makeup)) errors.makeup = TIME_RANGE_MESSAGE
  if (!isTimeRange(values.shoot)) errors.shoot = TIME_RANGE_MESSAGE
  if (!values.room.trim()) errors.room = 'Nhập phòng.'
  return errors
}

const validateLink = ({ finalFileLink }) => (
  /^https?:\/\/[^\s/]+\S*$/i.test(finalFileLink.trim()) && finalFileLink.trim().length <= 2000
    ? {}
    : { finalFileLink: 'Nhập đường dẫn bắt đầu bằng http:// hoặc https://.' }
)

function useBookingPatch(booking, onSaved) {
  const { request } = useAuth()
  return async (body) => {
    const saved = await request(`/api/bookings/${booking.id}`, { method: 'PATCH', body })
    onSaved(saved)
    return saved
  }
}

function ScheduleForm({ booking, onSaved }) {
  const patch = useBookingPatch(booking, onSaved)

  const form = useSubmitForm({
    initialValues: { date: booking.date, makeup: booking.makeup, shoot: booking.shoot, room: booking.room },
    validate: validateSchedule,
    onSubmit: async (values) => {
      const next = {
        date: values.date,
        makeup: normalizeTimeRange(values.makeup),
        shoot: normalizeTimeRange(values.shoot),
        room: values.room.trim(),
      }
      if (Object.keys(next).every((key) => next[key] === booking[key])) {
        return { formError: 'Lịch chưa có thay đổi.' }
      }

      await patch(next)
      return { notice: 'Đã đổi lịch sau khi kiểm tra không có xung đột.' }
    },
  })

  const id = (name) => `change-${booking.id}-${name}`

  return (
    <form className="gs-stack ops-subform" onSubmit={form.handleSubmit} noValidate aria-label={`Đổi lịch ${booking.id}`}>
      <h4>Đổi lịch</h4>
      <div className="form-grid">
        <Field id={id('date')} name="date" label="Ngày chụp" form={form} type="date" full />
        <Field id={id('makeup')} name="makeup" label="Giờ make-up" form={form} type="text" />
        <Field id={id('shoot')} name="shoot" label="Giờ chụp" form={form} type="text" />
        <Field id={id('room')} name="room" label="Phòng" form={form} type="text" full />
      </div>
      <FormMessages form={form} />
      <button className="gs-btn gs-btn--primary ops-action" type="submit" disabled={form.submitting}>
        {form.submitting ? 'Đang kiểm tra và lưu…' : 'Kiểm tra và lưu lịch mới'}
      </button>
    </form>
  )
}

function FinalLinkForm({ booking, onSaved }) {
  const patch = useBookingPatch(booking, onSaved)
  const form = useSubmitForm({
    initialValues: { finalFileLink: booking.finalFileLink ?? '' },
    validate: validateLink,
    onSubmit: async ({ finalFileLink }) => {
      await patch({ finalFileLink: finalFileLink.trim() })
      return { notice: 'Đã lưu link ảnh hoàn thiện.' }
    },
  })

  return (
    <form className="gs-stack ops-subform" onSubmit={form.handleSubmit} noValidate>
      <Field
        id={`link-${booking.id}`}
        name="finalFileLink"
        label="Link ảnh hoàn thiện"
        form={form}
        type="url"
      />
      <FormMessages form={form} />
      <button className="gs-btn gs-btn--secondary ops-action" type="submit" disabled={form.submitting}>
        {form.submitting ? 'Đang lưu…' : 'Lưu link ảnh'}
      </button>
    </form>
  )
}

function BookingCard({ booking, onSaved }) {
  const patch = useBookingPatch(booking, onSaved)
  const [mode, setMode] = useState('')
  const [cancelling, setCancelling] = useState(false)
  const [cancelError, setCancelError] = useState('')
  const closed = booking.cancelled || booking.status === 'Hoàn thành'
  const canSaveFinalLink = !booking.cancelled && booking.paymentStatus === 'Đã thanh toán đủ' && booking.remaining === 0

  async function cancelBooking() {
    setCancelling(true)
    setCancelError('')
    try {
      await patch({ cancel: true })
      setMode('')
    } catch (error) {
      setCancelError(errorMessage(error))
    } finally {
      setCancelling(false)
    }
  }

  return (
    <li className="gs-card gs-stack">
      <h3>{booking.id} · {booking.customerName}</h3>
      <p className="status-row">
        <StatusBadge status={booking.status} />
        {booking.cancelled && <span className="badge badge--bad"><span aria-hidden="true">✕</span> Lịch đã hủy</span>}
      </p>
      <dl className="details">
        <div><dt>Gói</dt><dd>{booking.packageName}</dd></div>
        <div><dt>Ngày chụp</dt><dd>{formatDate(booking.date)}</dd></div>
        <div><dt>Make-up</dt><dd>{booking.makeup}</dd></div>
        <div><dt>Buổi chụp</dt><dd>{booking.shoot} · {booking.room}</dd></div>
        <div><dt>Thanh toán</dt><dd>{booking.paymentStatus}</dd></div>
        <div><dt>Tổng giá</dt><dd>{formatCurrency(booking.total)}</dd></div>
        <div><dt>Tiền cọc 30%</dt><dd>{formatCurrency(booking.deposit)}</dd></div>
        <div><dt>Còn lại</dt><dd>{formatCurrency(booking.remaining)}</dd></div>
        <div><dt>Ảnh xem trước</dt><dd>{booking.previewPhotos?.length ?? 0}</dd></div>
        <div><dt>Ảnh khách đã chọn</dt><dd>{booking.selectedPhotoIds?.length ?? 0}</dd></div>
      </dl>
      {booking.finalFileLink && (
        <a className="ops-link" href={booking.finalFileLink} target="_blank" rel="noreferrer">Mở link ảnh hoàn thiện</a>
      )}

      {canSaveFinalLink && <FinalLinkForm booking={booking} onSaved={onSaved} />}
      {!booking.cancelled && !canSaveFinalLink && (
        <p className="gs-help">Có thể thêm link ảnh hoàn thiện sau khi khách thanh toán đủ.</p>
      )}

      {closed ? (
        <p className="gs-help">Booking đã hoàn thành hoặc đã hủy nên không thể đổi hay hủy lịch.</p>
      ) : (
        <div className="ops-actions">
          <button className="gs-btn gs-btn--secondary" type="button" aria-expanded={mode === 'change'} onClick={() => setMode(mode === 'change' ? '' : 'change')}>
            {mode === 'change' ? 'Đóng biểu mẫu đổi lịch' : 'Đổi lịch'}
          </button>
          <button className="gs-btn gs-btn--ghost" type="button" aria-expanded={mode === 'cancel'} onClick={() => setMode(mode === 'cancel' ? '' : 'cancel')}>
            Hủy lịch
          </button>
        </div>
      )}

      {!closed && mode === 'change' && <ScheduleForm booking={booking} onSaved={onSaved} />}
      {!closed && mode === 'cancel' && (
        <div className="note note--conflict gs-stack">
          <strong>Hủy lịch {booking.id}?</strong>
          <span>Lịch nhắc và công việc đã phân công của booking này sẽ bị gỡ. Thao tác không thể hoàn tác.</span>
          {cancelError && <p className="gs-error-text" role="alert">{cancelError}</p>}
          <div className="ops-actions">
            <button className="gs-btn gs-btn--danger" type="button" onClick={cancelBooking} disabled={cancelling}>
              {cancelling ? 'Đang hủy…' : 'Xác nhận hủy lịch'}
            </button>
            <button className="gs-btn gs-btn--secondary" type="button" onClick={() => setMode('')}>Giữ lịch</button>
          </div>
        </div>
      )}
    </li>
  )
}

/** G10 — payment status, reschedule or cancel, and the final file link. */
export default function BookingManager({ bookings, onSaved }) {
  const [refreshing, setRefreshing] = useState(false)
  const [refreshError, setRefreshError] = useState('')

  if (bookings.status !== 'success') {
    return <ResourceStatus resource={bookings} loadingLabel="Đang tải booking…" errorLabel="Chưa tải được booking." />
  }

  async function refresh() {
    setRefreshing(true)
    setRefreshError('')
    try {
      await bookings.refresh()
    } catch (error) {
      setRefreshError(errorMessage(error))
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <>
      <button className="gs-btn gs-btn--ghost ops-action" type="button" onClick={refresh} disabled={refreshing}>
        {refreshing ? 'Đang cập nhật…' : 'Cập nhật booking'}
      </button>
      {refreshError && <p className="login-form-error" role="alert">{refreshError}</p>}
      {bookings.items.length === 0 ? (
        <EmptyState title="Chưa có booking">Booking xuất hiện sau khi khách đồng ý giờ và studio tạo booking.</EmptyState>
      ) : (
        <ul className="ops-cards gs-list-reset">
          {bookings.items.map((booking) => (
            <BookingCard key={booking.id} booking={booking} onSaved={onSaved} />
          ))}
        </ul>
      )}
    </>
  )
}
