export function useAuthSession() {
  const client = useSupabaseClient()
  const user = useSupabaseUser()
  const session = useSupabaseSession()

  const isAuthenticated = computed(() => Boolean(user.value))
  const accessToken = computed(() => session.value?.access_token ?? null)
  const refreshToken = computed(() => session.value?.refresh_token ?? null)
  const expiresAt = computed(() => session.value?.expires_at ?? null)

  /** Manually refreshes the access token using the stored refresh token */
  async function refreshSession() {
    const { data, error } = await client.auth.refreshSession()
    if (error)
      throw error
    return data.session
  }

  /** Fetches the latest verified user object directly from Supabase Auth */
  async function fetchVerifiedUser() {
    const { data, error } = await client.auth.getUser()
    if (error)
      throw error
    return data.user
  }

  return {
    user,
    session,
    isAuthenticated,
    accessToken,
    refreshToken,
    expiresAt,
    refreshSession,
    fetchVerifiedUser,
  }
}
