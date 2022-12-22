import MonsterSchema from '~/server/schema/monster'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return MonsterSchema.findOne({ id: query.id })
})
