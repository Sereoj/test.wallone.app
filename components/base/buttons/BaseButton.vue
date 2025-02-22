<template>
  <component
      :is="tag"
      :class="[
      'base-button',
      {
        'base-button--default': type === 'default',
        'base-button--icon': type === 'icon',
        'base-button--link': type === 'link',
        'base-button--outline': type === 'outline'
      }
    ]"
      v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value: string) => ['default', 'icon', 'link', 'outline'].includes(value)
  },
  tag: {
    type: String,
    default: 'button'
  }
});

const tag = computed(() => {
  if (props.type === 'link') return 'a';
  return props.tag;
});
</script>

<style lang="scss">

.base-button {
  padding: $spacing-sm $spacing-md;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;

  &--default {
    background-color: theme-value($theme, primary-color);
    color: theme-value($theme, text-color);
    border-radius: $border-radius-sm;

    &:hover, &:focus {
      outline: none;
      background-color: theme-value($theme, hover-bg-color);
    }
  }

  &--icon {
    background-color: theme-value($theme, secondary-color);
    color: theme-value($theme, text-color);
    border: 2px solid transparent;
    width: 40px;
    height: 40px;
    border-radius: $border-radius-full;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
    padding: 5px;

    svg {
      width: 100%;
      height: 100%;
    }

    &:hover, &:focus {
      outline: none;
      border: 2px solid theme-value($theme, focus-border-color);
      transform: scale(1.05);
    }
  }

  &--link {
    background-color: theme-value($theme, secondary-color);
    color: theme-value($theme, text-color);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    transition: background-color 0.2s ease, transform 0.2s ease;

    svg {
      width: 16px;
      height: 16px;
    }

    &:hover {
      background-color: theme-value($theme, hover-bg-color2);
      transform: scale(1.05);
    }
  }

  &--outline {
    background-color: transparent;
    color: theme-value($theme, text-color);
    border: 1px solid theme-value($theme, border-color);
    border-radius: $border-radius-sm;

    &:hover {
      background-color: theme-value($theme, border-color);
      color: theme-value($theme, text-color);
    }
  }
}
</style>
