import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme';
import { FavoritesProvider, useFavorites } from './FavoritesContext';
import { FavoritesTab } from './FavoritesTab';
import { ProductDetailsScreen } from './ProductDetailsScreen';
import { ProductsTab } from './ProductsTab';
import type { RootStackParamList, TabParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function HomeTabs() {
  const { ids } = useFavorites();
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.red,
      tabBarInactiveTintColor: colors.muted,
      tabBarIcon: ({ focused, color, size }) => (
        <Ionicons name={route.name === 'Products' ? (focused ? 'grid' : 'grid-outline') : (focused ? 'heart' : 'heart-outline')} color={color} size={size} />
      ),
    })}>
      <Tab.Screen name="Products" component={ProductsTab} options={{ title: 'Sản phẩm' }} />
      <Tab.Screen name="Favorites" component={FavoritesTab} options={{ title: 'Yêu thích', tabBarBadge: ids.length || undefined }} />
    </Tab.Navigator>
  );
}

export function StackTabApp() {
  return (
    <FavoritesProvider>
      <Stack.Navigator screenOptions={{ headerTintColor: colors.text, headerBackButtonDisplayMode: 'minimal' }}>
        <Stack.Screen name="Home" component={HomeTabs} options={{ title: 'Cửa hàng' }} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Chi tiết sản phẩm' }} />
      </Stack.Navigator>
    </FavoritesProvider>
  );
}
