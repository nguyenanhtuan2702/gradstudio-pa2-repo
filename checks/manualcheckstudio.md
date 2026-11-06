# Báo cáo kiểm tra M2 — studio.html

Ngày 06/11/2026. Codex mở file HTML trực tiếp bằng Google Chrome headless và dùng Playwright để đặt viewport, đọc cây accessibility, gửi phím và chụp toàn trang. Các kết quả dưới đây thuộc lần kiểm tra của assistant.

## Responsive khi tắt JavaScript

| Viewport | Bố cục quan sát được | Chiều rộng tài liệu | Phần tử vượt cạnh phải | Ảnh toàn trang |
|---|---|---:|---:|---|
| 360 × 800 | Một cột, lần lượt là danh sách, chat, form, lịch tài nguyên | 360 px | 0 | [360 px](../screenshots/studio-360.png) |
| 768 × 800 | Danh sách trên cùng, chat và form bên trái, lịch bên phải | 768 px | 0 | [768 px](../screenshots/studio-768.png) |
| 1280 × 800 | Ba cột danh sách, chat kèm form, lịch tài nguyên | 1280 px | 0 | [1280 px](../screenshots/studio-1280.png) |

Ở cả ba kích thước, các trường chỉ đọc vừa chiều rộng ô. Chat và toàn bộ form xuất hiện trên ảnh cuộn toàn trang. Ở 360 px, chiều cao nhỏ nhất đo được trong tất cả nút và liên kết là 44 px.

## Kịch bản và điều hướng

- Đối chiếu hội thoại, form và lịch tài nguyên với mô tả PA#1 và brief M2. Lịch 09:00 trùng ca bận của Mai. Linh đồng ý trang điểm 13:00–14:00 và chụp 14:00–16:00 với Tuấn tại Phòng B. Form tách loại buổi chụp khỏi tên gói và ghi đủ tổng giá, tiền cọc và số còn lại.
- Ở cả ba viewport khi tắt JavaScript, giờ chụp hiển thị 14:00. Nút Gửi bị vô hiệu hóa và có ghi chú. Dùng Enter trên “Tạo booking” và trên liên kết khách hàng đều mở file booking.html. Khi bật JavaScript, đã mở lại M2 và xác nhận phần Booking mới hiển thị.

## HTML và khả năng truy cập

- Nu Checker trả về 0 lỗi, 0 cảnh báo. [Ảnh kết quả Nu Checker](validator-studio.png)
- Trang khai báo tiếng Việt, có một h1, các vùng header, nav, main, footer. Tất cả input và select có label hiển thị. Cây accessibility của Chrome thể hiện tên, giờ và trạng thái của các tài nguyên bằng chữ, cùng tên liên kết chuyển vai trò.
- Ở 360 px, phím Tab đầu tiên đến liên kết bỏ qua điều hướng. Enter chuyển tới main-content. Các phép thử Enter trên hai đường sang M3 bắt đầu bằng cách đặt focus vào từng điều khiển.
- Tỷ lệ tương phản tính từ cặp màu CSS là 5,48:1 cho nút chính, 6,39:1 cho chữ phụ trên nền trang, 5,39:1 cho nhãn đã chốt, 5,85:1 cho nhãn đề xuất và 5,81:1 cho nhãn bận.

Chưa chạy thử bằng trình đọc màn hình hoặc duyệt toàn bộ thứ tự Tab/Shift+Tab bằng tay. Thành viên B có thể mở file tại 360 px và kiểm tra vòng focus qua từng trường để bổ sung phần kiểm tra thủ công.
