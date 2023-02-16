import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'
import { defineNuxtConfig } from 'nuxt/config'
import Unimport from 'unimport/unplugin'

export default defineNuxtConfig({
  nitro: {
    preset: 'node-server',
    plugins: [
      '~/server/index.ts',
    ],
    // storage: {
    //   notes: {
    //     driver: 'cloudflare-kv-binding',
    //     binding: 'ATINOTES',
    //   },
    // },
    // Overwrite notes storage in development using FS
    devStorage: {
      notes: {
        driver: 'fs',
        base: './.data/caches',
      },
    },
  },
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
    origin: process.env.NODE_ENV === 'development' ? 'http://192.168.2.135:3000/' : 'http://103.179.189.210:3000/',
    enableGlobalAppMiddleware: false,
  },
  app: {
    keepalive: true,
    buildAssetsDir: '/assets/',
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
        },
      ],
    },
  },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
  },
  modules: [
    // '@nuxt/devtools',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    'nuxt-windicss',
    'nuxt-icon',
    '@sidebase/nuxt-auth',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Roboto': true,
          'Josefin+Sans': true,
          'Lato': [100, 300],
          'Raleway': {
            wght: [100, 400],
            ital: [100],
          },
        },
      },
    ],
    '@kevinmarrec/nuxt-pwa',
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
      theme_color: '#000000',
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
