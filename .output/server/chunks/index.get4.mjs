import { defineEventHandler } from 'h3';
import { M as MarketSchema } from './market.mjs';
import 'mongoose';

const index_get = defineEventHandler(async () => {
  const markets = await MarketSchema.aggregate([
    {
      $match: {
        type: {
          $in: ["gem", "equipment"]
        }
      }
    },
    {
      $lookup: {
        from: "players",
        foreignField: "sid",
        localField: "sid",
        as: "player",
        pipeline: [
          {
            $project: {
              name: true
            }
          }
        ]
      }
    },
    {
      $unwind: "$player"
    },
    {
      $limit: 25
    }
  ]);
  const items = await MarketSchema.aggregate([
    {
      $match: {
        type: "item"
      }
    },
    {
      $lookup: {
        from: "gl_items",
        foreignField: "id",
        localField: "record.itemId",
        as: "props",
        pipeline: [
          {
            $project: {
              _id: false,
              id: false
            }
          },
          {
            $limit: 1
          }
        ]
      }
    },
    {
      $lookup: {
        from: "players",
        foreignField: "sid",
        localField: "sid",
        as: "player",
        pipeline: [
          {
            $project: {
              name: true
            }
          },
          {
            $limit: 1
          }
        ]
      }
    },
    {
      $unwind: "$player"
    },
    {
      $unwind: "$props"
    },
    {
      $limit: 25
    }
  ]);
  return markets.concat(items);
});

export { index_get as default };
//# sourceMappingURL=index.get4.mjs.map
