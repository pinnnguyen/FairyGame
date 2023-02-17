<script setup lang="ts">
const toggleUpgrade = useState<boolean>('toggleUpgrade')
const toggleUpStar = useState<boolean>('toggleUpStar')
const toggleUpRank = useState<boolean>('toggleUpRank')
const toggleUpGem = useState<boolean>('toggleUpGem')
const togglePlayerInfo = useState<boolean>('togglePlayerInfo')
</script>

<template>
  <var-popup
    v-model:show="togglePlayerInfo"
  >
    <player-infomation />
  </var-popup>
  <var-popup
    v-model:show="toggleUpgrade"
    position="bottom"
  >
    <upgrade />
  </var-popup>
  <var-popup
    v-model:show="toggleUpStar"
    position="bottom"
  >
    <upgrade-up-star />
  </var-popup>
  <var-popup
    v-model:show="toggleUpRank"
    position="bottom"
  >
    <upgrade-up-rank />
  </var-popup>
  <var-popup
    v-model:show="toggleUpGem"
    position="bottom"
  >
    <upgrade-gem />
  </var-popup>
</template>
