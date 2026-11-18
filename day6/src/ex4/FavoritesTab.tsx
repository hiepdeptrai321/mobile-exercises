import { FlatList, StyleSheet } from 'react-native';
import { EmptyState } from '../components/EmptyState';
import { ProductRow } from '../components/ProductRow';
import { PHONES } from '../data/phones';
import { colors } from '../theme';
import { useFavorites } from './FavoritesContext';
import type { TabProps } from './types';

export function FavoritesTab({ navigation }: TabProps<'Favorites'>) {
  const { ids } = useFavorites();
  const favorites = PHONES.filter((phone) => ids.includes(phone.id));
  return (
    <FlatList
      style={s.root}
      data={favorites}
      extraData={ids}
      keyExtractor={(phone) => phone.id}
      contentContainerStyle={[s.list, favorites.length === 0 && s.grow]}
      ListEmptyComponent={<EmptyState icon="heart-outline" title="Chưa có sản phẩm nào được lưu." detail="Mở chi tiết sản phẩm và bấm Lưu vào yêu thích." />}
      renderItem={({ item }) => (
        <ProductRow phone={item} favorite onPress={() => navigation.navigate('ProductDetails', { id: item.id })} />
      )}
    />
  );
}

const s = StyleSheet.create({ root: { flex: 1, backgroundColor: colors.bg }, list: { padding: 16, gap: 12 }, grow: { flexGrow: 1 } });
