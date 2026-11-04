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

