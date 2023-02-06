<script setup lang="ts">
import { sendMessage } from '#imports'
import type { PlayerGem } from '~/types'
import { qualityPalette } from '~/common'
import { QUALITY_TITLE, SLOT_NAME } from '~/constants'

const props = defineProps<{
  gem: PlayerGem
  selectAction?: boolean
  sellAction?: boolean
  mergeGem?: boolean
}>()

const emits = defineEmits(['selected', 'mergegem', 'refresh'])
const { $io } = useNuxtApp()
const qualityTitle = computed(() => {
  return QUALITY_TITLE[props.gem.quality!]
})

$io.off('gem:merge:response')
$io.on('gem:merge:response', (data) => {
  sendMessage(data.message, 2000)
  if (data.success)
    emits('mergegem')
})
</script>

<template>
  <div
    position="relative"
    text="white"
    bg="primary"
    p="0"
    m="auto"
    border="white/40 1 rounded"
    w="11/12"
    font="leading-6"
  >
    <div
      display="flex"
      flex="col"
      align="items-center"
      justify="between"
      p="x-3 t-4"
      font="leading-5"
    >
      <div
        display="flex"
        w="full"
      >
        <div
          position="relative"
          w="15"
          h="15"
          m="r-2"
        >
          <nuxt-img
            position="absolute"
            top="0"
            format="webp"
            :src="`/quality_bg/iconbg_${gem.quality}.png`"
          />
          <nuxt-img
            position="absolute"
            border="rounded-full"
            object="cover"
            class="transform-center w-[80%] h-[80%]"
            format="webp"
            :src="`/gem/${gem.gemId}.png`"
          />
        </div>
        <div class="text-left">
          <p
            text="12"
            font="bold"
            :style="{ color: qualityPalette(gem.quality!) }"
          >
            {{ gem.name }}
          </p>
          <p
            v-if="gem.sum! > 0"
            text="10"
            font="bold"
          >
            Hiện có: {{ gem.sum }}
          </p>
        </div>
      </div>
    </div>
    <div
      text="12"
      border="t white/40"
      m="4"
      p="2"
    >
      <div
        display="flex"
      >
        <div
          w="25"
        >
          Vị trí:
        </div> {{ SLOT_NAME[gem.slot] }}
      </div>
      <div
        display="flex"
      >
        <div
          w="25"
        >
          Trưởng Thành:
        </div>
        {{ gem.rateOnLevel }}%
      </div>
      <div
        display="flex"
      >
        <div
          w="25"
        >
          Phẩm đá hồn :
        </div>
        <span
          :style="{
            color: qualityPalette(gem.quality!),
          }"
        >
          {{ qualityTitle }}
        </span>
      </div>
      <div
        display="flex"
      >
        <div
          w="25"
        >
          Thuộc tính:
        </div>
        <div
          display="flex"
          flex="col"
        >
          <gem-values :gem="gem" />
        </div>
      </div>
      <BagGemMergePreview
        :quality="gem.quality"
        :gem-id="gem.gemId"
      />
      <div
        text="center 10"
      >
        (Chỉ được khảm 1 đá hồn này lên trang bị)
      </div>
      <BagGemActions
        :sell-action="sellAction"
        :select-action="selectAction"
        :merge-action="mergeGem"
        :gem="gem"
      />
    </div>
  </div>
</template>
