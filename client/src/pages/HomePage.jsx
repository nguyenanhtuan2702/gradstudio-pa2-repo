import { useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../api/apiClient.js'
import { useAuth } from '../auth/useAuth.js'
import { EmptyState, ErrorState, LoadingState } from '../components/AsyncStates.jsx'
import { SiteFooter, SiteHeader } from '../components/SiteChrome.jsx'
import useResource from '../hooks/useResource.js'

const fetchCatalogue = () => apiRequest('/api/catalogue')

const localPhotoAssets = Object.freeze({
  'photo-1': '/assets/images/TotNghiep.jpg',
})

const servicePresentation = Object.freeze({
  'svc-yearbook': {
    image: '/assets/images/KyYeu.jpg',
    alt: 'Ba con mèo ngồi cạnh nhau trên nền lá khô',
    description: 'Một người đại diện đặt lịch cho cả lớp.',
  },
  'svc-graduation': {
    image: '/assets/images/TotNghiep.jpg',
    alt: 'Mèo con nhìn nghiêng giữa những tán cây xanh',
    description: 'Chụp cá nhân hoặc nhóm nhỏ, tùy chọn makeup. Gói Tốt nghiệp Premium gồm 2 giờ chụp và 30 ảnh chỉnh.',
  },
  'svc-portrait': {
    image: '/assets/images/ChanDung.jpg',
    alt: 'Chân dung cận cảnh mèo lông sáng trên nền tối',
    description: 'Buổi chụp ngắn, chọn ảnh cần chỉnh và nhận file.',
  },
})

function formatPrice(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 'Liên hệ studio'
  return `${new Intl.NumberFormat('vi-VN').format(value)}đ`
}

function CatalogueSections({ catalogue, onSelectPackage }) {
  const services = Array.isArray(catalogue.services) ? catalogue.services : []
  const packages = Array.isArray(catalogue.packages) ? catalogue.packages : []
  const extras = Array.isArray(catalogue.extras) ? catalogue.extras : []
  const photos = Array.isArray(catalogue.photos) ? catalogue.photos : []
  const reviews = Array.isArray(catalogue.reviews) ? catalogue.reviews : []
  const noItems = !services.length && !packages.length && !extras.length && !photos.length && !reviews.length

  if (noItems) {
    return <EmptyState title="Danh mục hiện chưa có dữ liệu" headingLevel={2}>Vui lòng quay lại sau.</EmptyState>
  }

  return (
    <div className="catalogue-sections">
      <section aria-labelledby="services-title">
        <h2 id="services-title">Dịch vụ</h2>
        {services.length ? (
          <div className="card-grid">
            {services.map((service) => (
              <article className="gs-card catalogue-card" key={service.id}>
                {servicePresentation[service.id] && (
                  <div className={`service-art${service.id === 'svc-graduation' ? ' service-art--b' : service.id === 'svc-portrait' ? ' service-art--c' : ''}`}>
                    <img
                      className="service-art__image"
                      src={servicePresentation[service.id].image}
                      alt={servicePresentation[service.id].alt}
                      loading="lazy"
                    />
                  </div>
                )}
                <h3>{service.name}</h3>
                {servicePresentation[service.id] && <p>{servicePresentation[service.id].description}</p>}
                <p className="price">Từ {formatPrice(service.fromPrice)}</p>
                <a className="gs-btn gs-btn--secondary catalogue-inquiry" href="#chat" onClick={() => onSelectPackage(service.name)}>
                  Hỏi về gói này
                </a>
              </article>
            ))}
          </div>
        ) : <EmptyState title="Chưa có dịch vụ">Danh sách dịch vụ hiện chưa được cung cấp.</EmptyState>}
      </section>

      <section aria-labelledby="packages-title">
        <h2 id="packages-title">Gói chụp</h2>
        {packages.length ? (
          <div className="card-grid">
            {packages.map((item) => (
              <article className="gs-card catalogue-card" key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.shootHours} giờ chụp · {item.editedPhotos} ảnh chỉnh</p>
                <p className="price">{formatPrice(item.price)}</p>
                <a className="gs-btn gs-btn--secondary catalogue-inquiry" href="#chat" onClick={() => onSelectPackage(item.name)}>
                  Hỏi về gói này
                </a>
              </article>
            ))}
          </div>
        ) : <EmptyState title="Chưa có gói chụp">Danh sách gói hiện chưa được cung cấp.</EmptyState>}
      </section>

      <section aria-labelledby="extras-title">
        <h2 id="extras-title">Dịch vụ bổ sung</h2>
        {extras.length ? (
          <ul className="catalogue-list gs-list-reset">
            {extras.map((extra) => (
              <li className="gs-card catalogue-list__item" key={extra.id}>
                <h3>{extra.name}</h3>
                <p className="price">{formatPrice(extra.price)}</p>
              </li>
            ))}
          </ul>
        ) : <EmptyState title="Chưa có dịch vụ bổ sung">Danh sách dịch vụ bổ sung hiện chưa được cung cấp.</EmptyState>}
      </section>

      <section aria-labelledby="photos-title">
        <h2 id="photos-title">Ảnh mẫu</h2>
        {photos.length ? (
          <div className="photo-grid">
            {photos.map((photo, index) => {
              const src = photo.url || localPhotoAssets[photo.id]
              return (
                <figure className="gs-card sample-photo" key={photo.id}>
                  {src ? <img src={src} alt={photo.alt || 'Ảnh mẫu GradStudio'} loading="lazy" /> : (
                    <div className="sample-photo__placeholder" aria-label={photo.alt || 'Ảnh mẫu GradStudio'}>
                      <span>{photo.alt || `Ảnh mẫu ${index + 1}`}</span>
                    </div>
                  )}
                  <figcaption>{photo.alt || 'Ảnh mẫu GradStudio'}</figcaption>
                </figure>
              )
            })}
          </div>
        ) : <EmptyState title="Chưa có ảnh mẫu">Ảnh mẫu hiện chưa được cung cấp.</EmptyState>}
      </section>

      <section aria-labelledby="reviews-title">
        <h2 id="reviews-title">Đánh giá</h2>
        {reviews.length ? (
          <div className="card-grid">
            {reviews.map((review) => (
              <article className="gs-card review-card" key={review.id}>
                <h3>{review.customerName}</h3>
                <p className="review-rating">Đánh giá: {review.rating}/5</p>
                <p>{review.comment}</p>
              </article>
            ))}
          </div>
        ) : <EmptyState title="Chưa có đánh giá">Đánh giá của khách hàng hiện chưa được cung cấp.</EmptyState>}
      </section>
    </div>
  )
}

