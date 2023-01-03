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
    slot: Number,
    upgradeLevel: {
      type: Number,
      default: 0,
    },
    startLevel: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)
schema.index({ sid: -1 })
// export const PlayerEquipUpgradeSchema = mongoose.model('PlayerEquipUpgradeSchemas', schema, 'player_equip_upgrade')
export const PlayerEquipUpgradeSchema = (mongoose.models && mongoose.models.PlayerEquipUpgradeSchema ? mongoose.models.PlayerEquipUpgradeSchema : mongoose.model('PlayerEquipUpgradeSchema', schema, 'player_equip_upgrade'))

