import { conditionForUpLevel, playerLevelUp, shouldTupo } from '~/server/common'
import { PlayerAttributeSchema, PlayerSchema } from '~/server/schema'
import { randomNumber } from '~/common'
import { UPGRADE_LEVEL } from '~/server/rule'

interface Response {
  level: number
  nextLevel: number
  gold: number
  needGold: number
  message: string
  status: boolean
}
const caseNone = (response: Response) => {
  response.status = false
  response.message = 'Chưa đủ điều kiện đột phá'

  return response
}

const caseBigLevel = async (response: Response, sjs: number, sid: string) => {
  const pAttribute = await PlayerAttributeSchema.findOne({ sid })
  if (!pAttribute) {
    return createError({
      statusCode: 400,
      statusMessage: 'player attribute not found',
    })
  }

  const uhp = 4 + Math.round(pAttribute.hp / 20)
  const udmg = 2 + Math.round(pAttribute.damage / 10)
  const udef = 2 + Math.round(pAttribute.def / 10)

  if (sjs < 8) {
    response.status = false
    response.message = 'Đột phá thất bại'

    return response
  }
  // Đại cảnh giới đc tăng thêm chỉ số
  await PlayerAttributeSchema.updateOne({ sid }, {
    $inc: {
      hp: uhp,
      damage: udmg,
      def: udef,
    },
  })

  response.status = true
  response.message = 'Đột phá thành công'

  return response
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const _p = await PlayerSchema.findOne({ sid: body.sid })

  if (!_p) {
    return createError({
      statusCode: 400,
      statusMessage: 'player not found',
    })
  }

  const { needGold } = conditionForUpLevel(_p)
  const sjs = randomNumber(1, 10)
  const upgrade = shouldTupo(_p)

  const response: Response = {
    level: _p.level,
    nextLevel: _p.level + 1,
    gold: _p.gold,
    needGold,
    message: '',
    status: true,
  }

  if (_p.gold < needGold) {
    response.status = false
    response.message = `Bạn cần ${needGold} linh thạch để đột phá`
    return response
  }

  if (_p.exp < _p.expLimited) {
    return createError({
      statusCode: 400,
      statusMessage: 'Tu vi chưa đủ để đột phá',
    })
  }

  const changeResult = await (PlayerSchema as any).changeCurrency({
    kind: 'gold',
    sid: _p.sid,
    value: -needGold,
  })

  if (!changeResult) {
    return createError({
      statusCode: 500,
      statusMessage: 'changeCurrency error',
    })
  }

  if (sjs <= 5) {
    response.status = false
    response.message = 'Đột phá thất bại'

    return response
  }

  switch (upgrade) {
    case UPGRADE_LEVEL.NONE:
      return caseNone(response)
    case UPGRADE_LEVEL.BIG_UP_LEVEL:
      await caseBigLevel(response, sjs, _p.sid)
      break
    case UPGRADE_LEVEL.UP_LEVEL:
      response.status = true
      response.message = 'Đột phá thành công'
      //  Hiện tại chưa làm gì thêm chỉ tăng chỉ số cơ bản trong playerLevelUp()
      break
  }

  await playerLevelUp(_p.sid)
  const playerBefore = await (PlayerSchema as any).getPlayer('', _p.sid)
  return {
    ...response,
    playerBefore,
  }
})
