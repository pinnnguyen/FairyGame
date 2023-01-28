import MarqueeText from 'vue-marquee-text-component'
// import Toasted from 'vue-toasted'
import '@varlet/ui/es/style.js'
import '@varlet/ui/es/snackbar/style/index.js'
import '@varlet/ui/es/button/style/index.js'
import '@varlet/ui/es/loading/style/index.js'
import '@varlet/ui/es/popup/style/index.js'
import '@varlet/ui/es/input/style/index.js'

import {
  Button as GLButton,
  Loading as GLLoading,
  Popup as GLPopup,
  Snackbar as GLSnackbar,
  Input,
  StyleProvider,
} from '@varlet/ui'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('marquee-text', MarqueeText)
  nuxtApp.vueApp.use(GLSnackbar)
  nuxtApp.vueApp.use(GLButton)
  nuxtApp.vueApp.use(GLLoading)
  nuxtApp.vueApp.use(GLPopup)
  nuxtApp.vueApp.use(Input)

  StyleProvider({
    '--snackbar-font-size': '12px',
    '--snackbar-content-padding': '6px 16px',
    '--snackbar-background': '#1d1d1cdb',
    '--popup-content-background-color': '1',
    '--dialog-message-color': 'white',
  })
})
