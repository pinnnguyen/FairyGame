export default defineNuxtConfig({
  nitro: {
    plugins: ['~/server/index.ts'],
  },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@nuxt/image-edge',
    'nuxt-full-static',
  ],
  experimental: {
    reactivityTransform: false,
    inlineSSRStyles: false,
  },
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/main.css',
  ],
})
