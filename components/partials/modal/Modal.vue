<script setup lang="ts">
import { IconX } from '@tabler/icons-vue';
import BaseButton from "~/components/base/buttons/BaseButton.vue";

const props = defineProps<{
  modelValue: boolean;
  title: string;
}>();

const emit = defineEmits(['update:modelValue']);

const closeModal = () => {
  emit('update:modelValue', false);
};
</script>

<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <header class="modal-header">
        <h3>{{ title }}</h3>
        <BaseButton type="default" class="close-btn" @click="closeModal">
          <IconX />
        </BaseButton>
      </header>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: theme-value($theme, secondary-color);
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid theme-value($theme, border-color);

  h3 {
    margin: 0;
    color: theme-value($theme, text-color);
    font-size: 1.25rem;
  }

  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: theme-value($theme, text-color);
    transition: color 0.2s;

    &:hover {
      color: theme-value($theme, primary-color);
    }
  }
}

.modal-body {
  padding: 1.5rem;
  color: theme-value($theme, text-color);
}
</style>
