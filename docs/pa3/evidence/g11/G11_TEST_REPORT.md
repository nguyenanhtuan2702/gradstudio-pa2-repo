# G11 Superadmin — Test Report

**Ngày kiểm thử:** 27/11/2026
**Phạm vi:** G11 Superadmin và regression G2 authentication/role protection.
**Môi trường:** Windows, browser tích hợp Codex, frontend Vite tại `127.0.0.1:5173`, mock API tại `localhost:3001`.

## G11 — Superadmin

| ID | Kiểm tra | Kết quả |
|---|---|---|
| G11-01 | Đăng nhập bằng Superadmin; mở `/superadmin`; tải danh sách Admin và cấu hình hệ thống từ API. | **PASS** — hiển thị tài khoản hiện có và các giá trị cấu hình mặc định. |
| G11-02 | Gửi form tạo Admin rỗng. | **PASS** — hiện lỗi tại họ tên, email và mật khẩu; không gửi form hợp lệ. |
| G11-03 | Tạo Admin mới qua giao diện. | **PASS** — tài khoản mới xuất hiện trong danh sách, form được xóa và báo thành công. |
| G11-04 | Tạo trùng email. | **PASS** — API trả `409`; thông báo lỗi hiển thị và các giá trị đã nhập được giữ lại. |
| G11-05 | Bấm đúp nút tạo tài khoản. | **PASS** — mock log ghi nhận một lần tạo thành công cho thao tác bấm đúp; danh sách chỉ có một tài khoản mới tương ứng. |
| G11-06 | Cập nhật giờ mở/đóng cửa và thời gian nhắc lịch. | **PASS** — lưu qua `PUT /api/admin/settings`; phản hồi được hiển thị lại với giá trị `10:00`, `18:00`, `6`. |
| G11-07 | Validation cài đặt sai định dạng/range. | **PASS** — giao diện báo lỗi giá trị nhắc lịch không hợp lệ; API trả `400` với các lỗi trường cho giờ sai định dạng và số giờ không hợp lệ. |
| G11-08 | Mock mode `slow`. | **PASS** — trạng thái đang tải xuất hiện cho danh sách và cài đặt, sau đó được thay bằng dữ liệu khi request hoàn tất. |
| G11-09 | Mock mode `error` và nút thử lại. | **PASS** — lỗi `500` được hiển thị riêng cho hai khu vực; thử lại gọi lại API và giữ thông báo lỗi khi máy chủ tiếp tục lỗi. |
| G11-10 | Mock mode `empty`. | **PASS** — danh sách Admin rỗng hiển thị EmptyState; form và cài đặt vẫn dùng được. |
| G11-11 | Phân quyền API và route. | **PASS** — thiếu token trả `401`; Customer, Admin và Staff bị API từ chối `403`; trên trình duyệt, Customer/Admin/Staff không vào được `/superadmin`, Superadmin vào được. |
| G11-12 | Mã ID Admin khi tạo nhiều tài khoản. | **PASS** — hai tài khoản API liên tiếp nhận ID `u-admin-2` và `u-admin-3`, không trùng nhau. |

**409 cho cập nhật settings:** contract/mock hiện chưa có dữ liệu hoặc điều kiện nghiệp vụ để phát sinh xung đột khi gọi `PUT /api/admin/settings`. UI có xử lý nhánh `409` và giữ dữ liệu đã nhập, nhưng không tự thêm quy tắc mock chỉ để tạo kết quả kiểm thử; nhánh này chưa được kích hoạt qua API.

## Regression G2 — Authentication

- Báo cáo browser regression hiện có: [G2_TEST_REPORT.md](../g2/G2_TEST_REPORT.md) — **12/12 PASS**.
- Kiểm tra API trong lượt này cho cả 5 tài khoản demo thuộc 4 role: login thành công, logout thành công, token cũ gọi API cần đăng nhập nhận `401`.
- Đã kiểm tra điều hướng sai role tới `/superadmin` với Customer, Admin và Staff; các route hiện có và `ProtectedRoute` không bị sửa.

## Kiểm tra repository

| Lệnh | Kết quả |
|---|---|
| `npm run lint` trong `client/` | **PASS** |
| `npm run build` trong `client/` | **PASS** |
| `node --check mock/server.mjs` | **PASS** |
| `node tools/contract-check.mjs` | **PASS** — 57 ví dụ, 24 endpoint, 0 lỗi |
| `git diff --check` | **PASS** — không có lỗi whitespace |

## Ghi chú bằng chứng

Giao diện đã được mở và kiểm tra trực tiếp trong browser. Công cụ browser trả ảnh chụp để xem trong phiên làm việc nhưng không cung cấp đường dẫn tệp ảnh để ghi vào repository; vì vậy báo cáo này không dẫn tới ảnh screenshot riêng. Không có thay đổi AuthContext/ProtectedRoute và không tạo commit.
