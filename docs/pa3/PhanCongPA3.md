# KẾ HOẠCH TRIỂN KHAI & PHÂN CÔNG CÔNG VIỆC — PA#3: FRONT END IN REACT (GRADSTUDIO)

> **Phiên bản cập nhật:** 26/11/2026
>
> **Mục đích cập nhật:** Làm rõ nguyên tắc kế thừa sản phẩm PA#2, trạng thái React scaffold hiện có, phạm vi công việc thực tế của từng thành viên và ranh giới chỉnh sửa file.
> **Nguyên tắc:** PA#3 là giai đoạn phát triển tiếp từ PA#2, không phải dự án thiết kế và xây dựng lại từ đầu.

- **Môn học:** CSC13008 — Phát triển ứng dụng Web (CQ2024/31)
- **Cột mốc:** PA#3 — Front End in React (7% điểm môn học, thang điểm 100)
- **Thời gian thực hiện:** 24/11/2026 – 02/12/2026 (9 ngày)
- **Hạn chót nộp bài:** 22:00, Thứ Tư, ngày 02/12/2026
- **Thành viên:** Nguyễn Anh Tuấn, Lê Công Phúc, Đặng Hồng Minh

---

## 1. MỤC TIÊU PA#3 VÀ NGUYÊN TẮC KẾ THỪA PA#2

### 1.1. Mục tiêu PA#3

PA#3 tiếp tục phát triển hệ thống GradStudio đã được thiết kế và dựng prototype trong PA#2. Nhóm chuyển các màn hình và bố cục đã có sang ứng dụng React, kết nối dữ liệu qua API mock, bổ sung đăng nhập/phân quyền và hoàn thiện các luồng nghiệp vụ end-to-end từ **G1 đến G11** cho bốn role: `customer`, `admin`, `staff`, `superadmin` (ngoài ra có `visitor` chưa đăng nhập).

Ứng dụng PA#3 được phát triển trong thư mục `client/` bằng **React + Vite**, sử dụng **React Router**. Các dữ liệu nghiệp vụ như catalogue, hội thoại, booking, công việc Staff, tài khoản và cài đặt hệ thống phải được lấy/cập nhật qua API theo các hợp đồng trong `docs/api/`.

**PA#3 không yêu cầu nhóm làm lại giao diện PA#2.** Nhóm chỉ xây mới những màn hình hoặc chức năng PA#2 chưa có; các màn hình đã có phải được kế thừa, chuyển đổi, tách component và bổ sung nghiệp vụ.

### 1.2. Những gì đã được kế thừa từ PA#2

Repository hiện có ba màn hình PA#2 và đã có một bước chuyển đổi sang React. Bảng dưới đây xác định rõ phần nào đã có và phần nào cần làm tiếp:

| Sản phẩm PA#2 | Màn hình/route React hiện có | Thành phần cần giữ lại | Công việc cần làm ở PA#3 |
|---|---|---|---|
| `index.html` — Khách hàng | `/` — `client/src/pages/HomePage.jsx`, được `App.jsx` render qua `HomeRoute` | Hero, phần giới thiệu, catalogue dịch vụ, ảnh, các nút hỏi gói, trạng thái tải/lỗi/rỗng và bố cục PA#2 | G1 đã tải services, packages, extras, photos, reviews từ `GET /api/catalogue`; khu vực chat vẫn là placeholder cho G3/G6-Customer. Không còn `IndexPage()` trong `App.jsx`. |
| `studio.html` — Admin/Studio | `/studio` — hàm `StudioPage()` trong `client/src/App.jsx` | Route hiện có trang giữ chỗ với nội dung xem trước PA#2; chưa tích hợp hội thoại/booking API | Tách thành `client/src/pages/StudioPage.jsx`; lấy hội thoại/booking từ API; bổ sung lọc trạng thái, gửi tin nhắn, clash check, đề xuất giờ, điều kiện tạo booking và quản lý booking. |
| `booking.html` — Khách hàng | `/bookings/GS-1024` — hàm `BookingPage()` trong `client/src/App.jsx` | Route hiện có trang giữ chỗ với nội dung booking xem trước PA#2; chưa truy vấn booking hay thanh toán API | Tách thành `client/src/pages/BookingPage.jsx`; lấy booking từ API; bổ sung khởi tạo thanh toán, xác nhận kết quả qua test gateway, reminders, ảnh preview, chọn ảnh và nhận ảnh. |
| `styles.css` ở root | `client/src/styles.css` | Bản React kế thừa nền PA#2 và có thêm CSS cho catalogue, đăng nhập, trạng thái bất đồng bộ và tài khoản | Tiếp tục sử dụng làm stylesheet nền. Chỉ bổ sung CSS có phạm vi rõ ràng cho thành phần mới hoặc sửa lỗi responsive/accessibility bắt buộc; không thay toàn bộ design system. |
| `client/public/assets/images/` | Cùng một nguồn ảnh cho PA#2 và React | Ảnh dùng chung; trang HTML gốc tham chiếu tương đối tới thư mục này, Vite phục vụ tại `/assets/images/` | Giữ một bản duy nhất; bổ sung ảnh mới tại đây khi nghiệp vụ cần và nguồn ảnh hợp lệ. |

**Trạng thái code hiện tại (27/11/2026, sau bàn giao Ngày 3):**

- `client/src/App.jsx` có `BrowserRouter`, route `/`, `/login` và các route được bảo vệ `/studio`, `/bookings/GS-1024`, `/staff`, `/superadmin`.
- Trang chủ đã tách thành `client/src/pages/HomePage.jsx` và tải catalogue qua API. Phúc đã tạo `CustomerChatSection.jsx` dưới dạng khung giao diện cho G3/G6, nhưng component chưa được tích hợp vào `HomePage.jsx` và các thao tác chưa nối API.
- Đăng nhập, đăng xuất, AuthContext, `useAuth`, `ProtectedRoute` và các trang chờ theo role đã có. G11 Superadmin đã được triển khai và tích hợp route; các luồng nghiệp vụ G3–G10 tiếp tục theo lịch phân công.
- `/studio` vẫn là hàm placeholder trong `App.jsx`. Route `/bookings/GS-1024` vẫn render placeholder nội tuyến trong `App.jsx`, dù Phúc đã tạo `BookingPage.jsx` và `TestPaymentPage.jsx` dưới dạng khung giao diện; Tuấn chưa tích hợp các page này vào router.
- Shared async states được export từ `client/src/components/AsyncStates.jsx`; API helper nằm tại `client/src/api/apiClient.js`.
- `client/src/styles.css` kế thừa phần lớn nền PA#2 và có thêm CSS riêng cho PA#3. Ảnh dùng chung một lần tại `client/public/assets/images/`.
- React, Vite và React Router đã được cài đặt/cấu hình trong `client/`.

