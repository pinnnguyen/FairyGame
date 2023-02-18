<script setup lang="ts">
import { set } from '@vueuse/core'
import { formatCash, playerTitle, randomNumber } from '~/common'
import { ItemToName, tips } from '~/constants'
import { MIND_DHARMA_DES } from '~/config'
import type { MindDharmaResource } from '~/types'

const { $io } = useNuxtApp()
const { getPlayer } = usePlayerStore()
const { mindDharma, sid, playerInfo } = storeToRefs(usePlayerStore())

const resource = ref<MindDharmaResource>()
const pending = ref(true)

onMounted(() => {
  $io.emit('mind:dharma:resource', sid.value)
  $io.on('response:dharma:resource', (r: MindDharmaResource) => {
    set(pending, false)
    set(resource, r)
  })

  $io.on('response:dharma:upgrade', (r: MindDharmaResource & { success: boolean; message: string }) => {
    console.log('r', r)
    getPlayer()

    // set(pending, false)
    if (!r.success) {
      sendMessage(r.message, 2000)
      return
    }

    set(resource, r)
  })
})

onUnmounted(() => {
  $io.off('response:dharma:upgrade')
  $io.off('response:dharma:resource')
})

const upgrade = (key: string) => {
  // set(pending, true)
  if (playerInfo.value && resource.value) {
    if (playerInfo.value.gold < resource.value[key].gold)
      return

    if (playerInfo.value.exp < resource.value[key].exp)
      return
  }

  $io.emit('mind:dharma:upgrade', sid.value, key)
}
</script>

<template>
  <var-loading
    :description="tips[Math.round(randomNumber(0, tips.length))]"
    size="mini"
    color="#ffffff"
    type="circle"
    :loading="pending"
    class="w-full"
  >
    <div v-if="pending" h="50" w="100" />
    <section
      v-else
      w="full"
    >
      <div
        v-for="(mind, key) in mindDharma"
        :key="key"
        m="y-2"
        p="3"
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
            </div>
            <div text="8">
              {{ playerTitle(mind.enhance, mind.enhance + 1).levelTitle }} {{ playerTitle(mind.enhance, mind.enhance + 1).floor }}
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
            {{ mind.main * mind.enhance }} <span text="green-500">(+{{ mind.main }})</span>
          </div>
        </div>
        <var-button
          size="small"
          font="bold"
          class="!text-[#333] !h-auto !w-20"
          @click.stop="upgrade(key)"
        >
          <div class="flex items-center justify-center flex-col">
            Đột phá
            <template v-if="resource">
              <div
                flex="~ col"
              >
                <div
                  v-for="k in Object.keys(resource[key])"
                  :key="k"
                  text="8"
                  font="bold"
                >
                  {{ ItemToName[k] }}: {{ formatCash(resource[key][k]) }}
                </div>
              </div>
            </template>
          </div>
        </var-button>
      </div>
    </section>
  </var-loading>
</template>
