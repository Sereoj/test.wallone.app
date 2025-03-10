<template>
  <div class="media-gallery">
    <DropdownSelector
        class="media-filter"
        :options="[
        { label: 'Все', value: 'all' },
        { label: 'Фото', value: 'photos' },
        { label: 'Видео', value: 'videos' },
      ]"
        v-model="selectedFilter"
    />

    <div class="gallery-grid">
      <div
          v-for="item in filteredMedia"
          class="media-item"
          :style="{ backgroundImage: `url(${item.src})` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DropdownSelector from "~/components/base/selecters/DropdownSelector.vue";
import type {MediaItem} from "~/types/media";

const props = defineProps<{
  media: MediaItem[];
}>();

const selectedFilter = ref('all');

const filteredMedia = computed(() => {
  if (selectedFilter.value === 'all') return props.media;
  return props.media.filter((item) => item.type === selectedFilter.value);
});
</script>

<style lang="scss" scoped>
.media-gallery {
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;

    .media-item {
      aspect-ratio: 1/1;
      background-size: cover;
      background-position: center;
      border-radius: 8px;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>
