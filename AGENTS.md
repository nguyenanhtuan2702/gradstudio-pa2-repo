# AGENTS.md – Quy tắc dự án GradStudio PA#2

> **Đọc toàn bộ file này trước khi tạo hoặc sửa mã nguồn trong repository.**
> Đây là quy tắc chung của nhóm dành cho AI coding assistant. Không tự ý bỏ qua yêu cầu của giảng viên hoặc brief GradStudio mới. Khi gặp mâu thuẫn hoặc thiếu thông tin nghiệp vụ, phải nêu rõ và hỏi nhóm; không tự suy diễn.

## 1. Tài liệu căn cứ và mục tiêu

- PA#2 gồm ba màn hình Main Flow. Nhóm được tự quyết định thiết kế, bố cục, nội dung trình bày và màu sắc; các hình màn hình trong brief là điểm khởi đầu để hiểu tính năng, không phải mẫu bắt buộc phải sao chép.
- Giảng viên cho phép chọn static HTML/CSS hoặc React. Repository hiện chọn static HTML/CSS; không tự chuyển stack nếu nhóm chưa thống nhất.
- Dùng các tài liệu và cập nhật mới nhất do giảng viên cung cấp:
  - Rubric **PA#2 — Responsive prototype**: quy định tiêu chí chấm, responsive, HTML, accessibility, minh chứng và cách nộp PA#2.
  - **GradStudio — final project brief**: quy định sản phẩm GradStudio, luồng nghiệp vụ, dữ liệu mẫu và các điểm phải sửa trên ba màn hình.
- Thông báo mới của giảng viên thay thế chỉ dẫn cũ “You do not design your own three screens”. Dùng brief và rubric PA#2 bản cập nhật cùng danh sách **Fix these** mới nhất; hạn nộp không thay đổi.
- Đáp ứng các tính năng/luồng mà brief hiện hành yêu cầu và tránh mọi vấn đề trong **Fix these**. Có thể thay đổi cách trình bày và nội dung phụ; không được làm mất tính năng, gây hiểu sai nghiệp vụ hoặc trình bày dữ liệu mẫu như dữ liệu thật.
- Đây là prototype responsive, không phải website vận hành hoàn chỉnh. Với lựa chọn static hiện tại, nội dung mẫu được viết trong HTML; không giả vờ rằng dữ liệu đã được lưu, thanh toán hoặc đồng bộ thật.
- Brief mới áp dụng làm nền tảng cho PA#2 đến PA#6. Phạm vi triển khai của PA#2 vẫn chỉ là ba màn hình được chỉ định ở Mục 2; không tự mở rộng thành sản phẩm hoàn chỉnh.

## 2. Ba màn hình và đường dẫn trong repository hiện tại

Repository hiện dùng lựa chọn static; giữ ba file sau và không dùng lại tên cũ `page2.html` hoặc `page3.html`:

1. `index.html` – **Screen 1: Services and chat (Customer)**. Linh xem danh mục dịch vụ và hỏi studio về lịch 09:00.
2. `studio.html` – **Screen 2: Advice and clash handling (Admin)**. Admin Thảo xem hội thoại, xử lý xung đột lịch, thống nhất thời gian với Linh và chuẩn bị tạo booking.
3. `booking.html` – **Screen 3: Review the appointment and pay the deposit (Customer)**. Linh xem lịch đã thống nhất và booking đang chờ cọc 30%.

- `index.html` là trang đầu tiên.
- Với static, tên file và liên kết phải được đồng bộ theo ba tên ở trên. Nếu nhóm thống nhất chuyển sang React, các screen path có thể theo cấu trúc React; phải ghi chính xác đường dẫn/route của cả ba màn hình trong `PROTOTYPE.md`.
- Không tạo thêm trang HTML ngoài ba màn hình PA#2, trừ khi giảng viên yêu cầu rõ ràng.

### Phân công phụ trách hiện tại

- Thành viên A — **Nguyễn Anh Tuấn**: `index.html`.
- Thành viên B — **Lê Công Phúc**: `studio.html`.
- Thành viên C — **Đặng Hồng Minh**: `booking.html`.

## 3. Dữ liệu mẫu hiện tại và tính nhất quán

Các tên, thời gian, gói, giá và mã dưới đây là bộ dữ liệu demo hiện dùng trong repository, không phải mẫu nội dung bắt buộc phải chép nguyên. Theo hướng dẫn mới, nhóm có thể chọn câu chuyện và dữ liệu khác nếu brief/rubric cập nhật không yêu cầu giữ dữ kiện cụ thể. Dù chọn bộ dữ liệu nào, các màn hình phải nhất quán và vẫn thể hiện đủ tính năng/luồng bắt buộc. Nếu tài liệu môn học hiện hành yêu cầu một dữ kiện cụ thể thì ưu tiên dữ kiện đó.

