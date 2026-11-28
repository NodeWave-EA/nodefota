<script setup lang="ts">
import { useAuthSession } from '~/composables/auth/use-auth-session'

definePageMeta({
  name: 'DashboardSettings',
  layout: 'dashboard',
})

useSeoMeta({
  title: 'Settings | NODEFOTA',
})

const { user } = useAuthSession()
const saved = ref(false)

const settings = reactive({
  workspaceName: 'NodeWave Production Fleet',
  defaultRollbackThreshold: '5',
  enforceSignedManifests: true,
  requireMutualTls: true,
})

function saveSettings() {
  saved.value = true
  setTimeout(() => {
    saved.value = false
  }, 2500)
}
</script>

<template>
  <UDashboardPanel id="settings-general">
    <template #header>
      <UDashboardNavbar title="General Settings">
        <template #leading>
          <UDashboardSidebarCollapse class="rounded-xs" />
        </template>

        <template #right>
          <AppThemeToggle />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="max-w-2xl space-y-6">
        <UAlert
          v-if="saved"
          color="success"
          variant="subtle"
          icon="i-lucide-check-circle-2"
          title="Workspace security policies updated"
          class="rounded-xs text-xs"
        />

        <form class="flex flex-col gap-5 rounded-xs border border-default bg-default p-6" @submit.prevent="saveSettings">
          <div class="flex flex-col gap-1.5">
            <label class="font-mono text-xs font-bold text-highlighted">Workspace Name</label>
            <UInput v-model="settings.workspaceName" :ui="{ base: 'rounded-xs font-mono text-xs' }" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="font-mono text-xs font-bold text-highlighted">Operator Email</label>
            <UInput :model-value="user?.email || 'operator@nodewave.net'" disabled :ui="{ base: 'rounded-xs font-mono text-xs' }" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="font-mono text-xs font-bold text-highlighted">Auto-Halt Rollback Threshold (%)</label>
            <UInput v-model="settings.defaultRollbackThreshold" type="number" min="1" max="50" :ui="{ base: 'rounded-xs font-mono text-xs' }" />
          </div>

          <UCheckbox
            v-model="settings.enforceSignedManifests"
            label="Reject unsigned firmware artifacts at upload and device check endpoints"
            :ui="{ label: 'font-sans text-xs text-muted', base: 'rounded-xs' }"
          />

          <UCheckbox
            v-model="settings.requireMutualTls"
            label="Require X.509 client certificate (mTLS) for production fleet OTA checks"
            :ui="{ label: 'font-sans text-xs text-muted', base: 'rounded-xs' }"
          />

          <div class="pt-2">
            <UButton type="submit" color="primary" variant="solid" size="sm" class="rounded-xs font-mono text-xs font-bold">
              Save Changes
            </UButton>
          </div>
        </form>
      </div>
    </template>
  </UDashboardPanel>
</template>
