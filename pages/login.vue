<script setup lang="ts">
import { ref } from 'vue';
definePageMeta({
  layout: 'auth'
});

const email = ref('');
const password = ref('');

const handleLogin = () => {
  console.log('Логин:', email.value, 'Пароль:', password.value);
};
</script>

<template>
  <div class="auth-container">
    <form @submit.prevent="handleLogin" class="auth-form">
      <h2>Авторизация</h2>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit" class="login-button">Войти</button>
    </form>
  </div>
</template>


<style lang="scss" scoped>

.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: map-get($theme, background-color);
  color: map-get($theme, text-color);
}

.auth-form {
  background: map-get($theme, secondary-color);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  padding: 0.5rem;
  border: 1px solid map-get($theme, border-color);
  border-radius: 4px;
  background-color: map-get($theme, background-color);
  color: map-get($theme, text-color);
}

.login-button {
  background-color: map-get($theme, primary-color);
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
  &:hover {
    background-color: map-get($theme, hover-bg-color);
  }
}
</style>
