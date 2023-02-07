import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'
import { defineNuxtConfig } from 'nuxt/config'
import Unimport from 'unimport/unplugin'

export default defineNuxtConfig({
  ssr: false,
  // routeRules: {
  //   '/**': { swr: true },
  // },
  vite: {
    plugins: [
      Unimport.vite({
        presets: [
          {
            from: '@vueuse/core',
            imports: [
              'set',
            ],
          },
        ],
      }),
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
    plugins: [
      '~/server/index.ts',
    ],
  },
  app: {
    keepalive: true,
    buildAssetsDir: '/assets/',
  },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
  },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    'nuxt-windicss',
    'nuxt-icon',
    '@sidebase/nuxt-auth',
    // '@kevinmarrec/nuxt-pwa',
  ],
  pwa: {
    manifest: {
      name: 'Tự Mình Tu Tiên Bon Studio',
      short_name: 'Tự Mình Tu Tiên',
      start_url: '/',
      lang: 'vi',
    },
    meta: {
      favicon: true,
      // appleStatusBarStyle: 'black-translucent',
      theme_color: '#191b1e',
      mobileApp: true,
      mobileAppIOS: true,
      name: 'Tự mình tu tiên',
      author: 'Bon Studio',
    },
    workbox: {
      enabled: true,
    },
  },
  pinia: {
    autoImports: ['storeToRefs'],
  },
  css: [
    '~/assets/css/main.scss',
    'virtual:windi.css',
  ],
  windicss: {
    analyze: {
      analysis: {
        interpretUtilities: false,
      },
      server: {
        port: 4444,
        open: false,
      },
    },
  },
})
