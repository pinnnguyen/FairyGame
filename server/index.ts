import mongoose from 'mongoose'
import type { ScheduledTask } from 'node-cron'
import cron from 'node-cron'
import { handleRewardBoss12h, handleStartBoss12h } from '~/server/crons'

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
