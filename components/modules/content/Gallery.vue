<template>
  <div class="gallery">
    <div
        v-for="(item, index) in itemsWithClasses"
        :key="index"
        class="gallery-item"
        :class="item.typeClass"
    >
      <template v-if="item.type === 'image'">
        <img :src="item.src" class="gallery-image" :alt="item.alt" />
      </template>
      <template v-else-if="item.type === 'video'">
        <video class="gallery-video" autoplay loop muted>
          <source :src="item.src" type="video/mp4" />
        </video>
      </template>
      <template v-else>
        <img
            v-for="(img, imgIndex) in item.images"
            :key="imgIndex"
            :src="img.src"
            class="gallery-image"
            :alt="img.alt"
        />
        <video
            v-for="(vid, vidIndex) in item.videos"
            :key="vidIndex"
            class="gallery-video"
            autoplay
            loop
            muted
        >
          <source :src="vid.src" type="video/mp4" />
        </video>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface ImageItem {
  type: 'image';
  src: string;
  alt: string;
}

interface VideoItem {
  type: 'video';
  src: string;
}

interface DoubleItem {
  type: 'double';
  images: { src: string; alt: string }[];
  videos?: { src: string }[];
}

interface TripleItem {
  type: 'triple';
  images: { src: string; alt: string }[];
  videos?: { src: string }[];
}

interface QuadItem {
  type: 'quad';
  images: { src: string; alt: string }[];
  videos?: { src: string }[];
}

type GalleryItem = ImageItem | VideoItem | DoubleItem | TripleItem | QuadItem;

const props = defineProps({
  items: {
    type: Array as PropType<GalleryItem[]>,
    required: true
  }
});

const itemsWithClasses = computed(() => {
  return props.items.map(item => {
    let typeClass = '';

    switch (item.type) {
      case 'double':
        typeClass = 'gallery-double';
        break;
      case 'triple':
        typeClass = 'gallery-triple';
        break;
      case 'quad':
        typeClass = 'gallery-quad';
        break;
      default:
        typeClass = ''; // Для обычных изображений и видео без доп. классов
    }

    return { ...item, typeClass };
  });
});
</script>

<style lang="scss" scoped>

.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 столбца по умолчанию */
  gap: 10px; /* Пробел между блоками */
  margin: 0 auto; /* Центрирование */
  padding: 20px 0; /* Отступы сверху и снизу */
  grid-auto-flow: dense; /* Плотная укладка */
}

.gallery-item {
  position: relative;
  border-radius: 8px; /* Закругленные углы */
  overflow: hidden; /* Скрываем лишнее */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gallery-image,
.gallery-video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Изображение заполняет весь блок */
  transition: transform 0.3s ease; /* Плавный переход при наведении */

  &:hover {
    transform: scale(1.05); /* Увеличение изображения при наведении */
  }
}

/* Большой блок (2 столбца и 2 строки) */
.gallery-item--span-2x2 {
  grid-column: span 2; /* Занимает 2 столбца */
  grid-row: span 2; /* Занимает 2 строки */
}

/* Блок, занимающий 2 столбца */
.gallery-item--span-2 {
  grid-column: span 2; /* Занимает 2 столбца */
}

/* Блок, занимающий 2 строки */
.gallery-item--span-rows {
  grid-row: span 2; /* Занимает 2 строки */
}

/* Блок с двумя изображениями */
.gallery-double {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Два столбца */
  grid-auto-rows: minmax(100px, auto); /* Минимальная высота строк */
  gap: 5px; /* Пробел между изображениями */
}

/* Блок с тремя изображениями */
.gallery-triple {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Три столбца */
  grid-auto-rows: minmax(100px, auto); /* Минимальная высота строк */
  gap: 5px; /* Пробел между изображениями */
}

/* Блок с четырьмя изображениями */
.gallery-quad {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Два столбца */
  grid-template-rows: repeat(2, 1fr); /* Две строки */
  gap: 5px; /* Пробел между изображениями */
}
</style>
