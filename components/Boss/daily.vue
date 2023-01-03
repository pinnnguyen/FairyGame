<script setup>
import { onClickOutside } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'
import useSocket from '~/composables/useSocket'
import { usePlayerStore } from '~/composables/usePlayer'

const emits = defineEmits(['close'])

const target = ref(null)
onClickOutside(target, event => emits('close'))

const toast = useToast()
const { sid } = storeToRefs(usePlayerStore())

const { _socket } = useSocket()
const bossDaily = ref()
const equipSelected = ref({})

const equipShow = ref(false)

onMounted(() => {
  _socket.emit('boss-daily:join', `boss-daily-${sid.value}`, sid.value)
  _socket.on('boss-daily:start', (dataRes) => {
    bossDaily.value = dataRes.bossDaily
  })
})

onUnmounted(() => {
  _socket.emit('channel:leave')
})

const pickItem = (equipment) => {
  equipSelected.value = equipment
  equipShow.value = true
}

const parseEquipments = (equipments) => {
  if (equipments.length > 3)
    return equipments.splice(0, 1)

  return equipments
}

const startWar = (boss) => {
  if (boss.numberOfTurn <= 0) {
    toast('Lượt khiêu chiến trong ngày đã hết')
    return
  }

  navigateTo({
    path: '/battle',
    query: {
      target: 'boss-daily',
      id: boss.id,
    },
  })
}
</script>

<template>
  <Teleport to="body">
    <PopupEquipInfo v-if="equipShow" :item="equipSelected" @close="equipShow = false" />
  </Teleport>
  <Blocker class="z-99">
    <div ref="target" class="flex items-center justify-center w-full h-[calc(100vh_-_30px)]">
      <div class="w-[90%] h-[70%] absolute top-[calc(50%_-_35vh)]">
        <div class="w-full h-full relative">
          <span class="font-semibold absolute w-[40px] left-[calc(50%_-_15px)] top-[-1px] text-[#656f99]">BOSS</span>
          <NuxtImg class="w-full h-full" src="/common/bj_tongyong_1.png" />
          <div class="absolute top-[30px] flex flex-col gap-1 items-center justify-center w-full">
            <section v-for="boss in bossDaily" :key="boss.id" class="w-[90%] h-[80px] bg-[#a0aac0cf] rounded flex justify-between">
              <div class="flex flex-col items-center justify-center">
                <div class="relative mr-2">
                  <NuxtImg class="w-[55px] h-[55px] rounded-full border border-[#bbc4d2]" format="webp" :src="boss.avatar" />
                  <NuxtImg class="w-10 h-3 object-cover absolute bottom-0 left-[calc(50%_-_20px)]" format="webp" src="/panel/common_2.png" />
                  <p class="text-10 text-white h-3 object-cover absolute bottom-[2px] left-[calc(50%_-_20px)]">
                    {{ boss.name }}
                  </p>
                </div>
              </div>
              <div class="flex items-center justify-center">
                <LazyItemRank
                  v-for="equipment in parseEquipments(boss.reward.equipments)"
                  :key="equipment.name"
                  class="w-[40px] h-[40px]"
                  :rank="equipment.rank"
                  :preview="equipment.preview"
                  @click.stop="pickItem(equipment)"
                />
              </div>
              <div class="flex items-center z-1 flex flex-col justify-center items-center">
                <p class="text-[#439546] text-12 font-semibold mr-2">
                  Lượt khiêu chiến {{ boss.numberOfTurn }}
                </p>
                <ButtonConfirm class-name="h-[25px]" @click.stop="startWar(boss)">
                  <span class="font-semibold text-[#9d521a] z-9">Khiêu chiến</span>
                </ButtonConfirm>
              </div>
            </section>
          </div>
        <!--        <div class="flex"> -->
        <!--          <button> -->
        <!--            <NuxtImg class="w-[60px] h-[70px]" src="/bottom/bottom_tab_active.png" /> -->
        <!--          </button> -->
        <!--          <button> -->
        <!--            <NuxtImg class="w-[60px] h-[70px]" src="/bottom/bottom_tab_deactive.png" /> -->
        <!--          </button> -->
        <!--        </div> -->
        </div>
      </div>
    </div>
  </Blocker>
</template>
