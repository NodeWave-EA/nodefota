<script setup lang="ts">
import { useAuthSession } from '~/composables/auth/use-auth-session'

definePageMeta({
  name: 'Dashboard',
  layout: 'dashboard',
})

useSeoMeta({
  title: 'Fleet Overview | NODEFOTA',
})

const { user } = useAuthSession()

const fleetMetrics = [
  {
    label: 'TOTAL REGISTERED',
    value: '24',
    detail: '18 ESP32 • 6 ESP8266',
    icon: 'i-lucide-cpu',
    accent: 'text-highlighted',
  },
  {
    label: 'ACTIVE ONLINE',
    value: '21',
    detail: '87.5% heartbeat healthy',
    icon: 'i-lucide-wifi',
    accent: 'text-success',
  },
  {
    label: 'UPDATING NOW',
    value: '1',
    detail: 'v1.4.2-canary-rollout',
    icon: 'i-lucide-refresh-cw',
    accent: 'text-warning',
  },
  {
    label: 'SIGNED RELEASES',
    value: '9',
    detail: 'ECDSA P-256 + SHA-256',
    icon: 'i-lucide-shield-check',
    accent: 'text-primary',
  },
]

const recentEvents = [
  {
    device: 'esp32-gateway-04',
    status: 'PROGRESS',
    badgeColor: 'warning' as const,
    message: 'Writing OTA partition (76%) • Verifying SHA-256 integrity',
    time: 'Just now',
  },
  {
    device: 'esp32-node-11',
    status: 'VERIFIED',
    badgeColor: 'success' as const,
    message: 'Signature verified • Post-boot watchdog check passed',
    time: '14s ago',
  },
  {
    device: 'esp8266-sensor-02',
    status: 'HEARTBEAT',
    badgeColor: 'neutral' as const,
    message: 'Authenticated check complete • Running v1.4.1',
    time: '42s ago',
  },
  {
    device: 'esp32-node-09',
    status: 'ROLLBACK',
    badgeColor: 'error' as const,
    message: 'Download interrupted • Bootloader fallback partition preserved',
    time: '2m ago',
  },
]
</script>

<template>
  <UDashboardPanel id="fleet-overview">
    <template #header>
      <UDashboardNavbar title="Fleet Overview">
        <template #leading>
          <UDashboardSidebarCollapse class="rounded-xs" />
        </template>

        <template #right>
          <UBadge
            color="primary"
            variant="subtle"
            size="xs"
            class="hidden sm:inline-flex rounded-xs font-mono text-[10px] font-bold uppercase"
          >
            {{ user?.user_metadata?.role || 'Operator' }}
          </UBadge>

          <AppThemeToggle />

          <UButton
            to="/dashboard/firmware"
            color="primary"
            variant="solid"
            size="xs"
            icon="i-lucide-upload"
            class="rounded-xs font-mono text-xs font-bold"
          >
            Upload Firmware
          </UButton>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <div class="flex items-center gap-2 font-mono text-xs text-muted">
            <span class="size-2 rounded-xs bg-success" aria-hidden="true" />
            <span>CONTROL PLANE // {{ user?.email }}</span>
          </div>
        </template>

        <template #right>
          <UButton
            to="/dashboard/campaigns"
            color="neutral"
            variant="outline"
            size="xs"
            icon="i-lucide-radio-tower"
            class="rounded-xs font-mono text-xs"
          >
            New OTA Campaign
          </UButton>
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-6">
        <!-- KPI Summary Grid -->
        <div class="grid grid-cols-1 gap-px overflow-hidden rounded-xs border border-default bg-border sm:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="metric in fleetMetrics"
            :key="metric.label"
            class="flex flex-col justify-between gap-3 bg-default p-5"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="font-mono text-[10px] font-bold tracking-wider text-muted uppercase">
                {{ metric.label }}
              </span>
              <UIcon :name="metric.icon" class="size-4 text-primary" aria-hidden="true" />
            </div>

            <div class="font-mono text-3xl font-extrabold tracking-tight" :class="metric.accent">
              {{ metric.value }}
            </div>

            <div class="font-mono text-[11px] text-muted">
              {{ metric.detail }}
            </div>
          </div>
        </div>

        <!-- Active Campaign & Recent Device Activity -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <!-- Active Rollout Card -->
          <div class="flex flex-col justify-between gap-5 rounded-xs border border-default bg-default p-5 lg:col-span-5">
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between gap-2">
                <span class="font-mono text-[10px] font-bold tracking-wider text-primary uppercase">
                  ACTIVE OTA CAMPAIGN
                </span>
                <UBadge color="warning" variant="subtle" size="xs" class="rounded-xs font-mono text-[10px]">
                  CANARY // 94%
                </UBadge>
              </div>

              <div>
                <h2 class="font-mono text-base font-bold text-highlighted">
                  v1.4.2-canary-rollout
                </h2>
                <p class="mt-1 font-sans text-xs text-muted">
                  Target release <code class="font-mono text-highlighted">v1.4.2-esp32</code> across 22 assigned nodes.
                </p>
              </div>

              <UProgress :model-value="94" color="primary" size="sm" class="pt-1" />
            </div>

            <div class="grid grid-cols-3 gap-2 border-t border-default pt-4 font-mono text-xs">
              <div>
                <div class="text-[10px] text-muted uppercase">
                  Succeeded
                </div>
                <div class="mt-0.5 font-bold text-success">
                  20
                </div>
              </div>
              <div>
                <div class="text-[10px] text-muted uppercase">
                  Updating
                </div>
                <div class="mt-0.5 font-bold text-warning">
                  1
                </div>
              </div>
              <div>
                <div class="text-[10px] text-muted uppercase">
                  Rolled Back
                </div>
                <div class="mt-0.5 font-bold text-error">
                  1
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Device Lifecycle Events -->
          <div class="flex flex-col overflow-hidden rounded-xs border border-default bg-default lg:col-span-7">
            <div class="flex items-center justify-between border-b border-default bg-elevated/40 px-5 py-3.5">
              <span class="font-mono text-xs font-bold tracking-wider text-highlighted uppercase">
                RECENT DEVICE LIFECYCLE EVENTS
              </span>
              <NuxtLink
                to="/dashboard/audit"
                class="font-mono text-[11px] font-semibold text-primary hover:underline"
              >
                View Audit Log →
              </NuxtLink>
            </div>

            <div class="divide-y divide-default">
              <div
                v-for="event in recentEvents"
                :key="`${event.device}-${event.time}`"
                class="flex flex-col justify-between gap-2 px-5 py-3.5 sm:flex-row sm:items-center"
              >
                <div class="flex flex-col gap-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-bold text-highlighted">
                      {{ event.device }}
                    </span>
                    <UBadge :color="event.badgeColor" variant="subtle" size="xs" class="rounded-xs font-mono text-[10px]">
                      {{ event.status }}
                    </UBadge>
                  </div>
                  <p class="font-sans text-xs text-muted">
                    {{ event.message }}
                  </p>
                </div>

                <span class="shrink-0 font-mono text-[11px] text-muted">
                  {{ event.time }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
