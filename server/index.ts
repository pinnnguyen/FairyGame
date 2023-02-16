import mongoose from 'mongoose'
import type { ScheduledTask } from 'node-cron'
import cron from 'node-cron'
import { cloneDeep } from '~/helpers'
import { handleRewardBoss12h, handleStartBoss12h } from '~/server/crons'
import { ItemSchema, PlayerSchema, SendSystemMail } from '~/server/schema'

export default async () => {
  const config = useRuntimeConfig()

  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(config.mongoUrl)
    console.log('Start mongoose...')
  }
  catch (err) {
    console.error('DB connection failed.', err)
  }

  try {
    const tasks: ScheduledTask[] = []
    await handleRewardBoss12h()
    tasks.push(
      cron.schedule('59 03 * * *', async () => {
        console.log('Run Job Reset all Diem Tien Dau')
        const diemTienDau = await ItemSchema.findOne({ id: 14 }, { _id: false, __v: false })
        const tienDuyen = await ItemSchema.findOne({ id: 8 }, { _id: false, __v: false })

        const cloneTienDuyen = cloneDeep(tienDuyen)
        const cloneDiemTienDau = cloneDeep(diemTienDau)

        const players = await PlayerSchema.find({
          'arenas.tienDau.pos': {
            $gte: 1,
          },
        })
          .limit(100)
          .sort({ 'arenas.tienDau.pos': -1 })

        async function send(sid: string, value: number, ii: number) {
          await SendSystemMail(sid, 'item', [
            {
              sum: value,
              itemId: cloneTienDuyen?.id,
              ...cloneTienDuyen,
            },
            {
              sum: value,
              itemId: cloneDiemTienDau?.id,
              ...cloneDiemTienDau,
            },
          ], {
            title: 'Thưởng xếp hạng tiên đấu',
            note: `Đạo hữu thành công có được vị trí ${ii} trên bảng xếp hạng tiên đấu`,
          })
        }

        if (players.length > 0) {
          for (let i = 0; i < players.length; i++) {
            const ii = i + 1
            if (ii === 1)
              await send(players[i].sid, 100, ii)

            if (ii === 2)
              await send(players[i].sid, 70, ii)

            if (ii > 2 && ii <= 5)
              await send(players[i].sid, 50, ii)

            if (ii > 5 && ii <= 10)
              await send(players[i].sid, 30, ii)

            if (ii > 10 && ii <= 50)
              await send(players[i].sid, 20, ii)

            if (ii > 50 && ii <= 100)
              await send(players[i].sid, 10, ii)
          }
        }

        await PlayerSchema.updateMany({}, {
          'arenas.tienDau.pos': 0,
        })
      }),

      cron.schedule('42 16 * * *', async () => {
        await handleStartBoss12h()
      }),

      cron.schedule('35 21 * * *', async () => {
        console.log('start job send reward auction')
        // await handleRewardBoss12h()
      }),

      // “At every 2nd minute
      cron.schedule('*/2 * * * *', async () => {
        console.log('run run..')
      }),
    )

    tasks.forEach(task => task.start())
  }
  catch (e) {
    console.log('e', e)
  }
}
