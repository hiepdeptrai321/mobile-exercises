import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BookGrid } from '@/components/bookstore/BookGrid';
import { CategoryChips } from '@/components/bookstore/CategoryChips';
import { FloatingCartButton } from '@/components/bookstore/FloatingCartButton';
import { Header } from '@/components/bookstore/Header';
import { BOOKS } from '@/data';

export default function HomeScreen() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <CategoryChips />
        <Text style={styles.sectionTitle}>Sách nổi bật</Text>
        <BookGrid books={BOOKS} onPressBook={(id) => console.log('Mở sách', id)} />
      </ScrollView>
      <FloatingCartButton count={cartCount} onPress={() => setCartCount((count) => count + 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 100 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 10 },
});
