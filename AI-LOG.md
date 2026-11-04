# AI-LOG.md — GradStudio PA#2

Nhật ký dưới đây ghi lại các yêu cầu đã nhờ assistant hỗ trợ trong cuộc trò chuyện. Các mục kiểm thử chỉ được ghi là đã chạy khi có căn cứ; việc assistant đọc hoặc đề xuất checklist không được xem là kết quả kiểm thử.

## 2026-11-04 — Khôi phục Màn 1
Tool: Codex (OpenAI Codex desktop).
Asked for: Dựng lại `index.html` sau khi người dùng lỡ xóa bản đã chỉnh và giữ liên kết stylesheet của dự án.
Kept: Nội dung và luồng tĩnh của Màn 1, cùng các class/component hiện có.
Changed: Tạo lại trang sau khi người dùng báo file bị mất; đối chiếu liên kết hiện tại và xác nhận `index.html` dùng `style.css`. Không chạy Nu Checker hay kiểm tra viewport trong mục này.
Rejected: Không thêm backend, chức năng đồng bộ giả hoặc tài nguyên ngoài để dựng lại trang.

## 2026-11-04 — Thống nhất tên stylesheet trong tài liệu
Tool: Codex (OpenAI Codex desktop).
Asked for: Sửa README và AGENTS.md để ghi `style.css` là stylesheet chung, còn `styles.css` sẽ được xóa sau khi các trang chuyển sang file chung.
Kept: Quyết định dùng một file CSS chung và điều kiện chờ Màn 2, Màn 3 chuyển xong.
Changed: Cập nhật hướng dẫn để phân biệt `style.css` chính thức với `styles.css` tạm; khi rà lại, cả README và AGENTS.md đều ghi rõ trạng thái này.
Rejected: Không xóa `styles.css` trước khi các trang còn lại chuyển xong, theo quy tắc dự án.

## 2026-11-04 — Rà soát Màn 1 theo ảnh tham chiếu
Tool: Codex (OpenAI Codex desktop).
Asked for: Xem index và CSS đã chỉnh có ổn không, không sửa tùy tiện.
Kept: Nội dung tiếng Việt, cấu trúc ngữ nghĩa và luồng liên kết hiện có.
Changed: Không sửa file theo yêu cầu; đối chiếu ảnh tham chiếu và chỉ ra các chỗ giao diện cần xem lại như hero desktop, header, chat và thanh chọn màn hình.
Rejected: Không chỉnh HTML/CSS trong lượt rà soát này; không tuyên bố đã chạy W3C hoặc kiểm tra responsive.

## 2026-11-04 — Font cục bộ và vùng bấm
Tool: Codex (OpenAI Codex desktop).
Asked for: Bỏ Google Fonts và sửa các vùng bấm nhỏ hơn yêu cầu 44px.
Kept: Quy tắc font dùng được khi offline và hệ thống token/component hiện có.
Changed: Bỏ phụ thuộc tải font từ Google và nâng các điều khiển độc lập được nêu trong yêu cầu lên tối thiểu 44px; căn cứ là quy định AGENTS.md và các kích thước nhỏ đã được rà ra trước đó. Không chạy kiểm tra đa trình duyệt trong lượt này.
Rejected: Không giữ link Google Fonts hoặc dựa vào font tải từ Internet, vì trái quy tắc dự án.

## 2026-11-04 — Sửa hiển thị font tiếng Việt
Tool: Codex (OpenAI Codex desktop).
Asked for: Đổi font vì một số chữ tiếng Việt hiển thị lỗi trong ảnh người dùng gửi.
Kept: Phân cấp serif cho tiêu đề, sans-serif cho nội dung và yêu cầu không tải font từ Internet.
Changed: Điều chỉnh lựa chọn font/fallback cục bộ sau khi ảnh cho thấy dấu tiếng Việt hiển thị không ổn; chưa có kiểm tra riêng trên nhiều hệ điều hành để xác nhận kết quả đồng nhất.
Rejected: Không thêm Google Fonts hay font CDN để xử lý lỗi, vì AGENTS.md cấm phụ thuộc font mạng.