Vì vậy, phần G1/G2 hiện có được tiếp tục từ code thật; G11 Superadmin đã hoàn tất ở mức tích hợp API theo phạm vi Ngày 4. Các màn Studio/Booking và nghiệp vụ G3–G10 vẫn cần được phát triển theo phân công, không dựng lại trang chủ từ đầu.

### 1.3. Nguyên tắc kế thừa bắt buộc

1. **Không thiết kế lại từ đầu** ba màn hình `index.html`, `studio.html`, `booking.html` nếu không có yêu cầu cụ thể từ rubric hoặc lỗi kỹ thuật cần xử lý.
2. Dùng ba màn hình PA#2, React scaffold và stylesheet hiện tại làm baseline cho PA#3.
3. Giữ lại nhận diện GradStudio: màu sắc, typography, spacing, bố cục, hình ảnh, nội dung và responsive behavior đã hoàn thiện.
4. Chuyển nội dung nghiệp vụ viết cứng sang dữ liệu lấy từ API; bổ sung React state, form validation, loading/error/empty state, authentication, authorization và tương tác thực tế.
5. Tách các phần giao diện hiện có thành component/page riêng để mỗi thành viên phát triển độc lập, tránh cùng sửa `App.jsx`.
6. Chỉ xây mới các trang/chức năng chưa tồn tại trong PA#2, gồm tối thiểu Login, Staff, Superadmin và Test Payment; các phần này phải sử dụng chung design system của PA#2.
7. Không tự ý xóa hoặc thay đổi các thành phần PA#2 chỉ vì muốn viết lại theo cách khác. Mọi thay đổi lớn phải nêu lý do kỹ thuật hoặc yêu cầu rubric và được nhóm thống nhất.
8. Các file HTML PA#2 ở thư mục gốc (`index.html`, `studio.html`, `booking.html`) được giữ làm bản tham chiếu. Mã React đang phát triển đặt trong `client/`; không sửa lại các trang HTML gốc để thay thế công việc React.
9. Các sửa lỗi responsive, semantic HTML, accessibility hoặc dead links vẫn phải thực hiện nếu cần để đáp ứng rubric PA#3. Việc kế thừa không có nghĩa là giữ nguyên lỗi đã biết.

### 1.4. Những phần đã có và chưa có

| Hạng mục | Tình trạng | Cách xử lý trong PA#3 |
|---|---|---|
| Ba màn hình thiết kế PA#2 | Đã có | Kế thừa và nâng cấp. |
| React/Vite scaffold, router và role routes | Đã có | Tiếp tục phát triển từ `client/src/App.jsx`; không khởi tạo dự án React mới. |
| CSS nền và assets | Đã có | CSS PA#3 kế thừa nền PA#2; ảnh dùng chung tại `client/public/assets/images/`. |
| Hợp đồng API trong `docs/api/` | Đã có và đã được rà soát/cập nhật | Chỉ sửa khi phát hiện thiếu hoặc sai hợp đồng; ghi vào `## Changes`. |
| Mock server và dữ liệu | Đã có | Duy trì bốn chế độ và kiểm thử contract; chỉ cập nhật khi cần. |
| API client và Authorization Bearer | Đã có nền tảng | `client/src/api/apiClient.js`; AuthContext cung cấp request helper gắn token. |
| Authentication và ProtectedRoute | Đã có nền tảng | `client/src/auth/AuthContext.jsx`, `client/src/auth/ProtectedRoute.jsx`, `client/src/auth/roles.js`. |
| G1 Catalogue | Đã tích hợp API | `HomePage.jsx` tải danh sách và xử lý loading/error/retry/empty. |
| G2 Login/Logout và bảo vệ role | Đã có nền tảng | `LoginPage.jsx`, AuthContext và role routes trong `App.jsx`. |
| API integration G3–G10 | Đang triển khai | Tiếp tục theo phân công và lịch ở các mục sau. |
| Superadmin (G11) | Đã tích hợp | `SuperadminPage.jsx` được gắn vào route được bảo vệ `/superadmin`; tài khoản Admin và cài đặt dùng API mock. |
| Staff, Test Payment | Chưa tích hợp đầy đủ | `/staff` vẫn là điểm vào placeholder; Test Payment chưa có route. |

---

## 2. PHẠM VI NGHIỆP VỤ G1–G11

| Mã | Vai trò | Nghiệp vụ cần hoàn thành | Kế thừa/tạo mới |
|---|---|---|---|
| **G1** | Visitor/Customer | Xem catalogue dịch vụ, gói chụp, extras, ảnh mẫu và đánh giá. | Kế thừa trang chủ/catalogue PA#2; bổ sung dữ liệu API. |
| **G2** | Tất cả role đăng nhập | Đăng nhập, đăng xuất và phân quyền theo role. | Trang Login mới; dùng chung layout/design system. |
| **G3** | Customer | Chat với Studio, gửi yêu cầu chụp và thông tin thời gian; validation từng trường và hiển thị lỗi API. | Kế thừa vùng chat PA#2; thay nội dung tĩnh bằng component tương tác. |
| **G4** | Admin | Xem danh sách hội thoại, lọc trạng thái, mở hội thoại và phản hồi khách hàng. | Kế thừa màn hình Studio PA#2; bổ sung dữ liệu và thao tác API. |
| **G5** | Admin | Kiểm tra xung đột nhân sự/phòng, hiển thị lý do và đề xuất khung giờ khác. | Kế thừa khu vực lịch tài nguyên; bổ sung clash-check API. |
| **G6** | Customer/Admin | Customer đồng ý/từ chối đề xuất; Admin chỉ được tạo booking sau khi khách đồng ý. | Kế thừa chat, form booking và lịch; bổ sung state transition qua API. |
| **G7** | Customer | Xem booking, thanh toán cọc 30%, xử lý thành công/thất bại và xem reminders. | Kế thừa trang Booking; bổ sung payment flow và trang Test Payment mới. |
| **G8** | Staff | Xem công việc được phân công, cập nhật tiến độ, tải ảnh preview lên booking. | Trang Staff mới; sử dụng design system và dữ liệu booking hiện có. |
| **G9** | Customer | Xem ảnh preview, chọn tối đa 30 ảnh, thanh toán 70% còn lại và nhận ảnh hoàn thiện. | Kế thừa trang Booking; mở rộng gallery và payment/receive flow. |
| **G10** | Admin | Quản lý booking, trạng thái thanh toán, đổi/hủy lịch, cập nhật link ảnh hoàn thiện. | Kế thừa màn hình Studio; bổ sung khu vực quản lý booking. |
| **G11** | Superadmin | Xem/tạo tài khoản Admin và quản lý cài đặt hệ thống. | Trang Superadmin mới; dùng chung layout/design system. |

