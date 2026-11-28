<script setup lang="ts">
definePageMeta({
  name: 'DashboardSettingsTokens',
  layout: 'dashboard',
})

useSeoMeta({
  title: 'API Keys & Tokens | NODEFOTA',
})

const tokens = ref([
  {
    id: 'tok_ci_01',
    name: 'GitHub Actions Firmware CI',
    prefix: 'nf_live_98a1...44f0',
    scope: 'firmware:upload, firmware:sign',
    lastUsed: '2 hours ago',
  },
  {
    id: 'tok_prov_02',
    name: 'Factory Provisioning Line',
    prefix: 'nf_live_31c7...82b9',
    scope: 'devices:register, pki:sign-csr',
    lastUsed: '1 day ago',
  },
])

function generateDemoToken() {
  tokens.value.unshift({
    id: `tok_${Math.random().toString(16).slice(2, 6)}`,
    name: 'CI/CD Pipeline Token',
    prefix: `nf_live_${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
    scope: 'firmware:upload, campaigns:read',
    lastUsed: 'Never',
  })
}

function revokeToken(id: string) {
  tokens.value = tokens.value.filter(t => t.id !== id)
}
</script>

<template>
  <UDashboardPanel id="settings-tokens">
    <template #header>
      <UDashboardNavbar title="API Keys & Tokens">
        <template #leading>
          <UDashboardSidebarCollapse class="rounded-xs" />
        </template>

        <template #right>
          <AppThemeToggle />

          <UButton
            color="primary"
            variant="solid"
            size="xs"
            icon="i-lucide-plus"
            class="rounded-xs font-mono text-xs font-bold"
            @click="generateDemoToken"
          >
            Generate Token
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="divide-y divide-default overflow-hidden rounded-xs border border-default bg-default">
        <div
          v-for="tok in tokens"
          :key="tok.id"
          class="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
        >
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-2">
              <span class="font-mono text-xs font-bold text-highlighted">{{ tok.name }}</span>
              <code class="rounded-xs border border-default bg-elevated/60 px-1.5 py-0.5 font-mono text-[11px] text-primary">
                {{ tok.prefix }}
              </code>
            </div>
            <span class="font-mono text-[11px] text-muted">
              Scopes: {{ tok.scope }} • Last used: {{ tok.lastUsed }}
            </span>
          </div>

          <UButton
            color="error"
            variant="outline"
            size="xs"
            icon="i-lucide-trash-2"
            class="w-fit rounded-xs font-mono text-xs"
            @click="revokeToken(tok.id)"
          >
            Revoke
          </UButton>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
