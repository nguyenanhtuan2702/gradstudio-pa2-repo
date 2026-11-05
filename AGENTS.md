# AGENTS.md – Quy tắc dự án GradStudio PA#2

> **Đọc toàn bộ file này trước khi tạo hoặc sửa mã nguồn trong repository.**
> Đây là quy tắc chung của nhóm dành cho AI coding assistant. Không tự ý bỏ qua yêu cầu của giảng viên hoặc brief GradStudio mới. Khi gặp mâu thuẫn hoặc thiếu thông tin nghiệp vụ, phải nêu rõ và hỏi nhóm; không tự suy diễn.

## 1. Tài liệu căn cứ và mục tiêu

- PA#2 là prototype tĩnh bằng HTML/CSS của ba màn hình Main Flow. Tiếp tục dùng cùng nhóm và repository của PA#1.
- Dùng đồng thời hai tài liệu do giảng viên cung cấp:
  - Rubric **PA#2 — Responsive prototype**: quy định tiêu chí chấm, responsive, HTML, accessibility, minh chứng và cách nộp PA#2.
  - **GradStudio — final project brief**: quy định sản phẩm GradStudio, luồng nghiệp vụ, dữ liệu mẫu và các điểm phải sửa trên ba màn hình.
- Khi thực hiện PA#2, phải đáp ứng cả rubric PA#2 và các yêu cầu cho ba màn hình trong GradStudio final project brief. Không tự thay đổi nội dung nghiệp vụ được quy định trong brief.
- Đây là **responsive static prototype**, không phải website vận hành hoàn chỉnh. Nội dung mẫu được viết trực tiếp trong HTML; không giả vờ rằng dữ liệu đã được lưu, thanh toán hoặc đồng bộ thật.
- Brief mới áp dụng làm nền tảng cho PA#2 đến PA#6. Phạm vi triển khai của PA#2 vẫn chỉ là ba màn hình được chỉ định ở Mục 2; không tự mở rộng thành sản phẩm hoàn chỉnh.

## 2. Ba màn hình và tên file bắt buộc

Dùng đúng tên file sau; không tiếp tục dùng `page2.html` hoặc `page3.html`:

1. `index.html` – **Screen 1: Services and chat (Customer)**. Linh xem danh mục dịch vụ và hỏi studio về lịch 09:00.
2. `studio.html` – **Screen 2: Advice and clash handling (Admin)**. Admin Thảo xem hội thoại, xử lý xung đột lịch, thống nhất thời gian với Linh và chuẩn bị tạo booking.
3. `booking.html` – **Screen 3: Review the appointment and pay the deposit (Customer)**. Linh xem lịch đã thống nhất và booking đang chờ cọc 30%.

- `index.html` là trang đầu tiên.
- Tên file, liên kết trong HTML, README, PROTOTYPE.md, screenshot và các tài liệu liên quan phải được đồng bộ theo ba tên file này.
- Không tạo thêm trang HTML ngoài ba màn hình PA#2, trừ khi giảng viên yêu cầu rõ ràng.

## 3. Câu chuyện và dữ liệu chuẩn phải thống nhất

Mọi trang phải dùng cùng một câu chuyện, tên, thời gian, gói dịch vụ, giá và mã booking:

- Khách hàng: **Nguyễn Thùy Linh**.
- Admin: **Thảo**.
- Make-up artist: **Mai**.
- Photographer: **Tuấn**.
- Ngày chụp: **Thứ Bảy, 24/10/2026**.
- Yêu cầu ban đầu: make-up và chụp lúc **09:00**.
- Xung đột: Mai bận **08:00–12:00**, nên không thể nhận make-up lúc 09:00.
- Thời gian được đề xuất và Linh đồng ý:
  - Make-up với Mai: **13:00–14:00**.
  - Chụp với Tuấn tại **Phòng B**: **14:00–16:00**.
- Gói: **Gói Tốt nghiệp Premium**, gồm 2 giờ chụp và 30 ảnh chỉnh.
- Loại buổi chụp: **Tốt nghiệp cá nhân**.
- Tổng giá: **1.800.000đ**.
- Cọc 30%: **540.000đ**.
- Còn lại 70%: **1.260.000đ**, thanh toán sau buổi chụp.
- Mã booking minh họa: **GS-1024**.