export default function HomePage() {
  const { user } = useAuth()
  const { status, data, error, retry } = useResource('catalogue', fetchCatalogue)
  const [selectedPackageName, setSelectedPackageName] = useState('')

  return (
    <>
      <SiteHeader current="home" />
      <main className="site-main gs-stack" id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__body">
            <p className="meta">Studio ảnh tốt nghiệp &amp; chân dung</p>
            <h1 id="hero-title">Lưu lại ngày ra trường theo cách của bạn</h1>
            <p className="lead">Kỷ yếu lớp, tốt nghiệp, chân dung CV — khám phá dịch vụ và cùng GradStudio lên kế hoạch cho buổi chụp của bạn.</p>
            <div className="gs-cluster">
              <a className="gs-btn gs-btn--primary" href="#dich-vu">Xem gói chụp</a>
              <a className="gs-btn gs-btn--secondary" href="#chat">Hỏi studio về lịch</a>
              {user ? (
                user.role === 'customer' && <Link className="gs-btn gs-btn--secondary" to="/bookings/GS-1024">Lịch chụp của tôi</Link>
              ) : <Link className="gs-btn gs-btn--secondary" to="/login">Đăng nhập để tiếp tục</Link>}
            </div>
          </div>
          <figure className="hero__art">
            <img src="/assets/images/hero1.avif" alt="Ảnh mèo minh họa cho GradStudio" width="493" height="740" fetchPriority="high" />
          </figure>
        </section>

        <div id="dich-vu">
          {status === 'loading' && <LoadingState label="Đang tải dịch vụ và danh mục…" />}
          {status === 'error' && <ErrorState error={error} onRetry={retry} label="Không tải được danh mục" />}
          {status === 'success' && (
            <CatalogueSections catalogue={data || {}} onSelectPackage={setSelectedPackageName} />
          )}
        </div>

        <section id="chat" aria-labelledby="chat-title">
          <h2 id="chat-title">Trò chuyện với studio</h2>
          <div className="gs-card page-placeholder" aria-live="polite">
            {selectedPackageName ? (
              <p>Bạn đang quan tâm: <strong>{selectedPackageName}</strong>.</p>
            ) : (
              <p>Chọn “Hỏi về gói này” để ghi nhận gói bạn muốn tư vấn.</p>
            )}
            <p>Khung chat và gửi yêu cầu đặt lịch sẽ được tích hợp ở G3; hiện chưa gửi tin nhắn đến studio.</p>
          </div>
        </section>

        <section aria-labelledby="process-title">
          <h2 id="process-title">Từ một tin nhắn đến bộ ảnh hoàn chỉnh</h2>
          <ol className="steps gs-list-reset">
            <li className="gs-card">
              <h3>Tư vấn</h3>
              <p>Trao đổi với studio về gói chụp, concept, giá và khung giờ mong muốn.</p>
            </li>
            <li className="gs-card">
              <h3>Thống nhất giờ</h3>
              <p>Studio kiểm tra lịch và đề xuất giờ phù hợp. Thống nhất giờ chưa có nghĩa là lịch đã được giữ.</p>
            </li>
            <li className="gs-card">
              <h3>Đặt cọc</h3>
              <p>Lịch chỉ được giữ sau khi thanh toán cọc thành công và studio kiểm tra lại tài nguyên.</p>
            </li>
            <li className="gs-card">
              <h3>Buổi chụp &amp; nhận ảnh</h3>
              <p>Ekip chuẩn bị theo lịch đã giữ; bạn chọn ảnh cần chỉnh và nhận file khi hoàn tất.</p>
            </li>
          </ol>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
