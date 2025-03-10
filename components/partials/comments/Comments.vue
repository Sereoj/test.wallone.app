<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CommentItem from "~/components/partials/comments/CommentItem.vue";
import type { Comment } from "~/types/comments";
import { useCommentsStore } from "~/stores/comments";

const props = defineProps({
  postId: {
    type: Number,
    required: true
  },
  comments: {
    type: Array as PropType<Comment[]>,
    default: () => []
  }
});

const commentsStore = useCommentsStore();
const newCommentText = ref('');
const isSubmitting = ref(false);
const replyToId = ref<number | null>(null);

// Загрузка комментариев при монтировании компонента
onMounted(async () => {
  if (props.postId) {
    await loadComments();
  }
});

// Загрузка комментариев
const loadComments = async () => {
  try {
    await commentsStore.fetchComments(props.postId);
  } catch (err) {
    console.error('Error loading comments:', err);
  }
};

// Загрузка дополнительных комментариев
const loadMoreComments = async () => {
  try {
    await commentsStore.fetchComments(props.postId, commentsStore.page + 1);
  } catch (err) {
    console.error('Error loading more comments:', err);
  }
};

// Добавление нового комментария
const addComment = async () => {
  if (!newCommentText.value.trim()) return;

  isSubmitting.value = true;
  try {
    await commentsStore.addComment(
        props.postId,
        newCommentText.value,
        replyToId.value || undefined
    );

    // Очищаем форму после успешной отправки
    newCommentText.value = '';
    replyToId.value = null;
  } catch (err) {
    console.error('Error adding comment:', err);
  } finally {
    isSubmitting.value = false;
  }
};

// Обработка ответа на комментарий
const handleReply = (commentId: number) => {
  replyToId.value = commentId;
  // Фокусируемся на поле ввода
  setTimeout(() => {
    document.querySelector('.comment-input')?.scrollIntoView({ behavior: 'smooth' });
    (document.querySelector('.comment-input') as HTMLTextAreaElement)?.focus();
  }, 100);
};
</script>

<template>
  <div class="comments">
    <h4>Комментарии</h4>

    <!-- Форма добавления комментария -->
    <div class="comment-form">
      <textarea
          v-model="newCommentText"
          placeholder="Добавьте комментарий..."
          class="comment-input"
      ></textarea>
      <button
          @click="addComment"
          :disabled="!newCommentText.trim() || isSubmitting"
          class="comment-submit-btn"
      >
        {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
      </button>
    </div>

    <!-- Загрузка комментариев -->
    <div v-if="commentsStore.loading && !commentsStore.comments.length" class="comments-loading">
      Загрузка комментариев...
    </div>

    <!-- Ошибка загрузки -->
    <div v-else-if="commentsStore.error" class="comments-error">
      {{ commentsStore.error }}
      <button @click="loadComments" class="retry-btn">Повторить</button>
    </div>

    <!-- Список комментариев -->
    <div v-else-if="commentsStore.comments.length" class="comment-list">
      <CommentItem
          v-for="comment in commentsStore.comments"
          :key="comment.id"
          :comment="comment"
          :postId="postId"
          @reply="handleReply"
      />

      <!-- Кнопка загрузки дополнительных комментариев -->
      <div v-if="commentsStore.hasMore" class="load-more-container">
        <button
            @click="loadMoreComments"
            :disabled="commentsStore.loading"
            class="load-more-btn"
        >
          {{ commentsStore.loading ? 'Загрузка...' : 'Загрузить еще' }}
        </button>
      </div>
    </div>

    <!-- Нет комментариев -->
    <div v-else class="no-comments">
      <p>Пока нет комментариев.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comments {
  border-radius: 8px;
  background-color: theme-value($theme, background-color);
  color: theme-value($theme, text-color);
  padding: 16px;
  margin-top: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .comment-input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid theme-value($theme, border-color);
    background-color: theme-value($theme, secondary-color);
    color: theme-value($theme, text-color);
    transition: border 0.3s;

    &:focus {
      border-color: theme-value($theme, focus-border-color);
      outline: none;
    }
  }

  .comment-submit-btn {
    align-self: flex-end;
    background-color: theme-value($theme, primary-color);
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: theme-value($theme, hover-bg-color);
    }

    &:disabled {
      background-color: theme-value($theme, disabled-bg-color);
      cursor: not-allowed;
    }
  }
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
}

.comment {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 12px;
  border-radius: 5px;
  background-color: theme-value($theme, secondary-color);
}

.no-comments {
  text-align: center;
  color: theme-value($theme, disabled-text-color);
  padding: 10px 0;
}

.load-more-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;

  .load-more-btn {
    background-color: theme-value($theme, primary-color);
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: theme-value($theme, hover-bg-color);
    }

    &:disabled {
      background-color: theme-value($theme, disabled-bg-color);
      cursor: not-allowed;
    }
  }
}

.comments-loading {
  text-align: center;
  color: theme-value($theme, text-color);
  font-weight: bold;
}

.comments-error {
  text-align: center;
  color: theme-value($theme, danger-color);
  font-weight: bold;

  .retry-btn {
    margin-top: 10px;
    background-color: theme-value($theme, warning-color);
    color: #fff;
    border: none;
    padding: 6px 12px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: theme-value($theme, active-bg-color);
    }
  }
}
</style>
