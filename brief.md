# Brief — GradStudio PA#2 Responsive Prototype

Tài liệu này lưu lại prompt thực tế liên quan đến việc xây dựng và chỉnh Màn 1 theo thứ tự đã gửi. Prompt mở đầu bên dưới được chép nguyên văn từ tệp đính kèm `Pasted text.txt`; các follow-up được chép lại từ lời nhắn người dùng, còn ghi chú về ảnh chỉ mô tả tài liệu đính kèm. Quy tắc đội nhóm được ghi riêng ở phần sau để không nhầm với prompt tác vụ. Rubric PDF là tài liệu chấm điểm, không phải yêu cầu thiết kế của người dùng.

## Prompt mở đầu

> đọc kỹ dùm tui PJ và đợi lệnh tiếp theo

### Prompt tác vụ đính kèm — nguyên văn

# TASK: Xây dựng Màn 1 – GradStudio Responsive Prototype (PA#2)

Bạn là Senior Frontend Developer. Hãy hỗ trợ tôi xây dựng màn hình đầu tiên của dự án GradStudio PA#2 bằng HTML5 và CSS3 thuần.

Tôi là thành viên A, chịu trách nhiệm phát triển `index.html`.

## 1. Đọc tài liệu trước khi thực hiện

Trước khi viết code, hãy đọc kỹ:

1. `AGENTS.md` – Quy tắc bắt buộc của dự án.
2. `README.md` – Hướng dẫn và cấu trúc repository.
3. `docs/pa1/LINK.md` – Mô tả chi tiết ba màn hình và luồng nghiệp vụ PA#1.
4. `docs/pa1/01-customer-services-chat.png` – Ảnh thiết kế gốc của Màn 1.
5. File CSS chung do thành viên B cung cấp.

Đặc biệt, hãy kiểm tra ảnh `hero1` mà tôi đã thêm vào repository. Đây là ảnh được sử dụng trong thiết kế PA#1 và cần được tái sử dụng cho khu vực Hero.

Không tự tìm ảnh thay thế trên Internet và không tự ý thay đổi hình ảnh nhận diện của GradStudio.

## 2. Phạm vi công việc

Chỉ xây dựng Màn 1 trong file `index.html`.

Tên màn hình: Customer Services & Chat.

Mục tiêu: Tái tạo giao diện khách hàng xem dịch vụ chụp ảnh tốt nghiệp và tư vấn với GradStudio.

Các khu vực giao diện cần xây dựng:

### A. Header / Navigation
- Logo GradStudio.
- Điều hướng đến Dịch vụ.
- Điều hướng đến Lịch chụp của tôi.
- Thông tin tài khoản khách hàng.
- Có liên kết chuyển sang `page2.html` để người chấm xem luồng tiếp theo nếu phù hợp với thiết kế gốc.

### B. Hero Section
- Sử dụng đúng ảnh `hero1` đã có trong repository.
- Tiêu đề giới thiệu dịch vụ GradStudio.
- Nội dung mô tả ngắn gọn, đúng phong cách thương hiệu.
- Nút CTA "Xem gói chụp".
- Nút "Chat với studio".
- Ảnh phải có kích thước phù hợp, không bị méo và có alt text đúng ngữ nghĩa.

### C. Service / Package Section
- Hiển thị các gói dịch vụ chụp ảnh.
- Giữ gói Tốt nghiệp trong luồng chính.
- Có thông tin tên gói, mô tả, giá và hình ảnh theo thiết kế PA#1.
- Có nút "Tư vấn gói này".
- Sử dụng nội dung thực tế bằng tiếng Việt, không dùng Lorem Ipsum.

### D. Chat Section
Tạo giao diện hội thoại mẫu giữa khách hàng Nguyễn Thùy Linh và GradStudio.

Giữ nội dung hội thoại theo PA#1:

Khách hàng:
"Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?"

Studio:
"Để mình kiểm tra lịch cho bạn nhé."

- Hiển thị avatar hoặc tên người gửi phù hợp.
- Phân biệt rõ tin nhắn của khách và studio.
- Tạo khung nhập tin nhắn mang tính minh họa.
- Không làm chức năng gửi tin nhắn thật.
- Không sử dụng JavaScript để xử lý chat.

### E. About / Process / Footer
- Giữ các nội dung giới thiệu và quy trình dịch vụ hiện có trong thiết kế PA#1.
- Footer có thông tin GradStudio và các liên kết phù hợp.
- Không tự thêm chức năng ngoài phạm vi dự án.

## 3. Yêu cầu thiết kế

Phải bám sát thiết kế gốc PA#1.

Design direction:
- Phong cách thanh lịch, tối giản, chuyên nghiệp.
- Màu kem, trắng ấm, nâu trầm và nâu vàng.
- Tiêu đề sử dụng serif khi phù hợp.
- Nội dung sử dụng sans-serif dễ đọc.
- Khoảng trắng hợp lý, phân cấp thị giác rõ ràng.
- Giữ nguyên nhận diện thương hiệu GradStudio.

Không tự ý:
- Đổi theme.
- Đổi logo.
- Thay đổi phong cách thiết kế.
- Xóa các nội dung quan trọng.
- Thêm thành phần không có trong thiết kế gốc nếu không cần thiết.

Có thể điều chỉnh bố cục để phù hợp với responsive nhưng phải giữ nội dung và tinh thần thiết kế PA#1.

## 4. Công nghệ và CSS

Bắt buộc tuân thủ AGENTS.md:

- HTML5 và CSS3 thuần.
- Không Bootstrap.
- Không Tailwind.
- Không React/Vue.
- Không JavaScript.
- Không Backend/API/Database.
- Không CDN hoặc dependency bên ngoài.
- Không cần build step hoặc server.
- Không sử dụng inline styles.
- Không sử dụng `!important`.

Sử dụng CSS chung do thành viên B quản lý.

Tái sử dụng:
- CSS variables trong `:root`.
- Spacing tokens.
- Typography.
- `.gs-container`.
- `.gs-btn`.
- `.gs-card`.
- `.gs-stack`.
- Các class chung đã có.

Kiểm tra tên file CSS thực tế trước khi liên kết. Repository quy định `styles.css`, nhưng nếu file CSS hiện tại đang có tên `style.css`, hãy báo rõ sự không thống nhất và đề xuất cách đồng bộ. Không tạo hai file CSS trùng chức năng hoặc tự ý ghi đè CSS của thành viên B.

Nếu thiếu các class CSS đặc thù để tái tạo thiết kế, hãy liệt kê cụ thể những class cần bổ sung để thành viên B cập nhật vào stylesheet chung. Không dùng inline style để thay thế.

## 5. Responsive Design

Thiết kế theo Mobile First.

Bắt buộc kiểm tra:
- 360px – Mobile.
- 768px – Tablet.
- 1280px – Desktop.

Yêu cầu:
- Không có horizontal scrolling.
- Không có nội dung tràn hoặc bị cắt.
- Hình ảnh có `max-width: 100%`.
- Tiêu đề và nội dung dài tự xuống dòng.
- Navigation thích nghi với màn hình nhỏ.
- Các nút và liên kết độc lập cao tối thiểu 44px tại 360px.
- Khoảng cách và typography sử dụng design tokens chung.

Không được sử dụng `overflow-x: hidden` để che lỗi responsive.

## 6. HTML Semantic và Accessibility

- Có `<!DOCTYPE html>`.
- Có `<html lang="vi">`.
- Có meta viewport.
- Có các landmark phù hợp: `header`, `nav`, `main`, `footer`.
- Mỗi trang chỉ có một `h1`.
- Không nhảy cấp heading.
- Điều hướng dùng `<a href>`.
- Hành động dùng `<button type="button">`.
- Input có label hiển thị.
- Hình ảnh có alt phù hợp.
- Các thành phần tương tác có thể sử dụng bằng bàn phím.
- Không tạo các nút giả bằng div hoặc span.

## 7. Liên kết với các màn hình khác

- `index.html` là trang đầu tiên.
- Có thể điều hướng đến `page2.html`.
- Có thể điều hướng đến `page3.html` thông qua mục Lịch chụp của tôi nếu phù hợp với PA#1.
- Sử dụng relative links.
- Không sử dụng đường dẫn bắt đầu bằng `/`.
- Không sử dụng `href="#"` cho điều hướng chính.
- Không dùng JavaScript để chuyển trang.

Việc chuyển trang chỉ nhằm giúp người chấm xem các màn hình trong prototype, không cần đồng bộ dữ liệu giữa chúng.

## 8. Phạm vi chỉnh sửa file

Chỉ được phép chỉnh sửa:
- `index.html`.

Không tự ý sửa:
- `page2.html`.
- `page3.html`.
- `AGENTS.md`.
- `README.md`.
- CSS chung do B quản lý.
- Các file PA#1 trong `docs/pa1/`.

Nếu phát hiện lỗi trong stylesheet chung, hãy báo cáo và đề xuất cho tôi thay vì tự ý sửa.

## 9. Kiểm tra sau khi hoàn thành

Sau khi code xong, hãy:

1. Kiểm tra cấu trúc HTML.
2. Kiểm tra đường dẫn CSS và ảnh hero1.
3. Kiểm tra các liên kết đến page2 và page3.
4. Kiểm tra giao diện ở 360px, 768px và 1280px nếu môi trường cho phép.
5. Kiểm tra trang không có cuộn ngang.
6. Kiểm tra khi tắt JavaScript.
7. Kiểm tra các landmark, heading, alt và label.
8. Chạy W3C Validator nếu môi trường cho phép.

Không được tuyên bố đã đạt 0 errors hoặc đã responsive nếu chưa thực sự kiểm tra.

## 10. Báo cáo kết quả

Sau khi hoàn thành, hãy báo cáo:

1. Những phần giao diện đã xây dựng.
2. Những file đã tạo hoặc chỉnh sửa.
3. Đường dẫn thực tế đến ảnh hero1 đã sử dụng.
4. Những CSS class đang sử dụng từ stylesheet chung.
5. Những CSS class còn thiếu cần B bổ sung.
6. Những điểm khác biệt so với thiết kế PA#1.
7. Kết quả kiểm tra tại ba kích thước màn hình.
8. Những lỗi còn tồn tại cần xử lý.

Ưu tiên cao nhất: Tái tạo chính xác giao diện Màn 1 PA#1, sử dụng ảnh hero1 của nhóm, giữ nhận diện GradStudio và đáp ứng đầy đủ yêu cầu Responsive Static HTML/CSS Prototype của PA#2.

Bắt đầu bằng việc kiểm tra repository và các file tham chiếu. Sau đó mới tiến hành chỉnh sửa `index.html`.

## Quy tắc dự án được cung cấp riêng trong AGENTS.md

