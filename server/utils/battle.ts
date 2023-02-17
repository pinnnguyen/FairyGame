import { BattleSchema } from '~/server/schema'

export const getDamageList = async (_bossId: string) => {
  return BattleSchema.aggregate(
    [
      {
        $match: {
          targetId: _bossId,
        },
      },
      {
        $group:
                  {
                    _id: '$sid',
                    totalDamage: { $sum: { $multiply: ['$damageList.self'] } },
                    sid: {
                      $first: '$sid',
                    },
                    match: {
                      $first: '$match',
                    },
                  },
      },
      {
        $sort: {
          totalDamage: -1,
        },
      },
    ],
  )
}
