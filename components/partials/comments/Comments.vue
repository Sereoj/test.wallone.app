<script setup lang="ts">
import { PropType } from 'vue';

import CommentItem from "~/components/partials/comments/CommentItem.vue";

interface Comment {
  avatar: string;
  username: string;
  text: string;
}

const props = defineProps({
  comments: {
    type: Array as PropType<Comment[]>,
    default: () => []
  }
});
</script>

<template>
  <div class="comments">
    <h4>Комментарии</h4>
    <div v-if="comments.length === 0" class="no-comments">
      <p>Пока нет комментариев.</p>
    </div>
    <div v-else class="comment-list">
      <CommentItem v-for="(comment, index) in comments" :key="index" :comment="comment" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comments {
  border-radius: 8px;
  background-color: theme-value($theme, background-color);
  margin-top: 16px;
}

.no-comments {
  text-align: center;
  color: theme-value($theme, disabled-text-color);
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
</style>