---

## 3. PHÂN CÔNG THÀNH VIÊN VÀ RANH GIỚI FILE

### 3.1. Nguyễn Anh Tuấn — Tech Lead / React Core / G1, G2, G11

**Phạm vi chính**

1. Chịu trách nhiệm kiến trúc React chung, tích hợp các page do Phúc và Minh bàn giao.
2. Duy trì AuthContext và hook quản lý `user`, `token`, trạng thái đăng nhập tại `client/src/auth/AuthContext.jsx`; request có xác thực gửi `Authorization: Bearer <token>`.
3. Duy trì API client dùng chung tại `client/src/api/apiClient.js`. Tất cả request từ React phải dùng đường dẫn tương đối `/api/...`, không hardcode `http://localhost:3001`.
4. Duy trì `ProtectedRoute` tại `client/src/auth/ProtectedRoute.jsx`, kiểm tra quyền theo role và điều hướng đăng nhập.
5. Duy trì các UI state dùng chung `LoadingState`, `ErrorState` và `EmptyState` trong cùng file `client/src/components/AsyncStates.jsx`.
6. **G1:** Trang `client/src/pages/HomePage.jsx` đã kế thừa giao diện PA#2 và tải services, packages, extras, photos, reviews qua `GET /api/catalogue`. Tiếp tục giữ trang này làm nơi tích hợp `CustomerChatSection` khi Phúc bàn giao; không còn `IndexPage()` cần tách.
7. **G2:** Hoàn thiện và kiểm tra trang Login, đăng nhập/đăng xuất cho 5 tài khoản demo thuộc 4 role; bảo vệ route theo role. Nền tảng hiện có gồm `LoginPage.jsx`, AuthContext và role routes.
8. **G11:** Xây dựng trang Superadmin để xem/tạo tài khoản Admin và xem/cập nhật cài đặt hệ thống.
9. Tiếp nhận `CustomerChatSection` do Phúc phát triển và các page của Minh để kết nối route trong `App.jsx`.
10. Hỗ trợ kiểm tra contract/mock khi cần thay đổi; điều phối kiểm thử E2E, build và đóng gói ZIP.

**File phụ trách chính**

- `client/src/App.jsx` — router và tích hợp page; chỉ Tuấn chỉnh sửa trực tiếp.
- `client/src/api/apiClient.js`
- `client/src/auth/AuthContext.jsx`
- `client/src/auth/ProtectedRoute.jsx`
- `client/src/auth/roles.js`
- `client/src/components/AsyncStates.jsx` — exports `LoadingState`, `ErrorState`, `EmptyState`.
- `client/src/components/SiteChrome.jsx`
- `client/src/hooks/useResource.js`
- `client/src/pages/HomePage.jsx`
- `client/src/pages/LoginPage.jsx`
- `client/src/pages/SuperadminPage.jsx` — page cần triển khai.

### 3.2. Lê Công Phúc — Front-end Developer 1 / Customer Chat / Booking & Payment

**Phạm vi chính**

1. **G3:** Phát triển khu vực chat Customer trên trang chủ: lấy hội thoại, gửi tin nhắn, gửi form yêu cầu đặt lịch, validation từng trường, hiển thị lỗi `400`/`409` tại đúng vị trí và khóa nút submit trong lúc gửi request.
2. **G6 — Customer:** Hiển thị đề xuất khung giờ của Admin trong chat; cho khách chọn **Đồng ý** hoặc **Từ chối**; cập nhật hội thoại theo kết quả API.
3. **G7:** Kế thừa trang `booking.html`/`BookingPage` PA#2; tải chi tiết booking `GS-1024`, timeline, gói dịch vụ, giá và reminders. Khởi tạo cọc 30% bằng API; mở test gateway; chỉ coi booking đã đặt khi confirm cọc thành công và backend xác nhận tài nguyên.
4. **G9:** Hiển thị `previewPhotos`; cho khách chọn tối đa `maxEditedPhotos` (30) ảnh; gửi `selectedPhotoIds` khi khởi tạo thanh toán 70%; chỉ cập nhật trạng thái đã thanh toán đủ sau confirm thành công; chỉ cho phép **Nhận ảnh** khi booking đủ điều kiện.
5. Xây dựng trang Test Payment để mô phỏng thanh toán thành công/thất bại; không tích hợp thanh toán tiền thật.

**File phụ trách chính**

- `client/src/components/CustomerChatSection.jsx`
- `client/src/pages/BookingPage.jsx`
- `client/src/pages/TestPaymentPage.jsx`
- CSS module hoặc file CSS riêng trong phạm vi các component/page trên (nếu cần).

**Ranh giới bắt buộc**

- Phúc **không chỉnh sửa trực tiếp** `client/src/App.jsx` hoặc `client/src/pages/HomePage.jsx` của Tuấn.
- Phúc chỉ bàn giao `CustomerChatSection.jsx` để Tuấn import vào `HomePage.jsx` tại khu vực `#chat`.
- Phúc dùng API client/AuthContext do Tuấn cung cấp; không tự tạo một cơ chế lưu token hoặc API base URL riêng.

**Interface thống nhất của `CustomerChatSection`**

```jsx
export default function CustomerChatSection({
  defaultConversationId = 'conv-linh',
  selectedPackageName = '',
  packages = [],
  extras = [],
}) {
  // G3 và G6-Customer
}
```

- `defaultConversationId`: hội thoại ban đầu, mặc định `conv-linh`.
- `selectedPackageName`: gói khách chọn từ catalogue nếu khách bấm “Hỏi về gói này”.
- `packages`, `extras`: dữ liệu từ catalogue truyền xuống form yêu cầu đặt lịch.
- Component lấy user/token qua `AuthContext` hoặc API client chung.
- Visitor hoặc tài khoản không có role `customer` chỉ xem phần giới thiệu; khi muốn gửi tin nhắn/yêu cầu đặt lịch phải được hướng dẫn đăng nhập bằng tài khoản Customer.

### 3.3. Đặng Hồng Minh — Front-end Developer 2 / Admin, Staff / QA & Tài liệu

**Phạm vi chính**

