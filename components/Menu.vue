<script setup lang="ts">
const toggleUpgrade = useState<boolean>('toggleUpgrade')
const toggleUpStar = useState<boolean>('toggleUpStar')
const toggleUpRank = useState<boolean>('toggleUpRank')
const toggleUpGem = useState<boolean>('toggleUpGem')
const togglePlayerInfo = useState<boolean>('togglePlayerInfo')
const toggleBoss = useState<boolean>('toggleBoss')
</script>

<template>
  <!-- <TheRight /> -->
  <var-popup
    v-if="toggleBoss"
    v-model:show="toggleBoss"
    position="center"
  >
    <Boss />
  </var-popup>
  <var-popup
    v-if="togglePlayerInfo"
    v-model:show="togglePlayerInfo"
    position="center"
  >
    <PlayerInfomation />
  </var-popup>
  <var-popup
    v-if="toggleUpgrade"
    v-model:show="toggleUpgrade"
    position="center"
  >
    <Upgrade v-if="toggleUpgrade" />
  </var-popup>
  <var-popup
    v-if="toggleUpStar"
    v-model:show="toggleUpStar"
    position="center"
  >
    <UpgradeUpStar />
  </var-popup>
  <var-popup
    v-if="toggleUpRank"
    v-model:show="toggleUpRank"
    position="center"
  >
    <UpgradeUpRank />
  </var-popup>
  <var-popup
    v-if="toggleUpGem"
    v-model:show="toggleUpGem"
    position="center"
  >
    <UpgradeGem />
  </var-popup>
</template>
