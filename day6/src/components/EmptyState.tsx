import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function EmptyState({ title, detail, icon = 'search-outline' }: {
  title: string;
  detail?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={s.root}>
      <Ionicons name={icon} size={48} color={colors.muted} />
      <Text style={s.title}>{title}</Text>
      {detail ? <Text style={s.detail}>{detail}</Text> : null}
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, padding: 28, alignItems: 'center', justifyContent: 'center', gap: 14 },
  title: { fontSize: 16, lineHeight: 24, fontWeight: '600', color: colors.text, textAlign: 'center' },
  detail: { fontSize: 14, lineHeight: 22, color: colors.muted, textAlign: 'center' },
});
