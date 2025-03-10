<script setup lang="ts">
import UserProfile from '~/components/modules/profile/UserProfile.vue';

/*const user = ref({
  id: 3,
  username: 'test',
  slug: 'test',
  email: 'ser.12egorov@gmail.com',
  avatars: [
    {
      id: 1,
      user_id: 3,
      path: 'https://images.wallpaperscraft.ru/image/single/obeziana_zabavnyj_brevno_1376039_1280x720.jpg',
      created_at: '2025-02-20T16:49:48.000000Z',
      updated_at: '2025-02-20T16:49:48.000000Z',
    },
  ],
  level: {
    id: 1,
    name: {
      ru: 'Новичок',
      en: 'Novice',
    },
    experience_required: 0,
  },
  achievements: [
    {
      id: 1,
      name: {
        en: 'First Registration',
        ru: 'Первая регистрация',
      },
      description: {
        en: 'Register as a new user',
        ru: 'Зарегистрируйтесь как новый пользователь',
      },
      points: 10,
    },
  ],
  role: {
    id: 2,
    name: {
      en: 'User',
      ru: 'Пользователь',
    },
    type: 'user',
  },
  badges: [],
  using_app: null,
  user_setting: {
    id: 4,
    is_online: 1,
    is_preferences_feed: 0,
    preferences_feed: 'default',
  },
  status: {
    id: 1,
    name: {
      ru: 'Активный',
      en: 'Active',
    },
    emoji: '✅',
  },
  employment_status: {
    id: 1,
    name: {
      ru: 'Открыт для работы',
      en: 'Open for work',
    },
  },
  location: null,
  tasks: [
    {
      id: 1,
      name: {
        ru: 'Опубликовать 5 постов',
        en: 'Publish 5 posts',
      },
      description: {
        ru: 'Опубликуйте 5 постов в блоге.',
        en: 'Publish 5 posts on the blog.',
      },
      target: 5,
      period: 'week',
      type: 'publish_posts',
      experience_reward: 300,
      virtual_balance_reward: 0,
    },
    {
      id: 2,
      name: {
        ru: 'Продать 10 изображений',
        en: 'Sell 10 images',
      },
      description: {
        ru: 'Продайте 10 изображений через онлайн-платформу.',
        en: 'Sell 10 images through an online platform.',
      },
      target: 10,
      period: 'month',
      type: 'sell_images',
      experience_reward: 1000,
      virtual_balance_reward: 0,
    },
    {
      id: 3,
      name: {
        ru: 'Опубликовать 10 постов',
        en: 'Publish 10 posts',
      },
      description: {
        ru: 'Опубликуйте 10 постов.',
        en: 'Publish 10 posts.',
      },
      target: 10,
      period: 'week',
      type: 'publish_posts',
      experience_reward: 300,
      virtual_balance_reward: 0,
    },
    {
      id: 4,
      name: {
        ru: 'Оставить 20 комментариев',
        en: 'Leave 20 comments',
      },
      description: {
        ru: 'Оставьте 20 комментариев на постах других пользователей.',
        en: 'Leave 20 comments on other users posts.',
      },
      target: 20,
      period: 'week',
      type: 'leave_comments',
      experience_reward: 200,
      virtual_balance_reward: 0,
    },
    {
      id: 5,
      name: {
        ru: 'Получить 100 лайков',
        en: 'Get 100 likes',
      },
      description: {
        ru: 'Получите 100 лайков на своих постах.',
        en: 'Get 100 likes on your posts.',
      },
      target: 100,
      period: 'month',
      type: 'get_likes',
      experience_reward: 500,
      virtual_balance_reward: 0,
    },
    {
      id: 6,
      name: {
        ru: 'Скачать 50 файлов',
        en: 'Download 50 files',
      },
      description: {
        ru: 'Скачайте 50 файлов с платформы.',
        en: 'Download 50 files from the platform.',
      },
      target: 50,
      period: 'month',
      type: 'download_files',
      experience_reward: 400,
      virtual_balance_reward: 0,
    },
    {
      id: 7,
      name: {
        ru: 'Просмотреть 10 видео',
        en: 'Watch 10 videos',
      },
      description: {
        ru: 'Просмотрите 10 видео на платформе.',
        en: 'Watch 10 videos on the platform.',
      },
      target: 10,
      period: 'month',
      type: 'watch_videos',
      experience_reward: 300,
      virtual_balance_reward: 0,
    },
    {
      id: 8,
      name: {
        ru: 'Заполнить профиль',
        en: 'Complete your profile',
      },
      description: {
        ru: 'Заполните все поля в своем профиле.',
        en: 'Complete all fields in your profile.',
      },
      target: 1,
      period: 'year',
      type: 'complete_profile',
      experience_reward: 200,
      virtual_balance_reward: 0,
    },
  ],
  user_balance: [
    {
      id: 1,
      balance: '0.0000',
      pending_balance: '0.0000',
      currency: 'USD',
    },
    {
      id: 2,
      balance: '0.0000',
      pending_balance: '0.0000',
      currency: 'RUB',
    },
  ],
  online_status: {
    last_activity: '2025-03-08 15:00:07',
    device_type: 'PostmanRuntime/7.43.0',
    ip_address: '127.0.0.1',
  },
});*/
</script>

<template>
  <main class="main">
    <div class="user-profile-page">
<!--      <UserProfile :user="" />-->
    </div>
  </main>
</template>

<style scoped>
</style>
