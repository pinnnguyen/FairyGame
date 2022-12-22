import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { set, useIntervalFn } from '@vueuse/core'
import { calTakeDamage, calYourDamage, validateHp } from '~/helpers/pve'
import { useMonsterStore, usePlayerStore } from '#imports'

interface Round {
  id: number
  self: {
    receiveDamage: number
    inflictDamage: number
  }
  enemy: {
    receiveDamage: number
    inflictDamage: number
  }
}
export const useBattleRoundStore = defineStore('battleRound', () => {
  const { playerInfo } = storeToRefs(usePlayerStore())

  const rounds = ref<Round[]>([])
  const currentRound = ref()

  const mySelf = ref({})
  const die = ref(-1)
  const enemy = ref()

  //  const roundId = 0
  const startPVE = async () => {
    set(mySelf, playerInfo.value)
    set(enemy, monster)

    //    const takeDamage = calTakeDamage(playerInfo, monster)
    //    const yourDamage = calYourDamage(playerInfo, monster)
    //
    //    const { pause, resume } = useIntervalFn(() => {
    //      roundId++
    //
    //      if (mySelf.value?.speed > enemy.value?.speed)
    //        enemy.value.hp -= validateHp(enemy.value.hp, yourDamage)
    //      else
    //        mySelf.value.hp -= validateHp(mySelf.value.hp, takeDamage)
    //
    //      if (mySelf.value?.speed < enemy.value?.speed)
    //        mySelf.value.hp -= validateHp(mySelf.value.hp, takeDamage)
    //      else
    //        enemy.value.hp -= validateHp(enemy.value.hp, yourDamage)
    //
    //      const round = {
    //        id: roundId,
    //        self: {
    //          receiveDamage: takeDamage,
    //          inflictDamage: yourDamage,
    //        },
    //        enemy: {
    //          receiveDamage: yourDamage,
    //          inflictDamage: takeDamage,
    //        },
    //      }
    //
    //      rounds.value.push(round)
    //      set(currentRound, round)
    //
    //      if (enemy.value?.hp <= 0) {
    //        set(die, 0)
    //        pause()
    //      }
    //
    //      if (mySelf.value?.hp <= 0) {
    //        set(die, 1)
    //        pause()
    //      }
    //    }, 5000)
  }

  return {
    currentRound,
    rounds,
    mySelf,
    enemy,
    die,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBattleRoundStore, import.meta.hot))
