<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Dialog } from '@varlet/ui'
import { set } from '@vueuse/core'
import { usePlayerSlot } from '~/composables/usePlayerSlot'
import type { PlayerEquipment, PlayerGem } from '~/types'
import { sendMessage, usePlayerStore } from '#imports'

const emits = defineEmits(['equipSelected'])
const { $io } = useNuxtApp()

const { slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8 } = storeToRefs(usePlayerSlot())
const { getSlotEquipUpgrade } = usePlayerSlot()

const { getPlayer } = usePlayerStore()
const { data: gems, refresh } = await useFetch('/api/gem')

const equipSelected = ref<Partial<PlayerEquipment>>({})
const gemSelected = ref<PlayerGem>()

const viewGem = ref(false)
const gemsLength = ref(0)
const punchaLoading = ref(false)
const hasSelectedAction = ref(false)

$io.on('gem:mosaic:response', async (data) => {
  sendMessage(data.message, 3000)
  if (data.success) {
    refresh()
    await getPlayer()
    set(equipSelected, data.equipment)
  }
})

$io.on('gem:unmosaic:response', async (data) => {
  sendMessage(data.message, 3000)
  if (data.success) {
    refresh()
    await getPlayer()
    set(equipSelected, data.equipment)
  }
})

$io.on('gem:punchahole:response', (data) => {
  sendMessage(data.message, 2000)
  set(punchaLoading, false)
  if (data.success)
    set(equipSelected, data.equipment)
})

const reduceGemSlot = computed(() => {
  if (!equipSelected.value._id)
    return []

  return equipSelected.value.gemSlot! - gemsLength.value
})

const punchahole = () => {
  $io.off('equip:gem:preview')
  $io.off('gem:preview:response')
  $io.emit('equip:gem:preview', equipSelected.value._id)

  $io.on('gem:preview:response', (data) => {
    Dialog({
      title: 'Nhắc nhở',
      message: `Đục thêm 1 lỗ trên trang bi này cần ${data?.needPunchAHole} KNB đạo hữu có muốn thực hiện?`,
      confirmButtonText: 'Chắc chắn',
      cancelButtonText: 'Không chắc',
      closeOnClickOverlay: false,
      dialogClass: '!bg-black/70 text-white',
      confirmButtonColor: '#5388c1',
      confirmButtonTextColor: 'white',
      cancelButtonTextColor: '#5388c1',
      onConfirm: () => {
        set(punchaLoading, true)
        $io.emit('equip:gem:punchahole', equipSelected.value._id)
      },
    })
  })
}
const onmosaic = (gem: PlayerGem) => {
  $io.emit('gem:mosaic', equipSelected.value._id, gem._id)
  set(viewGem, false)
}

const unmosaic = (gem: PlayerGem, index: number) => {
  Dialog({
    title: 'Nhắc nhở',
    message: `Đạo hữu có chắc chắc gỡ ${gem.name} ra khỏi ${equipSelected.value.name}?`,
    confirmButtonText: 'Chắc chắn',
    cancelButtonText: 'Không chắc',
    closeOnClickOverlay: false,
    dialogClass: '!bg-black/70 text-white',
    confirmButtonColor: '#5388c1',
    confirmButtonTextColor: 'white',
    cancelButtonTextColor: '#5388c1',
    onConfirm: () => {
      $io.emit('gem:unmosaic', equipSelected.value._id, gem, index)
    },
  })
}

const showGemWithAction = (gem: PlayerGem) => {
  set(gemSelected, gem)
  set(viewGem, true)
  set(hasSelectedAction, true)
}

const showGemNormal = (gem: PlayerGem) => {
  set(gemSelected, gem)
  set(viewGem, true)
  set(hasSelectedAction, false)
}

const onmergeGems = () => {
  refresh()
  set(viewGem, false)
}

watch(equipSelected, (value) => {
  set(gemsLength, value.gems?.length ?? 0)
  // emits('equipSelected', value)
})

onUnmounted(() => {
  $io.off('gem:mosaic:response')
  $io.off('gem:unmosaic:response')
  $io.off('gem:preview:response')
  $io.off('gem:punchahole:response')
})
</script>

