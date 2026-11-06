# Brief — GradStudio PA#2 Responsive Prototype

Tài liệu này lưu lại prompt thực tế liên quan đến việc xây dựng và chỉnh `index.html` theo thứ tự đã gửi. Prompt mở đầu bên dưới được chép nguyên văn từ tệp đính kèm `Pasted text.txt`; các follow-up được chép lại từ lời nhắn người dùng, còn ghi chú về ảnh chỉ mô tả tài liệu đính kèm. Quy tắc đội nhóm được ghi riêng ở phần sau để không nhầm với prompt tác vụ. Rubric PDF là tài liệu chấm điểm, không phải yêu cầu thiết kế của người dùng.

## Phân công phụ trách và tên file hiện tại

- **Thành viên A — Nguyễn Anh Tuấn:** `index.html`.
- **Thành viên B — Lê Công Phúc:** `studio.html`.
- **Thành viên C — Đặng Hồng Minh:** `booking.html`.

Trong các prompt lịch sử, “Màn 1/2/3” lần lượt tương ứng với `index.html`, `studio.html`, `booking.html`. Những prompt được trích nguyên văn vẫn giữ cách gọi tại thời điểm gửi; phần mô tả và tài liệu hiện hành dùng tên file HTML.

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
- Prompt cũ có nhắc tới ảnh PA#1 trong `docs/pa1/`. Nhóm chủ động xóa các ảnh đó vì giảng viên xác nhận PA#2 không yêu cầu nộp lại ảnh màn hình PA#1; prompt được giữ nguyên để lưu lịch sử yêu cầu, không có nghĩa các ảnh hiện vẫn nằm trong repository.
- Prompt ban đầu ghi có sự chưa thống nhất giữa `styles.css` và `style.css`; follow-up số 1 xác nhận nhóm đã thống nhất dùng `style.css`. Quy tắc dự án nêu rõ `styles.css` chỉ được xóa sau khi hai trang còn lại chuyển xong.
- Bản ghi tác vụ cũ có nhắc `manualcheckM1.md`; báo cáo kiểm tra hiện trong repository cho `index.html` là `checks/manualcheckindex.md`. Brief này không tự khẳng định đã chạy W3C, kiểm tra Accessibility hoặc xác minh đa trình duyệt.

---

# PHẦN II: BRIEF VÀ PROMPT DỰNG LẠI BA MÀN HÌNH THEO FINAL BRIEF (Claude, 2026-11-05)

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

Kèm hai tệp: `brief.md` và `AI-LOG.md`. Assistant bổ sung phần dựng lại này vào `brief.md` và ba mục ngày 2026-11-05 vào `AI-LOG.md`; không sửa các phần của thành viên khác.

## 3. Ghi chú về phạm vi và tính trung thực

- Bản ghi tác vụ cho biết `GradStudio-final-project-brief.pdf` không được đính kèm ở lượt đó nên assistant chưa đọc được; kết quả chỉ dựa trên prompt và `AGENTS.md` đi kèm. Việc đối chiếu PDF chưa được thực hiện trong lượt đó.
- `AGENTS.md` bản đính kèm ghi `styles.css` là stylesheet chung, còn Phần I và `AI-LOG.md` ghi nhóm đã thống nhất `style.css`. Ba trang assistant xuất ra đang liên kết `styles.css`; phản hồi ghi nhận sự khác biệt và nêu hai phương án đồng bộ tên file (xem `AI-LOG.md`, mục ngày 2026-11-05).
- Các kết quả kiểm tra (tràn ngang, vùng bấm 44px, liên kết, Nu Checker HTML 0 thông báo) do assistant chạy trong sandbox của nó, không phải trên máy nhóm. Chưa chạy: bàn phím/focus, tương phản, DevTools Accessibility, screenshot và kết quả lưu vào `screenshots/`, `checks/`. Brief này không khẳng định các mục đó đã đạt.
- Assistant không thao tác Git: việc đổi tên `page2.html` → `studio.html`, `page3.html` → `booking.html` và xóa file cũ do nhóm tự thực hiện.

---

# PHẦN III: BRIEF VÀ PROMPT CỦA THÀNH VIÊN B — LÊ CÔNG PHÚC (`studio.html`, 06/11/2026)

Yêu cầu nguyên văn:

> tôi là thành viên B, thực hiện code html màn 2 (trước kia là page2.html) giờ là studio.html, tôi được giao công việc sau: kiểm tra lại trang html như phần trước có thể tham khảo file check manualindex. Đồng thời đọc và bổ subg các dile brief + ailog + prototype,  trong lúc check nếu html có sai gì thì bạn cứ sửa,

