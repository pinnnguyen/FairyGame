<script setup lang="ts">
import { sendMessage, usePlayerStore } from '#imports'
import type { PlayerGem } from '~/types'
import { colorQuality, qualityPalette } from '~/common'
import { QUALITY_TITLE, SLOT_NAME } from '~/constants'
interface Prop {
  gem: PlayerGem
  selectAction?: boolean
  sellAction?: boolean
  mergeGem?: boolean
}

const props = defineProps<Prop>()
const emits = defineEmits(['selected', 'mergegem', 'refresh'])
const { sid } = usePlayerStore()
const { $io } = useNuxtApp()
const sellPopup = ref(false)
const sellOptions = ref<any>({
  price: 0,
  quantity: 0,
})

const qualityTitle = computed(() => {
  return QUALITY_TITLE[props.gem.quality!]
})

$io.off('gem:merge:response')
$io.on('gem:merge:response', (data) => {
  sendMessage(data.message, 2000)
  if (data.success)
    emits('mergegem')
})

const onmergeGems = (gem: PlayerGem) => {
  if (gem.sum! < 3) {
    sendMessage('Số lượng đá hồn không đủ để hợp nhất', 2000)
    return
  }

  $io.emit('gem:merge', gem)
}

const sell = async () => {
  if (sellOptions.value.price <= 0) {
    sendMessage('Giá treo bán không hợp lệ')
    return
  }

  if (sellOptions.value.quantity <= 0 || sellOptions.value.quantity > props.gem.sum!) {
    sendMessage('Số lượng treo bán không hợp lệ')
    return
  }

  try {
    const sellRes: {
      success: boolean
      message: string
    } = await $fetch('/api/market/sell', {
      method: 'POST',
      body: {
        type: 'gem',
        quantity: sellOptions.value.quantity,
        price: sellOptions.value.price,
        _id: props.gem._id,
      },
    })

    if (sellRes.success) {
      emits('refresh')
      sendMessage(sellRes.message)
    }
  }
  catch (e: any) {
    sendMessage(e.statusMessage)
  }
}
</script>

<template>
  <var-popup
    v-if="sellPopup"
    v-model:show="sellPopup"
    position="bottom"
  >
    <div
      p="4"
    >
      <var-input v-model="sellOptions.price" type="number" placeholder="Nhập giá bán" />
      <var-input v-model="sellOptions.quantity" type="number" placeholder="Nhập số lượng" />
    </div>
    <div
      text="center"
      p="y-4"
    >
      <var-button
        font="medium"
        m="x-2"
        class="!text-[#333]"
        size="small"
        @click.stop="sell"
      >
        Treo bán
      </var-button>
    </div>
  </var-popup>
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
            color: qualityPalette(gem.quality),
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
      <Line
        p="y-2"
      >
        <div
          white-space="nowrap"
        >
          Ghép Đá Hồn
        </div>
      </Line>
      <div
        m="t-2 b-2"
        display="flex"
        justify="between"
        align="items-center"
        gap="2"
      >
        <div
          display="flex"
          align="items-center"
          border="white/20 1"
          p="2"
        >
          <div
            position="relative"
            w="10"
            h="10"
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
              class=" transform-center w-[80%] h-[80%]"
              format="webp"
              :src="`/gem/${gem.gemId}.png`"
            />
          </div>
          <span
            text="8"
            w="2"
            :style="colorQuality(gem.quality)"
          >
            {{ qualityTitle }}
            <br>
            x3
          </span>
        </div>
        <icon
          name="mdi:arrow-right-bold-outline"
          size="20"
          text="blue-300"
        />
        <div
          display="flex"
          align="items-center"
          border="white/20 1"
          p="2"
        >
          <div
            position="relative"
            w="10"
            h="10"
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
          <span
            text="8"
            class="w-[25px]"
            :style="colorQuality(gem.quality + 1)"
          >
            {{ QUALITY_TITLE[gem.quality + 1] }}
            <br>
            x3
          </span>
        </div>
        <icon name="mdi:arrow-right-bold-outline" size="20" class="text-blue-300" />
        <div
          display="flex"
          align="items-center"
          border="white/20 1"
          p="2"
        >
          <div
            position="relative"
            w="10"
            h="10"
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
          <span
            text="8"
            class="w-[25px]" :style="colorQuality(gem.quality + 2)"
          >
            {{ QUALITY_TITLE[gem.quality + 2] }}
            <br>
            x3
          </span>
        </div>
      </div>
      <div
        text="center 10"
      >
        (Chỉ được khảm 1 đá hồn này lên trang bị)
      </div>
      <div
        text="center"
        p="y-2"
      >
        <var-button
          v-if="sellAction"
          font="semibold italic"
          m="x-2"
          class="!text-[#333]"
          size="small"
          @click.stop="sellPopup = true"
        >
          Treo bán
        </var-button>
        <var-button
          v-if="selectAction"
          font="semibold italic"
          m="x-2"
          class="!text-[#333]"
          size="small"
          @click.stop="emits('selected', gem)"
        >
          Khảm đá
        </var-button>
        <var-button
          v-if="gem.sum >= 3"
          font="semibold italic"
          m="x-2"
          class="!text-[#333]"
          size="small"
          @click.stop="onmergeGems(gem)"
        >
          Ghép đá
        </var-button>
      </div>
    </div>
  </div>
</template>
