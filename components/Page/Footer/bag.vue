<template>
  <div class="flex items-center justify-center h-full w-full fixed z-99" style="background: url('/common/bg_5.jpg'); background-size: cover">
<!--    <NuxtImg src="/common/bg_5.jpg"></NuxtImg>-->
    <div class="w-[90%] h-[70%] absolute top-10">
      <div class="w-full h-full relative" style="background: url('/common/bj_tongyong_1.png'); background-size: cover">
<!--        <NuxtImg class="w-full h-full" src="/common/bj_tongyong_1.png"></NuxtImg>-->
        <div class="flex">
          <button>
            <NuxtImg class="w-[60px] h-[70px]" src="/bottom/bottom_tab_active.png"></NuxtImg>
          </button>
         <button>
           <NuxtImg class="w-[60px] h-[70px]" src="/bottom/bottom_tab_deactive.png"></NuxtImg>
         </button>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 w-full h-[65px]">
      <div class="w-full h-full relative">
        <NuxtImg class="w-full h-full" src="/common/bg1_common.png"></NuxtImg>
      </div>
    </div>
    <div class="absolute bottom-0 flex justify-end w-full h-[65px]">
      <NuxtImg class="h-full" src="/bottom/bottom_back.png"></NuxtImg>
    </div>
  </div>
</template>
