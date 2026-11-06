# GradStudio — PA#2 Responsive Prototype

## Thông tin dự án

Prototype này trình bày ba màn hình Main Flow của GradStudio bằng HTML/CSS tĩnh cho PA#2. Bố cục và cách trình bày do nhóm lựa chọn; nội dung mẫu hiện dùng câu chuyện từ brief final project và PA#1. Đây là bản mô phỏng giao diện, không phải website có thể vận hành nghiệp vụ thật.

- **Thành viên nhóm:** Nguyễn Anh Tuấn (23120184), Lê Công Phúc (23120330), Đặng Hồng Minh (24120090).
- **Phân công phụ trách:** Thành viên A — Nguyễn Anh Tuấn (`index.html`); Thành viên B — Lê Công Phúc (`studio.html`); Thành viên C — Đặng Hồng Minh (`booking.html`).
- **Công nghệ:** HTML5 và CSS3 thuần; stylesheet dùng chung là `styles.css`.
- **Cách mở:** mở trực tiếp [`index.html`](index.html) bằng trình duyệt. Không cần cài package, chạy server hoặc build. Các trang chính dùng liên kết HTML; nội dung mẫu không phụ thuộc JavaScript.

## Ba màn hình và luồng chính

| Màn hình / file | Vai trò | Nội dung |
|---|---|---|
| [`index.html`](index.html) — Dịch vụ và chat | Khách hàng Nguyễn Thùy Linh | Xem dịch vụ và giá tham khảo, rồi đọc hội thoại mẫu về yêu cầu chụp tốt nghiệp lúc 09:00 ngày 24/10/2026. |
| [`studio.html`](studio.html) — Tư vấn và xử lý trùng lịch | Nhân viên studio Thảo | Xem xung đột 09:00 vì Mai bận 08:00–12:00, đề xuất makeup 13:00–14:00 và chụp 14:00–16:00 tại Phòng B; trạng thái mẫu cho biết Linh đã đồng ý. |
| [`booking.html`](booking.html) — Xem lịch và khoản cọc | Khách hàng Nguyễn Thùy Linh | Xem booking GS-1024 đang chờ cọc 30%, lịch makeup/chụp và khoản tiền cần thanh toán. Nút thanh toán được vô hiệu hóa. |

Luồng được mô phỏng là **`index.html`: khách hỏi dịch vụ → `studio.html`: nhân viên kiểm tra lịch và thống nhất giờ → `booking.html`: khách xem booking và khoản cọc**. Từ `index.html`, liên kết đổi vai trò mở `studio.html`; `index.html` cũng có liên kết đến lịch chụp `booking.html`. `studio.html` có liên kết xem `booking.html`, còn `booking.html` có liên kết quay về `index.html`. Các liên kết nội bộ dùng đường dẫn tương đối.

**Giờ cần phân biệt:** 13:00 là giờ bắt đầu makeup với Mai; 14:00 là giờ bắt đầu chụp với Tuấn. Việc khách đồng ý giờ chưa giữ chỗ. Lịch chỉ được giữ sau khi cọc thành công và studio kiểm tra lại nhân sự, phòng.

## Thay đổi so với PA#1 — Changed since PA#1

- Dùng đúng ba file của PA#2: `index.html`, `studio.html`, `booking.html`; thay cho tên trang cũ `page2.html` và `page3.html` được dùng ở bản PA#1.
- Chốt mỗi trang ở trạng thái được brief mới yêu cầu: `index.html` thể hiện câu hỏi ban đầu lúc 09:00; `studio.html` thể hiện xung đột đã được xử lý và khách đã đồng ý giờ mới; `booking.html` thể hiện booking đang chờ cọc 30%.
- Giữ câu chuyện và dữ liệu mẫu của PA#1, đồng thời trình bày nhất quán theo brief mới: 09:00 không khả dụng; makeup với Mai 13:00–14:00; chụp với Tuấn tại Phòng B 14:00–16:00; booking GS-1024 chờ cọc 30%.
- Thể hiện rõ các giới hạn của prototype tĩnh. Gửi chat và thanh toán không được giả lập là giao dịch thật; trạng thái booking và lịch trên các trang không được đồng bộ.
- Bố cục được tổ chức lại theo viewport: nội dung xếp dọc ở màn hình nhỏ, tablet dùng bố cục một hoặc hai cột, desktop mở rộng thành nhiều cột.
- PA#1 mô tả các thao tác demo như gửi tin nhắn, đặt lại demo và mô phỏng thanh toán. Các thao tác tạo trạng thái/dữ liệu giả đó không được giữ như chức năng PA#2. Đối chiếu nội dung PA#1 tại [`docs/pa1/LINK.md`](docs/pa1/LINK.md).

## Phần chưa nối — Not wired yet

Trên `studio.html`, chat và toàn bộ form Booking mới cuộn cùng trang. Lịch tài nguyên dùng các thẻ có tên, giờ và trạng thái đầy đủ thay cho lưới giờ của PA#1 để đọc được trên điện thoại. Form phân biệt loại buổi chụp “Tốt nghiệp cá nhân” với gói “Tốt nghiệp Premium”. Nút “Tạo booking” có ghi chú chuyển sang góc nhìn của Linh.

