<script setup lang="ts">
defineProps<{
  equipments: any
}>()

const show = ref(false)
const equipItemSelected = ref({})
const onItemSelected = (equipment: any) => {
  equipItemSelected.value = equipment.record
  show.value = true
}
</script>

<template>
  <var-popup v-model:show="show" position="center">
    <bag-equip-detail
      :item="equipItemSelected"
    />
  </var-popup>
  <div class="absolute top-10 px-6 w-full">
    <div class="grid grid-cols-2 m-auto overflow-auto mt-10 gap-2">
      <div v-for="equipment in equipments" :key="equipment._id" class="relative">
        <nuxt-img class="h-[75px] w-full" format="webp" src="/common/bg-aution.png" />
        <div class="absolute w-12 h-12 transform-center left-[22%]" @click.stop="onItemSelected(equipment)">
          <nuxt-img format="webp" :src="`/quality_bg/iconbg_${equipment.record.quality}.png`" class="absolute top-0" />
          <nuxt-img format="webp" :src="equipment.record.preview" class="absolute transform-center w-[80%] h-[80%] rounded-full object-cover" />
        </div>
        <div class="absolute top-0 right-0 flex mt-2 mr-2 flex-col w-1/2 h-full justify-around text-8">
          <span>Người bán: {{ equipment.player.name }}</span>
          <div class="flex text-8 justify-between">
            <span>SL: 1</span>
            <div class="flex">
              <nuxt-img class="w-3 object-contain" format="webp" src="/items/1_s.png" />
              <span class="text-8 ml-1 font-semibold">{{ equipment.price }}</span>
            </div>
          </div>
          <button class="mb-3 px-2 py-[2px] shadow rounded mr-2 text-10 font-semibold !text-white !border-2 !border-[#040404] bg-[#841919]">
            Mua
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
