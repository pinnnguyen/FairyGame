<script setup lang="ts">
import { sendMessage, usePlayerStore } from '#imports'
import type { PlayerGem } from '~/types'
import { backgroundQuality, colorQuality } from '~/common'
import { QUALITY_TITLE } from '~/constants'
interface Prop {
  gem: PlayerGem
  selectAction?: boolean
  mergeGem?: boolean
}

const props = defineProps<Prop>()
const emits = defineEmits(['selected', 'mergegem'])
const { sid } = usePlayerStore()
const { $io } = useNuxtApp()

const qualityTitle = computed(() => {
  return QUALITY_TITLE[props.gem.quality]
})

const styleColorQuality = computed(() => {
  return colorQuality(props.gem.quality)
})

$io.on('gem:merge:response', (data) => {
  sendMessage(data.message, 2000)
  if (data.success)
    emits('mergegem')
})

const onmergeGems = (gem: PlayerGem) => {
  if (gem.sum < 3) {
    sendMessage('Số lượng đá hồn không đủ để hợp nhất', 2000)
    return
  }

  $io.emit('gem:merge', gem)
}
</script>

<template>
  <div
    class="relative text-xs leading-6 text-white rounded shadow-md p-0 bg-black/70"
  >
    <div
      class="flex flex-col items-center justify-between px-3 pt-4"
    >
      <div class="flex w-full">
        <item-rank
          class="w-15 mr-2"
          :quantity="0"
          preview="/gem/default.png"
          :quality="gem.quality"
        />
        <div>
          <p class="text-12 font-bold" :style="styleColorQuality">
            {{ gem.name }}
          </p>
          <p v-if="gem.sum > 0" class="text-10 font-bold">
            Hiện có: {{ gem.sum }}
          </p>
        </div>
      </div>
    </div>
    <div class="text-12 border-t border-white/40 m-4 p-2">
      <p>
        Vị trí : Tất cả
      </p>
      <div>
        Phẩm chất đá hồn : <span :style="styleColorQuality">{{ qualityTitle }}</span>
      </div>
      <div class="flex">
        <span class="mr-2">
          Thuộc tính:
        </span>
        <div class="flex flex-col">
          <div v-for="(g, index) in gem.values" :key="index" :style="styleColorQuality">
            <span v-if="gem.quality > 1">
              {{ g.name }} {{ Math.round(g.value * (gem.quality * gem.rateOnLevel)) }}
            </span>
            <span v-else>
              {{ g.name }} {{ g.value }}
            </span>
          </div>
        </div>
      </div>
      <div class="text-center mt-4 text-10">
        ________Ghép Đá Hồn________
      </div>
      <div class="mt-2 flex justify-between items-center gap-2 mb-2">
        <div class="flex items-center border border-white/40 p-1">
          <item-rank
            class="w-8 mr-2"
            :quantity="0"
            preview="/gem/default.png"
            :quality="gem.quality"
          />
          <span class="text-10 w-[25px]" :style="colorQuality(gem.quality)">
            {{ qualityTitle }}
            <br>
            x3
          </span>
        </div>
        <icon name="mdi:arrow-right-bold-outline" size="20" class="text-blue-300" />
        <div class="flex items-center border border-white/40 p-1">
          <item-rank
            class="w-8 mr-2"
            :quantity="0"
            preview="/gem/default.png"
            :quality="gem.quality + 1"
          />
          <span class="text-8 w-[25px]" :style="colorQuality(gem.quality + 1)">
            {{ QUALITY_TITLE[gem.quality + 1] }}
            <br>
            x3
          </span>
        </div>
        <icon name="mdi:arrow-right-bold-outline" size="20" class="text-blue-300" />
        <div class="flex items-center border border-white/40 p-1">
          <item-rank
            class="w-8 mr-2"
            :quantity="0"
            preview="/gem/default.png"
            :quality="gem.quality + 2"
          />
          <span class="text-8 w-[25px]" :style="colorQuality(gem.quality + 2)">
            {{ QUALITY_TITLE[gem.quality + 2] }}
            <br>
            x3
          </span>
        </div>
      </div>
      <div class="text-center py-2">
        <var-button
          v-if="selectAction"
          class="!text-[#333] font-medium mx-2"
          size="small"
          @click.stop="emits('selected', gem)"
        >
          Khảm đá
        </var-button>
        <var-button
          v-if="gem.sum >= 3"
          class="font-medium mx-2"
          type="danger"
          size="small"
          @click.stop="onmergeGems(gem)"
        >
          Ghép
        </var-button>
      </div>
    </div>
  </div>
</template>
