<script setup lang="ts">
import { useAuthActions } from '~/composables/auth/use-auth-actions'
import { resetPasswordSchema } from '~/types/auth'

definePageMeta({
  layout: 'auth',
})

useSeoMeta({
  title: 'Set New Password | NODEFOTA',
  description: 'Update your operator account password.',
})

const { updatePassword } = useAuthActions()

const state = reactive({ password: '' })
const loading = ref(false)
const errorMsg = ref<string | null>(null)

async function onSubmit() {
  loading.value = true
  errorMsg.value = null
  try {
    await updatePassword(state.password)
    await navigateTo('/dashboard', { replace: true })
  }
  catch (err: any) {
    errorMsg.value = err?.message || 'Could not update password'
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
          CREDENTIAL UPDATE // NEW KEY
        </span>
        <UBadge color="success" variant="outline" size="xs" class="rounded-xs font-mono text-[10px]">
          Verified Session
        </UBadge>
      </div>
      <h1 class="font-sans text-xl font-bold text-highlighted sm:text-2xl">
        Set a new password
      </h1>
      <p class="font-sans text-xs text-muted leading-relaxed">
        Choose a strong password of at least 8 characters to secure your operator account.
      </p>
    </div>

    <!-- Form Body -->
    <div class="p-5 sm:p-6">
      <UForm :schema="resetPasswordSchema" :state="state" class="flex flex-col gap-4" @submit="onSubmit">
        <UAlert
          v-if="errorMsg"
          color="error"
          variant="subtle"
          icon="i-lucide-alert-triangle"
          :title="errorMsg"
          class="rounded-xs text-xs"
        />

        <UFormField label="New Password" name="password" class="font-mono text-xs font-bold text-highlighted">
          <template #hint>
            <span class="font-mono text-[10px] font-normal text-muted">Min. 8 chars</span>
          </template>
          <UInput
            v-model="state.password"
            type="password"
            autocomplete="new-password"
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
            Update Password
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>
