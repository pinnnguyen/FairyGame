import {
  AuctionItemSchema,
  AuctionSchema,
  BossSchema,
  EquipmentSchema,
  ItemSchema,
  addPlayerEquipments, addPlayerItems,
} from '~/server/schema'
import type { Equipment, Item } from '~/types'

export const handleStartBoss12h = async () => {
  const boss = await BossSchema.findOne({ kind: 'frameTime', startHours: 12 })
  console.log('--START BOSS--', boss)

  const auction = await new AuctionSchema({
    name: `Đấu giá boss ${boss?.name}`,
    kind: 1,
    startTime: new Date().getTime(),
    endTime: new Date().getTime() + 1800000,
    open: true,
  }).save()

  console.log('auction', auction)
  const auctionItems = []
  const equipRates = boss?.reward?.equipRates
  if (!equipRates)
    return

  for (let i = 0; i < equipRates.length; i++) {
    auctionItems.push({
      itemId: equipRates[i].id,
      auctionId: auction._id,
      kind: equipRates[i].kind,
      price: 50,
      own: '',
      quantity: equipRates[i].quantity,
    })
  }

  await AuctionItemSchema.insertMany(auctionItems)
}
export const handleRewardBoss12h = async () => {
  const auction = await AuctionSchema.findOneAndUpdate({ open: true }, {
    open: false,
  })

  if (!auction)
    return

  const auctionItems = await AuctionItemSchema.find({ auctionId: auction?._id })
  if (!auctionItems)
    return

  const playerEquipItems: Equipment[] = []
  const playerItems: Item[] = []

  for (let i = 0; i < auctionItems.length; i++) {
    const _itemID = auctionItems[i].itemId
    const _sid = auctionItems[i].sid
    const _kind = auctionItems[i].kind
    const _quantity = auctionItems[i].quantity

    if (_kind === 1) {
      if (_itemID && _sid) {
        const equipment = await EquipmentSchema.findOne({ id: _itemID })
        if (!equipment)
          return

        playerEquipItems.push({
          sid: _sid,
          name: equipment?.name,
          info: equipment?.info,
          damage: equipment?.damage,
          speed: equipment?.speed,
          def: equipment?.def,
          hp: equipment?.hp,
          mp: equipment?.mp,
          critical: equipment?.critical,
          bloodsucking: equipment?.bloodsucking,
          criticalDamage: 0,
          rank: equipment?.rank,
          level: equipment?.level,
          slot: equipment?.slot,
          preview: equipment?.preview,
        })
      }
    }

    if (_kind === 2) {
      if (_itemID && _sid) {
        const item = await ItemSchema.findOne({ id: _itemID })
        if (!item)
          return

        playerItems.push({
          sid: _sid,
          name: item.name,
          info: item.info,
          kind: item.kind,
          sum: _quantity,
        })
      }
    }
  }

  await addPlayerEquipments(playerEquipItems)
  await addPlayerItems(playerItems)
}