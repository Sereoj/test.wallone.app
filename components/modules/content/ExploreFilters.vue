<script setup lang="ts">
import BaseButton from "~/components/base/buttons/BaseButton.vue";
import DropdownSelector from "~/components/base/selecters/DropdownSelector.vue";

import { ref } from 'vue';

const selectedType = ref('all');

const customOptions = [
  { label: 'Все', value: 'all' },
  { label: 'Видео', value: 'videos' },
  { label: 'Картинки', value: 'images' },
  { label: 'Гифки', value: 'gifs' }
];
</script>

<template>
  <div class="explore-filters">
    <div class="explore-filters-tags">
      <BaseButton type="link">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
          <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        Recommended
      </BaseButton>
      <BaseButton type="link">
        #tags
      </BaseButton>
      <BaseButton type="link">
        #tags
      </BaseButton>
    </div>
    <div class="content-type">
      <DropdownSelector
          v-model="selectedType"
          :options="customOptions"
      >
        <template #current="{ selectedOption }">
          <span>{{ selectedOption.label }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 20px; height: 20px;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </template>
        <template #option="{ option }">
          <span>{{ option.label }}</span>
        </template>
      </DropdownSelector>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .explore-filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;

    &-tags {
      display: flex;
      flex-wrap: wrap;
      gap: $spacing-sm;
    }
  }
</style>
