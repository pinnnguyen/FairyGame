import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    sid: String,
    damage: Number,
    bossId: Number,
    startHours: Number,
    clubId: String,
    name: String,
  },
  { timestamps: true },
)

schema.index({ sid: -1 })
schema.index({ bossId: -1 })

// export const BossSchema = mongoose.model('BossSchemas', schema, 'boss')
export const BossRankSchema = (mongoose.models && mongoose.models.BossRankSchema ? mongoose.models.BossRankSchema : mongoose.model('BossRankSchema', schema, 'gl_boss_rank'))
