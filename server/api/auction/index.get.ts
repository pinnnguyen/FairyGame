import { AuctionSchema } from '~/server/schema'

export default defineEventHandler(async () => {
  const auction = await AuctionSchema.aggregate(
    [
      {
        $match: { open: true },
      },
      {
        $lookup: {
          from: 'gl_auction_items',
          localField: '_id',
          foreignField: 'auctionId',
          pipeline: [
            {
              $lookup: {
                from: 'players',
                localField: 'sid',
                foreignField: 'sid',
                as: 'player',
              },
            },
            {
              $lookup: {
                from: 'equipments',
                localField: 'itemId',
                foreignField: 'id',
                as: 'detail',
              },
            },
            {
              $unwind: '$detail',
            },
          ],
          as: 'auctionItems',
        },
      },
      {
        $limit: 1,
      },
    ],
  )

  return auction[0]
})
