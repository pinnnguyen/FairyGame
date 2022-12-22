import PlayerSchema from '~/server/schema/player'
export default defineEventHandler(async (event) => {
  const query = getQuery(event)

    console.log("query.userId", query.userId)
  const playerResource = await PlayerSchema.getPlayer(query.userId)

  return {
    player: playerResource?.player,
    attribute: playerResource?.attribute,
    mid: playerResource?.mid,
  }
})
