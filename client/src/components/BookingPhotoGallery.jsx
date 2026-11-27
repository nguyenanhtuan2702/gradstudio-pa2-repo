import { useState } from 'react'
import { CUSTOMER_API_ENDPOINTS } from '../api/customerEndpoints.js'
import { EmptyState } from './AsyncStates.jsx'
import '../styles/customerFlow.css'

function formatCurrency(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '0đ'
  return `${new Intl.NumberFormat('vi-VN').format(value)}đ`
}

export default function BookingPhotoGallery({
  bookingId = 'GS-1024',
  previewPhotos = [],
  selectedPhotoIds = [],
  maxEditedPhotos = 30,
  remainingAmount = 1260000,
  paymentStatus = 'Chờ cọc',
  finalFileLink = '',
}) {
  const normalizedPropIds = Array.isArray(selectedPhotoIds) ? selectedPhotoIds : []
  const propSelectionKey = normalizedPropIds.join('\u0000')
  const [selectedIds, setSelectedIds] = useState(() => normalizedPropIds)
  const [prevPropSelectionKey, setPrevPropSelectionKey] = useState(propSelectionKey)
  const [remainingScenario, setRemainingScenario] = useState('success')

  if (propSelectionKey !== prevPropSelectionKey) {
    setPrevPropSelectionKey(propSelectionKey)
    setSelectedIds(normalizedPropIds)
  }

  const selectedCount = selectedIds.length
  const reachedLimit = selectedCount >= maxEditedPhotos
  const isFullyPaid = remainingAmount === 0 || paymentStatus === 'Đã thanh toán đủ'
  const canReceivePhotos = isFullyPaid && Boolean(finalFileLink)

  function handleTogglePhoto(photoId) {
    setSelectedIds((current) => {
      if (current.includes(photoId)) {
        return current.filter((item) => item !== photoId)
      }
      if (current.length >= maxEditedPhotos) {
        return current
      }
      return [...current, photoId]
    })
  }

  return (
    <section className="gallery-section" aria-labelledby="gallery-title">
      <div>
        <h2 id="gallery-title">Thư viện ảnh preview &amp; nhận file hoàn thiện</h2>
        <p className="muted">
          Khung giao diện chuẩn bị cho bước G9: xem ảnh preview do nhân sự tải lên, chọn tối đa {maxEditedPhotos} ảnh cần chỉnh, thanh toán 70% còn lại và nhận link file hoàn thiện.
        </p>
      </div>

      <div className="gallery-toolbar" role="status" aria-live="polite">
        <p>
          Đã chọn: <strong>{selectedCount} / {maxEditedPhotos}</strong> ảnh chỉnh theo gói
        </p>
        <span className={`badge ${canReceivePhotos ? 'badge--ok' : 'badge--wait'}`}>
          <span aria-hidden="true">{canReceivePhotos ? '✓' : '◷'}</span>
          {' '}
          {canReceivePhotos
            ? 'Đủ điều kiện nhận ảnh hoàn thiện'
            : 'Chờ hoàn tất thanh toán & link ảnh từ studio'}
        </span>
      </div>

      <div className="gallery-layout">
        {/* Lưới ảnh preview */}
        <div>
          {previewPhotos.length ? (
            <div className="preview-gallery-grid">
              {previewPhotos.map((photo) => {
                const isSelected = selectedIds.includes(photo.id)
                const disableSelect = !isSelected && reachedLimit
                const checkboxId = `select-preview-${photo.id}`

                return (
                  <article
                    key={photo.id}
                    className={`preview-photo-card${isSelected ? ' preview-photo-card--selected' : ''}`}
                  >
                    <figure className="preview-photo-card__media">
                      <img
                        src={photo.url || '/assets/images/TotNghiep.jpg'}
                        alt={photo.alt || photo.title || `Ảnh preview ${photo.id}`}
                        loading="lazy"
                      />
                    </figure>
                    <div className="preview-photo-card__body">
                      <div className="preview-photo-card__head">
                        <h3>{photo.title || `Ảnh preview ${photo.id}`}</h3>
                        <span className={`badge ${isSelected ? 'badge--ok' : 'badge--wait'}`}>
                          <span aria-hidden="true">{isSelected ? '✓' : '○'}</span>
                          {' '}
                          {isSelected ? 'Đã chọn' : 'Chưa chọn'}
                        </span>
                      </div>
                      <p className="meta">Mã ảnh: <code>{photo.id}</code></p>
                      <label className="checkbox-pill" htmlFor={checkboxId}>
                        <input
                          id={checkboxId}
                          type="checkbox"
                          checked={isSelected}
                          disabled={disableSelect}
                          onChange={() => handleTogglePhoto(photo.id)}
                        />
                        <span>{isSelected ? 'Bỏ chọn ảnh này' : 'Chọn ảnh để chỉnh sửa'}</span>
                      </label>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <EmptyState title="Chưa có ảnh preview" headingLevel={3}>
              Nhân sự chụp ảnh sẽ tải ảnh preview của booking {bookingId} lên sau buổi chụp (bước G8).
            </EmptyState>
          )}
        </div>

        {/* Cột thanh toán 70% còn lại & Nhận ảnh hoàn thiện */}
        <div className="gs-card gs-stack">
          <h3>Thanh toán 70% còn lại &amp; Nhận ảnh</h3>
          <div className="price-box">
            <p className="price-row">
              <span>Số ảnh đang chọn</span>
              <strong>{selectedCount} / {maxEditedPhotos} ảnh</strong>
            </p>
            <p className="price-row price-row--due">
              <span>Còn lại 70%</span>
              <strong>{formatCurrency(remainingAmount)}</strong>
            </p>
            <p className="price-row">
              <span>Trạng thái thanh toán</span>
              <strong>{paymentStatus}</strong>
            </p>
          </div>

          <div className="field">
            <label className="gs-label" htmlFor="remaining-payment-scenario">
              Kịch bản cổng thanh toán thử nghiệm (70% còn lại)
            </label>
            <select
              className="gs-select"
              id="remaining-payment-scenario"
              value={remainingScenario}
              onChange={(event) => setRemainingScenario(event.target.value)}
              aria-describedby="remaining-scenario-help"
            >
              <option value="success">Kịch bản: Thanh toán thành công</option>
              <option value="failure">Kịch bản: Thanh toán thất bại</option>
            </select>
            <p className="gs-help" id="remaining-scenario-help">
              Thành công xác nhận đã thanh toán đủ 100%; thất bại giữ nguyên khoản 70% còn lại.
            </p>
          </div>

          <button
            className="gs-btn gs-btn--primary gs-btn--block"
            type="button"
            disabled
            aria-describedby="g9-shell-note"
          >
            Thanh toán 70% còn lại ({formatCurrency(remainingAmount)})
          </button>

          <button
            className="gs-btn gs-btn--secondary gs-btn--block"
            type="button"
            disabled
            aria-describedby="g9-shell-note"
          >
            Nhận ảnh hoàn thiện
          </button>

          <p className="note" id="g9-shell-note">
            <strong>Khung giao diện G9 (chưa gọi API lưu lựa chọn hoặc thanh toán):</strong> Ở bước G9, nút thanh toán sẽ gọi <code>POST {CUSTOMER_API_ENDPOINTS.startRemainingPayment(bookingId)}</code> kèm <code>selectedPhotoIds</code>, và nút <em>Nhận ảnh hoàn thiện</em> sẽ gọi <code>POST {CUSTOMER_API_ENDPOINTS.receiveFinalPhotos(bookingId)}</code> khi đã thanh toán đủ 100% và có <code>finalFileLink</code> từ Admin.
          </p>
        </div>
      </div>
    </section>
  )
}
