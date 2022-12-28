import mongoose from 'mongoose'
import { $in } from 'sift'
import { conditionForUpLevel } from '~/server/common/level'
import { PLAYER_LEVEL_TITLE, RANGE_EXP_A_LEVEL, RANGE_LEVEL_ID, RANGE_PLAYER_BIG_LEVEL } from '~/server/rule/level'
import { MidSchema, PlayerAttributeSchema, PlayerEquipmentSchema } from '~/server/schema'
import type { Player } from '~/types'
const ObjectId = mongoose.Types.ObjectId

interface PlayerModel {
  getPlayer(): any
}

const schema = new mongoose.Schema<Player, PlayerModel>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    sid: { type: String, unique: true },
    name: String,
    gold: Number,
    coin: Number,
    power: Number,
    vipLevel: Number,
    level: Number,
    exp: Number,
    midId: Number,
    userId: String,
    lastTimeReceivedRss: String,
    levelTitle: String,
    floor: String,
    expLimited: Number,
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

        const equipId = []
        if (attribute?.slot_1)
          equipId.push(attribute?.slot_1)
        if (attribute?.slot_2)
          equipId.push(attribute?.slot_2)
        if (attribute?.slot_3)
          equipId.push(attribute?.slot_3)
        if (attribute?.slot_4)
          equipId.push(attribute?.slot_4)
        if (attribute?.slot_5)
          equipId.push(attribute?.slot_5)
        if (attribute?.slot_6)
          equipId.push(attribute?.slot_6)
        if (attribute?.slot_7)
          equipId.push(attribute?.slot_7)
        if (attribute?.slot_8)
          equipId.push(attribute?.slot_8)

        const playerEquips = await PlayerEquipmentSchema.find({
          _id: {
            $in: equipId,
          },
        })

        if (playerEquips.length > 0 && attribute) {
          for (let i = 0; i < playerEquips.length; i++)
            attribute.hp += playerEquips[i].hp
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
