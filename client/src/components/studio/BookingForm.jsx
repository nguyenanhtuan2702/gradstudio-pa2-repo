import { useState } from 'react'
import { useAuth } from '../../auth/useAuth.js'
import { EmptyState } from '../AsyncStates.jsx'
import Field from '../workspace/Field.jsx'
import { FormMessages, ResourceStatus } from '../workspace/Feedback.jsx'
import { formatCurrency, formatDate } from '../workspace/format.js'
import useSubmitForm from '../workspace/useSubmitForm.js'

const DEPOSIT_RATE = 0.3

function blockedReason(conversation, booking, createdId) {
  const { proposal, status } = conversation
  if (createdId) return `Đã tạo booking ${createdId} cho đề xuất này.`
  if (status === 'Hoàn thành') return 'Hội thoại đã hoàn thành.'
  if (booking && !booking.cancelled && booking.status !== 'Chờ cọc 30%') {
    return `Hội thoại đã có booking ${booking.id} ở trạng thái ${booking.status}.`
  }
  if (!proposal) return 'Chưa thể tạo booking: hãy gửi đề xuất giờ cho khách trước.'
  if (proposal.status === 'declined') return 'Chưa thể tạo booking: khách đã từ chối đề xuất. Hãy gửi khung giờ khác.'
  if (proposal.status !== 'agreed' || status !== 'Đã chốt lịch') {
    return 'Chưa thể tạo booking: khách chưa đồng ý khung giờ đề xuất.'
  }
  if (!conversation.customerId) return 'Chưa thể tạo booking: hội thoại thiếu mã khách hàng.'
  return ''
}

/** G6 — the booking form is ready, but only creates a booking after the customer agrees. */
export default function BookingForm({ conversation, packages, booking, onCreated }) {
  const { request } = useAuth()
  const { proposal } = conversation
  // Remember which agreed time slot was already turned into a booking.
  const slot = proposal ? `${proposal.proposalId}|${proposal.makeup}|${proposal.shoot}|${proposal.room}` : ''
  const [created, setCreated] = useState(null)
  const createdId = created?.slot === slot ? created.id : ''

  const form = useSubmitForm({
    initialValues: { packageId: '' },
    validate: ({ packageId }) => (
      packageId || packages.items.length === 1 ? {} : { packageId: 'Chọn gói dịch vụ.' }
    ),
    onSubmit: async ({ packageId }) => {
      const result = await request('/api/bookings', {
        method: 'POST',
        body: {
          conversationId: conversation.id,
          customerId: conversation.customerId,
          packageId: packageId || packages.items[0].id,
          agreedMakeup: proposal.makeup,
          agreedShoot: proposal.shoot,
          room: proposal.room,
        },
      })
      setCreated({ slot, id: result.id })
      onCreated(result)
      return { notice: `Đã tạo booking ${result.id} — ${result.status}. Lịch chưa được giữ cho đến khi cọc thành công.` }
    },
  })

  if (packages.status !== 'success') {
    return <ResourceStatus resource={packages} loadingLabel="Đang tải gói dịch vụ…" errorLabel="Chưa tải được gói dịch vụ." />
  }
  if (packages.items.length === 0) {
    return <EmptyState title="Chưa có gói dịch vụ">Cần có gói trong catalogue để tạo booking.</EmptyState>
  }

  const selectedId = form.values.packageId || (packages.items.length === 1 ? packages.items[0].id : '')
  const selected = packages.items.find((item) => item.id === selectedId)
  const reason = blockedReason(conversation, booking, createdId)
  const deposit = selected ? Math.round(selected.price * DEPOSIT_RATE) : null
  const selectForm = { ...form, values: { packageId: selectedId } }

  return (
    <form className="gs-card gs-stack" onSubmit={form.handleSubmit} noValidate>
      <dl className="details">
        <div><dt>Khách hàng</dt><dd>{conversation.customerName}</dd></div>
        <div><dt>Ngày chụp</dt><dd>{formatDate(conversation.date)}</dd></div>
        <div><dt>Make-up</dt><dd>{proposal?.makeup || 'Chưa đề xuất'}</dd></div>
        <div><dt>Buổi chụp</dt><dd>{proposal?.shoot || 'Chưa đề xuất'}</dd></div>
        <div><dt>Địa điểm</dt><dd>{proposal?.room || 'Chưa đề xuất'}</dd></div>
      </dl>
      <Field id="booking-package" name="packageId" label="Gói dịch vụ" form={selectForm} as="select">
        <option value="">Chọn gói</option>
        {packages.items.map((item) => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </Field>
      {selected && (
        <dl className="price-box">
          <div className="price-row"><dt>Tổng giá</dt><dd>{formatCurrency(selected.price)}</dd></div>
          <div className="price-row price-row--due"><dt>Cọc 30%</dt><dd>{formatCurrency(deposit)}</dd></div>
          <div className="price-row"><dt>Còn lại 70%</dt><dd>{formatCurrency(selected.price - deposit)}</dd></div>
        </dl>
      )}
      {booking && !createdId && !booking.cancelled && booking.status === 'Chờ cọc 30%' && (
        <p className="gs-help">API đang có booking {booking.id} (Chờ cọc 30%) gắn với hội thoại này.</p>
      )}
      <FormMessages form={form} />
      <button
        className="gs-btn gs-btn--primary gs-btn--block"
        type="submit"
        disabled={Boolean(reason) || form.submitting}
        aria-describedby={reason ? 'booking-blocked booking-hold' : 'booking-hold'}
      >
        {form.submitting ? 'Đang tạo…' : 'Tạo booking'}
      </button>
      {reason && <p className="gs-help" id="booking-blocked">{reason}</p>}
      <p className="gs-help" id="booking-hold">Booking mới có trạng thái Chờ cọc 30%. Lịch chưa được giữ cho đến khi cọc thành công và nhân sự, phòng được kiểm tra lại.</p>
    </form>
  )
}
