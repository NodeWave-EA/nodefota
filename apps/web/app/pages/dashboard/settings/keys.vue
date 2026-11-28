<script setup lang="ts">
definePageMeta({
  name: 'DashboardSettingsKeys',
  layout: 'dashboard',
})

useSeoMeta({
  title: 'Signing Keys | NODEFOTA',
})

const signingKeys = [
  {
    name: 'Primary Production Release Key',
    algorithm: 'ECDSA P-256 (SHA-256)',
    fingerprint: '8A:91:4F:02:7C:19:E3:44:C2',
    status: 'Active',
    publicKeyPem: '-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE...\n-----END PUBLIC KEY-----',
  },
  {
    name: 'ESP8266 Legacy Signing Key',
    algorithm: 'Ed25519',
    fingerprint: '3D:12:8B:66:09:FA:51:7E:90',
    status: 'Active',
    publicKeyPem: '-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEA...\n-----END PUBLIC KEY-----',
  },
]
</script>

<template>
  <UDashboardPanel id="settings-keys">
    <template #header>
      <UDashboardNavbar title="Firmware Signing Keys">
        <template #leading>
          <UDashboardSidebarCollapse class="rounded-xs" />
        </template>

        <template #right>
          <AppThemeToggle />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-4">
        <div
          v-for="key in signingKeys"
          :key="key.fingerprint"
          class="flex flex-col gap-3 rounded-xs border border-default bg-default p-5"
        >
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-key-round" class="size-4 text-primary" aria-hidden="true" />
              <h2 class="font-mono text-sm font-bold text-highlighted">
                {{ key.name }}
              </h2>
            </div>
            <UBadge color="success" variant="subtle" size="xs" class="rounded-xs font-mono text-[10px]">
              {{ key.status }}
            </UBadge>
          </div>

          <div class="font-mono text-xs text-muted">
            Algorithm: <span class="text-highlighted">{{ key.algorithm }}</span> • Fingerprint: <span class="text-primary">{{ key.fingerprint }}</span>
          </div>

          <pre class="overflow-x-auto rounded-xs border border-default bg-elevated/40 p-3 font-mono text-[11px] text-muted">{{ key.publicKeyPem }}</pre>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