Các mục dưới đây tóm lược những ràng buộc dự án được cung cấp cho assistant trong `AGENTS.md`; đây là quy tắc chung của nhóm, tách biệt với prompt tác vụ đính kèm.

- Dùng HTML5/CSS3 thuần; không dùng framework CSS/JavaScript, package/dependency ngoài, CDN, font mạng, backend, API hoặc build step. Mở trực tiếp file HTML phải xem được nội dung. Nội dung chính và điều hướng phải hoạt động khi JavaScript tắt; JavaScript cục bộ chỉ được dùng tối thiểu cho tương tác không thiết yếu theo progressive enhancement.
- Dùng `style.css` làm stylesheet chung. `styles.css` chỉ là tệp khởi tạo tạm, chỉ xóa sau khi `page2.html` và `page3.html` đã chuyển sang `style.css` và tham chiếu được cập nhật.
- Dùng design tokens chung, spacing theo bội số 4px: `--gs-space-1` 4px, `--gs-space-2` 8px, `--gs-space-3` 12px, `--gs-space-4` 16px, `--gs-space-5` 20px, `--gs-space-6` 24px, `--gs-space-8` 32px, `--gs-space-10` 40px, `--gs-space-12` 48px, `--gs-space-16` 64px và `--gs-space-20` 80px. Không dùng `!important`. Thiết kế mobile-first: mobile dưới 768px, tablet 768–1279px, desktop từ 1280px; kiểm tra viewport đúng 360px, 768px và 1280px. Tránh fixed width làm tràn trang; không dùng `overflow-x: hidden` để che lỗi.
- Giữ nội dung, vai trò, luồng và nhận diện PA#1; ưu tiên ảnh trong repository. Các link Main Flow phải là link tương đối tới trang tồn tại; không dùng `href="#"` hoặc JavaScript để chuyển trang.
- Dùng landmarks phù hợp, đúng một `h1`, heading đúng cấp, `<a>` cho điều hướng, `<button>` cho hành động, label hiển thị cho input và alt phù hợp cho ảnh. Thành phần tương tác cần dùng được bằng bàn phím. Body text tối thiểu 16px; nút/link độc lập cao ít nhất 44px ở mobile; chữ đạt tương phản tối thiểu 4.5:1.
- Cách kiểm tra yêu cầu: mở HTML trực tiếp, tắt JavaScript, thử các link, kiểm tra cuộn ngang và nội dung tràn tại ba viewport, chạy W3C Nu Checker (mục tiêu 0 errors), xem Accessibility trong DevTools, lưu screenshot và kết quả checker. Không ghi đạt nếu chưa thực sự kiểm tra.

## Follow-up prompts — theo thứ tự

### 1. Làm rõ stylesheet hiện dùng

> `index.html` hiện liên kết `style.css` mới đúng nhóm thống nhất lại rồi

### 2. Cập nhật tài liệu về stylesheet

> chỉnh lại dùm tui phần readme cũng như agent.md có những chổ nói phải sài styles sữa lại thành style mới đúng file styles sẽ dc xoá khi làm xong chỉ giữ style á

### 3. Khôi phục index sau khi bị xóa

> ủa chết nãy tui lỡ xoá mất phần index mà bạn vừa edit cho tôi rồi tui có bổ sung phần css mà bạn nói tôi thiếu bạn chịu khó làm lại cho tôi file index với

### 4. Rà soát mà không sửa tùy tiện

> tui có chỉnh lại 1 số index và styles bạn xem thử ổn không không được edit bậy bạ

### 5. Sửa font tải từ Google và vùng bấm nhỏ

> **Google Fonts trái quy định:** [index.html (line 8)](/D:/gradstudio-pa2-repo/index.html:8)–[10 (line 10)](/D:/gradstudio-pa2-repo/index.html:10) tải font từ Google. [AGENTS.md (line 27)](/D:/gradstudio-pa2-repo/AGENTS.md:27) và [AGENTS.md (line 92)](/D:/gradstudio-pa2-repo/AGENTS.md:92) yêu cầu không phụ thuộc font tải từ Internet.   bạn sửa phần này dùm tui và phần này nữa **Một số vùng bấm nhỏ hơn 44px:** CSS đặt chiều cao tối thiểu về 0 cho logo và link nav; nút thu nhỏ chat là 32px; nút trong thanh prototype được đặt 36px. Quy định mobile yêu cầu vùng bấm độc lập tối thiểu 44px.

### 6. Sửa lỗi hiển thị font tiếng Việt

> font hiện tại khiến cho 1 số nới bị lỗi font đổi font khác ít lỗi hơn

Người dùng đính kèm hai ảnh chụp khu vực dịch vụ và quy trình để minh họa lỗi font.

### 7. Hỏi về nguồn ảnh cho thẻ dịch vụ

> **Thẻ gói chưa có ảnh riêng:** hiện `assets/images/` chỉ có `hero1.jpg`; các thẻ dịch vụ chưa có ảnh như yêu cầu PA#1.   ảnh này là phải lấy thêm từ internet hả

### 8. Bổ sung ảnh gói

> tui có bổ sung ảnh 3 gói rồi á

### 9. Sửa thẻ Kỷ yếu lớp

> thẻ chụp kỷ yếu lớp đang bị lỗi á

Kèm ảnh chụp cho thấy thẻ Kỷ yếu lớp có bố cục ảnh/nội dung lệch so với hai thẻ còn lại.

### 10. Hỏi bước kiểm tra tiếp theo sau responsive Màn 1

