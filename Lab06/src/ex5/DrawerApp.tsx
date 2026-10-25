import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, type ParamListBase } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { colors } from '../theme';
import { SettingsProvider, useDrawerPalette, useSettings } from './SettingsContext';

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();
const ICONS: Record<keyof DrawerParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home-outline', Profile: 'person-outline', Settings: 'settings-outline',
};

function HomeScreen() {
  const palette = useDrawerPalette();
  return (
    <View style={[s.center, { backgroundColor: palette.background }]} testID="drawer-home">
      <View style={[s.welcomeIcon, { backgroundColor: palette.accentBackground }]}><Ionicons name="home-outline" size={45} color={colors.red} /></View>
      <Text style={[s.big, { color: palette.text }]}>Xin chào 👋</Text>
      <Text style={[s.description, { color: palette.muted }]}>Mở menu ☰ hoặc kéo từ cạnh trái để chuyển màn hình.</Text>
    </View>
  );
}

function ProfileScreen() {
  const palette = useDrawerPalette();
  return (
    <View style={[s.center, { backgroundColor: palette.background }]} testID="drawer-profile">
      <View style={s.avatar}><Text style={s.avatarText}>NA</Text></View>
      <Text style={[s.big, { color: palette.text }]}>Nguyễn Văn An</Text>
      <Text style={[s.email, { color: palette.muted }]}>an.nguyen@example.com</Text>
    </View>
  );
}

function SettingsScreen() {
  const { notify, setNotify, dark, setDark } = useSettings();
  const palette = useDrawerPalette();
  return (
    <ScrollView style={{ backgroundColor: palette.background }} contentContainerStyle={s.settings}>
      <Text style={[s.settingsTitle, { color: palette.text }]}>Tùy chọn ứng dụng</Text>
      <View style={[s.settingsCard, { backgroundColor: palette.surface, borderColor: palette.line }]}>
        <View style={[s.settingRow, { borderBottomColor: palette.line, borderBottomWidth: 1 }]}>
          <Text style={[s.settingLabel, { color: palette.text }]}>Nhận thông báo</Text>
          <Switch accessibilityLabel="Nhận thông báo" value={notify} onValueChange={setNotify} trackColor={{ false: '#9CA3AF', true: colors.red }} thumbColor="#FFFFFF" />
        </View>
        <View style={s.settingRow}>
          <Text style={[s.settingLabel, { color: palette.text }]}>Chế độ tối</Text>
          <Switch accessibilityLabel="Chế độ tối" value={dark} onValueChange={setDark} trackColor={{ false: '#9CA3AF', true: colors.red }} thumbColor="#FFFFFF" />
        </View>
      </View>
      <Text style={[s.summary, { color: palette.text }]} accessibilityLiveRegion="polite">
        Thông báo: {notify ? 'BẬT' : 'TẮT'} · Giao diện: {dark ? 'tối' : 'sáng'}
      </Text>
    </ScrollView>
  );
}

function DrawerNavigator() {
  const { dark } = useSettings();
  const palette = useDrawerPalette();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  useLayoutEffect(() => {
    navigation.setOptions({ headerStyle: { backgroundColor: palette.surface }, headerTintColor: palette.text });
  }, [navigation, palette.surface, palette.text]);
  return (
    <>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <Drawer.Navigator screenOptions={({ route }) => ({
        drawerActiveTintColor: colors.red,
        drawerActiveBackgroundColor: palette.accentBackground,
        drawerInactiveTintColor: palette.text,
        drawerStyle: { backgroundColor: palette.surface },
        headerStyle: { backgroundColor: palette.surface },
        headerTintColor: palette.text,
        sceneStyle: { backgroundColor: palette.background },
        drawerType: 'front',
        swipeEdgeWidth: 32,
        drawerIcon: ({ size, color }) => <Ionicons name={ICONS[route.name]} size={size} color={color} />,
      })}>
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Cá nhân' }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Cài đặt' }} />
      </Drawer.Navigator>
    </>
  );
}

export function DrawerApp() {
  return <SettingsProvider><DrawerNavigator /></SettingsProvider>;
}

const s = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  welcomeIcon: { width: 100, height: 100, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  big: { fontSize: 26, fontWeight: '700', textAlign: 'center' },
  description: { fontSize: 15, lineHeight: 24, textAlign: 'center', maxWidth: 290, marginTop: 14 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  avatarText: { color: '#FFFFFF', fontSize: 34, fontWeight: '700' },
  email: { fontSize: 15, marginTop: 10 },
  settings: { padding: 20, gap: 22 },
  settingsTitle: { fontSize: 22, fontWeight: '700', marginVertical: 6 },
  settingsCard: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 16 },
  settingRow: { minHeight: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  settingLabel: { flex: 1, fontSize: 16 },
  summary: { fontSize: 15, lineHeight: 24 },
});
