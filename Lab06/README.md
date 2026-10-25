# Lab 06 Navigation

Project Expo + React Native + TypeScript, hoàn thành cả 5 bài trong `Lab06_Navigation_HuongDan.docx`. Mở ứng dụng sẽ có menu chọn Bài 1 đến Bài 5. Mũi tên trên thanh tiêu đề ngoài cùng quay về menu bài tập.

## Chạy nhanh

Đã chọn Expo SDK 57 để dùng với Expo Go trong giai đoạn chuyển tiếp SDK 58. Môi trường kiểm tra: Node.js 24.22.1. Nên dùng Node.js 24 LTS và Expo Go tương thích SDK 57.

Giải nén, mở Terminal/PowerShell trong thư mục `Lab06`, chạy:

```bash
npm ci
npm start
```

Quét QR bằng Expo Go; máy tính và điện thoại cần kết nối cùng mạng Wi-Fi. Nhấn `w` trong Terminal để chạy web, hoặc dùng:

```bash
npm run web
```

`npm ci` cài đúng phiên bản trong `package-lock.json`. File ZIP chỉ chứa mã nguồn, tài nguyên và cấu hình; `node_modules` sẽ được tạo bằng lệnh trên.

## Các bài đã triển khai

| Bài | Chức năng | Mã nguồn |
| --- | --- | --- |
| 1 | Product và ChooseColor; đủ 4 trạng thái thiết kế; 4 ảnh màu; chọn lại màu; truyền kết quả về Product; nút CHỌN MUA sát đáy | `src/ex1/` |
| 2 | Lấy `/phones/1` bằng fetch; loading; lỗi HTTP, kết nối, dữ liệu; THỬ LẠI; hủy yêu cầu khi rời màn; dữ liệu offline khi chưa đặt URL | `src/api/phoneApi.ts`, `src/ex1/SelectPhoneApi.tsx` |
| 3 | Tab Trang chủ, Tìm kiếm, Cá nhân; Ionicons đặc/viền; FlatList; lọc tên không phân biệt hoa thường; thông báo khi không có kết quả | `src/ex3/BottomTabApp.tsx` |
| 4 | Stack chứa Home và ProductDetails; Home chứa tab Products/Favorites; truyền `{ id }`; chi tiết đúng sản phẩm; Context thêm/xóa yêu thích | `src/ex4/` |
| 5 | Drawer Trang chủ, Cá nhân, Cài đặt; mở bằng nút menu hoặc vuốt cạnh trái trên thiết bị; 2 Switch; dòng trạng thái; Context đổi nền và chữ sáng/tối trên cả 3 màn | `src/ex5/` |

Navigator Product/ChooseColor ẩn header. Thanh tiêu đề ngoài cùng thuộc menu chung của Lab, giúp quay về chọn bài. Cả ứng dụng dùng một `NavigationContainer` ở `App.tsx`; các navigator của từng bài được lồng bên trong, tránh lỗi lồng nhiều container.

React Navigation 7 dùng `navigation.popTo('Product', { color: picked }, { merge: true })` khi bấm XONG. Cách này trả kết quả về màn Product đang có và gỡ màn chọn màu khỏi stack, tránh tạo thêm bản sao Product khi chọn nhiều lần.

## Bài 2 với API thực sự

Ứng dụng hỗ trợ cả `json-server` và MockAPI. Khi `EXPO_PUBLIC_API_URL` trống hoặc chưa tồn tại, Bài 2 dùng dữ liệu mẫu sau 600 ms để vẫn có thể chạy ngay. Muốn chứng minh yêu cầu gọi HTTP, cấu hình một trong hai cách dưới đây. Khi đã có URL, lỗi API được hiển thị để thử lại, không tự thay bằng dữ liệu offline.

### Cách 1 dùng json-server đi kèm

1. Trong Terminal thứ nhất, chạy:

```bash
npm run api
```

API chạy ở cổng 3001, lắng nghe trên `0.0.0.0`, đọc 6 sản phẩm từ `db.json` và giả lập độ trễ 600 ms. Kiểm tra trên máy tính: <http://localhost:3001/phones/1>.

2. Sao chép `.env.example` thành `.env`.

PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS/Linux:

```bash
cp .env.example .env
```

3. Sửa dòng `EXPO_PUBLIC_API_URL` theo thiết bị chạy ứng dụng:

| Nơi chạy | Giá trị trong `.env` |
| --- | --- |
| Trình duyệt trên chính máy tính chạy API | `EXPO_PUBLIC_API_URL=http://localhost:3001` |
| Android Emulator của Android Studio | `EXPO_PUBLIC_API_URL=http://10.0.2.2:3001` |
| Expo Go trên điện thoại thật | `EXPO_PUBLIC_API_URL=http://<IPv4-LAN-của-máy-tính>:3001` |

