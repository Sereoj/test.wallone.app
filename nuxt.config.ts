// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/image',
    '@pinia/nuxt'
  ],
  css: ['~/assets/styles/global.scss'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
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
