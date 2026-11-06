# Báo cáo kiểm tra — `booking.html`

**Dự án:** GradStudio — PA#2 Responsive Prototype  
**Trang được kiểm tra:** `booking.html` — Xem lịch và khoản cọc (Khách hàng)\
**Người phụ trách màn hình:** Đặng Hồng Minh (Thành viên C)\
**Ngày ghi nhận:** 06/11/2026  
**Phạm vi:** Responsive, nội dung, điều hướng, JavaScript-disabled, HTML và Accessibility.

## 1. Tổng quan kết quả

| Hạng mục | Kết quả | Ghi chú |
|---|---|---|
| Responsive | PASS | Đã kiểm tra tại 360px, 768px và 1280px. |
| Nội dung và trạng thái | PASS | Thể hiện booking GS-1024, ngày 24/10/2026, makeup 13:00, chụp 14:00, cọc 30% 540.000đ. |
| Điều hướng | PASS | Liên kết quay lại dịch vụ `index.html` và chuyển trang hoạt động đúng. |
| JavaScript tắt | PASS | Nội dung chính và liên kết HTML vẫn hoạt động 100%. |
| W3C Nu Checker | PASS | **0 Errors, 0 Warnings** (Đã gỡ `aria-label` trên thẻ `p.user-profile`). |
| Semantic HTML và Accessibility | PASS | Đầy đủ landmarks, đúng 1 thẻ `h1`, heading không nhảy cấp, nút bấm đạt chuẩn >= 44px. |
| Tương phản màu | PASS | Đạt ngưỡng tương phản WCAG AA tối thiểu 4.5:1. |

## 2. Responsive testing

| Viewport | Kết quả | Nội dung kiểm tra | Ảnh minh chứng |
|---:|---|---|---|
| 360px | PASS | Bố cục 1 cột dọc; khối tuần, timeline, thông tin gói cọc hiển thị rõ ràng, không tràn ngang; nút bấm độc lập cao tối thiểu 44px. | [Ảnh 360px](../screenshots/booking-360.png) |
| 768px | PASS | Bố cục tablet co giãn cân đối; lưới 7 ngày tuần 43 và chi tiết cọc hiển thị sắc nét. | [Ảnh 768px](../screenshots/booking-768.png) |
| 1280px | PASS | Bố cục 2 cột chuẩn desktop (`booking-grid`); cột trái lịch trình, cột phải thông tin booking và chi phí. | [Ảnh 1280px](../screenshots/booking-1280.png) |

Ở cả ba kích thước, `scrollWidth > clientWidth === false` và không có phần tử nào vượt cạnh phải viewport.

## 3. Nội dung và điều hướng

| Thành phần | Kết quả | Ghi chú |
|---|---|---|
| Tiêu đề trang | PASS | Đúng 1 thẻ `h1`: "Lịch chụp của tôi". |
| Lịch tuần 43 | PASS | Đánh dấu nổi bật Thứ Bảy, 24/10/2026 (`aria-current="date"`). |
| Mốc 09:00 ban đầu | PASS | Gạch ngang `<del>09:00</del>` kèm nhãn "Không khả dụng" và lý do "Mai bận 08:00–12:00". |
| Mốc đã thống nhất | PASS | Makeup với Mai 13:00–14:00; Chụp với Tuấn 14:00–16:00 (Phòng B). |
| Chi tiết cọc | PASS | Tổng 1.800.000đ; Cọc 30% 540.000đ; Còn lại 70% 1.260.000đ. |
| Nút "Thanh toán cọc 30%" | PASS | Disabled kèm ghi chú hiển thị rõ ràng tính năng chưa khả dụng trong prototype. |
| Quay lại `index.html` | PASS | Link `<a class="gs-btn gs-btn--secondary" href="index.html">Quay lại trang dịch vụ</a>`. |

## 4. Kiểm tra khi tắt JavaScript

- Toàn bộ nội dung tuần, timeline, chi tiết booking và khoản cọc hiển thị 100% khi tắt JavaScript: **PASS**.
- Nút bấm và các liên kết HTML hoạt động hoàn toàn độc lập, không dùng JavaScript: **PASS**.

## 5. W3C HTML Validator

- **Công cụ:** W3C Nu HTML Checker.
- **File kiểm tra:** `booking.html`.
- **Kết quả:** **PASS — 0 Errors, 0 Warnings**.
- **Minh chứng:** [Ảnh kết quả W3C Nu Checker](validator-booking.png)

## 6. Semantic HTML và Accessibility

| Hạng mục | Kết quả | Ghi chú |
|---|---|---|
| Ngôn ngữ và viewport | PASS | Khai báo `<html lang="vi">` và `<meta name="viewport">`. |
| Heading & Landmarks | PASS | Có 1 `h1`, các `h2` chuẩn; landmarks `<header>`, `<nav>`, `<main>`, `<footer>`. |
| Accessible name & Labels | PASS | Đã loại bỏ thuộc tính `aria-label` không hợp lệ trên thẻ `<p class="user-profile">`. |
| Bàn phím & Focus | PASS | Có skip-link `#main-content`, nút bấm nhận focus rõ ràng. |
| Tương phản màu | PASS | Nền kem `#FAF6F1`, chữ `#2B2118`, nút nâu `#8D6026` đạt chuẩn tương phản >= 4.5:1. |

## 7. Kết luận

Trang `booking.html` đạt các hạng mục kiểm tra được liệt kê trong báo cáo này. Kết luận này chỉ phản ánh các hạng mục đã kiểm tra, không thay thế điểm đánh giá theo toàn bộ rubric PA#2.

