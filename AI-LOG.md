# AI-LOG.md — GradStudio PA#2

Nhật ký dưới đây ghi lại các yêu cầu đã nhờ assistant hỗ trợ trong cuộc trò chuyện. Các mục kiểm thử chỉ được ghi là đã chạy khi có căn cứ; việc assistant đọc hoặc đề xuất checklist không được xem là kết quả kiểm thử.

Tên file và đường dẫn trong mục lịch sử phản ánh trạng thái tại thời điểm tác vụ; chúng có thể đã được đổi tên hoặc xóa trong các cập nhật sau và không nhất thiết còn tồn tại trong repository hiện tại.

Phân công hiện tại: Thành viên A — Nguyễn Anh Tuấn (`index.html`); Thành viên B — Lê Công Phúc (`studio.html`); Thành viên C — Đặng Hồng Minh (`booking.html`). Trong nội dung lịch sử, nhãn Màn 1/2/3 lần lượt chỉ các file này; tên `page2.html` và `page3.html` là tên cũ được ghi theo thời điểm tác vụ.

## 2026-11-04 — Khôi phục `index.html`
Tool: Codex (OpenAI Codex desktop).
Asked for: Dựng lại `index.html` sau khi người dùng lỡ xóa bản đã chỉnh và giữ liên kết stylesheet của dự án.
Kept: Nội dung và luồng tĩnh của `index.html`, cùng các class/component hiện có.
Changed: Tạo lại trang sau khi người dùng báo file bị mất; đối chiếu liên kết hiện tại và xác nhận `index.html` dùng `style.css`. Không chạy Nu Checker hay kiểm tra viewport trong mục này.
Rejected: Không thêm backend, chức năng đồng bộ giả hoặc tài nguyên ngoài để dựng lại trang.

## 2026-11-04 — Thống nhất tên stylesheet trong tài liệu
Tool: Codex (OpenAI Codex desktop).
Asked for: Sửa README và AGENTS.md để ghi `style.css` là stylesheet chung, còn `styles.css` sẽ được xóa sau khi các trang chuyển sang file chung.
Kept: Quyết định dùng một file CSS chung và điều kiện chờ `studio.html` và `booking.html` chuyển xong.
Changed: Cập nhật hướng dẫn để phân biệt `style.css` chính thức với `styles.css` tạm; khi rà lại, cả README và AGENTS.md đều ghi rõ trạng thái này.
Rejected: Không xóa `styles.css` trước khi các trang còn lại chuyển xong, theo quy tắc dự án.

## 2026-11-04 — Rà soát `index.html` theo ảnh tham chiếu
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

## 2026-11-04 — Tích hợp mã nguồn và dựng khung `page3.html` (sau đổi tên thành `booking.html`)
Tool: Antigravity (Google DeepMind).
Asked for: Kéo (git pull) branch `feat/gradstudio-foundation-css`, giải quyết xung đột stylesheet và dựng khung tĩnh hoàn chỉnh cho `page3.html` khớp thiết kế `03-customer-appointment.png`.
Kept: Dữ liệu mẫu chuẩn PA#1 (khách hàng Nguyễn Thùy Linh, mã booking GS-1024, ngày chụp Thứ Bảy 24/10/2026, gói Tốt nghiệp Premium 1.800.000đ, cọc 30% 540.000đ, còn lại 70% 1.260.000đ), các class tiện ích chung và liên kết tương đối giữa các trang.
Changed: Ghép CSS của `index.html` và `page3.html` vào file chung `style.css`; dựng cấu trúc trang lịch/đặt cọc (sau đổi tên thành `booking.html`) gồm header tài khoản, thanh 4 tab trạng thái lịch, lịch tuần 43 đánh dấu ngày 24, timeline 3 mốc thời gian (09:00 bị trùng, 13:00–14:00 makeup Mai, 14:00–16:00 chụp Tuấn), khối tóm tắt chi phí cọc, bản đồ vị trí studio SVG và thanh chuyển vai trò demo.
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

