# BIÊN BẢN THỐNG NHẤT KỸ THUẬT & HỢP ĐỒNG API — PA#3 (GRADSTUDIO)
*(Bản cập nhật theo quyết định kiến trúc của Tech Lead)*

* **Môn học:** CSC13008 — Phát triển ứng dụng Web (CQ2024/31)
* **Cột mốc:** PA#3 — Front end in React
* **Thành viên nhóm:**
  * Nguyễn Anh Tuấn — `23120184` (Tech Lead / Architect, Core, G1, G2, G11)
  * Lê Công Phúc — `23120330` (Front-end Developer 1 — Luồng Customer & Thanh toán: G3, G6-Customer, G7, G9)
  * Đặng Hồng Minh — `24120090` (Front-end Developer 2 — Luồng Admin/Staff & Tài liệu: G4, G5, G6-Admin, G8, G10)

> **MỤC TIÊU CỦA BẢN THỐNG NHẤT:**
> Chốt toàn bộ schema, endpoint bổ sung trong `docs/api/`, logic xử lý tại `mock/server.mjs` + `mock/data/` và ranh giới file/props trong `client/src/` **trước khi** các thành viên viết và commit code React gọi API. Đảm bảo tuân thủ tuyệt đối nguyên tắc **Contract-First** (commit `docs/api/` $\rightarrow$ commit `mock/` $\rightarrow$ commit React) và chạy `node tools/contract-check.mjs` trên mock khởi động mới đạt **100% PASS (0 FAIL)**.

---

## 1. CÁC QUYẾT ĐỊNH KỸ THUẬT & HỢP ĐỒNG API ĐÃ CHỐT TRƯỚC KHI CODE

### 1.1. Luồng Hội thoại, Đề xuất giờ & Chốt lịch (G3, G4, G5, G6 — Phúc & Minh)

* **Vấn đề hiện tại:** `GET /api/conversations` trong `mock/server.mjs` (dòng 122) đang loại bỏ `messages` và `proposal`.
* **Quyết định chốt:**
  1. **Trả đầy đủ dữ liệu hội thoại:** Cập nhật `GET /api/conversations` trong `mock/server.mjs` và ví dụ trong `docs/api/03-chat.md` để trả về đầy đủ mảng `messages` và object `proposal` (nếu có) của từng hội thoại.
  2. **Hành vi khi Customer phản hồi đề xuất giờ (`POST /api/conversations/:id/agree`):**
     * Nếu `decision === "agree"`: đặt `conversation.proposal.status = "agreed"` và chuyển `conversation.status = "Đã chốt lịch"`.
     * Nếu `decision === "decline"`: đặt `conversation.proposal.status = "declined"`, nhưng **hội thoại vẫn tiếp tục giữ trạng thái `"Đang tư vấn"`** để Admin có thể tư vấn và gửi đề xuất khung giờ khác.

---

### 1.2. Luồng Thanh toán Cọc 30% & Thanh toán 70% còn lại (G7, G9 — Phúc)

* **Nguyên tắc nghiệp vụ (Tech Lead chốt):**
  * Các endpoint `POST /api/bookings/:id/deposit/payment` và `POST /api/bookings/:id/payments/remaining` **chỉ khởi tạo phiên thanh toán và trả về `gatewayUrl` + `paymentId`**.
  * **Tuyệt đối không** chuyển trạng thái booking sang `"Đã đặt lịch"` (hoặc `"Đã thanh toán đủ"`) ngay tại bước tạo URL này.
  * Phải có bước **API xác nhận kết quả thanh toán** từ trang cổng thanh toán thử nghiệm (`/payments/test/:id`). Chỉ sau khi nhận kết quả thành công và kiểm tra lại tài nguyên không bị xung đột thì hệ thống mới đổi trạng thái.
