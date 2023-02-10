<script setup lang="ts">
import { set } from '@vueuse/core'
import { usePlayerStore } from '~/composables/usePlayer'

const { $io } = useNuxtApp()
const { playerInfo, sid } = usePlayerStore()
const mails = ref([])
const toggle = reactive({
  exchange: false,
  mail: false,
})

const contents = ref<any>([])
const exchangeTabState = ref('chat')
const exchangeTabs = [
  {
    key: 'chat',
    name: 'Trò chuyện',
  },
  {
    key: 'mail',
    name: 'Thư',
  },
  {
    key: 'friend',
    name: 'Đạo hữu',
  },
  {
    key: 'settings',
    name: 'Thiết lập',
  },
]

$io.emit('get:chat:request')
$io.emit('get:mail', sid)
setInterval(() => {
  $io.emit('get:mail', sid)
}, 10000)

$io.off('mail:response')
$io.on('mail:response', (response) => {
  set(mails, response)
})

// $io.off('get:chat:response')
$io.on('get:chat:response', (data: any) => {
  console.log('data', data)
  contents.value.push(...data)
})

// $io.off('send:chat:response')
$io.on('send:chat:response', (data: any) => {
  contents.value.unshift(data)
  contents.value.splice(contents.value.length - 1, 1)
})

// $io.off('chat:system')
$io.on('chat:system', (data: any) => {
  console.log(data)
  if (!contents.value.find((i: any) => data._id === i._id)) {
    contents.value.unshift(data)
    contents.value.splice(contents.value.length - 1, 1)
  }
})
</script>

<template>
  <var-popup v-if="toggle.exchange" v-model:show="toggle.exchange" position="bottom">
    <div
      class="bg-[#000000] overflow-hidden max-w-[70vh] h-[70vh]"
      border="1 green-300/40"
      m="auto"
    >
      <div m="x-2" p="y-2 t-4">
        <button
          v-for="exchangeTab in exchangeTabs"
          :key="exchangeTab.key"
          transition="~ opacity duration-700"
          m="x-2"
          w="16"
          h="8"
          font="semibold"
          border="1 white/40 rounded"
          text="primary space-nowrap 10"
          opacity="60"
          :class="{ '!opacity-100 !text-green-400': exchangeTab.key === exchangeTabState }"
          @click.stop="exchangeTabState = exchangeTab.key"
        >
          {{ exchangeTab.name }}
        </button>
      </div>
      <chat v-if="exchangeTabState === 'chat'" :contents="contents" />
      <mail v-if="exchangeTabState === 'mail'" :mails="mails" />
      <settings v-if="exchangeTabState === 'settings'" />
    </div>
  </var-popup>
  <div class="max-w-[70vh] h-12 bg-[#000000] text-12 w-full flex items-center justify-between gap-2 p-2 fixed bottom-0 border-t border-white/10">
    <button class="h-8 w-8 text-12 italic font-semibold border-full-box bg-button-menu" @click="toggle.exchange = true">
      <span class="">Giao lưu</span>
    </button>
    <div class="h-12 w-full overflow-auto text-left">
      <div v-for="content in contents" :key="content._id">
        <span
          class="font-bold text-10 text-[#6ce8d4]" :class="{
            'text-[#f44336]': content.type === 'system',
          }"
        >
          [{{ content.name }}]
        </span>
        :
        <span class="text-white text-10">
          {{ content.content }}
        </span>
      </div>
    </div>
  </div>
</template>
