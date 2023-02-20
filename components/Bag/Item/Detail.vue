<script setup lang="ts">
import { qualityPalette } from '~/common'
interface Prop {
  item: any
  sellAction?: boolean
}

const props = defineProps<Prop>()
const emits = defineEmits(['refresh'])
const { sid, fetchPlayer } = usePlayerStore()
const useItem = async () => {
  try {
    const res: any = await $fetch('/api/bag/use', {
      method: 'POST',
      body: {
        sid,
        itemId: props.item?.itemId,
        kind: props.item.props.kind,
        quantity: 1,
      },
    })

    sendNotification(res.statusMessage, 2000)
    emits('refresh')
    fetchPlayer()
  }
  catch (e: any) {
    sendNotification(e.statusMessage)
  }
}
</script>

<template>
  <div
    text="10"
    bg="primary"
    border="rounded"
    p="2"
    w="50"
    m="auto"
    :style="{
      border: `1px solid ${qualityPalette(item.props?.quality)}`,
    }"
  >
    <div class="mb-4">
      <div
        text="12 left"
        font="bold"
        :style="{
          color: qualityPalette(item.props?.quality),
        }"
      >
        {{ item.props.name }}
      </div>
      <div
        text="left"
        m="t-2"
      >
        {{ item.props.note }}
      </div>
    </div>
    <div class="text-center">
      <var-button
        v-if="item.props.kind === 3"
        class="mb-2 !text-[#333] font-semibold italic"
        size="mini"
        @click.stop="useItem"
      >
        Sử dụng
      </var-button>
    </div>
  </div>
</template>
