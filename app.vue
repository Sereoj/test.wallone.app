<script setup lang="ts">
const authStore = useAuthStore();

onMounted(() => {
  authStore.initializeAuthState();
  console.log('выполняю раз');
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
