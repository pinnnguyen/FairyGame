import { BATTLE_KIND, TARGET_TYPE } from '~/constants'

export const useBattleEvents = () => {
  const { $io } = useNuxtApp()
  const { playerInfo } = storeToRefs(usePlayerStore())
  const { useBattleRequest } = useRequest()

  const useEventPve = (skip?: boolean) => {
    $io.emit('battle:join:pve', {
      skip,
      kind: BATTLE_KIND.PVE,
      player: {
        userId: playerInfo.value?.userId,
      },
      target: {
        type: TARGET_TYPE.MONSTER,
        id: playerInfo.value?.mid?.current?.monsterId,
      },
    })
  }

  const useEventElite = () => {
    $io.emit('battle:join:elite', {
      kind: useBattleRequest.value?.target,
      player: {
        userId: playerInfo.value?.userId,
      },
      target: {
        type: useBattleRequest.value?.target,
        id: useBattleRequest.value?.id,
      },
    })
  }

  const useEventFrameTime = () => {
    $io.emit('battle:join:frame_time', {
      kind: useBattleRequest.value?.target,
      player: {
        userId: playerInfo.value?.userId,
      },
      target: {
        type: useBattleRequest.value?.target,
        id: useBattleRequest.value?.id,
      },
    })
  }

  const useEventDaily = () => {
    $io.emit('battle:join:daily', {
      kind: useBattleRequest.value?.target,
      player: {
        userId: playerInfo.value?.userId,
      },
      target: {
        type: useBattleRequest.value?.target,
        id: useBattleRequest.value?.id,
      },
    })
  }

  const offAllEvent = () => {
    $io.off('battle:start:pve')
    $io.off('battle:start:daily')
    $io.off('battle:start:elite')
    $io.off('battle:start:frame_time')
  }

  return {
    useEventPve,
    useEventDaily,
    useEventElite,
    offAllEvent,
    useEventFrameTime,
  }
}
