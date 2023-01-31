<script setup lang="ts">
const props = defineProps<{
  receiverHp?: number
  stateHp?: number
  name?: string
  hp?: number
  damage?: number
  def?: number
  className?: string
  isEnemy?: boolean
}>()
</script>

<template>
  <div :class="className" class="flex justify-end flex-col mt-2 text-10 w-[150px]">
    <div class="text-[#333]">
      <div v-if="!isEnemy" class="flex items-center justify-center">
        <span class="mr-2">Sinh lực</span>
        <BattleStatusBar
          :receiver-hp="receiverHp"
          :hp="stateHp"
        />
      </div>
      <div v-else class="flex items-center justify-center">
        <BattleStatusBar
          :receiver-hp="receiverHp"
          :hp="stateHp"
        />
        <span class="ml-2">Sinh lực</span>
      </div>
      <div class="flex items-center">
        <!--        <Icon name="material-symbols:swords" /> -->
        <span>
          Công kích ({{ damage }})
        </span>
      </div>
      <div class="flex items-center">
        <!--        <Icon name="material-symbols:shield" /> -->
        <span>Phòng ngự ({{ def }})</span>
      </div>
    </div>
  </div>
</template>
