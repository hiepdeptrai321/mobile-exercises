import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={s.root}>
      <Ionicons name="cloud-offline-outline" size={52} color={colors.red} />
      <Text style={s.title}>Không thể tải sản phẩm</Text>
      <Text style={s.message} accessibilityLiveRegion="polite">{message}</Text>
      <Pressable accessibilityRole="button" onPress={onRetry} style={({ pressed }) => [s.button, pressed && { opacity: 0.7 }]}>
        <Text style={s.buttonText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28, gap: 16, backgroundColor: '#FFFFFF' },
  title: { fontSize: 20, fontWeight: '700', color: colors.text, textAlign: 'center' },
  message: { fontSize: 15, lineHeight: 23, color: colors.muted, textAlign: 'center' },
  button: { backgroundColor: colors.red, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 6, marginTop: 8 },
  buttonText: { fontWeight: '700', color: '#FFFFFF', fontSize: 15 },
});
