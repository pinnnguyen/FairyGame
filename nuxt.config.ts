export default defineNuxtConfig({
  nitro: {
    plugins: ['~/server/index.ts'],
  },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
  },
  modules: [
    '@vueuse/nuxt',
    // '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@nuxt/image-edge',
    'nuxt-full-static',
    'nuxt-windicss',
    // 'virtual:windi-base.css',
    // 'virtual:windi-components.css',
    // 'virtual:windi-utilities.css',
  ],
  experimental: {
    reactivityTransform: false,
    inlineSSRStyles: false,
  },
  css: [
    // '@unocss/reset/tailwind.css',
    '~/assets/css/main.scss',
    'virtual:windi.css',
  ],
  windicss: {
    analyze: {
      analysis: {
        interpretUtilities: false,
      },
      // see https://github.com/unjs/listhen#options
      server: {
        port: 4444,
        open: true,
      },
    },
  },
})
