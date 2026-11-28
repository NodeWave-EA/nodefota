<script setup lang="ts">
import type { OAuthProvider } from '~/types/auth'
import { useAuthActions } from '~/composables/auth/use-auth-actions'

defineOptions({
  name: 'AuthOAuthButtons',
})

const props = withDefaults(defineProps<{
  disabled?: boolean
  next?: string
}>(), {
  disabled: false,
  next: '/dashboard',
})

const emit = defineEmits<{
  error: [message: string]
}>()

const { signInWithOAuth } = useAuthActions()
const activeProvider = ref<OAuthProvider | null>(null)

async function handleOAuth(provider: OAuthProvider) {
  activeProvider.value = provider
  try {
    await signInWithOAuth(provider, props.next)
  }
  catch (err: any) {
    emit('error', err?.message || `Unable to authenticate with ${provider}`)
    activeProvider.value = null
  }
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="grid grid-cols-2 gap-2">
      <UButton
        type="button"
        color="neutral"
        variant="outline"
        size="md"
        icon="i-simple-icons-google"
        :loading="activeProvider === 'google'"
        :disabled="disabled || (activeProvider !== null && activeProvider !== 'google')"
        class="justify-center rounded-xs font-mono text-xs font-bold"
        @click="handleOAuth('google')"
      >
        Google
      </UButton>

      <UButton
        type="button"
        color="neutral"
        variant="outline"
        size="md"
        icon="i-simple-icons-github"
        :loading="activeProvider === 'github'"
        :disabled="disabled || (activeProvider !== null && activeProvider !== 'github')"
        class="justify-center rounded-xs font-mono text-xs font-bold"
        @click="handleOAuth('github')"
      >
        GitHub
      </UButton>
    </div>

    <div class="relative flex items-center py-1">
      <div class="grow border-t border-default" />
      <span class="mx-3 shrink font-mono text-[10px] font-bold tracking-wider text-muted uppercase">
        OR CONTINUE WITH EMAIL
      </span>
      <div class="grow border-t border-default" />
    </div>
  </div>
</template>
