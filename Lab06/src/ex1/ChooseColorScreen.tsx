import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLOR_ORDER, PHONE_COLORS } from '../data/phones';
import { colors, formatPrice } from '../theme';
import type { ColorKey, Phone } from '../types';
import type { SelectPhoneParamList } from './SelectPhoneApp';

type Props = NativeStackScreenProps<SelectPhoneParamList, 'ChooseColor'> & { phone: Phone };

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, ...otherLines] = phone.name.split(' - ');
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={s.root} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <Image source={PHONE_COLORS[shown].image} style={s.thumb} resizeMode="contain" accessibilityLabel={`Điện thoại màu ${PHONE_COLORS[shown].label}`} />
          <View style={s.headerText}>
            <Text style={s.small}>{line1}</Text>
            <Text style={s.small}>{otherLines.join(' - ')}</Text>
            {picked && (
              <View style={s.selectedInfo}>
                <Text style={s.small}>Màu: <Text style={s.bold}>{PHONE_COLORS[picked].label}</Text></Text>
                <Text style={s.small}>Cung cấp bởi <Text style={s.bold}>{phone.supplier}</Text></Text>
                <Text style={s.selectedPrice}>{formatPrice(phone.price)}</Text>
              </View>
            )}
          </View>
        </View>
        <View style={s.body}>
          <Text style={s.hint}>Chọn một màu bên dưới:</Text>
          <View style={s.swatches}>
            {COLOR_ORDER.filter((key) => phone.colors.includes(key)).map((key) => (
              <Pressable
                key={key}
                accessibilityRole="radio"
                accessibilityLabel={`Chọn màu ${PHONE_COLORS[key].label}`}
                accessibilityState={{ checked: picked === key }}
                aria-checked={picked === key}
                onPress={() => setPicked(key)}
                testID={`swatch-${key}`}
                style={[s.swatch, { backgroundColor: PHONE_COLORS[key].hex }, picked === key && s.swatchOn]}
              />
            ))}
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.popTo('Product', { color: picked }, { merge: true })}
            style={({ pressed }) => [s.doneBtn, pressed && { opacity: 0.7 }]}
          >
            <Text style={s.doneText}>XONG</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.grey },
  content: { flexGrow: 1 },
  header: { minHeight: 178, backgroundColor: '#FFFFFF', flexDirection: 'row', padding: 16, gap: 16, alignItems: 'flex-start' },
  thumb: { width: 105, height: 140 },
  headerText: { flex: 1, paddingTop: 4, gap: 3 },
  small: { color: colors.text, fontSize: 15, lineHeight: 22 },
  selectedInfo: { marginTop: 6, gap: 5 },
  bold: { fontWeight: '700' },
  selectedPrice: { fontSize: 19, color: colors.text, fontWeight: '700', marginTop: 2 },
  body: { flex: 1, padding: 16, minHeight: 455, backgroundColor: colors.grey },
  hint: { fontSize: 16, color: colors.text },
  swatches: { flex: 1, minHeight: 355, paddingVertical: 12, gap: 12, alignItems: 'center', justifyContent: 'space-evenly' },
  swatch: { width: 76, height: 76, borderWidth: 3, borderColor: 'transparent' },
  swatchOn: { borderColor: colors.navy },
  doneBtn: { height: 44, backgroundColor: colors.blue, borderRadius: 4, borderWidth: 1, borderColor: colors.navy, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  doneText: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
});
