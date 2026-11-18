import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBadge } from "../components/StatusBadge";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getOrdersByUser } from "../services/orderService";
import { getBooks } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useAuth, useCart } from "../store/hooks";
import { formatDateTime } from "../utils/format";
import { showMessage } from "../utils/dialog";
import { RootScreenProps } from "../navigation/types";
import { Order, OrderStatus } from "../types";
import { colors, formatPrice, radius } from "../theme";

export const PAYMENT_LABEL = { cod: "Thanh toán khi nhận hàng (COD)", bank: "Chuyển khoản ngân hàng" } as const;

// Câu hỏi 5: bộ lọc trạng thái
type StatusFilter = "all" | OrderStatus;
const FILTERS: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: "Chờ xác nhận" },
  { key: "shipping", label: "Đang giao" },
  { key: "completed", label: "Hoàn tất" },
  { key: "cancelled", label: "Đã huỷ" },
];

export function OrdersScreen({ navigation }: RootScreenProps<"Orders">) {
  const { user, isLoggedIn } = useAuth();
  const { items: cartItems, add, setQty } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null); // đơn đang mở rộng (xem chi tiết ngay tại màn này)
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [reordering, setReordering] = useState<number | null>(null);

  // BT9.3a
  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getOrdersByUser(user.id);
      // Sắp xếp thêm ở client cho chắc: chuỗi ISO so sánh được theo thứ tự thời gian
      setOrders([...data].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    load();
  }, [load]);

  // Câu hỏi 5: chỉ sửa dữ liệu truyền cho FlatList
  const visibleOrders = useMemo(() => (filter === "all" ? orders : orders.filter((o) => o.status === filter)), [orders, filter]);

  // BT9.C1 (thử thách "Mua lại"): thêm lại toàn bộ sản phẩm của đơn vào giỏ hiện tại.
  // Lấy giá + tồn kho MỚI NHẤT từ API; cùng sách thì cộng dồn, không vượt tồn kho.
  const reorder = async (order: Order) => {
    setReordering(order.id);
    try {
      const books = await getBooks();
      const skipped: string[] = [];
      let added = 0;
      for (const it of order.items) {
        const book = books.find((b) => b.id === it.bookId);
        if (!book || book.stock <= 0) {
          skipped.push(it.title);
          continue;
        }
        const inCart = cartItems.find((c) => c.bookId === book.id)?.quantity ?? 0;
        const target = Math.min(inCart + it.quantity, book.stock);
        if (inCart === 0) add({ bookId: book.id, title: book.title, price: book.price, emoji: book.emoji, color: book.color, stock: book.stock });
        setQty(book.id, target); // setQuantity trong store tự kẹp theo tồn kho
        added++;
      }
      if (added === 0) {
        showMessage("Không thể mua lại", "Các sách trong đơn này hiện đã hết hàng.");
        return;
      }
      const note = skipped.length ? `\nHết hàng, bỏ qua: ${skipped.join(", ")}` : "";
      showMessage("Đã thêm vào giỏ", `Đã thêm ${added} sách từ đơn #${order.id} (giá cập nhật mới nhất).${note}`, () =>
        navigation.navigate("Tabs", { screen: "Cart" })
      );
    } catch (e) {
      showMessage("Không thể mua lại", getErrorMessage(e));
    } finally {
      setReordering(null);
    }
  };

  if (!isLoggedIn) {
    return <EmptyState emoji="🔒" title="Bạn cần đăng nhập" actionLabel="Đăng nhập" onAction={() => navigation.navigate("Login")} />;
  }
  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  const renderOrder = ({ item: o }: { item: Order }) => {
    const open = openId === o.id;
    const count = o.items.reduce((n, i) => n + i.quantity, 0);
    return (
      <Pressable style={[styles.card, open && styles.cardOpen]} onPress={() => setOpenId(open ? null : o.id)}>
        <View style={styles.row}>
          <Text style={styles.code}>Đơn #{o.id}</Text>
          <StatusBadge status={o.status} />
        </View>
        <Text style={styles.date}>🕒 {formatDateTime(o.createdAt)} · {count} sản phẩm</Text>
        <View style={styles.row}>
          <Text style={styles.total}>{formatPrice(o.total)}</Text>
          <Text style={styles.toggle}>Chi tiết {open ? "▲" : "▼"}</Text>
        </View>

        {open && (
          <View style={styles.detail}>
            {o.items.map((i) => (
              <View key={i.bookId} style={styles.row}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {i.title} × {i.quantity}
                </Text>
                <Text style={styles.itemPrice}>{formatPrice(i.price * i.quantity)}</Text>
              </View>
            ))}
            <View style={styles.sep} />
            <Text style={styles.label}>Giao đến</Text>
            <Text style={styles.text}>
              {o.address.name} · {o.address.phone}
            </Text>
            <Text style={styles.text}>{o.address.address}</Text>
            <Text style={styles.label}>Thanh toán</Text>
            <Text style={styles.text}>{PAYMENT_LABEL[o.paymentMethod]}</Text>
            {o.status === "completed" && (
              <View style={{ marginTop: 8 }}>
                <PrimaryButton title="🔁 Mua lại" variant="outline" loading={reordering === o.id} onPress={() => reorder(o)} />
              </View>
            )}
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {orders.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters} style={styles.filterBar}>
          {FILTERS.map((f) => {
            const active = filter === f.key;
            const n = f.key === "all" ? orders.length : orders.filter((o) => o.status === f.key).length;
            return (
              <Pressable key={f.key} style={[styles.chip, active && styles.chipActive]} onPress={() => setFilter(f.key)}>
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {f.label} ({n})
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
      <FlatList
        data={visibleOrders}
        keyExtractor={(o) => String(o.id)}
        renderItem={renderOrder}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          orders.length === 0 ? (
            <EmptyState
              emoji="🧾"
              title="Bạn chưa có đơn hàng nào"
              message="Các đơn bạn đặt sẽ hiện ở đây."
              actionLabel="Mua sắm ngay"
              onAction={() => navigation.navigate("Tabs", { screen: "Home" })}
            />
          ) : (
            <EmptyState emoji="🔎" title="Không có đơn ở trạng thái này" actionLabel="Xem tất cả" onAction={() => setFilter("all")} />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  filterBar: { flexGrow: 0 },
  filters: { paddingHorizontal: 12, paddingTop: 12, gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: radius.pill, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line },
  chipActive: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  chipText: { fontSize: 13, fontWeight: "700", color: colors.text },
  chipTextActive: { color: "#fff" },
  list: { padding: 12, gap: 10, paddingBottom: 40 },
  card: { backgroundColor: "#fff", borderRadius: radius.md, padding: 14, gap: 6, borderWidth: 1.5, borderColor: "transparent" },
  cardOpen: { borderColor: colors.indigo },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  code: { fontSize: 16, fontWeight: "800", color: colors.navy },
  date: { color: colors.muted, fontSize: 13 },
  total: { fontSize: 17, fontWeight: "800", color: colors.indigo },
  toggle: { color: colors.indigo, fontWeight: "700" },
  detail: { marginTop: 6, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.line, gap: 4 },
  itemTitle: { flex: 1, color: colors.text },
  itemPrice: { fontWeight: "700", color: colors.text },
  sep: { height: 1, backgroundColor: colors.line, marginVertical: 6 },
  label: { fontWeight: "800", color: colors.navy, marginTop: 4 },
  text: { color: colors.text },
});
