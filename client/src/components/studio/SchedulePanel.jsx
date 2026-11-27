import { useState } from 'react'
import { useAuth } from '../../auth/useAuth.js'
import Field from '../workspace/Field.jsx'
import { FormMessages } from '../workspace/Feedback.jsx'
import { isTimeRange, normalizeTimeRange, splitNames } from '../workspace/format.js'
import useSubmitForm from '../workspace/useSubmitForm.js'

const TIME_RANGE_MESSAGE = 'Nhập khung giờ dạng HH:MM–HH:MM, giờ kết thúc sau giờ bắt đầu.'

const validateCheck = (values) => {
  const errors = {}
  if (!values.date) errors.date = 'Chọn ngày.'
  if (!isTimeRange(values.time)) errors.time = TIME_RANGE_MESSAGE
  if (!values.room.trim()) errors.room = 'Chọn phòng.'
  if (!splitNames(values.staff).length) errors.staff = 'Chọn ít nhất một nhân sự.'
  return errors
}

function describeSlot(slot) {
  return `Make-up ${slot.makeup} với ${slot.makeupArtist} · Chụp ${slot.shoot} với ${slot.photographer} · ${slot.room}`
}

/** G5 — clash check, written reason, free time slots and the proposal sent to the chat. */
export default function SchedulePanel({ conversation, onProposal }) {
  const { request } = useAuth()
  const [result, setResult] = useState(null)

  const proposalForm = useSubmitForm({
    initialValues: { makeup: '', shoot: '', room: conversation.proposal?.room ?? '' },
    validate: (values) => {
      const errors = {}
      if (!isTimeRange(values.makeup)) errors.makeup = TIME_RANGE_MESSAGE
      if (!isTimeRange(values.shoot)) errors.shoot = TIME_RANGE_MESSAGE
      if (!values.room.trim()) errors.room = 'Nhập phòng.'
      return errors
    },
    onSubmit: async (values) => {
      const proposal = await request(`/api/conversations/${conversation.id}/proposal`, {
        method: 'POST',
        body: {
          makeup: normalizeTimeRange(values.makeup),
          shoot: normalizeTimeRange(values.shoot),
          room: values.room.trim(),
        },
      })
      onProposal(conversation.id, proposal)
      return { notice: 'Đã gửi đề xuất vào hội thoại. Chờ khách đồng ý hoặc từ chối.' }
    },
  })

  const checkForm = useSubmitForm({
    initialValues: {
      date: conversation.date ?? '',
      time: '',
      room: conversation.proposal?.room ?? '',
      staff: '',
    },
    validate: validateCheck,
    onSubmit: async (values) => {
      setResult(null)
      const time = normalizeTimeRange(values.time)
      const answer = await request('/api/clash-check', {
        method: 'POST',
        body: { date: values.date, time, room: values.room.trim(), staff: splitNames(values.staff) },
      })
      setResult({ ...answer, time })
    },
  })

  // A result only describes the values that were sent.
  const editCheck = {
    ...checkForm,
    setValue: (name, value) => {
      setResult(null)
      checkForm.setValue(name, value)
    },
  }

  function fillProposal(slot) {
    proposalForm.setValue('makeup', slot.makeup)
    proposalForm.setValue('shoot', slot.shoot)
    proposalForm.setValue('room', slot.room)
    document.getElementById('proposal-makeup')?.focus()
  }

  return (
    <>
      <form className="gs-card gs-stack" onSubmit={checkForm.handleSubmit} noValidate aria-labelledby="check-title">
        <h3 id="check-title">Kiểm tra xung đột</h3>
        <div className="form-grid">
          <Field id="check-date" name="date" label="Ngày chụp" form={editCheck} type="date" />
          <Field id="check-time" name="time" label="Khung giờ cần kiểm tra" form={editCheck} type="text" help="Ví dụ: 10:00–11:00." />
          <Field id="check-room" name="room" label="Phòng" form={editCheck} type="text" full />
          <Field id="check-staff" name="staff" label="Nhân sự" form={editCheck} type="text" help="Cách nhau bằng dấu phẩy." full />
        </div>
        <FormMessages form={checkForm} />
        <button className="gs-btn gs-btn--secondary ops-action" type="submit" disabled={checkForm.submitting}>
          {checkForm.submitting ? 'Đang kiểm tra…' : 'Kiểm tra lịch'}
        </button>
        <div aria-live="polite" className="gs-stack">
          {result && (
            <>
              <div className={result.hasClash ? 'note note--conflict' : 'note'}>
                <strong>
                  <span aria-hidden="true">{result.hasClash ? '⚠ ' : '✓ '}</span>
                  {result.hasClash ? `Có xung đột lúc ${result.time}` : `Không có xung đột lúc ${result.time}`}
                </strong>
                {result.reason}
              </div>
              {result.suggestions?.length > 0 && (
                <>
                  <h4>Khung giờ đề xuất thay thế</h4>
                  <ul className="res-list gs-list-reset">
                    {result.suggestions.map((slot) => (
                      <li className="res res--plan" key={`${slot.makeup}-${slot.shoot}-${slot.room}`}>
                        <p>{describeSlot(slot)}</p>
                        <button className="gs-btn gs-btn--secondary ops-action" type="button" onClick={() => fillProposal(slot)}>
                          Dùng khung giờ này
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </form>

      <form className="gs-card gs-stack" onSubmit={proposalForm.handleSubmit} noValidate aria-labelledby="proposal-title">
        <h3 id="proposal-title">Đề xuất giờ cho khách</h3>
        <div className="form-grid">
          <Field id="proposal-makeup" name="makeup" label="Giờ make-up" form={proposalForm} type="text" help="Ví dụ định dạng: 10:00–11:00." />
          <Field id="proposal-shoot" name="shoot" label="Giờ chụp" form={proposalForm} type="text" help="Cùng định dạng với giờ make-up." />
          <Field id="proposal-room" name="room" label="Phòng chụp" form={proposalForm} type="text" full />
        </div>
        <FormMessages form={proposalForm} />
        <button className="gs-btn gs-btn--primary ops-action" type="submit" disabled={proposalForm.submitting}>
          {proposalForm.submitting ? 'Đang gửi…' : 'Gửi đề xuất cho khách'}
        </button>
      </form>
    </>
  )
}
