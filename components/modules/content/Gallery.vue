<template>
  <div class="gallery">
    <div
        v-for="(group, groupIndex) in formattedMediaGroups"
        :key="groupIndex"
        class="gallery-item"
        :class="group.className.split(' ')"
    >
      <template v-for="(item, itemIndex) in group.group" :key="itemIndex">
        <img
            v-if="item.type === 'image'"
            :src="item.src"
            class="gallery-image"
            alt="Gallery Image"
        />
        <video
            v-else-if="item.type === 'video'"
            class="gallery-video"
            autoplay
            loop
            muted
        >
          <source :src="item.src" type="video/mp4" />
        </video>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface MediaItem {
  type: 'image' | 'video' | 'filler';
  src: string;
}

interface MediaGroup {
  group: MediaItem[];
}

interface Post {
  media?: MediaGroup[];
}

interface FormattedMediaGroup extends MediaGroup {
  className: string;
}

const props = defineProps<{
  posts: Post[];
}>();

const formatMedia = (media?: MediaGroup[]): FormattedMediaGroup[] => {
  return (media || []).map((group, index) => {
    let className = '';
    const area = group.group.length;

    if (area >= 4) {
      className = 'gallery-quad';
    } else if (area === 3) {
      className = 'gallery-triple';
    } else if (area === 2) {
      className = 'gallery-double';
    } else {
      if (index % 4 === 0) {
        className = 'gallery-item--span-2x2';
      } else if (index % 3 === 0) {
        className = 'gallery-item--span-2';
      } else if (index % 5 === 0) {
        className = 'gallery-item--span-rows';
      } else {
        className = ''; // Обычный элемент 1x1
      }
    }

    return { ...group, className };
  });
};

const getSpanX = (className: string): number => {
  if (className.includes('span-2x2')) return 2;
  if (className.includes('span-2')) return 2;
  if (className === 'gallery-double') return 2;
  if (className === 'gallery-triple') return 3;
  if (className === 'gallery-quad') return 2;
  return 1;
};

const getSpanY = (className: string): number => {
  if (className.includes('span-2x2')) return 2;
  if (className.includes('span-rows')) return 2;
  if (className === 'gallery-quad') return 2;
  return 1;
};

const canPlace = (
    grid: { group: FormattedMediaGroup | null }[][],
    x: number,
    y: number,
    spanX: number,
    spanY: number,
    gridWidth: number
): boolean => {
  for (let i = 0; i < spanY; i++) {
    const row = grid[y + i];
    if (!row) return true;
    for (let j = 0; j < spanX; j++) {
      if (x + j >= gridWidth || (row[x + j] && row[x + j].group)) return false;
    }
  }
  return true;
};

const placeGroup = (
    grid: { group: FormattedMediaGroup | null }[][],
    x: number,
    y: number,
    spanX: number,
    spanY: number,
    group: FormattedMediaGroup,
    gridWidth: number
) => {
  for (let i = 0; i < spanY; i++) {
    if (!grid[y + i]) {
      grid[y + i] = Array(gridWidth).fill(null).map(() => ({ group: null }));
    }
    for (let j = 0; j < spanX; j++) {
      grid[y + i][x + j].group = group;
    }
  }
};

const binPackingOptimized = (groups: FormattedMediaGroup[]): FormattedMediaGroup[] => {
  const gridWidth = 4;
  const grid: { group: FormattedMediaGroup | null }[][] = [];
  let maxHeight = 0;

  const sortedGroups = [...groups].sort((a, b) => {
    const areaA = getSpanX(a.className) * getSpanY(a.className);
    const areaB = getSpanX(b.className) * getSpanY(b.className);
    return areaB - areaA;
  });

  for (const group of sortedGroups) {
    const spanX = getSpanX(group.className);
    const spanY = getSpanY(group.className);

    let placed = false;
    for (let y = 0; !placed; y++) {
      if (!grid[y]) grid[y] = Array(gridWidth).fill(null).map(() => ({ group: null }));

      for (let x = 0; x <= gridWidth - spanX; x++) {
        if (canPlace(grid, x, y, spanX, spanY, gridWidth)) {
          placeGroup(grid, x, y, spanX, spanY, group, gridWidth);
          maxHeight = Math.max(maxHeight, y + spanY);
          placed = true;
          break;
        }
      }
    }
  }

  const result: FormattedMediaGroup[] = [];
  for (let y = 0; y < maxHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const group = grid[y][x]?.group;
      if (group && !result.includes(group)) {
        result.push(group);
      }
    }
  }

  return result;
};

const simulateGrid = (groups: FormattedMediaGroup[]): { group: FormattedMediaGroup | null }[][] => {
  const gridWidth = 4;
  const grid: { group: FormattedMediaGroup | null }[][] = [];
  let maxHeight = 0;

  for (const group of groups) {
    const spanX = getSpanX(group.className);
    const spanY = getSpanY(group.className);

    let placed = false;
    for (let y = 0; !placed; y++) {
      if (!grid[y]) grid[y] = Array(gridWidth).fill(null).map(() => ({ group: null }));

      for (let x = 0; x <= gridWidth - spanX; x++) {
        if (canPlace(grid, x, y, spanX, spanY, gridWidth)) {
          placeGroup(grid, x, y, spanX, spanY, group, gridWidth);
          maxHeight = Math.max(maxHeight, y + spanY);
          placed = true;
          break;
        }
      }
    }
  }

  return grid.slice(0, maxHeight);
};

const addSmartFillers = (groups: FormattedMediaGroup[]): FormattedMediaGroup[] => {
  const gridWidth = 4;
  const grid = simulateGrid(groups);
  const maxHeight = grid.length;

  for (let y = 0; y < maxHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      if (!grid[y][x]?.group) {
        const filler: FormattedMediaGroup = {
          group: [{ type: 'filler', src: '' }],
          className: 'gallery-filler',
        };
        groups.push(filler);
        grid[y][x].group = filler;
      }
    }
  }

  return groups;
};

const formattedMediaGroups = computed(() => {
  const groups = props.posts
      .filter(post => post.media?.length)
      .flatMap(post => formatMedia(post.media));

  const packedGroups = binPackingOptimized(groups);
  return addSmartFillers(packedGroups);
});
</script>

<style lang="scss" scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: auto; /* Пусть высота определяется содержимым */
  gap: 6px;
  margin: 0 auto;
  padding: 12px 0;
  grid-auto-flow: dense;
}

.gallery-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  /* Убираем aspect-ratio для большей гибкости */
}

.gallery-image,
.gallery-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
}

/* Размеры блоков */
.gallery-item--span-2x2 {
  grid-column: span 2;
  grid-row: span 2;
}

.gallery-item--span-2 {
  grid-column: span 2;
}

.gallery-item--span-rows {
  grid-row: span 2;
}

/* Заполнители */
.gallery-filler {
  background-color: #f0f0f0;
  opacity: 0.5;
  min-height: 150px; /* Минимальная высота для согласованности */
}

/* Вложенные сетки */
.gallery-double {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
}

.gallery-triple {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}

.gallery-quad {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 4px;
}

/* Адаптивность */
@media (max-width: 900px) {
  .gallery {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 5px;
  }
  .gallery-item--span-2x2,
  .gallery-item--span-2,
  .gallery-item--span-rows {
    grid-column: span 1;
    grid-row: span 1;
  }
  .gallery-triple {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .gallery {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 4px;
  }
  .gallery-double,
  .gallery-triple,
  .gallery-quad {
    grid-template-columns: 1fr;
  }
}
</style>