Nếu tiếp tục dùng câu chuyện hiện tại, giữ nhất quán các dữ liệu sau:

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

## 4. Trạng thái và nội dung của từng trang

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

Các nhãn trên là cách gọi hiện dùng trong repository. Có thể chọn câu chữ tương đương nếu rubric/brief cập nhật không yêu cầu nhãn chính xác; trạng thái và ý nghĩa nghiệp vụ phải rõ, nhất quán giữa các trang. Trên `booking.html`, phải phân biệt khách đã thống nhất giờ với booking đã được đặt sau khi trả cọc; tránh nhãn mơ hồ khiến người xem hiểu nhầm giờ đã được giữ hoặc đã thanh toán.

### 4.2. Screen 1 – `index.html`

- Nội dung hiển thị trên giao diện (điều hướng, nhãn, nút, trạng thái và ghi chú) phải bằng tiếng Việt như prototype GradStudio.
- Màn hình cần giúp khách khám phá dịch vụ và bắt đầu hỏi studio. Nhóm được chọn cách giới thiệu, nội dung phụ và bố cục; không bắt buộc giữ portfolio, đánh giá, hình ảnh hoặc cách trình bày từ PA#1 nếu chúng không cần cho tính năng của màn hình.
- Prototype hiện hiển thị ba ví dụ dịch vụ và giá tham khảo; nhóm được chọn ví dụ/nội dung phù hợp nếu tài liệu cập nhật không bắt buộc dữ kiện cụ thể:
  - Kỷ yếu lớp: từ **350.000đ/người**.
  - Tốt nghiệp: từ **1.800.000đ**.
  - Chân dung/CV: từ **690.000đ**.
- Chat phải thể hiện ý chính: khách hỏi về gói tốt nghiệp có makeup và lịch 24/10 lúc 09:00; có thể diễn đạt bằng câu chữ tự nhiên khác.
- Phản hồi studio phải thể hiện đang kiểm tra lịch; câu ví dụ là **“Để mình kiểm tra lịch cho bạn nhé.”**
- Đây là trạng thái hỏi ban đầu; không hiển thị trước kết quả thống nhất giờ trên `index.html`. Giờ 09:00 và các giờ 13:00/14:00 là dữ liệu của câu chuyện hiện tại.
- Phần quy trình không được nói hoặc tạo cảm giác rằng studio giữ chỗ ngay khi hai bên chốt giờ. Chỉ giữ khung giờ sau khi thanh toán cọc thành công và hệ thống kiểm tra lại tài nguyên.
- Khung chat nổi hiện tại đang có nguy cơ che nội dung. Ở viewport **360px**, chat không được che bất kỳ nội dung, nút hoặc liên kết nào. Ưu tiên đưa chat vào luồng nội dung bình thường trên mobile; chỉ dùng vị trí nổi khi đã chứng minh không che nội dung ở kích thước đó.

### 4.3. Screen 2 – `studio.html`

Trang phải thể hiện **trạng thái sau khi Linh đã đồng ý thời gian mới**, không phải trạng thái trước khi tư vấn:

- Có ba khu vực chính:
  1. Danh sách hội thoại.
  2. Hội thoại với Linh và toàn bộ form **Booking mới** đặt bên dưới.
  3. Lịch tài nguyên và các thời gian đề xuất.
- Hội thoại của Linh ở trạng thái **`Đã chốt lịch`**.
- Trong câu chuyện demo hiện tại, thời gian 14:00 được chọn; dữ liệu thể hiện make-up 13:00–14:00 và buổi chụp 14:00–16:00. Nếu nhóm chọn bộ dữ liệu khác, vẫn phải thể hiện rõ xung đột, giờ thay thế được khách đồng ý và các khoảng thời gian khớp nhau.
- Nút/hành động **`Tạo booking`** phải ở trạng thái enabled vì Linh đã đồng ý.
- Phải giải thích rõ nguyên nhân giờ ban đầu không khả dụng; trong câu chuyện hiện tại, Mai bận 08:00–12:00 nên không thể nhận lúc 09:00. Không chỉ dùng màu hoặc họa tiết để biểu thị xung đột.
- Lịch tài nguyên phải đọc được đầy đủ tên khách, tên dịch vụ, thời gian và trạng thái ở mọi viewport; không cắt chữ kiểu `Linh · yê…` hoặc `Tốt nghiệ…`.
- Chat và toàn bộ form Booking mới phải đọc được bằng cách cuộn trang. Không đặt chúng trong một cột có scrollbar riêng khiến người xem không thể nhìn thấy cả chat và form bằng cách cuộn trang thông thường.
- Bố cục mobile phải xếp các khu vực theo thứ tự hợp lý; không cố thu nhỏ ba cột desktop xuống 360px.

