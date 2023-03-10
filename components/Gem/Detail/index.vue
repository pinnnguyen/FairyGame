<script setup lang="ts">
import { sendNotification } from '#imports'
import type { PlayerGem } from '~/types'
import { qualityPalette } from '~/common'
import { qualityToName, slotToName } from '~/constants'

const props = defineProps<{
  gem: PlayerGem
  onmosaicAction?: boolean
  sellAction?: boolean
  mergeGem?: boolean
}>()

const emits = defineEmits(['onmosaic', 'mergegem', 'refresh'])
const { $io } = useNuxtApp()
const qualityTitle = computed(() => {
  return qualityToName[props.gem.quality!]
})

$io.off('gem:merge:response')
$io.on('gem:merge:response', (data) => {
  sendNotification(data.message, 2000)
  if (data.success)
    emits('mergegem')
})

const onmosaic = (gem: PlayerGem) => {
  emits('onmosaic', gem)
}
</script>

<template>
  <div
    v-if="gem"
    pos="relative"
    text="white"
    bg="primary"
    p="0"
    m="auto"
    border="white/40 1 rounded"
    w="11/12"
    font="leading-6"
  >
    <div
      flex="~ col"
      align="items-center"
      justify="between"
      p="x-3 t-4"
      font="leading-5"
    >
      <div
        flex="~ "
        w="full"
      >
        <div
          pos="relative"
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
            :style="{ color: qualityPalette(gem.quality) }"
          >
            {{ gem.name }}
          </p>
          <p
            v-if="gem.sum > 0"
            text="10"
            font="bold"
          >
            Hiện có: {{ gem.sum }}
          </p>
        </div>
      </div>
    </div>
    <div
      text="10"
      border="t white/40"
      m="4"
      p="2"
    >
      <div
        flex="~ "
      >
        <div
          w="25"
        >
          Vị trí:
        </div> {{ slotToName[gem.slot] }}
      </div>
      <div
        flex="~ "
      >
        <div
          w="25"
        >
          Trưởng Thành:
        </div>
        {{ gem.rateOnLevel }}%
      </div>
      <div
        flex="~ "
      >
        <div
          w="25"
        >
          Phẩm đá hồn :
        </div>
        <span
          :style="{
            color: qualityPalette(gem.quality),
          }"
        >
          {{ qualityTitle }}
        </span>
      </div>
      <div
        flex="~ "
      >
        <div
          w="25"
        >
          Thuộc tính:
        </div>
        <div
          flex="~ col"
        >
          <gem-values :gem="gem" />
        </div>
      </div>
      <gem-merge-preview
        :quality="gem.quality"
        :gem-id="gem.gemId"
      />
      <div
        text="center 10"
      >
        (Chỉ được khảm 1 đá hồn này lên trang bị)
      </div>
      <gem-actions
        :sell-action="sellAction"
        :onmosaic-action="onmosaicAction"
        :merge-action="mergeGem"
        :gem="gem"
        @onmosaic="onmosaic"
      />
    </div>
  </div>
</template>
