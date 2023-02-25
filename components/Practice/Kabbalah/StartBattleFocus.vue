<script setup lang="ts">
import type { KabbalahRule } from '~/types'

const props = defineProps<{
  kabbalah: KabbalahRule
}>()

const { kabbalahState } = storeToRefs(usePlayerStore())
const kabbalahStateSign = computed(() => {
  if (kabbalahState.value && kabbalahState.value[props.kabbalah.sign!])
    return kabbalahState.value[props.kabbalah.sign!]

  return null
})
</script>

<template>
  <div>
    <div font="bold">
      {{ kabbalah?.name }} ({{ kabbalahStateSign?.level ?? 0 }}/{{ kabbalah?.max ?? 0 }})
    </div>
    <span
      v-for="m in kabbalah.max"
      :key="m"
      flex="~ col"
      text="8"
      :class="{ 'text-green-500': m === kabbalahStateSign?.level }"
    >
      {{
        kabbalah?.title
          .replace('#percentDamage', `${kabbalah.values.percentDamage + (kabbalah.valueOnLevel * m)}%`)
          .replace('#percentSpeed', `${kabbalah.values.percentSpeed + (kabbalah.valueOnLevel * m)}%`)
          .replace('#percentDef', `${kabbalah.values.percentDef + (kabbalah.valueOnLevel * m)}%`)
          .replace('#percentHp', `${kabbalah.values.percentHp + (kabbalah.valueOnLevel * m)}%`)
          .replace('#recoveryPerformance', `${kabbalah.values.recoveryPerformance + (kabbalah.valueOnLevel * m)}%`)
          .replace('#criticalDamage', `${kabbalah.values.criticalDamage + (kabbalah.valueOnLevel * m)}%`)
          .replace('#reductionRecoveryPerformance', `${kabbalah.values.reductionRecoveryPerformance + (kabbalah.valueOnLevel * m)}%`)
          .replace('#reductionCriticalDamage', `${kabbalah.values.reductionCriticalDamage + (kabbalah.valueOnLevel * m)}%`)
      }}
    </span>
  </div>
</template>
