<script setup lang="ts">
import { ref } from "vue";
import Logo from "~/components/partials/Logo.vue";
import BaseButton from "~/components/base/buttons/BaseButton.vue";
import BaseInput from "~/components/base/inputs/BaseInput.vue";

definePageMeta({
  layout: 'auth'
});

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleRegister = () => {
  console.log('Регистрация:', {
    username: username.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  });
};
</script>

<template>
  <div class="auth-container">
    <Logo/>
    <form @submit.prevent="handleRegister" class="auth-form">

      <BaseInput
          v-model="username"
          label="Имя пользователя"
          type="text"
          placeholder="Имя пользователя"
          id="username-input"
          required
      />

      <BaseInput
          v-model="email"
          label="Email"
          type="email"
          placeholder="Введите email"
          id="email-input"
          required
      />

      <BaseInput
          v-model="password"
          label="Пароль"
          type="password"
          placeholder="Введите пароль"
          id="password-input"
          required
      />

      <BaseInput
          v-model="confirmPassword"
          label="Пароль"
          type="password"
          placeholder="Повторите пароль"
          id="confirm-password-input"
          required
      />

      <BaseButton type="default">Регистрация</BaseButton>
    </form>

    <p class="auth-link">Уже есть аккаунт? <a href="/login">Войти</a></p>
  </div>
</template>

<style scoped>
</style>
