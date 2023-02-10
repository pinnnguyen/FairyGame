import { BATTLE_KIND, TARGET_TYPE } from '~/constants'

export const useBattleEvents = () => {
  const { $io } = useNuxtApp()
  const { playerInfo } = storeToRefs(usePlayerStore())
  const battleRequest = useState<{
    id: number
    target: string
  }>('battleRequest')

  const useEventPve = (skip?: boolean) => {
    console.log('doEventPve')
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
      kind: battleRequest.value?.target,
      player: {
        userId: playerInfo.value?.userId,
      },
      target: {
        type: battleRequest.value?.target,
        id: battleRequest.value?.id,
      },
    })
  }

  const useEventDaily = () => {
    $io.emit('battle:join:daily', {
      kind: battleRequest.value?.target,
      player: {
        userId: playerInfo.value?.userId,
      },
      target: {
        type: battleRequest.value?.target,
        id: battleRequest.value?.id,
      },
    })
  }

  const offAllEvent = () => {
    $io.off('battle:start:pve')
    $io.off('battle:start:daily')
    $io.off('battle:start:elite')
  }

  return {
    useEventPve,
    useEventDaily,
    useEventElite,
    offAllEvent,
  }
}
