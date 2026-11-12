<script setup lang="ts">
defineOptions({
  name: 'IntegrationArchitecture',
})

const layers = [
  {
    title: '1. OPERATOR LAYER',
    badge: 'Control Plane',
    badgeColor: 'neutral' as const,
    tech: 'Nuxt 4 / Tailwind CSS',
    items: [
      'Dashboard UI',
      'Firmware Release Vault',
      'Device Fleet Management',
      'OTA Campaign Planner',
    ],
    icon: 'i-lucide-layout-dashboard',
    color: 'text-amber-400',
  },
  {
    title: '2. BACKEND LAYER',
    badge: 'API Engine',
    badgeColor: 'primary' as const,
    tech: 'NestJS / REST API v1',
    items: [
      'Auth & RBAC Guards',
      'OTA Orchestrator',
      'Device PKI & CA Engine',
      'Telemetry Ingestion',
    ],
    icon: 'i-lucide-server',
    color: 'text-primary',
  },
  {
    title: '3. INFRASTRUCTURE',
    badge: 'Persistence & S3',
    badgeColor: 'warning' as const,
    tech: 'PostgreSQL & MinIO / Supabase',
    items: [
      'PostgreSQL Database',
      'Prisma ORM Access',
      'MinIO S3 Binary Bucket',
      'Signed Download URLs',
    ],
    icon: 'i-lucide-database',
    color: 'text-teal-400',
  },
  {
    title: '4. DEVICE LAYER',
    badge: 'Embedded Clients',
    badgeColor: 'success' as const,
    tech: 'ESP32 / ESP8266 C++',
    items: [
      'Arduino-Compatible FOTA',
      'SHA-256 Digest Verification',
      'ECDSA / Ed25519 Signatures',
      'Dual-Partition A/B Rollback',
    ],
    icon: 'i-lucide-cpu',
    color: 'text-emerald-400',
  },
]
</script>

<template>
  <div class="-mx-4 flex flex-col border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
    <div class="flex items-center justify-between border-b border-default bg-elevated/40 p-4 sm:p-5">
      <div class="flex items-center gap-2.5">
        <span class="flex h-2 w-2 rounded-xs bg-emerald-400" />
        <h3 class="font-mono text-xs font-bold tracking-wider text-highlighted uppercase">
          CONNECTED ECOSYSTEM ARCHITECTURE
        </h3>
      </div>
      <UBadge color="primary" variant="subtle" size="xs" class="rounded-xs font-mono text-[10px]">
        REST / HTTPS & S3 Pipe
      </UBadge>
    </div>

    <div class="grid grid-cols-1 gap-px bg-border/20 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="layer in layers"
        :key="layer.title"
        class="flex flex-col justify-between gap-4 bg-default p-4.5 transition-colors sm:p-5 hover:bg-elevated/40"
      >
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <div class="flex h-7 w-7 items-center justify-center rounded-xs border border-default bg-elevated/60">
                <UIcon :name="layer.icon" class="h-3.5 w-3.5" :class="layer.color" aria-hidden="true" />
              </div>
              <span class="font-mono text-[10px] font-bold tracking-wider text-muted uppercase">
                {{ layer.title }}
              </span>
            </div>

            <UBadge :color="layer.badgeColor" variant="outline" size="xs" class="rounded-xs font-mono text-[10px]">
              {{ layer.badge }}
            </UBadge>
          </div>

          <div class="font-mono text-xs font-bold text-highlighted">
            {{ layer.tech }}
          </div>

          <ul class="flex flex-col gap-1.5 pl-1 font-sans text-xs text-muted">
            <li v-for="item in layer.items" :key="item" class="flex items-center gap-1.5">
              <span class="h-1 w-1 rounded-full bg-primary/60" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-2 border-t border-default bg-elevated/40 p-3.5 text-xs sm:p-4">
      <div class="flex items-center gap-2 font-mono text-[11px] text-muted">
        <span class="font-bold text-highlighted uppercase">Data Paths:</span>
        <span>Dashboard ↔ API (HTTPS/JWT)</span>
        <span>•</span>
        <span>Device ↔ API (HTTPS/mTLS)</span>
        <span>•</span>
        <span>Device ↔ Storage (Signed S3 URL)</span>
      </div>
    </div>
  </div>
</template>
