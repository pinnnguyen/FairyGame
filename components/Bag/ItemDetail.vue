<script setup lang="ts">
import { sendMessage, usePlayerStore } from '#imports'
import { backgroundQuality } from '~/common'
interface Prop {
  itemId: number
  kind: number
  info: string
  name: string
  rank: number
  preview: string
  quality: number
}

const props = defineProps<Prop>()
const { sid } = usePlayerStore()

const styles = computed(() => {
  return backgroundQuality(props.rank)
})

const useItem = async () => {
  try {
    const res = await $fetch('/api/bag/use', {
      method: 'POST',
      body: {
        sid,
        itemId: props.itemId,
        kind: props.kind,
        quantity: 1,
      },
    })

    sendMessage(res.statusMessage, 1500)
  }
  catch (e: any) {
    sendMessage(e.statusMessage)
  }
}
</script>

<template>
  <div
    class="relative text-xs leading-5 text-white rounded shadow-md p-0 w-[320px]"
    :style="styles"
  >
    <div class="p-3">
      <div class="flex flex-col items-center justify-between mb-4">
        <div class="flex items-center justify-center">
          <item-rank
            class="w-15"
            :quantity="0"
            :rank="rank"
            :preview="preview"
            :quality="quality"
          />
        </div>
        <div class="mt-2">
          <div class="text-12 font-bold uppercase text-center">
            {{ name }}
          </div>
          <div class="text-12 border border-white p-4 rounded max-w-[270px]">
            {{ info }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <var-button
        v-if="kind === 3"
        class="mb-2 !text-[#333] font-medium uppercase font-semibold"
        color="#ffd400"
        size="small"
        @click.stop="useItem"
      >
        Sử dụng
      </var-button>
    </div>
  </div>
</template>