### 4.4. Screen 3 – `booking.html`

- Trong câu chuyện demo hiện tại, hiển thị booking **GS-1024** với trạng thái **`Đã thống nhất lịch · Chờ cọc 30%`**.
- Hiển thị gói, ngày, make-up 13:00–14:00, buổi chụp 14:00–16:00, giá 1.800.000đ, cọc 540.000đ và còn lại 1.260.000đ. Nếu nhóm chọn bộ dữ liệu khác, các khoản tiền và mốc giờ phải nhất quán, tính toán đúng.
- Timeline phải phân biệt giờ ban đầu không khả dụng với giờ thay thế đã thống nhất; trong câu chuyện hiện tại, gạch ngang mốc 09:00 và thể hiện hai mốc make-up, chụp. Trạng thái không khả dụng không được chỉ biểu thị bằng màu.
- Week view đánh dấu ngày của booking; trong câu chuyện hiện tại là 24/10/2026.
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
- Luồng đổi vai trò hai lần và PA#2 không có màn hình đăng nhập. Vì vậy, liên kết chuyển vai trò từ `index.html` sang `studio.html` phải có nhãn nói rõ ai tiếp tục, ví dụ **“Nhân viên studio: mở hội thoại này”**. Không để người dùng hiểu nhầm rằng cùng một tài khoản khách hàng tự chuyển sang giao diện Admin.
- Từ `studio.html`, đường dẫn tiếp tục sang `booking.html` phải được đặt tên rõ ràng, ví dụ **“Mở booking GS-1024 – Khách hàng tiếp tục”**. Đây chỉ là điều hướng giữa các trạng thái minh họa, không phải thao tác lưu booking thật.
- Liên kết `Lịch chụp của tôi` trên `index.html` có thể mở `booking.html` vì đây là trang khách hàng.

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

- PA#2 cho phép chọn static HTML/CSS hoặc React. Lựa chọn hiện tại của repository là HTML5/CSS3 thuần trong `index.html`, `studio.html`, `booking.html` và stylesheet chung `styles.css`.
- Khi tiếp tục static, không cần thêm JavaScript, Node.js, npm hoặc build step; ba trang phải mở trực tiếp từ file HTML và nội dung/điều hướng chính phải dùng được khi JavaScript tắt.
- Nếu cả nhóm đổi sang React, phải nộp thư mục build `dist/`, mở prototype qua local server với JavaScript bật, và liệt kê chính xác screen path/route của từng màn hình trong `PROTOTYPE.md`.
- Không dùng framework khác ngoài lựa chọn React mà giảng viên cho phép; không dùng framework CSS như Bootstrap, Tailwind hoặc Bulma. Không dùng CDN, font tải từ Internet hoặc tài nguyên từ xa làm điều kiện để giao diện hiển thị đúng.
- Với lựa chọn static hiện tại, kiểm tra `styles.css` và tái sử dụng token/class phù hợp trước khi thêm mới. Có thể tổ chức CSS khác nếu nhóm chuyển sang React và đã thống nhất cách triển khai.
- Dù dùng stack nào, không tạo backend, thanh toán thật, đồng bộ dữ liệu hoặc tuyên bố rằng dữ liệu mẫu đã được lưu/booking đã được giữ chỗ. Các hành động không được hỗ trợ trong prototype phải được thể hiện trung thực và giải thích rõ.

## 8. Thiết kế và hệ thống thị giác

