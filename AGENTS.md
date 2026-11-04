# AGENTS.md – Quy tắc dự án GradStudio PA#2

> **Đọc file này trước khi tạo hoặc sửa bất kỳ mã nguồn nào trong repository.**
> Đây là quy tắc chung của cả nhóm dành cho AI coding assistant. Khi yêu cầu riêng của một thành viên mâu thuẫn với tài liệu này, phải hỏi lại nhóm hoặc nêu rõ mâu thuẫn; không tự ý bỏ qua quy tắc.

## 1. Mục tiêu và phạm vi dự án

- Chuyển đúng **ba màn hình Main Flow đã nộp ở PA#1** thành ba trang HTML/CSS tĩnh.
- Thứ tự màn hình:
  1. `index.html` – Khách xem dịch vụ và tư vấn với GradStudio.
  2. `page2.html` – Admin tiếp nhận hội thoại, kiểm tra lịch và chuẩn bị booking.
  3. `page3.html` – Khách xem lịch chụp, thông tin booking và khoản cọc.
- Câu chuyện xuyên suốt: **khách hỏi dịch vụ → Admin xử lý yêu cầu → khách xem lại lịch và khoản cọc**.
- Nguồn tham chiếu chính là ba ảnh và `LINK.md` trong `docs/pa1/`. Khi ảnh chưa thể hiện đủ chi tiết, đọc `docs/pa1/LINK.md` và xem prototype gốc được liên kết trong tài liệu đó.
- Đây là **responsive static prototype**, không phải website vận hành hoàn chỉnh.

## 2. Công nghệ đã chốt

**Sử dụng HTML5 và CSS3 thuần (plain CSS), không sử dụng CSS framework.** Đây là lựa chọn chính thức của repository PA#2.

- Dùng HTML5 và CSS3 thuần.
- Dùng file CSS chung `style.css` cho cả ba trang; chỉ tạo CSS riêng khi có lý do rõ ràng và được nhóm thống nhất.
- `styles.css` là tệp khởi tạo tạm. Không dùng file này cho trang mới; chỉ xóa sau khi `page2.html` và `page3.html` đã chuyển sang `style.css`. Khi hoàn tất, repo chỉ giữ `style.css` làm stylesheet chung.
- Không dùng Bootstrap, Tailwind, Bulma hoặc framework CSS khác.
- Không dùng React, Vue, Angular, Svelte hoặc framework JavaScript nào. (Lưu ý java script: chỉ được sử dụng để làm các tương tác như theo rubik chấm điểm gồm đóng mở menu, đóng mỏ hộp thoại....)
- Không dùng thư viện giao diện, thư viện icon, package hoặc dependency bên ngoài.
- Không dùng CDN, font tải từ Internet hoặc tài nguyên từ xa làm điều kiện để trang hiển thị đúng.
- Không cần Node.js, npm, bundler, build step hoặc server. Mở trực tiếp `index.html` bằng trình duyệt phải xem được giao diện.
- Ưu tiên ảnh nằm trong repository, ví dụ `assets/images/`; không hotlink ảnh từ website bên ngoài.
- Không thêm JavaScript. Nội dung, bố cục chính và điều hướng phải hoạt động khi JavaScript bị tắt.

Không tự ý thay đổi stack đã chốt. Nếu có lý do bắt buộc phải thay đổi, hãy nêu lợi ích, rủi ro và chờ nhóm thống nhất trước khi sửa.

## 3. Những việc tuyệt đối không thực hiện (Never List)

