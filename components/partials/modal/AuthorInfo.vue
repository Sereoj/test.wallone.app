<script setup lang="ts">
import type {ShortUser} from "~/types/user";
import type {Statistics} from "~/types/statistics";

const props = defineProps({
  user: {
    type: Object as PropType<ShortUser>,
    required: true
  },
  statistics: {
    type: Object as PropType<Statistics>,
    required: true
  }
});
</script>

<template>
  <div class="author">
    <!-- Информация об авторе -->
    <div class="author-info">
      <img :src="user.avatar.path" :alt="user.username + ' Avatar'" class="avatar" />
      <div class="author-details">
        <span class="name">{{ user.username }}</span>
        <span class="slug">{{ user.slug }}</span>
      </div>
    </div>
    <!-- Блок статистики и кнопки -->
    <div class="author-stats">
      <!-- Лайк -->
      <button class="action-btn like-btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon like-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        <span class="likes">{{ statistics.likes }}</span>
      </button>
      <!-- Просмотры -->
      <button class="action-btn view-btn" :disabled="statistics.views === 0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon view-icon">
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" clip-rule="evenodd" />
        </svg>
        <span class="views">{{ statistics.views }}</span>
      </button>
      <!-- Репост -->
      <button class="action-btn share-btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon share-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
        </svg>
        <span class="shares">{{ statistics.reposts }}</span>
      </button>
      <!-- Комментарии -->
      <button class="action-btn comment-btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon comment-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
        <span class="comments">{{ statistics.comments }}</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.author {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid theme-value($theme, border-color);
  margin-bottom: 10px;
  align-items: center;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid theme-value($theme, primary-color);
}

.author-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.author-details {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 16px;
  font-weight: bold;
  color: theme-value($theme, text-color);
}

.slug {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.author-stats {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.action-btn:active {
  transform: scale(0.95);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-btn:disabled {
  cursor: default;
  pointer-events: none;
  opacity: 0.5;
}

.icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

//Todo: как компонент сделать

.like-btn {
  color: #ff6f61;
}

.like-btn:hover {
  color: white;
}

.view-btn {
  color: rgba(255, 255, 255, 0.7);
}

.view-btn:hover {
  color: white;
}

.share-btn {
  color: #10B981;
}

.share-btn:hover {
  color: white;
}

.comment-btn {
  color: #6c757d;
}

.comment-btn:hover {
  color: white;
}
</style>
