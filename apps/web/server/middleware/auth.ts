import { requireAuthUser } from '#server/utils/supabase.ts'

export default defineEventHandler(async (event) => {
  // Only guard private Nuxt server API routes
  if (!event.path.startsWith('/api/private'))
    return

  event.context.user = await requireAuthUser(event)
})
