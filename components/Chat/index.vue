<script setup lang="ts">
import { usePlayerStore } from '~/composables/usePlayer'
import { fromNow } from '~/common'

const { $io } = useNuxtApp()
const { playerInfo } = usePlayerStore()

const contents = ref<any>([])
const toggle = ref(false)
const chatContent = ref('')
const tab = ref('general')

$io.emit('get:chat:request')
$io.on('get:chat:response', (data: any) => {
  contents.value.push(...data)
})

$io.on('send:chat:response', (data: any) => {
  contents.value.unshift(data)
  contents.value.splice(contents.value.length - 1, 1)
})

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
  chatContent.value = ''
}
</script>

<template>
  <var-popup v-model:show="toggle" position="bottom">
    <div class="bg-[#1C160F]">
      <div class="py-2">
        <span
          :class="{
            '!opacity-100': tab === 'general',
          }"
          class="transition transition-opacity bg-[#41466e] opacity-40 text-white px-2 m-2 p-1 text-14 uppercase"
          @click="tab = 'general'"
        >
          Chung
        </span>
        <span
          :class="{
            '!opacity-100': tab !== 'general',
          }"
          class="transition transition-opacity bg-[#41466e] opacity-40 text-white px-2 m-2 p-1 text-14 uppercase"
          @click="tab = 'system'"
        >
          Hệ thống
        </span>
      </div>
      <div class="h-[70vh] w-[90%] m-auto relative overflow-auto">
        <div v-for="(content, index) in typeContents" :key="index" class="relative mb-7 flex justify-start items-center bg-[#332d27] m-2 p-2">
          <div
            class="text-white font-bold h-5 text-14 text-left mr-2 whitespace-nowrap"
            :class="{
              'text-[#f44336]': content.type === 'system',
            }"
          >
            [{{ content.name }}]
          </div>
          <span class="text-left text-12">
            {{ content.content }}
          </span>
          <p class="absolute bottom-[-10px] right-0 bg-black/60 rounded-lg text-10 px-2">
            {{ fromNow(new Date(content.createdAt).getTime()) }}
          </p>
        </div>
      </div>
      <div class="flex items-center justify-center p-4 pb-4">
        <var-input v-model="chatContent" class="mb-4" placeholder="Nhận cái gì đó.." />
        <icon name="ic:baseline-send" size="25" @click="sendChat" />
      </div>
    </div>
  </var-popup>
  <div class="h-12 bg-black/80 text-12 w-full flex items-center gap-2 p-2">
    <nuxt-img src="/bottom/menu/XJShare_07.png" format="webp" class="w-8" @click="toggle = true" />
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
        <span>
          {{ content.content }}
        </span>
      </div>
    </div>
  </div>
</template>
