<template>
  <div class="masonry-gallery">
    <!-- Скелетон-загрузка -->
    <div v-if="isLoading" class="masonry-skeleton">
      <div v-for="index in skeletonCount" :key="index" class="masonry-item skeleton-item">
        <div class="skeleton-image"></div>
      </div>
    </div>

    <!-- Реальный контент -->
    <div
        v-else
        v-for="(group, groupIndex) in formattedMediaGroups"
        :key="groupIndex"
        class="masonry-item"
        :class="group.className"
        @click="openMediaModal(group.slug)"
    >
      <template v-for="(item, itemIndex) in group.group" :key="itemIndex">
        <img
            v-if="item.type === 'image'"
            :src="item.src"
            class="masonry-image"
            alt="Gallery Image"
            loading="lazy"
        />
        <video
            v-else-if="item.type === 'video'"
            class="masonry-video"
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
import { computed, ref } from 'vue';
import type { Post } from "~/types/post";

const props = defineProps<{
  posts: Post[];
}>();

const isLoading = ref(true); // Флаг загрузки
const skeletonCount = 12; // Количество скелетонов

// Симуляция завершения загрузки через 2 секунды
setTimeout(() => {
  isLoading.value = false;
}, 2000);

const formattedMediaGroups = computed(() => {
  return props.posts
      .filter(post => post.media?.length)
      .flatMap((post, postIndex) =>
          post.media?.map((mediaGroup, mediaIndex) => ({
            id: post.id || "",
            slug: post.slug,
            className: getClassName(mediaGroup.group?.length || 0, mediaIndex),
            group: mediaGroup.group || []
          })) || []
      );
});

const getClassName = (count: number, index: number): string => {
  if (count >= 4) return 'masonry-quad';
  if (count === 3) return 'masonry-triple';
  if (count === 2) return 'masonry-double';
  const sizes = ['small', 'medium', 'large', 'vertical', 'horizontal'];
  return `masonry-${sizes[Math.floor(Math.random() * sizes.length)]}`;
};

const openMediaModal = (slug?: string) => {
  if (slug) {
    console.log('Opening modal with slug:', slug);
  } else {
    console.error('No slug provided');
  }
};
</script>

<style lang="scss" scoped>
/* Стили для скелетона */
.masonry-skeleton {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.skeleton-item {
  background: #f0f0f0; /* Серый цвет для имитации скелетона */
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: default;

  & > .skeleton-image {
    width: 100%;
    padding-top: 75%; /* Соотношение сторон 4:3 */
    background: linear-gradient(90deg,
        #f0f0f0 0%,
        #e0e0e0 50%,
        #f0f0f0 100%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Стили для реального контента */
.masonry-gallery {
  column-count: 4;
  column-gap: 10px;
  padding: 12px 0;

  @media (max-width: 1200px) {
    column-count: 3;
  }
  @media (max-width: 900px) {
    column-count: 2;
  }
  @media (max-width: 600px) {
    column-count: 1;
  }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.masonry-image,
.masonry-video {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}
</style>