Không đổi các thông tin trên giữa ba trang. Phân biệt rõ 13:00 là giờ bắt đầu make-up, còn 14:00 là giờ bắt đầu chụp.

## 4. Trạng thái và trạng thái hiển thị cố định trên từng trang

### 4.1. Tên trạng thái dùng thống nhất

**Trạng thái hội thoại:**
- `Chưa trả lời`
- `Đang tư vấn`
- `Đã chốt lịch`
- `Hoàn thành`

**Trạng thái booking:**
- `Chờ cọc 30%`
- `Đã đặt lịch`
- `Hoàn thành`

Ở Screen 3, có thể hiển thị đầy đủ `Đã thống nhất lịch · Chờ cọc 30%` theo brief.

Không dùng tên trạng thái thay thế hoặc không thống nhất như `Đã xác nhận` cho hội thoại.

### 4.2. Screen 1 – `index.html`

- Nội dung hiển thị trên giao diện (điều hướng, nhãn, nút, trạng thái và ghi chú) phải bằng tiếng Việt như prototype GradStudio.
- Giới thiệu studio và giữ nội dung portfolio/ảnh mẫu, đánh giá khách hàng, loại buổi chụp và gói dịch vụ theo thiết kế PA#1 khi các nội dung đó xuất hiện trên màn hình.
- Hiển thị ba dịch vụ và giá tham khảo:
  - Kỷ yếu lớp: từ **350.000đ/người**.
  - Tốt nghiệp: từ **1.800.000đ**.
  - Chân dung/CV: từ **690.000đ**.
- Chat phải thể hiện đúng câu hỏi của Linh: **“Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?”**
- Tin nhắn phản hồi của studio thể hiện đang kiểm tra lịch, ví dụ: **“Để mình kiểm tra lịch cho bạn nhé.”**
- Đây là trạng thái câu hỏi ban đầu; không hiển thị trước kết quả thống nhất 13:00/14:00 ở Screen 1.
- Phần quy trình không được nói hoặc tạo cảm giác rằng studio giữ chỗ ngay khi hai bên chốt giờ. Chỉ giữ khung giờ sau khi thanh toán cọc thành công và hệ thống kiểm tra lại tài nguyên.
- Khung chat nổi hiện tại đang có nguy cơ che nội dung. Ở viewport **360px**, chat không được che bất kỳ nội dung, nút hoặc liên kết nào. Ưu tiên đưa chat vào luồng nội dung bình thường trên mobile; chỉ dùng vị trí nổi khi đã chứng minh không che nội dung ở kích thước đó.

### 4.3. Screen 2 – `studio.html`

Trang phải thể hiện **trạng thái sau khi Linh đã đồng ý thời gian mới**, không phải trạng thái trước khi tư vấn:

- Có ba khu vực chính:
  1. Danh sách hội thoại.
  2. Hội thoại với Linh và toàn bộ form **Booking mới** đặt bên dưới.
  3. Lịch tài nguyên và các thời gian đề xuất.
- Hội thoại của Linh ở trạng thái **`Đã chốt lịch`**.
- Thời gian 14:00 được chọn; dữ liệu thể hiện make-up 13:00–14:00 và buổi chụp 14:00–16:00.
- Nút/hành động **`Tạo booking`** phải ở trạng thái enabled vì Linh đã đồng ý.
- Phải giải thích rõ 09:00 không khả dụng vì Mai bận 08:00–12:00; không chỉ dùng màu hoặc họa tiết để biểu thị xung đột.
- Lịch tài nguyên phải đọc được đầy đủ tên khách, tên dịch vụ, thời gian và trạng thái ở mọi viewport; không cắt chữ kiểu `Linh · yê…` hoặc `Tốt nghiệ…`.
- Chat và toàn bộ form Booking mới phải đọc được bằng cách cuộn trang. Không đặt chúng trong một cột có scrollbar riêng khiến người xem không thể nhìn thấy cả chat và form bằng cách cuộn trang thông thường.
- Bố cục mobile phải xếp các khu vực theo thứ tự hợp lý; không cố thu nhỏ ba cột desktop xuống 360px.

### 4.4. Screen 3 – `booking.html`

