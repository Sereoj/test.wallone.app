<script setup lang="ts">
import ExploreFilters from "~/components/modules/content/ExploreFilters.vue";
import HeroSection from "~/components/partials/HeroSection.vue";
import Gallery from '~/components/modules/content/Gallery.vue';
import {usePostsStore} from "~/stores/posts";

const postsStore = usePostsStore();
const { posts, loading, error, hasMore } = storeToRefs(postsStore);
const observerTarget = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;

onMounted(async () => {
  try {
    await postsStore.fetchPosts();

    if (observerTarget.value) {
      observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                console.log('Достигнут конец страницы');
                if (!loading.value && hasMore.value) {
                  postsStore.fetchPosts();
                }
              }
            });
          },
          { threshold: 0.5 }
      );

      observer.observe(observerTarget.value);
    } else {
      console.warn('Элемент для наблюдения не найден');
    }
  } catch (error) {
    console.error('Ошибка при загрузке постов:', error);
  }
});

watch(
    () => postsStore.posts,
    (newPosts) => {
      console.log('Посты обновлены:', newPosts);
    }
);

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>
<template>
<main class="main">
    <ExploreFilters/>
    <HeroSection image-url="main.jpg"
                 title="Wallone - место, где"
                 highlight="искусство"
                 subtitle="правит миром."/>
    <Gallery :posts="posts" />
    <div v-if="loading && hasMore" class="loading-indicator">Загрузка...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div ref="observerTarget" class="observer-target"></div>
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

.main {
  min-height: 100vh;
  margin-top: 5rem;
  padding: $spacing-lg;
}

.description {
  font-size: $font-size-small;
  color: theme-value($theme, text-color);
  margin-bottom: 10px;
}
</style>