> tui ddax kiemer tra ressponsive cho manf hinhf 1 xong tiepe theoc anaf kiem tra gi nuaw

Kèm rubric PA#2 để xác định các hạng mục và minh chứng cần kiểm tra.

## Ghi chú về phạm vi và tính trung thực

- Prompt đính kèm ban đầu giới hạn công việc ở `index.html` và yêu cầu báo lỗi CSS chung thay vì tự ý sửa. Các follow-up sau đó mở rộng yêu cầu cụ thể: cập nhật README/AGENTS.md, xử lý font/vùng bấm và bố cục thẻ.
- Prompt ban đầu ghi có sự chưa thống nhất giữa `styles.css` và `style.css`; follow-up số 1 xác nhận nhóm đã thống nhất dùng `style.css`. Quy tắc dự án nêu rõ `styles.css` chỉ được xóa sau khi hai trang còn lại chuyển xong.
- `manualcheckM1.md` là tài liệu minh chứng kiểm tra responsive/luồng do người dùng ghi nhận. Brief này không tự khẳng định đã chạy W3C, kiểm tra Accessibility hoặc xác minh đa trình duyệt.

---

# PHẦN II: BRIEF VÀ PROMPT CỦA THÀNH VIÊN C (MÀN 3 — `page3.html`)

Tài liệu dưới đây lưu lại nguyên văn các prompt và chỉ dẫn thực tế của Thành viên C dùng để yêu cầu Assistant xây dựng, tinh chỉnh và khắc phục lỗi cho Màn 3 (`page3.html`), đồng thời quản lý bộ ảnh kiểm thử (`screenshots/`, `checks/`) và nhật ký AI (`AI-LOG.md`).

## 1. Prompt tác vụ khởi tạo cho Màn 3

# TASK: Xây dựng Màn 3 – GradStudio Responsive Prototype (PA#2)

Bạn là Frontend Assistant. Hãy hỗ trợ tôi xây dựng màn hình thứ ba của dự án GradStudio PA#2 bằng HTML5 và CSS3 thuần.  
Tôi là thành viên C, chịu trách nhiệm phát triển `page3.html`, tổng hợp bộ ảnh kiểm thử (`screenshots/`, `checks/`) và ghi chép nhật ký AI (`AI-LOG.md`).

### A. Đọc tài liệu tham chiếu bắt buộc
1. `AGENTS.md` – Quy tắc bắt buộc của cả nhóm (HTML/CSS thuần, không framework CSS/JS, không dependency, không backend, mobile-first, spacing 4px).
2. `docs/pa1/03-customer-appointment.png` – Ảnh thiết kế gốc Màn 3 đã nộp ở PA#1.
3. `docs/pa1/LINK.md` – Kịch bản dữ liệu và câu chuyện thống nhất:
   - Khách hàng: Nguyễn Thùy Linh.
   - Ngày chụp: Thứ Bảy, 24/10/2026.
   - Makeup với Mai: 13:00–14:00 (có mặt sớm 10 phút để chuẩn bị).
   - Chụp ảnh với Tuấn: 14:00–16:00 (studio đề xuất · trong nhà và sân vườn).
   - Gói dịch vụ: Tốt nghiệp Premium.
   - Tổng giá: 1.800.000đ.
   - Cọc 30%: 540.000đ.
   - Còn lại 70%: 1.260.000đ (thanh toán sau buổi chụp).
   - Mã booking minh họa: GS-1024.
   - Lý do đề xuất: Studio đề xuất 14:00 vì khung makeup lúc 09:00 đã kín lịch.

### B. Phạm vi xây dựng `page3.html`
1. **Header & Navigation:**
   - Logo GradStudio liên kết về `index.html`.
   - Menu điều hướng: "Dịch vụ" (`index.html`) và "Lịch chụp của tôi" (`page3.html` với `aria-current="page"`).
   - Khối tài khoản khách hàng "Linh" có ảnh đại diện bo tròn.
2. **Page Heading & Bộ lọc trạng thái:**
   - Tiêu đề trang cấp cao nhất `<h1>` duy nhất: "Lịch chụp của tôi".
   - Đoạn mô tả: "Xem lại lịch đã thống nhất với studio và thanh toán cọc để giữ lịch."
   - 4 tab bộ lọc trạng thái: "Tất cả 1", "Chờ cọc 1", "Đã đặt lịch 0", "Hoàn thành 0".
3. **Lịch tuần và Dòng thời gian chi tiết (Cột trái):**
   - Thẻ Lịch Tháng 10, 2026 (Tuần 43) hiển thị 7 ngày trong tuần, ngày Thứ Bảy 24 được chọn nổi bật.
   - Banner ngày: "THỨ BẢY, 24/10 · NGÀY CỦA LINH".
   - Dòng thời gian (Timeline) với 3 mốc rõ ràng:
     + 09:00 (gạch ngang `<del>`): Giờ bạn yêu cầu ban đầu (Thợ makeup đã kín lịch).
     + 13:00–14:00: Makeup với Mai (Có mặt sớm 10 phút để chuẩn bị).
     + 14:00–16:00: Chụp ảnh với Tuấn (Studio đề xuất · Trong nhà và sân vườn).