- Không tạo backend, API, database, đăng nhập/xác thực hoặc xử lý CRUD.
- Không tích hợp thanh toán thật, không thu thập thông tin thanh toán và không thực hiện giao dịch tiền thật.
- Không tạo logic giả vờ rằng tin nhắn, booking, lịch nhân viên hoặc trạng thái thanh toán đã được lưu hay đồng bộ giữa các trang.
- Không dùng JavaScript để dựng nội dung chính, điều hướng chính hoặc làm cho nội dung chỉ xuất hiện sau khi chạy script.
- Không dùng React, Vue, framework JavaScript, CSS framework hoặc dependency ngoài.
- Không mở rộng phạm vi thành website nhiều trang hơn ba màn hình PA#1.
- Không thay thế thiết kế PA#1 bằng template có sẵn hoặc một website khác.
- Không tự ý xóa nội dung quan trọng, đổi câu chuyện, đổi vai trò người dùng hoặc thay đổi thông tin booking mẫu.
- Không tự ý đổi logo, theme, bảng màu hoặc phong cách thương hiệu GradStudio.
- Không dùng `href="#"` hoặc liên kết giả cho điều hướng thuộc Main Flow.
- Không dùng đường dẫn tuyệt đối bắt đầu bằng `/` cho trang nội bộ; phải dùng đường dẫn tương đối như `page2.html`.
- Không dùng `onclick` hoặc JavaScript để thay thế liên kết chuyển trang.
- Không dùng `overflow-x: hidden` trên `html`, `body` hoặc wrapper để che lỗi tràn nội dung.
- Không đặt chiều rộng cố định khiến trang bị tràn ở màn hình nhỏ; tránh các kiểu như `width: 1280px` cho layout chính.
- Không dùng `!important` trong CSS tự viết.
- Không thêm nhiều giá trị khoảng cách tùy tiện ngoài spacing scale đã thống nhất.
- Không tự nhận đã chạy kiểm thử, W3C, Accessibility hoặc chụp screenshot nếu thực tế chưa làm.
- Không bịa prompt, lỗi AI, kết quả kiểm thử hoặc nội dung AI-LOG.

## 4. Nhận diện và nguyên tắc thiết kế GradStudio

- Giữ nhận diện của PA#1: phong cách thanh lịch, nền kem/trắng ấm, nâu trầm và điểm nhấn nâu vàng.
- Giữ tinh thần typography của thiết kế gốc: tiêu đề có thể dùng serif; nội dung và điều khiển dùng sans-serif dễ đọc.
- Giữ logo, hình ảnh chính, nội dung và thứ tự thông tin quan trọng theo ảnh PA#1.
- Ưu tiên sử dụng lại ảnh trong `docs/pa1/` hoặc ảnh đã được nhóm đưa vào `assets/images/`.
- Chỉ thay ảnh khi ảnh gốc không sử dụng được hoặc có lý do thiết kế rõ ràng; nếu dùng ảnh mới, ghi nhận nguồn và cập nhật tài liệu liên quan.
- Được phép thay đổi cách sắp xếp, kích thước, khoảng cách và thứ tự hiển thị thành phần để phù hợp với mobile/tablet.
- Không cần giữ nguyên từng pixel của PA#1; mục tiêu là giữ nhận diện và nội dung cốt lõi, đồng thời làm responsive.
- Mọi khác biệt có ý nghĩa so với PA#1 phải được liệt kê và giải thích trong `PROTOTYPE.md`, mục **Changed since PA#1**.
- Mỗi trang cần có một nội dung hoặc khu vực thị giác chính rõ ràng; không làm tất cả thành phần nổi bật ngang nhau.

## 5. Design system đã chốt

### 5.1. Bảng màu

Dùng các CSS custom properties trong `:root` của `style.css` làm nguồn màu chung. Bộ màu khởi tạo của repository:

```css
:root {
  --color-background: #faf6f0;
  --color-surface: #fffdfa;
  --color-text: #2c2219;
  --color-muted: #65584c;
  --color-accent: #806044;
  --color-border: #e7ddd1;
}
```

- Có thể tinh chỉnh các giá trị trên để khớp ảnh PA#1 hơn, nhưng phải được cả nhóm thống nhất và áp dụng nhất quán trên cả ba trang.
- Không tự tạo màu mới tùy tiện cho từng trang.
- Màu chữ thường và chữ trên nút phải đạt tỷ lệ tương phản tối thiểu **4.5:1** với nền tương ứng.

### 5.2. Typography

- Kích thước body text tối thiểu **16px**.
- Có thể dùng serif cho logo/tiêu đề và sans-serif cho nội dung, biểu mẫu, nút.
- Dùng font có sẵn trên hệ điều hành với fallback phù hợp; không tải font từ CDN.
- Duy trì cấp bậc chữ rõ ràng giữa `h1`, `h2`, `h3`, nội dung, chú thích và nhãn.
- Không giảm chữ quá nhỏ để ép nhiều nội dung vào một màn hình.

