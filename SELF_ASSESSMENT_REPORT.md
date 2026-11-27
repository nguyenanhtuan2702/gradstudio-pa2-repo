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
| 5 | Hợp đồng API và mock | 15 | Chưa chấm | `docs/api/`, `mock/server.mjs`; contract-check 57 ví dụ, 24 endpoint, 0 FAIL (27/11) | Các thiếu sót mock ghi trong `FRONTEND.md` mục 7 |
| 6 | Responsive, semantic, valid | 5 | Chưa chấm | `/studio`, `/staff` (nối tạm router) tại 360/768/1280 px: không cuộn ngang, Nu Checker không báo lỗi | Kiểm tra toàn bộ route sau tích hợp, lưu ảnh minh chứng |
| 7 | Brief và rules file | 10 | Chưa chấm | `brief.md`, `docs/pa2/AGENTS.md` | Rà lại rules file cho React và hợp đồng API |
| 8 | AI-LOG.md | 10 | Chưa chấm | `AI-LOG.md`, mục `## PA#3` | Ghi tiếp các tác vụ còn lại |
| 9 | Lịch sử commit | 5 | Chưa chấm | Commit hợp đồng `docs(api): define conversation customerId...` đứng trước commit mock và commit `feat(studio)`, `feat(staff)` | Giữ nguyên thứ tự, không squash/rebase gộp |

**Tổng điểm tự đánh giá:** chưa chấm.

## Những phần chưa làm được

Xem mục `Not done` trong [FRONTEND.md](FRONTEND.md); cập nhật lại trước khi nộp.
