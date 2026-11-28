import type { LoginInput, OAuthProvider, RegisterInput } from '~/types/auth'

export function useAuthActions() {
  const client = useSupabaseClient()
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || (import.meta.client
    ? window.location.origin
    : '')

  /** 1. Password verification (Sign In) */
  async function signInWithPassword(input: LoginInput) {
    const { data, error } = await client.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    })
    if (error)
      throw error
    return data
  }

  /** 2. OAuth provider sign in / sign up (Google & GitHub) */
  async function signInWithOAuth(provider: OAuthProvider, next: string = '/dashboard') {
    const redirectUrl = new URL('/auth/callback', siteUrl)
    if (next) {
      redirectUrl.searchParams.set('next', next)
    }

    const { data, error } = await client.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl.toString(),
      },
    })

    if (error)
      throw error
    return data
  }

  /** 3. User registration (triggers verification email) */
  async function signUp(input: RegisterInput) {
    const { data, error } = await client.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: { full_name: input.fullName },
        emailRedirectTo: `${siteUrl}/auth/callback`,
      },
    })
    if (error)
      throw error
    return data
  }

  /** 4. Resend email verification link */
  async function resendVerificationEmail(email: string) {
    const { error } = await client.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback`,
      },
    })
    if (error)
      throw error
  }

  /** 5. Request password reset email */
  async function requestPasswordReset(email: string) {
    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/auth/callback?next=/auth/reset-password`,
    })
    if (error)
      throw error
  }

  /** 6. Complete password reset (or update password while signed in) */
  async function updatePassword(newPassword: string) {
    const { data, error } = await client.auth.updateUser({
      password: newPassword,
    })
    if (error)
      throw error
    return data.user
  }

  /** 7. Terminate session */
  async function signOut(scope: 'local' | 'global' = 'local') {
    const { error } = await client.auth.signOut({ scope })
    if (error)
      throw error
    await navigateTo('/auth/login')
  }

  return {
    signInWithPassword,
    signInWithOAuth,
    signUp,
    resendVerificationEmail,
    requestPasswordReset,
    updatePassword,
    signOut,
  }
}
