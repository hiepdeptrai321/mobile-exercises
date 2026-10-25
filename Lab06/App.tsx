import { Ionicons } from '@expo/vector-icons';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, type NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SelectPhoneApi } from './src/ex1/SelectPhoneApi';
import { SelectPhoneLocal } from './src/ex1/SelectPhoneLocal';
import { BottomTabApp } from './src/ex3/BottomTabApp';
import { StackTabApp } from './src/ex4/StackTabApp';
import { DrawerApp } from './src/ex5/DrawerApp';
import { colors } from './src/theme';

type LabParamList = {
  Menu: undefined;
  Exercise1: undefined;
  Exercise2: undefined;
  Exercise3: undefined;
  Exercise4: undefined;
  Exercise5: undefined;
};

const Stack = createNativeStackNavigator<LabParamList>();
const exercises: {
  route: Exclude<keyof LabParamList, 'Menu'>;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { route: 'Exercise1', title: 'Select Phone', description: 'Chọn màu điện thoại và nhận kết quả quay lại.', icon: 'phone-portrait-outline' },
  { route: 'Exercise2', title: 'Select Phone + API', description: 'Tải dữ liệu, xử lý lỗi và thử lại.', icon: 'cloud-download-outline' },
  { route: 'Exercise3', title: 'Bottom Tab Navigation', description: 'Trang chủ, tìm kiếm và thông tin cá nhân.', icon: 'albums-outline' },
  { route: 'Exercise4', title: 'Stack + Tab + Params', description: 'Chi tiết sản phẩm và danh sách yêu thích.', icon: 'layers-outline' },
  { route: 'Exercise5', title: 'Drawer Navigation', description: 'Menu bên, thông báo và chế độ tối.', icon: 'menu-outline' },
];

function LabMenu({ navigation }: NativeStackScreenProps<LabParamList, 'Menu'>) {
  return (
    <SafeAreaView style={s.menu}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.route}
        contentContainerStyle={s.menuContent}
        ListHeaderComponent={
          <View style={s.intro}>
            <Text style={s.eyebrow}>THỰC HÀNH REACT NATIVE</Text>
            <Text style={s.title}>Lab 06</Text>
            <Text style={s.subtitle}>Navigation</Text>
            <Text style={s.description}>Chọn một bài bên dưới để bắt đầu.</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Bài ${index + 1}: ${item.title}`}
            onPress={() => navigation.navigate(item.route)}
            style={({ pressed }) => [s.exercise, pressed && s.pressed]}
          >
            <View style={s.number}><Ionicons name={item.icon} size={26} color={colors.red} /></View>
            <View style={s.exerciseText}>
              <Text style={s.exerciseNumber}>BÀI {index + 1}</Text>
              <Text style={s.exerciseTitle}>{item.title}</Text>
              <Text style={s.exerciseDescription}>{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward" color={colors.muted} size={18} />
          </Pressable>
        )}
        ListFooterComponent={<Text style={s.footer}>Expo · React Native · TypeScript</Text>}
      />
    </SafeAreaView>
  );
}

const navigationTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, primary: colors.red, background: colors.bg, text: colors.text },
};

export default function App() {
  return (
    <GestureHandlerRootView style={s.root}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        {/* Dung mot NavigationContainer de tranh loi long container. */}
        <NavigationContainer theme={navigationTheme}>
          <Stack.Navigator screenOptions={{
            headerTintColor: colors.text,
            headerStyle: { backgroundColor: '#FFFFFF' },
            headerTitleStyle: { fontSize: 17, fontWeight: '600' },
            headerBackButtonDisplayMode: 'minimal',
            contentStyle: { backgroundColor: '#FFFFFF' },
          }}>
            <Stack.Screen name="Menu" component={LabMenu} options={{ headerShown: false, title: 'Bài tập' }} />
            <Stack.Screen name="Exercise1" component={SelectPhoneLocal} options={{ title: 'Bài 1 · Select Phone' }} />
            <Stack.Screen name="Exercise2" component={SelectPhoneApi} options={{ title: 'Bài 2 · Select Phone + API' }} />
            <Stack.Screen name="Exercise3" component={BottomTabApp} options={{ title: 'Bài 3 · Bottom Tab' }} />
            <Stack.Screen name="Exercise4" component={StackTabApp} options={{ title: 'Bài 4 · Stack + Tab' }} />
            <Stack.Screen name="Exercise5" component={DrawerApp} options={{ title: 'Bài 5 · Drawer' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  menu: { flex: 1, backgroundColor: colors.bg },
  menuContent: { padding: 20, gap: 12, width: '100%', maxWidth: 650, alignSelf: 'center' },
  intro: { paddingTop: 14, paddingBottom: 16 },
  eyebrow: { color: colors.red, fontSize: 11, fontWeight: '700', letterSpacing: 1.4 },
  title: { color: colors.text, fontSize: 40, fontWeight: '800', marginTop: 12 },
  subtitle: { color: colors.text, fontSize: 25, fontWeight: '500', marginTop: 2 },
  description: { color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: 12 },
  exercise: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFFFFF' },
  pressed: { opacity: 0.65 },
  number: { width: 50, height: 54, borderRadius: 12, backgroundColor: '#FFF1EF', alignItems: 'center', justifyContent: 'center' },
  exerciseText: { flex: 1 },
  exerciseNumber: { color: colors.red, fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  exerciseTitle: { color: colors.text, fontSize: 16, fontWeight: '700', marginTop: 4 },
  exerciseDescription: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 5 },
  footer: { color: colors.muted, textAlign: 'center', fontSize: 12, paddingVertical: 14 },
});
