<script setup lang="ts">
import ExploreFilters from "~/components/modules/content/ExploreFilters.vue";
import HeroSection from "~/components/partials/HeroSection.vue";
import Gallery from "~/components/modules/content/Gallery.vue";
import { useInitStore } from "~/stores/init";
import { usePostsStore } from "~/stores/posts";

import { storeToRefs } from "pinia";

const initStore = useInitStore();
const postsStore = usePostsStore();
const { posts, loading, error, hasMore } = storeToRefs(postsStore);
const observerTarget = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;

// Загружаем посты
onMounted(async () => {
  await postsStore.fetchPosts();

  if (observerTarget.value) {
    observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !loading.value && hasMore.value) {
              postsStore.fetchPosts();
            }
          });
        },
        { threshold: 0.5 }
    );
    observer.observe(observerTarget.value);
  }
});

// Отслеживаем обновление постов
watch(() => posts.value, (newPosts) => {
  console.log("Посты обновлены:", newPosts);
});

// Отключаем Intersection Observer при размонтировании
onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <main class="main">
    <template v-if="initStore.isLoaded">
      <ExploreFilters :tags="initStore.tags" :options="initStore.options" />
      <HeroSection
          image-url="main.jpg"
          title="Wallone - место, где"
          highlight="искусство"
          subtitle="правит миром."
      />
      <Gallery :posts="posts" />
      <div v-if="loading && hasMore" class="loading-indicator">Загрузка...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div ref="observerTarget" class="observer-target"></div>
    </template>
    <p v-else>Загрузка...</p>
  </main>
</template>


<style lang="scss" scoped>
.observer-target {
  height: 50px;
  visibility: hidden;
}

.loading-indicator {
  text-align: center;
  margin: 20px 0;
  font-size: 16px;
  color: #666;
}

.error {
  text-align: center;
  color: red;
  font-weight: bold;
}


.modal-tags {
  display: flex;
  gap: 8px;
}

.description {
  font-size: $font-size-small;
  color: theme-value($theme, text-color);
  margin-bottom: 10px;
}
</style>
