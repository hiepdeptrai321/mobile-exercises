import { api } from "../api/client";
import { User } from "../types";

// BT9.4: PATCH /users/:id chỉ với { name, phone } (PATCH chỉ đổi các trường được gửi, không làm mất password/email).
// json-server trả cả `password` → loại password khỏi kết quả trước khi return (không đưa mật khẩu vào store).
export async function updateProfile(id: number, data: Pick<User, "name" | "phone">): Promise<User> {
  const res = await api.patch<User & { password?: string }>(`/users/${id}`, { name: data.name, phone: data.phone });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...user } = res.data;
  return user;
}
