<script setup lang="ts">
import Header from "~/components/layouts/Header.vue";
import { useInitStore } from "~/composables/init";
import { computed, onMounted } from "vue";

const initStore = useInitStore();
computed(() => initStore.fetchInit());

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
