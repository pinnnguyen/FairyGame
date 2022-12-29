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
    email: String,
    password: String,
  },
  { timestamps: true, strict: true, strictQuery: true },
)
export const UserSchema = mongoose.model('UserSchema', schema, 'users')
