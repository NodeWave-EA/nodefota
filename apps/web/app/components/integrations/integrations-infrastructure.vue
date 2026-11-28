<script setup lang="ts">
import type { IntegrationItem } from '~/types/integrations'

defineOptions({
  name: 'IntegrationsInfrastructure',
})

const infra: IntegrationItem[] = [
  {
    id: 'supabase',
    name: 'Supabase Platform Stack',
    eyebrow: 'BACKEND SERVICES',
    category: 'Infrastructure',
    description: 'Self-hosted Supabase stack supplying authentication services, database management, and platform storage integration.',
    status: 'implemented',
    statusLabel: 'Implemented',
    methodOrTech: 'Supabase Studio & Auth',
    icon: 'i-lucide-layers',
    iconColor: 'text-success',
  },
  {
    id: 'minio',
    name: 'MinIO S3 Object Storage',
    eyebrow: 'S3 BINARY STORAGE',
    category: 'Storage',
    description: 'MinIO provides S3-compatible object storage for firmware binaries and filesystem images with signed delivery URLs.',
    status: 'implemented',
    statusLabel: 'Implemented',
    methodOrTech: 'AWS S3 SDK Compatible',
    icon: 'i-lucide-hard-drive',
    iconColor: 'text-warning',
  },
  {
    id: 'postgres-prisma',
    name: 'PostgreSQL & Prisma ORM',
    eyebrow: 'DATA LAYER',
    category: 'Database',
    description: 'PostgreSQL stores release records, device metadata, and audit logs with type-safe Prisma schema access.',
    status: 'implemented',
    statusLabel: 'Implemented',
    methodOrTech: 'Prisma Client v5',
    icon: 'i-lucide-database',
    iconColor: 'text-info',
  },
  {
    id: 'docker',
    name: 'Docker Compose Self-Hosting',
    eyebrow: 'DEPLOYMENT CONTAINER',
    category: 'DevOps',
    description: 'Entire platform backend, storage, database, and control plane are orchestratable locally via Docker Compose.',
    status: 'implemented',
    statusLabel: 'Implemented',
    methodOrTech: 'docker-compose.yml',
    icon: 'i-lucide-container',
    iconColor: 'text-primary',
  },
]
</script>

<template>
  <section aria-labelledby="integrations-infra-heading" class="flex flex-col gap-6">
    <div class="flex flex-col items-start gap-2">
      <UBadge color="primary" variant="subtle" size="sm" class="rounded-xs font-mono text-xs font-semibold uppercase">
        03 // INFRASTRUCTURE & STORAGE
      </UBadge>
      <h2 id="integrations-infra-heading" class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
        Self-Hosted Enterprise Storage Architecture
      </h2>
    </div>

    <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
      <div class="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in infra"
          :key="item.id"
          class="flex flex-col justify-between gap-3 bg-default p-4.5 transition-colors hover:bg-elevated/40"
        >
          <div class="flex flex-col gap-2.5">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <div class="flex size-7 items-center justify-center rounded-xs border border-default bg-elevated/60">
                  <UIcon :name="item.icon" class="size-3.5" :class="item.iconColor" aria-hidden="true" />
                </div>
                <span class="font-mono text-[10px] font-bold tracking-wider text-muted uppercase">
                  {{ item.eyebrow }}
                </span>
              </div>

              <UBadge color="success" variant="outline" size="xs" class="rounded-xs font-mono text-[10px]">
                {{ item.statusLabel }}
              </UBadge>
            </div>

            <div class="flex flex-col gap-1">
              <h3 class="font-sans text-sm font-bold text-highlighted sm:text-base">
                {{ item.name }}
              </h3>
              <p class="font-sans text-xs leading-relaxed text-muted">
                {{ item.description }}
              </p>
            </div>
          </div>

          <div class="mt-2 truncate font-mono text-[11px] font-semibold text-primary">
            {{ item.methodOrTech }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
