import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { EmptyState } from '../components/EmptyState';
import { ProductRow } from '../components/ProductRow';
import { PHONES } from '../data/phones';
import { colors } from '../theme';

type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();
const ICONS: Record<keyof TabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
  Home: ['home', 'home-outline'], Search: ['search', 'search-outline'], Profile: ['person', 'person-outline'],
};

function HomeTab() {
  return (
    <FlatList
      style={s.root}
      data={PHONES}
      keyExtractor={(phone) => phone.id}
      contentContainerStyle={s.list}
      ListHeaderComponent={<Text style={s.heading}>Điện thoại nổi bật</Text>}
      renderItem={({ item }) => <ProductRow phone={item} />}
    />
  );
}

function SearchTab() {
  const [keyword, setKeyword] = useState('');
  const results = useMemo(() => PHONES.filter((phone) => phone.name.toLowerCase().includes(keyword.trim().toLowerCase())), [keyword]);
  return (
    <View style={s.root}>
      <View style={s.searchHeader}>
        <Text style={s.heading}>Tìm kiếm điện thoại</Text>
        <View style={s.searchBox}>
          <Ionicons name="search-outline" size={21} color={colors.muted} />
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Nhập từ khóa"
            accessibilityLabel="Nhập từ khóa"
            placeholderTextColor={colors.muted}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            style={s.input}
          />
          {keyword.length > 0 && (
            <Pressable accessibilityRole="button" accessibilityLabel="Xóa từ khóa" onPress={() => setKeyword('')} hitSlop={10}>
              <Ionicons name="close-circle" size={21} color={colors.muted} />
            </Pressable>
          )}
        </View>
        <Text style={s.count} accessibilityLiveRegion="polite">{results.length} sản phẩm</Text>
      </View>
      <FlatList
        data={results}
        keyExtractor={(phone) => phone.id}
        contentContainerStyle={[s.list, results.length === 0 && s.grow]}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => <ProductRow phone={item} />}
        ListEmptyComponent={<EmptyState title={`Không có kết quả cho “${keyword}”`} detail="Thử tìm với tên một dòng điện thoại khác." />}
      />
    </View>
  );
}

function ProfileTab() {
  return (
    <View style={[s.root, s.center]}>
      <View style={s.avatar}><Text style={s.avatarText}>NA</Text></View>
      <Text style={s.name}>Nguyễn Văn An</Text>
      <Text style={s.email}>an.nguyen@example.com</Text>
    </View>
  );
}

export function BottomTabApp() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.red,
      tabBarInactiveTintColor: colors.muted,
      tabBarHideOnKeyboard: true,
      tabBarIcon: ({ focused, color, size }) => <Ionicons name={ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />,
    })}>
      <Tab.Screen name="Home" component={HomeTab} options={{ title: 'Trang chủ' }} />
      <Tab.Screen name="Search" component={SearchTab} options={{ title: 'Tìm kiếm' }} />
      <Tab.Screen name="Profile" component={ProfileTab} options={{ title: 'Cá nhân' }} />
    </Tab.Navigator>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  list: { padding: 16, gap: 10 },
  heading: { fontSize: 21, fontWeight: '700', color: colors.text, marginBottom: 8 },
  searchHeader: { paddingHorizontal: 16, paddingTop: 20, gap: 10 },
  searchBox: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: colors.line, borderRadius: 8, paddingHorizontal: 12 },
  input: { flex: 1, height: 46, fontSize: 16, color: colors.text, minWidth: 0 },
  count: { color: colors.muted, fontSize: 13 },
  grow: { flexGrow: 1 },
  center: { justifyContent: 'center', alignItems: 'center', padding: 24 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  avatarText: { fontSize: 34, fontWeight: '700', color: '#FFFFFF' },
  name: { fontSize: 25, fontWeight: '700', color: colors.text, textAlign: 'center' },
  email: { fontSize: 15, color: colors.muted, marginTop: 10 },
});
