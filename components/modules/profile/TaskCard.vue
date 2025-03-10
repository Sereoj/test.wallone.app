<script setup lang="ts">
import { IconTarget, IconStar } from '@tabler/icons-vue';
import type { Task } from '~/types/task';

const props = defineProps<{
  tasks: Task[];
}>();

const getProgressPercent = (currentValue: number, target: number) => {
  if (target <= 0) return 0;
  return Math.min((currentValue / target) * 100, 100);
};
</script>

<template>
  <div class="task-list">
    <!-- Перебор массива задач -->
    <div v-for="task in tasks" :key="task.id" class="task-card">
      <div class="task-header">
        <IconTarget class="task-icon" />
        <span class="task-title">{{ task.name.ru }}</span>
      </div>

      <div v-if="task.description.ru" class="task-description">
        {{ task.description.ru }}
      </div>

      <div class="progress-bar">
        <div
            class="progress-fill"
            :style="{ width: getProgressPercent(task.currentValue, task.target) + '%' }"
        ></div>
      </div>

      <div class="task-footer">
        <span>{{ task.currentValue }}/{{ task.target }}</span>
        <div class="rewards">
          <span v-if="task.experience_reward" class="reward">
            <IconStar class="reward-icon" />
            {{ task.experience_reward }} XP
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.task-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.task-card {
  padding: 1.5rem;
  border: 1px solid theme-value($theme, border-color);
  border-radius: 8px;
  background: theme-value($theme, secondary-color);
  color: theme-value($theme, text-color);

  .task-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 0.5rem;

    .task-icon {
      color: theme-value($theme, primary-color);
    }

    .task-title {
      font-size: 1.1rem;
      font-weight: 600;
    }
  }

  .task-description {
    margin: 0.5rem 0;
    color: theme-value($theme, text-color-secondary);
    font-size: 0.9rem;
  }

  .progress-bar {
    height: 6px;
    background: theme-value($theme, border-color);
    border-radius: 4px;
    overflow: hidden;

    .progress-fill {
      height: 100%;
      background: theme-value($theme, primary-color);
      transition: width 0.3s ease;
    }
  }

  .task-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.8rem;
    color: theme-value($theme, text-color-secondary);
    opacity: 0.7;

    .rewards {
      display: flex;
      gap: 1rem;

      .reward {
        display: flex;
        align-items: center;
        gap: 0.3rem;

        .reward-icon {
          color: theme-value($theme, success-color);
        }
      }
    }
  }
}
</style>
