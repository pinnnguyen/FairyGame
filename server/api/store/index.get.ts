import { getStoreItems } from '~/server/schema'
export default defineEventHandler(async () => {
  return getStoreItems()
})
