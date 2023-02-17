<script setup lang="ts">
import { set } from '@vueuse/core'
import { formatCash, playerTitle } from '~/common'
import { ItemToName } from '~/constants'
import { MIND_DHARMA_DES } from '~/config'
import type { MindDharmaResource } from '~/types'

const { $io } = useNuxtApp()
const { fetchPlayer } = usePlayerStore()
const { mindDharma, sid } = storeToRefs(usePlayerStore())

const resource = ref<MindDharmaResource>()

onMounted(() => {
  $io.emit('mind:dharma:resource', sid.value)
  $io.on('response:dharma:resource', (r: MindDharmaResource) => {
    set(resource, r)
  })

  $io.on('response:dharma:upgrade', (r: MindDharmaResource & { success: boolean; message: string }) => {
    if (!r.success) {
      sendMessage(r.message, 2000)
      return
    }

    set(resource, r)
    fetchPlayer()
  })
})

onUnmounted(() => {
  $io.off('response:dharma:resource')
})

const upgrade = (key: string) => {
  $io.emit('mind:dharma:upgrade', sid.value, key)
}
</script>

<template>
  <section
    w="full"
  >
    <div
      v-for="(mind, key) in mindDharma"
      :key="key"
      m="y-2"
      p="2"
      border="1 white/40 rounded"
      flex="~ "
      justify="between"
      align="items-center"
    >
      <div
        justify="between"
        align="items-center"
        flex="~ "
        w="3/4"
      >
        <div
          flex="~ col"
          border="r-1 white/20"
          p="x-1"
          w="50"
        >
          <div>
            {{ MIND_DHARMA_DES[key].title }}
            <span text="8">
              {{ playerTitle(mind.enhance, mind.enhance + 1).levelTitle }} {{ playerTitle(mind.enhance, mind.enhance + 1).floor }}
            </span>
          </div>
          <p
            text="8"
          >
            {{ MIND_DHARMA_DES[key].description }}
          </p>
        </div>
        <div
          text="center"
          w="1/2"
          font="bold"
        >
          (+{{ mind.main * mind.enhance }})
        </div>
      </div>
      <var-button
        size="small"
        font="bold"
        class="!text-[#333] !h-auto"
        @click.stop="upgrade(key)"
      >
        <div class="flex items-center justify-center flex-col">
          Đột phá
          <template v-if="resource">
            <div
              flex="~ col"
              font="bold"
            >
              <div
                v-for="k in Object.keys(resource[key])"
                :key="k"
                text="8"
              >
                {{ ItemToName[k] }}: {{ formatCash(resource[key][k]) }}
              </div>
            </div>
          </template>
        </div>
      </var-button>
    </div>
  </section>
</template>
