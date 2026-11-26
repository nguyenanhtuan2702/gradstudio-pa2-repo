# G1 Home & Catalogue — Manual Browser Test Report

## A. Environment

- **Ngày kiểm thử:** 26/11/2026.
- **OS:** Windows.
- **Browser:** Google Chrome; phiên bản cụ thể không được ghi nhận trong ảnh minh chứng.
- **Frontend:** `http://localhost:5173`.
- **API request quan sát được trên trình duyệt:** `GET http://localhost:5173/api/catalogue`.
- **API proxy:** Request được gửi qua Vite frontend origin (`localhost:5173`) theo cấu hình proxy của ứng dụng.
- **Mock modes đã kiểm tra:** `normal`, `slow`, `error`, `empty`.
- **Phương pháp:** Kiểm thử thủ công trên trình duyệt, quan sát giao diện và tab Network của Chrome DevTools.

> Ghi chú: Ảnh G1 cho thấy request được gửi qua `localhost:5173/api/catalogue`. Cổng bind thực tế của tiến trình Mock Server không được thể hiện trong bộ ảnh này nên không ghi suy đoán.

## B. Test Cases

| Test Case | Mô tả | Expected | Actual | Status | Screenshot |
|---|---|---|---|---|---|
| TC-G1-01 | Trang chủ và Catalogue ở chế độ `normal` | Trang chủ React hiển thị nội dung kế thừa từ prototype PA#2; Catalogue tải thành công. | Hero, điều hướng và khu vực dịch vụ hiển thị; request `catalogue` trong Network trả HTTP `200`. | PASS | [01-g1-normal.png](01-g1-normal.png) |
| TC-G1-02 | Gọi API Catalogue | Gửi `GET /api/catalogue` qua API client; nhận response thành công. | Chrome DevTools ghi nhận URL `http://localhost:5173/api/catalogue`, method `GET`, status `200 OK`. | PASS | [02-g1-catalogue-api.png](02-g1-catalogue-api.png) |
| TC-G1-03 | Trạng thái Loading ở chế độ `slow` | Trong lúc request đang chờ, giao diện hiển thị chỉ báo Loading; khi request hoàn tất, giao diện thoát trạng thái chờ. | Giao diện hiển thị spinner và nội dung “Đang tải dịch vụ và danh mục...”; request còn pending tại thời điểm chụp. Người kiểm thử xác nhận luồng slow đã được kiểm tra. | PASS | [03-g1-slow-loading.png](03-g1-slow-loading.png) |
| TC-G1-04 | Trạng thái Error ở chế độ `error` | Khi API lỗi máy chủ, giao diện hiển thị thông báo lỗi và thao tác Retry. | Network ghi nhận HTTP `500`; giao diện hiển thị “Không tải được danh mục”, thông báo “Mô phỏng lỗi máy chủ.” và nút “Thử tải lại”. | PASS | [04-g1-error-state.png](04-g1-error-state.png) |
| TC-G1-05 | Retry sau lỗi | Sau khi dịch vụ trở lại bình thường, người dùng có thể bấm Retry để tải lại Catalogue mà không cần tải lại toàn bộ trang. | Người kiểm thử xác nhận đã kiểm tra luồng Retry và đánh giá PASS. Ảnh đính kèm thể hiện trạng thái Error cùng nút Retry; chưa có ảnh riêng ghi lại thời điểm tải thành công sau Retry. | PASS | [04-g1-error-state.png](04-g1-error-state.png) |
| TC-G1-06 | Trạng thái Empty ở chế độ `empty` | Khi API trả HTTP `200` nhưng danh sách không có dữ liệu, giao diện hiển thị Empty State thay vì lỗi hoặc màn hình trắng. | Network ghi nhận HTTP `200`; giao diện hiển thị “Danh mục hiện chưa có dữ liệu” và “Vui lòng quay lại sau.” | PASS | [05-g1-empty-state.png](05-g1-empty-state.png) |

## C. Summary

- **Tổng số test case:** 6.
- **PASS:** 6.
- **FAIL:** 0.
- **BLOCKED:** 0.
- **API được quan sát:** `GET /api/catalogue`.
- **Các mock mode được kiểm tra:** `normal`, `slow`, `error`, `empty`.
- **Lỗi ứng dụng phát hiện trong các kịch bản được báo cáo:** Không có lỗi được người kiểm thử ghi nhận.
- **Phạm vi chưa thể hiện bằng ảnh riêng:** Kết quả tải thành công ngay sau thao tác Retry chưa có screenshot độc lập; trạng thái này được ghi nhận theo xác nhận kiểm thử thủ công của người thực hiện.

## D. G1 Verification Summary

- **Home page:** Trang chủ React hiển thị phần Hero và điều hướng khách hàng; giao diện tiếp tục kế thừa nền tảng prototype PA#2.
- **Catalogue API:** Frontend gọi `GET /api/catalogue` qua API client; request quan sát được trả HTTP `200` ở chế độ bình thường.
- **Loading:** Giao diện thể hiện trạng thái đang tải khi request chậm.
- **Error:** HTTP `500` được ánh xạ thành thông báo lỗi có thể hiểu được và hiển thị nút Retry.
- **Retry:** Người kiểm thử xác nhận thao tác thử tải lại hoạt động sau khi dịch vụ trở lại bình thường.
- **Empty:** HTTP `200` với dữ liệu danh mục rỗng được hiển thị bằng Empty State.
- **Ranh giới với G3:** Khu vực chat trên trang chủ hiện là phần hướng dẫn/placeholder; gửi tin nhắn và yêu cầu đặt lịch thực tế thuộc phạm vi G3, không được tính là chức năng G1 trong báo cáo này.

## E. Evidence

Các liên kết ảnh trong báo cáo là **đường dẫn tương đối**, trỏ đến ảnh cùng thư mục `g1/`:

- [Trang chủ và Catalogue — normal](01-g1-normal.png)
- [Network — Catalogue API HTTP 200](02-g1-catalogue-api.png)
- [Loading — slow mode](03-g1-slow-loading.png)
- [Error và nút Retry — error mode](04-g1-error-state.png)
- [Empty State — empty mode](05-g1-empty-state.png)

## F. Source Changes

- Báo cáo này ghi nhận kết quả kiểm thử G1 dựa trên các ảnh chụp và xác nhận thủ công được cung cấp.
- Không thực hiện thay đổi source code trong quá trình lập báo cáo.
- Không tạo Git commit.
