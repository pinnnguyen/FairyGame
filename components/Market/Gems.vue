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

  <div class="absolute top-10 px-6 w-full">
    <div class="grid grid-cols-2 m-auto overflow-auto mt-10 gap-2">
      <div v-for="gem in gems" :key="gem._id" class="relative">
        <nuxt-img class="h-[75px] w-full" format="webp" src="/common/bg-aution.png" />
        <div class="absolute w-15 h-15 transform-center left-[22%]" @click.stop="onSelectedGem(gem)">
          <nuxt-img format="webp" :src="`/quality_bg/iconbg_${gem.record.quality}.png`" class="absolute top-0" />
          <nuxt-img format="webp" :src="`/gem/${gem.record.gemId}.png`" class="absolute transform-center w-[80%] h-[80%] rounded-full object-cover" />
        </div>
        <div class="absolute top-0 right-0 flex mt-2 mr-2 flex-col w-1/2 h-full justify-around text-8">
          <span>Người bán: {{ gem.player.name }}</span>
          <div class="flex justify-between">
            <span>SL: 1</span>
            <div class="flex">
              <nuxt-img class="w-3 object-contain" format="webp" src="/items/1_s.png" />
              <span class="ml-1 font-semibold">{{ gem.price }}</span>
            </div>
          </div>
          <button class="mb-3 px-1 py-[2px] shadow rounded mr-2 text-10 font-semibold !text-white !border-2 !border-[#040404] bg-[#841919]">
            Mua
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
