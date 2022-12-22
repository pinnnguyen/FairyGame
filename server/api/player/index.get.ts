import PlayerSchema from '~/server/schema/player'
export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const playerResource = await PlayerSchema.getPlayer(query.userId)

  return {
    player: playerResource?.player,
    attribute: playerResource?.attribute,
    mid: playerResource?.mid,
  }
})
