// https://nuxt.com/docsconfiguration/nuxt-config

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxt/eslint'
  ],
  plugins: [
    'plugins/auth.ts'
  ],
  runtimeConfig: {
    public: {
      apiBase: '/api/',
    },
  },
  nitro: {
    devProxy: {
      "/api/": {
        target: "http://test/public/api",
        changeOrigin: true,
      },
    },
  },
  css: ['~/assets/styles/global.scss'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `
          @use "@/assets/styles/utils/theme" as *;
          @use "@/assets/styles/variables.scss" as *;
          `
        }
      }
    }
  }
})
