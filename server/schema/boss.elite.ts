import mongoose from 'mongoose'
import type { BossElite } from '~/types'
import { BossDataSchema } from '~/server/schema'
import { cloneDeep } from '~/helpers'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<BossElite>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    bossId: Number,
    kind: String,
    name: String,
    level: Number,
    info: String,
    sex: String,
    hp: Number,
    attribute: {},
    reward: {},
    avatar: String,
    revive: Number,
    death: Boolean,
    killer: {
      avatar: String,
      name: String,
      sid: String,
    },
  },
  { timestamps: true },
)

// schema.index({ id: -1 }, { unique: true })
export const BossEliteSchema = mongoose.model('BossEliteSchema', schema, 'gl_boss_elites')

export const reviveBossElite = async (bossId?: number) => {
  console.log('reviveBossElite')
  const bossData = await BossDataSchema.findOne({ kind: 'elite', id: bossId })
  const level = bossData!.level ?? 1

  // = Số level * 10 + 10 phút
  const reviveTime = new Date().getTime() + ((level * 10) * 60000)
  const bossElite = await BossEliteSchema.findOneAndUpdate({ bossId, death: false }, {
    bossId: bossData?.id,
    hp: bossData?.attribute.hp,
    death: false,
    killer: null,
    revive: reviveTime,
    kind: bossData?.kind,
    name: bossData?.name,
    level: bossData?.level,
    info: bossData?.info,
    attribute: {
      ...cloneDeep(bossData)?.attribute,
    },
    reward: {
      ...cloneDeep(bossData)?.reward,
    },
    avatar: bossData?.avatar,
  }, {
    new: true,
    upsert: true,
  })

  return bossElite
}