1. **G4:** Kế thừa màn hình `studio.html`; hiển thị danh sách hội thoại, lọc bốn trạng thái `Chưa trả lời`, `Đang tư vấn`, `Đã chốt lịch`, `Hoàn thành`; mở hội thoại và gửi phản hồi.
2. **G5:** Thực hiện clash check; hiển thị lý do xung đột bằng văn bản cụ thể, ví dụ “Mai bận 08:00–12:00”; hiển thị đề xuất giờ thay thế và gửi đề xuất vào hội thoại.
3. **G6 — Admin:** Chỉ bật nút `Tạo booking` khi khách đã đồng ý đề xuất; tạo booking `GS-1024` với trạng thái ban đầu `Chờ cọc 30%`. Không giữ lịch tại thời điểm tạo booking.
4. **G8:** Xây dựng trang Staff cho Mai và Tuấn: xem jobs, cập nhật tiến độ, upload ảnh preview; validate định dạng/dung lượng file ở client; ảnh upload phải xuất hiện trong `booking.previewPhotos`.
5. **G10:** Kế thừa màn hình Studio và mở rộng quản lý booking, trạng thái thanh toán, đổi/hủy lịch, kiểm tra xung đột khi thay đổi thời gian và cập nhật `finalFileLink`.
6. Chủ trì tài liệu PA#3: `FRONTEND.md`, `brief.md`, `AI-LOG.md`, `SELF_ASSESSMENT_REPORT.md`; ghi nhận quyết định PO nếu có; rà soát `Fix these`, accessibility, responsive và HTML validator.

**File phụ trách chính**

- `client/src/pages/StudioPage.jsx`
- `client/src/pages/StaffPage.jsx`
- CSS riêng cho Studio/Staff (nếu cần, không thay thế stylesheet nền).
- `FRONTEND.md`, `brief.md`, `AI-LOG.md`, `SELF_ASSESSMENT_REPORT.md`.

**Ranh giới bắt buộc**

- Phúc không chỉnh sửa trực tiếp `client/src/App.jsx` hoặc `client/src/pages/HomePage.jsx`; chỉ bàn giao component/page để Tuấn tích hợp router.
- Minh dùng API client/AuthContext do Tuấn cung cấp; không tự triển khai token/API helper riêng.
- Minh giữ lại giao diện hiện có của `StudioPage()` khi tách file, sau đó mới mở rộng API và các thao tác G4–G6/G10.

### 3.4. Cấu trúc React hiện tại, trạng thái file và quy tắc tránh xung đột

Cây dưới đây phân biệt file đang có với file dự kiến tạo theo phân công. Đường dẫn của các file đã có phản ánh cấu trúc repository ngày 26/11/2026:

```text
client/src/
├── App.jsx                         # Hiện có — Tuấn: router và tích hợp page
├── main.jsx                        # Hiện có — bootstrap ứng dụng
├── api/
│   ├── apiClient.js                # Hiện có — API client dùng chung
│   └── customerEndpoints.js        # Đã tạo — Phúc; bản đồ endpoint Customer
├── auth/
│   ├── AuthContext.jsx             # Hiện có
│   ├── ProtectedRoute.jsx          # Hiện có
│   └── roles.js                    # Hiện có
├── components/
│   ├── AsyncStates.jsx             # Hiện có — LoadingState/ErrorState/EmptyState
│   ├── SiteChrome.jsx              # Hiện có
│   ├── BookingPhotoGallery.jsx     # Đã tạo — Phúc; khung giao diện G9
│   └── CustomerChatSection.jsx     # Đã tạo — Phúc; khung giao diện G3/G6
├── hooks/
│   └── useResource.js              # Hiện có
├── pages/
│   ├── HomePage.jsx                # Hiện có — Tuấn; tích hợp chat sau
│   ├── LoginPage.jsx               # Hiện có — Tuấn
│   ├── StudioPage.jsx              # Dự kiến — Minh
│   ├── BookingPage.jsx             # Đã tạo — Phúc; khung giao diện G7/G9
│   ├── TestPaymentPage.jsx         # Đã tạo — Phúc; khung giao diện Gateway
│   ├── StaffPage.jsx               # Dự kiến — Minh
│   └── SuperadminPage.jsx          # Đã triển khai — Tuấn; G11
├── styles.css                      # Hiện có — nền kế thừa PA#2; chỉ sửa có kiểm soát
├── styles/
│   └── customerFlow.css            # Đã tạo — Phúc; CSS riêng Customer
├── App.css                          # Hiện có
└── index.css                        # Hiện có
```

Ở thời điểm cập nhật, `StudioPage()` và `BookingPage()` nội tuyến trong `App.jsx` vẫn là placeholder. Các file `CustomerChatSection.jsx`, `BookingPage.jsx`, `TestPaymentPage.jsx` và `BookingPhotoGallery.jsx` đã được tạo theo bàn giao Ngày 3 nhưng mới là khung giao diện, chưa nối đầy đủ nghiệp vụ API; các route vẫn cần Tuấn tích hợp. `StudioPage.jsx` và `StaffPage.jsx` chưa có file riêng.

Quy tắc làm việc:

- Tuấn là người duy nhất tích hợp import/route trong `App.jsx`.
- Phúc và Minh làm việc trong các component/page được giao; không chỉnh cùng file của người khác nếu chưa thống nhất.
- Khi một page mới sẵn sàng, người phụ trách bàn giao tên export, props, API đã dùng và trạng thái hoàn thành; Tuấn tích hợp vào router.
- Không tạo hai API client, hai AuthContext hoặc hai bộ design token khác nhau.
- Không sao chép toàn bộ CSS nền vào từng page. Dùng class có sẵn; CSS mới phải đặt tên có phạm vi và không làm hỏng ba màn hình được kế thừa.

---

## 4. ROUTE MỤC TIÊU VÀ API LIÊN QUAN

| Route | Role | Luồng | Phụ trách chính | Chức năng/API trọng tâm |
|---|---|---|---|---|
| `/` | Visitor, Customer | G1, G3, G6-Customer | Tuấn (HomePage/G1), Phúc (CustomerChatSection/G3/G6) | Catalogue `GET /api/catalogue`; hội thoại `GET /api/conversations`; gửi tin nhắn `POST /api/conversations/:id/messages`; gửi yêu cầu `POST /api/conversations/:id/request`; đồng ý/từ chối `POST /api/conversations/:id/agree`. |
| `/login` | Visitor và bốn role | G2 | Tuấn | Đăng nhập `POST /api/auth/login`; đăng xuất `POST /api/auth/logout`; lưu/khôi phục phiên qua AuthContext. |
| `/studio` | Admin | G4, G5, G6-Admin, G10 | Minh | `GET /api/conversations`; `POST /api/conversations/:id/messages`; `POST /api/clash-check`; `POST /api/conversations/:id/proposal`; `POST /api/bookings`; `GET /api/bookings`; `PATCH /api/bookings/:id`. |
| `/bookings/:id` | Customer | G7, G9 | Phúc | `GET /api/bookings/:id`; `POST /api/bookings/:id/deposit/payment`; `POST /api/bookings/:id/payments/remaining`; `POST /api/bookings/:id/receive`. |
| `/payments/test/:id` | Customer | G7, G9 — Test Gateway | Phúc | Trang mô phỏng kết quả thanh toán; nhận query `kind=deposit|remaining`, `scenario=success|failure`, `paymentId`; xác nhận bằng `POST /api/bookings/:id/payments/confirm`; trả kết quả về trang booking. |
| `/staff` | Staff | G8 | Minh | `GET /api/staff/jobs`; `PATCH /api/staff/jobs/:id`; `POST /api/bookings/:id/photos/preview`. |
| `/superadmin` | Superadmin | G11 | Tuấn | `GET/POST /api/admin/accounts`; `GET/PUT /api/admin/settings`. |