- Nhóm tự chọn bảng màu, typography, nhận diện, thứ bậc thị giác, bố cục và spacing. Không bắt buộc sao chép PA#1, hình minh họa trong brief hay palette được dùng trước đó.
- Có thể tái sử dụng custom properties, spacing tokens và component patterns hiện có trong `styles.css`; chúng là tài nguyên hỗ trợ, không phải giới hạn thiết kế.
- Dù chọn phong cách nào, nội dung phải dễ đọc, điều khiển rõ ràng, trạng thái không chỉ dựa vào màu sắc và đáp ứng tiêu chí accessibility trong rubric hiện hành.
- Thay đổi cách sắp xếp, kích thước, khoảng cách và thứ tự hiển thị để phù hợp mobile/tablet; không cần giữ từng pixel của PA#1.

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
- `studio.html` phải xếp khu hội thoại, form booking và lịch tài nguyên theo thứ tự hợp lý trên mobile; không cố thu nhỏ ba cột desktop xuống 360px.
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
- Với lựa chọn static hiện tại: `index.html`, `studio.html`, `booking.html` và `styles.css`. Nếu nhóm chuyển sang React: nộp `dist/` đã build và ghi đường dẫn/route từng màn hình trong `PROTOTYPE.md`.
- `docs/pa1/`: giữ `LINK.md` và thông tin tham chiếu PA#1. Theo hướng dẫn của giảng viên, PA#2 không yêu cầu nộp lại ảnh màn hình PA#1; nhóm chủ động không giữ các ảnh đó trong repository.
- `PROTOTYPE.md`: thông tin nhóm; cách mở; bảng ba màn hình và luồng liên kết; **Changed since PA#1**; **Not wired yet**; CSS/spacing/breakpoints; nguồn và giấy phép ảnh nếu dùng ảnh được cấp phép; giải thích các thay đổi theo final project brief.
- `brief.md`: ghi lại prompt/thông tin thực tế đã đưa cho AI, theo đúng thứ tự; đây không phải bản chép lại đề bài của giảng viên.
- `AI-LOG.md`: ghi từng task/page, công cụ và yêu cầu thật, điều AI làm sai/được sửa/bị từ chối, kiểm tra nào phát hiện và kết quả thực tế. Không bịa trải nghiệm hoặc test.
- `SELF_ASSESSMENT_REPORT.md`: một dòng cho mỗi tiêu chí rubric, điểm tự chấm, đường dẫn bằng chứng và phần việc chưa hoàn thành.
- `screenshots/`: screenshot **full-page** theo kích thước và trạng thái chạy mà rubric PA#2 cập nhật yêu cầu. Với static, chụp khi JavaScript tắt; với React, chạy qua local server và bật JavaScript. Bộ tên hiện dùng cho repository static: `index-360.png`, `index-768.png`, `index-1280.png`; `studio-360.png`, `studio-768.png`, `studio-1280.png`; `booking-360.png`, `booking-768.png`, `booking-1280.png`.
- `checks/`: kết quả W3C cho từng trang, ví dụ `validator-index.png` hoặc `.txt`, `validator-studio.png` hoặc `.txt`, `validator-booking.png` hoặc `.txt`.

Không tạo bằng chứng giả. Nếu một kiểm tra chưa chạy, ghi rõ chưa chạy thay vì ghi PASS.

## 13. Quy trình làm việc cho AI coding assistant

### Trước khi sửa

1. Đọc `README.md`, file `AGENTS.md` này, thông báo mới nhất của giảng viên, brief và rubric PA#2 bản cập nhật, bao gồm danh sách **Fix these**.
2. Đối chiếu các tính năng cần có của màn hình đang sửa; xem các màn hình trong brief là hướng dẫn về tính năng, không phải yêu cầu sao chép nguyên thiết kế.
3. Dùng `docs/pa1/LINK.md` để tham khảo PA#1 khi cần; ảnh chụp màn hình PA#1 không được nộp lại theo hướng dẫn của giảng viên.
4. Kiểm tra `styles.css`, asset và cấu trúc hiện tại trước khi tạo file hoặc token mới.
5. Xác định rõ trang/tệp được giao và stack nhóm đã chọn; không tự ý sửa phần của thành viên khác hoặc đổi từ static sang React (hay ngược lại) nếu chưa thống nhất.
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
4. Với static, kiểm tra khi JavaScript tắt; nội dung và điều hướng chính vẫn phải dùng được. Với React, kiểm tra qua local server với JavaScript bật.
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
- [ ] Nội dung dài xuống dòng, ảnh không tràn, chat trên `index.html` không che nội dung.
- [ ] Trên `studio.html`, chat và form Booking mới đều đọc được bằng cách cuộn trang; lịch tài nguyên đọc được đầy đủ.

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

- [ ] Có screenshot full-page theo rubric cập nhật: JavaScript tắt cho static; local server với JavaScript bật cho React.
- [ ] Có W3C result trong `checks/` cho trang.
- [ ] Các thay đổi so với PA#1 và brief mới được ghi vào PROTOTYPE.md.
- [ ] Prompt, lỗi AI, cách phát hiện và cách sửa thực tế được ghi vào `brief.md`/`AI-LOG.md` đúng vai trò.
- [ ] Commit history phản ánh đúng người thực hiện và thay đổi thực tế.

---

**Nguyên tắc cuối cùng:** Hoàn thành ba màn hình và các tính năng trong brief PA#2 cập nhật, tránh các lỗi trong **Fix these**, đồng thời đáp ứng responsive, semantic HTML, accessibility và minh chứng theo rubric. Nhóm tự quyết định thiết kế, bố cục, nội dung trình bày, màu sắc và chọn static HTML/CSS hoặc React. Với lựa chọn static hiện tại, giữ các đường dẫn `index.html`, `studio.html`, `booking.html`; nếu đổi sang React, nộp `dist/` và ghi screen path của từng màn hình trong `PROTOTYPE.md`.
