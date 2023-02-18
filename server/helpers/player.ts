// import type { EnemyObject, PlayerInfo } from '~/types'
import { CLASS_RULE, LINH_CAN_RULE, MIND_DHARMA_CONFIG } from '~/config'
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
import { AttributePowers } from '~/server/constants'
import { formatAttributes, useEquipment } from '~/server/helpers/equipment'
import { MidSchema, PlayerSchema } from '~/server/schema'
import type { BaseAttributes, MindDharma, Player, PlayerAttribute, PlayerServerResponse } from '~/types'
import { playerTitle } from '~/common'

const mindDharmaApply = (mindDharma: MindDharma, attribute: BaseAttributes) => {
  for (const mindK in mindDharma) {
    const extentAtt = mindDharma[mindK].main * mindDharma[mindK].enhance
    if (attribute[mindK])
      attribute[mindK] += extentAtt
  }
}

const useLinhCan = (linhCan: any, attribute: BaseAttributes) => {
  for (const lc in LINH_CAN_RULE[linhCan.kind].status) {
    const extentAtt = LINH_CAN_RULE[linhCan.kind].status[lc] * linhCan?.level
    if (attribute[lc])
      attribute[lc] += extentAtt
  }
}

const useClass = (ofClass: number, attribute: PlayerAttribute) => {
  if (!ofClass)
    return

  const classDifference = CLASS_RULE[ofClass].status
  attribute.damage += (classDifference.damagePercent * attribute.damage) / 100
  attribute.criticalDamage += classDifference.criticalDamage
  attribute.hp += (classDifference.hpPercent * attribute.hp) / 100
  attribute.def += (classDifference.defPercent * attribute.def) / 100
}

const useAttribute = (_p: Player, attribute: PlayerAttribute) => {
  if (!_p.coreAttribute)
    return

  if (_p?.coreAttribute?.ofPower > 0) {
    attribute.hp += 30 * _p?.coreAttribute?.ofPower
    attribute.damage += (0.2 * _p?.coreAttribute?.ofPower) * attribute.damage / 100
  }

  if (_p?.coreAttribute?.ofAgility) {
    attribute.speed += 1 * _p?.coreAttribute?.ofAgility
    attribute.critical += (0.2 * _p?.coreAttribute?.ofAgility) * attribute.critical / 100
  }

  if (_p?.coreAttribute?.ofVitality) {
    attribute.def += (0.2 * _p?.coreAttribute?.ofVitality) * attribute.def / 100
    attribute.hp += (0.2 * _p?.coreAttribute?.ofVitality) * attribute.hp / 100
    attribute.hp += 20
  }

  if (_p?.coreAttribute?.ofSkillful) {
    attribute.speed += 0.5 * _p?.coreAttribute?.ofSkillful
    attribute.def += 10 * _p?.coreAttribute?.ofSkillful
    attribute.critical += (0.2 * _p?.coreAttribute?.ofSkillful) * attribute.critical / 100
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
  if (!player.mindDharma) {
    const playerUpdated = await PlayerSchema.findByIdAndUpdate(player._id, {
      mindDharma: MIND_DHARMA_CONFIG,
    }, {
      new: true,
    })

    if (playerUpdated)
      player.mindDharma = playerUpdated.mindDharma
  }
  else {
    const mindNewVersion = {}
    for (const mind in MIND_DHARMA_CONFIG) {
      const enhance = player.mindDharma[mind]?.enhance ?? 1
      const main = MIND_DHARMA_CONFIG[mind]?.main
      Object.assign(mindNewVersion, {
        [mind]: {
          enhance,
          main,
        },
      })
    }

    await PlayerSchema.findByIdAndUpdate(player._id, { mindDharma: mindNewVersion })
    player.mindDharma = mindNewVersion
  }

  const attribute = player.attribute
  const playerEquips = player.equipments

  const { needGold, rate } = conditionForUpLevel(player)
  const mid = await MidSchema.find({
    id: {
      $in: [player.midId, (player.midId) + 1],
    },
  }).sort({ id: 1 })

  const playerNextLevel = player.level + 1
  const {
    levelTitle,
    floor,
    expLimited,
  } = playerTitle(player.level, playerNextLevel)

  player.levelTitle = levelTitle
  player.floor = floor
  player.expLimited = expLimited

  if (player.mindDharma)
    mindDharmaApply(player.mindDharma, attribute)

  if (player?.linhCan?.level && player.linhCan?.kind)
    useLinhCan(player.linhCan, attribute)

  if (playerEquips.length > 0)
    useEquipment(playerEquips, attribute, player)

  if (player.class > 0 && attribute)
    useClass(player.class, attribute)

  if (attribute) {
    useAttribute(player, attribute)
    formatAttributes(attribute)
  }

  let power = 0
  for (const attr in attribute) {
    if (!AttributePowers[attr])
      continue

    power += Math.round(AttributePowers[attr] * attribute[attr])
  }

  await PlayerSchema.findByIdAndUpdate(player._id, {
    power,
  })

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
        rate,
        beUpgraded: player?.exp >= player?.expLimited,
      },
    },
    equipments: playerEquips,
  } as PlayerServerResponse
}
