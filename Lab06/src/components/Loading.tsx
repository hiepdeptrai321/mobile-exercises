import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function Loading() {
  return (
    <View style={s.root} accessibilityLiveRegion="polite">
      <ActivityIndicator size="large" color={colors.red} />
      <Text style={s.text}>Đang tải...</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, backgroundColor: '#FFFFFF' },
  text: { color: colors.muted, fontSize: 16 },
});
