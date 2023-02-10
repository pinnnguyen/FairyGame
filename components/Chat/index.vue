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
  payload: {},
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

  try {
    playerPreviewOptions.toggle = true
    playerPreviewOptions.payload = await $fetch(`/api/player?sid=${sid}`)
    console.log('player', playerPreviewOptions.payload)
  }
  catch (e) {
    console.error(e)
  }
}

const playerPayload = computed(() => playerPreviewOptions.payload.player)
const equipments = computed(() => playerPreviewOptions.payload.equipments)

const slot1 = computed(() => equipments.value?.find((e: { slot: number }) => e.slot === 1))
const slot2 = computed(() => equipments.value?.find((e: { slot: number }) => e.slot === 2))

const slot3 = computed(() => equipments.value?.find((e: { slot: number }) => e.slot === 3))
const slot4 = computed(() => equipments.value?.find((e: { slot: number }) => e.slot === 4))

const slot5 = computed(() => equipments.value?.find((e: { slot: number }) => e.slot === 5))
const slot6 = computed(() => equipments.value?.find((e: { slot: number }) => e.slot === 6))

const slot7 = computed(() => equipments.value?.find((e: { slot: number }) => e.slot === 7))
const slot8 = computed(() => equipments.value?.find((e: { slot: number }) => e.slot === 8))

const leftSlots = computed(() => {
  return [
    {
      no: 1,
      slot: slot1.value,
    },
    {
      no: 2,
      slot: slot2.value,
    },
    {
      no: 3,
      slot: slot3.value,
    },
    {
      no: 4,
      slot: slot4.value,
    },
  ]
})

const rightSlots = computed(() => {
  return [
    {
      no: 5,
      slot: slot5.value,
    },
    {
      no: 6,
      slot: slot6.value,
    },
    {
      no: 7,
      slot: slot7.value,
    },
    {
      no: 8,
      slot: slot8.value,
    },
  ]
})

const sendChat = () => {
  $io.emit('send:chat', playerInfo?.sid, playerInfo?.name, chatContent.value)
  set(chatContent, '')
}
</script>

<template>
  <var-popup v-model:show="playerPreviewOptions.toggle">
    <div
      bg="primary"
      pos="relative"
      text="10 primary"
      font="semibold"
      class="w-[calc(100vw_-_30px)] border-box"
      h="120"
    >
      <player-equip-tab
        v-if="playerPayload"
        :name="playerPayload.name"
        :level="playerPayload.level"
        :level-title="playerPayload.levelTitle"
        :floor="playerPayload.floor"
        :class-role="playerPayload.class"
        :exp="playerPayload.exp"
        :left-slots="leftSlots"
        :right-slots="rightSlots"
      />
    </div>
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
          '!opacity-100 !text-green-400': tab === menu.key,
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
