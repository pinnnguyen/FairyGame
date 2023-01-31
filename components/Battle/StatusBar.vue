<script setup lang="ts">
defineProps<{
  receiverHp?: number
  hp?: number
  mp?: number
  receiverMp?: number
}>()
</script>

<template>
  <div>
    <div class="flex items-center justify-start">
      <div class="h-[7px] w-18 rounded-full bg-[#212121] flex items-center p-[2px]">
        <div
          class="h-[3px] w-full rounded-full bg-red-600"
          :style="{
            width: `${(receiverHp / hp) * 100}%`,
          }"
        />
      </div>
    </div>
    <!--    <div class="flex items-center justify-start mt-[1px]"> -->
    <!--      <div class="h-[5px] w-15 rounded-full bg-[#212121] flex items-center p-[2px]"> -->
    <!--        <div -->
    <!--          class="h-[2px] w-full rounded-full bg-blue-600" -->
    <!--          :style="{ -->
    <!--            width: `${(receiverMp / mp) * 100}%`, -->
    <!--          }" -->
    <!--        /> -->
    <!--      </div> -->
    <!--    </div> -->
  </div>
</template>
