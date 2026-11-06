# GradStudio — PA#2 Responsive Prototype

## Thông tin dự án

Prototype này chuyển ba màn hình Main Flow của GradStudio thành các trang HTML/CSS tĩnh cho PA#2. Nội dung bám theo brief final project và câu chuyện PA#1; đây là bản mô phỏng giao diện, không phải website có thể vận hành nghiệp vụ thật.

- **Thành viên nhóm:** 23120184-mssvB-mssvC-Nguyễn Anh Tuấn-Tên B-Tên C
- **Công nghệ:** HTML5 và CSS3 thuần; stylesheet dùng chung là `styles.css`.
- **Cách mở:** mở trực tiếp [`index.html`](index.html) bằng trình duyệt. Không cần cài package, chạy server hoặc build. Các trang chính dùng liên kết HTML; nội dung mẫu không phụ thuộc JavaScript.

## Ba màn hình và luồng chính

| Màn hình | File | Vai trò | Nội dung |
|---|---|---|---|
| 1 — Dịch vụ và chat | [`index.html`](index.html) | Khách hàng Nguyễn Thùy Linh | Xem dịch vụ và giá tham khảo, rồi đọc hội thoại mẫu về yêu cầu chụp tốt nghiệp lúc 09:00 ngày 24/10/2026. |
| 2 — Tư vấn và xử lý trùng lịch | [`studio.html`](studio.html) | Nhân viên studio Thảo | Xem xung đột 09:00 vì Mai bận 08:00–12:00, đề xuất makeup 13:00–14:00 và chụp 14:00–16:00 tại Phòng B; trạng thái mẫu cho biết Linh đã đồng ý. |
| 3 — Xem lịch và khoản cọc | [`booking.html`](booking.html) | Khách hàng Nguyễn Thùy Linh | Xem booking GS-1024 đang chờ cọc 30%, lịch makeup/chụp và khoản tiền cần thanh toán. Nút thanh toán được vô hiệu hóa. |

Luồng được mô phỏng là **khách hỏi dịch vụ → nhân viên kiểm tra lịch và thống nhất giờ → khách xem booking và khoản cọc**. Từ M1, liên kết đổi vai trò mở M2; M1 cũng có liên kết đến lịch chụp M3. M2 có liên kết xem M3, còn M3 có liên kết quay về M1. Các liên kết nội bộ dùng đường dẫn tương đối.

**Giờ cần phân biệt:** 13:00 là giờ bắt đầu makeup với Mai; 14:00 là giờ bắt đầu chụp với Tuấn. Việc khách đồng ý giờ chưa giữ chỗ. Lịch chỉ được giữ sau khi cọc thành công và studio kiểm tra lại nhân sự, phòng.

## Thay đổi so với PA#1 — Changed since PA#1

- Dùng đúng ba file của PA#2: `index.html`, `studio.html`, `booking.html`; thay cho tên trang cũ `page2.html` và `page3.html` được dùng ở bản PA#1.
- Chốt mỗi trang ở trạng thái được brief mới yêu cầu: M1 thể hiện câu hỏi ban đầu lúc 09:00; M2 thể hiện xung đột đã được xử lý và khách đã đồng ý giờ mới; M3 thể hiện booking đang chờ cọc 30%.
- Giữ câu chuyện và dữ liệu mẫu của PA#1, đồng thời trình bày nhất quán theo brief mới: 09:00 không khả dụng; makeup với Mai 13:00–14:00; chụp với Tuấn tại Phòng B 14:00–16:00; booking GS-1024 chờ cọc 30%.
- Thể hiện rõ các giới hạn của prototype tĩnh. Gửi chat và thanh toán không được giả lập là giao dịch thật; trạng thái booking và lịch trên các trang không được đồng bộ.
- Bố cục được tổ chức lại theo viewport: nội dung xếp dọc ở màn hình nhỏ, tablet dùng bố cục một hoặc hai cột, desktop mở rộng thành nhiều cột.
- PA#1 mô tả các thao tác demo như gửi tin nhắn, đặt lại demo và mô phỏng thanh toán. Các thao tác tạo trạng thái/dữ liệu giả đó không được giữ như chức năng PA#2. Đối chiếu nội dung PA#1 tại [`docs/pa1/LINK.md`](docs/pa1/LINK.md).

## Phần chưa nối — Not wired yet

Trên M2, chat và toàn bộ form Booking mới cuộn cùng trang. Lịch tài nguyên dùng các thẻ có tên, giờ và trạng thái đầy đủ thay cho lưới giờ của PA#1 để đọc được trên điện thoại. Form phân biệt loại buổi chụp “Tốt nghiệp cá nhân” với gói “Tốt nghiệp Premium”. Nút “Tạo booking” có ghi chú chuyển sang góc nhìn của Linh.

