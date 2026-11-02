# GradStudio – PA#2 Responsive Prototype

Repository này dùng cho **PA#2 – Responsive Prototype** của nhóm. Mục tiêu là chuyển ba màn hình chính đã thiết kế ở PA#1 thành ba trang HTML/CSS tĩnh, có thể mở trực tiếp trên trình duyệt và hiển thị tốt ở điện thoại, máy tính bảng và máy tính.

> **Phạm vi:** Đây là prototype giao diện. Nhóm không xây dựng backend, API, cơ sở dữ liệu hay giao dịch thanh toán thật. Dữ liệu minh họa được viết trực tiếp trong HTML.

## 1. Ba màn hình của dự án

| Trang | File | Nội dung |
|---|---|---|
| Màn 1 | `index.html` | Khách xem dịch vụ GradStudio và cuộc trò chuyện tư vấn |
| Màn 2 | `page2.html` | Admin xem hội thoại, lịch tài nguyên và thông tin booking |
| Màn 3 | `page3.html` | Khách xem lịch chụp, thông tin booking và khoản cọc |

Thứ tự câu chuyện: **Khách hỏi dịch vụ → Admin xử lý yêu cầu → Khách xem lại lịch và khoản cọc**.

Ảnh tham chiếu PA#1 và hướng dẫn xem prototype ban đầu nằm trong `docs/pa1/`.

## 2. Cấu trúc thư mục

```text
gradstudio-pa2-repo/
├── index.html                    # Màn hình 1 – trang bắt đầu
├── page2.html                    # Màn hình 2 – giao diện Admin
├── page3.html                    # Màn hình 3 – lịch chụp của khách
├── styles.css                    # CSS dùng chung cho cả ba trang
├── AGENTS.md                     # Quy tắc dành cho AI coding assistant
├── README.md                     # Hướng dẫn dự án
├── .gitignore                    # Các tệp không đưa lên Git
├── assets/
│   └── images/                   # Ảnh được sử dụng trong giao diện
├── docs/
│   └── pa1/                      # Tài liệu và ảnh ba màn hình PA#1
├── screenshots/                  # 9 ảnh chụp trang ở 3 kích thước
└── checks/                       # Kết quả kiểm tra W3C cho từng trang
```

Các file HTML và CSS hiện là **khung khởi tạo**. Thành viên phụ trách từng màn hình cần hoàn thiện nội dung và giao diện dựa trên ảnh tham chiếu PA#1.

## 3. Cách mở và xem website

1. Giải nén repository hoặc mở thư mục dự án trong VS Code.
2. Mở file `index.html` trực tiếp bằng trình duyệt (Chrome, Edge hoặc Firefox).
3. Dùng các liên kết trên thanh điều hướng để chuyển giữa ba trang.

Dự án khởi tạo theo hướng HTML/CSS thuần, không cần cài package, chạy server hoặc build trước khi mở. Nếu nhóm quyết định dùng framework CSS, cần cập nhật `AGENTS.md` và README, đồng thời bảo đảm CSS được tải dưới dạng file CSS chứ không phụ thuộc script build lúc mở trang.

## 4. Quy ước khi làm giao diện

- Giữ nhận diện GradStudio và nội dung chính của ba màn hình PA#1.
- Có thể thay đổi cách sắp xếp thành phần để giao diện phù hợp với từng kích thước; ghi lại thay đổi và lý do trong `PROTOTYPE.md`.
- Làm theo hướng mobile-first và kiểm tra ở các chiều rộng **360 px, 768 px và 1280 px**.
- Không để xuất hiện cuộn ngang, nội dung bị cắt hoặc thành phần chồng lấn.
- Các liên kết thuộc luồng chính phải dùng đường dẫn tương đối, ví dụ `page2.html`.
- Nội dung phải hiển thị đầy đủ khi tắt JavaScript.
- Dữ liệu minh họa được ghi trực tiếp trong HTML; không cần kết nối backend/API/database.
- Dùng chung `styles.css` để giữ màu sắc, kiểu chữ, khoảng cách và thành phần nhất quán giữa ba trang.

Chi tiết bắt buộc dành cho AI được ghi trong `AGENTS.md`.

