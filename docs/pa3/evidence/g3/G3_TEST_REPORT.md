# G3 Customer Chat & Booking Request — Browser Verification Report

## A. Environment

- **Ngày kiểm thử:** 27/11/2026.
- **Người thực hiện:** Lê Công Phúc — `23120330`.
- **OS:** Windows.
- **Browser:** Google Chrome Headless (CDP).
- **Frontend:** Vite dev server (`http://localhost:5181`) với cấu hình proxy `/api` tới Mock Server (`http://localhost:3021`).
- **Mock modes đã kiểm tra:** `normal`, `slow`, `error`, `empty`.
- **Ranh giới file tích hợp:** Quá trình kiểm thử gắn tạm `<CustomerChatSection />` vào `<section id="chat">` của `HomePage.jsx` để chạy kiểm thử thực tế trên trình duyệt, sau đó khôi phục nguyên trạng `HomePage.jsx` theo quy tắc phân tách file trong `docs/pa3/PhanCongPA3.md`.

---

## B. Test Cases

| Test Case | Mô tả | Expected | Actual | Status | Screenshot |
|---|---|---|---|---|---|
| TC-G3-01 | Chế độ Visitor chưa đăng nhập | Hiển thị hội thoại mẫu cùng banner hướng dẫn đăng nhập Customer; khóa ô nhập tin nhắn và form gửi yêu cầu; không gọi API cần quyền. | `.chat-auth-banner` hiển thị; ô nhập và nút submit đều `disabled = true`. | PASS | — |
| TC-G3-02 | Customer tải hội thoại ở chế độ `normal` | Sau khi đăng nhập `linh@gradstudio.test`, gọi `GET /api/conversations` kèm Bearer token và hiển thị tin nhắn của `conv-linh`. | Hiển thị trạng thái `Đang tư vấn`, tin nhắn mở đầu của Linh và thẻ đề xuất giờ từ dữ liệu API. | PASS | [01-g3-chat-loaded-1280.png](01-g3-chat-loaded-1280.png) |
| TC-G3-03 | Gửi tin nhắn & đồng bộ chéo với Admin Thảo không cần reload | Gửi tin nhắn qua `POST /api/conversations/conv-linh/messages` hiển thị ngay; khi Admin Thảo phản hồi từ API, bấm *Cập nhật tin nhắn* tải phản hồi mới tại chỗ. | Tin nhắn của Linh và phản hồi của Admin Thảo đều xuất hiện trong danh sách (`.msg-list` có 3 tin nhắn) không cần F5/reload trang. | PASS | [02-g3-messages-synced-1280.png](02-g3-messages-synced-1280.png) |
| TC-G3-04 | Validation từng trường phía client | Để trống loại buổi chụp hoặc nhập giờ ngoài `08:00–20:00` (`06:30`) thì hiển thị lỗi cụ thể dưới từng trường, giữ nguyên dữ liệu đã nhập. | `#req-shoot-type-error` và `#req-preferred-time-error` hiển thị đúng dưới từng trường tương ứng. | PASS | [03-g3-request-client-validation-1280.png](03-g3-request-client-validation-1280.png) |
| TC-G3-05 | Ánh xạ lỗi HTTP `400` từ API đúng vị trí input | Khi API trả `400` kèm `error.fields`, thông báo lỗi hiển thị ngay dưới trường tương ứng và gắn `aria-invalid="true"`. | Trường `#req-preferred-date` nhận `aria-invalid="true"` và hiển thị thông báo lỗi từ `error.fields.preferredDate` ngay dưới ô ngày. | PASS | [04-g3-request-api-400-field-error-1280.png](04-g3-request-api-400-field-error-1280.png) |
| TC-G3-06 | Kịch bản chuẩn hỏi lịch `24/10` lúc `09:00` nhận `409 Conflict` | Gửi `POST /api/conversations/conv-linh/request` với `09:00` hiển thị rõ lý do xung đột Mai bận `08:00–12:00` ngay tại trường giờ. | `#req-preferred-time-error` hiển thị *"Mai bận 08:00–12:00 nên không thể nhận make-up lúc 09:00."* cùng thông báo lỗi tổng quát. | PASS | [05-g3-request-0900-conflict-1280.png](05-g3-request-0900-conflict-1280.png) |
| TC-G3-07 | Gửi yêu cầu đặt lịch hợp lệ (`14:00`) nhận `201 Created` | Khung giờ khả dụng trả `201 Created`, hiển thị mã yêu cầu `req-linh` và nêu rõ chưa giữ lịch cho đến khi cọc 30% thành công. | Khối `.chat-feedback-ok` hiển thị thông tin `req-linh`, ngày `2026-10-24` lúc `14:00` và quy tắc chưa giữ chỗ. | PASS | [06-g3-request-201-created-1280.png](06-g3-request-201-created-1280.png) |
| TC-G3-08 | Responsive tại `360px`, `768px`, `1280px` | Không có thanh cuộn ngang (`scrollWidth === clientWidth`), không phần tử tràn cạnh phải, đúng `1` thẻ `<h1>`, mọi input có `<label>`, nút tại `360px` cao `>= 44px`. | Cả 3 viewport đều đạt `horizontalOverflow: false`, `h1Count: 1`, `unlabeledControls: []`, `undersizedControls: []`. | PASS | [07-g3-mobile-360.png](07-g3-mobile-360.png) |
| TC-G3-09 | Chế độ `slow` (trễ 2 giây) & khóa nút Submit | Hiển thị `LoadingState` khi tải hội thoại và khóa nút submit (`disabled = true`) trong lúc đang gửi yêu cầu đặt lịch. | Hiển thị *"Đang tải cuộc trò chuyện tư vấn với studio…"*; nút submit chuyển sang *"Đang gửi yêu cầu…"* và `disabled = true`. | PASS | [08-g3-slow-loading-1280.png](08-g3-slow-loading-1280.png) |
| TC-G3-10 | Chế độ `error` (HTTP 500) & nút Retry | Khi API lỗi 500, hiển thị `ErrorState` và nút *Thử tải lại*. | Hiển thị *"Không tải được cuộc trò chuyện với studio"*, *"Mô phỏng lỗi máy chủ."* và nút *Thử tải lại*. | PASS | [09-g3-error-state-1280.png](09-g3-error-state-1280.png) |
| TC-G3-11 | Chế độ `empty` (`items: []`) | Khi danh sách hội thoại rỗng, hiển thị `EmptyState` cùng thao tác tải lại. | Hiển thị *"Chưa có cuộc trò chuyện tư vấn"* và nút *Thử tải lại hội thoại*. | PASS | [10-g3-empty-state-1280.png](10-g3-empty-state-1280.png) |

---

## C. Summary & Build Checks

- **Tổng số test case:** 11 (`11 PASS`, `0 FAIL`).
- **API đã xác minh:** `GET /api/conversations`, `POST /api/conversations/:id/messages`, `POST /api/conversations/:id/request`.
- **`npm run lint` (`oxlint`):** `Found 0 warnings and 0 errors` (35 files).
- **`npm run build` (`vite build`):** Thành công (`client/dist/`).
- **`node tools/contract-check.mjs`:** `PASS 100% - 0 FAIL (57 examples, 24 endpoints)`.
- **Ranh giới với G6 (Ngày 5):** Hai nút *Đồng ý khung giờ này* và *Từ chối, chọn giờ khác* trên thẻ đề xuất vẫn giữ trạng thái chờ kết nối `POST /api/conversations/:id/agree` ở task Ngày 5 (G6-Customer).
