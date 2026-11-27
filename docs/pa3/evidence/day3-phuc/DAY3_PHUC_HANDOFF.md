# BÀN GIAO NGÀY 3 — KHUNG GIAO DIỆN CUSTOMER (LÊ CÔNG PHÚC)

- **Người thực hiện:** Lê Công Phúc — `23120330`
- **Phạm vi Ngày 3:** Dựng khung UI phía Customer trên React scaffold hiện tại của Tuấn (chuẩn bị cho **G3, G6-Customer, G7, G9**), kế thừa giao diện PA#2 (`index.html`, `booking.html`, `styles.css`), kiểm tra responsive `360px` / `768px` / `1280px` và xác định đầy đủ điểm tích hợp API.
- **Tuân thủ ranh giới file:** **Không chỉnh sửa** bất kỳ file Core nào của Tuấn (`App.jsx`, `HomePage.jsx`, `AuthContext.jsx`, `apiClient.js`, `ProtectedRoute.jsx`, `SiteChrome.jsx`, `AsyncStates.jsx`, `styles.css`).

---

## 1. Danh sách file đã tạo mới

| Đường dẫn file | Vai trò & Luồng chuẩn bị | Ghi chú kế thừa & Kiến trúc |
|---|---|---|
| `client/src/components/CustomerChatSection.jsx` | **Customer Chat** — chuẩn bị cho **G3** & **G6-Customer** | Kế thừa bố cục `#chat` từ `index.html` PA#2; đồng bộ gói khi bấm *“Hỏi về gói này”* từ Catalogue nhưng vẫn cho phép khách tự đổi lựa chọn trong dropdown; có banner hướng dẫn đăng nhập cho Visitor, khung đề xuất giờ mới G6 và form gửi yêu cầu G3. |
| `client/src/pages/BookingPage.jsx` | **Booking Page** — chuẩn bị cho **G7** & tích hợp **G9** | Kế thừa trọn vẹn bố cục `booking.html` PA#2; dùng đúng cấu trúc `booking.reminders` (ban đầu rỗng `[]` khi `Chờ cọc 30%`, định dạng ISO `reminder.scheduledAt`) và truyền `booking.selectedPhotoIds` xuống `BookingPhotoGallery`. |
| `client/src/components/BookingPhotoGallery.jsx` | **Photo Gallery** — chuẩn bị cho **G9** | Lưới ảnh preview đọc trực tiếp `selectedPhotoIds` (mặc định `[]` — `0 / 30` ảnh, không tự chọn trước `photo-1`), bộ đếm trần `maxEditedPhotos` (30 ảnh), khung thanh toán 70% còn lại và nút *Nhận ảnh hoàn thiện*. |
| `client/src/pages/TestPaymentPage.jsx` | **Test Payment Gateway** — chuẩn bị cho **G7** & **G9** | Khung trang cổng thanh toán mô phỏng tại `/payments/test/:id`, đọc query `kind`, `scenario`, `paymentId` và chuẩn bị điểm gọi `POST /api/bookings/:id/payments/confirm`. |
| `client/src/api/customerEndpoints.js` | Bản đồ Endpoint Customer | Gom toàn bộ đường dẫn tương đối `/api/...` cho G3, G6, G7, G9; tách riêng khỏi file `.jsx` để đảm bảo React Fast Refresh (`oxlint` đạt 0 warning, 0 error). |
| `client/src/styles/customerFlow.css` | Stylesheet phạm vi Customer | Tái sử dụng 100% design tokens `:root` của `styles.css` PA#2; mobile-first (`768px`, `1200px`), không dùng `!important`, không dùng `overflow-x: hidden`. |

---

## 2. Hướng dẫn tích hợp cho Tech Lead (Tuấn)

Khi Tuấn tích hợp vào trang chủ và router để bắt đầu G3 (27/11) và G7/G9 (29–30/11):

### 2.1. Nhúng `CustomerChatSection` vào `client/src/pages/HomePage.jsx`