**Ghi chú:** Đây là route mục tiêu sau khi hoàn tất PA#3. `App.jsx` hiện khai báo `/`, `/login`, `/studio`, `/bookings/GS-1024`, `/staff`, `/superadmin` và route bắt các địa chỉ còn lại. `/studio` và `/bookings/GS-1024` vẫn render placeholder nội tuyến; `/staff` và `/superadmin` dùng `RoleHomePage` placeholder; route Test Payment chưa có. Cần bổ sung các page/route nghiệp vụ còn thiếu và cập nhật `FRONTEND.md` khi tích hợp.

---

## 5. LỊCH TRÌNH TRIỂN KHAI CHI TIẾT (24/11/2026 – 02/12/2026)

### Giai đoạn 1 — Contract, Mock và React foundation (Ngày 1–3)

| Ngày | Công việc | Phụ trách | Đầu ra/tiêu chí nghiệm thu |
|---|---|---|---|
| **Ngày 1 — 24/11 (Thứ Ba)** | Rà soát Git identity và tài liệu thống nhất kỹ thuật. Hoàn thiện, rà soát và commit riêng các hợp đồng `docs/api/` trước các thay đổi mock/React integration. Chốt request/response cho hội thoại, agree/decline, payment-init/confirm, reminders, preview photos, selected photos và Customer receive. Phúc/Minh review các endpoint thuộc luồng mình phụ trách. | Tuấn chính; Phúc và Minh review. | Các cập nhật hợp đồng được ghi nhận ở `adce667`, `ee39dc4`; dữ liệu thống nhất với Linh, Thảo, Mai, Tuấn, Phòng B và booking `GS-1024`. React/Vite scaffold đã có từ commit trước; không coi đó là API integration. **Ngày 1 đã hoàn thành theo lịch sử repository.** |
| **Ngày 2 — 25/11 (Thứ Tư)** | Sau khi hợp đồng được cập nhật, kiểm tra/cập nhật `mock/server.mjs` và `mock/data/` bằng Node built-in modules. Hoàn thiện lifecycle hội thoại, đề xuất, tạo booking, confirm cọc, reminders, upload preview, selected photos, thanh toán còn lại và receive. Duy trì bốn mode `normal`, `slow`, `error`, `empty`. | Tuấn chính; Phúc/Minh review theo nghiệp vụ. | Mock update được ghi nhận ở `cedffea`; kiểm tra `node --check`, JSON, `git diff --check` và `node tools/contract-check.mjs`. Kết quả đã ghi nhận: **35 examples, 24 endpoints, 0 FAIL**. **Ngày 2 đã hoàn thành theo lịch sử repository.** |
| **Ngày 3 — 26/11 (Thứ Năm)** | **Tuấn:** nền tảng API client/AuthContext/ProtectedRoute và async states nằm trong các file hiện có; G1 đang chạy từ `HomePage.jsx` qua catalogue API; G2 có `LoginPage.jsx` và role routes nền tảng. **Phúc:** tạo khung `CustomerChatSection.jsx`, `BookingPage.jsx`, `TestPaymentPage.jsx`, `BookingPhotoGallery.jsx`, bản đồ endpoint Customer và CSS riêng; thống nhất props/API, chuẩn bị cho G3/G6-Customer/G7/G9. **Minh:** tiếp tục tách nội dung `StudioPage()` placeholder trong `App.jsx` thành `StudioPage.jsx` và chuẩn bị Staff/Admin; file page riêng chưa có trong code hiện tại. | Tuấn: core + nền tảng G1/G2. Phúc: bàn giao khung giao diện Customer. Minh: Studio page extraction (còn chờ triển khai). | Đã đối chiếu code: G1 tải catalogue; Phúc đã bàn giao các khung UI trong `DAY3_PHUC_HANDOFF.md`. Báo cáo bàn giao ghi nhận lint/build và kiểm tra responsive/accessibility; các thao tác API và tích hợp component vào `HomePage.jsx`/router vẫn là công việc tiếp theo theo lịch G3–G9. |

### Giai đoạn 2 — Hoàn thiện nghiệp vụ G3–G11 (Ngày 4–7)

