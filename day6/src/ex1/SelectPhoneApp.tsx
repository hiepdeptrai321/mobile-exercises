import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ColorKey, Phone } from '../types';
import { ChooseColorScreen } from './ChooseColorScreen';
import { ProductScreen } from './ProductScreen';

export type SelectPhoneParamList = {
  Product: { color?: ColorKey } | undefined;
  ChooseColor: { color?: ColorKey } | undefined;
};

const Stack = createNativeStackNavigator<SelectPhoneParamList>();

export function SelectPhoneApp({ phone }: { phone: Phone }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FFFFFF' } }}>
      <Stack.Screen name="Product">{(props) => <ProductScreen {...props} phone={phone} />}</Stack.Screen>
      <Stack.Screen name="ChooseColor">{(props) => <ChooseColorScreen {...props} phone={phone} />}</Stack.Screen>
    </Stack.Navigator>
  );
}
