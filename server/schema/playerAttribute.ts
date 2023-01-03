import mongoose from 'mongoose'
import type { PlayerAttribute } from '~/types'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<PlayerAttribute>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    sid: String,
    damage: Number,
    def: Number,
    hp: Number,
    mp: Number,
    speed: Number,
    critical: Number,
    criticalDamage: Number,
    bloodsucking: Number,
    slot_1: String,
    slot_2: String,
    slot_3: String,
    slot_4: String,
    slot_5: String,
    slot_6: String,
    slot_7: String,
    slot_8: String,
  },
  { timestamps: true },
)

schema.index({ sid: -1 }, { unique: true })
// export const PlayerAttributeSchema = mongoose.model('PlayerAttributeSchemas', schema, 'player_attributes')
export const PlayerAttributeSchema = (mongoose.models && mongoose.models.PlayerAttributeSchema ? mongoose.models.PlayerAttributeSchema : mongoose.model('PlayerAttributeSchema', schema, 'player_attributes'))