| Ngày | Công việc | Phụ trách | Đầu ra/tiêu chí nghiệm thu |
|---|---|---|---|
| **Ngày 4 — 27/11 (Thứ Sáu)** | **Phúc:** hoàn thiện G3 — chat, gửi tin nhắn và form yêu cầu đặt lịch; validation từng trường; lỗi `400`/`409` hiển thị đúng vị trí; khóa submit khi đang xử lý. **Minh:** hoàn thiện G4 — danh sách hội thoại, lọc bốn trạng thái, mở chat với Linh và phản hồi. **Tuấn:** hoàn thiện G2 Login/Logout và G11 — trang Superadmin xem/tạo tài khoản Admin, đọc/cập nhật cài đặt. | Tuấn, Phúc, Minh theo từng phần việc. | Tin nhắn từ Linh và phản hồi Admin Thảo cập nhật qua API; Superadmin tạo tài khoản và cập nhật settings thành công; route được bảo vệ đúng role. |
| **Ngày 5 — 28/11 (Thứ Bảy)** | **Minh:** G5 — clash check, hiển thị lý do xung đột và đề xuất giờ trống; G6-Admin — chỉ bật `Tạo booking` khi khách đã đồng ý. **Phúc:** G6-Customer — nhận đề xuất trong chat, gửi agree/decline; khi decline, hội thoại tiếp tục `Đang tư vấn`; khi agree, chuyển `Đã chốt lịch`. | Minh: G5/G6-Admin. Phúc: G6-Customer. Tuấn hỗ trợ tích hợp. | Luồng G5 → G6 hoạt động đúng; booking chỉ được tạo sau khi khách đồng ý và có trạng thái `Chờ cọc 30%`; chưa giữ lịch ở bước này. Kiểm tra responsive `360px`, `768px`, `1280px`. |
| **Ngày 6 — 29/11 (Chủ Nhật)** | **Phúc:** G7 — trang Booking kế thừa PA#2 hiển thị dữ liệu API, khởi tạo thanh toán cọc, trang Test Payment, confirm thành công/thất bại, reminders. **Minh:** G8 — trang Staff cho Mai/Tuấn xem jobs, cập nhật tiến độ và upload preview photos; validate file ở client. **Tuấn:** review API/state và tích hợp routes. | Phúc: G7. Minh: G8. Tuấn: review/integration. | Init payment không tự đổi trạng thái/giữ slot; confirm failure giữ `Chờ cọc 30%`; confirm success chỉ chuyển `Đã đặt lịch` sau kiểm tra tài nguyên; ảnh Staff upload xuất hiện trong `previewPhotos`. |
| **Ngày 7 — 30/11 (Thứ Hai)** | **Phúc:** G9 — thư viện preview, chọn tối đa 30 ảnh, init thanh toán 70%, confirm và thao tác Nhận ảnh. **Minh:** G10 — quản lý booking, trạng thái thanh toán, đổi/hủy lịch có clash check, cập nhật `finalFileLink`. **Tuấn:** tích hợp E2E toàn bộ route và sửa lỗi xuyên luồng. | Phúc: G9. Minh: G10. Tuấn: E2E integration. | Luồng Customer–Admin–Staff–Payment–Receive hoàn thành trên cùng mock state; chỉ nhận ảnh khi thanh toán đủ và có `finalFileLink`; booking/conversation chuyển `Hoàn thành` đúng điều kiện. |

### Giai đoạn 3 — Kiểm thử, tài liệu và nộp bài (Ngày 8–9)

| Ngày | Công việc | Phụ trách | Đầu ra/tiêu chí nghiệm thu |
|---|---|---|---|
| **Ngày 8 — 01/12 (Thứ Ba)** | Kiểm thử toàn bộ route ở bốn chế độ mock `normal`, `slow`, `error`, `empty`; kiểm tra Loading/Error/Retry/Empty state. Kiểm thử responsive ở `360px`, `768px`, `1280px`; kiểm tra không có horizontal overflow, nút/link đủ vùng thao tác, mỗi page có một `h1`, input có label, chat không che nội dung. Chạy W3C Validator với mục tiêu **0 errors** và `node tools/contract-check.mjs`. | Cả ba thành viên test chéo vai trò. | Không có lỗi console nghiêm trọng; không sai contract; không có dead link; responsive/accessibility đạt yêu cầu. Mọi thay đổi API phải ghi vào `## Changes`. |
| **Ngày 9 — 02/12 (Thứ Tư)** | Minh hoàn thiện `FRONTEND.md`, `brief.md`, `AI-LOG.md`, `SELF_ASSESSMENT_REPORT.md`. Tuấn chạy `npm run build`, kiểm tra `client/dist/`, chuẩn bị ZIP. Phúc giải nén ZIP trong thư mục riêng và kiểm tra vận hành/thiếu file. Nộp trước 22:00; mục tiêu hoàn tất đóng gói trước 21:00 để dự phòng. | Minh: tài liệu. Tuấn: build/đóng gói. Phúc: kiểm tra ZIP. | ZIP có `.git/` và `client/dist/`, không chứa `node_modules/`; giải nén ra thư mục mới vẫn chạy được theo hướng dẫn; lịch sử Git được bảo toàn; nộp trước hạn. |

---

## 6. DỮ LIỆU DEMO VÀ QUY TẮC NGHIỆP VỤ PHẢI NHẤT QUÁN

### 6.1. Dữ liệu câu chuyện demo

| Thuộc tính | Giá trị thống nhất |
|---|---|
| Customer | Nguyễn Thùy Linh |
| Admin | Thảo |
| Makeup Artist | Mai |
| Photographer | Tuấn |
| Ngày chụp | Thứ Bảy, 24/10/2026 |
| Thời gian khách yêu cầu ban đầu | 09:00 |
| Lý do xung đột | Mai bận 08:00–12:00 |
| Make-up được đề xuất | 13:00–14:00 với Mai |
| Thời gian chụp được đề xuất | 14:00–16:00 với Tuấn tại Phòng B |
| Gói | Gói Tốt nghiệp Premium — 2 giờ chụp, 30 ảnh chỉnh |
| Tổng giá | 1.800.000đ |
| Cọc 30% | 540.000đ |
| Còn lại 70% | 1.260.000đ |
| Booking minh họa | `GS-1024` |

Không đổi tên, ngày, giờ, nhân sự, phòng, giá hoặc trạng thái giữa các màn hình và API fixtures nếu chưa cập nhật thống nhất trong `docs/api/`, `mock/data/` và tài liệu.

### 6.2. Tài khoản demo

Hệ thống có 5 tài khoản demo đại diện cho 4 role đăng nhập:

| Tài khoản | Role | Email | Mật khẩu |
|---|---|---|---|
| Linh | `customer` | `linh@gradstudio.test` | `linh-demo` |
| Thảo | `admin` | `thao@gradstudio.test` | `thao-demo` |
| Mai | `staff` | `mai@gradstudio.test` | `mai-demo` |
| Tuấn (nhân sự) | `staff` | `tuan@gradstudio.test` | `tuan-demo` |
| Superadmin | `superadmin` | `superadmin@gradstudio.test` | `superadmin-demo` |

Visitor không đăng nhập là trạng thái truy cập công khai, không phải tài khoản demo. Không tạo nút Role Switcher/Demo Controls; đổi vai trò phải đăng xuất và đăng nhập bằng tài khoản tương ứng.

### 6.3. Quy tắc trạng thái hội thoại và booking

**Trạng thái hội thoại:**

- `Chưa trả lời`
- `Đang tư vấn`
- `Đã chốt lịch`
- `Hoàn thành`

**Trạng thái booking:**

- `Chờ cọc 30%`
- `Đã đặt lịch`
- `Hoàn thành`

Quy tắc chuyển trạng thái:

1. Hội thoại bắt đầu ở trạng thái tư vấn. Admin gửi đề xuất thời gian; Customer có thể đồng ý hoặc từ chối.
2. Nếu Customer từ chối, proposal chuyển `declined`, conversation tiếp tục `Đang tư vấn`.
3. Nếu Customer đồng ý, proposal chuyển `agreed`, conversation chuyển `Đã chốt lịch`.
4. Chỉ Admin được tạo booking và chỉ tạo sau khi proposal đã được Customer đồng ý.
5. Booking mới có trạng thái `Chờ cọc 30%`. **Tạo booking hoặc đồng ý giờ không đồng nghĩa tài nguyên đã được giữ.**
6. Chỉ sau khi cọc 30% được confirm thành công và backend kiểm tra tài nguyên còn khả dụng, booking mới chuyển `Đã đặt lịch`; lúc đó mới chính thức giữ chỗ, phân công nhân sự và kích hoạt reminders/jobs theo hợp đồng.
7. Thanh toán thất bại không được đổi booking sang `Đã đặt lịch`.
8. Customer chỉ nhận ảnh hoàn thiện khi đã thanh toán đủ 100% và Admin đã cập nhật `finalFileLink` khác rỗng.
9. Khi nhận ảnh thành công, booking và conversation được đồng bộ sang `Hoàn thành` theo API.

### 6.4. Quy tắc API và UI cho các luồng trọng yếu

- **Chat/request:** Dùng `GET /api/conversations`, `POST /api/conversations/:id/messages`, `POST /api/conversations/:id/request`. Lỗi validation `400` và xung đột `409` phải hiển thị rõ tại trường liên quan.
- **Clash check/proposal:** Dùng `POST /api/clash-check` và `POST /api/conversations/:id/proposal`. Không chỉ dùng màu sắc để báo bận; cần có lý do bằng văn bản.
- **Agree/decline:** Dùng `POST /api/conversations/:id/agree` với `decision: "agree"` hoặc `"decline"`.
- **Create booking:** Dùng `POST /api/bookings`; chỉ Admin được gọi và chỉ khi proposal đã agreed. Tạo booking không tự giữ chỗ.
- **Deposit:** Dùng `POST /api/bookings/:id/deposit/payment` để tạo payment session và nhận `gatewayUrl`/`paymentId`; sau đó test gateway gọi `POST /api/bookings/:id/payments/confirm`. Init không đổi trạng thái; chỉ confirm success sau khi kiểm tra tài nguyên mới chuyển `Đã đặt lịch`.
- **Reminders:** Booking response có `reminders` chứa tối thiểu `id`, `title`, `scheduledAt`, `channel`, `recipient`, `emailStatus`. Đây là trạng thái email giả lập của mock; không tuyên bố hệ thống đã gửi email thật.
- **Staff upload:** Dùng `GET /api/staff/jobs`, `PATCH /api/staff/jobs/:id`, `POST /api/bookings/:id/photos/preview`. Mock phải thêm ảnh upload mới vào `booking.previewPhotos` để Customer thấy ở G9.
- **Select photos/remaining payment:** Giao diện giới hạn số ảnh theo `maxEditedPhotos` (30); gửi `selectedPhotoIds` khi gọi `POST /api/bookings/:id/payments/remaining`. Nếu không hợp lệ, hiển thị lỗi API và không chuyển trạng thái thanh toán.
- **Remaining payment:** Chỉ chuyển `paymentStatus` sang `Đã thanh toán đủ` và `remaining = 0` sau khi confirm thành công. Thất bại giữ trạng thái đã cọc 30% và số tiền còn lại.
- **Receive:** Dùng `POST /api/bookings/:id/receive`. Chỉ cho thao tác thành công khi đã thanh toán đủ và `finalFileLink` không rỗng; nếu chưa đủ điều kiện, hiển thị lỗi `409`.
- **Admin booking management:** `PATCH /api/bookings/:id` chỉ dành cho Admin; đổi lịch/hủy lịch phải gọi kiểm tra xung đột theo nghiệp vụ.
- **Superadmin:** Dùng các endpoint `/api/admin/accounts` và `/api/admin/settings` theo hợp đồng.

### 6.5. Quy tắc kỹ thuật chung

1. Tất cả frontend API request sử dụng đường dẫn tương đối `/api/...`; không hardcode `http://localhost:3001` trong React source.
2. API cần xác thực phải gửi `Authorization: Bearer <token>` qua API client dùng chung.
3. Mock server sử dụng Node built-in modules và dữ liệu trong `mock/data/`; không tự ý thêm backend framework hoặc dependency không cần thiết.
4. Mock phải hỗ trợ `normal` (~150ms), `slow` (2s), `error` (HTTP 500 theo contract, ngoại lệ login như đã chốt) và `empty` (danh sách trả `[]`).
5. Mọi API list/detail phải có loading, error/retry và empty state phù hợp; không để lỗi request làm treo hoặc vỡ trang.
6. Không có nút giả lập vai trò, giả lập phản hồi hoặc Demo Controls trên giao diện cuối.
7. Không sử dụng `href="#"` hoặc control không có hành động thực tế.
8. Ảnh và nội dung demo phải có nguồn sử dụng phù hợp; tiếp tục sử dụng assets đã có trong repository khi phù hợp.

---

## 7. CONTRACT-FIRST, GIT VÀ KIỂM SOÁT CHẤT LƯỢNG

### 7.1. Thứ tự thực hiện khi có thay đổi hợp đồng

1. Cập nhật hợp đồng tương ứng trong `docs/api/` trước; ghi thay đổi vào phần `## Changes`.
2. Cập nhật `mock/server.mjs` và/hoặc `mock/data/` theo hợp đồng; chạy mock server mới và `node tools/contract-check.mjs`.
3. Chỉ sau đó cập nhật frontend React sử dụng API mới.

Không làm ngược thứ tự này đối với endpoint hoặc schema mới.

### 7.2. Ghi nhận lịch sử Git hiện có

- Commit `22a47a9`: đã chuyển prototype PA#2 sang React và cấu hình Vite.
- Các commit `86227f8` và `b326226`: đã có nền mock server/contract checker trước khi cập nhật hợp đồng mới.
- Các cập nhật hợp đồng mới được ghi nhận tại `adce667` và `ee39dc4`.
- Mock cập nhật theo hợp đồng được ghi nhận tại `cedffea`.
- Commit ghi nhận rà soát Ngày 2 gần nhất trong repository tại thời điểm cập nhật tài liệu: `9872e9c`.

Lịch sử ban đầu có các thành phần được tạo trước khi hợp đồng hoàn chỉnh; không viết lại lịch sử để tạo cảm giác thứ tự trước đây hoàn toàn chuẩn. Với các thay đổi tiếp theo, phải duy trì thứ tự `docs/api/` → `mock/` → React API integration. Không squash/rebase để làm sai lệch thứ tự hoặc thời điểm commit thực tế.

### 7.3. Git identity và commit

Mỗi thành viên tự kiểm tra trước khi commit:

```bash
git config user.name
git config user.email
```

