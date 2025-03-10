<script setup lang="ts">
import { computed } from 'vue';
import { IconUser, IconLocation, IconCalendar } from '@tabler/icons-vue';

const props = defineProps<{
  user: any;
}>();

const formattedDate = computed(() => {
  const date = new Date(props.user.created_at);
  return date.toLocaleDateString();
});
</script>

<template>
  <div class="profile-details">
    <div class="detail-row">
      <IconUser class="detail-icon" />
      <span>{{ user.username }}</span>
    </div>
    <div class="detail-row">
      <span>{{ user.status.name.ru }}</span>
    </div>
    <div class="detail-row">
      <IconLocation class="detail-icon" />
      <span>{{ user.location || 'Не указано' }}</span>
    </div>
    <div class="detail-row">
      <IconCalendar class="detail-icon" />
      <span>Зарегистрирован: {{ formattedDate }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-details {
  .detail-row {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin: 0.5rem 0;

    .detail-icon {
      color: theme-value($theme, primary-color);
      width: 20px;
      height: 20px;
    }
  }
}
</style>
