<script setup lang="ts">
const props = defineProps<{
  sid: string
}>()

const options = reactive<any>({
  payload: {},
})

const sid = ref(props.sid)
onMounted(async () => {
  if (!sid.value)
    return

  try {
    options.payload = await $fetch(`/api/player?sid=${sid.value}`)
  }
  catch (e) {
    console.error(e)
  }
})

const slot1 = computed(() => options.payload.equipments?.find((e: { slot: number }) => e.slot === 1))
const slot2 = computed(() => options.payload.equipments?.find((e: { slot: number }) => e.slot === 2))

const slot3 = computed(() => options.payload.equipments?.find((e: { slot: number }) => e.slot === 3))
const slot4 = computed(() => options.payload.equipments?.find((e: { slot: number }) => e.slot === 4))

const slot5 = computed(() => options.payload.equipments?.find((e: { slot: number }) => e.slot === 5))
const slot6 = computed(() => options.payload.equipments?.find((e: { slot: number }) => e.slot === 6))

const slot7 = computed(() => options.payload.equipments?.find((e: { slot: number }) => e.slot === 7))
const slot8 = computed(() => options.payload.equipments?.find((e: { slot: number }) => e.slot === 8))

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
</script>

<template>
  ddddd
  <div
    v-if="options.payload.player"
    bg="primary"
    pos="relative"
    text="10 primary"
    font="semibold"
    class="border-box"
    h="120"
  >
    <player-equip-tab
      :name="options.payload.player.name"
      :level="options.payload.player.level"
      :level-title="options.payload.player.levelTitle"
      :floor="options.payload.player.floor"
      :class-role="options.payload.player.class"
      :exp="options.payload.player.exp"
      :left-slots="leftSlots"
      :right-slots="rightSlots"
    />
  </div>
</template>
