import mongoose from 'mongoose'
import type { ScheduledTask } from 'node-cron'
import cron from 'node-cron'
import { BossSchema, AuctionSchema } from '~/server/schema'

export default async () => {
  const config = useRuntimeConfig()

  try {
    await mongoose.connect(config.mongoUrl)
    console.log('DB connection established.')
  }
  catch (err) {
    console.error('DB connection failed.', err)
  }

  try {
    const tasks: ScheduledTask[] = []

    tasks.push(
      cron.schedule('* * * * *', async () => {
        const boos = await BossSchema.find({ kind: 'frameTime', startHours: 12 })
        console.log('End Job ---------------', boos)
      }),
    )

    tasks.forEach(task => task.start())
  }
  catch (e) {
    console.log('e', e)
  }
}
