import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ApiError } from '../api/apiClient.js'
import { CUSTOMER_API_ENDPOINTS } from '../api/customerEndpoints.js'
import { useAuth } from '../auth/useAuth.js'
import { EmptyState, ErrorState, LoadingState } from './AsyncStates.jsx'
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

const VISITOR_SAMPLE_MESSAGES = Object.freeze([
  {
    id: 'msg-sample-1',
    sender: 'customer',
    text: 'Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?',
  },
  {
    id: 'msg-sample-2',
    sender: 'admin',
    text: 'Để mình kiểm tra lịch cho bạn nhé.',
  },
])

const PROPOSAL_STATUS_LABELS = Object.freeze({
  pending: 'Đang chờ bạn phản hồi',
  agreed: 'Bạn đã đồng ý khung giờ này',
  declined: 'Bạn đã từ chối đề xuất này',
})

const MESSAGE_MAX_LENGTH = 2000
const STUDIO_OPEN_MINUTES = 8 * 60
const STUDIO_CLOSE_MINUTES = 20 * 60

function isValidIsoDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value)
}

function parseMinutes(value) {
  if (typeof value !== 'string') return null
  const match = value.match(/^([01]\d|2[0-3]):([0-5]\d)$/)
  if (!match) return null
  return Number(match[1]) * 60 + Number(match[2])
}

function validateMessageText(text) {
  const trimmed = text.trim()
  if (!trimmed) return 'Vui lòng nhập nội dung tin nhắn.'
  if (trimmed.length > MESSAGE_MAX_LENGTH) {
    return `Nội dung tin nhắn không được vượt quá ${MESSAGE_MAX_LENGTH} ký tự.`
  }
  return ''
}

function validateBookingRequest({ shootType, preferredDate, preferredTime }) {
  const errors = {}
  if (!shootType.trim()) {
    errors.shootType = 'Vui lòng chọn loại buổi chụp hoặc gói quan tâm.'
  }
  if (!preferredDate) {
    errors.preferredDate = 'Vui lòng chọn ngày chụp mong muốn.'
  } else if (!isValidIsoDate(preferredDate)) {
    errors.preferredDate = 'Ngày chụp phải đúng định dạng YYYY-MM-DD hợp lệ.'
  }
  if (!preferredTime) {
    errors.preferredTime = 'Vui lòng chọn giờ bắt đầu mong muốn.'
  } else {
    const minutes = parseMinutes(preferredTime)
    if (minutes === null) {
      errors.preferredTime = 'Giờ bắt đầu phải đúng định dạng HH:MM.'
    } else if (minutes < STUDIO_OPEN_MINUTES || minutes > STUDIO_CLOSE_MINUTES) {
      errors.preferredTime = 'Studio mở cửa từ 08:00 đến 20:00; vui lòng chọn giờ trong khung này.'
    }
  }
  return errors
}

function getStatusBadgeProps(status) {
  if (status === 'Đã chốt lịch' || status === 'Hoàn thành') {
    return { className: 'badge badge--ok', symbol: '✓' }
  }
  return { className: 'badge badge--wait', symbol: '◷' }
}

function findCustomerConversation(items, userId, defaultConversationId) {
  if (!Array.isArray(items) || !items.length) return null
  return (
    items.find((item) => userId && item.customerId === userId)
    || items.find((item) => item.id === defaultConversationId)
    || items[0]
  )
}

