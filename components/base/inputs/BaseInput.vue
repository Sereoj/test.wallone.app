<template>
  <div class="input-field">
    <label :for="id">{{ label }}</label>
    <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="updateValue($event.target.value)"
        required
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    required: true,
  },
});

// Определяем эмиттер для события
const emit = defineEmits();

// Обработчик для события input
const updateValue = (value: string) => {
  emit('update:modelValue', value);
};
</script>


<style scoped lang="scss">

.input-field {
  margin-bottom: 1rem;

  label {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    text-align: left;
    color: theme-value($theme, text-color);
    display: block;
  }

  input {
    padding: 0.8rem;
    width: 100%;
    border-radius: 4px;
    border: 2px solid transparent;
    background-color: theme-value($theme, disabled-bg-color);
    color: theme-value($theme, text-color);
    transition: border 0.2s ease-in-out;

    &:focus {
      outline: none;
      border-color: theme-value($theme, focus-border-color);
    }
  }
}
</style>
