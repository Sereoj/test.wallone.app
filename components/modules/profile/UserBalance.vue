<script setup lang="ts">
import { IconCoins } from '@tabler/icons-vue';

defineProps<{
  currency: string
  amount: string
}>();
</script>

<template>
  <div class="balance-card">
    <div class="balance-header">
      <IconCoins class="currency-icon" />
      <span class="currency">{{ currency }}</span>
    </div>
    <div class="balance-amount">{{ amount }}</div>
  </div>
</template>

<style lang="scss" scoped>
.balance-card {
  .currency-icon {
    width: 24px;
    height: 24px;
    color: theme-value($theme, primary-color);
  }

  .balance-amount {
    font-size: 1.5rem;
    font-weight: 600;
    color: theme-value($theme, text-color);
    margin-top: 0.5rem;
  }
}
</style>
