import { useAuth } from '../../auth/useAuth.js'
import Field from '../workspace/Field.jsx'
import { FormMessages, StatusBadge } from '../workspace/Feedback.jsx'
import useSubmitForm from '../workspace/useSubmitForm.js'

const PROPOSAL_STATES = Object.freeze({
  pending: 'Đang chờ khách trả lời',
  agreed: 'Khách đã đồng ý',
  declined: 'Khách đã từ chối',
})

const MESSAGE_LIMIT = 2000

const validate = ({ text }) => {
  if (!text.trim()) return { text: 'Nhập nội dung tin nhắn.' }
  if (text.trim().length > MESSAGE_LIMIT) return { text: `Tin nhắn tối đa ${MESSAGE_LIMIT} ký tự.` }
  return {}
}

/** G4 — messages of the open conversation and the Admin reply. */
export default function ChatPanel({ conversation, onMessage }) {
  const { request } = useAuth()
  const { proposal } = conversation

  const form = useSubmitForm({
    initialValues: { text: '' },
    validate,
    onSubmit: async ({ text }) => {
      const message = await request(`/api/conversations/${conversation.id}/messages`, {
        method: 'POST',
        body: { text: text.trim() },
      })
      onMessage(conversation.id, message)
      return { reset: { text: '' }, notice: 'Đã gửi tin nhắn.' }
    },
  })

  return (
    <div className="gs-card chat">
      <p className="status-row">
        <span className="meta">Trạng thái hội thoại:</span> <StatusBadge status={conversation.status} />
      </p>
      {conversation.messages?.length ? (
        <ol className="msg-list gs-list-reset" aria-label="Nội dung hội thoại">
          {conversation.messages.map((message) => {
            const fromStudio = message.sender === 'admin'
            return (
              <li key={message.id} className={fromStudio ? 'msg msg--self' : 'msg msg--other'}>
                <span className="meta">{fromStudio ? 'GradStudio' : conversation.customerName}</span>
                <p className="msg__bubble">{message.text}</p>
              </li>
            )
          })}
        </ol>
      ) : (
        <p className="muted">Hội thoại chưa có tin nhắn.</p>
      )}
      {proposal && (
        <div className="note">
          <strong>Đề xuất giờ: {PROPOSAL_STATES[proposal.status] || proposal.status}</strong>
          Make-up {proposal.makeup} · Chụp {proposal.shoot} · {proposal.room}
        </div>
      )}
      <form className="composer" onSubmit={form.handleSubmit} noValidate>
        <Field id="admin-reply" name="text" label="Trả lời khách" form={form} as="textarea" rows={3} />
        <FormMessages form={form} />
        <button className="gs-btn gs-btn--primary ops-action" type="submit" disabled={form.submitting}>
          {form.submitting ? 'Đang gửi…' : 'Gửi'}
        </button>
      </form>
    </div>
  )
}
