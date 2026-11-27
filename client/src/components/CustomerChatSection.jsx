import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CUSTOMER_API_ENDPOINTS } from '../api/customerEndpoints.js'
import { useAuth } from '../auth/useAuth.js'
import '../styles/customerFlow.css'

const FALLBACK_SHOOT_OPTIONS = Object.freeze([
  'Tốt nghiệp cá nhân',
  'Gói Tốt nghiệp Premium',
  'Kỷ yếu lớp',
  'Chân dung/CV',
])

const FALLBACK_EXTRAS = Object.freeze([
  { id: 'extra-makeup', name: 'Makeup' },
])

const SAMPLE_MESSAGES = Object.freeze([
  {
    id: 'msg-sample-1',
    sender: 'customer',
    author: 'Nguyễn Thùy Linh · 17:20',
    text: 'Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?',
  },
  {
    id: 'msg-sample-2',
    sender: 'admin',
    author: 'GradStudio · 17:21',
    text: 'Để mình kiểm tra lịch cho bạn nhé.',
  },
])

export default function CustomerChatSection({
  defaultConversationId = 'conv-linh',
  selectedPackageName = '',
  packages = [],
  extras = [],
}) {
  const { user, isAuthenticated } = useAuth()
  const isCustomer = isAuthenticated && user?.role === 'customer'

  const shootOptions = Array.from(
    new Set([
      ...FALLBACK_SHOOT_OPTIONS,
      ...(selectedPackageName ? [selectedPackageName] : []),
      ...packages.map((pkg) => pkg?.name).filter(Boolean),
    ]),
  )
  const extraItems = extras.length ? extras : FALLBACK_EXTRAS

  const [preferredShootType, setPreferredShootType] = useState('')
  const [preferredDate, setPreferredDate] = useState('2026-10-24')
  const [preferredTime, setPreferredTime] = useState('09:00')
  const [selectedExtras, setSelectedExtras] = useState(['Makeup'])
  const [draftMessage, setDraftMessage] = useState('')

  const activeShootType = selectedPackageName || preferredShootType || shootOptions[0]

  function handleToggleExtra(extraName) {
    setSelectedExtras((current) => (
      current.includes(extraName)
        ? current.filter((item) => item !== extraName)
        : [...current, extraName]
    ))
  }

  return (
    <div className="gs-stack">
      {!isCustomer && (
        <div className="chat-auth-banner" role="region" aria-label="Hướng dẫn đăng nhập tư vấn">
          <p>
            <strong>Đang xem ở chế độ khách tham quan:</strong> Bạn có thể xem cuộc trò chuyện minh họa bên dưới. Để gửi tin nhắn tư vấn hoặc gửi yêu cầu đặt lịch ở bước G3, vui lòng đăng nhập bằng tài khoản Khách hàng (<code>linh@gradstudio.test</code>).
          </p>
          <Link className="gs-btn gs-btn--secondary" to="/login">
            Đăng nhập tài khoản Khách hàng
          </Link>
        </div>
      )}

      <div className="customer-chat-layout">
        {/* Cột 1: Khung hội thoại kế thừa index.html PA#2 + khung đề xuất giờ G6 */}
        <div className="gs-card chat">
          <div className="chat__head">
            <span className="user-avatar" aria-hidden="true">GS</span>
            <div className="chat__head-main">
              <div>
                <p><strong>GradStudio</strong></p>
                <p className="meta" aria-live="polite">
                  Đang hỏi về: <strong>{selectedPackageName || 'Gói Tốt nghiệp Premium'}</strong> · Mã hội thoại: <code>{defaultConversationId}</code>
                </p>
              </div>
              <span className="badge badge--wait">
                <span aria-hidden="true">◷</span> Đang tư vấn
              </span>
            </div>
          </div>

          <ol className="msg-list gs-list-reset" aria-label="Cuộc trò chuyện với studio">
            {SAMPLE_MESSAGES.map((message) => (
              <li
                key={message.id}
                className={`msg ${message.sender === 'customer' ? 'msg--self' : 'msg--other'}`}
              >
                <span className="meta">{message.author}</span>
                <p className="msg__bubble">{message.text}</p>
              </li>
            ))}
          </ol>

          {/* Khung đề xuất khung giờ thay thế chuẩn bị cho G6 — Customer */}
          <section className="chat-proposal-card" aria-labelledby="proposal-preview-title">
            <div className="status-row">
              <span className="badge badge--wait">
                <span aria-hidden="true">◷</span> Đề xuất giờ mới từ studio (Khung G6)
              </span>
            </div>
            <h3 id="proposal-preview-title">Đề xuất thay thế ngày 24/10/2026</h3>
            <p className="meta">
              Lý do đổi giờ 09:00: Makeup artist Mai bận 08:00–12:00 nên không thể nhận makeup lúc 09:00.
            </p>
            <div className="chat-proposal-slots">
              <p><strong>Makeup:</strong> 13:00–14:00 với Mai</p>
              <p><strong>Chụp ảnh:</strong> 14:00–16:00 với Tuấn · Phòng B</p>
            </div>
            <div className="chat-proposal-actions">
              <button
                className="gs-btn gs-btn--primary"
                type="button"
                disabled
                aria-describedby="proposal-shell-note"
              >
                Đồng ý khung giờ này
              </button>
              <button
                className="gs-btn gs-btn--secondary"
                type="button"
                disabled
                aria-describedby="proposal-shell-note"
              >
                Từ chối, chọn giờ khác
              </button>
            </div>
            <p className="gs-help" id="proposal-shell-note">
              Khung giao diện chuẩn bị cho G6 (<code>POST {CUSTOMER_API_ENDPOINTS.respondProposal(defaultConversationId)}</code>). Việc đồng ý giờ trong chat chưa giữ chỗ; lịch chỉ được giữ sau khi cọc 30% thành công.
            </p>
          </section>

          <div className="composer">
            <label className="gs-label" htmlFor="customer-chat-message">Tin nhắn tư vấn</label>
            <div className="composer__row">
              <input
                className="gs-input"
                id="customer-chat-message"
                type="text"
                value={draftMessage}
                onChange={(event) => setDraftMessage(event.target.value)}
                placeholder="Nhập tin nhắn…"
                aria-describedby="chat-composer-note"
              />
              <button
                className="gs-btn gs-btn--primary"
                type="button"
                disabled
                aria-describedby="chat-composer-note"
              >
                Gửi
              </button>
            </div>
            <p className="gs-help" id="chat-composer-note">
              Khung giao diện Ngày 3: Thao tác gửi tin nhắn qua <code>POST {CUSTOMER_API_ENDPOINTS.sendMessage(defaultConversationId)}</code> sẽ được kết nối ở bước G3.
            </p>
          </div>
        </div>

        {/* Cột 2: Form gửi yêu cầu đặt lịch chuẩn bị cho G3 */}
        <form
          className="gs-card chat-request-card"
          aria-labelledby="booking-request-title"
          noValidate
          onSubmit={(event) => event.preventDefault()}
        >
          <div>
            <h3 id="booking-request-title">Gửi yêu cầu kiểm tra lịch chụp</h3>
            <p className="meta">
              Điền thông tin buổi chụp mong muốn để studio kiểm tra nhân sự và phòng chụp.
            </p>
          </div>

          <div className="field">
            <label className="gs-label" htmlFor="req-shoot-type">Loại buổi chụp / Gói quan tâm</label>
            <select
              className="gs-select"
              id="req-shoot-type"
              value={activeShootType}
              onChange={(event) => setPreferredShootType(event.target.value)}
            >
              {shootOptions.map((optionName) => (
                <option key={optionName} value={optionName}>{optionName}</option>
              ))}
            </select>
          </div>

          <div className="form-grid">
            <div className="field">
              <label className="gs-label" htmlFor="req-preferred-date">Ngày chụp mong muốn</label>
              <input
                className="gs-input"
                id="req-preferred-date"
                type="date"
                value={preferredDate}
                onChange={(event) => setPreferredDate(event.target.value)}
              />
            </div>

            <div className="field">
              <label className="gs-label" htmlFor="req-preferred-time">Giờ bắt đầu mong muốn</label>
              <input
                className="gs-input"
                id="req-preferred-time"
                type="time"
                value={preferredTime}
                onChange={(event) => setPreferredTime(event.target.value)}
                aria-describedby="req-time-hint"
              />
              <p className="gs-help" id="req-time-hint">
                Ví dụ kịch bản chuẩn: 24/10/2026 lúc 09:00 (vị trí hiển thị lỗi 400/409 từ API ở G3).
              </p>
            </div>
          </div>

          <fieldset className="extras-fieldset">
            <legend className="gs-label">Dịch vụ bổ sung</legend>
            <div className="extras-grid">
              {extraItems.map((extra) => {
                const checkboxId = `req-extra-${extra.id}`
                const checked = selectedExtras.includes(extra.name)
                return (
                  <label className="checkbox-pill" key={extra.id} htmlFor={checkboxId}>
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggleExtra(extra.name)}
                    />
                    <span>{extra.name}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <button
            className="gs-btn gs-btn--primary gs-btn--block"
            type="button"
            disabled
            aria-describedby="request-form-shell-note"
          >
            Gửi yêu cầu đặt lịch
          </button>
          <p className="note" id="request-form-shell-note">
            <strong>Chưa gửi yêu cầu trong khung UI Ngày 3.</strong> Validation từng trường, xử lý lỗi <code>400</code>/<code>409</code> và kết nối <code>POST {CUSTOMER_API_ENDPOINTS.sendBookingRequest(defaultConversationId)}</code> sẽ được hoàn thiện ở bước G3.
          </p>
        </form>
      </div>
    </div>
  )
}
