# GradStudio — PA#2 Responsive Prototype

Repository này chứa prototype PA#2 responsive cho ba màn hình Main Flow của GradStudio. Nhóm được tự quyết định bố cục, nội dung trình bày và màu sắc; các màn hình trong brief là điểm khởi đầu để xác định tính năng cần có, không phải mẫu giao diện bắt buộc phải sao chép.

> **Phạm vi PA#2:** Có thể chọn static HTML/CSS hoặc React. Repository hiện đang dùng static HTML/CSS. Prototype chỉ mô phỏng ba màn hình được giao; không có đăng nhập, backend, lưu dữ liệu, đồng bộ chat, giữ lịch tự động hay thanh toán thật.

Thông báo mới của giảng viên cho phép nhóm tự thiết kế ba màn hình và chọn static HTML/CSS hoặc React; thông báo này thay thế hướng dẫn cũ “You do not design your own three screens”. Cần dùng brief và rubric PA#2 bản cập nhật cùng danh sách **Fix these** mới nhất. Hạn nộp không thay đổi.

## 1. Ba màn hình

| File | Vai trò | Nội dung và trạng thái |
|---|---|---|
| index.html | Khách hàng | Linh xem danh mục dịch vụ, giá tham khảo và chat hỏi về lịch 09:00 ngày 24/10. |
| studio.html | Nhân viên studio/Admin | Hiển thị trạng thái sau khi Linh đồng ý giờ 14:00; có ghi chú xung đột 09:00, lịch tài nguyên và form Booking mới. |
| booking.html | Khách hàng | Linh xem booking GS-1024 đang chờ cọc 30%, lịch makeup và lịch chụp. |

## Phân công phụ trách

- **Thành viên A — Nguyễn Anh Tuấn:** `index.html`.
- **Thành viên B — Lê Công Phúc:** `studio.html`.
- **Thành viên C — Đặng Hồng Minh:** `booking.html`.

Câu chuyện: **Khách hỏi dịch vụ → Nhân viên studio kiểm tra lịch và thống nhất giờ → Khách xem lại booking và khoản cọc.**

Đây là các đường dẫn của lựa chọn static hiện tại trong repository. Nhóm có thể sắp xếp giao diện và cách trình bày khác với PA#1 hoặc hình minh họa trong brief, miễn ba màn hình cùng đáp ứng các tính năng cần thiết và không tái tạo lỗi trong **Fix these**. `docs/pa1/LINK.md` chỉ là tài liệu tham khảo; theo hướng dẫn của giảng viên, nhóm không nộp lại ảnh màn hình PA#1.

## 2. Dữ liệu mẫu xuyên suốt

Các tên, ngày giờ, gói và mức giá dưới đây là nội dung mẫu đang dùng trong repository. Theo hướng dẫn mới, nhóm có thể chọn nội dung khác nếu brief/rubric cập nhật không yêu cầu giữ dữ kiện cụ thể; dù chọn nội dung nào, ba màn hình phải nhất quán và vẫn thể hiện đủ tính năng/luồng bắt buộc.

- Khách hàng: Nguyễn Thùy Linh; Admin: Thảo.
- Makeup với Mai: 13:00–14:00 ngày 24/10/2026.
- Chụp với Tuấn tại Phòng B: 14:00–16:00 cùng ngày.
- Gói Tốt nghiệp Premium: 2 giờ chụp, 30 ảnh chỉnh; loại buổi chụp là Tốt nghiệp cá nhân.
- Tổng giá: 1.800.000đ; cọc 30%: 540.000đ; còn lại 70%: 1.260.000đ, thanh toán sau buổi chụp.
- Mã booking minh họa: GS-1024.
- 09:00 là giờ khách hỏi ban đầu. Mai bận 08:00–12:00 nên giờ đó không khả dụng.
- `index.html` hiển thị ba dịch vụ và giá tham khảo: Kỷ yếu lớp từ 350.000đ/người, Tốt nghiệp từ 1.800.000đ, Chân dung/CV từ 690.000đ.
- Chat mẫu trên `index.html` có câu hỏi “Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?” và phản hồi “Để mình kiểm tra lịch cho bạn nhé.”

**Phân biệt giờ:** 13:00 là giờ bắt đầu makeup; 14:00 là giờ bắt đầu chụp. Đồng ý giờ trong chat chưa giữ lịch. Lịch chỉ được giữ sau khi cọc thành công và tài nguyên được kiểm tra lại.

## 3. Trạng thái và giới hạn prototype

