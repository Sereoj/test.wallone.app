<template>
  <div class="stat-item">
    <strong>{{ value }}</strong> {{ label }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value: number;
}>();
</script>

<style lang="scss" scoped>
.stat-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: theme-value($theme, text-color);
}
</style>
