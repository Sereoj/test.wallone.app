<script setup lang="ts">
import { ref } from "vue";
import Logo from "~/components/partials/Logo.vue";
import BaseButton from "~/components/base/buttons/BaseButton.vue";
import BaseInput from "~/components/base/inputs/BaseInput.vue";

definePageMeta({
  layout: 'auth',
  middleware: 'auth'
});

const username = ref('test');
const email = ref('test@gmail.com');
const password = ref('test12345');
const confirmPassword = ref('test12345');
const rememberMe = ref(true);
const isLoading = ref(false);

const authStore = useAuthStore();

const handleRegister = async () => {
  if (!username.value || !email.value || !password.value || !confirmPassword.value) {
    alert('Пожалуйста, заполните все поля');
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert('Пароли не совпадают');
    return;
  }

  isLoading.value = true;

  try {
    const success = await authStore.register(
        username.value,
        email.value,
        password.value,
        confirmPassword.value,
        rememberMe.value
    );

    if (!success) {
      alert(authStore.error || 'Не удалось зарегистрироваться');
    } else {
      navigateTo('/');
    }
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    alert('Произошла ошибка при регистрации');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="auth-container">
    <Logo :is-center="true"/>
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

      <BaseButton type="default" :disabled="isLoading">
        {{ isLoading ? 'Регистрация...' : 'Регистрация' }}
      </BaseButton>
    </form>

    <p class="auth-link">Уже есть аккаунт? <a href="/login">Войти</a></p>
  </div>
</template>