### 5.3. Spacing scale

**Dùng hệ thống khoảng cách theo bội số 4px**, thống nhất giữa cả ba trang. Khai báo và tái sử dụng các biến sau trong `style.css`:

| CSS variable | Giá trị | Mục đích tham khảo |
|---|---:|---|
| `--space-1` | `4px` | Khoảng cách rất nhỏ |
| `--space-2` | `8px` | Khoảng cách giữa thành phần gần nhau |
| `--space-3` | `12px` | Khoảng cách nhỏ |
| `--space-4` | `16px` | Padding/gap cơ bản |
| `--space-6` | `24px` | Khoảng cách giữa nhóm thành phần |
| `--space-8` | `32px` | Padding khu vực hoặc khoảng cách lớn |
| `--space-12` | `48px` | Khoảng cách giữa section |
| `--space-16` | `64px` | Khoảng cách lớn trên desktop |

Ví dụ khai báo:

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
}
```

- Ưu tiên dùng các biến này cho `margin`, `padding`, `gap` và khoảng cách giữa các khu vực.
- Chỉ dùng giá trị ngoài scale khi thật sự cần thiết cho đường viền, kích thước icon, căn chỉnh chi tiết hoặc yêu cầu đặc thù; không tạo hàng loạt giá trị khoảng cách lẻ.

## 6. Breakpoints và quy tắc Responsive

Thiết kế theo hướng **mobile-first**: viết kiểu hiển thị điện thoại trước, sau đó mở rộng bằng media query.

| Thiết bị | Dải chiều rộng | Quy tắc |
|---|---:|---|
| Mobile | `0–767px` | Một cột; nội dung xếp dọc; điều khiển dễ chạm |
| Tablet | `768–1199px` | Tổ chức lại thành một hoặc hai cột tùy nội dung; không ép layout desktop vào màn hình hẹp |
| Desktop | `1280px trở lên` | Có thể dùng nhiều cột và bố cục đầy đủ như thiết kế PA#1 |

Hai breakpoint chuẩn của dự án:

```css
/* Kiểu mặc định: mobile, dưới 768px */

@media (min-width: 768px) {
  /* Tablet trở lên */
}

@media (min-width: 1200px) {
  /* Desktop */
}
```

Yêu cầu bắt buộc:

- Phải kiểm tra chính xác các độ rộng **360px, 768px và 1280px** trên cả ba trang.
- Không có thanh cuộn ngang, nội dung bị cắt hoặc thành phần chồng lấn.
- Không dùng fixed width cho wrapper, cột hoặc card theo cách làm tràn viewport. Ưu tiên `%`, `max-width`, `minmax(0, 1fr)`, Flexbox và CSS Grid.
- Với Grid/Flexbox, nhớ cho phép phần tử co lại; cân nhắc `min-width: 0`, `minmax(0, 1fr)`, `overflow-wrap: anywhere` cho nội dung dài khi phù hợp.
- Ảnh phải co giãn theo khung chứa, thường dùng `max-width: 100%; height: auto;`.
- Tên khách, tên gói, nội dung chat và thông tin lịch dài phải xuống dòng, không đẩy rộng trang.
- Ở 360px, nút và liên kết đứng độc lập phải có chiều cao tối thiểu **44px**. Liên kết nằm trong câu văn được miễn yêu cầu này theo rubric.
- Trên mobile, Màn 2 không được cố giữ ba cột desktop bằng cách thu nhỏ. Hãy xếp các vùng hội thoại, lịch tài nguyên và booking theo thứ tự hợp lý.
- Không được che lỗi bằng `overflow-x: hidden`.
- Không chỉ kiểm tra responsive bằng cách thay đổi zoom trình duyệt; phải dùng viewport đúng kích thước.

## 7. Quy tắc HTML và Accessibility

Mỗi trang phải tuân thủ:

- Có `<!doctype html>`, `<html lang="vi">`, `<meta charset="UTF-8">` và `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- Dùng semantic landmarks phù hợp: `<header>`, `<nav>`, `<main>`, `<footer>`; dùng `<section>`/`<article>` khi đúng ngữ nghĩa.
- Mỗi trang có đúng **một `<h1>`**; heading theo thứ tự, không bỏ cấp tùy tiện.
- Dùng `<a href="...">` cho điều hướng sang trang khác.
- Dùng `<button type="button">` cho hành động tại chỗ; không giả dạng `<div>` hoặc `<span>` thành nút.
- Mỗi input/select/textarea phải có `<label>` hiển thị và liên kết đúng bằng `for`/`id`; placeholder không thay thế label.
- Ảnh có ý nghĩa phải có `alt` mô tả; ảnh trang trí dùng `alt=""`.
- Thành phần tương tác phải có tên dễ hiểu, trạng thái phù hợp và có thể nhận biết bằng bàn phím.
- Không dùng màu sắc làm cách duy nhất để biểu thị trạng thái.
- Không tạo form gửi dữ liệu tới backend không tồn tại.
- Mục tiêu W3C Nu Checker: **0 errors cho từng trang**. Warnings cần xem xét, không được bỏ qua nếu ảnh hưởng khả năng truy cập hoặc hiển thị.
- Kiểm tra cả ngữ nghĩa trong DevTools → Elements → Accessibility; HTML hợp lệ không đồng nghĩa tự động có Accessibility tốt.

