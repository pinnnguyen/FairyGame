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
                pipeline: [
                  {
                    $project: {
                      name: true,
                    },
                  },
                ],
              },
            },
            // {
            //
            // },
            {
              $lookup: {
                from: 'gl_equipments',
                localField: 'equipmentId',
                foreignField: 'id',
                as: 'equipment',
              },
            },
            {
              $lookup: {
                from: 'gl_gems',
                localField: 'gemId',
                foreignField: 'id',
                as: 'gem',
              },
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

  if (auction.length <= 0)
    return false

  return auction[0]
})
