<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "~/components/base/buttons/BaseButton.vue";
import Logo from "~/components/partials/Logo.vue";
import BaseInput from "~/components/base/inputs/BaseInput.vue";
import BaseCheckbox from "~/components/base/checkboxes/BaseCheckbox.vue";
definePageMeta({
  layout: 'auth'
});

const email = ref('');
const password = ref('');
const rememberMe = ref(false);

const handleLogin = () => {
  console.log('Логин:', email.value, 'Пароль:', password.value, 'Запомнить меня:', rememberMe.value);
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

      <BaseButton type="default">Войти</BaseButton>
    </form>

    <p class="auth-link">
      Нет аккаунта? <NuxtLink to="/register">Зарегистрироваться</NuxtLink>
    </p>
  </div>
</template>

<style scoped>

</style>