Mỗi trang thể hiện một trạng thái của Main Flow. Các nhãn bên dưới là cách diễn đạt hiện dùng; nhóm có thể chọn câu chữ tương đương nếu rubric cập nhật không yêu cầu nhãn cố định, miễn ý nghĩa trạng thái rõ và nhất quán:

- Hội thoại dùng các trạng thái: Chưa trả lời, Đang tư vấn, Đã chốt lịch, Hoàn thành.
- Booking dùng các trạng thái: Chờ cọc 30%, Đã đặt lịch, Hoàn thành. Trang booking có thể ghi đầy đủ “Đã thống nhất lịch · Chờ cọc 30%”.
- `studio.html` thể hiện Linh đã đồng ý giờ 14:00 và nút Tạo booking đang bật.
- `booking.html` thể hiện booking đang chờ cọc; nút Thanh toán cọc 30% disabled và có ghi chú rằng thanh toán chưa khả dụng trong prototype.
- Gửi tin nhắn và các hành động khác không có trang đích cũng phải disabled, kèm ghi chú ngắn, hiển thị được.

Điều hướng giữa trang dùng liên kết thật, đường dẫn tương đối và nhãn cho biết ai tiếp tục khi đổi vai trò. Ví dụ: “Nhân viên studio: mở cuộc trò chuyện này”. Không có màn hình đăng nhập trong PA#2.

Không đưa các điều khiển demo của prototype cũ vào trang: Màn 1/Màn 2/Màn 3, Đặt lại demo, Mô phỏng phản hồi của Linh hoặc Mô phỏng thanh toán. Các menu, nút và liên kết không có đích phải được bỏ hoặc ghi rõ là chưa khả dụng. Không dùng href="#" làm liên kết giả; liên kết neo tới một id có thật trên cùng trang, như #chat, vẫn dùng được để cuộn tới nội dung.

## 4. Lựa chọn công nghệ, thiết kế và nội dung

- PA#2 cho phép chọn static HTML/CSS hoặc React. Repository này hiện chọn static HTML/CSS; không cần chuyển sang React.
- Với static, mở index.html trực tiếp bằng trình duyệt; nội dung và điều hướng chính vẫn dùng được khi JavaScript bị tắt.
- Nếu nhóm chuyển sang React, phải nộp thư mục build dist/ và ghi đường dẫn/route của từng màn hình trong PROTOTYPE.md. Mở prototype qua local server với JavaScript bật theo hướng dẫn mới của giảng viên; không mở file build trực tiếp bằng file://.
- Nhóm tự quyết định nội dung trình bày, bố cục, màu sắc và cách thể hiện. Vẫn phải giữ đủ tính năng/luồng mà brief hiện hành yêu cầu, tránh các lỗi trong **Fix these**, và không trình bày giao dịch hoặc dữ liệu giả như đã xảy ra thật.
- Dùng tiếng Việt cho nội dung giao diện, trừ khi yêu cầu môn học hiện hành quy định khác.
- Không dùng ảnh người thật có thể nhận diện khi chưa xác minh quyền. Dùng minh họa/chữ cái đầu hoặc ảnh có giấy phép phù hợp; ghi nguồn và giấy phép ảnh trong PROTOTYPE.md. Không hotlink ảnh từ website bên ngoài.
- Có thể phát triển nhận diện và design tokens phù hợp với lựa chọn của nhóm; tái sử dụng styles.css và pattern hiện có khi thuận tiện, không coi màu sắc hoặc thiết kế PA#1 là bắt buộc.
- Các khu vực ngoài phạm vi ba màn hình không được trình bày như chức năng đã hoạt động.

Brief final project mô tả phạm vi sản phẩm rộng hơn cho các PA tiếp theo. Những chức năng như tài khoản, quản trị nhiều studio, nhắc lịch, thanh toán trực tuyến, quản lý nhân viên và thư viện ảnh không phải phần cần triển khai vận hành trong PA#2.

## 5. Responsive

Thiết kế mobile-first với breakpoint dùng chung 768px và 1200px. Phải kiểm tra chính xác các viewport sau:

- 360px: mobile, nội dung xếp dọc; nút và liên kết độc lập cao tối thiểu 44px.
- 768px: tablet, dùng một hoặc hai cột phù hợp với nội dung; không ép layout ba cột desktop.
- 1280px: desktop, có thể hiển thị nhiều cột.

Yêu cầu cụ thể:

- Không có cuộn ngang, nội dung bị cắt hoặc thành phần chồng lấn.
- Chat trên index.html không che nội dung ở 360px.
- Trên studio.html, toàn bộ chat và form Booking mới phải đọc được bằng cách cuộn trang; lịch tài nguyên phải hiện đầy đủ tên khách, gói, giờ và trạng thái.
- Xung đột lịch phải có nhãn hoặc nội dung chữ, không chỉ dùng màu sắc/họa tiết.
- Nội dung dài phải xuống dòng; ảnh co theo khung chứa.
- Không dùng overflow-x: hidden để che lỗi tràn.

## 6. Mở và kiểm tra

1. Với lựa chọn static hiện tại, mở index.html trực tiếp bằng Chrome, Edge hoặc Firefox; không cần server hay cài package.
2. Với static, có thể tắt JavaScript trong DevTools và tải lại để kiểm tra nội dung, trạng thái và điều hướng chính. Nếu dùng React, chạy bằng local server với JavaScript bật như yêu cầu của giảng viên.
3. Dùng Device Toolbar để kiểm tra đúng 360px, 768px và 1280px; không chỉ thay đổi zoom.
4. Kiểm tra cuộn ngang trong Console:

~~~js
document.documentElement.scrollWidth > document.documentElement.clientWidth
~~~

Kết quả mong đợi là false.

5. Kiểm tra phần tử vượt cạnh phải:

~~~js
[...document.querySelectorAll('body *')].filter(
  element => element.getBoundingClientRect().right > document.documentElement.clientWidth
)
~~~

Kết quả mong đợi là mảng rỗng, trừ vùng cuộn ngang riêng được brief cho phép.

6. Chạy từng trang qua W3C Nu Checker; mục tiêu là 0 errors. Lưu kết quả thực tế trong checks/.
7. Xem Accessibility trong DevTools: landmarks, một h1, thứ tự heading, label hiển thị, alt, accessible name, focus bàn phím và độ tương phản.
8. Chụp screenshot full-page ở trạng thái chạy tương ứng với lựa chọn công nghệ: JavaScript tắt cho static, hoặc local server với JavaScript bật cho React. Làm theo kích thước và định dạng minh chứng trong rubric PA#2 cập nhật.

Tên screenshot cần nộp:

~~~text
screenshots/
├── index-360.png
├── index-768.png
├── index-1280.png
├── studio-360.png
├── studio-768.png
├── studio-1280.png
├── booking-360.png
├── booking-768.png
└── booking-1280.png
~~~

Tên kết quả validator có thể là validator-index, validator-studio và validator-booking, lưu dạng PNG hoặc TXT trong checks/.

Không ghi PASS hoặc báo đã kiểm tra nếu chưa thực sự chạy kiểm tra; không tạo screenshot hay kết quả validator giả.

## 7. Tài liệu và nộp bài

Trước khi nộp, hoàn thiện theo brief và rubric PA#2 cập nhật:

- PROTOTYPE.md: thông tin nhóm, cách mở prototype, đường dẫn/route của từng màn hình, mô tả ba trang và luồng, thay đổi so với PA#1, phần chưa nối, CSS/breakpoint/spacing, nguồn ảnh có giấy phép. Nếu dùng React, ghi đường dẫn từng màn hình và nộp dist/.
- brief.md: các prompt thực tế đã gửi cho AI theo đúng thứ tự; không chép đề bài thay cho prompt.
- AI-LOG.md: ghi công cụ, yêu cầu, phần AI làm sai hoặc được sửa, cách phát hiện và kết quả kiểm tra thực tế.
- SELF_ASSESSMENT_REPORT.md: tự đánh giá đủ 7 tiêu chí, kèm điểm và bằng chứng.
- screenshots/: ảnh full-page theo kích thước và trạng thái JavaScript được yêu cầu trong rubric cập nhật. Danh sách chín tên bên trên áp dụng cho bộ minh chứng hiện tại của nhóm.
- checks/: kết quả W3C cho từng trang.

Mỗi thành viên ghi lại phần việc, prompt và kiểm tra thực tế của mình. Không bịa prompt, lỗi, kết quả kiểm thử hoặc trải nghiệm.

Mỗi thành viên commit phần việc mình thực hiện; không gom toàn bộ thay đổi của nhóm vào một commit duy nhất. ZIP cuối cùng cần chứa repository, mã nguồn, tài liệu, docs/pa1, screenshots, checks và thư mục ẩn .git/. Nếu dùng React, thêm dist/. Không đưa node_modules vào ZIP.
