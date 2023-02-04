<script setup lang="ts">
import { set } from '@vueuse/core'
import { usePlayerStore } from '~/composables/usePlayer'
import { fromNow } from '~/common'

const { $io } = useNuxtApp()
const { playerInfo, sid } = usePlayerStore()

const tab = ref('general')
const contents = ref<any>([])
const chatContent = ref('')
const mails = ref([])
const toggle = reactive({
  chat: false,
  mail: false,
})

$io.emit('get:chat:request')
$io.emit('get:mail', sid)
setInterval(() => {
  $io.emit('get:mail', sid)
}, 10000)

$io.off('mail:response')
$io.on('mail:response', (response) => {
  set(mails, response)
})

const mailUnread = computed(() => {
  return mails.value.filter((m: any) => {
    return !m.isRead
  })
})

$io.off('get:chat:response')
$io.on('get:chat:response', (data: any) => {
  contents.value.push(...data)
})

$io.off('send:chat:response')
$io.on('send:chat:response', (data: any) => {
  contents.value.unshift(data)
  contents.value.splice(contents.value.length - 1, 1)
})

$io.off('chat:system')
$io.on('chat:system', (data: any) => {
  if (!contents.value.find((i: any) => data._id === i._id))
    contents.value.unshift(data)

  contents.value.splice(contents.value.length - 1, 1)
})

const typeContents = computed(() => {
  if (tab.value === 'system')
    return contents.value.filter((i: any) => i.type === 'system')

  return contents.value
})

const sendChat = () => {
  $io.emit('send:chat', playerInfo?.sid, playerInfo?.name, chatContent.value)
  set(chatContent, '')
}

const openMail = () => {
  toggle.mail = true
}
</script>

<template>
  <var-popup v-model:show="toggle.chat" position="bottom">
    <div class="bg-[#191b1e]">
      <div class="py-2 text-center">
        <span
          :class="{
            '!opacity-100': tab === 'general',
          }"
          class="transition transition-opacity bg-[#ffffff] text-[#333] opacity-40 text-white px-2 m-2 p-1 text-14 uppercase"
          @click="tab = 'general'"
        >
          Chung
        </span>
        <span
          :class="{
            '!opacity-100': tab !== 'general',
          }"
          class="transition transition-opacity bg-[#ffffff] text-[#333] opacity-40 text-white px-2 m-2 p-1 text-14 uppercase"
          @click="tab = 'system'"
        >
          Hệ thống
        </span>
      </div>
      <div class="h-[50vh] w-[90%] m-auto relative overflow-auto">
        <div
          v-for="(content, index) in typeContents"
          :key="index"
          class="relative mb-7 flex justify-start items-center bg-[#332d27] m-2 p-2"
        >
          <div
            class="text-white font-bold h-5 text-14 text-left mr-2 whitespace-nowrap"
            :class="{
              'text-[#f44336]': content.type === 'system',
            }"
          >
            [{{ content.name }}]
          </div>
          <span class="text-left text-12 text-white">
            {{ content.content }}
          </span>
          <p class="absolute bottom-[-10px] right-0 bg-black/60 rounded-lg text-10 px-2 text-white">
            {{ fromNow(new Date(content.createdAt).getTime()) }}
          </p>
        </div>
      </div>
      <div class="flex items-center justify-center p-4 pb-4">
        <var-input v-model="chatContent" class="mb-4" placeholder="Nhận cái gì đó.." />
        <icon class="text-white" name="ic:baseline-send" size="25" @click="sendChat" />
      </div>
    </div>
  </var-popup>
  <var-popup v-model:show="toggle.mail" position="center">
    <Mail :mails="mails" />
  </var-popup>
  <div class="h-12 bg-black/80 text-12 w-full flex items-center justify-between gap-2 p-2 fixed bottom-0 border-t border-white/10">
    <button class="h-8 w-8 rounded text-12 italic font-semibold border-1 text-primary rounded-full border-white/40 bg-button-menu" @click="toggle.chat = true">
      <span class="">Giao lưu</span>
    </button>
    <div class="h-12 overflow-auto text-left">
      <div v-for="content in typeContents" :key="content._id">
        <span
          class="font-bold" :class="{
            'text-[#f44336]': content.type === 'system',
          }"
        >
          [{{ content.name }}]
        </span>
        :
        <span class="text-white">
          {{ content.content }}
        </span>
      </div>
    </div>
    <div class="relative">
      <button class="h-8 w-8 rounded text-12 italic font-semibold border-1 text-primary rounded-full border-white/40 bg-button-menu" @click="openMail">
        <span class="">Thư <span class="text-10">({{ mailUnread.length }})</span></span>
      </button>
    </div>
  </div>
</template>
