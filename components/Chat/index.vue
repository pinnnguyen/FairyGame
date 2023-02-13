<script setup lang="ts">
import { set } from '@vueuse/core'
import { usePlayerStore } from '~/composables/usePlayer'
import { fromNow } from '~/common'

const props = defineProps<{
  contents?: any
}>()

const { $io } = useNuxtApp()
const { playerInfo, sid } = usePlayerStore()
const playerPreviewOptions = reactive<any>({
  sid: '',
  toggle: false,
})

const chatContent = ref('')
const tab = ref('general')
const menus = [
  {
    key: 'general',
    name: 'Cộng đồng',
  },
  {
    key: 'system',
    name: 'Hệ thống',
  },
]

const contentByType = computed(() => {
  if (tab.value === 'system')
    return props.contents.filter((i: any) => i.type === 'system')

  return props.contents
})

const previewPlayer = async (sid: string) => {
  if (!sid)
    return

  playerPreviewOptions.toggle = true
  playerPreviewOptions.sid = sid
}

const sendChat = () => {
  $io.emit('send:chat', playerInfo?.sid, playerInfo?.name, chatContent.value)
  set(chatContent, '')
}
</script>

<template>
  <var-popup v-model:show="playerPreviewOptions.toggle">
    <player-preview
      :sid="playerPreviewOptions.sid"
    />
  </var-popup>
  <div class="h-[50vh] mx-2 relative overflow-auto">
    <section class="py-2 text-left">
      <button
        v-for="menu in menus"
        :key="menu.key"
        transition="~ opacity duration-700"
        m="x-2"
        w="16"
        h="6"
        font="semibold"
        border="1 white/40 rounded"
        text="primary space-nowrap 8"
        opacity="60"
        :class="{
          '!opacity-100': tab === menu.key,
        }"
        @click.stop="tab = menu.key"
      >
        {{ menu.name }}
      </button>
    </section>
    <section
      v-for="(content, index) in contentByType"
      :key="index"
      class="relative mb-5 flex justify-start items-center rounded bg-primary m-2 p-3"
      @click.stop="previewPlayer(content.sid)"
    >
      <div
        class="text-[#6ce8d4] font-bold text-10 text-left mr-2 whitespace-nowrap"
        :class="{
          'text-[#f44336]': content.type === 'system',
        }"
      >
        [{{ content.name }}]
      </div>
      <div class="text-left text-10 text-white">
        {{ content.content }}
      </div>
      <p class="absolute bottom-[-10px] right-0 bg-[#00000040] rounded-lg text-8 px-2 text-white">
        {{ fromNow(new Date(content.createdAt).getTime()) }}
      </p>
    </section>
  </div>
  <div class="flex-center p-4 pb-4">
    <var-input v-model="chatContent" class="mb-4" placeholder="Nhập nội dung..." text-color="#ffffff" focus-color="#fff" />
    <icon class="text-white" name="ic:baseline-send" size="25" @click="sendChat" />
  </div>
</template>
