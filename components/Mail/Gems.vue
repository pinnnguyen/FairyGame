<script setup lang="ts">
defineProps<{
  gems: any
}>()

const show = ref(false)
const gemSelected = ref({})
const onSelectedGem = (gem: any) => {
  gemSelected.value = gem.record
  show.value = true
}
</script>

<template>
  <var-popup v-model:show="show" position="center">
    <bag-gem-detail
      :gem="gemSelected"
    />
  </var-popup>

  <div v-for="gem in gems" :key="gem._id" class="relative bottom-0 transform-center w-25 flex items-center justify-center">
    <div class="absolute w-13 h-13 transform-center left-[22%]" @click.stop="onSelectedGem(gem)">
      <nuxt-img format="webp" :src="`/quality_bg/iconbg_${gem.quality}.png`" class="absolute top-0" />
      <nuxt-img format="webp" :src="`/gem/${gem.gemId}.png`" class="absolute transform-center w-[80%] h-[80%] rounded-full object-cover" />
    </div>
    <div class="flex mt-2 ml-4 text-8">
      SL: 1
    </div>
  </div>
</template>