Phạm vi thực hiện là `studio.html` trên nhánh main, gồm danh sách hội thoại, đoạn chat sau khi Linh đồng ý, form Booking mới và lịch tài nguyên. Dùng báo cáo của `index.html` làm tham khảo và kiểm tra riêng trang này. [Báo cáo và minh chứng `studio.html`](checks/manualcheckstudio.md)

---

# PHẦN IV: BRIEF VÀ PROMPT CỦA THÀNH VIÊN C — ĐẶNG HỒNG MINH (`booking.html`, 06/11/2026)

Phần này ghi lại các prompt và chỉ dẫn thực tế của Thành viên C dùng để yêu cầu Assistant rà soát, hoàn thiện và khắc phục lỗi cho `booking.html` (Customer appointment & deposit), đồng thời quản lý bộ ảnh kiểm thử (`screenshots/booking-*.png`, `checks/validator-booking.png`) và lập hồ sơ kiểm thử `checks/manualcheckbooking.md`.

## 1. Prompt tác vụ cho `booking.html`

# TASK: Rà soát, hoàn thiện và kiểm thử Màn 3 (`booking.html`) – GradStudio PA#2

Bạn là Frontend Assistant. Hãy hỗ trợ tôi rà soát và kiểm thử màn hình thứ ba của dự án GradStudio PA#2 bằng HTML5 và CSS3 thuần.  
Tôi là thành viên C, chịu trách nhiệm phát triển và kiểm thử `booking.html`, tổng hợp bộ ảnh minh chứng responsive (`screenshots/`) và kết quả W3C (`checks/`).

### A. Tài liệu tham chiếu bắt buộc
1. `AGENTS.md` – Quy tắc bắt buộc của cả nhóm (HTML5/CSS3 thuần, stylesheet chung `styles.css`, không framework, không dependency, không backend, mobile-first, spacing 4px).
2. `PROTOTYPE.md` – Mô tả luồng 3 màn hình:
   - Màn 1: `index.html` (Khách xem dịch vụ và hỏi studio).
   - Màn 2: `studio.html` (Nhân viên studio tư vấn, xử lý xung đột 09:00 và chuẩn bị booking).
   - Màn 3: `booking.html` (Khách hàng Nguyễn Thùy Linh xem lịch đã thống nhất và booking đang chờ cọc 30%).
3. Dữ liệu chuẩn thống nhất:
   - Khách hàng: Nguyễn Thùy Linh.
   - Ngày chụp: Thứ Bảy, 24/10/2026.
   - Mốc ban đầu: 09:00 bị xung đột do Mai bận 08:00–12:00, gạch ngang `<del>09:00</del>` kèm nhãn "Không khả dụng".
   - Giờ đã thống nhất: Makeup với Mai 13:00–14:00; Chụp ảnh với Tuấn 14:00–16:00 (Phòng B).
   - Gói: Gói Tốt nghiệp Premium (2 giờ chụp · 30 ảnh chỉnh).
   - Chi phí: Tổng 1.800.000đ; Cọc 30% 540.000đ; Còn lại 70% 1.260.000đ (thanh toán sau buổi chụp).
   - Mã booking: GS-1024.
   - Trạng thái: "Đã thống nhất lịch · Chờ cọc 30%".
   - Nút "Thanh toán cọc 30%": disabled kèm ghi chú giải thích tính năng chưa khả dụng trong prototype.

### B. Phạm vi công việc của Thành viên C
1. **Kiểm tra ngữ nghĩa & W3C HTML:** Đảm bảo `booking.html` đạt 0 lỗi trên W3C Nu Html Checker.
2. **Kiểm tra Responsive:** Đảm bảo trang co giãn chuẩn trên 3 kích thước: 360px (mobile), 768px (tablet), 1280px (desktop), không có thanh cuộn ngang, nút bấm độc lập cao tối thiểu 44px.
3. **Kiểm tra khi tắt JavaScript:** Đảm bảo toàn bộ nội dung lịch tuần, timeline, chi tiết booking và khoản cọc hiển thị 100% khi tắt JS.
4. **Minh chứng kiểm thử:** Chụp ảnh full-page lưu vào `screenshots/booking-360.png`, `screenshots/booking-768.png`, `screenshots/booking-1280.png` và lưu kết quả W3C vào `checks/validator-booking.png`.
5. **Báo cáo kiểm thử:** Soạn thảo `checks/manualcheckbooking.md` và liên kết vào `PROTOTYPE.md`.

---

## 2. Các Follow-up Prompts thực tế của Thành viên C — Đặng Hồng Minh (theo thứ tự)

