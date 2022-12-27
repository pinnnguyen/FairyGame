<script setup>
const goToBossDaily = () => {
  navigateTo('/boss-daily')
}
</script>

<template>
  <div class="fixed z-10 top-[30%] right-0 flex flex-col justify-end items-end">
    <button class="w-[55px] relative" @click="goToBossDaily">
      <NuxtImg format="webp" src="button/right_bottom.png" />
      <NuxtImg class="w-[20px] absolute top-0" format="webp" src="activity_icon/icon_61.png" />
      <NuxtImg class="absolute w-[30px] top-[3px] right-[3px]" format="webp" src="activity_icon/txt_mainui_boss.png" />
    </button>
  </div>
</template>
