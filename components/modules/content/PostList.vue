<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id" class="post-item">
      <div class="post-header">
        <UserAvatar :src="userAvatar" :size="40" class="post-avatar" />
        <div class="post-author">
          <strong>{{ post.author || 'Пользователь' }}</strong>
          <span class="timestamp">{{ formattedDate(post.timestamp) }}</span>
        </div>
      </div>
      <div class="post-content">
        <h4>{{ post.title }}</h4>
        <p>{{ post.content }}</p>
      </div>
      <div class="post-actions">
        <BaseButton type="default" class="action-btn" @click="likePost(post.id)">
          <IconHeart /> {{ post.likes }}
        </BaseButton>
        <BaseButton type="default" class="action-btn" @click="commentPost(post.id)">
          <IconMessage /> {{ post.comments }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconHeart, IconMessage } from '@tabler/icons-vue';
import BaseButton from "~/components/base/buttons/BaseButton.vue";
import type {Post} from "~/types/post";

const props = defineProps<{
  posts: Post[];
}>();

const userAvatar = ref('https://via.placeholder.com/40');

const likePost = (postId: number) => {
  console.log(`Liked post ${postId}`);
};

const commentPost = (postId: number) => {
  console.log(`Commented on post ${postId}`);
};

const formattedDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};
</script>

<style lang="scss" scoped>
.post-list {
  .post-item {
    background: theme-value($theme, secondary-color);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;

    .post-header {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-bottom: 0.5rem;

      .post-avatar {
        border: 2px solid theme-value($theme, primary-color);
      }

      .post-author {
        display: flex;
        flex-direction: column;

        strong {
          color: theme-value($theme, text-color);
          font-size: 1rem;
        }

        .timestamp {
          color: theme-value($theme, text-color);
          opacity: 0.7;
          font-size: 0.875rem;
        }
      }
    }

    .post-content {
      margin-bottom: 1rem;

      h4 {
        margin: 0;
        color: theme-value($theme, text-color);
        font-size: 1.125rem;
      }

      p {
        margin: 0.5rem 0;
        color: theme-value($theme, text-color);
        opacity: 0.8;
        font-size: 0.9rem;
      }
    }

    .post-actions {
      display: flex;
      gap: 1rem;

      .action-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: none;
        border: none;
        color: theme-value($theme, text-color);
        opacity: 0.8;
        cursor: pointer;
        transition: opacity 0.2s;

        &:hover {
          opacity: 1;
        }

        svg {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
}
</style>
