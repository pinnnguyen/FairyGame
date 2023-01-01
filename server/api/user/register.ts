import { UserSchema } from '~/server/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const user = await UserSchema.findOne({ email: body.email })
  if (user) {
    return createError({
      statusCode: 400,
      statusMessage: 'USERNAME EXITS',
    })
  }

  const newUser = new UserSchema({
    email: body.email,
    password: body.password,
  })

  await newUser.save()

  return {
    user: newUser,
  }
})
