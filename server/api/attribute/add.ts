import type { H3Event } from 'h3'
import { getPlayer } from '~/server/helpers'
import { PlayerSchema } from '~/server/schema'
import { getServerSession } from '#auth'

interface Body {
  target: string
}

export default defineEventHandler(async (event: H3Event) => {
  const uServer = await getServerSession(event)
  if (!uServer) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const body = await readBody<Body>(event)
  if (!body.target) {
    return {
      statusCode: 400,
      statusMessage: 'Chưa chọn loại thuộc tính nâng cấp',
    }
  }

  const player = await PlayerSchema.findOne({ userId: uServer.user?.email })
  if (!player) {
    return createError({
      statusCode: 400,
      statusMessage: 'Player not found',
    })
  }

  if (player.ofAttribute <= 0 || !player.ofAttribute) {
    return {
      statusCode: 400,
      statusMessage: 'Điểm thuộc tính không đủ',
    }
  }

  //   ofPower: Number,
  //   ofAgility: Number,
  //   ofSkillful: Number,
  //   ofVitality: Number,
  if (body.target === 'ofPower') {
    await PlayerSchema.updateOne({ sid: player.sid }, {
      $inc: {
        'coreAttribute.ofPower': 1,
        'ofAttribute': -1,
      },
    })
  }

  if (body.target === 'ofAgility') {
    await PlayerSchema.updateOne({ sid: player.sid }, {
      $inc: {
        'coreAttribute.ofAgility': 1,
        'ofAttribute': -1,
      },
    })
  }

  if (body.target === 'ofSkillful') {
    await PlayerSchema.updateOne({ sid: player.sid }, {
      $inc: {
        'coreAttribute.ofSkillful': 1,
        'ofAttribute': -1,
      },
    })
  }

  if (body.target === 'ofVitality') {
    await PlayerSchema.updateOne({ sid: player.sid }, {
      $inc: {
        'coreAttribute.ofVitality': 1,
        'ofAttribute': -1,
      },
    })
  }

  const _p = await getPlayer('', player.sid)

  return {
    statusCode: 201,
    statusMessage: 'Tăng thuộc tính thành công',
    player: _p,
  }
})
