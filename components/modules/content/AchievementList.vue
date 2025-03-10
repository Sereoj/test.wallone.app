<template>
  <div class="achievement-list">
    <div v-for="achievement in achievements" :key="achievement.id" class="achievement-item">
      <div class="achievement-icon">
        <IconTrophy />
      </div>
      <div class="achievement-details">
        <h4>{{ achievement.name.ru }}</h4>
        <p>{{ achievement.description.ru }}</p>
        <span class="reward">+{{ achievement.points }} XP</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconTrophy } from '@tabler/icons-vue';
import type {Achievement} from "~/types/achievement";

const props = defineProps<{
  achievements: Achievement[];
}>();
</script>

<style lang="scss" scoped>
.achievement-list {
  .achievement-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: theme-value($theme, secondary-color);
    border-radius: 8px;
    margin-bottom: 1rem;

    .achievement-icon {
      color: theme-value($theme, success-color);
      width: 40px;
      height: 40px;
    }

    .achievement-details {
      h4 {
        margin: 0;
        font-size: 1rem;
        color: theme-value($theme, text-color);
      }

      p {
        margin: 0.2rem 0;
        font-size: 0.875rem;
        color: theme-value($theme, text-color);
        opacity: 0.7;
      }

      .reward {
        color: theme-value($theme, success-color);
        font-weight: bold;
      }
    }
  }
}
</style>