1. Thêm import ở đầu `HomePage.jsx`:
   ```jsx
   import CustomerChatSection from '../components/CustomerChatSection.jsx'
   ```
2. Thay phần `.page-placeholder` bên trong `<section id="chat" aria-labelledby="chat-title">` bằng:
   ```jsx
   <section id="chat" aria-labelledby="chat-title">
     <h2 id="chat-title">Trò chuyện với studio</h2>
     <CustomerChatSection
       defaultConversationId="conv-linh"
       selectedPackageName={selectedPackageName}
       packages={data?.packages || []}
       extras={data?.extras || []}
     />
   </section>
   ```
   *(Lưu ý ngữ nghĩa heading: `HomePage.jsx` giữ `<h2>Trò chuyện với studio</h2>`, bên trong `CustomerChatSection.jsx` các tiêu đề con đều dùng `<h3>` để không nhảy cấp heading).*

### 2.2. Nối route `BookingPage` và `TestPaymentPage` trong `client/src/App.jsx`

1. Thêm import ở đầu `App.jsx` (và xóa hàm `BookingPage()` placeholder nội tuyến):
   ```jsx
   import BookingPage from './pages/BookingPage.jsx'
   import TestPaymentPage from './pages/TestPaymentPage.jsx'
   ```
2. Khai báo trong `<Routes>`:
   ```jsx
   <Route path="/bookings/:id" element={(
     <ProtectedRoute allowedRoles={['customer']}>
       <BookingPage />
     </ProtectedRoute>
   )} />
   <Route path="/payments/test/:id" element={(
     <ProtectedRoute allowedRoles={['customer']}>
       <TestPaymentPage />
     </ProtectedRoute>
   )} />
   ```
   *(Ghi chú: `BookingPage` dùng `useParams()` với fallback `id = 'GS-1024'`, nên vẫn tương thích cả khi route trong `SiteChrome.jsx` điều hướng tới `/bookings/GS-1024`).*

---

## 3. Bản đồ các điểm tích hợp API (Sẵn sàng cho Ngày 4 – Ngày 7)

Tất cả các cuộc gọi API trong giai đoạn tiếp theo sẽ đi qua `const { request } = useAuth()` (tự động gắn `Authorization: Bearer <token>` từ `AuthContext` và `apiClient.js`):

| Bước | Thành phần UI | Method & Endpoint (`customerEndpoints.js`) | Trạng thái khung Ngày 3 & Hướng xử lý tiếp theo |
|---|---|---|---|
| **G3** | Khung hội thoại `CustomerChatSection` | `GET /api/conversations`<br>`POST /api/conversations/:id/messages` | Đã có danh sách tin nhắn, ô nhập tin nhắn kèm `<label>` và nút *Gửi*. Ngày 4 nối `useResource` + submit state + hiển thị lỗi `400`. |
| **G3** | Form yêu cầu đặt lịch `CustomerChatSection` | `POST /api/conversations/:id/request` | Đã có đủ trường `shootType`, `preferredDate`, `preferredTime`, `extras` (checkbox pill ≥ 44px). Ngày 4 nối validation từng trường và hiển thị lỗi `400` / xung đột `409` (Mai bận `08:00–12:00`) ngay dưới input. |
| **G6** | Khung đề xuất giờ mới `CustomerChatSection` | `POST /api/conversations/:id/agree` | Đã có card hiển thị đề xuất `13:00–14:00` (Mai) & `14:00–16:00` (Tuấn · Phòng B) cùng 2 nút *Đồng ý* / *Từ chối*. Ngày 5 nối API `decision: 'agree' \| 'decline'`. |
| **G7** | Chi tiết lịch chụp, Reminders & Đặt cọc `BookingPage` | `GET /api/bookings/:id`<br>`POST /api/bookings/:id/deposit/payment` | Đã dựng đủ layout lịch tuần, timeline, danh sách `reminders`, hộp giá và chọn kịch bản test. Ngày 6 nối API lấy dữ liệu thật và điều hướng sang `gatewayUrl`. |
| **G7, G9** | Cổng thanh toán mô phỏng `TestPaymentPage` | `POST /api/bookings/:id/payments/confirm` | Đã đọc query `kind`, `scenario`, `paymentId`. Ngày 6–7 nối API xác nhận kết quả (chỉ khi `deposit` + `success` và tài nguyên hợp lệ mới chuyển sang `Đã đặt lịch`). |
| **G9** | Thư viện preview & Nhận ảnh `BookingPhotoGallery` | `POST /api/bookings/:id/payments/remaining`<br>`POST /api/bookings/:id/receive` | Đã hỗ trợ chọn/bỏ chọn ảnh trên UI với trần `maxEditedPhotos = 30`. Ngày 7 nối API gửi `selectedPhotoIds`, thanh toán 70% còn lại và kích hoạt nút *Nhận ảnh hoàn thiện* khi `remaining === 0` & có `finalFileLink`. |

