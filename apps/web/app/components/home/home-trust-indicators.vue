<script setup lang="ts">
defineOptions({
  name: 'HomeTrustIndicators',
})

interface TechnicalIndicator {
  id: string
  category: string
  title: string
  description: string
  icon: string
  scope: 'Embedded & Cloud' | 'Cryptographic' | 'Platform Core'
}

const sectionContent = {
  eyebrow: 'TECHNICAL FOUNDATIONS',
  heading: 'Built Around the Foundations of Secure OTA',
  description:
    'Every stage of firmware delivery is designed around security, integrity, authentication, and operational reliability.',
  compatibilityNote:
    'Cryptographic algorithm availability varies between ESP32 and ESP8266 toolchains. Review hardware compatibility matrices before production deployment.',
  compatibilityLink: {
    label: 'Toolchain & Hardware Compatibility',
    to: '/docs',
  },
}

const indicators: TechnicalIndicator[] = [
  {
    id: 'ecosystem',
    category: 'HARDWARE TARGETS',
    title: 'ESP32 & ESP8266',
    description: 'Embedded device ecosystem supported via dedicated C++ client libraries.',
    icon: 'i-lucide-cpu',
    scope: 'Embedded & Cloud',
  },
  {
    id: 'integrity',
    category: 'INTEGRITY CHECK',
    title: 'SHA-256',
    description: 'Firmware integrity verification prior to OTA partition installation.',
    icon: 'i-lucide-fingerprint',
    scope: 'Cryptographic',
  },
  {
    id: 'signatures',
    category: 'DIGITAL SIGNATURES',
    title: 'ECDSA / Ed25519 / RSA',
    description: 'Cryptographic signature algorithms for verifiable firmware manifests.',
    icon: 'i-lucide-file-key-2',
    scope: 'Cryptographic',
  },
  {
    id: 'auth',
    category: 'DEVICE IDENTITY',
    title: 'X.509 / mTLS',
    description: 'Certificate-based device authentication and mutual TLS transport.',
    icon: 'i-lucide-shield-check',
    scope: 'Cryptographic',
  },
  {
    id: 'storage',
    category: 'DATA LAYER',
    title: 'PostgreSQL',
    description: 'Persistent platform data, release metadata, and audit history.',
    icon: 'i-lucide-database',
    scope: 'Platform Core',
  },
  {
    id: 'api',
    category: 'INTEGRATION',
    title: 'REST API',
    description: 'Documented OpenAPI interface for fleet, campaign, and CI/CD automation.',
    icon: 'i-lucide-webhook',
    scope: 'Platform Core',
  },
]
</script>

<template>
  <section aria-labelledby="trust-indicators-heading" class="flex w-full flex-col gap-8">
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <UBadge
          color="primary"
          variant="subtle"
          size="sm"
          class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
        >
          {{ sectionContent.eyebrow }}
        </UBadge>
      </div>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
        <h2
          id="trust-indicators-heading"
          class="font-sans text-2xl font-bold tracking-tight text-highlighted sm:text-3xl lg:col-span-6"
        >
          {{ sectionContent.heading }}
        </h2>

        <p class="font-sans text-sm leading-relaxed text-muted sm:text-base lg:col-span-6">
          {{ sectionContent.description }}
        </p>
      </div>
    </div>

    <div
      class="-mx-4 grid grid-cols-1 gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:grid-cols-2 sm:overflow-hidden sm:rounded-xs sm:border lg:grid-cols-3"
    >
      <div
        v-for="item in indicators"
        :key="item.id"
        class="flex flex-col justify-between gap-4 bg-default px-4 py-5 transition-colors duration-200 hover:bg-elevated/50 sm:p-5"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-2.5">
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border border-default bg-elevated text-primary"
            >
              <UIcon :name="item.icon" aria-hidden="true" class="h-4 w-4" />
            </div>
            <span class="font-mono text-[11px] font-medium tracking-wider text-muted uppercase">
              {{ item.category }}
            </span>
          </div>

          <UBadge
            color="neutral"
            variant="outline"
            size="xs"
            class="rounded-xs font-mono text-[10px]"
          >
            {{ item.scope }}
          </UBadge>
        </div>

        <div class="flex flex-col gap-1.5">
          <h3 class="font-mono text-base font-bold tracking-tight text-highlighted">
            {{ item.title }}
          </h3>
          <p class="font-sans text-xs leading-relaxed text-muted sm:text-sm">
            {{ item.description }}
          </p>
        </div>
      </div>

      <div
        class="flex flex-wrap items-center justify-between gap-3 bg-elevated/40 px-4 py-3.5 sm:col-span-2 sm:px-5 lg:col-span-3"
      >
        <div class="flex items-center gap-2 text-xs text-muted">
          <UIcon name="i-lucide-info" aria-hidden="true" class="h-4 w-4 shrink-0 text-primary" />
          <span class="font-sans">{{ sectionContent.compatibilityNote }}</span>
        </div>

        <UButton
          :to="sectionContent.compatibilityLink.to"
          color="neutral"
          variant="link"
          size="xs"
          trailing-icon="i-lucide-arrow-up-right"
          class="rounded-xs p-0 font-mono text-xs"
        >
          {{ sectionContent.compatibilityLink.label }}
        </UButton>
      </div>
    </div>
  </section>
</template>
