export default defineNuxtConfig({
  ssr: true,
  auth: {
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tienhoi.vercel.app',
    enableGlobalAppMiddleware: false,
  },
  nitro: {
    // preset: 'vercel',
    plugins: [
      '~/server/index.ts',
      // '~/server/plugins/socket',
    ],
  },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
    // socketClientURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3005' : 'http://103.82.22.99:3005',
    // socketIO: {
    //   cors: {
    //     origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://103.82.22.99:3000',
    //     allowedHeaders: ['gl'],
    //     credentials: true,
    //   },
    //   port: 3005,
    // },
  },
  build: {
    transpile: ['@varlet/ui'],
  },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    'nuxt-windicss',
    'nuxt-icon',
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