## 2026-11-04 — Ảnh và bố cục thẻ gói chụp
Tool: Codex (OpenAI Codex desktop).
Asked for: Hỏi có cần lấy ảnh từ Internet không; sau đó nhờ sửa thẻ Kỷ yếu lớp bị lệch khi đã thêm ảnh ba gói.
Kept: Các ảnh người dùng bổ sung trong `assets/images/` và nội dung/giá của ba gói.
Changed: Sau khi ảnh chụp cho thấy ảnh thẻ đầu thấp hơn hai thẻ còn lại và nội dung lệch hàng, chỉnh CSS để ảnh các thẻ dùng cùng tỷ lệ khung, card xếp cột và nút tư vấn nằm cuối card. Chưa chạy lại browser/responsive test sau chỉnh sửa này.
Rejected: Không tải ảnh ngoài hoặc thay ảnh/nội dung gói; ảnh nên nằm trong repository theo quy tắc dự án.

## 2026-11-04 — Tích hợp mã nguồn và dựng khung Màn 3 (page3.html)
Tool: Antigravity (Google DeepMind).
Asked for: Kéo (git pull) branch `feat/gradstudio-foundation-css`, giải quyết xung đột stylesheet và dựng khung tĩnh hoàn chỉnh cho `page3.html` khớp thiết kế `03-customer-appointment.png`.
Kept: Dữ liệu mẫu chuẩn PA#1 (khách hàng Nguyễn Thùy Linh, mã booking GS-1024, ngày chụp Thứ Bảy 24/10/2026, gói Tốt nghiệp Premium 1.800.000đ, cọc 30% 540.000đ, còn lại 70% 1.260.000đ), các class tiện ích chung và liên kết tương đối giữa các trang.
Changed: Ghép hợp nhất CSS của Màn 1 và Màn 3 vào file chung `style.css`; dựng cấu trúc ngữ nghĩa Màn 3 gồm Header tài khoản, thanh 4 tab trạng thái lịch, lịch tuần 43 đánh dấu ngày 24, timeline 3 mốc thời gian (09:00 bị trùng, 13:00-14:00 makeup Mai, 14:00-16:00 chụp Tuấn), khối tóm tắt chi phí cọc, bản đồ vị trí studio SVG và thanh chuyển vai trò demo.
Rejected: Không thêm JavaScript hay backend để đồng bộ trạng thái booking/tin nhắn giữa các trang; không dùng thư viện CSS hay icon bên ngoài.

## 2026-11-04 — Tùy chỉnh avatar tròn và thêm ghi chú đề xuất studio
Tool: Antigravity (Google DeepMind).
Asked for: Người dùng gửi ảnh giao diện thực tế yêu cầu sửa ảnh đại diện khách hàng thành hình tròn và bổ sung khối thông báo ghi chú đề xuất của studio.
Kept: Tinh thần thiết kế, màu sắc thương hiệu GradStudio và các thành phần hiện có trên trang.
Changed: Sau khi kiểm tra ảnh gửi thấy avatar đang hiển thị hình chữ nhật, cập nhật CSS `.user-avatar-img` có `border-radius: 50%`, `overflow: hidden`, `object-fit: cover`; tạo component `.schedule-proposal-callout` kèm icon SVG với nội dung giải thích studio đề xuất chụp lúc 14:00 do makeup lúc 09:00 đã kín lịch.
Rejected: Không dùng ảnh trực tuyến hay thư viện icon ngoài; dùng ảnh cục bộ `assets/images/avatar-linh.jpg` và inline SVG.