* **Quyết định chốt Endpoint & Schema xác nhận kết quả thanh toán:**
  1. **Bước 1 — Khởi tạo thanh toán (giữ nguyên endpoint hiện có):**
     * Đặt cọc 30%: `POST /api/bookings/:id/deposit/payment` $\rightarrow$ trả về `{ "gatewayUrl": "/payments/test/GS-1024?kind=deposit&scenario=success", "paymentId": "pay-deposit-1024" }` (trạng thái booking vẫn là `"Chờ cọc 30%"`).
     * Thanh toán 70% còn lại: `POST /api/bookings/:id/payments/remaining` với `{ "scenario": "success", "selectedPhotoIds": ["photo-1", ...] }` $\rightarrow$ lưu danh sách `selectedPhotoIds` (1–30 ảnh) và trả về `{ "gatewayUrl": "/payments/test/GS-1024?kind=remaining&scenario=success", "paymentId": "pay-rest-1024", "remaining": 1260000 }`.
  2. **Bước 2 — Xác nhận kết quả từ trang Gateway (Endpoint bổ sung vào `04-bookings.md`):**
     * **Endpoint:** `POST /api/bookings/:id/payments/confirm` (Allowed role: `customer`)
     * **Request body:**
       ```json
       {
         "paymentId": "pay-deposit-1024",
         "kind": "deposit",
         "result": "success"
       }
       ```
       *(Trong đó: `kind` nhận `"deposit"` hoặc `"remaining"`; `result` nhận `"success"` hoặc `"failure"`).*
     * **Xử lý cho `kind === "deposit"`:**
       * Nếu `result === "success"`: Hệ thống kiểm tra lại tài nguyên (Mai `13:00–14:00`, Tuấn & Phòng B `14:00–16:00`). Nếu tài nguyên còn trống $\rightarrow$ cập nhật `status = "Đã đặt lịch"`, `paymentStatus = "Đã cọc 30%"`, kích hoạt danh sách nhắc lịch `reminders` và phân công job cho Staff. Nếu tài nguyên không còn trống $\rightarrow$ trả về `409 Conflict`.
       * Nếu `result === "failure"`: Giữ nguyên `status = "Chờ cọc 30%"`, `paymentStatus = "Chờ cọc"` và trả về thông báo thanh toán thất bại để khách thử lại.
     * **Xử lý cho `kind === "remaining"`:**
       * Nếu `result === "success"`: Cập nhật `paymentStatus = "Đã thanh toán đủ"`, `remaining = 0`.
       * Nếu `result === "failure"`: Giữ nguyên `paymentStatus = "Đã cọc 30%"`, `remaining = 1260000`.

---

### 1.3. Schema Nhắc lịch (`reminders`) trong Booking (G7 — Phúc)

* **Nguyên tắc (Tech Lead chốt):** Yêu cầu G7 cần thể hiện đầy đủ **thời điểm gửi**, **kênh gửi** và **trạng thái email**, không chỉ có tiêu đề.
* **Quyết định chốt Schema `reminders`:**
  * Trả trực tiếp mảng `reminders` bên trong object booking của `GET /api/bookings/:id` (và `GET /api/bookings`).
  * **Schema chuẩn của mỗi phần tử trong `reminders`:**
    ```json
    "reminders": [
      {
        "id": "rem-1024-24h",
        "title": "Nhắc lịch make-up và chụp trước 24 giờ",
        "scheduledAt": "2026-10-23T13:00:00+07:00",
        "channel": "Email",
        "recipient": "linh@gradstudio.test",
        "emailStatus": "Đã gửi"
      }
    ]
    ```

---

### 1.4. Luồng Ảnh Preview & Lưu lựa chọn tối đa 30 ảnh (G8, G9 — Minh & Phúc)

