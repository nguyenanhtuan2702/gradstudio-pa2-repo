# G11 Superadmin — Test Report

**Ngày kiểm thử:** 27/11/2026
**Phạm vi:** G11 Superadmin và regression G2 authentication/role protection.
**Môi trường:** Windows, Playwright 1.65.1 + Chromium, viewport 1440 × 1000; frontend Vite tại `127.0.0.1:5173`, mock API tại `localhost:3001`.

## G11 — Superadmin

| ID | Kiểm tra | Kết quả |
|---|---|---|
| G11-01 | Đăng nhập bằng Superadmin; mở `/superadmin`; tải danh sách Admin và cấu hình hệ thống từ API. | **PASS** — dữ liệu API hiển thị; ảnh [dashboard](01-superadmin-dashboard.png), [danh sách Admin](02-admin-account-list.png), [cài đặt hệ thống](06-system-settings.png). |
| G11-02 | Gửi form tạo Admin rỗng. | **PASS** — hiện lỗi tại họ tên, email và mật khẩu; ảnh [validation](05-admin-form-validation.png). |
| G11-03 | Tạo Admin mới qua giao diện. | **PASS** — API trả `201`, tài khoản mới xuất hiện trong danh sách, form được xóa và báo thành công; ảnh [tạo Admin thành công](03-create-admin-success.png). |
| G11-04 | Tạo trùng email. | **PASS** — API trả `409`, thông báo lỗi hiển thị và dữ liệu đã nhập được giữ lại; ảnh [email trùng](04-create-admin-duplicate.png). |
| G11-05 | Bấm đúp nút tạo tài khoản. | **PASS** — mock log ghi nhận một lần tạo thành công cho thao tác bấm đúp; danh sách chỉ có một tài khoản mới tương ứng. |
| G11-06 | Cập nhật giờ mở/đóng cửa và thời gian nhắc lịch. | **PASS** — `PUT /api/admin/settings` trả `200`; giá trị `10:00`, `18:00`, `6` được hiển thị; ảnh [cập nhật thành công](07-settings-update-success.png). |
| G11-07 | Validation cài đặt sai định dạng/range. | **PASS** — giao diện báo lỗi giá trị nhắc lịch không hợp lệ; API trả `400` với các lỗi trường cho giờ sai định dạng và số giờ không hợp lệ. |
| G11-08 | Mock mode `slow`. | **PASS** — trạng thái Loading của cả danh sách và cài đặt được chụp khi hai request còn pending; ảnh [slow loading](08-superadmin-slow-loading.png). |
| G11-09 | Mock mode `error`. | **PASS** — API trả `500` cho hai khu vực và từng khu vực hiển thị trạng thái lỗi; ảnh [error state](09-superadmin-error-state.png). |
| G11-10 | Mock mode `empty`. | **PASS** — API trả danh sách rỗng, EmptyState hiển thị và cài đặt vẫn tải; ảnh [empty state](10-superadmin-empty-state.png). |
| G11-11 | Phân quyền API và route. | **PASS** — thiếu token trả `401`; Customer, Admin và Staff bị API từ chối `403`; trên trình duyệt, Customer/Admin/Staff không vào được `/superadmin`, Superadmin vào được. |
| G11-12 | Mã ID Admin khi tạo nhiều tài khoản. | **PASS** — hai tài khoản API liên tiếp nhận ID `u-admin-2` và `u-admin-3`, không trùng nhau. |

## Screenshot evidence

| Test case | Ảnh | Kích thước |
|---|---|---|
| G11-01 | [01-superadmin-dashboard.png](01-superadmin-dashboard.png) | 1440 × 1183 |
| G11-01 | [02-admin-account-list.png](02-admin-account-list.png) | 612 × 698 |
| G11-03 | [03-create-admin-success.png](03-create-admin-success.png) | 1440 × 1395 |
| G11-04 | [04-create-admin-duplicate.png](04-create-admin-duplicate.png) | 1440 × 1395 |
| G11-02 | [05-admin-form-validation.png](05-admin-form-validation.png) | 1440 × 1409 |
| G11-01 | [06-system-settings.png](06-system-settings.png) | 501 × 494 |
| G11-06 | [07-settings-update-success.png](07-settings-update-success.png) | 1440 × 1330 |
| G11-08 | [08-superadmin-slow-loading.png](08-superadmin-slow-loading.png) | 1440 × 1160 |
| G11-09 | [09-superadmin-error-state.png](09-superadmin-error-state.png) | 1440 × 1222 |
| G11-10 | [10-superadmin-empty-state.png](10-superadmin-empty-state.png) | 1440 × 1166 |

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

Đã tạo 10 ảnh PNG trong thư mục này; tất cả có chữ ký PNG hợp lệ và nội dung được kiểm tra trực quan. Ảnh toàn trang dùng viewport 1440 × 1000; ảnh danh sách Admin và cài đặt là ảnh crop vùng tương ứng. Các request tạo Admin, trùng email và cập nhật settings lần lượt trả `201`, `409`, `200`; mock mode `error` trả `500` cho cả hai tài nguyên. Không có Bearer token hoặc mật khẩu hiển thị trong ảnh (trường mật khẩu ở ảnh lỗi trùng được che). Admin thử nghiệm và thay đổi settings chỉ tồn tại trong bộ nhớ của mock server; `mock/data/admin.json` không bị sửa. Mock được khôi phục về `normal` sau khi chụp.

Lượt chụp này thực hiện lại các trạng thái G11-01, G11-02, G11-03, G11-04, G11-06, G11-08, G11-09 và G11-10. Các dòng khác giữ kết quả từ lần kiểm thử đã ghi trước đó. Không có thay đổi AuthContext/ProtectedRoute và không tạo commit.
