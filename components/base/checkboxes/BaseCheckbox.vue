<template>
  <div class="checkbox-wrapper">
    <label :for="id" :class="labelClass">
      <input
          type="checkbox"
          :id="id"
          :checked="modelValue"
          @change="updateCheckbox($event.target.checked)"
          :disabled="disabled"
          :class="inputClass"
          class="checkbox-input"
      />

      <span class="custom-checkbox">
        <span class="checkmark">
          <svg v-if="modelValue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
            <path d="M20 6L9 17l-5-5"></path>
          </svg>
        </span>
      </span>
      <span class="checkbox-label-text">{{ label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  labelClass: {
    type: String,
    default: '',
  },
  inputClass: {
    type: String,
    default: '',
  },
});


const emit = defineEmits(['update:modelValue']);


const updateCheckbox = (value: boolean) => {
  emit('update:modelValue', value);
};
</script>

<style scoped lang="scss">
.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;

  label {
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: theme-value($theme, text-color);
    user-select: none;
    position: relative;
  }


  .checkbox-input {
    display: none;
  }

  .custom-checkbox {
    width: 24px;
    height: 24px;
    border: 2px solid theme-value($theme, border-color);
    border-radius: 5px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease, border-color 0.3s ease;

    background-color: theme-value($theme, disabled-bg-color);

    &:hover {
      background-color: theme-value($theme, hover-bg-color);
    }

    &.checked {
      background-color: theme-value($theme, primary-color);
      border-color: theme-value($theme, primary-color);
    }

    .checkmark {
      display: none;
      margin-bottom: -2px;
      svg {
        width: 14px;
        height: 14px;
        stroke: #fff;
      }
    }

    &.checked .checkmark {
      display: block;
    }
  }

  .checkbox-label-text {
    color: theme-value($theme, text-color);
    margin-left: 0.5rem;
  }

  /* Стили для disabled состояния */
  .checkbox-wrapper.disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  .checkbox-input:checked + .custom-checkbox {
    background-color: theme-value($theme, primary-color);
    border-color: theme-value($theme, primary-color);
  }

  .checkbox-input:checked + .custom-checkbox .checkmark {
    display: block;
  }

  .checkbox-input:disabled + .custom-checkbox {
    background-color: theme-value($theme, disabled-bg-color);
    border-color: theme-value($theme, disabled-bg-color);
  }
}
</style>
