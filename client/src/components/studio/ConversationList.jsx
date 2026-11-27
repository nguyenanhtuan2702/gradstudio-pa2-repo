import { EmptyState } from '../AsyncStates.jsx'
import { StatusBadge } from '../workspace/Feedback.jsx'
import { ALL_STATUSES, CONVERSATION_STATUSES, filterConversations, formatDate } from '../workspace/format.js'

/** G4 — conversation list with the four status filters. */
export default function ConversationList({ conversations, filter, onFilter, selectedId, onSelect }) {
  const visible = filterConversations(conversations, filter)

  return (
    <>
      <div className="ops-filters" role="group" aria-label="Lọc hội thoại theo trạng thái">
        {[ALL_STATUSES, ...CONVERSATION_STATUSES].map((status) => (
          <button
            key={status}
            className="gs-btn gs-btn--secondary ops-filter"
            type="button"
            aria-pressed={filter === status}
            onClick={() => onFilter(status)}
          >
            {status} ({filterConversations(conversations, status).length})
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <EmptyState title="Không có hội thoại">
          {filter === ALL_STATUSES ? 'Chưa có khách hàng nào nhắn tin cho studio.' : `Không có hội thoại ở trạng thái ${filter}.`}
        </EmptyState>
      ) : (
        <ul className="conv-list gs-list-reset">
          {visible.map((conversation) => {
            const active = conversation.id === selectedId
            const latest = conversation.messages?.at(-1)
            return (
              <li key={conversation.id} className={active ? 'conv conv--active' : 'conv'}>
                <h3>{conversation.customerName}</h3>
                <p>{formatDate(conversation.date)}</p>
                <p className="meta">{latest ? latest.text : 'Chưa có tin nhắn.'}</p>
                <div className="status-row"><StatusBadge status={conversation.status} /></div>
                <button className="gs-btn gs-btn--secondary" type="button" aria-pressed={active} onClick={() => onSelect(conversation.id)}>
                  {active ? 'Đang mở' : 'Mở hội thoại'}
                  <span className="ops-visually-hidden"> với {conversation.customerName}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
