import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { PHONE_COLORS } from '../data/phones';
import { colors, formatPrice } from '../theme';
import type { Phone } from '../types';
import { Stars } from './Stars';

export function ProductRow({ phone, onPress, favorite = false }: { phone: Phone; onPress?: () => void; favorite?: boolean }) {
  const name = phone.name.split(' - ')[0];
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={onPress ? `Xem ${name}` : undefined}
      style={({ pressed }) => [s.card, pressed && onPress && s.pressed]}
    >
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={s.image} resizeMode="contain" accessibilityLabel={name} />
      <View style={s.info}>
        <Text style={s.name}>{name}</Text>
        <Stars value={phone.rating} size={13} />
        <Text style={s.price}>{formatPrice(phone.price)}</Text>
      </View>
      {favorite && <Ionicons name="heart" color={colors.red} size={19} accessibilityLabel="Đã lưu" />}
      {onPress && <Ionicons name="chevron-forward" size={18} color={colors.muted} />}
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: { padding: 14, borderRadius: 10, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', gap: 14 },
  pressed: { opacity: 0.65 },
  image: { width: 62, height: 83 },
  info: { flex: 1, gap: 7 },
  name: { fontSize: 15, lineHeight: 21, fontWeight: '600', color: colors.text },
  price: { fontSize: 16, fontWeight: '700', color: colors.red },
});
