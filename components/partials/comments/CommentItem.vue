<!-- components/CommentItem.vue -->
<script setup lang="ts">
interface Comment {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  replies: Comment[];
  likes: any[];
  reports: any[];
}

defineProps<{
  comment: Comment;
}>();

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
</script>

<template>
  <div class="comment-item">
    <!-- Аватарка пользователя -->
    <div class="avatar">
      <img src="/images/1.jpg" alt="User Avatar" />
    </div>

    <!-- Содержимое комментария -->
    <div class="content">
      <div class="header">
        <span class="username">@user{{ comment.user_id }}</span>
        <span class="created-at">{{ formatDate(comment.created_at) }}</span>
      </div>
      <p class="text">{{ comment.content }}</p>

      <!-- Вложенные комментарии -->
      <div v-if="comment.replies.length > 0" class="replies">
        <CommentItem v-for="reply in comment.replies" :key="reply.id" :comment="reply" />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
