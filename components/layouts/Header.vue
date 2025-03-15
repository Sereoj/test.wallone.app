<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { navigateTo } from "#app";
import { IconMicrophone, IconSearch, IconMenu } from '@tabler/icons-vue';
import BaseButton from "~/components/base/buttons/BaseButton.vue";
import SearchBox from "~/components/partials/SearchBox.vue";
import Logo from "~/components/partials/Logo.vue";
import UserAvatar from "~/components/partials/UserAvatar.vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: "Поиск...",
  },
});

const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);

const user = computed(() => authStore.user);

// Состояния для меню и поиска
const isMenuOpen = ref(false);
const isMobileSearchOpen = ref(false);
const isProfileMenuOpen = ref(false);
const profileMenuRef = ref<HTMLElement | null>(null);

function handleClickOutside(event: MouseEvent) {
  if (
      profileMenuRef.value &&
      !profileMenuRef.value.contains(event.target as Node)
  ) {
    isProfileMenuOpen.value = false;
  }
}


function toggleProfileMenu() {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
}

// Переключение мобильного меню
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

// Переключение мобильного поиска
function toggleMobileSearch() {
  isMobileSearchOpen.value = !isMobileSearchOpen.value;
}

function handlePublish() {
  navigateTo("/publish");
}
function handleLogin() {
  navigateTo("/login");
}
function handleRegister() {
  navigateTo("/register");
}
function handleProfile() {
  navigateTo("/profile");
}
function handleLogout() {
  authStore.logout();
}

// Добавление и удаление глобального слушателя событий
onMounted(() => {
  if (typeof window !== "undefined") {
    window.addEventListener("click", handleClickOutside);
  }
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("click", handleClickOutside);
  }
});
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
          <IconMicrophone/>
        </BaseButton>
      </div>

      <!-- Кнопки действий (планшет и десктоп) -->
      <div v-if="!isLoggedIn" class="header-column header-right desktop-actions">
        <BaseButton type="default" @click="handlePublish">Опубликовать</BaseButton>
        <BaseButton type="outline" @click="handleLogin">Войти</BaseButton>
        <BaseButton type="default" @click="handleRegister">Регистрация</BaseButton>
      </div>

      <div v-else class="header-column header-right desktop-profile">
        <div class="profile-dropdown" ref="profileMenuRef">
          <!-- Кнопка для открытия меню -->
          <BaseButton type="icon" aria-label="Profile" @click="toggleProfileMenu">
            <UserAvatar :src="user?.avatar?.path" :size="40" />
          </BaseButton>
          <span class="username" @click="toggleProfileMenu">{{ user.username}}</span>

          <!-- Выпадающее меню -->
          <div v-if="isProfileMenuOpen" class="dropdown-menu">
            <div class="dropdown-item">
              <strong>{{ user?.username }}</strong>
            </div>
            <div class="dropdown-item">
              <BaseButton type="default" block @click="handleLogout">Выйти</BaseButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Иконки (мобильные устройства) -->
      <div class="header-column header-right mobile-actions">
        <BaseButton type="icon" aria-label="Поиск" @click="toggleMobileSearch"><IconSearch/></BaseButton>
        <BaseButton type="icon" aria-label="Меню" @click="toggleMenu"><IconMenu/></BaseButton>
      </div>
    </div>

    <!-- Мобильный поиск -->
    <div v-show="isMobileSearchOpen" class="mobile-search-container">
      <SearchBox name="search-box-mobile" :placeholder="props.placeholder" />
    </div>

    <!-- Мобильное меню -->
    <nav v-show="isMenuOpen" class="mobile-menu">
      <ul>
        <li v-if="!isLoggedIn">
          <a href="#" @click.prevent="handlePublish">Опубликовать</a>
        </li>
        <li v-if="!isLoggedIn">
          <a href="#" @click.prevent="handleLogin">Войти</a>
        </li>
        <li v-if="!isLoggedIn">
          <a href="#" @click.prevent="handleRegister">Регистрация</a>
        </li>
        <li v-else>
          <a href="#" @click.prevent="handleProfile">Профиль</a>
        </li>
        <li v-if="isLoggedIn">
          <a href="#" @click.prevent="handleLogout">Выйти</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: theme-value($theme, background-color);
  border-bottom: 1px solid theme-value($theme, border-color);
  z-index: 1000;
  padding: $spacing-md $spacing-lg;

  @media (max-width: $mobile-breakpoint) {
    border-bottom: none;
  }

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

  .profile-dropdown {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;

    @media (max-width: $mobile-breakpoint) {
      display: none;
    }

    .username {
      margin-left: 0.5rem;
      font-weight: bold;
      color: theme-value($theme, primary-color);
      cursor: pointer;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: theme-value($theme, background-color);
      border: 1px solid theme-value($theme, border-color);
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10;
      width: 200px;
      overflow: hidden;

      .dropdown-item {
        padding: 0.75rem;
        border-bottom: 1px solid theme-value($theme, border-color);

        &:last-child {
          border-bottom: none;
        }

        strong {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
