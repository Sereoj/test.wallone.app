<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseButton from '~/components/base/buttons/BaseButton.vue';
import DropdownSelector from '~/components/base/selecters/DropdownSelector.vue';
import type { Tag, Option } from '~/types/init';

interface Props {
  tags: Tag[];
  options: Option[];
}

const props = defineProps<Props>();

// Инициализация значения по умолчанию из props или fallback на 'all'
const selectedType = ref(props.options.length ? props.options[0].value : 'all');

const customOptions = computed(() =>
    props.options.map(option => ({
      label: option.label.ru,
      value: option.value,
    }))
);

// Безопасное вычисляемое свойство для текущего выбранного элемента
const selectedOption = computed(() =>
    customOptions.value.find(option => option.value === selectedType.value) || { label: '', value: '' }
);
</script>

<template>
  <div class="explore-filters">
    <div class="explore-filters-tags">
      <BaseButton type="link">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
        Recommended
      </BaseButton>

      <BaseButton v-for="tag in tags" :key="tag.slug" type="link">
        #{{ tag.name.ru }}
      </BaseButton>
    </div>

    <div class="content-type">
      <DropdownSelector v-model="selectedType" :options="customOptions">
        <template #current>
          <span>{{ selectedOption.label }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" style="width:20px;height:20px;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 9l-7 7-7-7"/>
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
