import { Image } from 'expo-image';
import { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  GALLERY_CATEGORIES,
  GALLERY_IMAGES,
  type GalleryCategory,
  type GalleryImage,
} from '@/models/gallery';

const LIME = '#c8f135';
const DARK = '#1e1e2e';
const BG = '#f3f4f8';
const WHITE = '#ffffff';
const MUTED = '#6b7280';
const BORDER = '#e5e7eb';

const SIDE = 20;
const GAP = 12;

type Filter = 'All' | GalleryCategory;

const FILTERS: Filter[] = ['All', ...GALLERY_CATEGORIES];

function GalleryHeader({ filter, onFilter, count }: { filter: Filter; onFilter: (f: Filter) => void; count: number }) {
  return (
    <View>
      <View style={s.header}>
        <Text style={s.headline}>
          Shot{'\n'}
          <Text style={s.highlight}> gallery </Text>
        </Text>
        <Text style={s.subheadline}>
          Hand-picked photos from around the world. Tap any tile to open it full screen.
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.chips}
        style={s.chipScroll}>
        {FILTERS.map((f) => {
          const active = f === filter;
          return (
            <Pressable
              key={f}
              onPress={() => onFilter(f)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              style={({ pressed }) => [s.chip, active && s.chipActive, pressed && s.chipPressed]}>
              <Text style={[s.chipText, active && s.chipTextActive]}>{f}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Text style={s.count}>
        {count} {count === 1 ? 'photo' : 'photos'}
      </Text>
    </View>
  );
}

function GalleryTile({
  item,
  size,
  onPress,
}: {
  item: GalleryImage;
  size: number;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="imagebutton"
      accessibilityLabel={`${item.title} by ${item.author}`}
      style={({ pressed }) => [
        t.root,
        { width: size, height: Math.round(size * (4 / 3)) },
        pressed && t.pressed,
      ]}>
      <Image
        source={item.uri}
        placeholder={{ blurhash: item.blurhash }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={250}
        cachePolicy="memory-disk"
      />
      <View style={t.badge}>
        <Text style={t.badgeText}>{item.category}</Text>
      </View>
      <View style={t.overlay}>
        <Text numberOfLines={1} style={t.title}>
          {item.title}
        </Text>
        <Text numberOfLines={1} style={t.author}>
          {item.author}
        </Text>
      </View>
    </Pressable>
  );
}

export default function GalleryScreen() {
  const { width } = useWindowDimensions();
  const [filter, setFilter] = useState<Filter>('All');
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  const columns = width >= 1100 ? 4 : width >= 720 ? 3 : 2;
  const tileSize = Math.floor((width - SIDE * 2 - GAP * (columns - 1)) / columns);

  const images =
    filter === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === filter);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <FlatList
        key={columns}
        data={images}
        numColumns={columns}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ gap: GAP }}
        contentContainerStyle={s.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <GalleryHeader filter={filter} onFilter={setFilter} count={images.length} />
        }
        ListEmptyComponent={
          <View style={s.empty}>
            <Text style={s.emptyText}>No photos in this category yet.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <GalleryTile item={item} size={tileSize} onPress={() => setSelected(item)} />
        )}
      />

      <Modal
        visible={selected !== null}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setSelected(null)}>
        <View style={m.backdrop}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setSelected(null)}
            accessibilityRole="button"
            accessibilityLabel="Close preview"
          />
          {selected && (
            <View style={m.sheet}>
              <Image
                source={selected.fullUri}
                placeholder={{ blurhash: selected.blurhash }}
                style={m.image}
                contentFit="contain"
                transition={200}
                cachePolicy="memory-disk"
              />
              <View style={m.captionRow}>
                <View style={m.captionText}>
                  <Text style={m.title}>{selected.title}</Text>
                  <Text style={m.meta}>
                    {selected.author} · {selected.category} · {selected.likes} likes
                  </Text>
                </View>
                <Pressable
                  onPress={() => setSelected(null)}
                  accessibilityRole="button"
                  accessibilityLabel="Close preview"
                  style={({ pressed }) => [m.closeBtn, pressed && m.closePressed]}>
                  <Text style={m.closeText}>Close</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  listContent: {
    paddingHorizontal: SIDE,
    paddingBottom: 48,
    gap: GAP,
  },
  header: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 18,
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 10,
  },
  highlight: {
    backgroundColor: LIME,
    borderRadius: 6,
    overflow: 'hidden',
    fontStyle: 'italic',
  },
  subheadline: {
    fontSize: 13,
    color: MUTED,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
  },
  chips: {
    gap: 8,
    paddingBottom: 4,
  },
  chipScroll: {
    flexGrow: 0,
    marginBottom: 10,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
  },
  chipActive: {
    backgroundColor: DARK,
    borderColor: DARK,
  },
  chipPressed: {
    opacity: 0.7,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  chipTextActive: {
    color: LIME,
  },
  count: {
    fontSize: 12,
    color: MUTED,
    fontWeight: '600',
    marginBottom: 14,
  },
  empty: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: MUTED,
  },
});

const t = StyleSheet.create({
  root: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
  },
  pressed: {
    opacity: 0.85,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: LIME,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#111',
    letterSpacing: 0.3,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(17, 24, 39, 0.72)',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: WHITE,
  },
  author: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 1,
  },
});

const m = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 15, 0.94)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  sheet: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: DARK,
    borderRadius: 18,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
    maxHeight: '72%',
    backgroundColor: '#12121a',
  },
  captionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  captionText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: WHITE,
  },
  meta: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 3,
  },
  closeBtn: {
    backgroundColor: LIME,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  closePressed: {
    opacity: 0.8,
  },
  closeText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111',
  },
});
