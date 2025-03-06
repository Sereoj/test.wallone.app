<script setup lang="ts">
import BaseButton from "~/components/base/buttons/BaseButton.vue";
import SearchBox from "~/components/partials/SearchBox.vue";
import Logo from "~/components/partials/Logo.vue";

const props = defineProps({
  placeholder: {
    type: String,
  }
});

const isMenuOpen = ref(false);
const isMobileSearchOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function toggleMobileSearch() {
  isMobileSearchOpen.value = !isMobileSearchOpen.value;
}

function handlePublish() {
  navigateTo('login');
  console.log('handlePublish');
}

function handleLogin() {
  navigateTo('login');
  console.log('handleLogin');
}

function handleRegister() {
  navigateTo('register');
  console.log('handleRegister');
}

</script>

<template>
  <header class="header">
    <div class="header-container">
      <!-- Логотип -->
      <div class="header-column header-left">
        <Logo />
      </div>

      <!-- Поиск (планшет и десктоп) -->
      <div class="header-column header-center desktop-search">
        <SearchBox name="search-box-tablet" :placeholder="props.placeholder" />
        <BaseButton type="icon" name="mic-button" aria-label="Activate microphone">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 18.75V21m0-2.25a6 6 0 006-6v-3a6 6 0 10-12 0v3a6 6 0 006 6zm6-6h-12"/>
          </svg>
        </BaseButton>
      </div>

      <!-- Кнопки действий (планшет и десктоп) -->
      <div class="header-column header-right desktop-actions">
        <BaseButton type="default" @click="handlePublish">Опубликовать</BaseButton>
        <BaseButton type="outline" @click="handleLogin">Войти</BaseButton>
        <BaseButton type="default" @click="handleRegister">Регистрация</BaseButton>
      </div>

      <!-- Иконки (мобильные устройства) -->
      <div class="header-column header-right mobile-actions">
        <BaseButton type="icon" aria-label="Поиск" @click="toggleMobileSearch">
          🔍
        </BaseButton>
        <BaseButton type="icon" aria-label="Меню" @click="toggleMenu">
          ☰
        </BaseButton>
      </div>
    </div>

    <!-- Мобильный поиск -->
    <div v-if="isMobileSearchOpen" class="mobile-search-container">
      <SearchBox name="search-box-mobile" :placeholder="props.placeholder" />
    </div>

    <!-- Мобильное меню -->
    <nav v-if="isMenuOpen" class="mobile-menu">
      <ul>
        <li><a href="#" @click.prevent="handlePublish">Опубликовать</a></li>
        <li><a href="#" @click.prevent="handleLogin">Войти</a></li>
        <li><a href="#" @click.prevent="handleRegister">Регистрация</a></li>
      </ul>
    </nav>
  </header>
</template>


<style lang="scss">
$header-padding: $spacing-md $spacing-lg;

.header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: theme-value($theme, background-color);
  border-bottom: 1px solid theme-value($theme, border-color);

  @media (max-width: $mobile-breakpoint) {
    border-bottom: none;
  }

  z-index: 1000;
  padding: $spacing-md $spacing-lg;

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    .header-column {
      display: flex;
      align-items: center;
    }

    .header-left {
      flex-basis: 20%;
      justify-content: flex-start;
    }

    .header-center {
      flex-basis: 60%;
      justify-content: center;
      gap: 10px;
    }

    .header-right {
      flex-basis: 20%;
      justify-content: flex-end;
      gap: 10px;
    }

    .desktop-search,
    .desktop-actions {
      display: flex;

      @media (max-width: $mobile-breakpoint) {
        display: none;
      }
    }

    .mobile-actions {
      display: none;

      @media (max-width: $mobile-breakpoint) {
        display: flex;
        gap: $spacing-sm;
      }
    }
  }

  .mobile-search-container {
    padding: $spacing-sm;
    margin-top: 10px;
    border-bottom: 1px solid theme-value($theme, border-color);

    @media (min-width: $mobile-breakpoint) {
      display: none;
    }
  }

  .mobile-menu {
    background-color: theme-value($theme, secondary-color);
    padding: $spacing-md;
    margin: 10px;
    border-radius: 10px;

    ul {
      list-style-type: none;
      padding: 0;

      li {
        margin-bottom: $spacing-sm;

        a {
          color: theme-value($theme, text-color);
          text-decoration: none;

          &:hover {
            color: theme-value($theme, primary-color);
          }
        }
      }
    }

    @media (min-width: $mobile-breakpoint) {
      display: none;
    }
  }
}
</style>
