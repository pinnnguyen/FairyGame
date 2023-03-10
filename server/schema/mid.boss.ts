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
    bossId: Number,
    kind: String,
    name: String,
    level: Number,
    info: String,
    sex: String,
    damage: Number,
    def: Number,
    hp: Number,
    mp: Number,
    critical: Number,
    bloodsucking: Number,
    speed: Number,
  },
  { timestamps: true },
)

schema.index({ id: -1 }, { unique: true })

export const MidBossDataSchema = (mongoose.models && mongoose.models.MidBossDataSchema ? mongoose.models.MidBossDataSchema : mongoose.model('MidBossDataSchema', schema, 'gl_mid_boss'))