### 1. Hướng dẫn thêm hình ảnh cho booking.html
> hướng dẫn tôi thêm hình ảnh cho booking.html đi

*Người dùng hỏi vị trí có thể bổ sung hình vào `booking.html`. Phản hồi đề cập ảnh gói chụp `TotNghiep.jpg` trong card booking và ảnh avatar; đồng thời ghi nhận các yêu cầu về ảnh cục bộ, nội dung `alt`, hiển thị responsive và quyền sử dụng ảnh.*

### 2. Gửi kết quả W3C Nu Checker và khắc phục lỗi ARIA trên thẻ p
> [Người dùng gửi ảnh chụp màn hình kết quả kiểm tra W3C Nu Html Checker cho booking.html báo lỗi tại dòng 20]  
> `Error: The aria-label attribute must not be specified on any p element unless the element has a role value other than caption, code, deletion, emphasis, generic, insertion, paragraph, presentation, strong, subscript, or superscript.`  
> `From line 20, column 7; to line 20, column 92: <p class="user-profile" aria-label="Đang xem với vai trò khách hàng Nguyễn Thùy Linh">`

*Assistant phân tích nguyên nhân lỗi: thẻ `<p>` mặc định mang vai trò paragraph, chuẩn ARIA cấm đặt `aria-label` trực tiếp lên thẻ `<p>` nếu không có role khác; hơn nữa văn bản bên trong đã có sẵn `<span>Linh · Khách hàng</span>`. Assistant sửa trực tiếp bằng cách gỡ bỏ `aria-label` trên thẻ `<p class="user-profile">` trong `booking.html` (đồng bộ hoàn toàn với `index.html` và `studio.html`). Sau khi sửa, người dùng kiểm tra lại trên W3C đạt **0 Errors, 0 Warnings** và lưu minh chứng vào `checks/validator-booking.png`.*

### 3. Lập báo cáo kiểm thử Màn 3 và cập nhật tài liệu dự án
> Tôi hiện tại cần bạn sửa cho tôi phần II trong file brief.md, loại bỏ những gì liên quan đến page3 đi và cập nhật cho tôi thành booking.html, lưu ý để sau phần Dựng lại 3 màn hình

*Assistant biên soạn tài liệu `checks/manualcheckbooking.md`, cập nhật liên kết trong `PROTOTYPE.md`, đồng thời cơ cấu lại `brief.md` đưa phần việc của Thành viên C với `booking.html` đặt sau phần Dựng lại 3 màn hình theo đúng trình tự thời gian.*

---

## 3. Ghi chú về phạm vi và tính minh bạch của Thành viên C

- Toàn bộ nội dung của Thành viên C đã được đồng bộ với cấu trúc 3 màn hình mới: `index.html`, `studio.html`, `booking.html` và stylesheet chung `styles.css`.
- Lỗi W3C duy nhất trên `booking.html` được phát hiện qua ảnh chụp kiểm tra thực tế bằng công cụ Nu Html Checker và được khắc phục triệt để bằng chuẩn HTML5 ngữ nghĩa.
- Báo cáo kiểm thử `checks/manualcheckbooking.md` cùng bộ ảnh minh chứng trong `screenshots/` (`booking-360.png`, `booking-768.png`, `booking-1280.png`) và `checks/validator-booking.png` phản ánh chính xác kết quả kiểm thử thực tế trên trình duyệt khi tắt JavaScript.

---

# PHẦN V: PROMPT RÀ SOÁT HỒ SƠ PA#2 VÀ ẢNH PA#1 (06/11/2026)

Yêu cầu nguyên văn:

> Tui đã chỉnh lại làm ơn giúp tôi xem tôi có bỏ xót phần nào của AI không, xoá giúp tôi mấy phần dấu vết của AI kiur khuyên tôi này kia đồng thời file ảnh của pa1 là tôi chủ động xoá do thầy không yêu cầu nộp lại á tui không biết là đã chỉnh sửa vụ này ở các tài liệu liên quan chưa check dùm tôi xoá/ sửa nếu cần

---

# PHẦN VI: PROMPT ĐỒNG BỘ TÊN THÀNH VIÊN VÀ FILE HTML (06/11/2026)

Yêu cầu nguyên văn:

> uk quên nữa sẵn giúp tui dò lại các file luôn, là 1 số file ghi bạn B bạn C thì bận b LÀ Phúc Bạn C là Minh á, bô sung ghi đúng tên người chịu trách nhiệm bạn A hay bạn phụ trách index là Tuấn. Ngoài ra 1 số tài  liệu hiện ghi màn hình M1, M2,M3 ghi đúng tên file làm hình htlm
