import MarqueeText from 'vue-marquee-text-component'
// import Toasted from 'vue-toasted'
import Toast from 'vue-toastification'

import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  // ref https://www.npmjs.com/package/vue-marquee-text-component
  nuxtApp.vueApp.component('marquee-text', MarqueeText)
  // ref https://vue-toastification.maronato.dev/
  nuxtApp.vueApp.use(Toast, {
    position: 'top-center',
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: false,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: false,
    icon: false,
    rtl: false,
  })
})
