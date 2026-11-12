<script setup lang="ts">
defineOptions({
  name: 'HomeFeatures',
})

interface PlatformCapability {
  index: string
  title: string
  summary: string
  icon: string
  scopeLabel: string
  features: string[]
}

const sectionContent = {
  eyebrow: 'PLATFORM CAPABILITIES',
  heading: 'Everything You Need to Manage the Firmware Lifecycle.',
  description:
    'A unified management environment connecting firmware engineering, device identity, secure distribution, deployment orchestration, and operational monitoring.',
  cta: {
    label: 'Explore All Features',
    to: '/features',
    icon: 'i-lucide-arrow-right',
  },
}

const capabilities: PlatformCapability[] = [
  {
    index: '01',
    title: 'Secure Firmware Management',
    summary: 'Manage firmware artefacts through a centralised repository.',
    icon: 'i-lucide-package-check',
    scopeLabel: 'Artefact Repository',
    features: [
      'Firmware binary uploads',
      'Signed upload and download URLs',
      'Firmware metadata and version management',
      'Hardware platform identification',
      'SHA-256 checksum generation and verification',
      'Cryptographically signed firmware manifests',
      'Firmware lifecycle management',
      'Release changelogs',
    ],
  },
  {
    index: '02',
    title: 'Device Fleet Management',
    summary: 'Register, organise, authenticate, and monitor your connected devices.',
    icon: 'i-lucide-server',
    scopeLabel: 'Fleet Registry',
    features: [
      'Device registration',
      'Hardware model identification',
      'Device-specific authentication',
      'Firmware version tracking',
      'Device activity and last-seen information',
      'Device lifecycle status',
      'Device-specific credentials',
      'User-scoped device access',
    ],
  },
  {
    index: '03',
    title: 'Intelligent OTA Campaigns',
    summary: 'Control firmware distribution through structured deployment campaigns.',
    icon: 'i-lucide-radio',
    scopeLabel: 'Rollout Orchestration',
    features: [
      'Immediate deployments',
      'Gradual percentage-based rollouts',
      'Canary deployments',
      'Scheduled deployments',
      'Hardware-based targeting',
      'Firmware version-range targeting',
      'Campaign progress tracking',
      'Failure-rate monitoring',
    ],
  },
  {
    index: '04',
    title: 'Cryptographic Security',
    summary: 'Protect the firmware supply chain using multiple security mechanisms.',
    icon: 'i-lucide-lock-keyhole',
    scopeLabel: 'Supply Chain Trust',
    features: [
      'SHA-256 integrity verification',
      'ECDSA P-256 signatures',
      'Ed25519 signature support',
      'RSA-SHA256 signature support',
      'Device JWT authentication',
      'X.509 certificate management',
      'Mutual TLS authentication',
      'Scoped API keys',
      'Signed firmware manifests',
    ],
  },
  {
    index: '05',
    title: 'Automated Recovery',
    summary: 'Reduce the operational impact of unsuccessful firmware deployments.',
    icon: 'i-lucide-rotate-ccw',
    scopeLabel: 'Rollback & Watchdog',
    features: [
      'Configurable rollback policies',
      'Failure-rate thresholds',
      'Update-state tracking',
      'ESP32 native OTA rollback integration',
      'Post-boot health monitoring',
      'Automatic campaign cancellation on failure conditions',
      'Retry and error reporting',
    ],
  },
  {
    index: '06',
    title: 'Real-Time Observability',
    summary: 'Understand the health and behaviour of your device fleet.',
    icon: 'i-lucide-activity',
    scopeLabel: 'Telemetry & Audit',
    features: [
      'Device heartbeat events',
      'Firmware update progress',
      'Update success and failure events',
      'Telemetry ingestion',
      'Error reporting',
      'Alerting rules',
      'Campaign performance monitoring',
      'Audit history',
    ],
  },
]
</script>

<template>
  <section aria-labelledby="capabilities-heading" class="flex w-full flex-col gap-8">
    <div class="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
      <div class="flex flex-col items-start gap-3">
        <UBadge
          color="primary"
          variant="subtle"
          size="sm"
          class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
        >
          {{ sectionContent.eyebrow }}
        </UBadge>

        <h2
          id="capabilities-heading"
          class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl"
        >
          {{ sectionContent.heading }}
        </h2>

        <p class="font-sans text-base leading-relaxed text-muted">
          {{ sectionContent.description }}
        </p>
      </div>

      <UButton
        :to="sectionContent.cta.to"
        color="neutral"
        variant="outline"
        size="lg"
        :trailing-icon="sectionContent.cta.icon"
        class="shrink-0 rounded-xs font-semibold"
      >
        {{ sectionContent.cta.label }}
      </UButton>
    </div>

    <div
      class="-mx-4 grid grid-cols-1 gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:overflow-hidden sm:rounded-xs sm:border lg:grid-cols-2"
    >
      <article
        v-for="capability in capabilities"
        :key="capability.index"
        class="flex flex-col justify-between gap-5 bg-default px-4 py-6 sm:p-6"
      >
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-2.5">
              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border border-default bg-elevated text-primary"
              >
                <UIcon :name="capability.icon" aria-hidden="true" class="h-4 w-4" />
              </div>
              <span class="font-mono text-xs font-bold text-primary">
                CAPABILITY {{ capability.index }}
              </span>
            </div>

            <UBadge
              color="neutral"
              variant="subtle"
              size="xs"
              class="rounded-xs font-mono text-[11px]"
            >
              {{ capability.scopeLabel }}
            </UBadge>
          </div>

          <div class="flex flex-col gap-1">
            <h3 class="font-sans text-xl font-bold text-highlighted">
              {{ capability.title }}
            </h3>
            <p class="font-sans text-sm text-muted">
              {{ capability.summary }}
            </p>
          </div>
        </div>

        <ul
          class="grid grid-cols-1 gap-x-4 gap-y-2 border-t border-default pt-4 sm:grid-cols-2"
        >
          <li
            v-for="feature in capability.features"
            :key="feature"
            class="flex items-start gap-2 text-xs text-default sm:text-[13px]"
          >
            <UIcon
              name="i-lucide-check"
              aria-hidden="true"
              class="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
            />
            <span class="font-sans leading-snug">{{ feature }}</span>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>