## 5. Kiểm tra trước khi hoàn thành

Thực hiện các bước sau cho **từng trang**:

1. Mở trang trực tiếp từ thư mục dự án.
2. Tắt JavaScript trong DevTools, tải lại trang và kiểm tra nội dung vẫn hiển thị.
3. Kiểm tra ở 360 px, 768 px và 1280 px.
4. Trong Console, chạy:

   ```js
   document.documentElement.scrollWidth > document.documentElement.clientWidth
   ```

   Kết quả mong đợi: `false`.

5. Trong Console, kiểm tra phần tử tràn khỏi cạnh phải:

   ```js
   [...document.querySelectorAll('body *')].filter(
     element => element.getBoundingClientRect().right > document.documentElement.clientWidth
   )
   ```

   Kết quả mong đợi: `[]` (ngoại lệ chỉ áp dụng cho nội dung bảng nằm trong vùng cuộn riêng, nếu có).

6. Kiểm tra từng file HTML tại <https://validator.w3.org/nu/>. Mục tiêu: **0 lỗi**.
7. Kiểm tra Accessibility trong DevTools: landmarks, heading, label, alt text và khả năng đọc.
8. Chụp ảnh toàn trang khi JavaScript đã tắt và lưu vào `screenshots/`.
9. Lưu kết quả W3C của từng trang vào `checks/`.

### Quy tắc đặt tên ảnh

```text
screenshots/
├── index-360.png
├── index-768.png
├── index-1280.png
├── page2-360.png
├── page2-768.png
├── page2-1280.png
├── page3-360.png
├── page3-768.png
└── page3-1280.png
```

Kết quả W3C có thể lưu dưới dạng `.png` hoặc `.txt`, ví dụ `validator-index.png`, `validator-page2.png`, `validator-page3.png`.

## 6. Các tài liệu cần bổ sung trước khi nộp

Ngoài source code, nhóm cần hoàn thiện các tài liệu theo yêu cầu PA#2:

- `PROTOTYPE.md`: thành viên, cách mở, mô tả ba trang, thay đổi so với PA#1, phần chưa liên kết và thông tin CSS.
- `brief.md`: các prompt thực tế đã gửi cho assistant, giữ đúng thứ tự sử dụng.
- `AI-LOG.md`: nhật ký theo từng trang/tác vụ, gồm công cụ, yêu cầu, phần AI làm chưa đúng, cách kiểm tra và yêu cầu sửa.
- `SELF_ASSESSMENT_REPORT.md`: tự đánh giá đủ 7 tiêu chí, có điểm và dẫn chứng cho từng tiêu chí.

Không ghi lại prompt, lỗi hoặc kết quả kiểm thử không thực sự xảy ra. Mỗi thành viên cần lưu thông tin phần việc của mình trong quá trình thực hiện để nhóm tổng hợp chính xác.

## 7. Làm việc với Git

Mỗi thành viên cần cấu hình tên và email Git của chính mình, sau đó commit phần việc mình thực hiện. Không gom toàn bộ thay đổi của cả nhóm vào một commit duy nhất.

Ví dụ khởi tạo Git lần đầu trong thư mục dự án:

```bash
git init
git branch -M main
git add .
git commit -m "chore: khoi tao repository GradStudio PA2"
```

Sau khi tạo repository trống trên GitHub, thêm địa chỉ repository và push:

```bash
git remote add origin <URL_REPOSITORY_GITHUB>
git push -u origin main
```

Thay `<URL_REPOSITORY_GITHUB>` bằng URL repository thật của nhóm.

## 8. Thành phần cần có trong ZIP nộp bài

ZIP cuối cùng phải chứa toàn bộ thư mục repository, bao gồm thư mục ẩn `.git/`, source code, rules file, tài liệu, `docs/pa1/`, `screenshots/` và `checks/`. Không đưa `node_modules/` vào ZIP.

**Lưu ý:** ZIP khởi tạo được gửi kèm hiện chưa có `.git/`. Sau khi giải nén, nhóm cần chạy `git init` hoặc clone/push repository theo quy trình Git của nhóm. Khi chuẩn bị ZIP nộp bài cuối cùng, phải bảo đảm thư mục `.git/` đã được giữ lại.
