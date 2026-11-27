import { useState } from 'react'
import { EmptyState } from '../components/AsyncStates.jsx'
import { SiteFooter, SiteHeader } from '../components/SiteChrome.jsx'
import BookingForm from '../components/studio/BookingForm.jsx'
import ChatPanel from '../components/studio/ChatPanel.jsx'
import ConversationList from '../components/studio/ConversationList.jsx'
import SchedulePanel from '../components/studio/SchedulePanel.jsx'
import { ResourceStatus } from '../components/workspace/Feedback.jsx'
import { ALL_STATUSES, errorMessage, filterConversations } from '../components/workspace/format.js'
import useApiList from '../components/workspace/useApiList.js'
import '../styles/workspace.css'

export default function StudioPage() {
  const conversations = useApiList('/api/conversations')
  const bookings = useApiList('/api/bookings')
  const packages = useApiList('/api/catalogue', 'packages')
  const [filter, setFilter] = useState(ALL_STATUSES)
  const [selectedId, setSelectedId] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [refreshError, setRefreshError] = useState('')

  const visible = filterConversations(conversations.items, filter)
  // The open conversation stays open when its status moves it out of the filter.
  const selected = conversations.items.find((item) => item.id === selectedId) || visible[0]

  function changeFilter(next) {
    const matches = filterConversations(conversations.items, next)
    setFilter(next)
    setSelectedId(matches.some((item) => item.id === selected?.id) ? selected.id : matches[0]?.id ?? '')
  }

  const changeConversation = (id, change) => {
    conversations.update((items) => items.map((item) => (item.id === id ? change(item) : item)))
  }

  const saveBooking = (booking) => {
    bookings.update((items) => (
      items.some((item) => item.id === booking.id)
        ? items.map((item) => (item.id === booking.id ? booking : item))
        : [...items, booking]
    ))
  }

  async function refreshConversations() {
    setRefreshing(true)
    setRefreshError('')
    try {
      await conversations.refresh()
    } catch (error) {
      setRefreshError(errorMessage(error))
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <>
      <SiteHeader current="studio" />
      <main className="site-main gs-stack ops-main" id="main-content">
        <section aria-labelledby="page-title">
          <h1 id="page-title">Tư vấn và xử lý trùng lịch</h1>
          <p className="role-strip">Trả lời khách, kiểm tra lịch và tạo booking. Lịch chỉ được giữ sau khi khách cọc 30% thành công.</p>
        </section>

        <div className="ops-grid">
          <section className="admin-col" aria-labelledby="list-title">
            <h2 id="list-title">Danh sách hội thoại</h2>
            {conversations.status === 'success' ? (
              <>
                <button className="gs-btn gs-btn--ghost ops-action" type="button" onClick={refreshConversations} disabled={refreshing}>
                  {refreshing ? 'Đang cập nhật…' : 'Cập nhật hội thoại'}
                </button>
                {refreshError && <p className="login-form-error" role="alert">{refreshError}</p>}
                <ConversationList
                  conversations={conversations.items}
                  filter={filter}
                  onFilter={changeFilter}
                  selectedId={selected?.id}
                  onSelect={setSelectedId}
                />
              </>
            ) : (
              <ResourceStatus resource={conversations} loadingLabel="Đang tải hội thoại…" errorLabel="Chưa tải được hội thoại." />
            )}
          </section>

          {conversations.status === 'success' && (
            <div className="ops-detail">
              {selected ? (
                <>
                  <div className="admin-col">
                    <section className="admin-col" aria-labelledby="chat-title">
                      <h2 id="chat-title">Hội thoại với {selected.customerName}</h2>
                      <ChatPanel
                        key={selected.id}
                        conversation={selected}
                        onMessage={(id, message) => changeConversation(id, (item) => ({ ...item, messages: [...(item.messages ?? []), message] }))}
                      />
                    </section>
                    <section className="admin-col" aria-labelledby="form-title">
                      <h2 id="form-title">Booking mới</h2>
                      <BookingForm
                        key={selected.id}
                        conversation={selected}
                        packages={packages}
                        booking={bookings.items.find((item) => item.conversationId === selected.id)}
                        onCreated={saveBooking}
                      />
                    </section>
                  </div>
                  <section className="admin-col" aria-labelledby="schedule-title">
                    <h2 id="schedule-title">Lịch tài nguyên</h2>
                    <SchedulePanel
                      key={selected.id}
                      conversation={selected}
                      onProposal={(id, proposal) => changeConversation(id, (item) => ({ ...item, proposal }))}
                    />
                  </section>
                </>
              ) : (
                <section className="admin-col" aria-labelledby="chat-title">
                  <h2 id="chat-title">Hội thoại</h2>
                  <EmptyState title="Chưa mở hội thoại nào">Khi có hội thoại phù hợp, nội dung và biểu mẫu sẽ hiển thị tại đây.</EmptyState>
                </section>
              )}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
