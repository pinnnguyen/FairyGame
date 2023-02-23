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
    key: 'rank',
    name: 'Tiên bảng',
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

const onReadMail = () => {
  $io.emit('get:mail', sid)
}

const mailsUnRead = computed(() => {
  return mails.value.filter((v: any) => {
    return !v.isRead
  })
})
</script>

<template>
  <var-popup v-model:show="toggle.exchange" position="bottom">
    <section
      class="bg-[#000000] overflow-hidden max-w-[70vh] h-[70vh]"
      border="t-1 green-300/40"
      m="auto"
    >
      <div
        m="x-2"
        p="y-2 t-4"
      >
        <button
          v-for="exchangeTab in exchangeTabs"
          :key="exchangeTab.key"
          transition="~ opacity duration-700"
          m="x-2 y-1"
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
          <template v-if="exchangeTab.key === 'mail'">
            ({{ mailsUnRead.length }})
          </template>
        </button>
      </div>
      <chat v-if="exchangeTabState === 'chat'" :contents="contents" />
      <mail v-if="exchangeTabState === 'mail'" :mails="mails" @read="onReadMail" />
      <settings v-if="exchangeTabState === 'settings'" />
      <rank v-if="exchangeTabState === 'rank'" />
    </section>
  </var-popup>
  <div
    h="12"
    max-w="[70vh]"
    bg="[#000000]"
    text="12"
    w="full"
    flex="~ "
    align="items-center"
    justify="between"
    gap="2"
    p="2"
    border="1 white/10"
    pos="fixed"
    bottom="0"
  >
    <button
      class="border-full-box bg-button-menu"
      h="8"
      w="8"
      text="12"
      font="semibold italic"
      pos="relative"
      @click="toggle.exchange = true"
    >
      <div
        pos="absolute"
        class="transform-center"
      >
        Giao lưu
      </div>
    </button>
    <section class="h-12 w-full overflow-auto text-left">
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
    </section>
  </div>
</template>