---

## 4. Kết quả kiểm tra kỹ thuật & Bộ ảnh giao diện bàn giao

> **Phương pháp chụp ảnh minh chứng:** Để kiểm tra giao diện thực tế mà không sửa file của Tuấn trong Git, quá trình kiểm tra đã gắn tạm các component vào bản chạy cục bộ trên trình duyệt Chrome Headless với mock server (`normal` mode), đo DOM tự động tại 3 độ phân giải `360px`, `768px`, `1280px`, chụp ảnh màn hình, sau đó khôi phục nguyên trạng 100% `HomePage.jsx` và `App.jsx`.

- **`npm run lint` (`oxlint`):** `Found 0 warnings and 0 errors` trên toàn bộ 35 files trong `client/src/`.
- **`npm run build` (`vite build`):** Thành công, xuất `client/dist/` không lỗi.
- **Kiểm chứng 3 điểm review kỹ thuật:**
  1. `CustomerChatSection`: Bấm *“Hỏi về gói này”* từ Catalogue tự điền gói vào dropdown, sau đó đổi thủ công trong `<select>` sang gói khác (`Chân dung/CV`) cập nhật bình thường cả dropdown và nhãn `Đang hỏi về`.
  2. `BookingPage`: Đọc trực tiếp `booking.reminders` và `reminder.scheduledAt` (hiển thị `EmptyState` khi `reminders: []` ở trạng thái `Chờ cọc 30%`).
  3. `BookingPhotoGallery`: Mặc định `selectedPhotoIds = []` (`Đã chọn: 0 / 30`, `photo-1` chưa được chọn), đồng bộ theo prop `selectedPhotoIds` và bật/tắt chọn bình thường trên UI.
- **Kiểm tra Responsive & Accessibility tự động (`360px`, `768px`, `1280px`):**
  - `scrollWidth > clientWidth`: `false` trên mọi màn hình và kích thước.
  - Phần tử tràn cạnh phải viewport: `0` phần tử.
  - Số thẻ `<h1>` trên mỗi route: đúng `1` thẻ `<h1>`.
  - Input/Select/Checkbox thiếu `<label>` hiển thị: `0` trường hợp.
  - Nút bấm, link điều hướng và checkbox pill độc lập tại `360px`: 100% đạt chiều cao `>= 44px`.

### Ảnh giao diện trong cùng thư mục `docs/pa3/evidence/day3-phuc/`:
1. [Customer Chat (Visitor mode — 1280px)](01-customer-chat-visitor-1280.png)
2. [Customer Chat (Visitor mode — 360px mobile)](02-customer-chat-visitor-360.png)
3. [Customer Chat (Đã đăng nhập Customer Linh — 1280px)](03-customer-chat-authenticated-1280.png)
4. [Booking Page G7 & Photo Gallery G9 — 1280px desktop](04-booking-and-gallery-1280.png)
5. [Booking Page G7 & Photo Gallery G9 — 768px tablet](05-booking-and-gallery-768.png)
6. [Booking Page G7 & Photo Gallery G9 — 360px mobile](06-booking-and-gallery-360.png)
7. [Test Payment Gateway — 1280px](07-test-payment-gateway-1280.png)
