<script setup lang="ts">
import { IconUser } from '@tabler/icons-vue';

defineProps<{
  src?: string;
  size?: number;
}>();

const defaultSize = 50;
</script>

<template>
  <div
      class="avatar-container"
      :style="{ width: `${size || defaultSize}px`, height: `${size || defaultSize}px` }"
  >
    <img
        v-if="src"
        :src="src"
        :alt="`Avatar ${size || defaultSize}px`"
        class="avatar"
    />
    <IconUser v-else class="placeholder" />
  </div>
</template>

<style lang="scss" scoped>
.avatar-container {
  position: relative;
  display: inline-block;

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
}
</style>
