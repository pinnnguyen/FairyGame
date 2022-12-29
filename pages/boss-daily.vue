<script setup>
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'
import useSocket from '~/composables/useSocket'
import { usePlayerStore } from '~/composables/player'

definePageMeta({
  middleware: ['game'],
})

const toast = useToast()
const { sid } = storeToRefs(usePlayerStore())
const { _socket } = useSocket()
const bossDaily = ref()
const equipSelected = ref({})
const equipShow = ref(false)

onMounted(() => {
  _socket.emit('boss-daily:join', `boss-daily-${sid.value}`, sid.value)
  _socket.on('boss-daily:start', (dataRes) => {
    console.log('bossDaily', dataRes)
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

const startWar = (boss) => {
  toast.success('My toast content', {
    timeout: 2000000000,
  })
  console.log('click')
//  navigateTo({
//    path: '/battle',
//    query: {
//      target: 'boss-daily',
//      id: boss.id,
//    },
//  })
}

const goToHome = () => {
  navigateTo('/')
}
</script>

<template>
  <Teleport to="body">
    <PopupEquipDetail v-if="equipShow" :item="equipSelected" @close="equipShow = false" />
  </Teleport>
  <div class="flex items-center justify-center w-full h-[calc(100vh_-_30px)]" style="background: url('/common/bg_5.jpg'); background-size: cover">
    <div class="w-[90%] h-[70%] absolute top-10">
      <div class="w-full h-full relative">
        <span class="font-semibold absolute w-[40px] left-[calc(50%_-_15px)] top-[-1px] text-[#656f99]">BOSS</span>
        <NuxtImg class="w-full h-full" src="/common/bj_tongyong_1.png" />
        <div class="absolute top-[30px] flex flex-col gap-1 items-center justify-center w-full">
          <section v-for="boss in bossDaily" :key="boss.id" class="w-[90%] h-[80px] bg-[#a0aac0cf] rounded flex justify-between">
            <div class="flex flex-col items-center justify-center">
              <div class="relative mr-2">
                <NuxtImg class="w-[55px] h-[55px] rounded-full border border-[#bbc4d2]" format="webp" :src="boss.avatar" />
                <NuxtImg class="w-10 h-3 object-cover absolute bottom-0 left-[calc(50%_-_20px)]" format="webp" src="panel/common_2.png" />
                <p class="text-10 text-white h-3 object-cover absolute bottom-[2px] left-[calc(50%_-_20px)]">
                  {{ boss.name }}
                </p>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <div
                v-for="equipment in boss.reward.equipments"
                :key="equipment.name"
                class="bg-iconbg_3 w-12 bg-contain bg-no-repeat relative"
                @click.stop="pickItem(equipment)"
              >
                <NuxtImg :src="equipment.preview" />
              </div>
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
    <div class="absolute bottom-0 w-full h-[65px]">
      <div class="w-full h-full relative">
        <NuxtImg class="w-full h-full" src="/common/bg1_common.png" />
      </div>
    </div>
    <div class="absolute bottom-0 flex justify-end w-full h-[65px]" @click="goToHome">
      <NuxtImg class="h-full" src="/bottom/bottom_back.png" />
    </div>
  </div>
</template>
