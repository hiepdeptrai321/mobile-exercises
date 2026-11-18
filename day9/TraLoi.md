# Buổi 9 – Trả lời câu hỏi bổ sung

## 1. Giá trị dẫn xuất
`errors` và `valid` hoàn toàn suy ra được từ `name`, `phone`, `address` và `items`, nên chỉ cần tính lại mỗi lần render là luôn đúng với state hiện tại. Nếu lưu bằng `useState` riêng thì mỗi lần một ô nhập hoặc giỏ hàng thay đổi phải nhớ gọi `setErrors`/`setValid` theo. Quên một chỗ (ví dụ giỏ bị xoá ở màn khác, hoặc tên được điền sẵn từ tài khoản) là `valid` bị lệch so với dữ liệu thật, nút bấm sáng/mờ sai. Ngoài ra còn tốn thêm một lần render vì phải set state hai lần.

## 2. Thứ tự gọi
Nếu `clear()` chạy trước `await createOrder(…)` mà mất mạng thì giỏ đã bị xoá (cả trong store lẫn AsyncStorage qua `useAutoPersist`) nhưng đơn hàng lại không được tạo: người dùng mất toàn bộ giỏ, phải chọn lại từ đầu, không bấm "thử lại" được. Đặt `clear()` ngay sau `await createOrder` thì nó chỉ chạy khi server đã nhận đơn. Nếu `createOrder` ném lỗi thì nhảy thẳng vào `catch`, giỏ vẫn còn nguyên.

## 3. PUT hay PATCH
`PUT /users/1` với `{ name, phone }` sẽ **thay toàn bộ** bản ghi, nên db.json chỉ còn `{ "id": 1, "name": …, "phone": … }`: mất `email` và `password`, và tài khoản không đăng nhập được nữa. `PATCH` chỉ cập nhật đúng các trường được gửi, các trường khác giữ nguyên. Bài này chỉ cho sửa tên và SĐT nên dùng PATCH là đúng (đã kiểm tra: sau khi lưu, user 1 trong db.json vẫn còn email và password).

## 4. Cập nhật lạc quan
Nếu bỏ đoạn hoàn lại `read: false` trong `catch` thì khi mất mạng, giao diện vẫn hiện "đã đọc" nhưng server vẫn lưu `read: false`. Dữ liệu trên màn hình lệch với server, lần tải lại sau thông báo lại thành "chưa đọc", người dùng thấy app chạy không ổn định.
- **Nên dùng:** bấm ❤️ yêu thích, tăng/giảm số lượng trong giỏ, thích một đánh giá. Đây là các thao tác nhỏ, dễ hoàn lại, cần phản hồi tức thì.
- **Không nên dùng:** thanh toán / đặt hàng. Không được báo "Đặt hàng thành công" và xoá giỏ khi server chưa xác nhận, vì nếu thất bại thì người dùng tưởng đã mua và sẽ mất đơn. Đổi mật khẩu cũng không nên dùng cách này.

## 5. Code bổ sung: bộ lọc trạng thái ở màn Đơn hàng
Đã làm trong `src/screens/OrdersScreen.tsx`:

```tsx
type StatusFilter = "all" | OrderStatus;
const [filter, setFilter] = useState<StatusFilter>("all");

// chỉ sửa dữ liệu truyền cho FlatList
const visibleOrders = useMemo(
  () => (filter === "all" ? orders : orders.filter((o) => o.status === filter)),
  [orders, filter]
);

<FlatList data={visibleOrders} … />
```
Hàng chip phía trên danh sách gồm: Tất cả / Chờ xác nhận / Đang giao / Hoàn tất / Đã huỷ, mỗi chip có kèm số đơn. Ảnh chụp kết quả có trong file `BaoCao_Buoi9.docx` (Hình 8).

## Thử thách
- **BT9.C1 – Mua lại: ĐÃ LÀM.** Nút "🔁 Mua lại" hiện trong phần chi tiết của đơn *Hoàn tất*. Khi bấm, app gọi `getBooks()` để lấy giá và tồn kho mới nhất. Sách đã có trong giỏ thì cộng dồn số lượng (không vượt tồn kho), sách hết hàng thì bỏ qua và báo lại, xong thì chuyển sang tab Giỏ.
- Không còn phần nào làm dở.
