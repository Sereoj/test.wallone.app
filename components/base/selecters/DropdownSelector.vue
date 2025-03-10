<template>
  <div :class="['dropdown-selector', className]" :style="style">
    <div
        class="dropdown"
        :class="{ active: isOpen }"
        @click="toggleDropdown"
        @focusout="closeDropdown"
        tabindex="0"
    >
      <div class="dropdown-current">
        <slot name="current" :selectedOption="selectedOption">
          <span id="current-selection">{{ selectedOption.label }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style="width:20px;height:20px;" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </slot>
      </div>
      <div class="dropdown-options" v-if="isOpen">
        <div
            v-for="option in options"
            :key="option.value"
            class="dropdown-option"
            :class="{ active: option.value === selectedOption.value }"
            @click.stop="selectOption(option)"
        >
          <slot name="option" :option="option">
            {{ option.label }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Option {
  label: string;
  value: string;
}

const props = defineProps({
  options: {
    type: Array as () => Option[],
    default: () => [
      { label: 'Все', value: 'all' },
      { label: 'Видео', value: 'videos' },
      { label: 'Картинки', value: 'images' },
      { label: 'Гифки', value: 'gifs' }
    ]
  },
  modelValue: {
    type: String,
    default: 'all'
  },
  className: {
    type: String,
    default: ''
  },
  style: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);

const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue) || props.options[0];
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value);
  closeDropdown();
};
</script>

<style lang="scss" scoped>
.dropdown-selector {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  width: 250px;
}

.dropdown {
  position: relative;
  background-color: theme-value($theme, secondary-color);
  color: theme-value($theme, text-color);
  border-radius: $border-radius-lg;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &.active {
    .dropdown-options {
      display: block;
    }
  }

  &:focus-within {
    outline: none;
    border-color: theme-value($theme, secondary-color);
  }
}

.dropdown-current {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  justify-content: space-between;
  font-size: 14px;
  border-radius: $border-radius-lg;
}

.dropdown-options {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: theme-value($theme, secondary-color);
  border-radius: $border-radius-lg;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 20;
  margin: 5px 0 0 0;
  padding: 8px 0;
  overflow-y: auto;
  max-height: 200px;
  width: 100%;
}

.dropdown-option {
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #333;
  }

  &.active {
    background-color: theme-value($theme, primary-color);
  }
}
</style>