4. **Chi tiết Booking & Khoản thanh toán cọc (Cột phải):**
   - Mã booking GS-1024, nhãn trạng thái "Đã thống nhất lịch · Chờ cọc 30%".
   - Tiêu đề "Chụp ảnh tốt nghiệp", thông tin gói Tốt nghiệp Premium, dịch vụ bao gồm, ngày và giờ bắt đầu makeup 13:00.
   - Hộp chi phí cọc: Giá gói 1.800.000đ, Cọc 30% 540.000đ, Còn lại 70% 1.260.000đ (thanh toán sau buổi chụp).
   - Nút hành động nổi bật CTA: "Thanh toán cọc 30%".
   - Thẻ địa điểm Studio với bản đồ vector SVG minh họa và liên kết "Xem đường đi".
   - Khung ghi chú `.schedule-proposal-callout`: "Studio đề xuất 14:00 vì khung makeup lúc 09:00 đã kín lịch."
5. **Footer & Thanh điều hướng Demo vai trò:**
   - Footer thông tin prototype và kịch bản minh họa.
   - Thanh demo switcher cố định góc màn hình giúp người chấm chuyển nhanh giữa Màn 1 (`index.html`), Màn 2 (`page2.html`) và Màn 3 (`page3.html`).

### C. Ràng buộc kỹ thuật & Tiêu chí hoàn thành (AGENTS.md & Rubric PA#2)
- Sử dụng HTML5 và CSS3 thuần, kết nối tới stylesheet chung `style.css`.
- Không dùng Bootstrap, Tailwind, React, Vue, jQuery hay bất kỳ thư viện bên ngoài nào.
- Toàn bộ nội dung và điều hướng phải hoạt động 100% khi JavaScript bị tắt (Progressive Enhancement).
- Thiết kế Mobile First, đảm bảo hiển thị hoàn hảo tại 360px, 768px và 1280px.
- Tuyệt đối không bị cuộn ngang (`scrollWidth === clientWidth`) và không dùng `overflow-x: hidden` để che lỗi.
- Nút bấm và liên kết độc lập phải đạt chiều cao tối thiểu 44px trên mobile (360px).
- Đạt 0 Errors trên công cụ kiểm tra W3C HTML Nu Checker.
- Ghi lại trung thực nhật ký tương tác vào `AI-LOG.md` và lưu kết quả kiểm thử vào `screenshots/`, `checks/`.

---

## 2. Các Follow-up Prompts thực tế của Thành viên C (theo thứ tự)

### 1. Hỏi cách mở và kiểm tra file trên 3 thiết bị
> vậy làm sao tôi mở file html trên 3 thiết bị đó

*Assistant hướng dẫn mở trực tiếp file HTML trên trình duyệt, kích hoạt DevTools (`F12`), bật Device Toolbar (`Ctrl + Shift + M`) và thiết lập kiểm tra tại các kích thước 360px, 768px, 1280px.*

### 2. Yêu cầu tạo file nhật ký AI-LOG.md
> Bạn hãy tạo cho tôi file AI-LOG.md dựa trên template trước đó đi.

*Assistant khởi tạo cấu trúc chuẩn của `AI-LOG.md` với các trường bắt buộc của rubric: Asked for, Kept, Changed, Rejected.*

### 3. Bổ sung các mục tương tác vào nhật ký
> có thể ghi cho tôi thêm vài cái được không

*Assistant mở rộng nhật ký ghi lại các lượt làm việc và quyết định kỹ thuật thực tế.*

### 4. Kéo cập nhật từ remote branch
> git pull cho tôi branch feat nay đi

*Assistant chuyển sang nhánh `feat/gradstudio-foundation-css`, giải quyết xung đột CSS và tích hợp đồng bộ mã nguồn Màn 1 và Màn 3 vào file chung `style.css`.*

### 5. Sửa avatar hình tròn và thêm khung ghi chú đề xuất của Studio
> Tôi muốn phần ảnh avarta trên html của page3 phải hình tròn chứ không phải hình chữ nhật như hiện tại, đồng thời thêm cho tôi phần giao diện như hình trên

*Người dùng đính kèm ảnh chụp màn hình chỉ rõ avatar tròn của khách hàng Nguyễn Thùy Linh và khối ghi chú studio đề xuất lịch. Assistant cập nhật CSS `.user-avatar-img` có `border-radius: 50%` và xây dựng khối `.schedule-proposal-callout` kèm icon SVG.*

### 6. Kiểm tra và sửa lỗi font tiếng Việt
> Tại sao phần này của tôi lại bị lỗi vậy, bạn hãy kiểm tra cho tôi đi

*Người dùng đính kèm ảnh chụp cho thấy tiêu đề "Chụp ảnh tố ́ t nghiệp" bị tách rời dấu sắc trên Windows. Assistant phân tích lỗi glyph fallback của font `Georgia` và chuyển sang dùng `Cambria, "Times New Roman", serif` trong `--gs-font-serif`.*

### 7. Hướng dẫn chụp ảnh minh chứng và quy ước đặt tên file theo rubric
> Bạn hãy dựa vào file @[d:\10_Web\PA2\gradstudio-pa2-repo\pa2_responsive_prototype_rubric.md] và hướng dẫn tôi cách chụp screenshot và đặt tên sao cho phù hợp với yêu cầu

*Người dùng đính kèm file rubric PA#2. Assistant hướng dẫn tắt JavaScript, sử dụng lệnh "Capture full size screenshot" trong DevTools và tuân thủ quy tắc đặt tên: `<page>-360.png`, `<page>-768.png`, `<page>-1280.png`.*

