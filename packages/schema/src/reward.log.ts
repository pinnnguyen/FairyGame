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
    targetId: String,
    reward: {},
    desc: String,
  },
  { timestamps: true },
)

export const RewardLogSchema = mongoose.model('RewardLogSchema', schema, 'gl_reward_log')