- Hiển thị booking **GS-1024** với trạng thái **`Đã thống nhất lịch · Chờ cọc 30%`**.
- Hiển thị gói, ngày, make-up 13:00–14:00, buổi chụp 14:00–16:00, giá 1.800.000đ, cọc 540.000đ và còn lại 1.260.000đ.
- Timeline phải gạch ngang mốc 09:00 ban đầu và thể hiện đúng hai mốc make-up, chụp đã thống nhất; trạng thái 09:00 không khả dụng không được chỉ biểu thị bằng màu.
- Week view đánh dấu ngày 24/10/2026 theo brief.
- Nút **`Thanh toán cọc 30%`** phải hiển thị disabled trong prototype PA#2 và có ghi chú ngắn, nhìn thấy được, rằng thanh toán chưa khả dụng trong prototype.

### 4.5. Quy tắc giữ chỗ và thanh toán

- Việc Linh đồng ý giờ trong chat **không đồng nghĩa** booking đã giữ chỗ.
- Booking chỉ chuyển từ `Chờ cọc 30%` sang `Đã đặt lịch` sau khi tiền cọc được thanh toán thành công và hệ thống kiểm tra lại tài nguyên.
- Chỉ sau bước đó mới giữ slot, phân công nhân sự và thiết lập các mốc chuẩn bị.
- PA#2 không tích hợp cổng thanh toán thật. Không tuyên bố đã thanh toán, đã giữ chỗ hoặc đã đồng bộ dữ liệu.

## 5. Điều hướng, vai trò và các điều khiển không khả dụng

### 5.1. Điều hướng Main Flow

- Mọi điều hướng giữa ba trang phải dùng liên kết tương đối tới đúng file tồn tại: `index.html`, `studio.html`, `booking.html`.
- Dùng `<a href="...">` cho điều hướng. Có thể dùng submit button của form với `action="..."` khi đúng ngữ nghĩa.
- Không dùng đường dẫn tuyệt đối bắt đầu bằng `/`, `href="#"`, URL chỉ hoạt động trên server hoặc JavaScript `onclick` để thay thế điều hướng.
- Luồng đổi vai trò hai lần và PA#2 không có màn hình đăng nhập. Vì vậy, các liên kết chuyển vai trò phải có nhãn nói rõ ai tiếp tục, ví dụ **“Nhân viên studio: mở hội thoại này”** khi đi từ Screen 1 sang Screen 2. Không để người dùng hiểu nhầm rằng cùng một tài khoản khách hàng tự chuyển sang giao diện Admin.
- Từ Screen 2, đường dẫn tiếp tục sang Screen 3 phải được đặt tên rõ ràng, ví dụ **“Mở booking GS-1024 – Khách hàng tiếp tục”**. Đây chỉ là điều hướng giữa các trạng thái minh họa, không phải thao tác lưu booking thật.
- Liên kết `Lịch chụp của tôi` trên Screen 1 có thể mở `booking.html` vì đây là màn hình khách hàng.

### 5.2. Các thành phần demo phải bỏ

Không đưa vào giao diện sản phẩm các điều khiển demo sau:
- `Màn 1 / Màn 2 / Màn 3`.
- `Đặt lại demo`.
- `Mô phỏng phản hồi của Linh`.
- `Mô phỏng thanh toán`.

Đây là tiện ích của prototype gốc, không phải điều khiển sản phẩm GradStudio.

### 5.3. Hành động không có trang đích

Các hành động như gửi tin nhắn, thanh toán cọc 30% và hành động tương tự không có màn hình đích trong PA#2:
- Hiển thị dưới dạng button **disabled**.
- Có ghi chú ngắn, rõ ràng và **hiển thị trực tiếp** giải thích chức năng chưa khả dụng trong prototype.
- Không dùng link giả hoặc nút trông như đang hoạt động.

Các mục không mở được màn hình trong PA#2 như `Booking`, `Lịch studio`, `Tài nguyên`, `Nhân sự`, `Xem đường đi`, `Ảnh đã chọn` và các link footer không có đích phải được xóa hoặc hiển thị rõ là chưa khả dụng. Không để chúng trông như liên kết đang hoạt động.

## 6. Hình ảnh, avatar và quyền sử dụng