- Hội thoại trên M1 và M2 là nội dung mẫu. Ô nhập tin nhắn và nút Gửi đang disabled; không gửi hoặc lưu tin nhắn.
- Ba nút “Hỏi về gói này” ở M1 cùng dẫn đến một đoạn chat mẫu đang ghi “Đang hỏi về: Gói Tốt nghiệp”. Chúng không đổi nội dung chat theo gói.
- Nút “Tạo booking” trên M2 điều hướng đến `booking.html` bằng GET, nhưng dữ liệu của form không được lưu hoặc truyền sang M3. M3 luôn hiển thị dữ liệu mẫu viết sẵn.
- Nút “Thanh toán cọc 30%” trên M3 đang disabled. Không có cổng thanh toán, giao dịch thật hoặc trạng thái đã trả cọc.
- Lịch tài nguyên chỉ minh họa các mốc bận và đề xuất. Trang không tự giữ giờ, kiểm tra tài nguyên trực tiếp, phân công nhân viên hoặc gửi nhắc lịch.
- Nhãn vai trò khách hàng/nhân viên chỉ giúp người xem theo dõi câu chuyện; không có đăng nhập hay phân quyền.
- Các chức năng ngoài ba màn hình PA#2 như gửi email/SMS, quản lý tài khoản, dữ liệu nhiều studio và xử lý booking thật chưa được triển khai.

## Giao diện, CSS và responsive

- Cả ba trang dùng chung [`styles.css`](styles.css), không dùng framework CSS, thư viện giao diện, font CDN hoặc build step.
- Kiểu hiển thị mobile-first. Layout mở rộng từ **768px** cho tablet và từ **1200px** cho desktop; một số cỡ chữ trong design tokens tăng thêm từ **1280px**.
- Bộ màu chính trong CSS dùng nền kem `#FAF6F1`, bề mặt `#FFFDF9`, chữ `#2B2118`, màu chữ phụ `#65584C`, màu chính `#8D6026` và màu nhấn `#C9A46A`.
- Tiêu đề dùng serif có sẵn trên hệ điều hành; nội dung và điều khiển dùng sans-serif với fallback hệ thống.
- Khoảng cách dùng các biến CSS theo nấc 4px: `--gs-space-1`, `--gs-space-2`, `--gs-space-3`, `--gs-space-4`, `--gs-space-5`, `--gs-space-6`, `--gs-space-8`, `--gs-space-10`, `--gs-space-12`, `--gs-space-16`, `--gs-space-20` (tương ứng 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 và 80px ở cỡ chữ gốc 16px).
- Các viewport mục tiêu của dự án là 360px, 768px và 1280px. Việc ghi kết quả kiểm tra thực tế thuộc các file check và minh chứng riêng; tài liệu này không tự xác nhận các viewport đã được kiểm thử.

## Hình ảnh và nguồn

Các ảnh dùng trên M1 là tài nguyên cục bộ trong `assets/images/`:

| File | Vị trí sử dụng |
|---|---|
| `assets/images/hero1.avif` | Ảnh minh họa hero |
| `assets/images/KyYeu.jpg` | Thẻ Kỷ yếu lớp |
| `assets/images/TotNghiep.jpg` | Thẻ Tốt nghiệp |
| `assets/images/ChanDung.jpg` | Thẻ Chân dung/CV |

Đây là bộ ảnh mèo được chọn dùng cho prototype theo trao đổi của nhóm; ảnh không được tải từ URL ngoài khi trang mở. Repository hiện không ghi nguồn gốc hoặc giấy phép ban đầu của các ảnh. Nếu ảnh lấy từ bên ngoài, nhóm cần bổ sung nguồn và giấy phép phù hợp trước khi nộp.

## Tài liệu liên quan

- [`README.md`](README.md) — tổng quan dự án và dữ liệu mẫu.
- [`AGENTS.md`](AGENTS.md) — quy tắc và yêu cầu PA#2 của nhóm.
- [`docs/pa1/LINK.md`](docs/pa1/LINK.md) — câu chuyện và hành vi prototype PA#1 được mô tả trong tài liệu tham chiếu.
- [`docs/pa2/GradStudio-final-project-brief.pdf`](docs/pa2/GradStudio-final-project-brief.pdf) — brief final project.
- [`checks/manualcheckindex.md`](checks/manualcheckindex.md) — báo cáo manual check M1; kết quả kiểm tra cần được xác nhận bởi người thực hiện và minh chứng tương ứng.
- [Báo cáo kiểm tra M2 của thành viên B](checks/manualcheckstudio.md) — số đo responsive, ảnh khi tắt JavaScript, điều hướng bàn phím và kết quả Nu Checker.
-Mục Check của C
