<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerSlot } from '~/composables/usePlayerSlot'
import type { PlayerEquipment } from '~/types'

const emits = defineEmits(['equipSelected'])
const { slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8 } = storeToRefs(usePlayerSlot())
const { getSlotEquipUpgrade } = usePlayerSlot()

const equipSelected = ref<Partial<PlayerEquipment>>({})
const toggleEquipDetail = ref(false)

watch(equipSelected, (value) => {
  emits('equipSelected', value)
})
</script>

<template>
  <var-popup v-model:show="toggleEquipDetail" position="center">
    <lazy-bag-equip-detail
      :item="equipSelected"
      :action="false"
    />
  </var-popup>
  <div class="flex items-center justify-center w-[100vw] h-[70vh]">
    <div class="w-full h-full relative">
      <span class="font-bold absolute left-[calc(50%_-_50px)] top-[2px] text-[#656f99] text-12 w-25 flex justify-center">
        <slot name="title" />
      </span>
      <nuxt-img class="w-full h-full" format="webp" src="/common/bj_tongyong_1.png" />
      <div class="absolute top-[30px] flex flex-col gap-1 items-center justify-center w-full" />
      <div class="flex justify-around w-full absolute top-10 px-2">
        <div class="flex flex-col pl-2 gap-2">
          <item-rank
            v-if="slot1?.preview"
            class="w-[55px] h-[55px]"
            :quantity="0"
            :quality="slot1.quality"
            :rank="slot1.rank"
            :preview="slot1?.preview"
            @click.stop="equipSelected = slot1"
          >
            <!--            <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center"> -->
            <!--              {{ getSlotEquipUpgrade(1)?.enhance }} cấp -->
            <!--            </div> -->
          </item-rank>
          <div v-else class="w-[55px] h-[55px] bg-iconbg_0 bg-cover rounded" />
          <item-rank
            v-if="slot2?.preview"
            class="w-[55px] h-[55px]"
            :quantity="0"
            :quality="slot2.quality"
            :rank="slot2.rank"
            :preview="slot2?.preview"
            @click.stop="equipSelected = slot2"
          >
            <!--            <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center"> -->
            <!--              {{ getSlotEquipUpgrade(2)?.enhance }} cấp -->
            <!--            </div> -->
          </item-rank>
          <div v-else class="w-[55px] h-[55px] bg-iconbg_0 bg-cover rounded" />
          <item-rank
            v-if="slot3?.preview"
            class="w-[55px] h-[55px]"
            :quantity="0"
            :quality="slot3.quality"
            :rank="slot3.rank"
            :preview="slot3?.preview"
            @click.stop="equipSelected = slot3"
          >
            <!--            <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center"> -->
            <!--              {{ getSlotEquipUpgrade(3)?.enhance }} cấp -->
            <!--            </div> -->
          </item-rank>
          <div v-else class="w-[55px] h-[55px] bg-iconbg_0 bg-cover rounded" />
          <item-rank
            v-if="slot4?.preview"
            class="w-[55px] h-[55px]"
            :quantity="0"
            :quality="slot4.quality"
            :rank="slot4.rank"
            :preview="slot4?.preview"
            @click.stop="equipSelected = slot4"
          >
            <!--            <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center"> -->
            <!--              {{ getSlotEquipUpgrade(4)?.enhance }} cấp -->
            <!--            </div> -->
          </item-rank>
          <div v-else class="w-[55px] h-[55px] bg-iconbg_0 bg-cover rounded" />
        </div>
        <div class="flex justify-center items-center relative">
          <nuxt-img format="webp" class="w-[200px]" src="/upgrade/intensive.png" />
          <div class="absolute top-[84px] rounded" @click="toggleEquipDetail = true">
            <item-rank
              v-if="equipSelected.preview"
              class="relative"
              :quantity="0"
              :quality="equipSelected.quality"
              :rank="equipSelected.rank"
              :preview="equipSelected.preview"
            >
              <!--              <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[45px] flex justify-center"> -->
              <!--                {{ getSlotEquipUpgrade(equipSelected?.slot)?.enhance }} cấp -->
              <!--              </div> -->
              <!--              <slot name="upgrade-level" /> -->
            </item-rank>
          </div>
        </div>
        <div class="flex flex-col pr-2 gap-2">
          <item-rank
            v-if="slot5?.preview"
            class="w-[55px] h-[55px]"
            :quantity="0"
            :quality="slot5.quality"
            :rank="slot5.rank"
            :preview="slot5?.preview"
            @click.stop="equipSelected = slot5"
          >
            <!--            <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center"> -->
            <!--              {{ getSlotEquipUpgrade(5)?.enhance }} cấp -->
            <!--            </div> -->
          </item-rank>
          <div v-else class="w-[55px] h-[55px] bg-iconbg_0 bg-cover rounded" />
          <item-rank
            v-if="slot6?.preview"
            class="w-[55px] h-[55px]"
            :quantity="0"
            :quality="slot6.quality"
            :rank="slot6.rank"
            :preview="slot6?.preview"
            @click.stop="equipSelected = slot6"
          >
            <!--            <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center"> -->
            <!--              {{ getSlotEquipUpgrade(6)?.enhance }} cấp -->
            <!--            </div> -->
          </item-rank>
          <div v-else class="w-[55px] h-[55px] bg-iconbg_0 bg-cover rounded" />
          <item-rank
            v-if="slot7?.preview"
            class="w-[55px] h-[55px]"
            :quantity="0"
            :quality="slot7.quality"
            :rank="slot7.rank"
            :preview="slot7?.preview"
            @click.stop="equipSelected = slot7"
          >
            <!--            <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center"> -->
            <!--              {{ getSlotEquipUpgrade(7)?.enhance }} cấp -->
            <!--            </div> -->
          </item-rank>
          <div v-else class="w-[55px] h-[55px] bg-iconbg_0 bg-cover rounded" />
          <item-rank
            v-if="slot8?.preview"
            class="w-[55px] h-[55px]"
            :quantity="0"
            :quality="slot8.quality"
            :rank="slot8.rank"
            :preview="slot8?.preview"
            @click.stop="equipSelected = slot8"
          >
            <!--            <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center"> -->
            <!--              {{ getSlotEquipUpgrade(8)?.enhance }} cấp -->
            <!--            </div> -->
          </item-rank>
          <div v-else class="w-[55px] h-[55px] bg-iconbg_0 bg-cover rounded" />
        </div>
      </div>
    </div>
  </div>
</template>