## 8. Liên kết và dữ liệu ba màn hình

- `index.html` là trang đầu tiên.
- Các liên kết thuộc Main Flow phải mở đúng file tồn tại khi mở trang trực tiếp từ thư mục.
- Dùng liên kết tương đối, ví dụ `href="page2.html"` và `href="page3.html"`.
- Không dùng `/page2.html`, URL chỉ hoạt động trên server, `href="#"` hoặc `onclick` cho điều hướng chính.
- Các mục ngoài ba màn hình có thể chưa được nối; cần ghi rõ trong `PROTOTYPE.md`, mục **Not wired yet**.
- Nội dung là dữ liệu tĩnh ghi trực tiếp trong HTML. Dữ liệu minh họa cần thống nhất theo câu chuyện trong `docs/pa1/LINK.md`:
  - Khách hàng: Nguyễn Thùy Linh.
  - Ngày: 24/10/2026.
  - Makeup với Mai: 13:00–14:00.
  - Chụp với Tuấn: 14:00–16:00.
  - Gói: Tốt nghiệp Premium.
  - Tổng giá: 1.800.000đ.
  - Cọc 30%: 540.000đ.
  - Còn lại 70%: 1.260.000đ, thanh toán sau buổi chụp.
  - Mã booking minh họa: GS-1024.
- Phải phân biệt rõ **13:00 là giờ bắt đầu makeup** và **14:00 là giờ bắt đầu chụp**.
- Dùng nội dung tiếng Việt thực tế, không dùng Lorem Ipsum. Ít nhất một nội dung dài (ví dụ tên khách hoặc tên gói dịch vụ dài) phải được giữ để kiểm tra khả năng xuống dòng.
- Việc chuyển trang chỉ để người chấm xem các màn hình trong luồng; không được mô tả như dữ liệu thật đã được đồng bộ.

## 9. Quy trình làm việc của AI assistant

### Trước khi sửa

1. Đọc `README.md` và toàn bộ file `AGENTS.md` này.
2. Xem đúng ảnh màn hình liên quan trong `docs/pa1/` và đọc `docs/pa1/LINK.md` khi cần.
3. Kiểm tra `style.css` và cấu trúc hiện tại trước khi tạo CSS mới.
4. Xác định rõ trang/tệp được giao; không tự ý sửa trang của thành viên khác hoặc thay đổi stack chung.
5. Nếu yêu cầu chưa đủ thông tin hoặc mâu thuẫn với quy tắc, nêu rõ giả định trước khi làm; không tự suy diễn nội dung nghiệp vụ.

### Khi thực hiện

