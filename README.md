# GradStudio — PA#3 React Front End

> **Trạng thái:** PA#3 đang được phát triển. G1 tải catalogue từ API mock; G2 có đăng nhập, đăng xuất, lưu phiên và bảo vệ route theo vai trò; G11 Superadmin đã kết nối API quản lý tài khoản Admin và cài đặt hệ thống. Các luồng G3–G10 vẫn đang được hoàn thiện.

PA#3 xây dựng luồng chính GradStudio cho Visitor/Customer, Admin, Staff và Superadmin. Frontend nằm trong `client/`, dùng React + Vite, React Router và CSS thuần. API mock dùng Node.js built-in modules và dữ liệu trong `mock/`; hợp đồng API nằm trong `docs/api/`.

Tài liệu PA#2 đã được chuyển vào `docs/pa2/`. Các file HTML tĩnh ở thư mục gốc là prototype PA#2; điểm chạy ứng dụng PA#3 là `client/`, không phải `index.html` ở thư mục gốc.

## Yêu cầu

- Node.js **20.19 trở lên** hoặc **22.12 trở lên** để chạy Vite hiện tại.
- npm đi kèm Node.js.
- Không cần cài package cho mock server; frontend cài dependency bằng `npm ci` trong `client/`.

## Chạy ứng dụng

### 1. Cài dependency frontend

Từ thư mục gốc repository:

```powershell
Set-Location client
npm ci
```

### 2. Khởi động API mock

Mở terminal PowerShell thứ nhất tại thư mục gốc:

```powershell
node mock/server.mjs
```

Mặc định mock chạy tại `http://localhost:3001`. Mock giữ thay đổi trong bộ nhớ; khởi động lại server sẽ nạp lại dữ liệu ban đầu từ `mock/data/`.

### 3. Khởi động frontend

Mở terminal thứ hai tại thư mục gốc:

```powershell
Set-Location client
npm run dev
```

Mở địa chỉ local do Vite in ra trong terminal. Cấu hình Vite chuyển tiếp `/api/...` tới mock trên cổng `3001` ở cả chế độ phát triển và xem bản build. Frontend cần gọi API bằng đường dẫn tương đối `/api/...`.

## Chế độ mock

Đặt `MOCK_MODE` trước khi khởi động server. Dừng server hiện tại bằng `Ctrl+C` trước khi đổi chế độ.

```powershell
$env:MOCK_MODE = 'normal' # normal, slow, error hoặc empty
node mock/server.mjs
```

- `normal`: phản hồi sau khoảng 150 ms.
- `slow`: phản hồi sau khoảng 2 giây.
- `error`: trả HTTP 500, ngoại trừ đăng nhập.
- `empty`: các dữ liệu dạng danh sách trả về rỗng.

Có thể đổi cổng bằng `$env:PORT = '3002'` trước khi chạy mock. Nếu đổi cổng, cần đồng bộ proxy của Vite trước khi dùng frontend.

## Build và xem bản build

Để tạo `client/dist/` và chạy thử bản build, giữ mock hoạt động rồi chạy trong terminal:

```powershell
Set-Location client
npm run build
npx vite preview
```

`vite preview` cũng chuyển tiếp `/api` theo cấu hình trong `client/vite.config.js`. Sau thay đổi mã nguồn cuối cùng, cần build lại để cập nhật `client/dist/`.

## Kiểm tra hợp đồng API

Khởi động mới mock ở chế độ `normal`, sau đó mở terminal khác tại thư mục gốc và chạy:

```powershell
node tools/contract-check.mjs
```

Công cụ gửi các ví dụ trong `docs/api/` tới mock đang chạy tại `http://localhost:3001`. Các ví dụ có thể thay đổi trạng thái mock, vì vậy phải khởi động lại mock trước mỗi lượt kiểm tra đầy đủ. Có thể dùng `--base http://localhost:<cổng>` nếu mock chạy ở cổng khác.

## Route hiện có

Các route dưới đây hiện được khai báo trong `client/src/App.jsx`. Những route có trạng thái chờ triển khai được bảo vệ theo vai trò nhưng chưa có nghiệp vụ PA#3.

| Route | Vai trò | Trạng thái |
|---|---|---|
| `/` | Visitor/Customer | G1 tải catalogue từ API; chat G3/G6 chưa tích hợp. |
| `/login` | Tất cả vai trò | G2 đăng nhập/đăng xuất và chuyển đến trang theo vai trò. |
| `/studio` | Admin | Trang chờ tích hợp G4–G6 và G10. |
| `/bookings/GS-1024` | Customer | Trang chờ tích hợp G7/G9. |
| `/staff` | Staff | Trang chờ tích hợp G8. |
| `/superadmin` | Superadmin | G11 đã triển khai: xem/tạo tài khoản Admin và xem/cập nhật cài đặt hệ thống qua API mock. |