### 8. Chạy kiểm tra đo đạc tràn layout (Horizontal Scroll)
> document.documentElement.scrollWidth
> 1280
> document.documentElement.clientWidth
> 1280

*Người dùng chạy lệnh console xác nhận `page3.html` tại 1280px không có cuộn ngang (`scrollWidth === clientWidth === 1280`).*

### 9. Gửi kết quả W3C Nu Checker và khắc phục 3 lỗi ARIA
> [Người dùng gửi ảnh chụp màn hình W3C Nu Checker báo 3 lỗi: dòng 25 và dòng 200 lỗi aria-label trên thẻ div generic, dòng 49 lỗi role=tab thiếu role=tabpanel tương ứng]

*Assistant giải thích chuẩn W3C/ARIA, gỡ bỏ `aria-label` trên các thẻ `div` thuần (thông tin đã có text và alt đầy đủ), chuyển container tab sang `role="group"` với action buttons tiêu chuẩn. Sau khi sửa, kiểm tra lại đạt **0 Errors, 0 Warnings** và người dùng lưu ảnh minh chứng `validator-page3.png`.*

### 10. Rà soát kiểm tra toàn diện trước khi bàn giao
> còn gì check nữa không

*Assistant đối chiếu toàn diện rubric PA#2, xác nhận các checklist hoàn thành của Thành viên C (W3C 0 errors, touch targets $\ge 44\text{px}$, responsive 3 widths, JS disabled, file minh chứng trong `screenshots/` và `checks/`).*

---

## 3. Ghi chú về phạm vi và tính minh bạch của Thành viên C

- Toàn bộ các yêu cầu của Thành viên C bám sát thiết kế PA#1 màn hình `03-customer-appointment.png` và kịch bản booking của khách hàng Nguyễn Thùy Linh.
- Mọi lỗi kỹ thuật (font tiếng Việt, layout avatar, 3 lỗi W3C ARIA) đều được phát hiện qua ảnh chụp kiểm tra thực tế của người dùng và được sửa đúng gốc rễ bằng HTML/CSS ngữ nghĩa, không dùng mẹo che giấu (`overflow-x: hidden`, `!important`, tabpanel rỗng hay script giả lập).
- Bộ ảnh minh chứng trong `screenshots/` (`page3-360.png`, `page3-768.png`, `page3-1280.png`) và kết quả kiểm tra `checks/validator-page3.png` phản ánh chính xác kết quả thực tế thu được trên trình duyệt khi tắt JavaScript.

---

# PHẦN III: BRIEF VÀ PROMPT DỰNG LẠI BA MÀN HÌNH THEO FINAL BRIEF (Claude, 2026-11-05)

Phần này ghi lại prompt thực tế đã gửi cho assistant (Claude, claude.ai) để dựng lại `index.html`, `studio.html`, `booking.html` và `styles.css`, theo đúng thứ tự gửi. Prompt tác vụ được chép nguyên văn; ghi chú về tệp đính kèm chỉ mô tả những gì thực sự được đính kèm.

## 1. Prompt tác vụ — nguyên văn

Tệp đính kèm cùng lượt gửi: `AGENTS.md`, `page2.html`, `styles.css`, `index.html`, `page3.html`. File `GradStudio-final-project-brief.pdf` được nhắc trong prompt nhưng **không** nằm trong các tệp đính kèm.

~~~text
# TASK: Rebuild the complete GradStudio PA#2 prototype

You are working directly inside my existing GradStudio repository.

I want you to rebuild and complete the four existing source files:

- `index.html`
- `styles.css`
- `page2.html`
- `page3.html`

The final required files must be:

- `index.html` — Screen 1: Services and chat (Customer)
- `styles.css` — Shared stylesheet for all three pages
- `studio.html` — Screen 2: Advice and clash handling (Admin)
- `booking.html` — Screen 3: Review appointment and pay deposit (Customer)

You must rename `page2.html` to `studio.html` and `page3.html` to `booking.html`, and update every reference accordingly.

## PHASE 1 — READ AND UNDERSTAND THE REQUIREMENTS

Before writing or modifying code:

1. Read the entire `AGENTS.md` file in the repository.
2. Read the entire `GradStudio-final-project-brief.pdf`.
3. Inspect all four existing source files.
4. Inspect the existing repository structure, images, CSS, and `docs/pa1/` references if available.
5. Understand the three required screens and the complete GS-1024 example.

IMPORTANT PRIORITY RULE:

The newly provided `GradStudio-final-project-brief.pdf` is the authoritative product specification for PA#2.

If an older instruction in `AGENTS.md` conflicts with the new final project brief, follow the new brief for product requirements and identify the conflict before implementing.

Do not blindly reuse outdated page names, old booking information, old interactions, or old navigation.

## PHASE 2 — IMPLEMENT THE THREE SCREENS

### SCREEN 1 — index.html: Customer services and chat

Build the customer-facing service page.

Required content:

- GradStudio introduction and service catalogue.
- Kỷ yếu lớp: from 350.000đ/person.
- Tốt nghiệp: from 1.800.000đ.
- Chân dung/CV: from 690.000đ.
- Sample conversation with customer Nguyễn Thùy Linh.
- Customer's message:

  "Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?"

- Studio's reply:

  "Để mình kiểm tra lịch cho bạn nhé."

The page must represent the initial customer question, not a later booking state.

Important corrections:

- Do not use a floating chat panel that covers the page content.
- At 360px, the chat must not hide any content or controls.
- Rework the chat placement so it fits naturally into the page layout.
- The process section must not claim that the studio holds the appointment slot immediately after agreeing on a time.
- Explain that the slot is held only after the 30% deposit succeeds and resources are checked again.
- Sending a message is not implemented in PA#2. Show the send button as disabled and add a short visible explanation.
- Use clear navigation to Screen 2, explicitly identifying the next role, such as "Nhân viên studio: mở cuộc trò chuyện này".
- Keep a link to the customer booking page where appropriate.

### SCREEN 2 — studio.html: Admin advice and clash handling

Build the Admin interface for Admin Thảo.

This page must show the state AFTER Linh has agreed to the new proposed time.

Required information:

Customer:
- Nguyễn Thùy Linh.

Original request:
- Saturday, 24/10/2026, 09:00.
- Graduation package with makeup.

Conflict:
- Makeup artist Mai is busy from 08:00–12:00.
- Clearly explain why 09:00 is unavailable.
- Do not communicate the conflict using colour alone.

Agreed schedule:
- Makeup: 13:00–14:00 with Mai.
- Photo shoot: 14:00–16:00 with Tuấn.
- Location: Phòng B.

Booking information:
- Package: Gói Tốt nghiệp Premium.
- Duration: 2 hours.
- 30 edited photos.
- Total: 1.800.000đ.
- Deposit: 540.000đ.
- Remaining: 1.260.000đ.

Required UI state:
- Conversation status: Đã chốt lịch.
- Selected time: 14:00.
- Button "Tạo booking" must be enabled in this static screen.
- Show the conflict reason clearly.
- Include the conversation list, chat area, Booking mới form, and resource calendar.

IMPORTANT LAYOUT REQUIREMENTS:

- The chat and the complete Booking mới form must be readable by scrolling the page.
- Do not place the chat and form in a shared column with an independent scrollbar that hides the form.
- Resource calendar labels must be fully readable at all widths.
- Long customer names and service names must wrap or remain readable.
- Do not rely on colour or hatching alone to communicate a conflict.

The Admin page must include a clear navigation link to the next role, such as:

"Khách hàng: xem lịch chụp GS-1024".

### SCREEN 3 — booking.html: Customer appointment and deposit

Build the customer booking page for Linh.

Required information:

- Booking ID: GS-1024.
- Customer: Nguyễn Thùy Linh.
- Booking state: Đã thống nhất lịch · Chờ cọc 30%.
- Date: Saturday, 24/10/2026.
- Package: Gói Tốt nghiệp Premium.
- Makeup: 13:00–14:00 with Mai.
- Photo shoot: 14:00–16:00 with Tuấn at Phòng B.
- Total price: 1.800.000đ.
- Deposit 30%: 540.000đ.
- Remaining 70%: 1.260.000đ.

Required presentation:

- Show the original 09:00 request as unavailable or crossed out.
- Show the agreed makeup and photo-shoot timeline.
- Display the package and payment breakdown clearly.
- Provide the button "Thanh toán cọc 30%".

Payment behavior:

- PA#2 does not implement real payment.
- The payment button must be disabled.
- Add a clearly visible note explaining that payment is not available in this prototype.
- Do not claim that the booking is confirmed or that the time is held.
- The current booking state remains Chờ cọc 30%.

## PHASE 3 — CONSISTENT BUSINESS RULES

Use exactly these status names consistently.

Conversation statuses:
- Chưa trả lời
- Đang tư vấn
- Đã chốt lịch
- Hoàn thành

Booking statuses:
- Chờ cọc 30%
- Đã đặt lịch
- Hoàn thành

Screen 3 may display:

"Đã thống nhất lịch · Chờ cọc 30%"

Important business rule:

The appointment slot is NOT held when the customer merely agrees to a time.

Only after:
1. The customer successfully pays the 30% deposit.
2. The system checks the staff and resources again.

Then the booking can move from Chờ cọc 30% to Đã đặt lịch.

Do not contradict this rule anywhere.

All three pages must tell exactly the same GS-1024 story.

## PHASE 4 — IMAGES AND VISUAL DESIGN

The brief explicitly warns that the original prototype contains identifiable real people whose image rights have not been verified.

Therefore:

- Do not reuse identifiable real-person photos without verified usage rights.
- Prefer initials, illustrations, abstract CSS visuals, or properly licensed images.
- Do not hotlink random images from websites.
- If licensed images are used, record their sources so they can later be documented in `PROTOTYPE.md`.
- Preserve the GradStudio visual identity: elegant, warm cream, brown, and gold accents.
- Keep the typography hierarchy and visual style consistent.
- Do not replace the original design with a generic ready-made template.

## PHASE 5 — TECHNICAL REQUIREMENTS

Follow `AGENTS.md` and the PA#2 rubric.

Use:
- Semantic HTML5.
- Plain CSS.
- One shared `styles.css`.
- Relative links between HTML pages.

Do not use:
- React, Vue, Angular, or JavaScript frameworks.
- Bootstrap or Tailwind.
- External UI libraries or dependencies.
- Backend, API, database, authentication, or real payment.
- JavaScript to generate the main content or navigate between pages.

JavaScript is unnecessary for this milestone. Prefer HTML and CSS only.

All important content and main navigation must work with JavaScript disabled.

Navigation must use real relative links:

- `index.html`
- `studio.html`
- `booking.html`

Do not use `href="#"`, fake links, or JavaScript onclick for main-flow navigation.

For actions that have no next page in PA#2, use disabled buttons with a visible explanation.