## 2026-11-04 — Kiểm tra Responsive và Horizontal Scroll `booking.html`
Tool: Antigravity (Google DeepMind).
Asked for: Hướng dẫn người dùng cách kiểm tra trang trên 3 thiết bị và đo đạc hiện tượng tràn layout (horizontal scroll) theo chuẩn rubric.
Kept: Layout mobile-first, cấu trúc 1 cột ở mobile (< 768px), 2 cột ở desktop (1280px).
Changed: Hướng dẫn sử dụng DevTools Device Toolbar và chạy các đoạn script console: `scrollWidth > clientWidth` và bộ lọc phần tử tràn viền phải. Người dùng chạy lệnh tại 1280px xác nhận `scrollWidth === clientWidth === 1280` (kết quả false - không tràn). Rà soát và đảm bảo các nút bấm (`.booking-tab`, `.gs-btn`, `.demo-link`) đều đạt chiều cao tối thiểu 44px tại 360px.
Rejected: Không dùng `overflow-x: hidden` trên `html`, `body` hoặc wrapper để che lỗi tràn.

## 2026-11-04 — Khắc phục triệt để 3 lỗi W3C Nu Checker trên page3.html
Tool: Antigravity (Google DeepMind).
Asked for: Người dùng gửi ảnh chụp kết quả kiểm tra W3C HTML Nu Checker cho `page3.html` phát hiện 3 lỗi ARIA nghiêm trọng và nhờ sửa.
Kept: Toàn bộ nội dung giao diện, khả năng tiếp cận (Accessibility) và trải nghiệm người dùng của `booking.html`.
Changed:
1. Sửa lỗi dòng 25 và 200: Gỡ thuộc tính `aria-label` khỏi hai thẻ generic `div` (`.user-profile` và `.booking-pricing-box`) vì theo đặc tả W3C HTML/ARIA, thẻ `div` vô danh không được phép mang `aria-label` trực tiếp (thay vào đó thông tin đã được thể hiện rõ ràng qua text và thẻ alt).
2. Sửa lỗi dòng 49: Thẻ `<button role="tab" aria-selected="true">` bị lỗi do thiếu `role="tabpanel"` tương ứng. Khắc phục bằng cách chuyển container sang `<div class="booking-tabs" role="group" aria-label="Bộ lọc trạng thái lịch chụp">` và bỏ `role="tab"` khỏi các nút, sử dụng class trạng thái `.active` thuần HTML/CSS.
3. Người dùng kiểm tra lại trên W3C Nu Checker đạt kết quả xanh lá: **0 Errors, 0 Warnings** và lưu minh chứng vào `checks/validator-page3.png` và `screenshots/validator-page3.png`.
4. Biên soạn hồ sơ kiểm thử thủ công chi tiết `checks/manualcheckbooking.md`.
Rejected: Không tạo các thẻ tabpanel rỗng để qua mặt validator, không viết JavaScript giả lập tương tác tab trái với bản chất prototype tĩnh.

## 2026-11-05 — Dựng lại ba màn hình theo brief cuối (index / studio / booking + styles.css)
Tool: Claude (Anthropic, claude.ai, có môi trường chạy mã).
Asked for: Dựng lại `index.html`, `styles.css`, đổi `page2.html` thành `studio.html` và `page3.html` thành `booking.html` theo `GradStudio-final-project-brief.pdf` (ưu tiên hơn AGENTS.md cũ khi mâu thuẫn): `index.html` là câu hỏi ban đầu của Linh, `studio.html` là trạng thái Admin sau khi Linh đồng ý 14:00 (xung đột Mai 08:00–12:00, "Tạo booking" enabled), `booking.html` là GS-1024 "Đã thống nhất lịch · Chờ cọc 30%" với nút cọc disabled. Yêu cầu bỏ nút demo, chat nổi, ảnh người thật chưa xác minh quyền, JavaScript; sau đó kiểm tra và báo cáo trung thực.
Kept: Toàn bộ `:root` token (màu, spacing, font Cambria/serif), phần reset, `.gs-btn`, `.gs-input/.gs-select`, `.gs-card`, `.gs-stack`, header/nav `.site-header__inner`; dữ liệu chuẩn GS-1024 (Linh, Mai, Tuấn, Phòng B, 1.800.000đ / 540.000đ / 1.260.000đ); tên trạng thái "Đã chốt lịch", "Chờ cọc 30%".
Changed: Viết mới `index.html` (hero bằng CSS/chữ lồng "GS", 3 thẻ dịch vụ không ảnh, chat nằm trong luồng trang với ô nhập + nút Gửi disabled kèm ghi chú, quy trình nói rõ chỉ giữ lịch sau khi cọc 30% thành công và kiểm tra lại, link "Nhân viên studio: mở cuộc trò chuyện này"); tạo `studio.html` (danh sách hội thoại, chat, form "Booking mới" nằm dưới chat, danh sách lịch tài nguyên dạng thẻ có chữ ✕/◷ thay vì lưới bị cắt chữ, khung giải thích xung đột, form `action="booking.html"`, link "Khách hàng: xem lịch chụp GS-1024"); tạo `booking.html` (tuần 43 đánh dấu ngày 24, 09:00 gạch ngang + nhãn "Không khả dụng", timeline 13:00–14:00 và 14:00–16:00, nút "Thanh toán cọc 30%" disabled + ghi chú nhìn thấy). `styles.css` = 455 dòng đầu của file tải lên (token, reset, button, field, header) + khối CSS trang mới (breakpoint 768/1200). Bỏ thanh demo "Màn 1/2/3", "Đặt lại demo", nút chat nổi, script, tab lọc, bản đồ/"Xem đường đi", link footer không có đích.
Rejected: Không dùng ảnh trong `assets/images/` (ảnh người thật chưa xác minh quyền), không hotlink, không JavaScript, không `!important`, không `overflow-x: hidden`. Assistant không đọc được file PDF brief vì không được đính kèm — chỉ dựa vào prompt tác vụ và `AGENTS.md` đã tải lên; chưa đối chiếu với PDF. Assistant cũng không đọc `page2.html` (dựng mới hoàn toàn) và không thao tác Git (không `git mv`, không xóa `page2.html`/`page3.html`).

