import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'
import { defineNuxtConfig } from 'nuxt/config'

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
  vite: {
    // ssr: {
    //   noExternal: ['@varlet/ui'],
    // },

    plugins: [
      components({
        resolvers: [VarletUIResolver()],
      }),

      autoImport({
        resolvers: [VarletUIResolver({ autoImport: true })],
      }),
    ],
  },
  auth: {
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://tienhoi.vercel.app',
    enableGlobalAppMiddleware: false,
  },
  nitro: {
    // preset: 'vercel',
    plugins: [
      '~/server/index.ts',
    ],
  },
  // app: {
  //   buildAssetsDir: '/assets/',
  //   head: {
  //     viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
  //   },
  // },
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
  // build: {
  //   transpile: ['@varlet/ui'],
  // },
  modules: [
    // '@vite-pwa/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    'nuxt-windicss',
    'nuxt-icon',
    '@sidebase/nuxt-auth',
    // '@kevinmarrec/nuxt-pwa',
  ],
  pwa: {
    meta: {
      appleStatusBarStyle: 'default',
      mobileApp: true,
      mobileAppIOS: true,
      name: 'TTG',
    },
    workbox: {
      enabled: true,
    },
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
