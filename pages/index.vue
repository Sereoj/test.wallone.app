<script setup lang="ts">
import ExploreFilters from "~/components/modules/content/ExploreFilters.vue";
import HeroSection from "~/components/partials/HeroSection.vue";
import Gallery from '~/components/modules/content/Gallery.vue';
import MediaModal from "~/components/partials/Modal/MediaModal.vue";
import AuthorInfo from "~/components/partials/modal/AuthorInfo.vue";
import Tabs from "~/components/modules/content/Tabs.vue";
import BaseButton from "~/components/base/buttons/BaseButton.vue";
import Comments from "~/components/partials/comments/Comments.vue";


const galleryItems = [
  {
    type: 'image',
    src: '/images/1.jpg',
    alt: 'Span 2x2',
    classes: ['gallery-item--span-2x2']
  },
  {
    type: 'double',
    images: [
      { src: '/images/2.jpg', alt: 'Double 1' },
      { src: '/images/3.jpg', alt: 'Double 2' }
    ]
  },
  {
    type: 'image',
    src: '/images/1.jpg',
    alt: 'Single'
  },
  {
    type: 'triple',
    images: [
      { src: '/images/2.jpg', alt: 'Triple 1' },
      { src: '/images/3.jpg', alt: 'Triple 2' },
      { src: '/images/1.jpg', alt: 'Triple 3' }
    ]
  },
  {
    type: 'image',
    src: '/images/2.jpg',
    alt: 'Span 2',
    classes: ['gallery-item--span-2']
  },
  {
    type: 'quad',
    images: [
      { src: '/images/1.jpg', alt: 'Quad 1' },
      { src: '/images/2.jpg', alt: 'Quad 2' },
      { src: '/images/3.jpg', alt: 'Quad 3' },
      { src: 'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif', alt: 'Quad 4' }
    ]
  },
  {
    type: 'image',
    src: '/images/3.jpg',
    alt: 'Single'
  },
  {
    type: 'video',
    src: 'https://filesamples.com/samples/video/mp4/sample_640x360.mp4'
  },
  {
    type: 'image',
    src: 'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif',
    alt: 'GIF'
  },
  {
    type: 'double',
    images: [
      { src: '/images/2.jpg', alt: 'Double 1' },
      { src: '/images/3.jpg', alt: 'Double 2' }
    ]
  },
  {
    type: 'video',
    src: 'https://filesamples.com/samples/video/mp4/sample_640x360.mp4'
  },
  {
    type: 'triple',
    images: [
      { src: '/images/1.jpg', alt: 'Triple 1' },
      { src: '/images/2.jpg', alt: 'Triple 2' },
      { src: '/images/3.jpg', alt: 'Triple 3' }
    ]
  },
  {
    type: 'quad',
    images: [
      { src: '/images/1.jpg', alt: 'Quad 1' },
      { src: '/images/2.jpg', alt: 'Quad 2' },
      { src: '/images/3.jpg', alt: 'Quad 3' },
      { src: 'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif', alt: 'Quad 4' }
    ]
  },
  {
    type: 'image',
    src: '/images/3.jpg',
    alt: 'Single'
  },
  {
    type: 'image',
    src: '/images/1.jpg',
    alt: 'Span Rows',
    classes: ['gallery-item--span-rows']
  }
];

const mainMedia = {
  type: 'image',
  src: '/images/1.jpg',
  alt: 'Main Media'
};

const thumbnails = [
  {
    type: 'image',
    src: '/images/2.jpg',
    alt: 'Thumbnail 1'
  },
  {
    type: 'image',
    src: '/images/2.jpg',
    alt: 'Thumbnail 2'
  },
  {
    type: 'gif',
    src: 'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif',
    alt: 'Thumbnail 3'
  }
];

const author = {
  avatar: '/assets/images/user.png',
  name: 'John Doe',
  username: '@johndoe'
};

const stats = {
  likes: 123,
  views: 999,
  shares: 45,
  comments: 32
};

const tabs = [
  { label: 'Общее', value: 'general' },
  { label: 'Дополнительная информация', value: 'additional' }
];

const activeTab = ref('general');

const comments: Comment[] = [
  {
    id: 1,
    user_id: 3,
    post_id: 1,
    content: 'hello world',
    parent_id: null,
    created_at: '2025-02-20T16:26:37.000000Z',
    updated_at: '2025-02-20T16:26:37.000000Z',
    deleted_at: null,
    replies: [
      {
        id: 2,
        user_id: 3,
        post_id: 1,
        content: 'hello world',
        parent_id: 1,
        created_at: '2025-02-20T16:33:11.000000Z',
        updated_at: '2025-02-20T16:33:11.000000Z',
        deleted_at: null,
        replies: [],
        likes: [],
        reports: [],
      },
    ],
    likes: [],
    reports: [],
  },
];
</script>
<template>
<main class="main">
    <ExploreFilters/>
    <HeroSection image-url="main.jpg"
                 title="Wallone - место, где"
                 highlight="искусство"
                 subtitle="правит миром."/>
    <MediaModal
        :mainMedia="mainMedia"
        :thumbnails="thumbnails"
    />

    <AuthorInfo
        :author="author"
        :stats="stats"
    />

    <Tabs :tabs="tabs" v-model:activeTab="activeTab">
      <template #default="{ activeTab }">
        <div v-if="activeTab === 'general'">
          <h3>Общее</h3>
          <p class="description">Описание поста: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</p>

          <div class="modal-tags">
            <BaseButton type="link">#Tag</BaseButton>
            <BaseButton type="link">#Tag</BaseButton>
            <BaseButton type="link">#Tag</BaseButton>
            <BaseButton type="link">#Tag</BaseButton>
          </div>
          <Comments :comments="comments"/>
        </div>
        <div v-else-if="activeTab === 'additional'">
          <h2>Дополнительная информация</h2>
          <p>Здесь будет дополнительная информация.</p>
        </div>
        <div v-else>
          <p>Выберите таб для просмотра информации.</p>
        </div>
      </template>
    </Tabs>

    <Gallery :items="galleryItems" />
  </main>
</template>

<style lang="scss" scoped>
.modal-tags {
  display: flex;
  gap: 8px;
}

.main {
  margin-top: 5rem;
  padding: $spacing-lg;
}

.description {
  font-size: $font-size-small;
  color: theme-value($theme, text-color);
  margin-bottom: 10px;
}
</style>
