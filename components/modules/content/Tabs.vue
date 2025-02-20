<template>
  <div class="tabs">
    <!-- Кнопки табов -->
    <div class="tab-buttons">
      <button
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab"
          :class="{ 'tab--active': activeTab === tab.value }"
          @click="selectTab(tab.value)"
          :data-tab="tab.value"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="tab-content">
      <slot :activeTab="activeTab"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

interface Tab {
  label: string;
  value: string;
}

const props = defineProps({
  tabs: {
    type: Array as () => Tab[],
    required: true
  },
  defaultTab: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:activeTab']);

const activeTab = ref(props.defaultTab || props.tabs[0]?.value);

const selectTab = (tabValue: string) => {
  activeTab.value = tabValue;
  emit('update:activeTab', tabValue);
};
</script>

<style lang="scss" scoped>

.tabs {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.tab-buttons {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid theme-value($theme, border-color);
}

.tab {
  padding: 8px 16px;
  border: none;
  border-bottom: 2px solid transparent;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: theme-value($theme, text-color);
  transition: border-color 0.3s ease, color 0.3s ease;

  &:hover {
    border-color: theme-value($theme, focus-border-color);
  }

  &--active {
    border-color: theme-value($theme, signup-bg);
    color: theme-value($theme, primary-color);
  }
}

.tab-content {
  padding: 16px;
  border: 1px solid theme-value($theme, border-color);
  border-radius: 8px;
  background-color: theme-value($theme, background-color);
  min-height: 200px;
}
</style>
