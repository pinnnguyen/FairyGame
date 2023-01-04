import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;
const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString();
      }
    },
    email: String,
    password: String
  },
  { timestamps: true }
);
const UserSchema = mongoose.models && mongoose.models.UserSchema ? mongoose.models.UserSchema : mongoose.model("UserSchema", schema, "users");

export { UserSchema as U };
//# sourceMappingURL=user.mjs.map