## 2026-11-05 — Kiểm thử ba màn hình do assistant chạy trong sandbox
Tool: Claude (Anthropic, claude.ai) — Playwright/Chromium headless và `html5validator` 0.4.2 (Nu Checker) trong môi trường của assistant, không phải máy của nhóm.
Asked for: Kiểm tra liên kết, tràn ngang, 360/768/1280px, W3C, và chỉ báo cáo kiểm tra đã chạy thật.
Kept: Kết quả đo thực tế; không ghi PASS cho mục chưa chạy.
Changed: Kết quả đã chạy: (1) mọi link nội bộ và anchor trỏ tới file/id tồn tại; mỗi trang đúng 1 `h1`; mọi `label for` khớp `id`; không có `<script>`; (2) `scrollWidth > clientWidth` = false và không phần tử nào vượt cạnh phải tại 360/768/1280 cho cả 3 trang (đo trong context bật JS, nhưng trang không có script); (3) nút/link độc lập `a.gs-btn`, `button`, link nav, logo đều cao ≥ 44px tại 360px; (4) Nu Checker HTML: 0 thông báo cho 3 trang; (5) CSS validator báo lỗi với cú pháp CSS hiện đại ở phần nền (`:where`, `margin-inline`, `color-scheme`, `text-wrap`, `aspect-ratio`, `radial-gradient`) — chưa xử lý. Lỗi AI phát hiện qua ảnh chụp của chính assistant và đã sửa: nút "Gửi" bị xuống dòng thành "G ửi" do `overflow-wrap: anywhere` của `.gs-btn` trong hàng hẹp (thêm `white-space: nowrap` riêng cho nút trong `.composer__row`); ô chọn giờ/gói bị cắt chữ (rút ngắn option, đưa giải thích 09:00 không khả dụng ra dòng chữ hiển thị). Chỉ xem screenshot `studio` 1280 (trước khi sửa), `studio` 360 và `booking` 360; chưa xem lại ảnh `index`.
Rejected: Tại thời điểm đó chưa có kết quả cho kiểm tra bàn phím/focus, tỉ lệ tương phản 4.5:1, DevTools Accessibility, kiểm tra tắt JavaScript trên máy nhóm, screenshot trong `screenshots/` và kết quả trong `checks/`. Nhật ký không ghi các mục này là PASS.

