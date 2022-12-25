<script setup>
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/player'

const { playerInfo, attribute } = storeToRefs(usePlayerStore())
</script>

<template>
  <div class="bg-[#1b345d] text-white w-full z-9 duration-500 absolute bottom-0 h-[70%]">
    <div class="h-full">
      <div class="absolute top-[-25px] flex items-center justify-center w-full">
        <div>
          Trang bị
        </div>
        <div>
          Chỉ số
        </div>
        <div>
          Thành tựu
        </div>
      </div>
      <div class="m-3 rounded-md pt-2" style="background-image: linear-gradient(to bottom right, #314b76, #455776, #4c5b74); height: calc(100% - 60px);">
        <div class="h-[60px] justify-between flex items-center mx-3">
          <div class="flex items-center">
            <img class="h-[50px] mr-2" src="pve/player-avatar.png">
            <div>
              <div>
                Tên: {{ playerInfo.name }}
              </div>
              <div>
                Cảnh giới: {{ playerInfo.levelTitle }} {{ playerInfo.floor }}
              </div>
              <div>
                Đẳng cấp: {{ playerInfo.level }}
              </div>
            </div>
          </div>
          <!--          <a style="background: radial-gradient(black, transparent);" class="text-white giftcode" href="?cmd=Yc2x1pkhPpWR1aWh1YW4mc2lkPTQ3MTRjMmE2NDNmOTQwMTY3NWE5YjY0OTFhZDJiOGQ4">Giftcode</a> -->
        </div>
        <div class="m-3">
          <div class="  my-1 px-2">
            Hệ: Tu tiên
          </div>
          <div class="  my-1 px-2">
            Tiên ngọc: {{ playerInfo.coin }}
          </div>
          <div class="  my-1 px-2">
            Linh thạch: {{ playerInfo.gold }}
          </div>

          <div class="   my-1 px-2">
            Tu vị: {{ playerInfo.exp }}/{{ playerInfo.expLimited }}
          </div>
          <div class="   my-1 px-2">
            Tốc độ: {{ attribute.speed ?? 0 }}
          </div>
          <div class="   my-1 px-2">
            Khí huyết: {{ attribute.hp ?? 0 }}
          </div>
          <div class="   my-1 px-2">
            Công Kích: {{ attribute.damage ?? 0 }}
          </div>
          <div class="   my-1 px-2">
            Phòng Ngự: {{ attribute.def ?? 0 }}
          </div>
          <div class="   my-1 px-2">
            Bạo kích: {{ attribute.critical ?? 0 }}%
          </div>
          <div class="   my-1 px-2">
            Sát thương bạo kích: 150%
          </div>
          <div class="   my-1 px-2">
            Hút máu: {{ attribute.suckHp ?? 0 }}%
          </div>
          <div>
            <div class="text-sm text-center font-semibold mb-2">
              Trang bị
            </div>

            <div class="grid grid-cols-4 gap-2">
              <div class="relative">
                <img class="w-[60px] h-[55px]" src="images/trangbi/vukhi.png">
                <!--                        Vũ khí: -->
              </div>
              <div class="relative">
                <img class="w-[60px] h-[55px]" src="images/trangbi/ngocboi.png">
                <!--                        Ngọc Bội: -->
              </div>
              <div class="relative">
                <img class="w-[60px] h-[55px]" src="images/trangbi/giap.png">
                <!--                        áo: -->
              </div>
              <div class="relative">
                <img class="w-[60px] h-[55px]" src="images/trangbi/baotay.png">
                <!--                        Bao tay: -->
              </div>
              <div class="relative">
                <img class="w-[60px] h-[55px]" src="images/trangbi/rinh.png">
                <!--                        Nhẫn: -->
              </div>
              <div class="relative">
                <img class="w-[60px] h-[55px]" src="images/trangbi/giay.png">
                <!--                        Giày: -->
              </div>
              <div class="relative">
                <img class="w-[60px] h-[55px]" src="images/trangbi/ngoc.png">
                <!--                        Giày: -->
              </div>
              <div class="relative">
                <img class="w-[60px] h-[55px]" src="images/trangbi/mu.png">
                <!--                        Giày: -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 h-[50px] ml-6">
        <a style="background: radial-gradient(black, transparent);" class="text-white" onclick="javascript :history.back(-1);">Trở về</a>
        <a style="background: radial-gradient(black, transparent);" class="text-white" href="?cmd=Yc2x1pkhPpWdvbWlkJm5ld21pZD0yNDgmc2lkPTQ3MTRjMmE2NDNmOTQwMTY3NWE5YjY0OTFhZDJiOGQ4">Trở về trò chơi</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab {
  border-width: 4px 30px 4px 30px;
  border-color: #cc0000;
  border-radius:100px 100px 0 0 ;
}
</style>