* **Nguyên tắc (Tech Lead chốt):** Cần thống nhất cách API trả danh sách ảnh preview để khách chọn, giới hạn tối đa 30 ảnh theo Gói Tốt nghiệp Premium, cách lưu lựa chọn của khách, và mock server phải thực sự lưu ảnh khi Staff upload ở G8.
* **Quyết định chốt:**
  1. **Schema ảnh preview trong Booking (`GET /api/bookings/:id`):**
     * Bổ sung 3 trường vào booking `GS-1024` trong `mock/data/bookings.json` và `docs/api/04-bookings.md`:
       ```json
       "maxEditedPhotos": 30,
       "previewPhotos": [
         {
           "id": "photo-1",
           "bookingId": "GS-1024",
           "title": "Ảnh tốt nghiệp mẫu 01",
           "url": "/assets/images/TotNghiep.jpg"
         }
       ],
       "selectedPhotoIds": []
       ```
  2. **Khi Staff upload ảnh preview ở G8 (`POST /api/bookings/:id/photos/preview`):**
     * Mock server tạo object ảnh mới `{ id: "photo-...", bookingId: id, title, url }` và **`push` trực tiếp vào mảng `booking.previewPhotos`** để khi Customer mở G9 sẽ thấy ngay ảnh Staff vừa tải lên.
  3. **Khi Customer chọn ảnh ở G9:**
     * Giao diện G9 đọc `booking.previewPhotos` và giới hạn `booking.maxEditedPhotos` (30 ảnh), chặn chọn quá 30 ảnh trên UI.
     * Khi Customer gửi danh sách ảnh đã chọn qua `POST /api/bookings/:id/payments/remaining` (trường `selectedPhotoIds`, bắt buộc từ `1` đến `30` phần tử, nếu sai trả `400 Bad Request`), mock server lưu mảng này vào `booking.selectedPhotoIds`.

---

### 1.5. Endpoint riêng cho Customer bấm "Nhận ảnh" (G9 — Phúc)

* **Nguyên tắc (Tech Lead chốt):** Không mở quyền `PATCH /api/bookings/:id` cho Customer dùng chung với Admin. Thiết kế endpoint riêng cho thao tác nhận ảnh hoàn thiện.
* **Quyết định chốt Endpoint:**
  * **Endpoint:** `POST /api/bookings/:id/receive` (Allowed role: `customer`, bổ sung vào `04-bookings.md` và bảng `docs/api/README.md`).
  * **Điều kiện hợp lệ:**
    * Booking phải đã thanh toán đủ 100% (`remaining === 0` / `paymentStatus === "Đã thanh toán đủ"`) **và** Admin đã cập nhật `finalFileLink` khác rỗng.
    * Nếu chưa thanh toán đủ hoặc chưa có `finalFileLink` $\rightarrow$ trả về `409 Conflict` (`"Chưa đủ điều kiện nhận ảnh: cần thanh toán đủ 100% và có link file hoàn thiện từ studio."`).
  * **Kết quả khi hợp lệ (`200 OK`):**
    * Cập nhật `booking.status = "Hoàn thành"` (và đồng bộ `conversation.status = "Hoàn thành"`).
    * Trả về object booking đã cập nhật kèm `finalFileLink`.

---

## 2. THỐNG NHẤT TÀI KHOẢN DEMO, BẢNG ROUTE MỤC TIÊU & RANH GIỚI FILE REACT

### 2.1. Bảng tài khoản Demo (5 tài khoản ứng với 4 Role đăng nhập)

Hệ thống có **4 role đăng nhập** (`customer`, `admin`, `staff`, `superadmin`) được đại diện bởi **5 tài khoản demo** (trong đó `mai` và `tuan` cùng có role là **`staff`** nhưng khác công việc chuyên môn):

