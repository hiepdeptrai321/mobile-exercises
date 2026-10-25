import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NoticeModal } from '../components/NoticeModal';
import { Stars } from '../components/Stars';
import { PHONE_COLORS } from '../data/phones';
import { colors, formatPrice } from '../theme';
import type { Phone } from '../types';
import type { SelectPhoneParamList } from './SelectPhoneApp';

type Props = NativeStackScreenProps<SelectPhoneParamList, 'Product'> & { phone: Phone };

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;
  const { height } = useWindowDimensions();
  const [notice, setNotice] = useState<'buy' | 'help' | null>(null);

  return (
    <SafeAreaView style={s.root} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.imageWrap}>
          <Image
            source={PHONE_COLORS[shown].image}
            style={[s.image, { height: Math.max(240, Math.min(365, height * 0.46)) }]}
            resizeMode="contain"
            accessibilityLabel={`Điện thoại màu ${PHONE_COLORS[shown].label}`}
            testID="product-image"
          />
        </View>
        <View style={s.info}>
          <Text style={s.name}>{phone.name}</Text>
          <View style={s.row}>
            <Stars value={phone.rating} size={22} />
            <Text style={s.review}>(Xem {phone.reviewCount} đánh giá)</Text>
          </View>
          <View style={s.row}>
            <Text style={s.price}>{formatPrice(phone.price)}</Text>
            <Text style={s.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
          </View>
          <View style={s.badgeRow}>
            <Text style={s.badge}>{phone.badge}</Text>
            <Pressable accessibilityRole="button" accessibilityLabel="Thông tin hoàn tiền" onPress={() => setNotice('help')} hitSlop={10}>
              <Ionicons name="help-circle-outline" size={22} color={colors.text} />
            </Pressable>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('ChooseColor', { color: picked })}
            style={({ pressed }) => [s.chooseBtn, pressed && s.pressed]}
          >
            <Text style={s.chooseText}>{phone.colors.length} MÀU-CHỌN {picked ? 'LOẠI' : 'MÀU'}</Text>
            <Ionicons name="chevron-forward" size={24} color={colors.text} style={s.chevron} />
          </Pressable>
        </View>
      </ScrollView>
      <Pressable accessibilityRole="button" style={({ pressed }) => [s.buyBtn, pressed && s.pressed]} onPress={() => setNotice('buy')}>
        <Text style={s.buyText}>CHỌN MUA</Text>
      </Pressable>
      <NoticeModal
        visible={notice !== null}
        title={notice === 'buy' ? 'Sản phẩm đã chọn' : 'Thông tin hoàn tiền'}
        message={notice === 'buy'
          ? `${phone.name}\nMàu: ${PHONE_COLORS[shown].label}\nGiá: ${formatPrice(phone.price)}`
          : 'Ưu đãi “Ở đâu rẻ hơn hoàn tiền” theo điều kiện áp dụng của nhà cung cấp.'}
        onClose={() => setNotice(null)}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flexGrow: 1, paddingHorizontal: 16, paddingBottom: 20 },
  imageWrap: { flex: 1, minHeight: 260, alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  image: { width: '100%', maxWidth: 320 },
  info: { gap: 16 },
  name: { fontSize: 15, lineHeight: 22, color: colors.text },
  row: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 18 },
  review: { color: colors.text, fontSize: 14 },
  price: { fontWeight: '700', fontSize: 20, color: colors.text },
  oldPrice: { textDecorationLine: 'line-through', color: colors.muted, fontSize: 15, fontWeight: '600' },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  badge: { color: colors.red, fontWeight: '700', fontSize: 13, flexShrink: 1 },
  chooseBtn: { borderWidth: 1, borderColor: '#999999', borderRadius: 6, minHeight: 40, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 },
  chooseText: { color: colors.text, fontSize: 15 },
  chevron: { position: 'absolute', right: 12 },
  buyBtn: { minHeight: 46, marginHorizontal: 16, marginBottom: 12, backgroundColor: colors.red, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  buyText: { color: '#FFFFFF', fontSize: 19, fontWeight: '700' },
  pressed: { opacity: 0.7 },
});
