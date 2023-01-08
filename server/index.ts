import mongoose from 'mongoose'
import type { ScheduledTask } from 'node-cron'
import cron from 'node-cron'
import { AuctionItemSchema, AuctionSchema, BossSchema, EquipmentSchema } from '~/server/schema'

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
        const boss = await BossSchema.findOne({ kind: 'frameTime', startHours: 12 })
        console.log('start jon', boss)

        // const auction = await new AuctionSchema({
        //   name: `Đấu giá boss ${boss.name}`,
        //   kind: 1,
        //   startTime: new Date().getTime(),
        //   endTime: new Date().getTime() + 180000,
        //   open: true,
        // }).save()

        // console.log('auction', auction)
        // const auctionItems = []
        // const equipRates = boss.reward.equipRates
        // console.log('equipRates', equipRates)
        // for (let i = 0; i < equipRates.length; i++) {
        //   auctionItems.push({
        //     itemId: equipRates[i].id,
        //     auctionId: auction._id,
        //     kind: equipRates[i].kind,
        //     price: 50,
        //     own: '',
        //     quantity: equipRates[i].quantity,
        //   })
        // }

        // await AuctionItemSchema.insertMany(auctionItems)
      }),
    )

    tasks.forEach(task => task.start())
  }
  catch (e) {
    console.log('e', e)
  }
}