| Tên trong ví dụ (`{{token:...}}`) | Role đăng nhập | Chuyên môn / Vai trò nghiệp vụ | E-mail đăng nhập | Mật khẩu |
| :--- | :--- | :--- | :--- | :--- |
| `linh` | `customer` | Khách hàng (Nguyễn Thùy Linh) | `linh@gradstudio.test` | `linh-demo` |
| `thao` | `admin` | Quản trị viên studio (Thảo) | `thao@gradstudio.test` | `thao-demo` |
| `mai` | `staff` | Nhân sự Make-up (Mai) | `mai@gradstudio.test` | `mai-demo` |
| `tuan` | `staff` | Nhân sự Nhiếp ảnh (Tuấn) | `tuan@gradstudio.test` | `tuan-demo` |
| `superadmin` | `superadmin` | Quản trị hệ thống | `superadmin@gradstudio.test` | `superadmin-demo` |

---

### 2.2. Bảng Route mục tiêu (Target Routes)

> **Lưu ý:** Hiện tại trong `client/src/App.jsx` và `FRONTEND.md` mới chỉ có 3 route khung từ PA#2 (`/`, `/studio`, `/bookings/GS-1024`) và 1 dòng mô tả `/payments/test/GS-1024`. Bảng dưới đây là **Bảng Route mục tiêu** cho PA#3; ngay khi nhóm chốt, Tuấn sẽ cập nhật vào `client/src/App.jsx` và `FRONTEND.md`.

| Route mục tiêu | Role được phép | Bước PA#3 | Phụ trách chính | Mô tả chức năng & API sử dụng |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Visitor, `customer` | **G1, G3, G6 (Customer)** | **Tuấn** (`HomePage.jsx`)<br>**Phúc** (`CustomerChatSection.jsx`) | • **G1:** Catalogue dịch vụ, gói chụp, extras, ảnh mẫu, đánh giá (`GET /api/catalogue`).<br>• **G3 & G6:** Nhúng `<CustomerChatSection />` để chat, gửi form yêu cầu đặt lịch và phản hồi đề xuất giờ. |
| `/login` | Tất cả | **G2** | **Tuấn** | Đăng nhập/Đăng xuất cho 5 tài khoản thuộc 4 roles (`POST /api/auth/login`, `POST /api/auth/logout`). |
| `/studio` | `admin` | **G4, G5, G6 (Admin), G10** | **Minh** | Quản lý & lọc hội thoại, chat tư vấn (G4); Kiểm tra trùng lịch & gửi đề xuất giờ (G5); Tạo booking khi khách đồng ý (G6); Quản lý danh sách booking, đổi/hủy lịch, dán `finalFileLink` (G10). |
| `/bookings/:id`<br>*(VD: `/bookings/GS-1024`)* | `customer` | **G7, G9** | **Phúc** | Xem chi tiết booking, timeline, danh sách `reminders`, khởi tạo đặt cọc 30% (G7); Xem `previewPhotos`, chọn tối đa 30 ảnh, khởi tạo thanh toán 70% còn lại & bấm *Nhận ảnh* (`POST /api/bookings/:id/receive`) (G9). |
| `/payments/test/:id`<br>*(VD: `/payments/test/GS-1024`)* | `customer` | **G7, G9 (Test Gateway)** | **Phúc** | Trang cổng thanh toán thử nghiệm (`?kind=deposit\|remaining&scenario=success\|failure&paymentId=...`), gọi `POST /api/bookings/:id/payments/confirm` để xác nhận Thành công / Thất bại rồi quay về `/bookings/GS-1024`. |
| `/staff` | `staff` (`mai`, `tuan`) | **G8** | **Minh** | Xem danh sách việc được phân công (`GET /api/staff/jobs`), cập nhật tiến độ (`PATCH /api/staff/jobs/:id`), upload ảnh preview (`POST /api/bookings/:id/photos/preview`). |
| `/superadmin` | `superadmin` | **G11** | **Tuấn** | Xem & tạo tài khoản Admin (`GET/POST /api/admin/accounts`), xem & cập nhật cài đặt hệ thống (`GET/PUT /api/admin/settings`). |

---

### 2.3. Ranh giới File & Quy ước Interface cho `CustomerChatSection.jsx`

