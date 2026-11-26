# Báo cáo tự đánh giá — PA#2 Responsive Prototype

## Thông tin nhóm

- 23120184 — Nguyễn Anh Tuấn (Thành viên A, phụ trách `index.html`)
- 23120330 — Lê Công Phúc (Thành viên B, phụ trách `studio.html`)
- 24120090 — Đặng Hồng Minh (Thành viên C, phụ trách `booking.html`)

**Tổng điểm nhóm tự đánh giá: 100/100**

Bảng tự đánh giá được xây dựng theo 7 tiêu chí và trọng số trong rubric chính thức PA#2 — Responsive Prototype.

## 1. Bảng tự đánh giá

| STT | Tiêu chí theo rubric | Điểm tối đa | Điểm tự chấm | Minh chứng và giải thích |
|---|---|---:|---:|---|
| 1 | Three linked screens that trace back to the GradStudio brief | 20 | 20 | Ba trang `index.html`, `studio.html` và `booking.html` thể hiện đầy đủ Main Flow: khách xem dịch vụ và chat, nhân viên tư vấn và xử lý xung đột lịch, khách xem lại lịch và khoản cọc. Các liên kết chính sử dụng đường dẫn tương đối và chuyển đến đúng trang. Các tính năng được trình bày dưới dạng prototype tĩnh theo lựa chọn của nhóm và yêu cầu PA#2. Minh chứng: ba file HTML và `PROTOTYPE.md`. |
| 2 | Responsive at 360, 768 and 1280 px | 25 | 25 | Nhóm có 9 ảnh chụp toàn trang tương ứng ba màn hình ở các kích thước 360px, 768px và 1280px. Đã kiểm tra cuộn ngang, nội dung tràn, bố cục, kích thước vùng bấm và khả năng hiển thị khi tắt JavaScript. Minh chứng: thư mục `screenshots/` và các báo cáo `checks/manualcheckindex.md`, `checks/manualcheckstudio.md`, `checks/manualcheckbooking.md`. |
| 3 | Semantic, valid HTML | 20 | 20 | Cả ba trang đã được kiểm tra bằng W3C Nu Checker. Kết quả lưu trong `checks/validator-index.png`, `checks/validator-studio.png` và `checks/validator-booking.png` đều không có lỗi hoặc cảnh báo. Nhóm đã rà soát landmark, heading, label, alt text, liên kết và thành phần tương tác. |
| 4 | Design you can check | 10 | 10 | Dự án sử dụng stylesheet chung `styles.css`, CSS custom properties cho màu sắc, typography và spacing scale. Nội dung chính sử dụng cỡ chữ cơ bản 16px; nhóm đã rà soát độ tương phản, breakpoint và cách bố trí giao diện. Không sử dụng `!important` trong CSS tự viết. Minh chứng: `styles.css`, `PROTOTYPE.md` và bộ ảnh responsive. |
| 5 | The brief and the rules file | 10 | 10 | `brief.md` lưu lại các prompt thực tế được sử dụng trong quá trình phát triển. `AGENTS.md` quy định công nghệ, spacing tokens, thiết kế mobile-first, breakpoint, giới hạn dependency, semantic HTML, accessibility, relative links và quy trình kiểm tra. Minh chứng: `brief.md` và `AGENTS.md`. |
| 6 | AI-LOG.md | 10 | 10 | `AI-LOG.md` ghi nhận công cụ, yêu cầu, nội dung giữ lại, thay đổi và phần bị từ chối trong quá trình sử dụng AI. Nhật ký cũng ghi lại những vấn đề được phát hiện qua kiểm tra, chẳng hạn lỗi ARIA/W3C và cách khắc phục, kèm kết quả kiểm chứng tương ứng. |
| 7 | Commit history | 5 | 5 | Repository có lịch sử commit từ giai đoạn khởi tạo với `AGENTS.md`, các commit phát triển từng trang và các commit điều chỉnh CSS/bố cục responsive. Minh chứng: commit `34d8ad2` (khởi tạo và thêm rules file), `44d248b` (index), `39dc42a` (studio), `54872a2` (booking), `23f4b57` (stylesheet chung) và `9f68ec7` (điều chỉnh bố cục ba trang). |
| | **Tổng điểm** | **100** | **100** | |

## 2. Những phần nhóm chưa hoàn thành hoàn toàn

- Một số thông tin nguồn ảnh chưa được lưu đầy đủ. Hai ảnh Vecteezy chưa xác định được tên tác giả tại thời điểm tải; liên kết của `ChanDung.jpg` hiện dẫn đến trang chủ TikTok thay vì bài đăng cụ thể.
- Prototype sử dụng static HTML/CSS theo lựa chọn được rubric cho phép. Chat, dữ liệu booking và thanh toán được mô phỏng bằng nội dung mẫu; không có backend hoặc giao dịch thật. Những giới hạn này được ghi trong mục `Not wired yet` của `PROTOTYPE.md`.

## 3. Kinh nghiệm sau khi thực hiện

Qua PA#2, nhóm đã thực hành xây dựng prototype responsive, tổ chức HTML semantic, sử dụng CSS design tokens, kiểm tra W3C và rà soát khả năng tiếp cận.

Nhóm cũng nhận thấy việc lưu lại prompt, thay đổi do AI thực hiện, lỗi phát hiện và cách kiểm chứng là cần thiết để đảm bảo sản phẩm có thể được rà soát và giải thích lại.

**Tổng điểm nhóm tự đánh giá: 100/100.**

**Tên file ZIP:** `23120184-23120330-24120090_100.zip`