Route `/payments/test/:id` chưa được triển khai; đây là trang mục tiêu cho luồng thanh toán thử nghiệm G7/G9.

## Tài khoản và dữ liệu demo

Các tài khoản dưới đây được khai báo cho mock và ví dụ hợp đồng API; G2 dùng các tài khoản này để đăng nhập.

| Tên trong ví dụ | Vai trò | Email | Mật khẩu |
|---|---|---|---|
| `linh` | Customer | `linh@gradstudio.test` | `linh-demo` |
| `thao` | Admin | `thao@gradstudio.test` | `thao-demo` |
| `mai` | Staff — Makeup | `mai@gradstudio.test` | `mai-demo` |
| `tuan` | Staff — Nhiếp ảnh | `tuan@gradstudio.test` | `tuan-demo` |
| `superadmin` | Superadmin | `superadmin@gradstudio.test` | `superadmin-demo` |

Câu chuyện dữ liệu mẫu dùng xuyên suốt: Linh hỏi lịch chụp tốt nghiệp ngày 24/10/2026 lúc 09:00; Mai bận 08:00–12:00; lịch thay thế là makeup 13:00–14:00 với Mai và chụp 14:00–16:00 với Tuấn tại Phòng B. Booking `GS-1024` dùng gói Tốt nghiệp Premium, tổng giá 1.800.000đ, cọc 540.000đ và còn lại 1.260.000đ. Chỉ xác nhận đặt lịch sau khi thanh toán cọc thành công và kiểm tra lại tài nguyên.

## Cấu trúc repository

| Đường dẫn | Nội dung |
|---|---|
| `client/` | Mã nguồn React/Vite và bản build tạo tại `client/dist/`. |
| `client/public/assets/images/` | Nguồn ảnh dùng chung; PA#2 và các milestone React kế tiếp dùng cùng bộ ảnh. |
| `mock/server.mjs`, `mock/data/` | API mock và dữ liệu demo. |
| `docs/api/` | Hợp đồng endpoint, request/response và ví dụ kiểm tra. |
| `docs/pa3/` | Brief, rubric, tài liệu nghiệm thu và hồ sơ PA#3 (xem `docs/pa3/README.md`). |
| `docs/pa2/` | Tài liệu và báo cáo của PA#2. |
| `tools/contract-check.mjs` | Công cụ chạy ví dụ API trong hợp đồng trên mock. |
| `FRONTEND.md` | Thành viên, hướng dẫn, tài khoản demo, route mục tiêu, thư viện và phần chưa làm. |
| `docs/pa3/PhanCongPA3.md` | Phân công và lịch triển khai PA#3. |
| `docs/pa3/ThongNhatKyThuatPA3.md` | Quyết định kỹ thuật và quy ước API đã thống nhất. |

## Nguyên tắc phát triển PA#3

1. Hoàn thiện và commit hợp đồng `docs/api/` trước thay đổi tương ứng ở `mock/`; chỉ phát triển frontend gọi API sau khi mock được cập nhật và kiểm tra.
2. Chỉ gọi endpoint đã có trong hợp đồng; dùng đường dẫn tương đối `/api/...` trong frontend.
3. Dùng Node.js built-in modules cho mock; không thêm backend hoặc dependency không cần thiết.
4. Xử lý đủ trạng thái tải, lỗi có thể thử lại và danh sách rỗng trên các màn hình lấy dữ liệu.
5. Booking chỉ được giữ sau xác nhận cọc thành công và kiểm tra tài nguyên. Không trình bày dữ liệu demo như giao dịch hoặc đồng bộ thật.
6. Không thêm nút đổi vai trò hoặc điều khiển giả lập demo; đổi vai trò bằng đăng xuất rồi đăng nhập bằng tài khoản demo tương ứng.

## Tài liệu liên quan

- [Hướng dẫn frontend và bảng route](FRONTEND.md)
- [Hồ sơ và tài liệu PA#3](docs/pa3/README.md)
- [Phân công PA#3](docs/pa3/PhanCongPA3.md)
- [Thống nhất kỹ thuật PA#3](docs/pa3/ThongNhatKyThuatPA3.md)
- [Hợp đồng API](docs/api/README.md)
- [Brief final project](docs/pa3/GradStudio-final-project-brief.pdf)
- [Rubric PA#3](docs/pa3/PA3-rubric-react-front-end.pdf)
- [Tài liệu PA#2](docs/pa2/README.md)
