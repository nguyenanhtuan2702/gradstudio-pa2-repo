# Báo cáo tự đánh giá — PA#3 Front End in React

> **Bản nháp ngày 27/11/2026.** Ứng dụng chưa hoàn tất nên nhóm chưa tự chấm. Điền điểm sau khi tích hợp và kiểm thử toàn bộ G1–G11; tổng điểm phải khớp tên file ZIP.

## Thông tin nhóm

- 23120184 — Nguyễn Anh Tuấn
- 23120330 — Lê Công Phúc
- 24120090 — Đặng Hồng Minh

## Bảng tự đánh giá

| # | Tiêu chí | Tối đa | Tự chấm | Minh chứng hiện có | Còn thiếu |
|---|---|---:|---:|---|---|
| 1 | Toàn bộ luồng chính bằng React | 25 | Chưa chấm | G1: `pages/HomePage.jsx`; G2: `pages/LoginPage.jsx`; G4–G6, G10: `pages/StudioPage.jsx`; G8: `pages/StaffPage.jsx` | Nối router cho Studio/Staff; G3, G6-Customer, G7, G9, G11 |
| 2 | Routing, đăng nhập, state dùng chung | 10 | Chưa chấm | `auth/AuthContext.jsx`, `auth/ProtectedRoute.jsx`, `docs/pa3/evidence/g2/G2_TEST_REPORT.md` | Route Test Payment; kiểm thử lại sau tích hợp |
| 3 | Dữ liệu từ API, loading/lỗi/rỗng | 10 | Chưa chấm | `hooks/useResource.js`, `components/AsyncStates.jsx`, `components/workspace/` | Token mock mất khi khởi động lại; `empty` chưa làm rỗng danh sách trong một booking |
| 4 | Form | 10 | Chưa chấm | `components/workspace/useSubmitForm.js`; `components/staff/previewFile.js`; `pages/LoginPage.jsx` | Form của Customer và Superadmin |
| 5 | Hợp đồng API và mock | 15 | Chưa chấm | `docs/api/`, `mock/server.mjs`; contract-check 57 ví dụ, 24 endpoint, 0 FAIL (nền `43be296`) | Các thiếu sót mock ghi trong `FRONTEND.md` mục 7 |
| 6 | Responsive, semantic, valid | 5 | Chưa chấm | `/studio`, `/staff` (nối tạm router) tại 360/768/1280 px: không cuộn ngang, Nu Checker không báo lỗi | Kiểm tra toàn bộ route sau tích hợp, lưu ảnh minh chứng |
| 7 | Brief và rules file | 10 | Chưa chấm | `brief.md`, `docs/pa2/AGENTS.md` | Rà lại rules file cho React và hợp đồng API |
| 8 | AI-LOG.md | 10 | Chưa chấm | `AI-LOG.md`, mục `## PA#3` | Ghi tiếp các tác vụ còn lại |
| 9 | Lịch sử commit | 5 | Chưa chấm | Commit hợp đồng `docs(api): define conversation customerId...` đứng trước commit mock và commit `feat(studio)`, `feat(staff)` | Giữ nguyên thứ tự, không squash/rebase gộp |

**Tổng điểm tự đánh giá:** chưa chấm.

## Kiểm thử hồi quy G5/G6 (Admin)/G8/G10 — 27/11/2026

Kiểm thử trên `main` tại `43be296` với bản sửa vòng đời upload G8 và điều kiện lưu link G10. Contract check và lượt hồi quy dùng các phiên mock riêng. Lượt hồi quy kiểm tra 68 phản hồi HTTP, cùng các thao tác Chromium và hai kịch bản upload đang gửi.

| Phần | Kịch bản đã chạy | Kết quả |
|---|---|---|
| G5 | Ngày 24/10 kiểm tra Mai lúc `10:00`, khung `10:00–11:00` và khung `07:30–08:30` bắt đầu trước giờ bận | Báo Mai bận `08:00–12:00` và gợi ý lịch trống. Khung kết thúc lúc `08:00` hoặc bắt đầu lúc `12:00` không trùng. Cùng giờ nhưng khác ngày, khác nhân sự cũng được kiểm tra. |
| G6 (Admin) | Gửi đề xuất make-up `12:30–13:30`, chụp `15:00–17:00`, Phòng C. Tạo booking trước và sau khi khách đồng ý | Trước khi đồng ý hoặc gửi sai phòng, API trả `409`. Đề xuất được đồng ý tạo `GS-1024` với đúng giờ và Phòng C, trạng thái `Chờ cọc 30%`. Cọc thất bại vẫn để lịch trống. Cọc thành công giữ chỗ, tạo nhắc lịch và kích hoạt các job theo giờ đã chốt. |
| G6 (xác nhận cọc đồng thời) | Dùng bản sao dữ liệu mock với hai hội thoại, tạo hai booking chờ cọc cho cùng khung giờ và xác nhận cọc đồng thời | Một lượt trả `200`, lượt kia trả `409` và vẫn chờ cọc. Booking còn lại xác nhận cọc được sau khi chuyển sang ngày trống. |
| G10 | Kiểm tra phòng trùng và nhân sự trùng độc lập. Đổi giờ make-up sang `07:30–08:30`, đổi riêng ngày vào ngày đã có booking trùng, rồi đổi giờ chụp trong lịch của chính booking | Kiểm tra tư vấn trả lý do theo tài nguyên. Hai lần đổi lịch xung đột trả `409`. Đổi giờ chụp không tự xung đột và giờ mới xuất hiện trong job của Tuấn. |
| G8 (upload hợp lệ) | Tải JPEG và PNG thật lên sau khi cọc. Lấy metadata qua API booking của khách rồi mở URL trực tiếp và qua Vite dev/preview | Upload trả `201`. URL trả `200`, đúng MIME và đúng byte ảnh trên cả ba đường dẫn. URL ảnh chưa tồn tại trả `404`. |
| G8 (vòng đời booking) | Gửi ảnh hợp lệ khi chưa cọc, sau khi hủy và sau khi khách nhận ảnh để chuyển booking sang `Hoàn thành`. Thử hủy hoặc hoàn thành trong lúc request multipart còn đang gửi. | Các lượt này trả `409`. `previewPhotos` giữ nguyên khi upload bị chặn. Ảnh đã tải trước đó vẫn mở được sau khi hoàn thành. |
| G10 (link ảnh hoàn thiện) | Mở Studio trong Chromium khi booking chờ cọc, đã cọc và sau khi thanh toán phần còn lại thất bại hoặc thành công. Kiểm tra thêm booking đã hủy. | Trước khi trả đủ, UI chỉ hiện hướng dẫn và không có nút lưu. API vẫn trả `409` nếu gọi PATCH trực tiếp trước khi đủ tiền. Sau khi trả đủ và số dư bằng 0, biểu mẫu xuất hiện, PATCH từ UI trả `200` và link đã lưu hiển thị. Booking đã hủy không có biểu mẫu. |
| Kiểm tra chung | `npm run lint`, `npm run build` trong `client/`, `node tools/contract-check.mjs --strict-values` tại thư mục gốc | Đạt. Contract check có 57 ví dụ, 24 endpoint, 0 FAIL. |

Kiểm thử Chromium chạy trên `StudioPage` qua một điểm vào tạm thời. Kiểm thử router của ứng dụng và toàn bộ luồng G1–G11 vẫn cần bổ sung trước khi chốt điểm.

## Những phần chưa làm được

Xem mục `Not done` trong [FRONTEND.md](FRONTEND.md); cập nhật lại trước khi nộp.
