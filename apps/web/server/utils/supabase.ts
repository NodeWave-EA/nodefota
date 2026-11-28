import type { H3Event } from 'h3'
import { serverSupabaseClient, serverSupabaseSession, serverSupabaseUser } from '#supabase/server'

export async function requireAuthUser(event: H3Event) {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  return user
}

export async function getAuthHeaders(event: H3Event) {
  const session = await serverSupabaseSession(event)
  if (!session?.access_token) {
    throw createError({ statusCode: 401, statusMessage: 'Missing access token' })
  }
  return {
    Authorization: `Bearer ${session.access_token}`,
  }
}

export { serverSupabaseClient }
