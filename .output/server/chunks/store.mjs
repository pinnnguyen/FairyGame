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
    itemId: Number,
    price: Number,
    discount: Number,
    quantity: Number,
    kind: Number,
    currency: String
  },
  { timestamps: true }
);
const StoreItemSchema = mongoose.model("StoreItemSchema", schema, "gl_store_items");
const getStoreItems = async () => {
  return StoreItemSchema.aggregate([
    {
      $lookup: {
        from: "gl_items",
        foreignField: "id",
        localField: "itemId",
        as: "props",
        pipeline: [
          {
            $limit: 1
          },
          {
            $project: {
              _id: false,
              __v: false
            }
          }
        ]
      }
    },
    {
      $unwind: "$props"
    },
    {
      $sort: {
        price: -1
      }
    }
  ]);
};

export { StoreItemSchema as S, getStoreItems as g };
//# sourceMappingURL=store.mjs.map