Remove all demo controls:
- Màn 1 / Màn 2 / Màn 3.
- Đặt lại demo.
- Mô phỏng phản hồi của Linh.
- Mô phỏng thanh toán.

Remove unrelated non-functional navigation items or clearly mark unavailable features as unavailable.

## PHASE 6 — RESPONSIVE DESIGN

All three pages must work at:

- 360px — mobile.
- 768px — tablet.
- 1280px — desktop.

Requirements:

- Mobile-first CSS.
- No horizontal overflow.
- No clipped text or overlapping content.
- Long Vietnamese names and service names must wrap.
- Images must fit their containers.
- Independent buttons and links must have a minimum height of 44px at 360px.
- Body text should be at least 16px.
- Text and button contrast should meet 4.5:1.
- Use the shared spacing scale defined in the project rules.
- Do not hide overflow to cover layout bugs.

## PHASE 7 — HTML AND ACCESSIBILITY

For every page:

- Exactly one `<h1>`.
- Correct heading hierarchy.
- Appropriate `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, and `<article>` landmarks.
- Every input must have a visible `<label>` correctly linked using `for` and `id`.
- Every meaningful image must have suitable `alt` text.
- Decorative images should use `alt=""`.
- Interactive elements must have understandable accessible names.
- Keyboard focus must be visible.
- Use `<a>` for navigation and `<button>` for actions.

## PHASE 8 — TESTING AND VERIFICATION

After implementation:

1. Check every internal link and confirm its target file exists.
2. Confirm the three pages work when opened directly from the repository folder.
3. Test all pages with JavaScript disabled.
4. Test responsive layout at 360px, 768px, and 1280px.
5. Check horizontal overflow using:

   `document.documentElement.scrollWidth > document.documentElement.clientWidth`

   Expected result: `false`.

6. Check for elements extending beyond the right edge.
7. Check all images, alt text, labels, headings, and landmarks.
8. Run W3C Nu Checker if available.
9. Check that no real-person images with unverified rights remain.

Do not claim that a test passed unless you actually ran it.

## PHASE 9 — FINAL DELIVERABLES

Implement the complete four-file result:

- `index.html`
- `styles.css`
- `studio.html`
- `booking.html`

Keep the original repository and Git history intact.

Do not delete `.git`, `docs/pa1/`, existing documentation, or unrelated assets without explicit approval.

Do not overwrite unrelated work from other team members.

Before finishing:

1. List every file created, modified, renamed, or removed.
2. Summarize the changes made to each screen.
3. Explain how the three screens connect.
4. List any remaining issues or assumptions.
5. Report the actual responsive and W3C test results.
6. Identify any requirements that could not be completed.

Do not stop after giving recommendations or a plan. Perform the implementation in the repository.

The goal is a complete, coherent, responsive GradStudio PA#2 prototype that follows the new final project brief and is ready for the team to review.
~~~

## 2. Follow-up prompts — theo thứ tự

### 1. Yêu cầu ghi phần việc của assistant vào hai file nhật ký/brief

> bổ sung phần của bạn nãy giờ tui nhắn vô 2 file sau

Kèm hai tệp: `brief.md` và `AI-LOG.md`. Assistant bổ sung Phần III này vào `brief.md` và ba mục ngày 2026-11-05 vào cuối `AI-LOG.md`; không sửa các phần của thành viên khác.

## 3. Ghi chú về phạm vi và tính trung thực

- Prompt tác vụ yêu cầu đọc `GradStudio-final-project-brief.pdf`, nhưng file này không được đính kèm nên assistant không đọc được; kết quả chỉ bám prompt và `AGENTS.md` bản đã đính kèm. Cần nhóm đối chiếu với PDF.
- `AGENTS.md` bản đính kèm ghi `styles.css` là stylesheet chung, còn Phần I và `AI-LOG.md` ghi nhóm đã thống nhất `style.css`. Ba trang assistant xuất ra đang liên kết `styles.css`; cần đồng bộ tên file (xem `AI-LOG.md`, mục ngày 2026-11-05).
- Các kết quả kiểm tra (tràn ngang, vùng bấm 44px, liên kết, Nu Checker HTML 0 thông báo) do assistant chạy trong sandbox của nó, không phải trên máy nhóm. Chưa chạy: bàn phím/focus, tương phản, DevTools Accessibility, screenshot và kết quả lưu vào `screenshots/`, `checks/`. Brief này không khẳng định các mục đó đã đạt.
- Assistant không thao tác Git: việc đổi tên `page2.html` → `studio.html`, `page3.html` → `booking.html` và xóa file cũ do nhóm tự thực hiện.

## Phần IV — Thành viên B, rà soát Màn 2 (06/11/2026)

Yêu cầu nguyên văn:

> tôi là thành viên B, thực hiện code html màn 2 (trước kia là page2.html) giờ là studio.html, tôi được giao công việc sau: kiểm tra lại trang html như phần trước có thể tham khảo file check manualindex. Đồng thời đọc và bổ subg các dile brief + ailog + prototype,  trong lúc check nếu html có sai gì thì bạn cứ sửa,

Phạm vi thực hiện là trang quản trị trên nhánh main, gồm danh sách hội thoại, đoạn chat sau khi Linh đồng ý, form Booking mới và lịch tài nguyên. Dùng cấu trúc báo cáo của M1 làm tham khảo và kiểm tra riêng M2. [Báo cáo và minh chứng M2](checks/manualcheckstudio.md)
