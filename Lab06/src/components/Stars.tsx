import { Text } from 'react-native';
import { colors } from '../theme';

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  const stars = Math.max(0, Math.min(5, Math.round(Number.isFinite(value) ? value : 0)));
  return (
    <Text accessibilityLabel={`${value} trên 5 sao`} style={{ color: colors.star, fontSize: size, letterSpacing: 1 }}>
      {'★'.repeat(stars)}<Text style={{ color: colors.line }}>{'★'.repeat(5 - stars)}</Text>
    </Text>
  );
}