Commit theo phần việc cụ thể, message mô tả đúng nội dung và thành viên thực hiện. Không dùng tài khoản của thành viên khác để commit thay nếu không được nhóm thống nhất.

### 7.4. Kiểm tra bắt buộc trước nghiệm thu

- `node tools/contract-check.mjs` đạt **0 FAIL**.
- `node --check mock/server.mjs` không lỗi cú pháp.
- Các file JSON trong `mock/data/` parse hợp lệ.
- `git diff --check` không báo lỗi whitespace.
- `npm run lint` trong `client/` không có lỗi blocker.
- `npm run build` trong `client/` chạy thành công và tạo `client/dist/`.
- Kiểm thử thủ công các route và luồng G1–G11 với đủ role.
- Kiểm tra đủ bốn mode mock `normal`, `slow`, `error`, `empty`.
- Kiểm tra trực tiếp route bằng refresh/F5 và mở URL trực tiếp; không chỉ kiểm tra khi đi từ trang chủ.

---

## 8. TÀI LIỆU, BUILD VÀ ĐÓNG GÓI NỘP BÀI

### 8.1. Tài liệu cần hoàn thiện

- **`FRONTEND.md`:** Thành viên, hướng dẫn chạy, demo accounts, bảng routes thực tế, các endpoint, quyết định PO, thư viện sử dụng và những phần chưa hoàn thiện. Phải cập nhật routes sau khi implement, không để trạng thái target/implemented gây hiểu nhầm.
- **`brief.md`:** Ghi nhận prompt/đầu vào AI theo yêu cầu môn học.
- **`AI-LOG.md`:** Ghi nhật ký sử dụng AI trong mục `## PA#3`, gồm công cụ, prompt, kết quả, lỗi và cách nhóm kiểm tra/khắc phục.
- **`SELF_ASSESSMENT_REPORT.md`:** Tự đánh giá theo rubric, kèm minh chứng cụ thể như route, file, endpoint, kết quả kiểm thử và commit hash.

### 8.2. Build và kiểm tra ZIP

Từ thư mục `client/`:

```powershell
npm run build
npx vite preview
```

Từ thư mục gốc, chạy mock server theo hướng dẫn trong `FRONTEND.md`. Diễn tập lại các luồng trên bản build/preview, không chỉ trên Vite dev server.

ZIP nộp bài phải:

- Được tạo từ thư mục gốc repository.
- Có thư mục `.git/` để bảo toàn lịch sử commit.
- Có thư mục `client/dist/` sau build.
- Không chứa `node_modules/`.
- Có đầy đủ `docs/`, `mock/`, `tools/`, `client/` và các tài liệu được yêu cầu.
- Có tên theo mẫu `<MSSV1>-<MSSV2>-<MSSV3>_<TongDiem>.zip`, MSSV sắp xếp tăng dần theo quy định nhóm/giảng viên.
- Được giải nén thử ra thư mục độc lập và kiểm tra chạy lại trước khi nộp.

**Hạn nộp:** 22:00 ngày 02/12/2026. Mục tiêu của nhóm là đóng gói và kiểm tra xong trước 21:00 cùng ngày.

---

## 9. CHECKLIST NGHIỆM THU CUỐI CÙNG (FIX THESE)

- [ ] Ba màn hình PA#2 đã được kế thừa; không có thiết kế lại không cần thiết.
- [ ] Trang chủ `/` dùng dữ liệu `GET /api/catalogue`, không còn dùng dữ liệu catalogue viết cứng làm nguồn nghiệp vụ chính.
- [ ] Ba màn hình cũ đã được tách page/component; `App.jsx` không còn là nơi chứa toàn bộ JSX của mọi màn hình.
- [ ] G1–G11 có route, quyền truy cập, API và trạng thái hoàn chỉnh theo phân công.
- [ ] `AuthContext` và `ProtectedRoute` hoạt động; quyền theo role chính xác.
- [ ] Không có nút Role Switcher/Demo Controls.
- [ ] Tất cả request dùng `/api/...`; không hardcode API absolute URL.
- [ ] Không có dead link, `href="#"` hoặc nút không có hành động.
- [ ] Validation `400`, clash `409`, authentication `401`, authorization `403` và server error được hiển thị/ xử lý hợp lý.
- [ ] Booking chỉ chuyển `Đã đặt lịch` sau khi cọc 30% confirm thành công và backend kiểm tra tài nguyên.
- [ ] Thanh toán 70% chỉ cập nhật đã trả đủ sau confirm thành công.
- [ ] Customer chỉ nhận ảnh khi đã thanh toán đủ và `finalFileLink` khác rỗng.
- [ ] Staff upload ảnh được lưu trong `previewPhotos`; Customer nhìn thấy ảnh đã upload.
- [ ] Responsive ở `360px`, `768px`, `1280px`; không có horizontal overflow hoặc chat che nội dung.
- [ ] Mỗi page có một `h1`; form control có label; focus state nhìn thấy được; không dùng màu sắc làm phương tiện duy nhất để báo trạng thái.
- [ ] W3C Validator đạt mục tiêu 0 errors; console không có lỗi runtime blocker.
- [ ] `node tools/contract-check.mjs` đạt 0 FAIL.
- [ ] `npm run lint` và `npm run build` thành công.
- [ ] `FRONTEND.md`, `brief.md`, `AI-LOG.md`, `SELF_ASSESSMENT_REPORT.md` đầy đủ và khớp với sản phẩm thực tế.
- [ ] ZIP có `.git/`, `client/dist/`, không có `node_modules/`; đã giải nén và chạy thử.

---

## 10. KẾT LUẬN PHÂN CÔNG

Nhóm tiếp tục phát triển GradStudio từ sản phẩm PA#2 hiện có. **Ba màn hình Customer Home, Admin Studio và Customer Booking là nền tảng bắt buộc phải kế thừa; không phân công thành viên làm lại chúng từ đầu.**

- **Tuấn:** kiến trúc React/API dùng chung, tách và phát triển HomePage/G1, Login/G2, Superadmin/G11, tích hợp router và E2E.
- **Phúc:** kế thừa chat và booking Customer, phát triển G3, G6-Customer, G7, G9 và Test Payment.
- **Minh:** kế thừa Studio/Admin, phát triển G4, G5, G6-Admin, G10, Staff/G8 và tài liệu/QA.

Mỗi thành viên chịu trách nhiệm phát triển nghiệp vụ được giao trên nền giao diện cũ, sử dụng API contract chung và không tự tạo kiến trúc trùng lặp. Các phần PA#2 đã hoàn thiện chỉ được sửa khi có yêu cầu rubric, lỗi kỹ thuật hoặc lý do nghiệp vụ rõ ràng.