- Hội thoại trên `index.html` và `studio.html` là nội dung mẫu. Ô nhập tin nhắn và nút Gửi đang disabled; không gửi hoặc lưu tin nhắn.
- Ba nút “Hỏi về gói này” trên `index.html` cùng dẫn đến một đoạn chat mẫu đang ghi “Đang hỏi về: Gói Tốt nghiệp”. Chúng không đổi nội dung chat theo gói.
- Nút “Tạo booking” trên `studio.html` điều hướng đến `booking.html` bằng GET, nhưng dữ liệu của form không được lưu hoặc truyền sang trang đích. `booking.html` luôn hiển thị dữ liệu mẫu viết sẵn.
- Nút “Thanh toán cọc 30%” trên `booking.html` đang disabled. Không có cổng thanh toán, giao dịch thật hoặc trạng thái đã trả cọc.
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

Theo xác nhận của nhóm, phần lớn ảnh trong bộ được tạo bằng AI. Các đường dẫn trong bảng là nguồn nhóm cung cấp cho những tệp đã tải về; công cụ tạo ảnh và cách tạo của từng tệp chưa được ghi riêng. Tất cả ảnh được lưu cục bộ, trang không tải ảnh từ các URL này khi mở.

Các ảnh dùng trên `index.html` là tài nguyên cục bộ trong `assets/images/`:

| Tệp | Vị trí sử dụng | Nguồn và thông tin sử dụng |
|---|---|---|
| `assets/images/hero1.avif` | Ảnh minh họa hero | [Trang ảnh Pexels](https://www.pexels.com/vi-vn/anh/c-n-c-nh-m-t-chu-meo-calico-d-i-anh-n-ng-m-t-tr-i-29235334/). Theo [Pexels License](https://www.pexels.com/legal-pages/license/), ảnh được dùng miễn phí và không bắt buộc ghi công. |
| `assets/images/KyYeu.jpg` | Thẻ Kỷ yếu lớp | [Vecteezy – Three cats resting on a park bench during autumn](https://nl.vecteezy.com/foto/75232376-drie-katten-resting-aan-park-bank-gedurende-herfst). **Platform:** Vecteezy. **License:** Free License (theo thông tin nhóm ghi nhận khi tải ảnh). **Attribution:** Tác giả chưa được lưu lại tại thời điểm tải ảnh; nhóm giữ liên kết đến trang tài nguyên gốc để truy xuất thông tin. |
| `assets/images/TotNghiep.jpg` | Thẻ Tốt nghiệp | [Vecteezy – Cat with striking green eyes](https://www.vecteezy.com/photo/73765005-cat-with-striking-green-eyes-peering-through-lush-greenery-showcasing-a-close-encounter-with-nature-in-a-serene-and-tranquil-environment-perfect-for-minimalist-photography). **Platform:** Vecteezy. **License:** Free License (theo thông tin nhóm ghi nhận khi tải ảnh). **Attribution:** Tác giả chưa được lưu lại tại thời điểm tải ảnh; nhóm giữ liên kết đến trang tài nguyên gốc để truy xuất thông tin. |
| `assets/images/ChanDung.jpg` | Thẻ Chân dung/CV | [TikTok](https://www.tiktok.com/) — đây là liên kết trang chủ do nhóm cung cấp, không phải liên kết tới bài đăng cụ thể của ảnh. |

Nhóm xác nhận bộ ảnh lấy từ các nguồn công khai cho phép tải và sử dụng. Với hai ảnh Vecteezy, repository chưa ghi loại giấy phép được chọn và tên tác giả; liên kết cho `ChanDung.jpg` cũng chưa xác định được nội dung gốc.

## Tài liệu liên quan

- [`README.md`](README.md) — tổng quan dự án và dữ liệu mẫu.
- [`AGENTS.md`](AGENTS.md) — quy tắc và yêu cầu PA#2 của nhóm.
- [`docs/pa1/LINK.md`](docs/pa1/LINK.md) — câu chuyện và hành vi prototype PA#1 được mô tả trong tài liệu tham chiếu.
- [`docs/pa2/GradStudio-final-project-brief.pdf`](docs/pa2/GradStudio-final-project-brief.pdf) — brief final project.
- [Báo cáo `index.html` — Nguyễn Anh Tuấn, Thành viên A](checks/manualcheckindex.md) — số đo responsive, ảnh khi tắt JavaScript, W3C 0 errors và ngữ nghĩa.
- [Báo cáo `studio.html` — Lê Công Phúc, Thành viên B](checks/manualcheckstudio.md) — số đo responsive, ảnh khi tắt JavaScript, điều hướng bàn phím và kết quả Nu Checker.
- [Báo cáo `booking.html` — Đặng Hồng Minh, Thành viên C](checks/manualcheckbooking.md) — số đo responsive, ảnh khi tắt JavaScript, W3C 0 errors và ngữ nghĩa.
