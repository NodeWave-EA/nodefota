export function useAuthRedirect() {
  const redirectInfo = useSupabaseCookieRedirect()

  async function redirectAfterAuth(fallback = '/dashboard') {
    const savedPath = redirectInfo.pluck()
    await navigateTo(savedPath || fallback, { replace: true })
  }

  return { redirectAfterAuth }
}
