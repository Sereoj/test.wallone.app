<script setup>
defineProps({
  modelValue: String,
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <input
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      class="input"
      @input="emit('update:modelValue', $event.target.value.trim())"
  />
</template>
