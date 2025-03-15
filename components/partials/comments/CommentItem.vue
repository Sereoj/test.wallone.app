<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Comment } from "~/types/comment";
import { useCommentsStore } from "~/composables/comments";

defineProps<{
  comment: Comment;
  postId: number;
  isReply?: boolean;
}>();

const emit = defineEmits<{
  (e: 'reply', commentId: number): void;
}>();

const commentsStore = useCommentsStore();
const showReportDialog = ref(false);
const reportReason = ref('');
const isSubmittingReport = ref(false);

// Проверяем, лайкнул ли текущий пользователь этот комментарий
const hasUserLiked = computed(() => {
  // Заглушка: проверяем, есть ли лайк от пользователя с ID 1
  return comment.likes.some(like => like.user_id === 1);
});

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
};

// Обработка лайка
const handleLike = async () => {
  try {
    await commentsStore.reactToComment(postId, comment.id, 'like');
  } catch (err) {
    console.error('Error liking comment:', err);
  }
};

// Отправка жалобы
const submitReport = async () => {
  if (!reportReason.value.trim()) return;

  isSubmittingReport.value = true;
  try {
    await commentsStore.reportComment(postId, comment.id, reportReason.value);
    showReportDialog.value = false;
    reportReason.value = '';
    // Можно добавить уведомление об успешной отправке жалобы
  } catch (err) {
    console.error('Error reporting comment:', err);
  } finally {
    isSubmittingReport.value = false;
  }
};

// Получение URL аватара
const getAvatarUrl = (path: string) => {
  // Предполагаем, что у нас есть базовый URL для медиа
  const baseUrl = '/media/';
  return path ? baseUrl + path : '/images/1.jpg';
};
</script>

<template>
  <div class="comment-item" :class="{ 'comment-item--reply': isReply }">
    <!-- Аватарка пользователя -->
    <div class="avatar">
      <img :src="getAvatarUrl(comment.user.avatar?.path)" alt="User Avatar" />
    </div>

    <!-- Содержимое комментария -->
    <div class="content">
      <div class="header">
        <span class="username">@{{ comment.user.username }}</span>
        <span v-if="comment.user.verification" class="verification-badge">✓</span>
        <span class="created-at">{{ formatDate(comment.created_at) }}</span>
      </div>

      <p class="text">{{ comment.content }}</p>

      <div class="actions">
        <button
            class="action-btn"
            :class="{ 'action-btn--active': hasUserLiked }"
            @click="handleLike"
        >
          <span class="action-icon">👍</span>
          <span class="action-count">{{ comment.likes.length }}</span>
        </button>

        <button class="action-btn" @click="$emit('reply', comment.id)">
          <span class="action-icon">↩️</span>
          <span>Ответить</span>
        </button>

        <button class="action-btn" @click="showReportDialog = true">
          <span class="action-icon">🚩</span>
          <span>Пожаловаться</span>
        </button>
      </div>

      <!-- Вложенные комментарии -->
      <div v-if="comment.replies && comment.replies.length > 0" class="replies">
        <CommentItem
            v-for="reply in comment.replies"
            :key="reply.id"
            :comment="reply"
            :postId="postId"
            :isReply="true"
            @reply="$emit('reply', reply.id)"
        />
      </div>
    </div>

    <!-- Диалог для отправки жалобы -->
    <div v-if="showReportDialog" class="report-dialog">
      <div class="report-dialog-content">
        <h4>Пожаловаться на комментарий</h4>
        <textarea
            v-model="reportReason"
            placeholder="Укажите причину жалобы..."
            class="report-reason"
        ></textarea>
        <div class="report-actions">
          <button @click="showReportDialog = false" class="cancel-btn">Отмена</button>
          <button
              @click="submitReport"
              :disabled="!reportReason.trim() || isSubmittingReport"
              class="submit-btn"
          >
            {{ isSubmittingReport ? 'Отправка...' : 'Отправить' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment-item {
  display: flex;
  margin-bottom: 1rem;
}

.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
}

.content {
  flex: 1;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.username {
  font-weight: bold;
}

.created-at {
  color: #6c757d;
  font-size: 0.9rem;
}

.text {
  white-space: pre-line;
}

.replies {
  margin-left: 2rem;
  border-left: 1px solid #e9ecef;
  padding-left: 1rem;
}
</style>
