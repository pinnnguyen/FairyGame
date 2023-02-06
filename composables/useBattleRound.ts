import { acceptHMRUpdate, defineStore } from 'pinia'
import { set, useLocalStorage } from '@vueuse/core'
import { sleep } from '~/common'
import { BATTLE_TURN } from '~/constants/war'
import type { BasicItem, PlayerEquipment } from '~/types'
import type { BaseProperties, BaseReward, BattleResponse } from '~/types/war'

export const useBattleRoundStore = defineStore('battleRound', () => {
  const loading = ref(true)
  // const playerEffect = ref('')

  const battleRounds: any = ref([])
  const rankDMG = ref<{
    _id: string
    totalDamage: number
  }[]>([])

  const inRefresh = ref(false)
  const refreshTime = ref(0)
  const reward = ref<{
    base: BaseReward
    items: BasicItem[]
    equipments: PlayerEquipment[]
  }>()

  const state = ref<{
    player?: BaseProperties
    enemy?: BaseProperties
    receiver?: {
      player: {
        hp: number
        mp: number
      }
      enemy: {
        hp: number
        mp: number
      }
    }
  }>({})

  const receiver = ref<Record<string | 'player' | 'enemy', {
    hp?: number
    mp?: number
  }>>({})

  const realTime = ref<Record<string | 'player' | 'enemy', {
    dmg?: number
    critical?: boolean
    sureDamage?: boolean
    bloodsucking?: number
    counterDamage?: number
    avoid?: boolean
  }>>({
    player: {
      critical: false,
      bloodsucking: 0,
      sureDamage: false,
      dmg: 0,
      counterDamage: 0,
      avoid: false,
    },
    enemy: {
      critical: false,
      sureDamage: false,
      bloodsucking: 0,
      dmg: 0,
      counterDamage: 0,
      avoid: false,
    },
  })

  const stop = ref(false)
  const roundNum = ref(0)
  const speed = useLocalStorage('speed', 1)
  const SKIP = ref(false)
  const TURN_DELAY = computed(() => 2000 / speed.value)
  const DAMAGE_DELAY = 500
  const SHOULD_WIN_DELAY = 1000

  const battleResult = ref({
    show: false,
    win: '',
  })

  const onSkip = (boo: boolean) => {
    set(SKIP, boo)
  }
  const startBattle = async (war: BattleResponse, cb: Function) => {
    if (!war)
      return

    set(loading, true)
    set(stop, false)
    set(roundNum, 0)
    set(inRefresh, false)
    set(refreshTime, 0)
    set(battleRounds, [])
    set(reward, null)
    set(rankDMG, war.rankDMG)
    set(reward, war?.reward)
    set(SKIP, false)
    set(battleResult, {
      show: false,
      win: '',
    })

    state.value.player = war.player
    state.value.enemy = war.enemy

    receiver.value = {
      player: {
        hp: state.value.player?.hp,
        mp: state.value.player?.mp,
      },
      enemy: {
        hp: state.value.enemy?.hp,
        mp: state.value.enemy?.mp,
      },
    }

    if (war.inRefresh) {
      set(loading, false)
      set(inRefresh, war.inRefresh)
      set(refreshTime, war.refreshTime)
      return
    }

    set(loading, false)
    for (const emulator of war.emulators) {
      for (const turn in emulator) {
        if (stop.value)
          return

        if (SKIP.value) {
          battleResult.value = {
            show: true,
            win: war.winner,
          }

          return
        }

        const _turn = turn.replace(/1_|2_/g, '') // replace '1_player' -> player
        const __turn: string = _turn === BATTLE_TURN.PLAYER ? BATTLE_TURN.ENEMY : BATTLE_TURN.PLAYER // Đảo ngược key

        const emuT = emulator[turn]
        const DMG = emuT?.state?.damage

        if (emuT.action) {
          roundNum.value++
          await sleep(TURN_DELAY.value)

          realTime.value[__turn].sureDamage = true
          setTimeout(() => {
            realTime.value[__turn].sureDamage = false
          }, DAMAGE_DELAY)

          receiver.value[__turn].hp = emuT.now.hp[__turn]
          receiver.value[__turn].mp = emuT.now.mp[_turn]

          realTime.value[__turn].dmg = DMG
          realTime.value[__turn].critical = emuT?.state?.critical
          realTime.value[__turn].bloodsucking = emuT.state.bloodsucking

          realTime.value[_turn].counterDamage = emuT.state.counterDamage
          realTime.value[_turn].avoid = emuT.state.avoid

          battleRounds.value.unshift({
            turn: _turn,
            damage: DMG,
            roundNum: roundNum.value,
          })

          if ((receiver.value[__turn].hp as number) <= 0) {
            setTimeout(() => {
              cb()
              battleResult.value = {
                show: true,
                win: war.winner,
              }
            }, SHOULD_WIN_DELAY)

            return
          }

          if (roundNum.value === (war.emulators.length * 2)) {
            setTimeout(() => {
              cb()
              battleResult.value = {
                show: true,
                win: war.winner,
              }
            }, SHOULD_WIN_DELAY)

            return
          }
        }
      }
    }
  }

  const onStopBattle = () => {
    set(stop, true)
  }

  onUnmounted(() => {
    set(stop, true)
  })

  return {
    state,
    reward,
    loading,
    receiver,
    realTime,
    inRefresh,
    startBattle,
    // queryTarget,
    refreshTime,
    // playerEffect,
    battleRounds,
    battleResult,
    rankDMG,
    speed,
    onSkip,
    onStopBattle,
    roundNum,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBattleRoundStore, import.meta.hot))
