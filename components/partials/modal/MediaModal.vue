<template>
  <div class="modal-media">
    <!-- Главное изображение -->
    <div class="modal-media-main">
      <img v-if="currentMedia.type === 'image'" :src="currentMedia.src" :alt="currentMedia.alt" class="modal-image-full" />
      <video v-else-if="currentMedia.type === 'video'" muted loop class="modal-image-full">
        <source :src="currentMedia.src" type="video/mp4" />
      </video>
      <img v-else-if="currentMedia.type === 'gif'" :src="currentMedia.src" :alt="currentMedia.alt" class="modal-image-full" />
    </div>
    <!-- Миниатюры -->
    <div class="modal-media-thumbnails">
      <div
          v-for="(thumbnail, index) in thumbnails"
          :key="index"
          class="modal-thumbnail-item"
          :class="{ 'modal-thumbnail-item--active': index === activeIndex }"
          @click="selectThumbnail(index)"
      >
        <img v-if="thumbnail.type === 'image'" :src="thumbnail.src" :alt="thumbnail.alt" class="modal-thumbnail" />
        <video v-else-if="thumbnail.type === 'video'" muted loop class="modal-thumbnail">
          <source :src="thumbnail.src" type="video/mp4" />
        </video>
        <img v-else-if="thumbnail.type === 'gif'" :src="thumbnail.src" :alt="thumbnail.alt" class="modal-thumbnail" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface MediaItem {
  type: 'image' | 'video' | 'gif';
  src: string;
  alt: string;
}

const props = defineProps({
  mainMedia: {
    type: Object as PropType<MediaItem>,
    required: true
  },
  thumbnails: {
    type: Array as PropType<MediaItem[]>,
    required: true
  }
});

const activeIndex = ref(0);

const currentMedia = computed(() => {
  return props.thumbnails[activeIndex.value] || props.mainMedia;
});

const selectThumbnail = (index: number) => {
  activeIndex.value = index;
};
</script>

<style lang="scss" scoped>

.modal-media {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.modal-media-main {
  width: 100%;
  max-width: 800px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 16px;
  margin-bottom: 16px;
}

.modal-image-full {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

.modal-media-thumbnails {
  display: flex;
  gap: 8px;
}

.modal-thumbnail-item {
  flex: 1;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: theme-value($theme, focus-border-color);
  }

  &--active {
    border-color: theme-value($theme, primary-color);
  }
}

.modal-thumbnail {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
</style>
