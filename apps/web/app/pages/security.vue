<script setup lang="ts">
import SecurityDevicePkiFlow from '~/components/security/security-device-pki-flow.vue'
import SecurityFaq from '~/components/security/security-faq.vue'
import SecurityFinalCta from '~/components/security/security-final-cta.vue'
import SecurityFirmwareVerificationFlow from '~/components/security/security-firmware-verification-flow.vue'
import SecurityHero from '~/components/security/security-hero.vue'
import SecurityLimitations from '~/components/security/security-limitations.vue'
import SecurityPrinciples from '~/components/security/security-priciples.vue'
import SecurityRollbackFlow from '~/components/security/security-rollback-flow.vue'
import SecurityThreatModel from '~/components/security/security-threat-model.vue'

defineOptions({
  name: 'SecurityPage',
})

useSeoMeta({
  title: 'Security | Secure FOTA Platform',
  description:
    'Discover how Secure FOTA Platform protects IoT firmware updates through cryptographic signing, SHA-256 verification, device authentication, TLS, certificate-based identity, audit logging, and rollback policies.',
  ogTitle: 'Security by Design | Secure FOTA Platform',
  ogDescription:
    'Protect firmware integrity, authenticate connected devices, control OTA deployments, and build resilience into your IoT update lifecycle.',
  ogType: 'website',
})
</script>

<template>
  <UContainer class="py-10 sm:py-16 lg:py-20">
    <div class="flex w-full flex-col gap-20 sm:gap-28 lg:gap-32">
      <SecurityHero />

      <!-- 02. Core Security Principles -->
      <SecurityPrinciples />

      <!-- 03. Firmware Verification Sequence -->
      <section id="verification" class="flex flex-col gap-8 scroll-mt-24">
        <div class="flex flex-col items-start gap-3">
          <UBadge color="primary" variant="subtle" size="sm" class="rounded-xs font-mono text-xs font-semibold uppercase">
            FIRMWARE INTEGRITY
          </UBadge>
          <h2 class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
            Device-Side Verification Sequence
          </h2>
          <p class="font-sans text-base text-muted">
            A successful download is not proof of trusted firmware. Verification must happen before writing to flash memory.
          </p>
        </div>

        <SecurityFirmwareVerificationFlow />
      </section>

      <!-- 04. Device PKI & Mutual TLS -->
      <section id="pki-provisioning" class="flex flex-col gap-8 scroll-mt-24">
        <div class="flex flex-col items-start gap-3">
          <UBadge color="primary" variant="subtle" size="sm" class="rounded-xs font-mono text-xs font-semibold uppercase">
            DEVICE IDENTITY
          </UBadge>
          <h2 class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
            Device PKI & Mutual TLS Provisioning
          </h2>
          <p class="font-sans text-base text-muted">
            Establish trusted device identity via local key generation, PKCS#10 CSR submission, and X.509 certificate issuance.
          </p>
        </div>

        <SecurityDevicePkiFlow />
      </section>

      <SecurityArchitecture />

      <!-- 05. Rollback & Recovery -->
      <section id="rollback" class="flex flex-col gap-8 scroll-mt-24">
        <div class="flex flex-col items-start gap-3">
          <UBadge color="warning" variant="subtle" size="sm" class="rounded-xs font-mono text-xs font-semibold uppercase">
            RECOVERY ARCHITECTURE
          </UBadge>
          <h2 class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
            Device Recovery & Rollback Controls
          </h2>
          <p class="font-sans text-base text-muted">
            Implement robust recovery mechanisms to ensure device resilience in the face of failed updates or unexpected behavior.
          </p>
        </div>

        <SecurityRollbackFlow />
      </section>

      <SecurityThreatModel />

      <SecurityLimitations />

      <SecurityFaq />

      <SecurityFinalCta />
    </div>
  </UContainer>
</template>