## 2026-11-05 — Điểm chưa thống nhất: tên stylesheet và phạm vi file
Tool: Claude (Anthropic, claude.ai).
Asked for: Bổ sung phần việc của assistant vào `AI-LOG.md` và `brief.md`.
Kept: Toàn bộ nội dung các mục và phần brief của thành viên khác (A, C) không đổi.
Changed: Khi đọc `AI-LOG.md` và `brief.md` được gửi sau, assistant ghi nhận `AGENTS.md` bản tải lên quy định `styles.css` là stylesheet chung, trong khi brief và trao đổi của nhóm xác định `style.css` là file chính thức (và chỉ xóa `styles.css` sau khi các trang chuyển xong). Ba trang assistant xuất ra đang dùng `<link rel="stylesheet" href="styles.css">`. Phản hồi khi đó nêu hai phương án đồng bộ tên stylesheet và liên kết, đồng thời ghi rõ assistant chưa đối chiếu CSS thật ở nhánh `feat/gradstudio-foundation-css` mà chỉ dùng file `styles.css` được tải lên. Nội dung này được thêm vào cuối `AI-LOG.md` và Phần III của `brief.md`.
Rejected: Không sửa hay xóa các mục/phần của thành viên khác; không tự đổi tên stylesheet trong lượt này vì chưa được yêu cầu.

## 2026-11-06 — Lê Công Phúc (Thành viên B) nhờ Codex rà soát `studio.html`

- **Yêu cầu:** Kiểm tra `studio.html` theo mẫu manual check của `index.html`, sửa HTML khi thấy lỗi và bổ sung tài liệu.
- **Phát hiện:** Đối chiếu form với PA#1 cho thấy thiếu trường “Loại buổi chụp”. Nhãn “Giờ được chọn” chưa phân biệt giờ chụp với giờ trang điểm. Nút submit mở màn khách hàng nhưng chưa giải thích việc đổi vai trò ngay tại nút.
- **Đã sửa:** Bổ sung trường “Tốt nghiệp cá nhân”, đặt nhãn “Giờ bắt đầu chụp”, liên kết lời giải thích xung đột với ô giờ và ghi rõ đích đến của nút. Bỏ aria-label dư trên đoạn văn giới thiệu Thảo.
- **Kiểm chứng do Codex thực hiện:** Mở file trong Chrome, đo ba viewport, lưu ba ảnh toàn trang khi tắt JavaScript, thử cả hai đường sang booking bằng Enter và gửi HTML đã sửa đến W3C. [Kết quả và giới hạn kiểm tra](checks/manualcheckstudio.md)

## 2026-11-06 — Đặng Hồng Minh (Thành viên C) rà soát, sửa lỗi W3C và kiểm thử `booking.html`
Tool: Antigravity (Google DeepMind).
Asked for: Hướng dẫn thêm ảnh, kiểm tra và sửa lỗi W3C Nu Html Checker trên `booking.html`, cập nhật `brief.md` và `PROTOTYPE.md`, chuẩn hóa bộ ảnh minh chứng responsive.
Kept: Cấu trúc 3 màn hình và dữ liệu kịch bản chuẩn GS-1024 (Nguyễn Thùy Linh, makeup Mai 13:00–14:00, chụp Tuấn 14:00–16:00, 1.800.000đ / 540.000đ / 1.260.000đ), stylesheet chung `styles.css`.
Changed:
1. Phát hiện và sửa lỗi W3C Nu Html Checker tại dòng 20 của `booking.html`: thẻ `<p>` mặc định có vai trò paragraph nên ARIA cấm gán `aria-label` trực tiếp; gỡ bỏ thuộc tính `aria-label` trên `<p class="user-profile">` (đồng bộ với `index.html` và `studio.html`), kiểm tra lại đạt 0 Errors, 0 Warnings và lưu `checks/validator-booking.png`.
2. Tạo hồ sơ kiểm thử chi tiết `checks/manualcheckbooking.md` và liên kết vào `PROTOTYPE.md`.
3. Đồng bộ bộ ảnh responsive full-page khi tắt JavaScript: `screenshots/booking-360.png`, `screenshots/booking-768.png`, `screenshots/booking-1280.png`.
4. Cập nhật `brief.md`: chuyển phần việc của Thành viên C thành Phần IV đặt sau phần Dựng lại 3 màn hình, loại bỏ các chi tiết cũ về `page3.html`.
Rejected: Không thêm `role` giả tạo để giữ `aria-label`, không dùng ảnh bên ngoài chưa xác minh bản quyền.

## 2026-11-06 — Nhóm kiểm tra lại `studio.html`

- **Người thực hiện:** Nhóm GradStudio.
- **Yêu cầu:** Kiểm tra lại các mục trong báo cáo `studio.html` sau lần kiểm chứng ban đầu.
- **Kết quả:** Nhóm xác nhận các mục kiểm tra trong [`checks/manualcheckstudio.md`](checks/manualcheckstudio.md) đều PASS và cập nhật báo cáo theo kết quả đó. Kết quả này là lần kiểm tra lại của nhóm, tách biệt với lượt Codex kiểm tra được ghi ở mục trước.
- **Thông tin chưa ghi:** Thành viên thực hiện, thiết bị và công cụ dùng trong lần kiểm tra lại chưa được cung cấp.

