import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { set } from '@vueuse/core'
import { sleep } from '~/common'
import { usePlayerStore } from '~/composables/player'
import { BATTLE_TURN } from '~/constants/war'
import type { BaseProperties, BattleResponse } from '~/types/war'
import { useSocket } from '#imports'

export const useBattleRoundStore = defineStore('battleRound', () => {
  const { playerInfo } = storeToRefs(usePlayerStore())
  const { _socket } = useSocket()

  const loading = ref(true)
  const playerEffect = ref('')
  const battleRounds: any = ref([])
  const inRefresh = ref(false)
  const refreshTime = ref(0)

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
    hp: number
    mp: number
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

  const battleResource = ref({
    show: false,
    win: '',
  })

  const onRefreshFinished = () => {
    _socket.emit('refreshBattle', playerInfo.value.midId)
  }

  onMounted(async () => {
    _socket.emit('joinBattle', `${playerInfo.value._id}-battle`, {
      kind: 'solo',
      player: {
        userId: playerInfo.value?.userId,
      },
      target: {
        type: 'monster',
        id: playerInfo.value?.mid?.current?.monsterId,
      },
    })

    _socket.on('battleResult', async (war: BattleResponse) => {
      console.log('--BATTLE RESULT--', war)
      set(inRefresh, false)
      set(refreshTime, 0)
      set(loading, false)
      set(battleRounds, [])

      if (!war)
        return

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

            if (receiver.value[__turn].hp <= 0) {
              setTimeout(() => {
                battleResource.value = {
                  show: true,
                  win: war.winner,
                }
              }, SHOULD_WIN_DELAY)

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
    _socket.emit('leaveBattle')
  })

  return {
    loading,
    state,
    receiver,
    playerEffect,
    realTime,
    battleRounds,
    battleResource,
    inRefresh,
    refreshTime,
    onRefreshFinished,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBattleRoundStore, import.meta.hot))