<template>
  <var-popup v-model:show="viewGem" position="center">
    <lazy-bag-gem-detail
      :gem="gemSelected"
      :select-action="hasSelectedAction"
      @selected="onmosaic"
      @mergegem="onmergeGems"
    />
  </var-popup>
  <div class="flex items-center justify-center w-[100vw] h-[70vh]">
    <div class="w-full h-full relative">
      <span class="font-bold absolute left-[calc(50%_-_50px)] top-[2px] text-[#656f99] text-12 w-25 flex justify-center">
        <slot name="title" />
      </span>
      <nuxt-img class="w-full h-full" format="webp" src="/common/bj_tongyong_1.png" />
      <div class="absolute top-[30px] flex flex-col gap-1 items-center justify-center w-full" />
      <div class="flex justify-between w-full absolute top-10 h-[85%]">
        <div class="flex flex-col gap-2 ml-2 w-[20%]">
          <div
            class="flex justify-center mx-1"
            :class="{
              'bg-black/10': slot1?._id === equipSelected?._id,
            }"
          >
            <item-rank
              v-if="slot1?.preview"
              class="w-[40px] h-[40px]"
              :quantity="0"
              :quality="slot1.quality"
              :rank="slot1.rank"
              :preview="slot1?.preview"
              @click.stop="equipSelected = slot1"
            />
            <div v-else class="w-[40px] h-[40px] bg-iconbg_0 bg-cover rounded" />
          </div>
          <div
            class="flex justify-center mx-1"
            :class="{
              'bg-black/10': slot2?._id === equipSelected?._id,
            }"
          >
            <item-rank
              v-if="slot2?.preview"
              class="w-[40px] h-[40px]"
              :quantity="0"
              :quality="slot2.quality"
              :rank="slot2.rank"
              :preview="slot2?.preview"
              @click.stop="equipSelected = slot2"
            />
            <div v-else class="w-[40px] h-[40px] bg-iconbg_0 bg-cover rounded" />
          </div>
          <div
            class="flex justify-center mx-1"
            :class="{
              'bg-black/10': slot3?._id === equipSelected?._id,
            }"
          >
            <item-rank
              v-if="slot3?.preview"
              class="w-[40px] h-[40px]"
              :quantity="0"
              :quality="slot3.quality"
              :rank="slot3.rank"
              :preview="slot3?.preview"
              @click.stop="equipSelected = slot3"
            />
            <div v-else class="w-[40px] h-[40px] bg-iconbg_0 bg-cover rounded" />
          </div>
          <div
            class="flex justify-center mx-1"
            :class="{
              'bg-black/10': slot4?._id === equipSelected?._id,
            }"
          >
            <item-rank
              v-if="slot4?.preview"
              class="w-[40px] h-[40px]"
              :quantity="0"
              :quality="slot4.quality"
              :rank="slot4.rank"
              :preview="slot4?.preview"
              @click.stop="equipSelected = slot4"
            />
            <div v-else class="w-[40px] h-[40px] bg-iconbg_0 bg-cover rounded" />
          </div>
          <div
            class="flex justify-center mx-1"
            :class="{
              'bg-black/10': slot5?._id === equipSelected?._id,
            }"
          >
            <item-rank
              v-if="slot5?.preview"
              class="w-[40px] h-[40px]"
              :quantity="0"
              :quality="slot5.quality"
              :rank="slot5.rank"
              :preview="slot5?.preview"
              @click.stop="equipSelected = slot5"
            />
            <div v-else class="w-[40px] h-[40px] bg-iconbg_0 bg-cover rounded" />
          </div>
          <div
            class="flex justify-center mx-1"
            :class="{
              'bg-black/10': slot6?._id === equipSelected?._id,
            }"
          >
            <item-rank
              v-if="slot6?.preview"
              class="w-[40px] h-[40px]"
              :quantity="0"
              :quality="slot6.quality"
              :rank="slot6.rank"
              :preview="slot6?.preview"
              @click.stop="equipSelected = slot6"
            />
            <div v-else class="w-[40px] h-[40px] bg-iconbg_0 bg-cover rounded" />
          </div>
          <div
            class="flex justify-center mx-1"
            :class="{
              'bg-black/10': slot7?._id === equipSelected?._id,
            }"
          >
            <item-rank
              v-if="slot7?.preview"
              class="w-[40px] h-[40px]"
              :quantity="0"
              :quality="slot7.quality"
              :rank="slot7.rank"
              :preview="slot7?.preview"
              @click.stop="equipSelected = slot7"
            />
            <div v-else class="w-[55px] h-[55px] bg-iconbg_0 bg-cover rounded" />
          </div>
          <div
            class="flex justify-center mx-1"
            :class="{
              'bg-black/10': slot8?._id === equipSelected?._id,
            }"
          >
            <item-rank
              v-if="slot8?.preview"
              class="w-[40px] h-[40px]"
              :quantity="0"
              :quality="slot8.quality"
              :rank="slot8.rank"
              :preview="slot8?.preview"
              @click.stop="equipSelected = slot8"
            />
            <div v-else class="w-[40px] h-[40px] bg-iconbg_0 bg-cover rounded" />
          </div>
        </div>
        <div class="w-[37%] bg-[#41737b] max-h-[100%] overflow-auto">
          <div class="text-white text-center text-12 pt-2 bg-[#0f6f7e] h-10">
            Đá khảm
          </div>
          <div
            v-if="equipSelected.gems && equipSelected.gems.length > 0"
            class="relative"
          >
            <gem-item
              v-for="(gem, i) in equipSelected.gems"
              :key="i"
              class="px-1 p-1 bg-black/40 mb-[1px]"
              :gem="gem"
              @click="showGemNormal(gem)"
            >
              <icon class="absolute right-1 text-gray-300" size="10" name="fa:close" @click.stop="unmosaic(gem, i)" />
            </gem-item>
          </div>
          <template v-if="reduceGemSlot > 0">
            <div
              v-for="i in reduceGemSlot"
              :key="i"
              class="flex items-center px-1 p-1 bg-black/40 mb-[1px]"
            >
              <img
                src="/gem/default.png"
                class="w-10 h-10 bg-black"
              >
              <span class="ml-2 text-white text-10"> (Chưa khảm) </span>
            </div>
          </template>
          <div class="text-center mt-2">
            <var-button :loading="punchaLoading" loading-type="cube" size="mini" class="!text-[#333] font-medium mx-2 m-auto" @click="punchahole">
              Đục lỗ
            </var-button>
          </div>
        </div>
        <div class="w-[37%] bg-[#41737b] mr-4 ml-[1px] max-h-[100%] overflow-auto">
          <div class="text-white text-center text-12 pt-2 bg-[#0f6f7e] h-10">
            Có thể khảm
          </div>
          <template v-if="equipSelected._id">
            <gem-item
              v-for="(gem, i) in gems"
              :key="i"
              class="px-1 p-1 bg-black/40 mb-[1px]"
              :gem="gem"
              @click="showGemWithAction(gem)"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
