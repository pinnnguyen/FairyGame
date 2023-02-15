import { PlayerSchema, PlayerStatusSchema } from '~/server/schema'
import type { BasicItem } from '~/types'
import { PlayerStatusTypeCon } from '~/types'

export const useItems = () => {
  const useIncreaseExp = async (sid: string, itemInfo: BasicItem) => {
    const playerStatus = await PlayerStatusSchema.findOne({
      sid,
      type: PlayerStatusTypeCon.increase_exp,
    })

    if (!playerStatus) {
      await PlayerStatusSchema.create({
        sid,
        type: PlayerStatusTypeCon.increase_exp,
        value: itemInfo.value,
        timeLeft: new Date().getTime() + 7200000, // 2h
      })

      return
    }

    const now = new Date().getTime()
    let timeLeft = 0
    if (playerStatus.timeLeft! < now)
      timeLeft = now + 7200000 // 2h

    else
      timeLeft = playerStatus.timeLeft! + 7200000 // 2h

    await PlayerStatusSchema.updateOne({
      sid,
      type: PlayerStatusTypeCon.increase_exp,
    }, {
      value: itemInfo.value,
      $inc: {
        timeLeft, // 1 Day
      },
    })
  }

  const useGold = async (sid: string, itemInfo: BasicItem) => {
    await PlayerSchema.findOneAndUpdate({ sid }, {
      $inc: {
        gold: itemInfo.value,
      },
    })
  }

  const useReducedTimeItemRefreshMonster = async (sid: string, itemInfo: BasicItem) => {
    const playerStatus = await PlayerStatusSchema.findOne({
      sid,
      type: PlayerStatusTypeCon.reduce_waiting_time_training,
    })

    if (!playerStatus) {
      await PlayerStatusSchema.create({
        sid,
        type: PlayerStatusTypeCon.reduce_waiting_time_training,
        value: itemInfo.value,
        timeLeft: new Date().getTime() + 86400000,
      })

      return
    }

    const now = new Date().getTime()
    let timeLeft = 0
    if (playerStatus.timeLeft! < now)
      timeLeft = now + 86400000

    else
      timeLeft = playerStatus.timeLeft! + 86400000

    await PlayerStatusSchema.updateOne({
      sid,
      type: PlayerStatusTypeCon.reduce_waiting_time_training,
    }, {
      value: itemInfo.value,
      $inc: {
        timeLeft, // 1 Day
      },
    })
  }

  return {
    useReducedTimeItemRefreshMonster,
    useGold,
    useIncreaseExp,
  }
}
