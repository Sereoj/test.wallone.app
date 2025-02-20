<template>
  <section class="hero" :style="{ backgroundImage: `url(${imageUrl})` }">
    <div class="hero-image">
      <div class="hero-text">
        <slot name="text">
          <h2>{{ title }} <span class="highlight">{{ highlight }}</span> {{ subtitle }}</h2>
        </slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Wallone'
  },
  highlight: {
    type: String,
    default: 'искусство'
  },
  subtitle: {
    type: String,
    default: 'правит миром.'
  }
});

const imageUrl = computed(() => {
  return `/images/${props.imageUrl}`;
});
</script>

<style lang="scss" scoped>

.hero {
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: $border-radius-lg;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-text {
  text-align: center;
  color: theme-value($theme, text-color);
  font-size: 2rem;
  z-index: 10;
  padding: 0 $spacing-lg;
}

.hero-text h2 {
  margin: 0;
}

.highlight {
  font-weight: bold;
}
</style>