## 2026-11-06 — Rà soát hồ sơ PA#2 và ghi chú ảnh PA#1

- **Công cụ:** Codex.
- **Yêu cầu:** Rà soát câu chữ mang tính khuyến nghị của assistant trong tài liệu; xác nhận các tài liệu phản ánh việc nhóm chủ động không nộp lại ảnh PA#1 theo hướng dẫn của giảng viên.
- **Đã rà soát/cập nhật:** `SELF_ASSESSMENT_REPORT.md`, `README.md`, `AGENTS.md`, `PROTOTYPE.md`, `brief.md`, `docs/pa1/README.md` và `docs/pa1/LINK.md`. Các ghi chú AI lịch sử được giữ trong `AI-LOG.md` và `brief.md`; câu chữ mô tả trạng thái được chuyển sang cách ghi nhận trung tính. Những liên kết ảnh PA#1 đã mất được gỡ khỏi tài liệu tham chiếu.
- **Kiểm tra:** `git diff --check` không báo lỗi định dạng. Không chạy kiểm tra giao diện hoặc W3C trong lượt này.

## 2026-11-06 — Đồng bộ tên thành viên và file HTML trong tài liệu

- **Công cụ:** Codex.
- **Yêu cầu:** Xác nhận Thành viên A là Nguyễn Anh Tuấn phụ trách `index.html`, Thành viên B là Lê Công Phúc phụ trách `studio.html`, Thành viên C là Đặng Hồng Minh phụ trách `booking.html`; rà soát cách gọi M1/M2/M3 trong tài liệu và ghi rõ tên file HTML.
- **Đã cập nhật:** Bổ sung bảng phân công trong `README.md`, `AGENTS.md`, `PROTOTYPE.md`, `brief.md` và `SELF_ASSESSMENT_REPORT.md`; thêm tên người phụ trách vào ba báo cáo kiểm tra; dùng tên file HTML trong phần mô tả hiện hành. Các prompt lịch sử được giữ nguyên và có chú giải ánh xạ Màn 1/2/3 sang file hiện tại.
- **Kiểm tra:** Chưa chạy HTML/W3C vì không sửa mã nguồn trong lượt này.

# AI-LOG.md — GradStudio PA#3

## 2026-11-23 — Khởi tạo hạ tầng và hợp đồng API cho Ngày 1 — Tuấn