Ví dụ máy tính có IPv4 Wi-Fi là `192.168.1.10`, dùng `http://192.168.1.10:3001`. Xem IPv4 bằng `ipconfig` trên Windows. Không dùng `localhost` trên điện thoại vì nó trỏ về chính điện thoại. Nếu điện thoại không truy cập được, kiểm tra cùng mạng và quyền truy cập cổng 3001 trên mạng riêng của máy tính.

4. Trong Terminal thứ hai, khởi động lại Expo sau khi sửa `.env`:

```bash
npx expo start --clear
```

Mở Bài 2. Sửa `name` hoặc `price` của sản phẩm `id: "1"` trong `db.json`, quay về menu rồi mở lại Bài 2 để thấy dữ liệu mới. Dừng API, mở lại Bài 2 để thấy lỗi. Bật lại `npm run api`, bấm THỬ LẠI để tải thành công.

### Cách 2 dùng MockAPI

1. Vào <https://mockapi.io/>, tạo project và resource `phones`.
2. Tạo các trường: `name`, `supplier`, `badge`, `defaultColor` kiểu string; `price`, `oldPrice`, `rating`, `reviewCount` kiểu number; `colors` là mảng JSON.
3. Dùng `mockapi_phones.json` làm dữ liệu nhập. Có đủ 6 bản ghi. Bản ghi đầu tiên phải có `id` bằng `1`. `colors` phải là mảng thật, ví dụ `["silver", "red", "black", "blue"]`, không phải chuỗi chứa JSON.
4. Truy cập thử `<base-url>/phones/1`. Phản hồi phải là một đối tượng sản phẩm, không phải một mảng.
5. Trong `.env`, đặt **base URL** do MockAPI cấp, ví dụ:

```dotenv
EXPO_PUBLIC_API_URL=https://YOUR_PROJECT_ID.mockapi.io/api/v1
```

Không thêm `/phones` hoặc `/phones/1` vào biến môi trường. Khởi động lại bằng `npx expo start --clear`. Project không gắn sẵn endpoint thuộc tài khoản cá nhân.

## Tự kiểm tra trước khi nộp

```bash
npm run typecheck
npm run lint
npx expo install --check
npm run export:web
npm run export:android
```

`export:android` kiểm tra việc đóng gói JavaScript và tài nguyên cho Android; lệnh này không tạo APK. Chi tiết các tình huống kiểm tra nằm trong `KIEM_THU.md`.

## Các tệp cần xem

- `App.tsx`: menu 5 bài và stack ngoài cùng.
- `index.ts`: import gesture handler trước khi đăng ký ứng dụng.
- `src/types.ts`, `src/theme.ts`: kiểu dữ liệu, bảng màu, định dạng tiền.
- `src/data/phones.ts`: 6 sản phẩm và ánh xạ ảnh theo màu.
- `assets/phones/`: `blue.png`, `red.png`, `black.png`, `silver.png`.
- `src/components/`: Stars, Loading, ErrorBox, EmptyState, ProductRow, NoticeModal.
- `db.json`: dữ liệu để chạy json-server.
- `mockapi_phones.json`: dữ liệu để nhập vào MockAPI.
- `.env.example`: mẫu cấu hình API.

## Ghi chú về phạm vi

- Bố cục Select Phone, nhãn nút, màu sắc và 4 trạng thái được dựng theo mô tả chi tiết trong tài liệu. Liên kết Figma trong tài liệu không cấp quyền đọc qua công cụ ở thời điểm thực hiện, nên chưa thể xác nhận khớp từng pixel với Figma.
- Bộ ảnh điện thoại theo 4 màu được đóng gói cục bộ và dùng chung cho danh mục mẫu theo cấu trúc bài lab; nguồn ảnh ghi ở `assets/phones/README.md`.
- Nút CHỌN MUA mở hộp thoại sản phẩm, màu và giá đã chọn. Lab không yêu cầu giỏ hàng hoặc thanh toán.
- Thông báo và chế độ tối là trạng thái UI của bài tập. Switch thông báo không đăng ký push notification. Yêu thích và cài đặt được lưu trong Context trong phiên mở bài; rời bài về menu sẽ đặt lại khi vào lại.

## Tài liệu kỹ thuật

- <https://docs.expo.dev/versions/v57.0.0/>
- <https://docs.expo.dev/more/create-expo/>
- <https://reactnavigation.org/docs/params/>
- <https://reactnavigation.org/docs/nesting-navigators/>
- <https://reactnavigation.org/docs/drawer-navigator/>
