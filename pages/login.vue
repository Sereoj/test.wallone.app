<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "~/components/base/buttons/BaseButton.vue";
import Logo from "~/components/partials/Logo.vue";
import BaseInput from "~/components/base/inputs/BaseInput.vue";
import BaseCheckbox from "~/components/base/checkboxes/BaseCheckbox.vue";
definePageMeta({
  layout: 'auth',
  middleware: 'auth'
});

const email = ref('ser.12egorov@gmail.com');
const password = ref('ser.12egorov');
const rememberMe = ref();
const isLoading = ref(false);

const authStore = useAuthStore();

const handleLogin = async () => {
  if(!email.value || !password.value) {
    alert('Заполните поля, пожалуйста!');
    return;
  }
  isLoading.value = true;

  try {
    const request = await authStore.login(email.value, password.value, rememberMe.value);

    if(!request) {
      alert(authStore.error);
    } else {
      navigateTo('/')
    }
  }catch (e) {
    logger('Ошибка при авторизации', e);
    alert('Произошла ошибка при авторизации');
  }finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="auth-container">
    <Logo :is-center="true"/>
    <form @submit.prevent="handleLogin" class="auth-form">
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

      <div class="options">
        <label><input v-model="rememberMe" type="checkbox"> Запомнить меня</label>
        <BaseCheckbox id="checkbox-forgot-password" label="Запомнить меня?" v-model="rememberMe"/>
        <NuxtLink to="/forgot-password">Забыли пароль?</NuxtLink>
      </div>
      <BaseButton type="default" :disabled="isLoading">{{ isLoading ? 'Авторизация...' : 'Авторизация' }}</BaseButton>
    </form>

    <p class="auth-link">
      Нет аккаунта? <NuxtLink to="/register">Зарегистрироваться</NuxtLink>
    </p>
  </div>
</template>

<style scoped>

</style>
