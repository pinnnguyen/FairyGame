<script setup lang="ts">
const toggleUpgrade = useState<boolean>('toggleUpgrade')
const toggleUpStar = useState<boolean>('toggleUpStar')
const toggleUpRank = useState<boolean>('toggleUpRank')
const toggleUpGem = useState<boolean>('toggleUpGem')
const togglePlayerInfo = useState<boolean>('togglePlayerInfo')
const toggleBoss = useState<boolean>('toggleBoss')
</script>

<template>
  <var-popup
    v-model:show="toggleBoss"
  >
    <boss />
  </var-popup>
  <var-popup
    v-model:show="togglePlayerInfo"
  >
    <player-infomation />
  </var-popup>
  <var-popup
    v-model:show="toggleUpgrade"
  >
    <upgrade />
  </var-popup>
  <var-popup
    v-model:show="toggleUpStar"
  >
    <upgrade-up-star />
  </var-popup>
  <var-popup
    v-model:show="toggleUpRank"
  >
    <upgrade-up-rank />
  </var-popup>
  <var-popup
    v-model:show="toggleUpGem"
  >
    <upgrade-gem />
  </var-popup>
</template>
