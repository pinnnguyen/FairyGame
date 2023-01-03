import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { set } from '@vueuse/core'
import { sleep } from '~/common'
import { usePlayerStore } from '~/composables/usePlayer'
import { BATTLE_KIND, BATTLE_TURN, TARGET_TYPE, WINNER } from '~/constants/war'
import type { PlayerEquipment } from '~/types'
import type { BaseProperties, BaseReward, BattleResponse } from '~/types/war'
import { useSocket } from '#imports'

export const useBattleRoundStore = defineStore('battleRound', () => {
  const { playerInfo } = storeToRefs(usePlayerStore())
  const { _socket } = useSocket()
  const route = useRoute()

  const queryTarget = computed(() => (route.query.target as string))
  const queryTargetId = computed(() => (route.query.id as string))

  const loading = ref(true)
  const playerEffect = ref('')

  const battleRounds: any = ref([])
  const inRefresh = ref(false)

  const refreshTime = ref(0)
  const reward = ref<{
    base: BaseReward
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
    trueDamage?: boolean
  }>>({
    player: {
      critical: false,
      trueDamage: false,
      dmg: 0,
    },
    enemy: {
      critical: false,
      trueDamage: false,
      dmg: 0,
    },
  })

  const TURN_DELAY = 2000
  const REAL_TIME_DELAY = 700
  const DAMAGE_DELAY = 700
  const SHOULD_WIN_DELAY = 1000

  const battleResult = ref({
    show: false,
    win: '',
  })

  const onRefreshFinished = () => {
    console.log('onRefreshFinished', battleResult.value)
    if (queryTarget.value)
      return

    _socket.emit('battle:refresh')
  }

  let kind = BATTLE_KIND.PVE
  if (queryTarget.value)
    kind = BATTLE_KIND.BOSS_DAILY

  onMounted(async () => {
    _socket.emit('battle:join', `${playerInfo.value?._id}-battle`, {
      kind,
      player: {
        userId: playerInfo.value?.userId,
      },
      target: {
        type: queryTarget.value ?? TARGET_TYPE.MONSTER,
        id: queryTargetId.value ?? playerInfo.value?.mid?.current?.monsterId,
      },
    })

    _socket.on('battle:start', async (war: BattleResponse) => {
      console.log('war', war)
      set(inRefresh, false)
      set(refreshTime, 0)
      set(loading, false)
      set(battleRounds, [])
      set(reward, null)

      if (!war)
        return

      set(reward, war.reward)
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
        set(inRefresh, war.inRefresh)
        set(refreshTime, war.refreshTime)
        return
      }

      let roundNum = 0
      for (const emulator of war.emulators) {
        for (const turn in emulator) {
          roundNum++
          const _turn = turn.replace(/1_|2_/g, '') // replace '1_player' -> player
          const __turn: string = _turn === BATTLE_TURN.PLAYER ? BATTLE_TURN.ENEMY : BATTLE_TURN.PLAYER // Đảo ngược key

          const emuT = emulator[turn]
          const DMG = emuT?.state?.damage

          if (emuT.action) {
            await sleep(TURN_DELAY)
            set(playerEffect, _turn)

            receiver.value[__turn].hp = emuT.now.hp[__turn]
            receiver.value[__turn].mp = emuT.now.mp[_turn]

            realTime.value[__turn].dmg = DMG
            realTime.value[__turn].trueDamage = true

            battleRounds.value.unshift({
              turn: _turn,
              damage: DMG,
              roundNum,
            })

            setTimeout(() => {
              set(playerEffect, '')
            }, REAL_TIME_DELAY)

            setTimeout(() => {
              realTime.value[__turn].trueDamage = false
            }, DAMAGE_DELAY)

            if ((receiver.value[__turn].hp as number) <= 0) {
              setTimeout(() => {
                battleResult.value = {
                  show: true,
                  win: war.winner,
                }
              }, SHOULD_WIN_DELAY)

              if (war.winner === WINNER.youwin)
                onRefreshFinished()

              return
            }
          }
        }
      }
    })

    set(loading, true)
  })

  onUnmounted(() => {
    _socket.emit('battle:leave')
  })

  return {
    state,
    reward,
    loading,
    receiver,
    realTime,
    inRefresh,
    queryTarget,
    refreshTime,
    playerEffect,
    battleRounds,
    battleResult,
    onRefreshFinished,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBattleRoundStore, import.meta.hot))
