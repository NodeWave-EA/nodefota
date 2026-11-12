<script setup lang="ts">
defineOptions({
  name: 'HomeArchitecture',
})

interface ArchitectureFlowNode {
  order: string
  label: string
  layer: 'Interface' | 'API & Auth' | 'Persistence' | 'Supply Chain' | 'Device Edge'
  icon: string
}

interface TechnologyDomain {
  domain: string
  icon: string
  components: string[]
}

const sectionContent = {
  eyebrow: 'ENGINEERED AS A MODULAR PLATFORM',
  heading: 'A Complete Architecture for Secure Firmware Management.',
  description:
    'The platform combines a modern web management interface, modular backend services, persistent storage, firmware distribution infrastructure, and embedded device clients.',
  flowHeading: 'End-to-End Firmware Delivery & Telemetry Flow',
  stackHeading: 'Modular Technology Stack',
}

const architectureFlow: ArchitectureFlowNode[] = [
  {
    order: '01',
    label: 'Operator Dashboard',
    layer: 'Interface',
    icon: 'i-lucide-layout-dashboard',
  },
  {
    order: '02',
    label: 'NestJS REST API',
    layer: 'API & Auth',
    icon: 'i-lucide-server',
  },
  {
    order: '03',
    label: 'Authentication and Authorisation',
    layer: 'API & Auth',
    icon: 'i-lucide-shield-check',
  },
  {
    order: '04',
    label: 'PostgreSQL / Prisma',
    layer: 'Persistence',
    icon: 'i-lucide-database',
  },
  {
    order: '05',
    label: 'Firmware Storage',
    layer: 'Persistence',
    icon: 'i-lucide-hard-drive',
  },
  {
    order: '06',
    label: 'Signed Firmware Manifest',
    layer: 'Supply Chain',
    icon: 'i-lucide-file-key-2',
  },
  {
    order: '07',
    label: 'Authenticated IoT Device',
    layer: 'Device Edge',
    icon: 'i-lucide-cpu',
  },
  {
    order: '08',
    label: 'Verification and Installation',
    layer: 'Device Edge',
    icon: 'i-lucide-check-circle-2',
  },
  {
    order: '09',
    label: 'Telemetry and Update Reporting',
    layer: 'Device Edge',
    icon: 'i-lucide-activity',
  },
]

const technologyStack: TechnologyDomain[] = [
  {
    domain: 'Frontend',
    icon: 'i-lucide-monitor',
    components: ['Nuxt 4', 'Vue 3', 'TypeScript'],
  },
  {
    domain: 'Backend',
    icon: 'i-lucide-webhook',
    components: [
      'NestJS',
      'TypeScript',
      'REST API',
      'Swagger / OpenAPI',
    ],
  },
  {
    domain: 'Database',
    icon: 'i-lucide-database',
    components: ['PostgreSQL', 'Prisma ORM'],
  },
  {
    domain: 'Authentication & Storage',
    icon: 'i-lucide-cloud-cog',
    components: [
      'JWT authentication',
      'Supabase Auth',
      'Supabase Storage',
      'S3-compatible object storage',
      'MinIO infrastructure',
    ],
  },
  {
    domain: 'Embedded',
    icon: 'i-lucide-cpu',
    components: [
      'C++',
      'Arduino ecosystem',
      'ESP32',
      'ESP8266',
      'mbedTLS / ESP-IDF cryptographic integration',
    ],
  },
  {
    domain: 'Infrastructure',
    icon: 'i-lucide-container',
    components: [
      'Docker Compose',
      'Containerised services',
      'GitHub Actions CI/CD',
    ],
  },
]
</script>

<template>
  <section id="architecture" aria-labelledby="architecture-heading" class="flex w-full flex-col gap-8">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
      <div class="flex flex-col items-start gap-3 lg:col-span-6">
        <UBadge
          color="primary"
          variant="subtle"
          size="sm"
          class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
        >
          {{ sectionContent.eyebrow }}
        </UBadge>

        <h2
          id="architecture-heading"
          class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl"
        >
          {{ sectionContent.heading }}
        </h2>
      </div>

      <p class="font-sans text-base leading-relaxed text-muted lg:col-span-6">
        {{ sectionContent.description }}
      </p>
    </div>

    <div
      class="-mx-4 flex flex-col gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:overflow-hidden sm:rounded-xs sm:border"
    >
      <div class="flex flex-wrap items-center justify-between gap-2 bg-elevated/60 px-4 py-3 sm:px-6">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-network" aria-hidden="true" class="h-4 w-4 text-primary" />
          <span class="font-mono text-xs font-semibold tracking-wider text-highlighted uppercase">
            {{ sectionContent.flowHeading }}
          </span>
        </div>

        <span class="font-mono text-[11px] text-muted">
          9-Stage Connected Lifecycle
        </span>
      </div>

      <ol
        aria-label="System architecture flow from operator dashboard to device telemetry"
        class="grid grid-cols-1 gap-px bg-border sm:grid-cols-3"
      >
        <li
          v-for="(node, idx) in architectureFlow"
          :key="node.order"
          class="flex flex-col justify-between gap-3 bg-default px-4 py-4 sm:p-5"
        >
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span
                class="flex h-6 w-6 shrink-0 items-center justify-center rounded-xs bg-primary/10 font-mono text-xs font-bold text-primary"
              >
                {{ node.order }}
              </span>
              <span class="font-mono text-[10px] font-medium tracking-wider text-muted uppercase">
                {{ node.layer }}
              </span>
            </div>

            <div class="flex items-center gap-1.5 text-muted">
              <UIcon :name="node.icon" aria-hidden="true" class="h-4 w-4 text-primary" />
              <UIcon
                v-if="idx < architectureFlow.length - 1"
                name="i-lucide-arrow-right"
                aria-hidden="true"
                class="hidden h-3.5 w-3.5 sm:inline-block"
              />
            </div>
          </div>

          <span class="font-sans text-sm font-bold text-highlighted">
            {{ node.label }}
          </span>
        </li>
      </ol>

      <div class="flex items-center justify-between bg-elevated/60 px-4 py-3 sm:px-6">
        <span class="font-mono text-xs font-semibold tracking-wider text-highlighted uppercase">
          {{ sectionContent.stackHeading }}
        </span>
        <span class="font-mono text-[11px] text-muted">
          6 Modular Layers
        </span>
      </div>

      <div class="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="tech in technologyStack"
          :key="tech.domain"
          class="flex flex-col gap-3 bg-default px-4 py-5 sm:p-5"
        >
          <div class="flex items-center gap-2">
            <div
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded-xs border border-default bg-elevated text-primary"
            >
              <UIcon :name="tech.icon" aria-hidden="true" class="h-3.5 w-3.5" />
            </div>
            <h3 class="font-mono text-xs font-bold tracking-wider text-highlighted uppercase">
              {{ tech.domain }}
            </h3>
          </div>

          <div class="flex flex-wrap gap-1.5">
            <UBadge
              v-for="comp in tech.components"
              :key="comp"
              color="neutral"
              variant="outline"
              size="xs"
              class="rounded-xs font-mono text-[11px]"
            >
              {{ comp }}
            </UBadge>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
