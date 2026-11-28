export default defineNuxtPlugin(() => {
  const client = useSupabaseClient()
  const router = useRouter()

  const { data: { subscription } } = client.auth.onAuthStateChange(async (event) => {
    if (event === 'PASSWORD_RECOVERY') {
      await router.push('/auth/reset-password')
    }

    if (event === 'SIGNED_OUT') {
      const currentPath = router.currentRoute.value.path
      if (!currentPath.startsWith('/auth')) {
        await router.push('/auth/login')
      }
    }
  })

  if (import.meta.hot) {
    import.meta.hot.dispose(() => subscription.unsubscribe())
  }
})
