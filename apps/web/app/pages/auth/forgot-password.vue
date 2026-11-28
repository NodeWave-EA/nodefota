<script setup lang="ts">
import { useAuthActions } from '~/composables/auth/use-auth-actions'
import { forgotPasswordSchema } from '~/types/auth'

definePageMeta({
  layout: 'auth',
})

useSeoMeta({
  title: 'Forgot Password | NODEFOTA',
  description: 'Request a secure password reset link for your NODEFOTA operator account.',
})

const { requestPasswordReset } = useAuthActions()

const state = reactive({ email: '' })
const sent = ref(false)
const loading = ref(false)
const errorMsg = ref<string | null>(null)

async function onSubmit() {
  loading.value = true
  errorMsg.value = null
  try {
    await requestPasswordReset(state.email)
    sent.value = true
  }
  catch (err: any) {
    errorMsg.value = err?.message || 'Unable to send reset email'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
    <!-- Top Header Tile -->
    <div class="flex flex-col gap-2 border-b border-default bg-elevated/40 p-5 sm:p-6">
      <div class="flex items-center justify-between">
        <span class="font-mono text-[10px] font-bold tracking-wider text-primary uppercase">
          CREDENTIAL RECOVERY // RESET
        </span>
        <UBadge color="warning" variant="outline" size="xs" class="rounded-xs font-mono text-[10px]">
          Email Token
        </UBadge>
      </div>
      <h1 class="font-sans text-xl font-bold text-highlighted sm:text-2xl">
        Reset your password
      </h1>
      <p class="font-sans text-xs text-muted leading-relaxed">
        Enter your account email to receive a one-time password reset link.
      </p>
    </div>

    <!-- Form / Sent State -->
    <div class="p-5 sm:p-6">
      <UAlert
        v-if="sent"
        color="success"
        variant="subtle"
        icon="i-lucide-check-circle-2"
        title="Check your inbox"
        description="If an account exists for that email address, a password reset link has been dispatched."
        class="rounded-xs text-xs"
      />

      <UForm v-else :schema="forgotPasswordSchema" :state="state" class="flex flex-col gap-4" @submit="onSubmit">
        <UAlert
          v-if="errorMsg"
          color="error"
          variant="subtle"
          icon="i-lucide-alert-triangle"
          :title="errorMsg"
          class="rounded-xs text-xs"
        />

        <UFormField label="Work Email" name="email" class="font-mono text-xs font-bold text-highlighted">
          <UInput
            v-model="state.email"
            type="email"
            autocomplete="email"
            placeholder="operator@domain.com"
            size="sm"
            class="w-full rounded-xs font-sans text-xs"
          />
        </UFormField>

        <div class="pt-1">
          <UButton
            type="submit"
            color="primary"
            variant="solid"
            size="md"
            :loading="loading"
            block
            class="rounded-xs font-mono text-xs font-bold"
          >
            Send Reset Link
          </UButton>
        </div>
      </UForm>
    </div>

    <!-- Footer Bar -->
    <div class="border-t border-default bg-elevated/40 p-4 text-center font-sans text-xs text-muted">
      Remembered your password?
      <NuxtLink to="/auth/login" class="font-mono font-bold text-primary hover:underline">
        Back to sign in
      </NuxtLink>
    </div>
  </div>
</template>
