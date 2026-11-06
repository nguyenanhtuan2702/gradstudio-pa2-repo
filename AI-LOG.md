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
