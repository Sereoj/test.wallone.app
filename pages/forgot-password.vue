<script setup lang="ts">
import { ref } from "vue";
import Logo from "~/components/partials/Logo.vue";
import BaseButton from "~/components/base/buttons/BaseButton.vue";
import BaseInput from "~/components/base/inputs/BaseInput.vue";

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
});

const email = ref('');

const handleReset = () => {
  logger('Email для сброса пароля:', email.value);
};
</script>

<template>
  <div class="auth-container">
    <Logo :is-center="true"/>
    <p class="description">
      Введите ваш email и мы отправим ссылку для сброса пароля.
    </p>

    <form @submit.prevent="handleReset" class="auth-form">
      <BaseInput
          v-model="email"
          label="Email"
          type="email"
          placeholder="Введите email"
          id="email-input"
      />
      <BaseButton type="default">Отправить ссылку сброса пароля</BaseButton>
    </form>

    <p class="auth-link">
      <NuxtLink to="/login">Вернуться к авторизации</NuxtLink>
    </p>
  </div>
</template>

<style scoped>
</style>