Để tránh xung đột Git giữa **Tuấn** (phụ trách trang chủ `/` - G1) và **Phúc** (phụ trách G3, G6-Customer nằm trên trang chủ `/`):

1. **Quy định phạm vi sửa file:**
   * **Phúc chỉ tạo và chỉnh sửa file `client/src/components/CustomerChatSection.jsx`** (cùng `BookingPage.jsx` và `TestPaymentPage.jsx`).
   * **Phúc tuyệt đối không sửa `HomePage.jsx` hoặc `App.jsx` của Tuấn.** Tuấn sẽ là người import và đặt `<CustomerChatSection />` vào đúng vị trí `<section id="chat">` trong `HomePage.jsx`.
2. **Thống nhất Interface / Props của `<CustomerChatSection />`:**
   ```jsx
   /**
    * Component khu vực Chat & Gửi yêu cầu đặt lịch của Khách hàng (G3 & G6-Customer)
    * @param {Object} props
    * @param {string} [props.defaultConversationId="conv-linh"] - ID hội thoại mặc định
    * @param {string} [props.selectedPackageName] - Tên gói dịch vụ khi khách bấm "Hỏi về gói này" từ danh sách G1
    * @param {Array<{id: string, name: string}>} [props.packages] - Danh sách gói/loại buổi chụp truyền từ Catalogue G1 xuống form yêu cầu (nếu có)
    * @param {Array<{id: string, name: string}>} [props.extras] - Danh sách dịch vụ phụ (예: Makeup) truyền từ Catalogue G1 xuống form
    */
   export default function CustomerChatSection({
     defaultConversationId = 'conv-linh',
     selectedPackageName = '',
     packages = [],
     extras = [],
   })
   ```
   * Component `CustomerChatSection` tự lấy `user`, `token` (hoặc hàm gọi API có sẵn Bearer token) từ `AuthContext` của Tuấn.
   * Khi người dùng chưa đăng nhập (`visitor`) hoặc đăng nhập không phải `customer`, component hiển thị khung hội thoại giới thiệu kèm nút/link điều hướng sang `/login` để đăng nhập tài khoản `linh@gradstudio.test` trước khi gửi tin nhắn hoặc yêu cầu đặt lịch.

---

## 3. QUY TRÌNH THỰC HIỆN & KIỂM SOÁT CHẤT LƯỢNG (CHECKLIST BẮT BUỘC)

1. **Trình tự Commit chuẩn Contract-First:**
   * **Commit 1 (`docs/api/`):** Cập nhật `README.md`, `03-chat.md`, `04-bookings.md`, `06-admin.md` theo đúng các mục đã chốt ở Phần 1 (ghi rõ vào `## Changes`).
   * **Commit 2 (`mock/`):** Cập nhật `mock/data/bookings.json` và `mock/server.mjs`. Khởi động mới mock server và chạy:
     ```powershell
     node tools/contract-check.mjs
     ```
     Xác nhận đạt **`PASS 100% - 0 FAIL`** trên toàn bộ ví dụ và endpoint.
   * **Commit 3+ (`client/` & `FRONTEND.md`):** Tuấn commit khung `AuthContext`, `App.jsx`, bảng Route mục tiêu trong `FRONTEND.md`, sau đó cả 3 thành viên phát triển và commit riêng từng luồng G1–G11.
2. **Kiểm tra định danh Git cá nhân trước khi commit:**
   * Mỗi thành viên tự kiểm tra `git config user.name` và `git config user.email` trên máy của mình trước khi commit phần việc được giao. Không `rebase` hoặc `squash` làm xáo trộn thứ tự timestamp giữa `docs/api/`, `mock/` và `client/`.
3. **Nhật ký AI (`brief.md` & `AI-LOG.md`):**
   * Ghi nhận trung thực prompt đã dùng vào `brief.md` và quá trình kiểm tra/sửa lỗi AI vào `AI-LOG.md` dưới mục `## PA#3` ngay sau mỗi task.
