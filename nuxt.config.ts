export default defineNuxtConfig({
  auth: {
    origin: process.env.ORIGIN,
    enableGlobalAppMiddleware: false,
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
    '@pinia/nuxt',
    '@nuxt/image-edge',
    'nuxt-windicss',
    '@sidebase/nuxt-auth',
  ],
  experimental: {
    reactivityTransform: false,
    inlineSSRStyles: false,
  },
  css: [
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
