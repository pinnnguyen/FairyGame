import { set, useLocalStorage } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { sleep } from '~/common'
import type { BasicItem, PlayerEquipment } from '~/types'
import type { BaseReward } from '~/types/war'

export const useBattleRoundStore = defineStore('battleRound', () => {
  const loading = ref(true)
  const inRefresh = ref(false)
  const refreshTime = ref(0)
  const reward = ref<{
    base: BaseReward
    items: BasicItem[]
    equipments: PlayerEquipment[]
  }>()

  const match = ref({})
  const receiver = ref<any>({})
  const realTime = ref<any>({})

  // const stop = ref(false)
  const roundNum = ref(0)
  const speed = useLocalStorage('speed', 1)
  const options = reactive({
    skip: false,
    stop: false,
    TURN_DELAY: computed(() => 2000 / speed.value),
    SHOW_DMG_DELAY: 1500,
    EFFECT_DELAY: 500,
    RESULT_DELAY: 1000,
  })
  const makeDefault = () => {
    set(loading, true)
    set(roundNum, 0)
    set(inRefresh, false)
    set(refreshTime, 0)
    set(reward, null)
    options.skip = false
    options.stop = false
  }
  const startBattle = async (war: any & { statusCode?: number }, cb: Function) => {
    if (war?.statusCode === 400)
      return

    if (!war)
      return

    makeDefault()
    set(reward, war.reward)
    set(match, war.match)

    if (war.inRefresh) {
      set(loading, false)
      set(inRefresh, war.inRefresh)
      set(refreshTime, war.refreshTime)
      return
    }

    for (const key in war?.match) {
      Object.assign(receiver.value, {
        [key]: {
          hp: war?.match[key].attribute.hp,
        },
      })
    }

    set(loading, false)
    for (const emulator of war.emulators) {
      for (const turn in emulator) {
        if (options.skip) {
          cb()
          return
        }

        if (options.stop)
          return

        const realTurn = turn.split('_')[1]
        const realEmu = emulator[turn]

        if (realEmu.action === 'attack') {
          await sleep(options.TURN_DELAY)
          roundNum.value++

          realTime.value = {
            [realTurn]: {
              effect: true,
              showDamage: true,
              damage: realEmu?.state?.damage,
              critical: realEmu?.state?.critical,
              bloodsucking: realEmu.state.bloodsucking,
            },
          }

          setTimeout(() => {
            realTime.value[realTurn].effect = false
          }, options.EFFECT_DELAY)

          setTimeout(() => {
            realTime.value[realTurn].showDamage = false
          }, options.TURN_DELAY)

          if (realEmu.state.damage) {
            const realDamage = Object.keys(realEmu.state.damage)
            receiver.value[realDamage[0]].damage = realEmu.state.damage[realDamage[0]]
          }

          if (realEmu.now.hp) {
            const keyRealEmuNow = Object.keys(realEmu.now.hp)

            if (receiver.value[keyRealEmuNow[0]])
              receiver.value[keyRealEmuNow[0]].hp = realEmu.now.hp[keyRealEmuNow[0]]

            if ((receiver.value[keyRealEmuNow[0]].hp) <= 0) {
              setTimeout(() => {
                cb()
              }, options.RESULT_DELAY)

              return
            }
          }

          if (roundNum.value === (war.emulators.length * 2)) {
            setTimeout(() => {
              cb()
            }, options.RESULT_DELAY)

            return
          }
        }
      }
    }
  }

  return {
    match,
    loading,
    fn: {
      startBattle,
      stopBattle: () => {
        options.stop = true
      },
      skipBattle: () => {
        options.skip = true
      },
    },
    refresh: reactive({
      inRefresh,
      refreshTime,
    }),
    stateRunning: reactive({
      receiver,
      realTime,
      reward,
    }),
    speed,
    roundNum,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBattleRoundStore, import.meta.hot))
