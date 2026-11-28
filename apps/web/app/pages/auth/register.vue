<script setup lang="ts">
import type { RegisterInput } from '~/types/auth'
import { useAuthActions } from '~/composables/auth/use-auth-actions'
import { registerSchema } from '~/types/auth'

definePageMeta({
  layout: 'auth',
})

useSeoMeta({
  title: 'Create Account | NODEFOTA',
  description: 'Register an operator account to begin deploying cryptographically verified firmware updates.',
})

const { signUp, resendVerificationEmail } = useAuthActions()

const state = reactive<RegisterInput>({ email: '', password: '', fullName: '' })
const loading = ref(false)
const resending = ref(false)
const resent = ref(false)
const verificationSent = ref(false)
const errorMsg = ref<string | null>(null)

async function onSubmit() {
  loading.value = true
  errorMsg.value = null
  try {
    const { session } = await signUp(state)
    if (session) {
      await navigateTo('/dashboard')
    }
    else {
      verificationSent.value = true
    }
  }
  catch (err: any) {
    errorMsg.value = err?.message || 'Registration failed'
  }
  finally {
    loading.value = false
  }
}

async function onResend() {
  resending.value = true
  resent.value = false
  errorMsg.value = null
  try {
    await resendVerificationEmail(state.email)
    resent.value = true
  }
  catch (err: any) {
    errorMsg.value = err?.message || 'Unable to resend verification email'
  }
  finally {
    resending.value = false
  }
}
</script>

<template>
  <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
    <!-- Top Header Tile -->
    <div class="flex flex-col gap-2 border-b border-default bg-elevated/40 p-5 sm:p-6">
      <div class="flex items-center justify-between">
        <span class="font-mono text-[10px] font-bold tracking-wider text-primary uppercase">
          OPERATOR PROVISIONING // SIGNUP
        </span>
        <UBadge
          :color="verificationSent ? 'success' : 'neutral'"
          variant="outline"
          size="xs"
          class="rounded-xs font-mono text-[10px]"
        >
          {{ verificationSent ? 'Email Pending' : 'Step 1 of 2' }}
        </UBadge>
      </div>
      <h1 class="font-sans text-xl font-bold text-highlighted sm:text-2xl">
        {{ verificationSent ? 'Verify your email' : 'Create an account' }}
      </h1>
      <p class="font-sans text-xs leading-relaxed text-muted">
        {{ verificationSent ? `We sent a confirmation link to ${state.email}` : 'Get started with zero-trust over-the-air firmware management.' }}
      </p>
    </div>

    <!-- Verification Sent State -->
    <div v-if="verificationSent" class="flex flex-col gap-4 p-5 sm:p-6">
      <UAlert
        v-if="errorMsg"
        color="error"
        variant="subtle"
        icon="i-lucide-alert-triangle"
        :title="errorMsg"
        class="rounded-xs text-xs"
      />

      <UAlert
        color="success"
        variant="subtle"
        icon="i-lucide-mail-check"
        :title="resent ? 'Verification email resent' : 'Confirmation link dispatched'"
        description="Click the verification link in your inbox to activate your operator account and access the control plane."
        class="rounded-xs text-xs"
      />

      <UButton
        color="neutral"
        variant="outline"
        size="md"
        :loading="resending"
        block
        class="rounded-xs font-mono text-xs font-bold"
        @click="onResend"
      >
        Resend Verification Email
      </UButton>
    </div>

    <!-- Registration Form -->
    <div v-else class="flex flex-col gap-4 p-5 sm:p-6">
      <UAlert
        v-if="errorMsg"
        color="error"
        variant="subtle"
        icon="i-lucide-alert-triangle"
        :title="errorMsg"
        class="rounded-xs text-xs"
      />

      <AuthOAuthButtons :disabled="loading" @error="errorMsg = $event" />

      <UForm :schema="registerSchema" :state="state" class="flex flex-col gap-4" @submit="onSubmit">
        <UFormField label="Full Name" name="fullName" class="font-mono text-xs font-bold text-highlighted">
          <UInput
            v-model="state.fullName"
            autocomplete="name"
            placeholder="e.g. Jane Developer"
            size="sm"
            :ui="{ base: 'rounded-xs font-sans text-xs' }"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Work Email" name="email" class="font-mono text-xs font-bold text-highlighted">
          <UInput
            v-model="state.email"
            type="email"
            autocomplete="email"
            placeholder="operator@domain.com"
            size="sm"
            :ui="{ base: 'rounded-xs font-sans text-xs' }"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Password" name="password" class="font-mono text-xs font-bold text-highlighted">
          <template #hint>
            <span class="font-mono text-[10px] font-normal text-muted">Min. 8 chars</span>
          </template>
          <UInput
            v-model="state.password"
            type="password"
            autocomplete="new-password"
            placeholder="••••••••"
            size="sm"
            :ui="{ base: 'rounded-xs font-sans text-xs' }"
            class="w-full"
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
            Create Account
          </UButton>
        </div>
      </UForm>
    </div>

    <!-- Footer Bar -->
    <div class="border-t border-default bg-elevated/40 p-4 text-center font-sans text-xs text-muted">
      Already have an account?
      <NuxtLink to="/auth/login" class="font-mono font-bold text-primary hover:underline">
        Sign in
      </NuxtLink>
    </div>
  </div>
</template>
