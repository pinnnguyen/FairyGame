<script setup>
const emits = defineEmits(['close'])
const close = () => {
  emits('close')
}
</script>

<template>
  <div class="flex items-center justify-center h-full w-full fixed z-99" style="background: url('/common/bg_5.jpg'); background-size: cover">
    <!--    <NuxtImg src="/common/bg_5.jpg"></NuxtImg> -->
    <div class="w-[90%] h-[70%] absolute top-10">
      <div class="w-full h-full relative">
        <span class="font-semibold absolute w-[40px] left-[calc(50%_-_15px)] top-[-1px] text-[#656f99]">BOSS</span>
        <NuxtImg class="w-full h-full" src="/common/bj_tongyong_1.png" />
        <div class="absolute top-[30px] flex flex-col gap-1 items-center justify-center w-full">
          <div class="w-[90%] h-[80px] bg-[#a0aac0cf] rounded flex justify-between">
            <div class="flex flex-col items-center justify-center">
              <div class="relative mr-2">
                <NuxtImg class="w-[55px] h-[55px] rounded-full border border-[#bbc4d2]" format="webp" src="monster/310001.png" />
                <NuxtImg class="w-10 h-3 object-cover absolute bottom-0 left-[calc(50%_-_20px)]" format="webp" src="panel/common_2.png" />
              </div>
            </div>
            <div class="flex items-center justify-center">
              <div class="bg-iconbg_3 h-10 w-10 bg-contain bg-no-repeat"></div>
              <div class="bg-iconbg_3 h-10 w-10 bg-contain bg-no-repeat"></div>
              <div class="bg-iconbg_3 h-10 w-10 bg-contain bg-no-repeat"></div>
            </div>
            <div class="flex items-center">
              <ButtonConfirm class-name="h-[25px]">
                <span class="font-semibold text-[#9d521a] z-9">Khiêu chiến</span>
              </ButtonConfirm>
            </div>
          </div>
        </div>
<!--        <div class="flex">-->
<!--          <button>-->
<!--            <NuxtImg class="w-[60px] h-[70px]" src="/bottom/bottom_tab_active.png" />-->
<!--          </button>-->
<!--          <button>-->
<!--            <NuxtImg class="w-[60px] h-[70px]" src="/bottom/bottom_tab_deactive.png" />-->
<!--          </button>-->
<!--        </div>-->
      </div>
    </div>
    <div class="absolute bottom-0 w-full h-[65px]">
      <div class="w-full h-full relative">
        <NuxtImg class="w-full h-full" src="/common/bg1_common.png" />
      </div>
    </div>
    <div class="absolute bottom-0 flex justify-end w-full h-[65px]" @click="close">
      <NuxtImg class="h-full" src="/bottom/bottom_back.png" />
    </div>
  </div>
</template>
