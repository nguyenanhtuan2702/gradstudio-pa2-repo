# Báo cáo kiểm tra — `index.html`

**Dự án:** GradStudio — PA#2 Responsive Prototype  
**Trang được kiểm tra:** `index.html` — Dịch vụ và chat (Khách hàng)\
**Người phụ trách màn hình:** Nguyễn Anh Tuấn (Thành viên A)\
**Ngày kiểm thử:** 05/11/2026  
**Phạm vi:** Kiểm thử giao diện, responsive, điều hướng, JavaScript-disabled, HTML và Accessibility.

## 1. Tổng quan kết quả

| Nhóm kiểm thử | Kết quả | Ghi chú |
|---|---|---|
| Responsive | PASS | Đã kiểm tra tại 360px, 768px và 1280px. |
| Điều hướng và liên kết | PASS | Các liên kết/điểm điều hướng trong phạm vi `index.html` hoạt động đúng. |
| JavaScript bật | PASS | Nội dung và điều hướng chính hoạt động; trang không phụ thuộc JavaScript. |
| JavaScript tắt | PASS | Nội dung vẫn hiển thị và các liên kết chính vẫn sử dụng được. |
| W3C HTML Validator | PASS | Kết quả kiểm tra được xác nhận không có lỗi HTML. |
| Semantic HTML | PASS | Có cấu trúc landmark phù hợp và đúng một thẻ `h1`. |
| Accessibility cơ bản | PASS | Đã kiểm tra label, accessible name, keyboard navigation và focus. |
| Contrast | PASS | Đã kiểm tra độ tương phản theo ngưỡng yêu cầu của PA#2. |

## 2. Môi trường và phương pháp kiểm thử

- **Trình duyệt:** Google Chrome.
- **Công cụ:** Chrome DevTools (Device Toolbar, Elements, Accessibility, Console) và W3C Nu HTML Checker.
- **Cách kiểm thử:** Kiểm tra trực tiếp từng trạng thái giao diện; thay đổi viewport bằng Device Toolbar; tắt JavaScript và tải lại trang; kiểm tra cấu trúc HTML và Accessibility trong DevTools.

## 3. Responsive testing

Đã kiểm tra trang tại ba chiều rộng viewport theo yêu cầu PA#2.

| Viewport | Thiết bị tham chiếu | Kết quả | Nội dung kiểm tra |
|---:|---|---|---|
| 360px | Điện thoại | PASS | Bố cục một cột; nội dung và nút không chồng lấn hoặc tràn ngang; các nút/liên kết độc lập đáp ứng chiều cao vùng bấm tối thiểu 44px. [Ảnh](../screenshots/index-360.png) |
| 768px | Tablet | PASS | Bố cục chuyển sang dạng phù hợp với tablet; các thẻ nội dung không bị ép quá hẹp hoặc chồng lấn. [Ảnh](../screenshots/index-768.png) |
| 1280px | Desktop | PASS | Bố cục desktop hiển thị đầy đủ; các khu vực nội dung và thẻ dịch vụ được sắp xếp phù hợp. [Ảnh](../screenshots/index-1280.png) |

Các điểm responsive đã rà soát ở từng viewport:

- Không xuất hiện thanh cuộn ngang.
- Không có nội dung quan trọng bị cắt khỏi viewport.
- Không có thành phần giao diện chồng lấn.
- Nội dung dài có thể xuống dòng.
- Thành phần hình minh họa không làm tràn khung chứa.
- Các nút và liên kết độc lập có vùng bấm phù hợp tại viewport 360px.

## 4. Navigation và interaction testing

| Thành phần | Kết quả | Ghi chú |
|---|---|---|
| Liên kết điều hướng Dịch vụ | PASS | Mở đúng khu vực/trang dịch vụ theo cách triển khai hiện tại. |
| Liên kết Lịch chụp của tôi | PASS | Mở `booking.html`. |
| Nút Xem gói chụp | PASS | Điều hướng đến khu vực danh sách dịch vụ. |
| Nút Hỏi studio về lịch | PASS | Điều hướng đến khu vực chat mẫu. |
| Nút Hỏi về gói này | PASS | Điều hướng đến khu vực chat mẫu trên `index.html`. |
| Liên kết chuyển vai trò | PASS | Mở `studio.html` và có nhãn cho biết người tiếp tục là nhân viên studio. |
| Gửi tin nhắn | DISABLED AS SPECIFIED | Gửi tin nhắn chưa khả dụng trong PA#2; trường nhập và nút gửi được disable, có ghi chú hiển thị. |

Các chức năng gửi dữ liệu thật, lưu hội thoại hoặc đồng bộ booking không thuộc phạm vi prototype tĩnh PA#2.

## 5. JavaScript testing

Trang `index.html` không sử dụng JavaScript để dựng nội dung chính hoặc điều hướng luồng chính.

| Trạng thái | Kết quả | Ghi chú |
|---|---|---|
| JavaScript bật | PASS | Nội dung trang, liên kết và các khu vực chính hiển thị bình thường. |
| JavaScript tắt | PASS | Sau khi tắt JavaScript và tải lại, nội dung vẫn hiển thị; các liên kết HTML chính vẫn hoạt động. |

Ô nhập tin nhắn và nút Gửi được disable theo phạm vi PA#2. Đây là hành động chưa được triển khai, không phải lỗi do tắt JavaScript.

## 6. W3C HTML Validator

- **Công cụ:** W3C Nu HTML Checker.
- **File kiểm tra:** `index.html`.
- **Kết quả:** PASS — không ghi nhận lỗi HTML trong lần kiểm tra được thực hiện.
- **Minh chứng:** [Ảnh W3C Validator](validator-index.png)

## 7. Semantic HTML và Accessibility

| Hạng mục | Kết quả | Ghi chú |
|---|---|---|
| Ngôn ngữ tài liệu | PASS | Khai báo `lang="vi"`. |
| Viewport metadata | PASS | Có `meta viewport` phù hợp cho responsive. |
| Heading chính | PASS | Có đúng một thẻ `h1`. |
| Landmark | PASS | Có các vùng `header`, `nav`, `main`, `footer` phù hợp. |
| Label của input | PASS | Ô nhập tin nhắn có label hiển thị và liên kết bằng `for`/`id`. |
| Accessible name | PASS | Các liên kết và nút có tên có ý nghĩa; các hành động chưa khả dụng được disable. |
| Alt text | PASS | Không sử dụng ảnh người thật; hình minh họa CSS mang tính trang trí được loại khỏi cây Accessibility khi phù hợp. |
| Keyboard navigation | PASS | Đã rà soát điều hướng bằng `Tab`, `Shift + Tab`, `Enter` và `Space`; focus có thể nhận biết. |
| Color contrast | PASS | Đã kiểm tra độ tương phản chữ và nút theo ngưỡng 4.5:1. |

Ảnh minh chứng cấu trúc HTML: [HTML semantics](../screenshots/index_HTMLSematic.png). Thư mục hiện chưa có ảnh chụp Accessibility riêng.

## 8. Kết luận

Trang `index.html` đã PASS các nhóm kiểm thử được liệt kê trong báo cáo: responsive tại 360px, 768px và 1280px; điều hướng; hiển thị khi JavaScript bật/tắt; W3C HTML Validator; semantic HTML và Accessibility cơ bản.

`index.html` đáp ứng phạm vi của một responsive static prototype PA#2. Các chức năng gửi tin nhắn, lưu dữ liệu và xử lý nghiệp vụ thật không được triển khai; những điều khiển tương ứng được thể hiện là chưa khả dụng theo yêu cầu của brief.

