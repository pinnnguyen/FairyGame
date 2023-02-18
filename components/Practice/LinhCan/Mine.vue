<script setup lang="ts">
import { attributeToName } from '~/constants'
import { LINH_CAN_RULE } from '~/config'

const { linhCan } = storeToRefs(usePlayerStore())
const { getPlayer } = usePlayerStore()

const currentLC = computed(() => {
  if (!linhCan.value?.kind)
    return null

  return LINH_CAN_RULE[linhCan.value?.kind]
})
</script>

<template>
  <div
    v-if="currentLC"
    font="leading-5"
  >
    <Line m="b-2">
      {{ currentLC.name }} linh căn
    </Line>
    <div
      grid="~ cols-2"
    >
      <div
        v-for="(s, key) in currentLC.status"
        :key="key"
        flex="~ "
        justify="between"
        m="r-2"
        text="8"
      >
        <div class="line-clamp-1">
          {{ attributeToName[key] }}
        </div>
        <div>
          {{ Math.round(s * (linhCan.level ?? 1) * 100) / 100 }}
          <span text="green-500">(+{{ s }})</span>
        </div>
      </div>
    </div>

    <practice-linh-can-resource />
  </div>
</template>
