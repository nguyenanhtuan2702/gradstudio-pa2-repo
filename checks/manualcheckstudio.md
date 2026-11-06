# Báo cáo kiểm tra M2 — `studio.html`

**Dự án:** GradStudio — PA#2 Responsive Prototype  
**Màn hình:** Screen 2 — Tư vấn và xử lý trùng lịch (Admin)  
**Ngày ghi nhận:** 06/11/2026  
**Phạm vi:** Responsive, nội dung, điều hướng, JavaScript-disabled, HTML và Accessibility.

## 1. Tổng quan kết quả

| Hạng mục | Kết quả | Ghi chú |
|---|---|---|
| Responsive | PASS | Đã kiểm tra tại 360px, 768px và 1280px. |
| Nội dung và trạng thái | PASS | Hội thoại, xung đột lịch, giờ đề xuất và form booking phù hợp với luồng M2. |
| Điều hướng | PASS | Các liên kết trong luồng mở đúng trang đích. |
| JavaScript tắt | PASS | Nội dung chính và liên kết HTML vẫn sử dụng được. |
| W3C Nu Checker | PASS | Không có lỗi hoặc cảnh báo trong kết quả hiện có. |
| Semantic HTML và Accessibility | PASS | Đã rà soát cấu trúc, label, tên truy cập và trạng thái điều khiển. |
| Tương phản màu | PASS | Đạt ngưỡng tương phản yêu cầu của dự án. |

## 2. Responsive testing

| Viewport | Kết quả | Nội dung kiểm tra | Ảnh minh chứng |
|---:|---|---|---|
| 360px | PASS | Bố cục một cột; danh sách, chat, form và lịch tài nguyên đọc được khi cuộn; không tràn ngang; nút/link độc lập cao tối thiểu 44px. | [Ảnh 360px](../screenshots/studio-360.png) |
| 768px | PASS | Bố cục tablet một/hai cột phù hợp; không ép thành ba cột desktop hoặc làm cắt nội dung. | [Ảnh 768px](../screenshots/studio-768.png) |
| 1280px | PASS | Ba khu vực chính hiển thị đầy đủ; chat và form cùng nằm trong luồng trang; lịch tài nguyên đọc được. | [Ảnh 1280px](../screenshots/studio-1280.png) |

Ở cả ba kích thước, nội dung dài trong hội thoại và thông tin tài nguyên xuống dòng; không có phần tử vượt cạnh phải viewport.

## 3. Nội dung và điều hướng

| Thành phần | Kết quả | Ghi chú |
|---|---|---|
| Hội thoại với Nguyễn Thùy Linh | PASS | Thể hiện yêu cầu ban đầu lúc 09:00 và câu Linh đồng ý giờ mới. |
| Xung đột lịch | PASS | Nêu rõ Mai bận 08:00–12:00 nên không nhận yêu cầu 09:00. |
| Giờ đề xuất | PASS | Makeup với Mai 13:00–14:00; chụp với Tuấn tại Phòng B 14:00–16:00 ngày 24/10/2026. |
| Thông tin booking | PASS | Gói Tốt nghiệp Premium; tổng 1.800.000đ; cọc 540.000đ; còn lại 1.260.000đ. |
| Nút Gửi | PASS | Disabled và có ghi chú rằng gửi tin nhắn chưa khả dụng. |
| Tiếp tục sang M3 | PASS | Điều hướng đến `booking.html`; nội dung sau đó vẫn là dữ liệu mẫu tĩnh. |

## 4. Kiểm tra khi tắt JavaScript

- Nội dung hội thoại, form booking và lịch tài nguyên vẫn hiển thị sau khi tắt JavaScript và tải lại trang: **PASS**.
- Các liên kết HTML trong luồng vẫn mở đúng trang đích: **PASS**.
- Gửi tin nhắn vẫn ở trạng thái disabled và có ghi chú hiển thị: **PASS**.

## 5. W3C HTML Validator

- **Công cụ:** W3C Nu HTML Checker.
- **File kiểm tra:** `studio.html`.
- **Kết quả:** PASS — không có lỗi hoặc cảnh báo.
- **Minh chứng:** [Ảnh kết quả W3C Nu Checker](validator-studio.png)

## 6. Semantic HTML và Accessibility

| Hạng mục | Kết quả | Ghi chú |
|---|---|---|
| Ngôn ngữ tài liệu và viewport metadata | PASS | Khai báo `lang="vi"` và `meta viewport`. |
| Heading và landmarks | PASS | Có một `h1`; dùng các vùng `header`, `nav`, `main` và `footer`. |
| Label biểu mẫu | PASS | Input và select có label hiển thị, liên kết đúng với `id`. |
| Accessible name và trạng thái | PASS | Tên, giờ, trạng thái tài nguyên được thể hiện bằng chữ; hành động chưa khả dụng được disable và có ghi chú. |
| Bàn phím và focus | PASS | Các liên kết, nút và vùng nhập có thể nhận biết, sử dụng theo ngữ nghĩa. |
| Tương phản màu | PASS | Đạt tỷ lệ tối thiểu 4.5:1 theo yêu cầu dự án. |

## 7. Kết luận

Màn hình M2 (`studio.html`) đạt các hạng mục kiểm tra được liệt kê trong báo cáo tại 360px, 768px và 1280px. Đây là prototype tĩnh; nội dung hội thoại và booking không được lưu hoặc đồng bộ với M3 như dữ liệu thật.
