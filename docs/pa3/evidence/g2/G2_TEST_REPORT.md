# G2 Authentication — Automated Browser Test Report

## A. Environment

- **OS:** Windows.
- **Browser:** Integrated VS Code browser, Chrome 150.0.7871.250 (Electron 43.8.9).
- **Automation:** Playwright-based integrated browser tool. Its exact Playwright package version is not exposed.
- **Frontend:** `http://127.0.0.1:5174`.
- **Mock Server:** `http://127.0.0.1:3002`, mode `normal`.
- **API proxy:** The temporary Vite test server proxied `/api` to port 3002. The repository Vite config was not changed.
- **Port note:** Ports 3001 and 5173 were already occupied. The API on 3001 returned empty catalogue data, so it was not used; its process was left untouched. A fresh mock server was started on 3002 and verified to return catalogue data (HTTP 200).
- **Demo accounts:** Read from `FRONTEND.md` and `mock/data/accounts.json`. Each account test started with a cleared `gradstudio.session` and a reloaded page.

## B. Test Cases

| Test Case | Mô tả | Expected | Actual | Status | Screenshot |
|---|---|---|---|---|---|
| TC-G2-01 | Trang Login | Có heading, email, password và nút submit. | Các thành phần hiển thị đúng; email là `type=email`, mật khẩu là `type=password`. | PASS | [01-login-page.png](01-login-page.png) |
| TC-G2-02 | Validation form rỗng | Báo lỗi cho email/password; không gọi API login. | Hiển thị cả hai lỗi bắt buộc; số request login là 0. | PASS | [02-login-validation.png](02-login-validation.png) |
| TC-G2-03 | Sai mật khẩu | API trả 401; hiện lỗi; không tạo session hoặc điều hướng nội bộ. | HTTP 401; thông báo lỗi xuất hiện; không có session; vẫn ở `/login`. | PASS | [03-invalid-credentials.png](03-invalid-credentials.png) |
| TC-G2-04 | Customer Linh | Role `customer`, route `/`, header đúng user. | Đến `/`; header và session đúng Nguyễn Thùy Linh / `customer`. | PASS | [04-customer-login.png](04-customer-login.png) |
| TC-G2-05 | Admin Thảo | Role `admin`, route `/studio`. | Đến `/studio`; header và session đúng Thảo / `admin`. | PASS | [05-admin-login.png](05-admin-login.png) |
| TC-G2-06 | Staff Mai | Role `staff`, route `/staff`, không lẫn user khác. | Đến `/staff`; header và session đúng Mai / `staff`. | PASS | [06-staff-mai-login.png](06-staff-mai-login.png) |
| TC-G2-07 | Staff Tuấn | Role `staff`, route `/staff`, không lẫn Mai. | Đến `/staff`; header và session đúng Tuấn / `staff`, độc lập với phiên Mai. | PASS | [07-staff-tuan-login.png](07-staff-tuan-login.png) |
| TC-G2-08 | Superadmin | Role `superadmin`, route `/superadmin`. | Đến `/superadmin`; header và session đúng Superadmin / `superadmin`. | PASS | [08-superadmin-login.png](08-superadmin-login.png) |
| TC-G2-09 | ProtectedRoute khi chưa đăng nhập | Các route được bảo vệ chuyển về Login. | `/studio`, `/bookings/GS-1024`, `/staff`, `/superadmin` đều chuyển về `/login`. | PASS | [09-protected-route-unauthenticated.png](09-protected-route-unauthenticated.png) |
| TC-G2-10 | ProtectedRoute sai role | Chặn 4 truy cập chéo role theo `roles.js` và `ProtectedRoute.jsx`. | Customer `/studio` → `/`; Staff `/studio` → `/staff`; Admin `/superadmin` → `/studio`; Superadmin `/staff` → `/superadmin`. | PASS | [10-protected-route-wrong-role.png](10-protected-route-wrong-role.png) |
| TC-G2-11 | Session sau refresh | Admin vẫn đăng nhập và vào được route hợp lệ sau reload. | Role `admin` còn trong session trước/sau `page.reload()`; vẫn ở `/studio`. | PASS | [11-session-after-refresh.png](11-session-after-refresh.png) |
| TC-G2-12 | Logout | Xóa session, chặn route bảo vệ và thu hồi token cũ. | Nút Logout đưa về trạng thái guest; `gradstudio.session` bị xóa; `/studio` chuyển `/login`; token cũ gọi `GET /api/bookings` nhận 401. | PASS | [12-logout.png](12-logout.png) |

## C. Summary

- **Tổng số test:** 12
- **PASS:** 12
- **FAIL:** 0
- **BLOCKED:** 0
- **Lỗi ứng dụng phát hiện:** Không có trong phạm vi các kịch bản G2 đã chạy.
- **Lỗi đã xử lý:** Lượt chạy nháp đầu tiên có assertion của test harness so sánh role code với nhãn tiếng Việt, tạo kết quả âm tính giả. Đã sửa assertion trong harness và chạy lại toàn bộ; không cần sửa ứng dụng.
- **Phần chưa thể tự động kiểm thử:** Không có kịch bản G2 nào bị blocked. Browser tool không công bố phiên bản chính xác của package Playwright; không ghi nhận phiên bản suy đoán.

## D. Authentication Summary

- **Login:** 5/5 tài khoản demo đăng nhập đúng với 4 role (`customer`, `admin`, `staff`, `superadmin`); hai tài khoản Staff được kiểm tra ở các phiên riêng.
- **Session persistence:** Session Admin tồn tại sau reload và tiếp tục truy cập được `/studio`.
- **Protected routes:** Đã thử toàn bộ route bảo vệ trong `App.jsx` khi chưa đăng nhập và 4 trường hợp truy cập sai role.
- **Logout:** Session storage bị xóa; route bảo vệ chuyển về Login.
- **Token revocation:** Token cũ sau logout gọi protected API nhận HTTP 401. Token không được ghi vào báo cáo hoặc ảnh.
- **Source/config:** Không thay đổi source code hoặc cấu hình dự án; không tạo commit.
