// import type { EnemyObject, PlayerInfo } from '~/types'
//
// export const classPlayerCounter = (_p: PlayerInfo, _enemyObject: EnemyObject) => {
//   const counter = {
//     1: {
//       3: {
//         extraDamage: {
//           value: 10,
//           unit: 'percent',
//         },
//       },
//     },
//     2: {
//       1: {
//         extraDamage: {
//           value: 10,
//           unit: 'percent',
//         },
//       },
//     },
//     3: {
//       4: {
//         extraDamage: {
//           value: 10,
//           unit: 'percent',
//         },
//       },
//     },
//     4: {
//       2: {
//         extraDamage: {
//           value: 10,
//           unit: 'percent',
//         },
//       },
//     },
//   }
//
//   const classToClass = counter[_p?.player?.class][_enemyObject.class]
//   if (classToClass && classToClass.extraDamage) {
//
//   }
// }
import { conditionForUpLevel } from '~/server/common'
import { formatAttributes, useEquipment } from '~/server/helpers/equipment'
import { PLAYER_LEVEL_TITLE, RANGE_EXP_A_LEVEL, RANGE_LEVEL_ID, RANGE_PLAYER_BIG_LEVEL } from '~/server/rule'
import { MidSchema, PlayerSchema } from '~/server/schema'
import type { Player, PlayerAttribute, PlayerServerResponse } from '~/types'

const useClass = (ofClass: number, attribute: PlayerAttribute) => {
  attribute.criticalDamage = 1.5 // 150% sat thuong bao kich
  switch (ofClass) {
    case 1:
      // Tu tiên 10% tấn công & 5% sát thương bạo tăng kích
      attribute.damage += (10 * attribute.damage) / 100
      attribute.criticalDamage += (5 * attribute.criticalDamage) / 100
      break
    case 2:
      // Tu yeu 10% sinh luc & 5% phong thu
      attribute.hp += (10 * attribute.hp) / 100
      attribute.def += (5 * attribute.def) / 100
      break
    case 3:
      // Tu ma 10% sinh luc & 5% phong thu
      attribute.damage += (5 * attribute.damage) / 100
      attribute.criticalDamage += (10 * attribute.criticalDamage) / 100
      break
    case 4:
      // Nhan toc 10% sinh luc & 5% phong thu
      attribute.damage += (5 * attribute.damage) / 100
      attribute.hp += (5 * attribute.hp) / 100
      attribute.def += (5 * attribute.def) / 100
      break
  }
}

const useAttribute = (_p: Player, attribute: PlayerAttribute) => {
  if (_p.ofPower > 0) {
    attribute.hp += 30 * _p.ofPower
    attribute.damage += (0.2 * _p.ofPower) * attribute.damage / 100
  }

  if (_p.ofAgility) {
    attribute.speed += 1 * _p.ofAgility
    attribute.critical += (0.2 * _p.ofAgility) * attribute.critical / 100
  }

  if (_p.ofVitality) {
    attribute.def += (0.2 * _p.ofVitality) * attribute.def / 100
    attribute.hp += (0.2 * _p.ofVitality) * attribute.hp / 100
    attribute.hp += 20

    if (_p.ofSkillful) {
      attribute.speed += 0.5 * _p.ofSkillful
      attribute.def += 10 * _p.ofSkillful
      attribute.critical += (0.2 * _p.ofSkillful) * attribute.critical / 100
    }
  }
}

export const getPlayer = async (userId: string | null | undefined, sid: string) => {
  const players = await PlayerSchema.aggregate([
    {
      $match: {
        $or: [
          { userId },
          { sid },
        ],
      },
    },
    {
      $lookup: {
        from: 'player_attributes',
        localField: 'sid',
        foreignField: 'sid',
        as: 'attribute',
      },
    },
    {
      $unwind: '$attribute',
    },
    {
      $lookup: {
        from: 'gl_player_equipments',
        localField: 'sid',
        foreignField: 'sid',
        as: 'equipments',
        pipeline: [
          {
            $match: {
              used: true,
            },
          },
          {
            $sort: {
              slot: -1,
            },
          },
        ],
      },
    },
    {
      $limit: 1,
    },
  ])

  if (players.length === 0)
    return

  const player = players[0]
  const attribute = player.attribute
  const playerEquips = player.equipments

  const { needGold } = conditionForUpLevel(player)
  const mid = await MidSchema.find({
    id: {
      $in: [player.midId, (player.midId) + 1],
    },
  }).sort({ id: 1 })

  const playerNextLevel = player.level + 1
  for (let i = 0; i < RANGE_PLAYER_BIG_LEVEL.length; i++) {
    if (player.level >= RANGE_PLAYER_BIG_LEVEL[i] && player.level < RANGE_PLAYER_BIG_LEVEL[i + 1]) {
      const djc = player.level - RANGE_PLAYER_BIG_LEVEL[i]
      const jds = (RANGE_PLAYER_BIG_LEVEL[i + 1] - RANGE_PLAYER_BIG_LEVEL[i]) / 10
      const dd = Math.floor(djc / jds)
      const jd = RANGE_LEVEL_ID[dd]

      player.levelTitle = PLAYER_LEVEL_TITLE[i]
      player.floor = `Tầng ${jd}`
      player.expLimited = playerNextLevel * (playerNextLevel + Math.round(playerNextLevel / 5)) * 12 * RANGE_EXP_A_LEVEL[i] + playerNextLevel
    }
  }

  if (attribute)
    useAttribute(player, attribute)

  if (player.class > 0 && attribute)
    useClass(player.class, attribute)

  if (playerEquips.length > 0) {
    useEquipment(playerEquips, attribute)
    formatAttributes(attribute)
  }

  return {
    player,
    mid: {
      current: mid.length > 0 ? mid[0] : null,
      next: mid.length > 1 ? mid[1] : null,
    },
    attribute,
    upgrade: {
      condition: {
        needGold,
        beUpgraded: player?.exp >= player?.expLimited,
      },
    },
    equipments: playerEquips,
  } as PlayerServerResponse
}
