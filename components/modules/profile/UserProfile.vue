<template>
  <div v-if="pending" class="loading">Загрузка...</div>
  <div v-else-if="error" class="error">Ошибка загрузки данных</div>
  <div v-else class="profile-page">
    <!-- Sidebar -->
    <aside class="profile-sidebar">
      <div class="avatar-container">
        <UserAvatar
            v-if="user.avatars[0]?.path"
            :src="user.avatars[0].path"
            :size="150"
            alt="User Avatar"
        />
        <div class="online-status" :class="{ online: user.online_status.is_online }">
          {{ user.online_status.is_online ? 'Онлайн' : 'Оффлайн' }}
        </div>
      </div>
      <h2 class="username">@{{ user.username }}</h2>
      <p class="status">
        {{ user.level.name.ru }} ({{ user.level.experience_required }} XP)
        <span class="employment-status">{{ user.employment_status.name.ru }}</span>
      </p>
      <p class="bio">{{ user.bio || 'Нет описания' }}</p>

      <!-- Actions -->
      <div class="profile-actions">
        <BaseButton type="default" @click="toggleFollow">
          {{ isFollowing ? 'Отписаться' : 'Подписаться' }}
        </BaseButton>
        <BaseButton type="default" @click="openMessage">
          <IconMessage /> Сообщение
        </BaseButton>
      </div>

      <!-- Stats -->
      <div class="profile-stats">
        <StatItem
            v-for="(stat, index) in stats"
            :key="index"
            :label="stat.label"
            :value="stat.value"
        />
      </div>

      <!-- Achievements -->
      <div class="user-achievements">
        <h3>Достижения</h3>
        <ul>
          <li v-for="achievement in user.achievements" :key="achievement.id" class="achievement-item">
            <IconTrophy class="achievement-icon" />
            {{ achievement.name.ru }} ({{ achievement.points }} очков)
          </li>
        </ul>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="profile-content">
      <Tabs :tabs="tabs">
        <template #default="{ activeTab }">
          <PostList v-if="activeTab === 'posts'" :posts="posts" />
          <MediaGallery v-if="activeTab === 'media'" :media="media" />
          <TaskCard v-if="activeTab === 'tasks'" :tasks="user.tasks" />
        </template>
      </Tabs>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconMessage, IconTrophy } from '@tabler/icons-vue';
import UserAvatar from '~/components/partials/UserAvatar.vue';
import BaseButton from '~/components/base/buttons/BaseButton.vue';
import Tabs from '~/components/modules/content/Tabs.vue';
import PostList from '~/components/modules/content/PostList.vue';
import MediaGallery from '~/components/modules/content/MediaGallery.vue';
import TaskCard from '~/components/modules/profile/TaskCard.vue';
import StatItem from '~/components/modules/content/StatItem.vue';
import type {Post} from "~/types/post";
import type {MediaItem} from "~/types/media";


const user = ref({
  username: 'john_doe',
  avatars: [{ path: 'https://avatars.mds.yandex.net/i?id=af696da68685b4513a5d4bff4da7e42b_l-5667950-images-thumbs&n=13' }],
  level: { name: { ru: 'Уровень 5' }, experience_required: 1000 },
  employment_status: { name: { ru: 'Студент' } },
  bio: 'Привет! Я люблю программирование и дизайн.',
  online_status: { is_online: true },
  followers_count: 1200,
  following_count: 45,
  likes_count: 890,
  achievements: [
    { id: 1, name: { ru: 'Новичок' }, points: 50 },
    { id: 2, name: { ru: 'Эксперт' }, points: 200 },
  ],
  tasks: [
    {
      id: 1,
      name: { ru: "Завершите обучение", en: "Complete the tutorial" },
      description: { ru: "Пройдите все уроки обучения.", en: "Complete all tutorial lessons." },
      progress: 50,
      target: 100,
      experienceReward: 100,
    },
    {
      id: 2,
      name: { ru: "Соберите ресурсы", en: "Collect resources" },
      description: { ru: "Найдите необходимые материалы.", en: "Gather required materials." },
      progress: 75,
      target: 150,
      experienceReward: 200,
    },
  ],
});

const posts = ref<Post[]>([
  {
    id: 1,
    title: 'Мой первый пост',
    slug: 'my-first-post',
    content: 'Это мой первый пост на платформе!',
    media: [],
    user: {
      username: 'test',
      slug: 'test',
      verification: false,
      avatar: {
        path: '/test/test.png'
      }
    },
    statistics: {
      views: 10,
      likes: 20,
      reposts: 30,
      downloads: 20,
      purchases: 1,
      comments: 20,
      score: 10,
    },
    created_at: '2023-09-01T12:00:00Z',
  }
]);

const media = ref<MediaItem[]>([
  { type: 'image', src: 'https://via.placeholder.com/150', },
  { type: 'video', src: 'https://via.placeholder.com/150' },
]);

const tabs = [
  { label: 'Посты', value: 'posts' },
  { label: 'Медиа', value: 'media' },
  { label: 'Задачи', value: 'tasks' },
];

const stats = ref([
  { label: 'Подписчики', value: user.value.followers_count },
  { label: 'Подписки', value: user.value.following_count },
  { label: 'Лайки', value: user.value.likes_count },
]);


const isFollowing = ref(false);

const toggleFollow = () => {
  isFollowing.value = !isFollowing.value;
};

const openMessage = () => {
  logger('Открыть сообщения');
};
</script>

<style lang="scss" scoped>
@use 'sass:color';

.profile-page {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .loading,
  .error {
    text-align: center;
    font-size: 18px;
    color: theme-value($theme, text-color);
  }
}

.profile-sidebar {
  background-color: theme-value($theme, secondary-color);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

  .avatar-container {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    .online-status {
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: theme-value($theme, danger-color);
      color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 12px;

      &.online {
        background-color: theme-value($theme, success-color);
      }
    }
  }

  .username {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }

  .status {
    font-size: 14px;
    color: theme-value($theme, text-muted);
    text-align: center;
    margin-bottom: 10px;

    .employment-status {
      display: inline-block;
      background-color: theme-value($theme, primary-color);
      color: #fff;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 12px;
      margin-left: 5px;
    }
  }

  .bio {
    margin-bottom: 20px;
    text-align: center;
  }

  .profile-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  .profile-stats {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    padding-top: 20px;
    border-top: 1px solid theme-value($theme, border-color);
  }

  .user-achievements {
    h3 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    ul {
      list-style-type: none;
      padding: 0;

      li {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        margin-bottom: 5px;

        .achievement-icon {
          color: theme-value($theme, primary-color);
        }
      }
    }
  }
}

.profile-content {
  background-color: theme-value($theme, background-color);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.profile-page {
  animation: fadeIn 0.5s ease-out;
}
</style>
