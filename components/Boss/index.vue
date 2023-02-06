<script setup>
import { tips } from '~/constants'
import { randomNumber, sleep } from '~/common'

const emits = defineEmits(['close'])

const tab = ref('daily')
const { data: dataResponse, pending, refresh } = useFetch('/api/boss', {
  params: {
    kind: tab.value,
  },
})

const bossElites = computed(() => dataResponse.value?.elites)
const bossDaily = computed(() => dataResponse.value?.daily)
const bossFrameTime = computed(() => dataResponse.value?.frameTime)

const beforeWar = async () => {
  await sleep(3000)
  refresh()
}

const tabItems = [
  {
    key: 'daily',
    name: 'Hằng ngày',
  },
  {
    key: 'elite',
    name: 'Dã ngoại',
  },
  {
    key: 'frameTime',
    name: 'Thế giới',
  },
]
</script>

<template>
  <div class="p-2">
    <button
      v-for="tabItem in tabItems"
      :key="tabItem.key"
      :class="{ '!opacity-100': tab === tabItem.key }"
      class="transition opacity-40 transition-opacity duration-800 mx-2 w-16 h-8 leading-3 italic shadow rounded font-bold border-1 text-primary border-white/40"
      @click="tab = tabItem.key"
    >
      {{ tabItem.name }}
    </button>
  </div>
  <div class="h-[calc(100%_-_47px)] overflow-scroll">
    <var-loading :description="tips[Math.round(randomNumber(0, tips.length))]" size="mini" color="#ffffff" type="circle" :loading="pending">
      <template v-if="tab === 'elite'">
        <LazyBossElite
          v-for="boss in bossElites"
          :key="boss._id"
          :boss="boss"
          @war="beforeWar"
        />
      </template>
      <template v-if="tab === 'daily' ">
        <LazyBossDaily
          v-for="boss in bossDaily"
          :key="boss._id"
          :boss="boss"
          @war="beforeWar"
        />
      </template>
      <template v-if="tab === 'frameTime' ">
        <LazyBossFrameTime
          v-for="boss in bossFrameTime"
          :key="boss._id"
          :boss="boss"
        />
      </template>
    </var-loading>
  </div>
</template>
