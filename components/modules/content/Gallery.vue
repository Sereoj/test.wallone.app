<template>
  <div class="masonry-gallery">
    <div
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
import { computed } from 'vue';
import type {Post} from "~/types/post";

const props = defineProps<{
  posts: Post[];
}>();

const isModalOpen = ref(false);
const selectedSlug = ref('');

// Функции для управления модальным окном
const openMediaModal = (slug?: string) => {
  console.log(slug)
  if (slug) {
    selectedSlug.value = slug;
    isModalOpen.value = true;
  }
};

const formattedMediaGroups = computed(() => {
  const test = props.posts
      .filter(post => post.media?.length)
      .flatMap((post, postIndex) =>
          post.media?.map((mediaGroup, mediaIndex) => ({
            id: post.id || "",
            slug: post.slug,
            className: getClassName(mediaGroup.group.length, mediaIndex),
            group: mediaGroup.group
          })) || []
      );

  console.log(test);
  return test;
});

// Вспомогательная функция для определения className
const getClassName = (count: number, index: number): string => {
  if (count >= 4) {
    return 'masonry-quad';
  } else if (count === 3) {
    return 'masonry-triple';
  } else if (count === 2) {
    return 'masonry-double';
  } else {
    // Случайные размеры для эффекта Masonry
    const sizes = ['small', 'medium', 'large', 'vertical', 'horizontal'];
    return `masonry-${sizes[Math.floor(Math.random() * sizes.length)]}`;
  }
};
</script>

<style lang="scss" scoped>
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

/* Размеры элементов */
.masonry-small {
  max-height: 200px;
}

.masonry-medium {
  max-height: 300px;
}

.masonry-large {
  max-height: 400px;
}

.masonry-vertical {
  max-height: 450px;
}

.masonry-horizontal {
  max-height: 250px;
}

/* Вложенные сетки */
.masonry-double {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
}

.masonry-triple {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}

.masonry-quad {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 4px;
}
</style>
