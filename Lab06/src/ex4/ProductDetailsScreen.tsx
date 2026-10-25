import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '../components/EmptyState';
import { Stars } from '../components/Stars';
import { PHONE_COLORS, PHONES } from '../data/phones';
import { colors, formatPrice } from '../theme';
import { useFavorites } from './FavoritesContext';
import type { RootProps } from './types';

export function ProductDetailsScreen({ route }: RootProps<'ProductDetails'>) {
  const { id } = route.params;
  const phone = PHONES.find((item) => item.id === id);
  const { has, toggle } = useFavorites();
  if (!phone) return <EmptyState icon="alert-circle-outline" title={`Không tìm thấy sản phẩm #${id}`} />;
  const saved = has(phone.id);

  return (
    <SafeAreaView style={s.root} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={s.content}>
        <Image source={PHONE_COLORS[phone.defaultColor].image} style={s.image} resizeMode="contain" accessibilityLabel={phone.name} />
        <Text style={s.name}>{phone.name}</Text>
        <View style={s.row}><Stars value={phone.rating} size={21} /><Text style={s.muted}>({phone.reviewCount} đánh giá)</Text></View>
        <View style={s.row}><Text style={s.price}>{formatPrice(phone.price)}</Text><Text style={s.oldPrice}>{formatPrice(phone.oldPrice)}</Text></View>
        <Text style={s.supplier}>Cung cấp bởi <Text style={s.bold}>{phone.supplier}</Text></Text>
        <Text style={s.badge}>{phone.badge}</Text>
      </ScrollView>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={saved ? 'Đã lưu, bỏ khỏi yêu thích' : 'Lưu vào yêu thích'}
        accessibilityState={{ selected: saved }}
        aria-selected={saved}
        onPress={() => toggle(phone.id)}
        style={({ pressed }) => [s.saveButton, saved && s.savedButton, pressed && { opacity: 0.7 }]}
      >
        <Text style={[s.saveText, saved && s.savedText]}>{saved ? '♥ Đã lưu' : '♡ Lưu vào yêu thích'}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 20, gap: 20, flexGrow: 1 },
  image: { width: '100%', height: 290, marginBottom: 4 },
  name: { fontSize: 21, fontWeight: '700', lineHeight: 30, color: colors.text },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 14 },
  muted: { fontSize: 14, color: colors.muted },
  price: { fontSize: 25, fontWeight: '800', color: colors.red },
  oldPrice: { fontSize: 16, color: colors.muted, textDecorationLine: 'line-through' },
  supplier: { fontSize: 15, color: colors.text },
  bold: { fontWeight: '700' },
  badge: { color: colors.red, fontSize: 13, fontWeight: '700' },
  saveButton: { margin: 16, minHeight: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.red, borderRadius: 8, borderWidth: 1, borderColor: colors.red },
  savedButton: { backgroundColor: '#FFF1EF' },
  saveText: { color: '#FFFFFF', fontWeight: '700', fontSize: 17 },
  savedText: { color: colors.red },
});
