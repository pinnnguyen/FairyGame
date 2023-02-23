<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Dialog } from '@varlet/ui'
import { set } from '@vueuse/core'
import { slotToName } from '~/constants'
import { usePlayerSlot } from '~/composables/usePlayerSlot'
import type { PlayerEquipment, PlayerGem } from '~/types'
import { sendNotification, usePlayerStore } from '#imports'
import { qualityPalette } from '~/common'

const emits = defineEmits(['equipSelected'])
const { $io } = useNuxtApp()

const { slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8, leftSlots, rightSlots } = storeToRefs(usePlayerSlot())
const { getSlotEquipUpgrade } = usePlayerSlot()

const { getPlayer } = usePlayerStore()
const equipSelected = ref<Partial<PlayerEquipment>>({})
const gems = ref<PlayerGem[]>([])

const gemSelected = ref<PlayerGem>()
const viewGem = ref(false)
const gemsLength = ref(0)
const punchaLoading = ref(false)
const hasSelectedAction = ref(false)

const getGems = async () => {
  if (!equipSelected.value.slot)
    return

  gems.value = await $fetch('/api/gem', {
    params: {
      slot: equipSelected.value.slot,
    },
  })
}

$io.on('gem:mosaic:response', async (data) => {
  sendNotification(data.message, 3000)
  if (data.success) {
    await getGems()
    await getPlayer()
    set(equipSelected, data.equipment)
  }
})

$io.on('gem:unmosaic:response', async (data) => {
  sendNotification(data.message, 3000)
  if (data.success) {
    await getGems()
    await getPlayer()
    set(equipSelected, data.equipment)
  }
})

$io.on('gem:punchahole:response', (data) => {
  sendNotification(data.message, 2000)
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

  $io.on('gem:preview:response', (data: any) => {
    Dialog({
      title: 'Nhắc nhở',
      message: `Đục thêm 1 lỗ trên trang bi này cần ${data?.needPunchAHole} KNB đạo hữu có muốn thực hiện?`,
      confirmButtonText: 'Chắc chắn',
      cancelButtonText: 'Không chắc',
      closeOnClickOverlay: false,
      dialogClass: '!bg-[#00000040] text-white',
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
  console.log('gem', gem)
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
    dialogClass: '!bg-[#00000040] text-white',
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
const onmergeGems = async () => {
  await getGems()
  set(viewGem, false)
}
watch(equipSelected, async (value) => {
  set(gemsLength, value.gems?.length ?? 0)
  await getGems()
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
    <lazy-gem-detail
      :gem="gemSelected"
      :onmosaic-action="hasSelectedAction"
      @onmosaic="onmosaic"
      @mergegem="onmergeGems"
    />
  </var-popup>
  <div class="flex-center bg-[#191b1e] max-w-[60vh] h-[70vh] m-auto">
    <div class="w-full h-full relative border-t border-white/10">
      <span class="font-bold absolute left-[calc(50%_-_50px)] top-2 text-white text-12 w-25 flex justify-center">
        <slot name="title" />
      </span>
      <div class="flex justify-between w-full absolute top-10 h-[85%]">
        <div class="flex flex-col gap-2 ml-2 w-[20%] h-full overflow-auto">
          <div
            v-for="leftS in leftSlots"
            :key="leftS.no"
          >
            <button
              v-if="leftS?.slot"
              class="diamond w-15"
              :class="{
                'border border-green-500 bg-[#000000]': equipSelected?._id === leftS.slot?._id,
              }"
              @click.stop="equipSelected = leftS.slot"
            >
              <div class="text-10 font-bold italic">
                {{ leftS.slot?.name }}(+{{ leftS.slot?.enhance }})
              </div>
            </button>
            <button
              v-else
              class="diamond w-15"
            >
              <div class="text-10 font-bold italic">
                {{ slotToName[leftS.no] }}
                <div class="text-8 whitespace-nowrap">
                  (Trống)
                </div>
              </div>
            </button>
          </div>
          <div
            v-for="rightS in rightSlots"
            :key="rightS.no"
          >
            <button
              v-if="rightS?.slot"
              class="diamond w-15"
              :class="{
                'border border-green-500 bg-green-500': equipSelected?._id === rightS.slot?._id,
              }"
              :style="{
                border: `1px solid ${qualityPalette(rightS.slot?.quality)}`,
              }"
              @click.stop="equipSelected = rightS.slot"
            >
              <div class="text-10 font-bold italic">
                {{ rightS.slot?.name }}(+{{ rightS.slot?.enhance }})
              </div>
            </button>
            <button
              v-else
              class="diamond w-15"
            >
              <div class="text-10 font-bold italic">
                {{ slotToName[rightS.no] }}
                <div class="text-8 whitespace-nowrap">
                  (Trống)
                </div>
              </div>
            </button>
          </div>
        </div>
        <div class="w-[37%] border-x border-white/10 max-h-[100%] overflow-auto">
          <div class="text-white text-center text-12 pt-2 border-b border-white/10 h-10">
            Đá khảm
          </div>
          <div
            v-if="equipSelected.gems && equipSelected.gems.length > 0"
            class="relative"
          >
            <gem-item
              v-for="(gem, i) in equipSelected.gems"
              :key="i"
              class="px-1 p-1 bg-[#00000040] mb-[1px]"
              bg-class="!w-10 !h-10"
              :gem="gem"
              @click="showGemNormal(gem)"
            >
              <icon class="absolute right-2 text-gray-300" size="10" name="fa:close" @click.stop="unmosaic(gem, i)" />
            </gem-item>
          </div>
          <template v-if="reduceGemSlot > 0">
            <div
              v-for="i in reduceGemSlot"
              :key="i"
              class="flex items-center px-1 p-1 bg-[#00000040] mb-[1px] border border-white/20 m-2"
            >
              <nuxt-img
                src="/gem/default.png"
                class="w-10 h-10 bg-[#000000]"
                format="webp"
              />
              <span class="ml-2 text-primary text-8"> (Chưa khảm) </span>
            </div>
          </template>
          <div class="text-center mt-2">
            <var-button
              v-if="equipSelected._id"
              :loading="punchaLoading"
              loading-type="cube"
              size="mini"
              class="!text-[#333] font-medium mx-2 m-auto italic"
              @click="punchahole"
            >
              Đục lỗ
            </var-button>
          </div>
        </div>
        <div class="w-[37%] mr-4 ml-[1px] max-h-[100%] overflow-auto">
          <div class="text-white text-center text-12 pt-2 h-10 border-b border-white/10">
            Có thể khảm
          </div>
          <template v-if="equipSelected._id">
            <gem-item
              v-for="(gem, i) in gems"
              :key="i"
              class="px-1 m-1 p-1 bg-[#00000040] mb-[1px] border border-white/20"
              bg-class="!w-10 !h-10"
              :gem="gem"
              @click="showGemWithAction(gem)"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
