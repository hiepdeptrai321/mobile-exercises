import { FlatList, StyleSheet } from 'react-native';
import { ProductRow } from '../components/ProductRow';
import { PHONES } from '../data/phones';
import { colors } from '../theme';
import { useFavorites } from './FavoritesContext';
import type { TabProps } from './types';

export function ProductsTab({ navigation }: TabProps<'Products'>) {
  const { has } = useFavorites();
  return (
    <FlatList
      style={s.root}
      data={PHONES}
      keyExtractor={(phone) => phone.id}
      contentContainerStyle={s.list}
      renderItem={({ item }) => (
        <ProductRow phone={item} favorite={has(item.id)} onPress={() => navigation.navigate('ProductDetails', { id: item.id })} />
      )}
    />
  );
}

const s = StyleSheet.create({ root: { flex: 1, backgroundColor: colors.bg }, list: { padding: 16, gap: 12 } });
