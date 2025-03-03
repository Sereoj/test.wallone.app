<script setup lang="ts">
import Header from "~/components/layouts/Header.vue";
import { useInitStore } from "~/stores/init";
import { computed, onMounted } from "vue";

const initStore = useInitStore();

onMounted(() => {
  if (!initStore.isLoaded) {
    initStore.fetchInit();
  }
});

const randomHit = computed(() => {
  const hits = initStore.hits;
  return hits.length ? hits[Math.floor(Math.random() * hits.length)] : "";
});
</script>

<template>
  <div>
    <Header :placeholder="randomHit" />
    <slot/>
  </div>
</template>

<style scoped>

</style>
