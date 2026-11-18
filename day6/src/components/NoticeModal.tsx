import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function NoticeModal({ visible, title, message, onClose }: {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={s.backdrop}>
        <View accessibilityViewIsModal style={s.card}>
          <Text style={s.title}>{title}</Text>
          <Text style={s.message}>{message}</Text>
          <Pressable accessibilityRole="button" onPress={onClose} style={s.button}>
            <Text style={s.buttonText}>ĐÓNG</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: '#00000070', justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 420, borderRadius: 14, backgroundColor: '#FFFFFF', padding: 24, gap: 18 },
  title: { fontSize: 20, fontWeight: '700', color: colors.text },
  message: { fontSize: 15, lineHeight: 24, color: colors.text },
  button: { backgroundColor: colors.red, borderRadius: 6, alignItems: 'center', padding: 13 },
  buttonText: { fontWeight: '700', color: '#FFFFFF', fontSize: 15 },
});
