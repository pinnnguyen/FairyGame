import MarqueeText from 'vue-marquee-text-component'
// import Toasted from 'vue-toasted'

export default defineNuxtPlugin((nuxtApp) => {
  // ref https://www.npmjs.com/package/vue-marquee-text-component
  nuxtApp.vueApp.component('marquee-text', MarqueeText)
  // ref https://vue-toastification.maronato.dev/
})