export default function CustomerChatSection({
  defaultConversationId = 'conv-linh',
  selectedPackageName = '',
  packages = [],
  extras = [],
}) {
  const { user, token, isAuthenticated, request } = useAuth()
  const userId = user?.id || ''
  const isCustomer = isAuthenticated && user?.role === 'customer' && Boolean(token)

  const shootOptions = Array.from(
    new Set([
      ...FALLBACK_SHOOT_OPTIONS,
      ...(selectedPackageName ? [selectedPackageName] : []),
      ...packages.map((pkg) => pkg?.name).filter(Boolean),
    ]),
  )
  const extraItems = extras.length ? extras : FALLBACK_EXTRAS

  // Conversation loading & refresh state (derived key avoids synchronous setState in useEffect)
  const [reloadCount, setReloadCount] = useState(0)
  const requestKey = isCustomer ? `${token}:${userId}:${defaultConversationId}:${reloadCount}` : 'visitor'
  const [fetchResult, setFetchResult] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [refreshError, setRefreshError] = useState('')

  // Message composer state (G3)
  const [draftMessage, setDraftMessage] = useState('')
  const [messageError, setMessageError] = useState('')
  const [messageFormError, setMessageFormError] = useState('')
  const [messageNotice, setMessageNotice] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)
  const sendingMsgRef = useRef(false)

  // Booking request form state (G3)
  const [preferredShootType, setPreferredShootType] = useState(
    () => selectedPackageName || shootOptions[0] || '',
  )
  const [prevSelectedPackageName, setPrevSelectedPackageName] = useState(selectedPackageName)
  const [preferredDate, setPreferredDate] = useState('2026-10-24')
  const [preferredTime, setPreferredTime] = useState('09:00')
  const [selectedExtras, setSelectedExtras] = useState(['Makeup'])
  const [requestFieldErrors, setRequestFieldErrors] = useState({})
  const [requestFormError, setRequestFormError] = useState('')
  const [submittedRequest, setSubmittedRequest] = useState(null)
  const [submittingRequest, setSubmittingRequest] = useState(false)
  const submittingReqRef = useRef(false)

  if (selectedPackageName !== prevSelectedPackageName) {
    setPrevSelectedPackageName(selectedPackageName)
    if (selectedPackageName) {
      setPreferredShootType(selectedPackageName)
      setRequestFieldErrors((current) => {
        if (!current.shootType) return current
        const next = { ...current }
        delete next.shootType
        return next
      })
    }
  }

  useEffect(() => {
    if (!isCustomer) return undefined

    const controller = new AbortController()
    request(CUSTOMER_API_ENDPOINTS.listConversations, { signal: controller.signal })
      .then((payload) => {
        if (controller.signal.aborted) return
        setFetchResult({
          key: requestKey,
          status: 'success',
          conversation: findCustomerConversation(payload?.items, userId, defaultConversationId),
          error: null,
        })
      })
      .catch((error) => {
        if (controller.signal.aborted) return
        setFetchResult({
          key: requestKey,
          status: 'error',
          conversation: null,
          error,
        })
      })

    return () => controller.abort()
  }, [isCustomer, requestKey, request, userId, defaultConversationId])

  const activeFetch = isCustomer && fetchResult?.key === requestKey ? fetchResult : null
  const loadStatus = !isCustomer ? 'idle' : (activeFetch ? activeFetch.status : 'loading')
  const loadError = activeFetch?.error || null
  const conversation = activeFetch?.conversation || null

  function updateActiveConversation(updater) {
    setFetchResult((current) => {
      if (!current || current.key !== requestKey || !current.conversation) return current
      return {
        ...current,
        conversation: updater(current.conversation),
      }
    })
  }

  async function handleRefreshConversation() {
    if (!isCustomer || refreshing) return
    setRefreshing(true)
    setRefreshError('')
    try {
      const payload = await request(CUSTOMER_API_ENDPOINTS.listConversations)
      setFetchResult({
        key: requestKey,
        status: 'success',
        conversation: findCustomerConversation(payload?.items, userId, defaultConversationId),
        error: null,
      })
    } catch (error) {
      setRefreshError(error?.message || 'Chưa thể cập nhật tin nhắn mới.')
    } finally {
      setRefreshing(false)
    }
  }

  async function handleSendMessage(event) {
    event.preventDefault()
    if (!isCustomer || !conversation?.id || sendingMsgRef.current) return

    setMessageError('')
    setMessageFormError('')
    setMessageNotice('')

    const validationMessage = validateMessageText(draftMessage)
    if (validationMessage) {
      setMessageError(validationMessage)
      event.currentTarget.elements.namedItem('text')?.focus()
      return
    }

    sendingMsgRef.current = true
    setSendingMessage(true)
    try {
      const created = await request(CUSTOMER_API_ENDPOINTS.sendMessage(conversation.id), {
        method: 'POST',
        body: { text: draftMessage.trim() },
      })
      updateActiveConversation((current) => ({
        ...current,
        messages: [...(current.messages || []), created],
      }))
      setDraftMessage('')
      setMessageNotice('Đã gửi tin nhắn đến studio.')
    } catch (error) {
      if (error instanceof ApiError && error.fields?.text) {
        setMessageError(error.fields.text)
        event.currentTarget.elements.namedItem('text')?.focus()
      }
      setMessageFormError(error?.message || 'Không gửi được tin nhắn. Vui lòng thử lại.')
    } finally {
      sendingMsgRef.current = false
      setSendingMessage(false)
    }
  }

  function clearRequestFieldError(fieldName) {
    setRequestFieldErrors((current) => {
      if (!current[fieldName]) return current
      const next = { ...current }
      delete next[fieldName]
      return next
    })
    setRequestFormError('')
  }

  function handleToggleExtra(extraName) {
    setSelectedExtras((current) => (
      current.includes(extraName)
        ? current.filter((item) => item !== extraName)
        : [...current, extraName]
    ))
    setRequestFormError('')
  }

  async function handleSubmitRequest(event) {
    event.preventDefault()
    if (!isCustomer || !conversation?.id || submittingReqRef.current) return

    const form = event.currentTarget
    setRequestFieldErrors({})
    setRequestFormError('')
    setSubmittedRequest(null)

    const values = {
      shootType: preferredShootType,
      preferredDate,
      preferredTime,
    }
    const clientErrors = validateBookingRequest(values)
    if (Object.keys(clientErrors).length > 0) {
      setRequestFieldErrors(clientErrors)
      const firstInvalid = ['shootType', 'preferredDate', 'preferredTime'].find((key) => clientErrors[key])
      if (firstInvalid) form.elements.namedItem(firstInvalid)?.focus()
      return
    }

    submittingReqRef.current = true
    setSubmittingRequest(true)
    try {
      const created = await request(CUSTOMER_API_ENDPOINTS.sendBookingRequest(conversation.id), {
        method: 'POST',
        body: {
          shootType: preferredShootType.trim(),
          preferredDate,
          preferredTime,
          extras: selectedExtras,
        },
      })
      setSubmittedRequest(created)
      if (created?.status) {
        updateActiveConversation((current) => ({ ...current, status: created.status }))
      }
    } catch (error) {
      if (error instanceof ApiError && error.fields && Object.keys(error.fields).length > 0) {
        setRequestFieldErrors(error.fields)
        const firstServerField = ['shootType', 'preferredDate', 'preferredTime'].find((key) => error.fields[key])
        if (firstServerField) form.elements.namedItem(firstServerField)?.focus()
      }
      setRequestFormError(error?.message || 'Không gửi được yêu cầu đặt lịch. Vui lòng thử lại.')
    } finally {
      submittingReqRef.current = false
      setSubmittingRequest(false)
    }
  }

  // 1. Async states for authenticated Customer loading conversations
  if (isCustomer && loadStatus === 'loading') {
    return <LoadingState label="Đang tải cuộc trò chuyện tư vấn với studio…" />
  }

  if (isCustomer && loadStatus === 'error') {
    return (
      <ErrorState
        error={loadError}
        onRetry={() => setReloadCount((count) => count + 1)}
        label="Không tải được cuộc trò chuyện với studio"
      />
    )
  }

  if (isCustomer && loadStatus === 'success' && !conversation) {
    return (
      <div className="gs-stack">
        <EmptyState title="Chưa có cuộc trò chuyện tư vấn" headingLevel={3}>
          Hiện chưa có hội thoại tư vấn nào cho tài khoản của bạn.
        </EmptyState>
        <div>
          <button
            className="gs-btn gs-btn--secondary"
            type="button"
            onClick={() => setReloadCount((count) => count + 1)}
          >
            Thử tải lại hội thoại
          </button>
        </div>
      </div>
    )
  }

  const activeConversationId = conversation?.id || defaultConversationId
  const activeStatus = conversation?.status || 'Đang tư vấn'
  const statusBadge = getStatusBadgeProps(activeStatus)
  const displayedMessages = isCustomer ? (conversation?.messages || []) : VISITOR_SAMPLE_MESSAGES
  const activeProposal = isCustomer ? conversation?.proposal : null
  const customerDisplayName = conversation?.customerName || user?.name || 'Nguyễn Thùy Linh'

  return (
    <div className="gs-stack">
      {!isCustomer && (
        <div className="chat-auth-banner" role="region" aria-label="Hướng dẫn đăng nhập tư vấn">
          <p>
            <strong>Đang xem ở chế độ khách tham quan:</strong> Bạn có thể xem cuộc trò chuyện mẫu bên dưới. Để gửi tin nhắn tư vấn hoặc gửi yêu cầu đặt lịch với studio, vui lòng đăng nhập bằng tài khoản Khách hàng (<code>linh@gradstudio.test</code>).
          </p>
          <Link className="gs-btn gs-btn--secondary" to="/login">
            Đăng nhập tài khoản Khách hàng
          </Link>
        </div>
      )}

      <div className="customer-chat-layout">
        {/* Cột 1: Khung hội thoại G3 + hiển thị đề xuất giờ từ API (chờ nối nút bấm G6 ở Ngày 5) */}
        <div className="gs-card chat">
          <div className="chat__head">
            <span className="user-avatar" aria-hidden="true">GS</span>
            <div className="chat__head-main">
              <div>
                <p><strong>GradStudio</strong></p>
                <p className="meta" aria-live="polite">
                  Đang hỏi về: <strong>{preferredShootType || selectedPackageName || 'Gói Tốt nghiệp Premium'}</strong> · Mã hội thoại: <code>{activeConversationId}</code>
                </p>
              </div>
              <div className="chat__head-actions">
                <span className={statusBadge.className}>
                  <span aria-hidden="true">{statusBadge.symbol}</span> {activeStatus}
                </span>
                {isCustomer && (
                  <button
                    className="gs-btn gs-btn--ghost"
                    type="button"
                    onClick={handleRefreshConversation}
                    disabled={refreshing}
                  >
                    {refreshing ? 'Đang cập nhật…' : 'Cập nhật tin nhắn'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {refreshError && (
            <p className="chat-feedback-error" role="alert">{refreshError}</p>
          )}

          {displayedMessages.length ? (
            <ol className="msg-list gs-list-reset" aria-label="Cuộc trò chuyện với studio">
              {displayedMessages.map((message) => {
                const fromCustomer = message.sender === 'customer'
                return (
                  <li
                    key={message.id}
                    className={`msg ${fromCustomer ? 'msg--self' : 'msg--other'}`}
                  >
                    <span className="meta">
                      {fromCustomer ? customerDisplayName : 'GradStudio'}
                    </span>
                    <p className="msg__bubble">{message.text}</p>
                  </li>
                )
              })}
            </ol>
          ) : (
            <p className="muted">Chưa có tin nhắn nào trong hội thoại này. Hãy gửi câu hỏi đầu tiên cho studio.</p>
          )}

          {activeProposal && (
            <section className="chat-proposal-card" aria-labelledby="proposal-preview-title">
              <div className="status-row">
                <span className={`badge ${activeProposal.status === 'agreed' ? 'badge--ok' : 'badge--wait'}`}>
                  <span aria-hidden="true">{activeProposal.status === 'agreed' ? '✓' : '◷'}</span>
                  {' '}
                  {PROPOSAL_STATUS_LABELS[activeProposal.status] || activeProposal.status}
                </span>
              </div>
              <h3 id="proposal-preview-title">Đề xuất khung giờ từ studio</h3>
              <div className="chat-proposal-slots">
                <p><strong>Makeup:</strong> {activeProposal.makeup} với Mai</p>
                <p><strong>Chụp ảnh:</strong> {activeProposal.shoot} với Tuấn · {activeProposal.room}</p>
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
                Thao tác phản hồi đề xuất giờ (<code>POST {CUSTOMER_API_ENDPOINTS.respondProposal(activeConversationId)}</code>) thuộc luồng G6 — Ngày 5. Đồng ý giờ trong chat chưa giữ chỗ cho đến khi cọc 30% thành công.
              </p>
            </section>
          )}

          <form className="composer" onSubmit={handleSendMessage} noValidate>
            <label className="gs-label" htmlFor="customer-chat-message">Tin nhắn tư vấn</label>
            <div className="composer__row">
              <input
                className="gs-input"
                id="customer-chat-message"
                name="text"
                type="text"
                value={draftMessage}
                disabled={!isCustomer || sendingMessage}
                onChange={(event) => {
                  setDraftMessage(event.target.value)
                  if (messageError) setMessageError('')
                  if (messageFormError) setMessageFormError('')
                  if (messageNotice) setMessageNotice('')
                }}
                placeholder="Nhập tin nhắn…"
                aria-invalid={Boolean(messageError)}
                aria-describedby={
                  messageError
                    ? 'customer-chat-message-error customer-chat-message-help'
                    : 'customer-chat-message-help'
                }
              />
              <button
                className="gs-btn gs-btn--primary"
                type="submit"
                disabled={!isCustomer || sendingMessage}
              >
                {sendingMessage ? 'Đang gửi…' : 'Gửi'}
              </button>
            </div>
            {messageError && (
              <p className="gs-error-text" id="customer-chat-message-error" role="alert">
                {messageError}
              </p>
            )}
            {messageFormError && !messageError && (
              <p className="chat-feedback-error" role="alert">{messageFormError}</p>
            )}
            {messageNotice && (
              <p className="chat-feedback-ok" role="status">{messageNotice}</p>
            )}
            <p className="gs-help" id="customer-chat-message-help">
              {isCustomer
                ? `Nhập từ 1 đến ${MESSAGE_MAX_LENGTH} ký tự (${draftMessage.length}/${MESSAGE_MAX_LENGTH}). Bạn có thể bấm “Cập nhật tin nhắn” để nhận phản hồi mới từ studio.`
                : 'Đăng nhập tài khoản Khách hàng để gửi tin nhắn trực tiếp cho studio.'}
            </p>
          </form>
        </div>

        {/* Cột 2: Form gửi yêu cầu kiểm tra / đặt lịch chụp G3 */}
        <form
          className="gs-card chat-request-card"
          aria-labelledby="booking-request-title"
          noValidate
          onSubmit={handleSubmitRequest}
        >
          <div>
            <h3 id="booking-request-title">Gửi yêu cầu kiểm tra lịch chụp</h3>
            <p className="meta">
              Điền gói quan tâm, ngày và giờ mong muốn để studio kiểm tra lịch nhân sự và phòng chụp.
            </p>
          </div>

          <div className="field">
            <label className="gs-label" htmlFor="req-shoot-type">Loại buổi chụp / Gói quan tâm</label>
            <select
              className="gs-select"
              id="req-shoot-type"
              name="shootType"
              value={preferredShootType}
              disabled={!isCustomer || submittingRequest}
              onChange={(event) => {
                setPreferredShootType(event.target.value)
                clearRequestFieldError('shootType')
              }}
              aria-invalid={Boolean(requestFieldErrors.shootType)}
              aria-describedby={requestFieldErrors.shootType ? 'req-shoot-type-error' : undefined}
            >
              <option value="">-- Chọn loại buổi chụp hoặc gói chụp --</option>
              {shootOptions.map((optionName) => (
                <option key={optionName} value={optionName}>{optionName}</option>
              ))}
            </select>
            {requestFieldErrors.shootType && (
              <p className="gs-error-text" id="req-shoot-type-error">
                {requestFieldErrors.shootType}
              </p>
            )}
          </div>

          <div className="form-grid">
            <div className="field">
              <label className="gs-label" htmlFor="req-preferred-date">Ngày chụp mong muốn</label>
              <input
                className="gs-input"
                id="req-preferred-date"
                name="preferredDate"
                type="date"
                value={preferredDate}
                disabled={!isCustomer || submittingRequest}
                onChange={(event) => {
                  setPreferredDate(event.target.value)
                  clearRequestFieldError('preferredDate')
                }}
                aria-invalid={Boolean(requestFieldErrors.preferredDate)}
                aria-describedby={requestFieldErrors.preferredDate ? 'req-preferred-date-error' : undefined}
              />
              {requestFieldErrors.preferredDate && (
                <p className="gs-error-text" id="req-preferred-date-error">
                  {requestFieldErrors.preferredDate}
                </p>
              )}
            </div>

            <div className="field">
              <label className="gs-label" htmlFor="req-preferred-time">Giờ bắt đầu mong muốn</label>
              <input
                className="gs-input"
                id="req-preferred-time"
                name="preferredTime"
                type="time"
                value={preferredTime}
                disabled={!isCustomer || submittingRequest}
                onChange={(event) => {
                  setPreferredTime(event.target.value)
                  clearRequestFieldError('preferredTime')
                }}
                aria-invalid={Boolean(requestFieldErrors.preferredTime)}
                aria-describedby={
                  requestFieldErrors.preferredTime
                    ? 'req-preferred-time-error req-time-hint'
                    : 'req-time-hint'
                }
              />
              {requestFieldErrors.preferredTime && (
                <p className="gs-error-text" id="req-preferred-time-error">
                  {requestFieldErrors.preferredTime}
                </p>
              )}
              <p className="gs-help" id="req-time-hint">
                Giờ mở cửa studio: 08:00–20:00 (ví dụ kịch bản: 24/10/2026 lúc 09:00).
              </p>
            </div>
          </div>

          <fieldset className="extras-fieldset" disabled={!isCustomer || submittingRequest}>
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
                      disabled={!isCustomer || submittingRequest}
                      onChange={() => handleToggleExtra(extra.name)}
                    />
                    <span>{extra.name}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          {requestFormError && (
            <p className="chat-feedback-error" role="alert">{requestFormError}</p>
          )}

          {submittedRequest && (
            <div className="chat-feedback-ok" role="status">
              <p>
                <strong>Đã gửi yêu cầu kiểm tra lịch ({submittedRequest.requestId}):</strong>
                {' '}
                {submittedRequest.shootType} · Ngày {submittedRequest.preferredDate} lúc {submittedRequest.preferredTime}
                {submittedRequest.extras?.length ? ` · Dịch vụ kèm: ${submittedRequest.extras.join(', ')}` : ''}.
              </p>
              <p>
                Trạng thái hội thoại: <strong>{submittedRequest.status || 'Đang tư vấn'}</strong>. Lịch chưa được giữ cho đến khi bạn thống nhất giờ và thanh toán cọc 30% thành công.
              </p>
            </div>
          )}

          <button
            className="gs-btn gs-btn--primary gs-btn--block"
            type="submit"
            disabled={!isCustomer || submittingRequest}
          >
            {submittingRequest ? 'Đang gửi yêu cầu…' : 'Gửi yêu cầu đặt lịch'}
          </button>

          <p className="gs-help">
            {isCustomer
              ? 'Yêu cầu đặt lịch chỉ giúp studio kiểm tra nhân sự và phòng chụp; chưa giữ chỗ ngay ở bước này.'
              : 'Vui lòng đăng nhập tài khoản Khách hàng để gửi yêu cầu đặt lịch.'}
          </p>
        </form>
      </div>
    </div>
  )
}
