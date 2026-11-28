<script setup lang="ts">
definePageMeta({
  name: 'DashboardCampaigns',
  layout: 'dashboard',
})

useSeoMeta({
  title: 'OTA Campaigns | NODEFOTA',
})

const campaigns = ref([
  {
    id: 'cmp_019',
    name: 'v1.4.2-canary-rollout',
    release: 'v1.4.2-esp32',
    strategy: 'Canary (25% → 100%)',
    status: 'In Progress',
    badgeColor: 'warning' as const,
    progress: 94,
    succeeded: 20,
    pending: 1,
    failed: 1,
    rollbackThreshold: '5% error halt',
  },
  {
    id: 'cmp_018',
    name: 'v1.4.1-fleet-baseline',
    release: 'v1.4.1-esp32',
    strategy: 'Phased Rollout',
    status: 'Completed',
    badgeColor: 'success' as const,
    progress: 100,
    succeeded: 18,
    pending: 0,
    failed: 0,
    rollbackThreshold: '5% error halt',
  },
  {
    id: 'cmp_017',
    name: 'esp8266-tls-cipher-patch',
    release: 'v1.4.1-esp8266',
    strategy: 'Immediate',
    status: 'Completed',
    badgeColor: 'success' as const,
    progress: 100,
    succeeded: 6,
    pending: 0,
    failed: 0,
    rollbackThreshold: '10% error halt',
  },
  {
    id: 'cmp_016',
    name: 'v1.4.0-rc2-field-trial',
    release: 'v1.4.0-rc2',
    strategy: 'Canary',
    status: 'Auto-Halted',
    badgeColor: 'error' as const,
    progress: 30,
    succeeded: 2,
    pending: 0,
    failed: 2,
    rollbackThreshold: 'Triggered at 10% failure',
  },
])

function togglePause(campaign: (typeof campaigns.value)[number]) {
  if (campaign.status === 'In Progress') {
    campaign.status = 'Paused'
    campaign.badgeColor = 'neutral' as any
  }
  else if (campaign.status === 'Paused') {
    campaign.status = 'In Progress'
    campaign.badgeColor = 'warning'
  }
}
</script>

<template>
  <UDashboardPanel id="ota-campaigns">
    <template #header>
      <UDashboardNavbar title="OTA Campaigns">
        <template #leading>
          <UDashboardSidebarCollapse class="rounded-xs" />
        </template>

        <template #right>
          <AppThemeToggle />

          <UButton
            to="/dashboard/firmware"
            color="primary"
            variant="solid"
            size="xs"
            icon="i-lucide-plus"
            class="rounded-xs font-mono text-xs font-bold"
          >
            Create Campaign
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-4">
        <div
          v-for="cmp in campaigns"
          :key="cmp.id"
          class="flex flex-col gap-4 rounded-xs border border-default bg-default p-5"
        >
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2.5">
                <span class="font-mono text-[10px] font-bold text-muted uppercase">{{ cmp.id }}</span>
                <h2 class="font-mono text-base font-bold text-highlighted">
                  {{ cmp.name }}
                </h2>
                <UBadge :color="cmp.badgeColor" variant="subtle" size="xs" class="rounded-xs font-mono text-[10px]">
                  {{ cmp.status }}
                </UBadge>
              </div>
              <p class="font-mono text-xs text-muted">
                Artifact: <span class="text-primary">{{ cmp.release }}</span> • Strategy: {{ cmp.strategy }} • Guard: {{ cmp.rollbackThreshold }}
              </p>
            </div>

            <div class="flex items-center gap-2">
              <UButton
                v-if="cmp.status === 'In Progress' || cmp.status === 'Paused'"
                color="neutral"
                variant="outline"
                size="xs"
                :icon="cmp.status === 'In Progress' ? 'i-lucide-pause' : 'i-lucide-play'"
                class="rounded-xs font-mono text-xs"
                @click="togglePause(cmp)"
              >
                {{ cmp.status === 'In Progress' ? 'Pause Rollout' : 'Resume Rollout' }}
              </UButton>
            </div>
          </div>

          <UProgress :model-value="cmp.progress" :color="cmp.badgeColor === 'error' ? 'error' : 'primary'" size="sm" />

          <div class="grid grid-cols-3 gap-4 border-t border-default pt-3 font-mono text-xs sm:max-w-md">
            <div>
              <span class="text-[10px] text-muted uppercase">Succeeded</span>
              <div class="font-bold text-success">
                {{ cmp.succeeded }}
              </div>
            </div>
            <div>
              <span class="text-[10px] text-muted uppercase">In Flight</span>
              <div class="font-bold text-warning">
                {{ cmp.pending }}
              </div>
            </div>
            <div>
              <span class="text-[10px] text-muted uppercase">Rolled Back</span>
              <div class="font-bold text-error">
                {{ cmp.failed }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
