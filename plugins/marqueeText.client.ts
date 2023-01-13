import MarqueeText from 'vue-marquee-text-component'
// import Toasted from 'vue-toasted'
import '@varlet/ui/es/style.js'
import '@varlet/ui/es/snackbar/style/index.js'
import '@varlet/ui/es/button/style/index.js'
import '@varlet/ui/es/loading/style/index.js'
import '@varlet/ui/es/popup/style/index.js'

import { Button, Loading, Popup, Snackbar, StyleProvider } from '@varlet/ui'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('marquee-text', MarqueeText)
  nuxtApp.vueApp.use(Snackbar)
  nuxtApp.vueApp.use(Button)
  nuxtApp.vueApp.use(Loading)
  nuxtApp.vueApp.use(Popup)

  StyleProvider({
    '--snackbar-font-size': '12px',
    '--snackbar-content-padding': '6px 16px',
    '--snackbar-background': '#1d1d1cdb',
    '--popup-content-background-color': '#333',
  })
})