- **Công cụ:** GitHub Copilot bằng Copilot SDK trong VS Code; Node.js 24.15.0; npm 11.12.1.
- **Yêu cầu:** Làm phần Nguyễn Anh Tuấn Ngày 1 theo kế hoạch PA#3: di chuyển PA#2 vào React/Vite, cấu hình React Router và proxy API, thiết lập dữ liệu demo, tạo hợp đồng API ban đầu và tài liệu `FRONTEND.md`.
- **Đầu vào đã đọc:** [README.md](README.md), [AGENTS.md](AGENTS.md), [PROTOTYPE.md](PROTOTYPE.md), [PhanCongPA3.md](PhanCongPA3.md), [Rubric PA#3](docs/pa3/PA3-rubric-react-front-end.pdf) và [Final project brief PA#3](docs/pa3/GradStudio-final-project-brief.pdf).
- **Đã giữ lại:** Dữ liệu chuẩn PA#2: Khách Linh, Admin Thảo, makeup artist Mai, photographer Tuấn, Phòng B, booking GS-1024, gói Tốt nghiệp Premium, tổng giá 1.800.000đ, cọc 540.000đ và còn lại 1.260.000đ.
- **Đã thay đổi:**
  - Tạo thư mục [client/](client/) bằng Vite và cài `react-router-dom`.
  - Chuyển các luồng/cảnh PA#2 thành route React cơ bản: `/`, `/studio` và `/bookings/GS-1024`.
  - Cấu hình `/api` proxy tới `http://localhost:3001` cho cả `server.proxy` và `preview.proxy` trong [client/vite.config.js](client/vite.config.js).
  - Sao chép `styles.css` và các ảnh cục bộ vào ứng dụng React.
  - Tạo hợp đồng ban đầu trong [docs/api/README.md](docs/api/README.md) và các file `01-auth.md`, `02-catalogue.md`, `03-chat.md`, `04-bookings.md`, `05-staff.md`, `06-admin.md`.
  - Tạo tài liệu [FRONTEND.md](FRONTEND.md), gồm thông tin nhóm, hướng dẫn chạy, demo accounts và danh sách route ban đầu.
- **Đã kiểm chứng:** Chạy `npm run build` trong `client/` thành công và tạo `client/dist/`. Git working tree sạch sau hai commit.
- **Commit:**
  - `22a47a9` — chuyển prototype PA#2 sang React và cấu hình Vite.
  - `dc6334f` — bổ sung hợp đồng API và tài liệu frontend PA#3 Ngày 1.
- **Chưa thực hiện:** Mock server, tài nguyên `mock/data/`, `AuthContext`, `ProtectedRoute`, API integration, luồng G2–G11 hoàn chỉnh và `contract-check.mjs`. Các phần này thuộc các giai đoạn/Ngày tiếp theo trong kế hoạch.
- **Không thực hiện:** Không thêm nút demo hoặc đổi vai trò giả; không thay đổi dữ liệu mẫu, không tuyên bố booking đã thanh toán hoặc giữ chỗ; không viết mock/API implementation trong lượt Ngày 1.

## 2026-11-24 — Hoàn thiện Mock Server và Contract Checker — Ngày 2 — Tuấn

- **Công cụ:** GitHub Copilot bằng Copilot SDK trong VS Code; Node.js 24.15.0.
- **Yêu cầu:** Làm phần Nguyễn Anh Tuấn Ngày 2 theo [PhanCongPA3.md](PhanCongPA3.md): hoàn thiện dữ liệu mock, server giả lập Node built-in, bốn mode vận hành và công cụ kiểm tra hợp đồng.
- **Đã thay đổi:**
  - Tạo dữ liệu mock tại [mock/data/](mock/data/) cho tài khoản, catalogue, hội thoại, booking, staff và admin.
  - Tạo [mock/server.mjs](mock/server.mjs) với các mode `normal`, `slow`, `error`, `empty`.
  - Hỗ trợ đăng nhập bằng 5 tài khoản demo, header `Authorization: Bearer`, xung đột 09:00 và dữ liệu booking `GS-1024`.
  - Tạo [tools/contract-check.mjs](tools/contract-check.mjs) để gửi các ví dụ trong `docs/api/*.md` đến mock và so sánh status code, cấu trúc field.
  - Cập nhật quy tắc PA#3 trong [AGENTS.md](AGENTS.md).
  - Đồng bộ ví dụ hợp đồng chat khi 09:00 bị xung đột và sửa ví dụ upload preview.
- **Đã kiểm chứng:**
  - Mock `normal`: `node tools/contract-check.mjs --base http://localhost:3001 --repo .` đạt `PASS 100% - 0 FAIL`.
  - Mock `slow` tại port 3002: endpoint catalogue phản hồi sau khoảng 2 giây.
  - Mock `error` tại port 3004: endpoint catalogue trả HTTP 500.
  - Mock `empty` tại port 3003: catalogue trả các danh sách rỗng.
  - Smoke test login, catalogue và clash check; `git diff --check` không phát hiện lỗi định dạng.
- **Commit:** `86227f8` — bổ sung mock server và contract checker PA#3 Ngày 2.
- **Chưa thực hiện:** Chưa thêm `AuthContext`, `ProtectedRoute`, UI component loading/error/empty hoặc kết nối React với API; việc này thuộc Ngày 3 và các luồng tiếp theo.
- **Không thực hiện:** Không thêm dependency hoặc backend ngoài; mock chỉ dùng Node built-in modules và không giả thanh toán, giữ lịch hoặc đồng bộ dữ liệu thật.

## 2026-11-24 — Chỉnh quy trình nghiệm thu theo nguyên tắc contract-first

- **Công cụ:** GitHub Copilot bằng Copilot SDK trong VS Code; Node.js 24.15.0; Git.
- **Yêu cầu:** Sau khi rà lại `PhanCongPA3.md`, điều chỉnh việc triển khai để hợp đồng API được commit riêng trước các thay đổi mock tiếp theo; nâng checker cho đúng các điều kiện nghiệm thu được mô tả trong tài liệu contract-check.
- **Đã thay đổi:** Commit riêng các cập nhật hợp đồng trong `b91fdab` và `56e89a4`; sau đó mới commit đồng bộ dữ liệu/server mock và viết lại checker trong `b326226`. Checker hiện nhận HTTP và upload `curl`, so khớp tên field hai chiều, kiểm tra ví dụ có đủ trong bảng endpoint và báo khác biệt giá trị dưới dạng note khi không bật `--strict-values`.
- **Đã kiểm chứng:** `node tools/contract-check.mjs --base http://localhost:3001 --repo .` đạt `PASS 100% - 0 FAIL (22 examples, 22 endpoints)` trên mock mới khởi động. Đã kiểm tra mode `slow` (khoảng 2 giây), `empty` (các endpoint danh sách trả `[]`), `error` (HTTP 500) và xác nhận login vẫn dùng được ở mode error. `node --check` cho server/checker và `git diff --check` đều thành công.
- **Giới hạn lịch sử:** Các commit cũ `22a47a9` (React scaffold) và `86227f8` (mock ban đầu) đã tồn tại trước khi hoàn thiện contract. Không sửa/rebase/squash lịch sử vì PhanCongPA3.md cấm làm sai lệch tiến trình commit; do đó không thể khẳng định toàn bộ lịch sử từ đầu đã đúng thứ tự. Các commit chỉnh sửa trong lượt này giữ thứ tự contract rồi mới đến mock. React scaffold ban đầu chưa gọi API.

## 2026-11-24 — Rà soát hợp đồng API luồng Khách hàng & Thanh toán (Ngày 1–2) — Phúc

- **Công cụ:** Antigravity (Google DeepMind); Node.js 24.15.0.
- **Yêu cầu:** Thực hiện phần việc của Lê Công Phúc ở Ngày 1–2 theo kế hoạch PA#3 và quyết định chốt của Tech Lead: review toàn bộ hợp đồng API (`docs/api/`) và dữ liệu mẫu (`mock/data/`, `mock/server.mjs`) cho luồng Khách hàng & Thanh toán (G3, G6-Customer, G7, G9) trước khi code React.
- **Phát hiện khi review:**
  1. `GET /api/conversations` đang lược bỏ `messages` và `proposal`, khiến giao diện chat G3 và bước phản hồi đề xuất G6 không đọc được tin nhắn và đề xuất giờ từ API.
  2. Luồng thanh toán cọc 30% (G7) và 70% còn lại (G9) cần tách rõ bước khởi tạo URL thanh toán (`POST /api/bookings/:id/deposit/payment`, `POST /api/bookings/:id/payments/remaining`) với bước xác nhận kết quả từ cổng thanh toán thử nghiệm; chỉ chuyển sang `Đã đặt lịch` sau khi xác nhận thành công.
  3. Dữ liệu booking `GS-1024` thiếu schema `reminders` (thời điểm gửi, kênh gửi, người nhận, trạng thái email), `maxEditedPhotos`, `previewPhotos` và `selectedPhotoIds`; thao tác khách hàng bấm "Nhận ảnh" ở G9 cần endpoint riêng thay vì dùng chung `PATCH /api/bookings/:id` của Admin.
- **Đã thay đổi:**
  - Cập nhật hợp đồng API tại [docs/api/README.md](docs/api/README.md), [docs/api/03-chat.md](docs/api/03-chat.md), [docs/api/04-bookings.md](docs/api/04-bookings.md), [docs/api/05-staff.md](docs/api/05-staff.md) và [docs/api/06-admin.md](docs/api/06-admin.md): bổ sung `POST /api/bookings/:id/payments/confirm` và `POST /api/bookings/:id/receive`, chuẩn hóa schema `messages`, `proposal`, `reminders`, `previewPhotos`, `selectedPhotoIds` và hành vi `decline` giữ hội thoại ở trạng thái `Đang tư vấn`.
  - Cập nhật dữ liệu mẫu tại [mock/data/bookings.json](mock/data/bookings.json) và đồng bộ logic xử lý trong [mock/server.mjs](mock/server.mjs).
  - Cập nhật [FRONTEND.md](FRONTEND.md) làm rõ 5 tài khoản demo ứng với 4 role đăng nhập và bảng route mục tiêu.
- **Đã kiểm chứng:** Khởi động mock server mới và chạy `node tools/contract-check.mjs --strict-values` đạt `PASS 100% - 0 FAIL (24 examples, 24 endpoints)`.