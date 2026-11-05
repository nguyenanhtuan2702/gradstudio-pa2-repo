# M3 Manual Testing – page3.html (Lịch chụp & Thông tin cọc)

## Responsive Testing (Pass all)
- 360px: [ev1](../screenshots/page3-360.png) – Layout 1 cột dọc hoàn chỉnh, nút bấm đạt chuẩn >= 44px, không tràn ngang (`scrollWidth === clientWidth === 360`).
- 768px: [ev1](../screenshots/page3-768.png) – Layout tablet cân đối, khối timeline và thông tin cọc co giãn mượt mà (`scrollWidth === clientWidth === 768`).
- 1280px: [ev1](../screenshots/page3-1280.png) – Bố cục 2 cột chuẩn desktop như bản thiết kế PA#1 (`scrollWidth === clientWidth === 1280`).

## Navigation Testing
- Logo "GradStudio" → `index.html`: PASS
- Menu "Dịch vụ" → `index.html`: PASS
- Menu "Lịch chụp của tôi" (`aria-current="page"`): PASS
- Điều hướng vai trò demo:
  - "Màn 1" → `index.html`: PASS
  - "Màn 2" → `page2.html`: PASS
  - "Màn 3" → `page3.html`: PASS
  - Nút "Đặt lại demo": PASS

## JavaScript Disabled
- Nội dung trang vẫn hiển thị 100%: PASS (Toàn bộ lịch tuần, timeline, thông tin gói cọc và bản đồ minh họa đều dùng Plain HTML/CSS, không phụ thuộc JS).
- Liên kết chính và điều hướng vẫn hoạt động bình thường: PASS
- Không xuất hiện bất kỳ khoảng trắng, lỗi render hay mất thông tin khi tắt JS: PASS

## W3C HTML Nu Checker (PASS)
- Kết quả: **0 Errors, 0 Warnings**
- Đã khắc phục triệt để:
  1. Loại bỏ `aria-label` trên thẻ generic `div.user-profile` (thông tin tên và avatar đã có text/alt đầy đủ).
  2. Bỏ `aria-label` trên generic `div.booking-pricing-box`.
  3. Chuyển cấu trúc tab bộ lọc sang `role="group"` với action buttons chuẩn, loại bỏ cảnh báo thiếu `role="tabpanel"` của `role="tab"`.
- Minh chứng: [validator-page3.png](../screenshots/validator-page3.png)

## Accessibility & Semantic Check (PASS)
- Landmarks đầy đủ: `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`.
- Cấp bậc tiêu đề chuẩn: Duy nhất 1 thẻ `<h1>` ("Lịch chụp của tôi"), các thẻ `<h2>`, `<h3>` phân cấp rõ ràng, không nhảy cóc.
- Tương phản màu sắc: Body text đạt chuẩn tối thiểu 4.5:1.
- Typography: Font chữ có dấu tiếng Việt hiển thị mượt mà trên mọi hệ điều hành.