- Brief mới cảnh báo quyền sử dụng hình ảnh người thật trong hero, service cards và avatar của prototype gốc chưa được xác minh.
- Không tiếp tục sử dụng ảnh người có thể nhận diện nếu nhóm chưa xác minh quyền sử dụng.
- Thay bằng một trong các phương án:
  - Hình minh họa không mô phỏng người thật có thể nhận diện.
  - Avatar chữ cái/initials hoặc biểu tượng trung tính.
  - Ảnh có giấy phép sử dụng phù hợp và nhóm ghi rõ nguồn/giấy phép.
- Nếu dùng ảnh được cấp phép, ghi tên ảnh, nguồn và thông tin giấy phép trong `PROTOTYPE.md`.
- Không hotlink ảnh từ website bên ngoài. Ưu tiên lưu tài nguyên hợp lệ trong repository, ví dụ `assets/images/`.
- Mọi ảnh có ý nghĩa phải có `alt` mô tả phù hợp; ảnh trang trí dùng `alt=""`.

## 7. Công nghệ và cấu trúc CSS/JavaScript

- Dùng HTML5 và CSS3 thuần (**plain CSS**). Không dùng Bootstrap, Tailwind, Bulma hoặc CSS framework khác.
- Dùng stylesheet chung **`styles.css`** cho cả ba trang, đúng với repository hiện tại.
- Trước khi tạo token hoặc component CSS mới, kiểm tra `styles.css`; tái sử dụng các custom properties và class pattern hiện có. Không tự tạo một hệ token thứ hai hoặc đổi tên stylesheet tùy tiện.
- Không dùng React, Vue, Angular, Svelte hoặc JavaScript framework; không thêm thư viện giao diện, icon, package hay dependency bên ngoài.
- Không dùng CDN, font tải từ Internet hoặc tài nguyên từ xa làm điều kiện để giao diện hiển thị đúng.
- Trang phải mở được trực tiếp từ file HTML mà không yêu cầu Node.js, npm, bundler hoặc build step.
- Không thêm JavaScript. Nội dung, trạng thái chính và điều hướng phải hoạt động khi JavaScript bị tắt; ưu tiên HTML/CSS tĩnh cho ba màn hình PA#2.
- Không dùng JavaScript để giả lập gửi tin nhắn, thanh toán, tạo dữ liệu đã lưu, xác nhận booking hoặc đồng bộ giữa các trang. Những hành động không có trang đích phải được thể hiện disabled và có ghi chú nhìn thấy được.

## 8. Nhận diện và Design System GradStudio

- Giữ nhận diện GradStudio theo PA#1: thanh lịch, nền kem/trắng ấm, nâu trầm và điểm nhấn nâu vàng.
- Typography có thể dùng serif cho logo/tiêu đề và sans-serif cho nội dung, biểu mẫu, điều khiển.
- Dùng các CSS custom properties trong `:root` của `styles.css` làm nguồn màu chung:
  - `--color-background: #faf6f0`
  - `--color-surface: #fffdfa`
  - `--color-text: #2c2219`
  - `--color-muted: #65584c`
  - `--color-accent: #806044`
  - `--color-border: #e7ddd1`
- Khai báo và tái sử dụng spacing tokens theo bội số 4px trong `styles.css`: `--space-1: 0.25rem`, `--space-2: 0.5rem`, `--space-3: 0.75rem`, `--space-4: 1rem`, `--space-6: 1.5rem`, `--space-8: 2rem`, `--space-12: 3rem`, `--space-16: 4rem`.
- Ưu tiên dùng spacing tokens cho margin, padding và gap; chỉ dùng giá trị ngoài scale khi thật sự cần cho đường viền, kích thước icon hoặc căn chỉnh chi tiết.
- Body text tối thiểu **16px**; chữ thường và chữ trên nút đạt tỷ lệ tương phản tối thiểu **4.5:1** với nền tương ứng.
- Mỗi trang có một khu vực/nội dung thị giác chính rõ ràng. Không làm mọi thành phần nổi bật ngang nhau.
- Có thể thay đổi cách sắp xếp, kích thước, khoảng cách và thứ tự hiển thị để phù hợp mobile/tablet; không cần giữ từng pixel của PA#1.

## 9. Responsive và bố cục

