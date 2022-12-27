import consola from 'consola'
import mongoose from 'mongoose'
export default async () => {
  const config = useRuntimeConfig()

  try {
    await mongoose.connect(config.mongoUrl)
    consola.log('DB connection established.')

    // mongoose.Collection('players')
  }
  catch (err) {
    console.error('DB connection failed.', err)
  }
}
