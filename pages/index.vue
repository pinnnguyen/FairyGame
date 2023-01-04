<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'
import { shouldTupo } from '~/server/common'

const { playerInfo } = storeToRefs(usePlayerStore())

definePageMeta({
  middleware: ['game'],
  auth: false,
})

const onAttach = async () => {
  return navigateTo('/battle')
}

onMounted(async () => {
  const tupo = shouldTupo({
    level: playerInfo.value?.level,
    floor: playerInfo.value?.floor,
    levelTitle: playerInfo.value?.levelTitle,
  })

  console.log('tupo', tupo)
})
</script>

<template>
  <TheRight />
  <PageSection class="flex-1 flex items-center relative justify-center z-9">
    <div class="w-full absolute top-0">
      <div class="relative">
        <NuxtImg format="webp" src="/index/bg.png" />
        <NuxtImg class="absolute bottom-4 left-[calc(50%_-_50px)] w-[100px]" format="webp" src="/pve/nv1.png" />
      </div>
    </div>
    <div class="absolute bottom-0 w-full">
<!--      <div class="w-full relative">-->
<!--        <NuxtImg class="w-[70px] transform-center top-[71%] absolute" src="/center/attack_btn.png" alt="" @click.stop="onAttach" />-->
<!--        <NuxtImg class="w-full object-cover" src="/center/bg_attack.png" alt="" />-->
<!--        <div class="flex flex-col items-center absolute top-[87%] left-[85%] transform-center w-max">-->
<!--          <div class="text-12 m-0 !text-white h-[34px] !flex items-center font-semibold">-->
<!--            Sau: {{ playerInfo?.mid?.next?.name }} ->-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="flex flex-col items-center absolute top-[87%] left-14 transform-center w-max">-->
<!--          <div class="text-12 m-0 !text-white h-[34px] !flex items-center font-semibold">-->
<!--            Trước: {{ playerInfo?.mid?.current?.name }}-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <div class="relative">
        <PageBottom />
      </div>
    </div>
  </PageSection>
</template>
