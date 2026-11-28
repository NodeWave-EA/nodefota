<script setup lang="ts">
import { useAuthRedirect } from '~/composables/auth/use-auth-redirect'

definePageMeta({
  layout: 'auth',
})

useSeoMeta({
  title: 'Verifying Session | NODEFOTA',
})

const route = useRoute()
const user = useSupabaseUser()
const { redirectAfterAuth } = useAuthRedirect()

const errorMessage = ref<string | null>(null)

watch(
  user,
  async (currentUser) => {
    if (!currentUser)
      return
    const next = typeof route.query.next === 'string'
      ? route.query.next
      : undefined
    await redirectAfterAuth(next || '/dashboard')
  },
  { immediate: true },
)

onMounted(() => {
  if (typeof route.query.error_description === 'string') {
    errorMessage.value = route.query.error_description
  }
})
</script>

<template>
  <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
    <div class="flex items-center justify-between border-b border-default bg-elevated/40 px-5 py-3.5">
      <span class="font-mono text-[10px] font-bold tracking-wider text-primary uppercase">
        SESSION HANDSHAKE // CALLBACK
      </span>
      <UBadge
        :color="errorMessage ? 'error' : 'warning'"
        variant="outline"
        size="xs"
        class="rounded-xs font-mono text-[10px]"
      >
        {{ errorMessage ? 'Failed' : 'In Progress' }}
      </UBadge>
    </div>

    <div class="p-6">
      <template v-if="errorMessage">
        <div class="flex flex-col gap-4">
          <UAlert
            color="error"
            variant="subtle"
            icon="i-lucide-shield-x"
            title="Verification Failed"
            :description="errorMessage"
            class="rounded-xs text-xs"
          />
          <UButton
            to="/auth/login"
            color="neutral"
            variant="outline"
            size="md"
            block
            class="rounded-xs font-mono text-xs font-bold"
          >
            Back to Sign In
          </UButton>
        </div>
      </template>

      <div v-else class="flex flex-col items-center gap-3 py-6 text-center">
        <UIcon name="i-lucide-loader-2" class="size-6 animate-spin text-primary" />
        <p class="font-mono text-xs font-bold text-highlighted">
          Verifying cryptographic session...
        </p>
        <p class="font-sans text-xs text-muted">
          Redirecting you to the control plane once token exchange completes.
        </p>
      </div>
    </div>
  </div>
</template>
