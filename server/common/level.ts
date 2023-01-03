import {
  PLAYER_LEVEL_TITLE, RANGE_DEF_A_LEVEL,
  RANGE_DMG_A_LEVEL,
  RANGE_HP_A_LEVEL,
  RANGE_LEVEL_ID,
  RANGE_PLAYER_BIG_LEVEL, UPGRADE_LEVEL,
} from '~/server/rule/level'
import type { Player } from '~/types'
import { PlayerSchema } from '~/server/schema/player'
import { PlayerAttributeSchema } from '~/server/schema/playerAttribute'


export const shouldTupo = (_p: Player) => {
  const playerNextLevel = _p.level + 1

  for (let i = 0; i < RANGE_PLAYER_BIG_LEVEL.length; i++) {
    if (playerNextLevel >= RANGE_PLAYER_BIG_LEVEL[i] && playerNextLevel < RANGE_PLAYER_BIG_LEVEL[i + 1]) {
      if (_p.levelTitle !== PLAYER_LEVEL_TITLE[i]) {
        // #bước đột phá
        return 1
      }

      const djc = playerNextLevel - RANGE_PLAYER_BIG_LEVEL[i]
      const jds = (RANGE_PLAYER_BIG_LEVEL[i + 1] - RANGE_PLAYER_BIG_LEVEL[i]) / 10
      const jieduan = Math.floor(djc / jds)
      const jd = RANGE_LEVEL_ID[jieduan]
      if (_p.floor !== `Tầng ${jd}`) {
        // đột phá cấp độ
        return 2
      }

      return 0
    }
  }
}

export const playerLevelUp = async (sid: string) => {
  const _p = await (PlayerSchema as any).getPlayer('', sid)

  if (_p.player.exp >= _p.player.expLimited) {
    // Giảm exp hiện tại khi tăng level & + 1 level
    await PlayerSchema.updateOne({ sid }, {
      $inc: {
        exp: -_p.player.expLimited,
        level: 1,
      },
    })

    const playerNextLevel = _p.player.level + 1
    for (let i = 0; i < RANGE_PLAYER_BIG_LEVEL.length; i++) {
      if (playerNextLevel >= RANGE_PLAYER_BIG_LEVEL[i] && playerNextLevel < RANGE_PLAYER_BIG_LEVEL[i + 1]) {
        await PlayerAttributeSchema.updateOne({ sid }, {
          $inc: {
            hp: RANGE_HP_A_LEVEL[i],
            damage: RANGE_DMG_A_LEVEL[i],
            def: RANGE_DEF_A_LEVEL[i],
          },
        })
      }
    }

    return true
  }

  return false
}

export const conditionForUpLevel = (_p: Player) => {
  let needGold = 0
  const upgrade = shouldTupo(_p)
  if (upgrade === UPGRADE_LEVEL.BIG_UP_LEVEL)
    needGold = _p.level * _p.level * _p.level * 10
  else if (upgrade === UPGRADE_LEVEL.UP_LEVEL)
    needGold = _p.level * (_p.level + 1) * 4

  return {
    needGold,
  }
}
