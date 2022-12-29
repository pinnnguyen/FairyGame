export default defineNuxtConfig({
  auth: {
    origin: process.env.ORIGIN,
    enableGlobalAppMiddleware: true,
  },
  nitro: {
    plugins: [
      '~/server/index.ts',
      '~/server/plugins/socket',
    ],
  },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
    socketClientURL: 'http://localhost:3005',
    socketIO: {
      cors: {
        origin: process.env.ORIGIN,
        allowedHeaders: ['gl'],
        credentials: true,
      },
      port: 3005,
    },
  },
  modules: [
    '@vueuse/nuxt',
    // '@unocss/nuxt',
    '@pinia/nuxt',
    //    '@nuxtjs/supabase',
    '@nuxt/image-edge',
    // 'nuxt-full-static',
    'nuxt-windicss',
    '@sidebase/nuxt-auth',
  ],
  experimental: {
    reactivityTransform: false,
    inlineSSRStyles: false,
  },
  css: [
    // '@unocss/reset/tailwind.css',
    '~/assets/css/main.scss',
    '~/assets/css/toast.css',
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
        open: false,
      },
    },
  },
})
