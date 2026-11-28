<script setup lang="ts">
import type { LoginInput } from '~/types/auth'
import { useAuthActions } from '~/composables/auth/use-auth-actions'
import { useAuthRedirect } from '~/composables/auth/use-auth-redirect'
import { loginSchema } from '~/types/auth'

definePageMeta({
  layout: 'auth',
})

useSeoMeta({
  title: 'Sign In | NODEFOTA',
  description: 'Authenticate to manage your IoT fleets, firmware releases, and OTA deployment campaigns.',
})

const { signInWithPassword } = useAuthActions()
const { redirectAfterAuth } = useAuthRedirect()

const state = reactive<LoginInput>({ email: '', password: '' })
const loading = ref(false)
const errorMsg = ref<string | null>(null)

async function onSubmit() {
  loading.value = true
  errorMsg.value = null
  try {
    await signInWithPassword(state)
    await redirectAfterAuth('/dashboard')
  }
  catch (err: any) {
    errorMsg.value = err?.message || 'Invalid credentials'
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
          OPERATOR ACCESS // AUTH
        </span>
        <UBadge color="neutral" variant="outline" size="xs" class="rounded-xs font-mono text-[10px]">
          OAuth / JWT
        </UBadge>
      </div>
      <h1 class="font-sans text-xl font-bold text-highlighted sm:text-2xl">
        Sign in to NODEFOTA
      </h1>
      <p class="font-sans text-xs text-muted leading-relaxed">
        Enter your operator credentials or authenticate with a connected identity provider.
      </p>
    </div>

    <!-- Form Body -->
    <div class="flex flex-col gap-4 p-5 sm:p-6">
      <UAlert
        v-if="errorMsg"
        color="error"
        variant="subtle"
        icon="i-lucide-alert-triangle"
        :title="errorMsg"
        class="rounded-xs text-xs"
      />

      <AuthOAuthButtons :disabled="loading" @error="errorMsg = $event" />

      <UForm :schema="loginSchema" :state="state" class="flex flex-col gap-4" @submit="onSubmit">
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

        <UFormField label="Password" name="password" class="font-mono text-xs font-bold text-highlighted">
          <template #hint>
            <NuxtLink to="/auth/forgot-password" class="font-mono text-[11px] font-normal text-primary hover:underline">
              Forgot password?
            </NuxtLink>
          </template>
          <UInput
            v-model="state.password"
            type="password"
            autocomplete="current-password"
            placeholder="••••••••"
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
            Sign In
          </UButton>
        </div>
      </UForm>
    </div>

    <!-- Footer Bar -->
    <div class="border-t border-default bg-elevated/40 p-4 text-center font-sans text-xs text-muted">
      Don't have an operator account?
      <NuxtLink to="/auth/register" class="font-mono font-bold text-primary hover:underline">
        Create account
      </NuxtLink>
    </div>
  </div>
</template>
