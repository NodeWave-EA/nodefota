<script setup lang="ts">
defineOptions({
  name: 'HomeSecurity',
})

interface SecurityLayer {
  layer: string
  domain: 'Control Plane' | 'Supply Chain' | 'Transport' | 'Governance' | 'Embedded & Cloud'
  title: string
  description: string
  icon: string
  mechanisms: string[]
}

const sectionContent = {
  eyebrow: 'SECURITY BY DESIGN',
  heading: 'Trust Every Firmware Release. Authenticate Every Device.',
  description:
    'Firmware security cannot depend on encrypted communication alone. The platform combines device authentication, firmware integrity verification, digital signatures, and recovery mechanisms to protect the update lifecycle.',
  securityStatement:
    'Security is implemented across the firmware supply chain, device identity lifecycle, deployment infrastructure, and embedded installation process.',
  cta: {
    label: 'Explore Security Architecture',
    to: '/security',
    icon: 'i-lucide-arrow-right',
  },
}

const securityLayers: SecurityLayer[] = [
  {
    layer: '01',
    domain: 'Control Plane',
    title: 'Device Identity',
    description:
      'Establish device identity using device-bound credentials and certificate-based authentication.',
    icon: 'i-lucide-fingerprint',
    mechanisms: [
      'Per-device credentials',
      'Device JWT authentication',
      'X.509 certificate provisioning',
      'Mutual TLS authentication',
      'Credential revocation and management',
    ],
  },
  {
    layer: '02',
    domain: 'Supply Chain',
    title: 'Firmware Authenticity',
    description:
      'Ensure that firmware originates from an authorised signing process.',
    icon: 'i-lucide-file-signature',
    mechanisms: [
      'SHA-256 checksums',
      'ECDSA P-256',
      'Ed25519',
      'RSA-SHA256',
      'Signed firmware manifests',
      'Signature verification before installation',
    ],
  },
  {
    layer: '03',
    domain: 'Transport',
    title: 'Secure Distribution',
    description:
      'Protect firmware transfers and access to firmware artefacts.',
    icon: 'i-lucide-lock',
    mechanisms: [
      'HTTPS transport',
      'Signed object-storage URLs',
      'Configurable download URL expiration',
      'Authenticated device access',
      'Controlled firmware availability',
    ],
  },
  {
    layer: '04',
    domain: 'Governance',
    title: 'Operational Protection',
    description:
      'Maintain control over who can perform security-sensitive operations.',
    icon: 'i-lucide-shield-alert',
    mechanisms: [
      'ADMIN and OPERATOR roles',
      'Scoped API keys',
      'Access controls',
      'User-scoped device isolation',
      'Audit logging',
      'Platform activity tracking',
    ],
  },
  {
    layer: '05',
    domain: 'Embedded & Cloud',
    title: 'Firmware Recovery',
    description:
      'Protect devices against unsuccessful deployments.',
    icon: 'i-lucide-rotate-ccw',
    mechanisms: [
      'OTA partition management',
      'Post-boot health validation',
      'ESP32 native rollback support',
      'Configurable failure thresholds',
      'Update-state reporting',
    ],
  },
]
</script>

<template>
  <section id="security" aria-labelledby="security-heading" class="flex w-full flex-col gap-8">
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
          id="security-heading"
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
      class="-mx-4 flex flex-col gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:overflow-hidden sm:rounded-xs sm:border"
    >
      <article
        v-for="item in securityLayers"
        :key="item.layer"
        class="grid grid-cols-1 gap-px bg-border lg:grid-cols-12"
      >
        <div class="flex flex-col justify-between gap-3 bg-default px-4 py-5 sm:p-6 lg:col-span-5">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2.5">
              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border border-default bg-elevated text-primary"
              >
                <UIcon :name="item.icon" aria-hidden="true" class="h-4 w-4" />
              </div>
              <span class="font-mono text-xs font-bold text-primary">
                LAYER {{ item.layer }}
              </span>
            </div>

            <UBadge
              color="neutral"
              variant="outline"
              size="xs"
              class="rounded-xs font-mono text-[10px]"
            >
              {{ item.domain }}
            </UBadge>
          </div>

          <div class="flex flex-col gap-1">
            <h3 class="font-sans text-lg font-bold text-highlighted">
              {{ item.title }}
            </h3>
            <p class="font-sans text-sm leading-relaxed text-muted">
              {{ item.description }}
            </p>
          </div>
        </div>

        <div class="flex items-center bg-elevated/30 px-4 py-5 sm:p-6 lg:col-span-7">
          <ul class="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            <li
              v-for="mechanism in item.mechanisms"
              :key="mechanism"
              class="flex items-start gap-2 rounded-xs border border-default bg-default px-3 py-2.5 text-xs text-default"
            >
              <UIcon
                name="i-lucide-shield-check"
                aria-hidden="true"
                class="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
              />
              <span class="font-mono text-xs leading-snug text-highlighted">
                {{ mechanism }}
              </span>
            </li>
          </ul>
        </div>
      </article>

      <div class="flex items-start gap-3 bg-elevated/60 px-4 py-4 sm:items-center sm:px-6">
        <UIcon name="i-lucide-lock-keyhole" aria-hidden="true" class="mt-0.5 h-4 w-4 shrink-0 text-primary sm:mt-0" />
        <p class="font-sans text-xs font-medium text-highlighted sm:text-sm">
          {{ sectionContent.securityStatement }}
        </p>
      </div>
    </div>
  </section>
</template>
