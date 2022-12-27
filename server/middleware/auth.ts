import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }
})