## 2026-11-04 — Khắc phục lỗi dấu tiếng Việt trên tiêu đề Serif
Tool: Antigravity (Google DeepMind).
Asked for: Người dùng gửi ảnh chụp màn hình hiển thị lỗi font chữ: từ "Chụp ảnh tố ́ t nghiệp" bị tách rời dấu sắc và chữ "t" trên trình duyệt Windows.
Kept: Nguyên tắc thiết kế PA#1 dùng font Serif thanh lịch cho tiêu đề và Sans-serif cho nội dung; quy tắc cấm tải font từ Internet (offline-first).
Changed: Nhận diện lỗi rendering font `Georgia` khi kết hợp ký tự tiếng Việt có dấu trên một số bản phân phối Windows; thay thế khai báo biến CSS `--gs-font-serif` thành `Cambria, "Times New Roman", serif` để dấu hiển thị liền khối, sắc nét.
Rejected: Không nhúng Google Fonts hay CDN font bên ngoài để sửa lỗi, tuân thủ nghiêm ngặt AGENTS.md.

## 2026-11-04 — Kiểm tra Responsive và Horizontal Scroll Màn 3
Tool: Antigravity (Google DeepMind).
Asked for: Hướng dẫn người dùng cách kiểm tra trang trên 3 thiết bị và đo đạc hiện tượng tràn layout (horizontal scroll) theo chuẩn rubric.
Kept: Layout mobile-first, cấu trúc 1 cột ở mobile (< 768px), 2 cột ở desktop (1280px).
Changed: Hướng dẫn sử dụng DevTools Device Toolbar và chạy các đoạn script console: `scrollWidth > clientWidth` và bộ lọc phần tử tràn viền phải. Người dùng chạy lệnh tại 1280px xác nhận `scrollWidth === clientWidth === 1280` (kết quả false - không tràn). Rà soát và đảm bảo các nút bấm (`.booking-tab`, `.gs-btn`, `.demo-link`) đều đạt chiều cao tối thiểu 44px tại 360px.
Rejected: Không dùng `overflow-x: hidden` trên `html`, `body` hoặc wrapper để che lỗi tràn.

## 2026-11-04 — Khắc phục triệt để 3 lỗi W3C Nu Checker trên page3.html
Tool: Antigravity (Google DeepMind).
Asked for: Người dùng gửi ảnh chụp kết quả kiểm tra W3C HTML Nu Checker cho `page3.html` phát hiện 3 lỗi ARIA nghiêm trọng và nhờ sửa.
Kept: Toàn bộ nội dung giao diện, khả năng tiếp cận (Accessibility) và trải nghiệm người dùng của Màn 3.
Changed:
1. Sửa lỗi dòng 25 và 200: Gỡ thuộc tính `aria-label` khỏi hai thẻ generic `div` (`.user-profile` và `.booking-pricing-box`) vì theo đặc tả W3C HTML/ARIA, thẻ `div` vô danh không được phép mang `aria-label` trực tiếp (thay vào đó thông tin đã được thể hiện rõ ràng qua text và thẻ alt).
2. Sửa lỗi dòng 49: Thẻ `<button role="tab" aria-selected="true">` bị lỗi do thiếu `role="tabpanel"` tương ứng. Khắc phục bằng cách chuyển container sang `<div class="booking-tabs" role="group" aria-label="Bộ lọc trạng thái lịch chụp">` và bỏ `role="tab"` khỏi các nút, sử dụng class trạng thái `.active` thuần HTML/CSS.
3. Người dùng kiểm tra lại trên W3C Nu Checker đạt kết quả xanh lá: **0 Errors, 0 Warnings** và lưu minh chứng vào `checks/validator-page3.png` và `screenshots/validator-page3.png`.
4. Biên soạn hồ sơ kiểm thử thủ công chi tiết `checks/manualcheckM3.md`.
Rejected: Không tạo các thẻ tabpanel rỗng để qua mặt validator, không viết JavaScript giả lập tương tác tab trái với bản chất prototype tĩnh.

