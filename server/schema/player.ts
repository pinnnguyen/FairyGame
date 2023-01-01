import mongoose from 'mongoose'
import { conditionForUpLevel } from '~/server/common/level'
import { PLAYER_LEVEL_TITLE, RANGE_EXP_A_LEVEL, RANGE_LEVEL_ID, RANGE_PLAYER_BIG_LEVEL } from '~/server/rule/level'
import { MidSchema, PlayerAttributeSchema, PlayerEquipUpgradeSchema, PlayerEquipmentSchema } from '~/server/schema'
import type { Player } from '~/types'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<Player>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    sid: { type: String, unique: true },
    name: String,
    knb: Number,
    gold: Number,
    coin: Number,
    power: Number,
    vipLevel: Number,
    level: Number,
    exp: Number,
    midId: Number,
    userId: String,
    lastTimeReceivedRss: Number,
    levelTitle: String,
    floor: String,
    expLimited: Number,
    class: Number,
  },
  {
    timestamps: true,
    strict: true,
    strictQuery: true,
    statics: {
      async getPlayer(userId: string, sid: string) {
        const player = await this.findOne({
          $or: [
            { userId },
            { sid },
          ],
        })

        if (!player)
          return null

        const { needGold } = conditionForUpLevel(player)
        const attribute = await PlayerAttributeSchema.findOne({ sid: player.sid })
        const mid = await MidSchema.find({
          id: {
            $in: [player.midId, (player.midId) + 1],
          },
        })

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

        if (player.class > 0 && attribute) {
          attribute.criticalDamage = 1.5 // 150% sat thuong bao kich
          switch (player.class) {
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

        const equipIds = []
        if (attribute?.slot_1)
          equipIds.push(attribute?.slot_1)
        if (attribute?.slot_2)
          equipIds.push(attribute?.slot_2)
        if (attribute?.slot_3)
          equipIds.push(attribute?.slot_3)
        if (attribute?.slot_4)
          equipIds.push(attribute?.slot_4)
        if (attribute?.slot_5)
          equipIds.push(attribute?.slot_5)
        if (attribute?.slot_6)
          equipIds.push(attribute?.slot_6)
        if (attribute?.slot_7)
          equipIds.push(attribute?.slot_7)
        if (attribute?.slot_8)
          equipIds.push(attribute?.slot_8)

        const playerEquipUpgrade = await PlayerEquipUpgradeSchema.find({ sid: player.sid })
        const playerEquips = await PlayerEquipmentSchema.find({
          _id: {
            $in: equipIds,
          },
        }).select('damage hp speed def mp critical bloodsucking preview slot level rank').sort({ slot: -1 })

        if (playerEquips.length > 0 && attribute) {
          for (let i = 0; i < playerEquips.length; i++) {
            attribute.damage += playerEquips[i].damage
            attribute.hp += playerEquips[i].hp
            attribute.speed += playerEquips[i].speed
            attribute.def += playerEquips[i].def
            attribute.mp += playerEquips[i].mp
            attribute.critical += playerEquips[i].critical
            attribute.bloodsucking += playerEquips[i].bloodsucking
          }
        }

        // format attribute
        if (attribute) {
          attribute.damage = Math.round(attribute.damage)
          attribute.hp = Math.round(attribute.hp)
          attribute.speed = Math.round(attribute.speed)
          attribute.def = Math.round(attribute.def)
          attribute.mp = Math.round(attribute.mp)
          attribute.critical = Math.round(attribute.critical)
          attribute.bloodsucking = Math.round(attribute.bloodsucking)
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
          playerEquipUpgrade,
        }
      },
      async changeCurrency(params: {
        kind: 'coin' | 'gold'
        sid: string
        value: number
      }) {
        if (params.kind === 'coin')
          return await this.findOneAndUpdate({ sid: params.sid }, { $inc: { coin: params.value } })

        if (params.kind === 'gold')
          return await this.findOneAndUpdate({ sid: params.sid }, { $inc: { gold: params.value } })
      },
    },
  },
)

schema.index({ sid: -1 }, { unique: true })
export const PlayerSchema = mongoose.model('PlayerSchema', schema, 'players')
