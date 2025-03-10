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

  <!-- Модальное окно -->
  <div
      v-if="isModalOpen"
      class="modal-overlay"
      :class="{ 'active': isModalOpen }"
      @click.self="closeMediaModal">
    <button class="modal-close" aria-label="Закрыть" @click="closeMediaModal">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
           stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
    <div class="modal-content-wrapper">
      <Suspense v-if="selectedSlug">
        <template #default>
          <ModalContent :key="selectedSlug" :slug="selectedSlug" />
        </template>
        <template #fallback>
          <div class="modal-skeleton">
            <div class="skeleton-header">
              <div class="skeleton-title"></div>
              <div class="skeleton-subtitle"></div>
            </div>
            <div class="skeleton-media"></div>
            <div class="skeleton-content">
              <div class="skeleton-text"></div>
              <div class="skeleton-text"></div>
              <div class="skeleton-text"></div>
              <div class="skeleton-text skeleton-text--short"></div>
            </div>
          </div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Post } from "~/types/post";
import ModalContent from "~/components/partials/modal/ModalContent.vue";

const props = defineProps<{
  posts: Post[];
}>();

const isModalOpen = ref(false);
const isLoading = ref(true);
const selectedSlug = ref<string>('');

const openMediaModal = (slug?: string) => {
  if (slug) {
    console.log('Opening modal with slug:', slug);
    selectedSlug.value = slug;
    isModalOpen.value = true;

    requestAnimationFrame(() => {
      document.body.classList.add('no-scroll');
    });
  } else {
    console.error('No slug provided');
  }
};

const handleLoading = (loading: boolean) => {
  isLoading.value = loading;
};

const closeMediaModal = () => {
  isModalOpen.value = false;
  setTimeout(() => {
    selectedSlug.value = '';
  }, 300);

  document.body.classList.remove('no-scroll');
};

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
</script>

<style lang="scss" scoped>
.masonry-gallery {
  column-count: 4;
  column-gap: 10px;
  padding: 12px 0;

  @media (max-width: 1200px) { column-count: 3; }
  @media (max-width: 900px) { column-count: 2; }
  @media (max-width: 600px) { column-count: 1; }
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

.masonry-small { max-height: 200px; }
.masonry-medium { max-height: 300px; }
.masonry-large { max-height: 400px; }
.masonry-vertical { max-height: 450px; }
.masonry-horizontal { max-height: 250px; }

.masonry-double { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; }
.masonry-triple { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; }
.masonry-quad { display: grid; grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 1fr); gap: 4px; }

/* Стили для модального окна */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.modal-content-wrapper {
  position: relative;
  background: theme-value($theme, background-color);
  border-radius: 16px;
  overflow-y: auto;
  max-height: 90vh;
  width: 80%;
  max-width: 800px;
  transform: scale(0.7);
  transition: transform 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  scrollbar-width: thin;
  scrollbar-color: theme-value($theme, primary-color) theme-value($theme, background-color);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: theme-value($theme, background-color);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: theme-value($theme, primary-color);
    border-radius: 8px;
    border: 2px solid theme-value($theme, background-color);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: theme-value($theme, hover-bg-color);
  }
}

.modal-overlay.active .modal-content-wrapper {
  transform: scale(1);
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1010;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: theme-value($theme, secondary-color);
  border: none;
  cursor: pointer;
  color: theme-value($theme, text-color);
  transition: background 0.3s ease, transform 0.3s ease;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.modal-close:hover {
  background: theme-value($theme, primary-color);
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-close:active {
  transform: scale(0.95);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Иконка закрытия */
.modal-close svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.modal-skeleton {
  padding: 30px;
  width: 100%;
}

.skeleton-header {
  margin-bottom: 24px;
}

.skeleton-title {
  height: 32px;
  width: 70%;
  background: linear-gradient(90deg,
      theme-value($theme, skeleton-color-start) 0%,
      theme-value($theme, skeleton-color-end) 50%,
      theme-value($theme, skeleton-color-start) 100%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 6px;
  margin-bottom: 12px;
}

.skeleton-subtitle {
  height: 20px;
  width: 40%;
  background: linear-gradient(90deg,
      theme-value($theme, skeleton-color-start) 0%,
      theme-value($theme, skeleton-color-end) 50%,
      theme-value($theme, skeleton-color-start) 100%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}

.skeleton-media {
  width: 100%;
  height: 400px;
  background: linear-gradient(90deg,
      theme-value($theme, skeleton-color-start) 0%,
      theme-value($theme, skeleton-color-end) 50%,
      theme-value($theme, skeleton-color-start) 100%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 8px;
  margin-bottom: 24px;
}

.skeleton-content {
  padding: 0 10px;
}

.skeleton-text {
  height: 16px;
  width: 100%;
  background: linear-gradient(90deg,
      theme-value($theme, skeleton-color-start) 0%,
      theme-value($theme, skeleton-color-end) 50%,
      theme-value($theme, skeleton-color-start) 100%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 12px;

  &--short {
    width: 60%;
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
</style>
