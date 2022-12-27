import MarqueeText from 'vue-marquee-text-component'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('marquee-text', MarqueeText)
})
