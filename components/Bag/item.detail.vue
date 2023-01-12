<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { sendMessage, usePlayerStore } from '#imports'
interface Prop {
  itemId: number
  kind: number
  info: string
  name: string
  rank: number
  preview: string
}

const props = defineProps<Prop>()
const emits = defineEmits(['close', 'useItem'])
const target = ref(null)
const { sid } = usePlayerStore()

onClickOutside(target, () => {
  emits('close')
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

    console.log('res', res)
    sendMessage(res.statusMessage, 1500)
    emits('useItem')
  }
  catch (e: any) {
    sendMessage(e.statusMessage)
  }
}
</script>

<template>
  <Blocker class="z-99">
    <div ref="target" class="relative text-xs leading-6 text-white bg-[#1d160e] border border-[#926633] rounded shadow-md p-0 w-[320px]">
      <div class="p-3">
        <div class="flex flex-col items-center justify-between mb-4">
          <div class="flex items-center justify-center">
            <ItemRank class="w-15" :quantity="0" :rank="rank" :preview="preview" />
          </div>
          <div class="mt-2">
            <span class="text-12">
              {{ name }}
            </span>
            <div class="text-12 bg-[#886131] p-4 rounded max-w-[270px]">
              {{ info }}
            </div>
          </div>
        </div>
      </div>
      <var-button v-if="kind === 3" class="mb-2" type="default !text-[#333] font-medium" size="small" @click.stop="useItem">
        Sử dụng
      </var-button>
    </div>
  </Blocker>
</template>
