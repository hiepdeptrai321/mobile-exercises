# Kiểm tra Lab 06 Navigation

## Các kiểm tra đã chạy

| Kiểm tra | Kết quả |
| --- | --- |
| `npm run typecheck` | Đạt, không có lỗi TypeScript |
| `npm run lint` | Đạt, không có lỗi hoặc cảnh báo ESLint |
| Đối chiếu phiên bản native với danh sách đi kèm Expo SDK 57 bằng `expo install --check` ở chế độ offline | Đạt; bước tra cứu trực tuyến không được thực hiện |
| Export web, chế độ dữ liệu offline | Đạt |
| Export web với URL API và gọi HTTP qua json-server | Đạt |
| Export Android bằng Metro/Hermes | Đạt, tạo được bundle và tài nguyên |
| Kiểm tra tương tác trên Chromium, React Native Web | 16 nhóm tình huống đạt, không có lỗi JavaScript không được xử lý |
| Kích thước web đã kiểm tra | 390 × 844 và 320 × 568 |

Các kiểm tra web dùng chính mã nguồn React Native và bộ dữ liệu của project. Phần API được chạy bằng json-server; tên và giá được thay đổi trong dữ liệu kiểm tra để xác nhận giao diện lấy kết quả HTTP, không hiển thị lại dữ liệu local khi đã cấu hình URL.

## Tình huống chức năng

| Phần | Thao tác | Kết quả cần có | Kết quả web |
| --- | --- | --- | --- |
| Menu | Mở ứng dụng | Hiện đủ 5 bài, vào từng bài và quay về menu | Đạt |
| Bài 1 | Vào bài lần đầu | Ảnh xanh, “4 MÀU-CHỌN MÀU”, CHỌN MUA dưới đáy | Đạt |
| Bài 1 | Mở chọn màu lần đầu | Ảnh nhỏ xanh, tên; chưa có thông tin màu/nhà cung cấp/giá | Đạt |
| Bài 1 | Chọn đỏ | Ảnh nhỏ đỏ, ô đỏ có viền, hiện màu đỏ, nhà cung cấp đậm và giá | Đạt |
| Bài 1 | Bấm XONG | Quay về Product, ảnh lớn đỏ, “4 MÀU-CHỌN LOẠI” | Đạt |
| Bài 1 | Chọn lần lượt đen, bạc, xanh, đỏ | Mỗi lần về Product hiển thị đúng màu mới | Đạt |
| Bài 1 | Bấm XONG khi chưa chọn | Giữ ảnh và nhãn nút ở trạng thái ban đầu | Đạt |
| Bài 1 | Bấm CHỌN MUA sau khi chọn đỏ | Hộp thoại hiển thị đúng điện thoại, màu đỏ và giá | Đạt |
| Bài 2 | Chưa cấu hình URL | Thấy loading rồi dữ liệu mẫu; không gọi HTTP | Đạt |
| Bài 2 | Cấu hình API và thay tên/giá trên server | Hiện tên/giá mới từ HTTP | Đạt |
| Bài 2 | Server trả HTTP 503 | Hiện ErrorBox và nút THỬ LẠI | Đạt |
| Bài 2 | Server phục hồi rồi THỬ LẠI | Loading rồi hiển thị sản phẩm thành công | Đạt |
| Bài 2 | API trả JSON sai cấu trúc hoặc phản hồi không phải JSON | Báo lỗi dữ liệu; có thể thử lại | Đạt |
| Bài 2 | Kết nối mạng lỗi | Báo lỗi kết nối, không tự dùng dữ liệu offline; thử lại thành công khi kết nối phục hồi | Đạt |
| Bài 2 | Quay về menu trong lúc tải | Hủy yêu cầu, không phát sinh lỗi render | Đạt |
| Bài 3 | Mở Trang chủ | Hiện 6 điện thoại bằng FlatList | Đạt |
| Bài 3 | Tìm `ARIS` | Hiện đúng 1 sản phẩm Aris Pro | Đạt |
| Bài 3 | Tìm `zzz` | Hiện thông báo không có kết quả | Đạt |
| Bài 3 | Xóa từ khóa | Hiện lại đủ 6 sản phẩm | Đạt |
| Bài 3 | Mở Cá nhân | Avatar tròn, Nguyễn Văn An và email | Đạt |
| Bài 4 | Mở Live 4 từ tab Sản phẩm | Chi tiết đúng sản phẩm id 2, giá 3.990.000 đ | Đạt |
| Bài 4 | Lưu yêu thích, quay lại, mở tab Yêu thích | Live 4 xuất hiện trong danh sách | Đạt |
| Bài 4 | Mở chi tiết từ Yêu thích và bỏ lưu | Danh sách trở lại trạng thái rỗng | Đạt |
| Bài 5 | Mở menu bằng nút ☰ | Có Trang chủ, Cá nhân, Cài đặt | Đạt |
| Bài 5 | Gạt Switch thông báo | Dòng trạng thái đổi BẬT/TẮT | Đạt |
| Bài 5 | Bật tối, chuyển Home/Profile rồi trở lại Settings | Nền/chữ và header đổi theo chế độ tối; cài đặt được giữ trong Context | Đạt |
| Màn nhỏ | Dùng kích thước 320 × 568 | Không tràn ngang, CHỌN MUA ở đáy, có thể cuộn để chọn màu và bấm XONG | Đạt |

## Kiểm tra thêm trên thiết bị khi nộp

Project chưa được chạy trực tiếp trên thiết bị Android/iOS thật trong môi trường thực hiện. Android export là kiểm tra đóng gói, không phải cài APK. Khi mở bằng Expo Go, kiểm tra thêm thao tác vuốt Drawer từ mép trái và nút Back/cử chỉ quay lại của hệ điều hành.

Nếu dùng json-server từ điện thoại thật, đặt IPv4 LAN của máy tính trong `.env` theo `README.md`. Nếu dùng MockAPI, tạo resource và nhập dữ liệu theo hướng dẫn; endpoint MockAPI cá nhân không được tạo sẵn trong project.

Liên kết Figma không cấp quyền đọc qua công cụ tại thời điểm thực hiện. Giao diện được kiểm tra theo mô tả 4 trạng thái trong tài liệu, chưa đối chiếu từng pixel với Figma.
