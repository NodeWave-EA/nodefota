<script setup lang="ts">
definePageMeta({
  name: 'DashboardAudit',
  layout: 'dashboard',
})

useSeoMeta({
  title: 'Audit Logs | NODEFOTA',
})

const query = ref('')

const auditEntries = [
  {
    timestamp: '2026-11-28 08:41:12 UTC',
    actor: 'operator@nodewave.net',
    action: 'CAMPAIGN.ROLLOUT_STARTED',
    resource: 'v1.4.2-canary-rollout',
    severity: 'info' as const,
    detail: 'Initiated 25% canary rollout for signed release v1.4.2-esp32',
  },
  {
    timestamp: '2026-11-28 08:38:04 UTC',
    actor: 'operator@nodewave.net',
    action: 'FIRMWARE.SIGNED',
    resource: 'v1.4.2-esp32',
    severity: 'success' as const,
    detail: 'Manifest signed with ECDSA P-256 key (fp: 8a91...44c2)',
  },
  {
    timestamp: '2026-11-28 08:19:50 UTC',
    actor: 'CN=esp32-node-09',
    action: 'DEVICE.ROLLBACK_TRIGGERED',
    resource: 'dev_54b8c1',
    severity: 'error' as const,
    detail: 'Bootloader reverted partition ota_1 → ota_0 after TWDT reset',
  },
  {
    timestamp: '2026-11-28 07:55:21 UTC',
    actor: 'Internal Device CA',
    action: 'PKI.CERT_ISSUED',
    resource: 'CN=esp32s3-edge-01',
    severity: 'success' as const,
    detail: 'Signed PKCS#10 CSR; issued X.509 client certificate (365d)',
  },
  {
    timestamp: '2026-11-28 07:12:09 UTC',
    actor: 'operator@nodewave.net',
    action: 'PKI.CERT_REVOKED',
    resource: 'CN=esp8266-relay-07',
    severity: 'warning' as const,
    detail: 'Certificate serial 9E:05:61:D3:55:F8 added to CRL',
  },
]

const filteredLogs = computed(() => {
  if (!query.value.trim())
    return auditEntries
  const q = query.value.toLowerCase()
  return auditEntries.filter(
    e =>
      e.action.toLowerCase().includes(q)
      || e.actor.toLowerCase().includes(q)
      || e.resource.toLowerCase().includes(q)
      || e.detail.toLowerCase().includes(q),
  )
})
</script>

<template>
  <UDashboardPanel id="audit-logs">
    <template #header>
      <UDashboardNavbar title="Audit Logs">
        <template #leading>
          <UDashboardSidebarCollapse class="rounded-xs" />
        </template>

        <template #right>
          <AppThemeToggle />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UInput
            v-model="query"
            icon="i-lucide-search"
            placeholder="Search actor, action, or resource..."
            size="xs"
            class="w-72"
            :ui="{ base: 'rounded-xs font-mono text-xs' }"
          />
        </template>

        <template #right>
          <UBadge color="neutral" variant="outline" size="xs" class="rounded-xs font-mono text-[10px]">
            APPEND-ONLY // IMMUTABLE STREAM
          </UBadge>
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="divide-y divide-default overflow-hidden rounded-xs border border-default bg-default">
        <div
          v-for="entry in filteredLogs"
          :key="`${entry.timestamp}-${entry.action}`"
          class="flex flex-col justify-between gap-2 p-4.5 sm:flex-row sm:items-center"
        >
          <div class="flex flex-col gap-1">
            <div class="flex flex-wrap items-center gap-2">
              <UBadge :color="entry.severity" variant="subtle" size="xs" class="rounded-xs font-mono text-[10px]">
                {{ entry.action }}
              </UBadge>
              <span class="font-mono text-xs font-bold text-highlighted">{{ entry.resource }}</span>
              <span class="font-mono text-[11px] text-primary">by {{ entry.actor }}</span>
            </div>
            <p class="font-sans text-xs text-muted">
              {{ entry.detail }}
            </p>
          </div>

          <span class="shrink-0 font-mono text-[11px] text-muted">
            {{ entry.timestamp }}
          </span>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
