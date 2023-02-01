import { MarketSchema } from '~/server/schema'

export default defineEventHandler(async () => {
  const markets = await MarketSchema.aggregate([
    {
      $match: {
        type: {
          $in: ['gem', 'equipment'],
        },
      },
    },
    {
      $lookup: {
        from: 'players',
        foreignField: 'sid',
        localField: 'sid',
        as: 'player',
        pipeline: [
          {
            $project: {
              name: true,
            },
          },
        ],
      },
    },
    {
      $unwind: '$player',
    },
    {
      $limit: 25,
    },
  ])

  const items = await MarketSchema.aggregate([
    {
      $match: {
        type: 'item',
      },
    },
    {
      $lookup: {
        from: 'gl_items',
        foreignField: 'id',
        localField: 'record.itemId',
        as: 'info',
      },
    },
    {
      $lookup: {
        from: 'players',
        foreignField: 'sid',
        localField: 'sid',
        as: 'player',
        pipeline: [
          {
            $project: {
              name: true,
            },
          },
        ],
      },
    },
    {
      $unwind: '$player',
    },
    {
      $unwind: '$info',
    },
    {
      $limit: 25,
    },
  ])

  return markets.concat(items)
})