Thiết kế mobile-first. Hai breakpoint dùng chung trong stylesheet là **768px** và **1200px**; phải kiểm tra chính xác các viewport 360px, 768px và 1280px.

- Mobile `0–767px`: nội dung xếp dọc; các điều khiển dễ chạm; không để chat nổi che nội dung.
- Tablet `768–1199px`: tổ chức lại thành một hoặc hai cột tùy nội dung; không ép bố cục desktop vào màn hình hẹp.
- Desktop `1200px trở lên`: có thể dùng nhiều cột theo thiết kế.
- Không có horizontal scroll, nội dung bị cắt hoặc các thành phần chồng lấn ở 360px, 768px và 1280px.
- Không dùng fixed width cho wrapper, cột hoặc card theo cách làm tràn viewport. Ưu tiên `%`, `max-width`, `minmax(0, 1fr)`, Flexbox và CSS Grid.
- Với Grid/Flexbox, cân nhắc `min-width: 0`, `minmax(0, 1fr)` và `overflow-wrap: anywhere` cho nội dung dài.
- Ảnh phải co theo khung chứa, thường dùng `max-width: 100%; height: auto;`.
- Tên khách, tên gói, nội dung chat và thông tin lịch phải xuống dòng thay vì đẩy rộng trang.
- Ở 360px, button và link đứng độc lập phải cao tối thiểu **44px**. Link nằm trong câu văn được miễn yêu cầu này theo rubric.
- Screen 2 phải xếp khu hội thoại, form booking và lịch tài nguyên theo thứ tự hợp lý trên mobile; không cố thu nhỏ ba cột desktop xuống 360px.
- Không dùng `overflow-x: hidden` trên `html`, `body` hoặc wrapper để che lỗi tràn.
- Không chỉ đổi zoom trình duyệt; phải dùng Device Toolbar với đúng viewport.

## 10. HTML và Accessibility

Mỗi trang phải tuân thủ:

- Có `<!doctype html>`, `<html lang="vi">`, `<meta charset="UTF-8">` và `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- Dùng semantic landmarks phù hợp: `<header>`, `<nav>`, `<main>`, `<footer>`; dùng `<section>`, `<article>`, `<aside>` khi đúng ngữ nghĩa.
- Mỗi trang có đúng **một `<h1>`**; heading theo thứ tự, không bỏ cấp tùy tiện.
- Dùng `<a href="...">` cho điều hướng sang trang khác và `<button type="button">` cho hành động tại chỗ.
- Mỗi `input`, `select`, `textarea` phải có `<label>` **hiển thị** và liên kết đúng bằng `for`/`id`; placeholder không thay thế label. Không dùng class visually-hidden cho label bắt buộc này.
- Nút và link phải có accessible name dễ hiểu; thành phần tương tác phải có thể nhận biết bằng bàn phím và có focus indicator rõ.
- Ảnh có ý nghĩa phải có `alt` mô tả; ảnh trang trí dùng `alt=""`.
- Không dùng màu sắc làm cách duy nhất để biểu thị trạng thái hoặc xung đột lịch.
- Không tạo form gửi dữ liệu tới backend không tồn tại.
- Mục tiêu W3C Nu Checker: **0 errors cho từng trang**. Warnings phải được xem xét, không bỏ qua nếu ảnh hưởng hiển thị hoặc khả năng truy cập.
- Kiểm tra cả ngữ nghĩa trong DevTools → Elements → Accessibility; HTML hợp lệ không tự động có Accessibility tốt.
- Kiểm tra thao tác bằng bàn phím: Tab để chuyển focus, Enter để mở link/kích hoạt phù hợp, Space/Enter cho button theo ngữ nghĩa.

## 11. Phạm vi không triển khai trong PA#2

Không tạo hoặc giả lập các chức năng vận hành sau:
- Backend, API, database, đăng nhập/xác thực, CRUD hoặc đồng bộ dữ liệu.
- Thanh toán thật/cổng thanh toán, thu thập thông tin thanh toán hoặc giao dịch tiền thật.
- Gửi tin nhắn chat thật; tự động đồng bộ Zalo/Facebook; SMS reminders.
- Tự động giữ slot, phân công nhân viên, thay đổi lịch hoặc gửi email reminders bằng hệ thống thật.
- Quản lý marketplace nhiều studio, nhiều chi nhánh, crawling giá/review/availability từ nguồn ngoài.
- Ứng dụng iOS/Android riêng; website responsive là giao diện sử dụng trên điện thoại.
- AI chỉnh sửa ảnh hoặc nhận diện khuôn mặt.

Các chức năng trên thuộc phạm vi sản phẩm dài hạn hoặc milestone khác; PA#2 chỉ trình bày ba trạng thái tĩnh được brief quy định.

## 12. Tài liệu và minh chứng của PA#2

Repository cần giữ/cập nhật các tài liệu sau:

- `README.md`: cách mở và cấu trúc repository.
- `AGENTS.md`: file quy tắc ở thư mục gốc.
- `index.html`, `studio.html`, `booking.html` và `styles.css`.
- `docs/pa1/`: lưu các màn hình PA#1 và tài liệu so sánh.
- `PROTOTYPE.md`: thông tin nhóm; cách mở; bảng ba màn hình và luồng liên kết; **Changed since PA#1**; **Not wired yet**; CSS/spacing/breakpoints; nguồn và giấy phép ảnh nếu dùng ảnh được cấp phép; giải thích các thay đổi theo final project brief.
- `brief.md`: ghi lại prompt/thông tin thực tế đã đưa cho AI, theo đúng thứ tự; đây không phải bản chép lại đề bài của giảng viên.
- `AI-LOG.md`: ghi từng task/page, công cụ và yêu cầu thật, điều AI làm sai/được sửa/bị từ chối, kiểm tra nào phát hiện và kết quả thực tế. Không bịa trải nghiệm hoặc test.
- `SELF_ASSESSMENT_REPORT.md`: một dòng cho mỗi tiêu chí rubric, điểm tự chấm, đường dẫn bằng chứng và phần việc chưa hoàn thành.
- `screenshots/`: screenshot **full-page** mỗi trang tại 360px, 768px, 1280px khi JavaScript tắt. Tên file: `index-360.png`, `index-768.png`, `index-1280.png`; `studio-360.png`, `studio-768.png`, `studio-1280.png`; `booking-360.png`, `booking-768.png`, `booking-1280.png`.
- `checks/`: kết quả W3C cho từng trang, ví dụ `validator-index.png` hoặc `.txt`, `validator-studio.png` hoặc `.txt`, `validator-booking.png` hoặc `.txt`.

Không tạo bằng chứng giả. Nếu một kiểm tra chưa chạy, ghi rõ chưa chạy thay vì ghi PASS.

## 13. Quy trình làm việc cho AI coding assistant

### Trước khi sửa

1. Đọc `README.md`, file `AGENTS.md` này và yêu cầu/tài liệu được giao.
2. Đọc đúng phần của `GradStudio-final-project-brief.pdf` và rubric PA#2 liên quan đến trang đang sửa.
3. Xem ảnh PA#1 và `docs/pa1/LINK.md` khi cần đối chiếu.
4. Kiểm tra `styles.css`, asset và cấu trúc hiện tại trước khi tạo file hoặc token mới.
5. Xác định rõ trang/tệp được giao; không tự ý sửa phần của thành viên khác hoặc thay đổi stack chung.
6. Nếu yêu cầu chưa đủ hoặc mâu thuẫn, nêu giả định và xin nhóm thống nhất; không tự suy diễn nghiệp vụ.

### Khi thực hiện

1. Chỉ sửa trong phạm vi trang/tệp được giao; ưu tiên thay đổi tối thiểu và tái sử dụng CSS tokens/component pattern.
2. Giữ nguyên dữ liệu chuẩn, trạng thái từng màn hình và quy tắc giữ chỗ/thanh toán ở Mục 3–4.
3. Kiểm tra mọi ảnh có người thật theo Mục 6 trước khi giữ lại.
4. Dùng link tương đối thật cho Main Flow; bỏ các điều khiển demo và xử lý các hành động không có trang đích theo Mục 5.
5. Không thêm dependency, framework, font/CDN hoặc backend.

### Sau khi thực hiện

1. Nêu rõ file nào đã tạo/sửa và các thay đổi chính.
2. Kiểm tra đường dẫn stylesheet, ảnh và liên kết giữa ba trang.
3. Kiểm tra 360px, 768px, 1280px trên từng trang.
4. Kiểm tra với JavaScript tắt; nội dung và điều hướng chính vẫn phải dùng được.
5. Chạy W3C Nu Checker cho trang đã sửa; lưu kết quả nếu đã thực sự chạy.
6. Kiểm tra heading, landmarks, label hiển thị, alt, accessible name, keyboard focus và contrast.
7. Không báo “đã kiểm tra”, “đạt 0 lỗi” hoặc “không tràn” nếu chưa thực sự chạy kiểm tra.
8. Nêu rõ lỗi còn lại và cách tái kiểm tra.
9. Gợi ý thông tin thực tế cần ghi vào `brief.md`/`AI-LOG.md`; không tự viết thay trải nghiệm hoặc kết quả của thành viên.

## 14. Checklist hoàn thành cho từng trang

### Đúng brief và dữ liệu

- [ ] Đúng một trong ba màn hình và đúng tên file mới.
- [ ] Trạng thái hiển thị đúng với trạng thái được quy định cho màn hình đó.
- [ ] Tên, ngày, giờ, dịch vụ, phòng, giá và booking code khớp dữ liệu chuẩn.
- [ ] Không tuyên bố đã giữ lịch trước khi cọc thành công.
- [ ] Không còn nút demo, link giả hoặc thành phần điều hướng không có đích.
- [ ] Hành động không có trang đích là disabled và có ghi chú hiển thị.
- [ ] Không sử dụng ảnh người thật khi chưa xác minh quyền; nguồn ảnh licensed được ghi trong PROTOTYPE.md.

### Responsive

- [ ] Đã kiểm tra ở 360px, 768px và 1280px.
- [ ] `document.documentElement.scrollWidth > document.documentElement.clientWidth` trả về `false` ở từng kích thước.
- [ ] Không có phần tử bị cắt khỏi cạnh phải viewport. Có thể kiểm tra bằng:

```js
[...document.querySelectorAll('body *')].filter(
  element => element.getBoundingClientRect().right > document.documentElement.clientWidth
)
```

- [ ] Kết quả là `[]`, ngoại trừ nội dung nằm trong vùng cuộn ngang riêng được phép (nếu có và đúng brief).
- [ ] Không dùng `overflow-x: hidden` để che lỗi.
- [ ] Nút/link độc lập cao tối thiểu 44px tại 360px.
- [ ] Nội dung dài xuống dòng, ảnh không tràn, chat không che nội dung trên M1.
- [ ] Trên M2, chat và form Booking mới đều đọc được bằng cách cuộn trang; lịch tài nguyên đọc được đầy đủ.

### HTML, Accessibility và thiết kế

- [ ] W3C Nu Checker có 0 errors.
- [ ] Có landmarks phù hợp, đúng một `h1`, heading không nhảy cấp.
- [ ] Input/select/textarea có label hiển thị.
- [ ] Ảnh có alt phù hợp; nút/link có accessible name.
- [ ] Có focus indicator và thao tác bàn phím phù hợp.
- [ ] Body text từ 16px; chữ/nút đạt tương phản tối thiểu 4.5:1.
- [ ] Spacing dùng scale chung; không có `!important` trong CSS tự viết.
- [ ] DevTools Accessibility đã được xem xét.

### Minh chứng và tài liệu

- [ ] Có screenshot full-page ba kích thước khi JavaScript tắt.
- [ ] Có W3C result trong `checks/` cho trang.
- [ ] Các thay đổi so với PA#1 và brief mới được ghi vào PROTOTYPE.md.
- [ ] Prompt, lỗi AI, cách phát hiện và cách sửa thực tế được ghi vào `brief.md`/`AI-LOG.md` đúng vai trò.
- [ ] Commit history phản ánh đúng người thực hiện và thay đổi thực tế.

---

**Nguyên tắc cuối cùng:** Làm đúng ba màn hình `index.html`, `studio.html`, `booking.html`; dùng dữ liệu và trạng thái thống nhất theo GradStudio final project brief; xử lý rõ quyền sử dụng hình ảnh, điều hướng đổi vai trò, trạng thái chờ cọc và giới hạn của prototype tĩnh; đồng thời đáp ứng responsive, semantic HTML, accessibility và minh chứng theo rubric PA#2.
