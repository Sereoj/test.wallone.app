<script setup lang="ts">
import BaseButton from "~/components/base/buttons/BaseButton.vue";
import SearchBox from "~/components/partials/SearchBox.vue";
import Logo from "~/components/partials/Logo.vue";

const props = defineProps({
  placeholder: {
    type: String,
  }
});
</script>

<template>
  <header class="header">
    <div class="header-container">

      <!-- Левая колонка (логотип) -->
      <div class="header-column header-left">
        <Logo />
      </div>

      <!-- Центральная колонка (поиск) -->
      <div class="header-column header-center">
        <div class="header-search">
          <SearchBox name="search-box" :placeholder="props.placeholder" />
          <BaseButton type="icon" name="mic-button" aria-label="Activate microphone">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" width="20" height="20">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 18.75V21m0-2.25a6 6 0 006-6v-3a6 6 0 10-12 0v3a6 6 0 006 6zm6-6h-12"/>
            </svg>
          </BaseButton>
        </div>
      </div>

      <!-- Правая колонка (кнопки действий) -->
      <div class="header-column header-right">
        <BaseButton type="default" name="btn-publish">Опубликовать</BaseButton>
        <BaseButton type="outline" name="btn-signin">Sign In</BaseButton>
        <BaseButton type="default" name="btn-signup">Sign Up</BaseButton>
      </div>

    </div>
  </header>
</template>

<style lang="scss">

.header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: theme-value($theme, background-color);
  padding: $spacing-md $spacing-lg;
  border-bottom: 1px solid theme-value($theme, border-color);
  z-index: 1000;

  &-container {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .header-column {
      flex: 1;
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
    }

    .header-right {
      flex-basis: 20%;
      justify-content: flex-end;
      gap: 10px;
    }

    .header-search {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
    }
  }
}
</style>
