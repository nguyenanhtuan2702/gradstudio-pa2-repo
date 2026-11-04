# AI-LOG.md — GradStudio PA#2

Nhật ký dưới đây ghi lại các yêu cầu đã nhờ assistant hỗ trợ trong cuộc trò chuyện. Các mục kiểm thử chỉ được ghi là đã chạy khi có căn cứ; việc assistant đọc hoặc đề xuất checklist không được xem là kết quả kiểm thử.

## 2026-11-04 — Khôi phục Màn 1
Tool: Codex (OpenAI Codex desktop).
Asked for: Dựng lại `index.html` sau khi người dùng lỡ xóa bản đã chỉnh và giữ liên kết stylesheet của dự án.
Kept: Nội dung và luồng tĩnh của Màn 1, cùng các class/component hiện có.
Changed: Tạo lại trang sau khi người dùng báo file bị mất; đối chiếu liên kết hiện tại và xác nhận `index.html` dùng `style.css`. Không chạy Nu Checker hay kiểm tra viewport trong mục này.
Rejected: Không thêm backend, chức năng đồng bộ giả hoặc tài nguyên ngoài để dựng lại trang.

## 2026-11-04 — Thống nhất tên stylesheet trong tài liệu
Tool: Codex (OpenAI Codex desktop).
Asked for: Sửa README và AGENTS.md để ghi `style.css` là stylesheet chung, còn `styles.css` sẽ được xóa sau khi các trang chuyển sang file chung.
Kept: Quyết định dùng một file CSS chung và điều kiện chờ Màn 2, Màn 3 chuyển xong.
Changed: Cập nhật hướng dẫn để phân biệt `style.css` chính thức với `styles.css` tạm; khi rà lại, cả README và AGENTS.md đều ghi rõ trạng thái này.
Rejected: Không xóa `styles.css` trước khi các trang còn lại chuyển xong, theo quy tắc dự án.

## 2026-11-04 — Rà soát Màn 1 theo ảnh tham chiếu
Tool: Codex (OpenAI Codex desktop).
Asked for: Xem index và CSS đã chỉnh có ổn không, không sửa tùy tiện.
Kept: Nội dung tiếng Việt, cấu trúc ngữ nghĩa và luồng liên kết hiện có.
Changed: Không sửa file theo yêu cầu; đối chiếu ảnh tham chiếu và chỉ ra các chỗ giao diện cần xem lại như hero desktop, header, chat và thanh chọn màn hình.
Rejected: Không chỉnh HTML/CSS trong lượt rà soát này; không tuyên bố đã chạy W3C hoặc kiểm tra responsive.

## 2026-11-04 — Font cục bộ và vùng bấm
Tool: Codex (OpenAI Codex desktop).
Asked for: Bỏ Google Fonts và sửa các vùng bấm nhỏ hơn yêu cầu 44px.
Kept: Quy tắc font dùng được khi offline và hệ thống token/component hiện có.
Changed: Bỏ phụ thuộc tải font từ Google và nâng các điều khiển độc lập được nêu trong yêu cầu lên tối thiểu 44px; căn cứ là quy định AGENTS.md và các kích thước nhỏ đã được rà ra trước đó. Không chạy kiểm tra đa trình duyệt trong lượt này.
Rejected: Không giữ link Google Fonts hoặc dựa vào font tải từ Internet, vì trái quy tắc dự án.

## 2026-11-04 — Sửa hiển thị font tiếng Việt
Tool: Codex (OpenAI Codex desktop).
Asked for: Đổi font vì một số chữ tiếng Việt hiển thị lỗi trong ảnh người dùng gửi.
Kept: Phân cấp serif cho tiêu đề, sans-serif cho nội dung và yêu cầu không tải font từ Internet.
Changed: Điều chỉnh lựa chọn font/fallback cục bộ sau khi ảnh cho thấy dấu tiếng Việt hiển thị không ổn; chưa có kiểm tra riêng trên nhiều hệ điều hành để xác nhận kết quả đồng nhất.
Rejected: Không thêm Google Fonts hay font CDN để xử lý lỗi, vì AGENTS.md cấm phụ thuộc font mạng.

## 2026-11-04 — Ảnh và bố cục thẻ gói chụp
Tool: Codex (OpenAI Codex desktop).
Asked for: Hỏi có cần lấy ảnh từ Internet không; sau đó nhờ sửa thẻ Kỷ yếu lớp bị lệch khi đã thêm ảnh ba gói.
Kept: Các ảnh người dùng bổ sung trong `assets/images/` và nội dung/giá của ba gói.
Changed: Sau khi ảnh chụp cho thấy ảnh thẻ đầu thấp hơn hai thẻ còn lại và nội dung lệch hàng, chỉnh CSS để ảnh các thẻ dùng cùng tỷ lệ khung, card xếp cột và nút tư vấn nằm cuối card. Chưa chạy lại browser/responsive test sau chỉnh sửa này.
Rejected: Không tải ảnh ngoài hoặc thay ảnh/nội dung gói; ảnh nên nằm trong repository theo quy tắc dự án.

