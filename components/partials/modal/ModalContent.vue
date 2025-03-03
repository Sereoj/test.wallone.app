<template>
  <div class="modal-media">
    <!-- Отладочная информация -->
    <div v-if="debug" class="debug-info">
      <p>Slug: {{ slug }}</p>
      <p>Loading: {{ postStore.loading }}</p>
      <p>Error: {{ postStore.error }}</p>
      <p>Has Current Media: {{ !!postStore.currentMedia?.src }}</p>
      <p>Thumbnails Count: {{ thumbnails.length }}</p>
    </div>

    <div v-if="error" class="modal-error">{{ error }}</div>
    <div v-else-if="!postStore.currentMedia?.src" class="modal-error">Медиа не найдено</div>
    <div v-else class="modal-content">
      <div class="modal-media-main">
        <img
            v-if="postStore.currentMedia.type === 'image'"
            :src="postStore.currentMedia.src"
            alt="Media"
            class="modal-image-full"
        />
        <video
            v-else-if="postStore.currentMedia.type === 'video'"
            muted
            controls
            loop
            class="modal-image-full"
        >
          <source :src="postStore.currentMedia.src" type="video/mp4" />
        </video>
        <img
            v-else-if="postStore.currentMedia.type === 'gif'"
            :src="postStore.currentMedia.src"
            alt="GIF"
            class="modal-image-full"
        />
        <div v-else class="modal-no-media">
          Неизвестный тип медиа
        </div>
      </div>
      <div v-if="thumbnails.length > 1" class="modal-media-thumbnails">
        <div
            v-for="(thumbnail, index) in thumbnails"
            :key="index"
            class="modal-thumbnail-item"
            :class="{ 'modal-thumbnail-item--active': index === activeIndex }"
            @click="selectThumbnail(index)"
        >
          <img
              v-if="thumbnail.type === 'image'"
              :src="thumbnail.src"
              alt="Thumbnail"
              class="modal-thumbnail"
          />
          <video
              v-else-if="thumbnail.type === 'video'"
              muted
              loop
              class="modal-thumbnail"
          >
            <source :src="thumbnail.src" type="video/mp4" />
          </video>
          <img
              v-else-if="thumbnail.type === 'gif'"
              :src="thumbnail.src"
              alt="GIF Thumbnail"
              class="modal-thumbnail"
          />
        </div>
      </div>

      <AuthorInfo :statistics="postStore.postData.statistics" :user="postStore.postData.user" />

      <Tabs :tabs="tabOptions" :defaultTab="activeSection">
        <template #default="{ activeTab }">
          <!-- Основной контент -->
          <div v-if="activeTab === 'core'">
            <h3>Основная информация</h3>
            <p>{{ postStore.postData.content }}</p>
            <Comments :postId="postStore.postData.id"/>
          </div>

          <!-- Дополнительный контент -->
          <div v-else-if="activeTab === 'extra'">
            <h3>Дополнительные данные</h3>
            <p>Здесь представлены дополнительные материалы и расширенная информация</p>
          </div>
        </template>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePostStore } from '~/stores/post';
import type { MediaItem } from "~/types/media";
import AuthorInfo from "~/components/partials/modal/AuthorInfo.vue";
import Tabs from "~/components/modules/content/Tabs.vue";
import Comments from "~/components/partials/comments/Comments.vue";
import {useCommentsStore} from "~/stores/comments";

const props = defineProps<{
  slug: string;
}>();

const tabOptions = [
  { label: 'Основное', value: 'core' },
  { label: 'Дополнительно', value: 'extra' }
];

const postStore = usePostStore();
const commentsStore = useCommentsStore();
const activeIndex = ref<number>(0);
const debug = ref(true);
const error = ref<string | null>(null);
const activeSection = ref('core');

// Асинхронная инициализация компонента
const setupComponent = async () => {
  try {
    console.log('Async setup for slug:', props.slug);

    // Загружаем данные
    await postStore.fetchPost(props.slug);

    console.log('Post data loaded:', postStore.postData);
    console.log('Current media:', postStore.currentMedia);
  } catch (err) {
    console.error('Error in async setup:', err);
    error.value = err instanceof Error ? err.message : 'Произошла ошибка при загрузке';
  }
};

// Выполняем асинхронную инициализацию
await setupComponent();

const thumbnails = computed<MediaItem[]>(() => {
  const media = postStore.getFlatMedia(postStore.postData.media);
  console.log('Computed thumbnails:', media);
  return media;
});

const selectThumbnail = (index: number) => {
  activeIndex.value = index;
  postStore.setCurrentMedia(index);
  console.log('Selected thumbnail at index:', index);
};
</script>


<style lang="scss" scoped>
.debug-info {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
}

.modal-no-media {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f0f0f0;
  color: #666;
  font-size: 1.2rem;
}

.modal-media {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.modal-loading,
.modal-error {
  color: #333;
  font-size: 1.2rem;
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
    border-color: #ccc;
  }

  &--active {
    border-color: #007bff; /* Цвет активного элемента */
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
