<script setup>
import {ref} from 'vue';

const props = defineProps( {
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
  }
})


const searchQuery = ref('');
const computedPlaceholder = computed(() => props.placeholder || "Поиск...");
</script>

<template>
  <div class="search-wrapper">
    <input
        type="text"
        :name="props.name"
        class="search-input"
        :placeholder="computedPlaceholder"
        v-model="searchQuery"
    />
    <button class="search-btn">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
           stroke="currentColor" width="20" height="20">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-4.35-4.35M16.65 11.65A5.65 5.65 0 1111 6a5.65 5.65 0 015.65 5.65z"/>
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '/assets/styles/variables' as *;
@use '/assets/styles/utils/theme' as *;

.search {
  &-wrapper {
    display: flex;
    background-color: theme-value($theme, secondary-color);
    border-radius: 10px;
    width: 100%;
    overflow: hidden;
  }

  &-input {
    flex: 1;
    background-color: transparent;
    color: theme-value($theme, text-color);
    border: 2px solid theme-value($theme, secondary-color);
    padding: $border-radius-lg 12px;
    font-size: 16px;
    border-radius: $border-radius-lg 0 0 $border-radius-lg;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: theme-value($theme, focus-border-color);
      box-shadow: 0 0 5px theme-value($theme, focus-border-color);

      &::placeholder {
        color: transparent;
      }
    }

    &::placeholder {
      color: #bbb;
      transition: color 0.3s ease;
    }
  }

  &-btn {
    background-color: theme-value($theme, secondary-color);
    color: theme-value($theme, text-color);
    border: 2px solid transparent;
    padding: $border-radius-lg 12px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 0 $border-radius-lg $border-radius-lg 0;
    transition: all 0.3s ease;

    &:hover, &:focus {
      outline: none;
      border: 2px solid theme-value($theme, focus-border-color);
      transform: scale(1.05);
    }
  }
}


</style>