1. Ưu tiên chỉnh sửa tối thiểu, tái sử dụng CSS tokens và component pattern hiện có.
2. Giữ nội dung, nhận diện và thứ tự luồng PA#1.
3. Không thêm dependency, script, framework hoặc tài nguyên từ xa.
4. Không tạo chức năng backend/giả lập đồng bộ ngoài phạm vi prototype tĩnh.
5. Viết HTML/CSS dễ đọc, có tên class rõ ràng và tránh lặp code không cần thiết.

### Sau khi thực hiện

1. Nêu rõ file nào đã tạo/sửa và thay đổi chính.
2. Kiểm tra đường dẫn CSS, ảnh và liên kết giữa các trang.
3. Kiểm tra ở 360px, 768px và 1280px nếu môi trường cho phép.
4. Khi có trình duyệt, kiểm tra với JavaScript tắt và quan sát nội dung có còn hiển thị không.
5. Chạy W3C Nu Checker nếu có thể; nếu không chạy được, ghi rõ để thành viên tự thực hiện.
6. Không được báo “đã kiểm tra”, “đạt 0 lỗi” hoặc “không tràn” nếu chưa thực sự chạy kiểm tra.
7. Nêu các lỗi còn tồn tại và hướng dẫn kiểm tra tiếp.
8. Gợi ý thông tin thực tế cần ghi vào `AI-LOG.md`; không tự viết thay trải nghiệm hoặc kết quả kiểm thử của thành viên.

## 10. Checklist kiểm tra hoàn thành

Một trang chỉ được xem là hoàn thành khi đã rà soát các mục sau:

### Chức năng và luồng

- [ ] Đúng màn hình tương ứng của PA#1.
- [ ] Mở trực tiếp bằng file HTML từ thư mục.
- [ ] Mọi liên kết trong Main Flow mở đúng file tồn tại.
- [ ] Không phụ thuộc JavaScript để hiển thị nội dung hoặc điều hướng chính.
- [ ] Dữ liệu mẫu phù hợp với câu chuyện GradStudio và không giả vờ là dữ liệu thật được đồng bộ.

### Responsive

- [ ] Đã kiểm tra ở 360px, 768px và 1280px.
- [ ] `document.documentElement.scrollWidth > document.documentElement.clientWidth` trả về `false` ở từng kích thước.
- [ ] Không có phần tử bị cắt khỏi cạnh phải viewport. Có thể kiểm tra bằng:

```js
[...document.querySelectorAll('body *')].filter(
  element => element.getBoundingClientRect().right > document.documentElement.clientWidth
)
```

Kết quả mong đợi là `[]`, ngoại trừ nội dung nằm trong vùng cuộn ngang riêng được phép như wrapper của bảng.

- [ ] Không dùng `overflow-x: hidden` để che lỗi.
- [ ] Nút/liên kết độc lập cao tối thiểu 44px tại 360px.
- [ ] Nội dung dài xuống dòng và ảnh không tràn.

### HTML, Accessibility và thiết kế

- [ ] W3C Nu Checker có 0 errors.
- [ ] Có landmarks và đúng một `h1`; heading không nhảy cấp.
- [ ] Input có label; ảnh có alt phù hợp.
- [ ] Body text từ 16px; chữ và nút đạt tương phản tối thiểu 4.5:1.
- [ ] Spacing dùng scale chung; không có `!important` trong CSS tự viết.
- [ ] DevTools Accessibility đã được xem xét.

### Minh chứng

- [ ] Có screenshot full-page ở cả ba kích thước khi JavaScript tắt.
- [ ] Tên ảnh theo dạng `<page>-360.png`, `<page>-768.png`, `<page>-1280.png`.
- [ ] Kết quả W3C được lưu trong `checks/` cho từng trang.
- [ ] Những thay đổi so với PA#1 có lý do để ghi vào `PROTOTYPE.md`.
- [ ] Prompt, lỗi, cách phát hiện và cách sửa thực tế được ghi vào `brief.md`/`AI-LOG.md` đúng vai trò; không bịa thông tin.

---

**Nguyên tắc cuối cùng:** Ưu tiên tái tạo đúng ba màn hình PA#1, giữ hệ thống thiết kế GradStudio nhất quán, làm responsive thực chất và chứng minh được kết quả bằng kiểm thử. Không thêm công nghệ hoặc chức năng ngoài phạm vi PA#2.
