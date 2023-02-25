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
    avoid: Number,
    reductionCriticalDamage: Number,
    counterAttack: Number,
    recoveryPerformance: Number,
    reductionBloodsucking: Number,
    reductionRecoveryPerformance: Number,
    reductionCounterAttack: Number,
    reductionAvoid: Number,
  },
  { timestamps: true },
)

schema.index({ sid: -1 }, { unique: true })
export const PlayerAttributeSchema = mongoose.model('PlayerAttributeSchema', schema, 'player_attributes')
