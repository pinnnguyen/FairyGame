export default defineNuxtConfig({
  ssr: false,
  routeRules: {
    '/': {
      static: true,
    },
    '/login': {
      static: true,
    },
    '/register': {
      static: true,
    },
  },
  auth: {
    origin: process.env.NODE_ENV === 'development' ? 'http://192.168.1.5:3000' : 'https://tienhoi.vercel.app',
    enableGlobalAppMiddleware: false,
  },
  nitro: {
    // preset: 'vercel',
    plugins: [
      '~/server/index.ts',
    ],
  },
  app: {
    buildAssetsDir: '/assets/',
    head: {
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
    },
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
    '@kevinmarrec/nuxt-pwa',
  ],
  pwa: {
    meta: {
      // Generate splash screens for iOS
      mobileApp: true,
      mobileAppIOS: true,
      name: 'Tu tiên giới',
      description: 'Tu tiên độ nhân phẩm',
      theme_color: '#475181',
      lang: 'vi',
    },
    workbox: {
      enabled: true,
    },
  },
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
