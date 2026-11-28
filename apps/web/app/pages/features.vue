<script setup lang="ts">
import FeatureGrid from '~/components/features/feature-grid.vue'
import FeaturesFaq from '~/components/features/features-faq.vue'
import FeaturesFinalCta from '~/components/features/features-final-cta.vue'
import FeaturesHero from '~/components/features/features-hero.vue'

import {
  AUDIT_ADMINISTRATION_SECTION,
  CAMPAIGN_MANAGEMENT_SECTION,
  DEVELOPER_INTEGRATION_SECTION,
  DEVICE_IDENTITY_SECTION,
  EMBEDDED_LIBRARIES_SECTION,
  FIRMWARE_MANAGEMENT_SECTION,
  FIRMWARE_SECURITY_SECTION,
  FLEET_MONITORING_SECTION,
  ROLLBACK_RECOVERY_SECTION,
} from '~/content/features'

defineOptions({
  name: 'FeaturesPage',
})

useSeoMeta({
  title: 'Features | Secure FOTA Platform',
  description:
    'Explore secure firmware management, cryptographic verification, device authentication, controlled OTA deployments, fleet monitoring, and rollback capabilities.',
  ogTitle: 'Secure FOTA Platform Features',
  ogDescription:
    'Discover the tools for secure IoT firmware lifecycle management.',
  ogType: 'website',
})
</script>

<template>
  <UContainer class="py-10 sm:py-16 lg:py-20">
    <div id="capabilities" class="flex w-full flex-col gap-20 sm:gap-28 lg:gap-32">
      <!-- Hero Header -->
      <FeaturesHero />

      <!-- Firmware Lifecycle Management -->
      <FeatureGrid :config="FIRMWARE_MANAGEMENT_SECTION" />

      <!-- Cryptographic Firmware Security -->
      <FeatureGrid :config="FIRMWARE_SECURITY_SECTION" />

      <!-- Device Identity and Authentication -->
      <FeatureGrid :config="DEVICE_IDENTITY_SECTION" />

      <!-- OTA Campaign Management -->
      <FeatureGrid :config="CAMPAIGN_MANAGEMENT_SECTION" />

      <!-- Fleet Monitoring and Telemetry -->
      <FeatureGrid :config="FLEET_MONITORING_SECTION" />

      <!-- Rollback and Recovery -->
      <FeatureGrid :config="ROLLBACK_RECOVERY_SECTION" />

      <!-- Embedded Client Libraries -->
      <FeatureGrid :config="EMBEDDED_LIBRARIES_SECTION" />

      <!-- Audit and Administrative Controls -->
      <FeatureGrid :config="AUDIT_ADMINISTRATION_SECTION" />

      <!-- Developer Integration -->
      <FeatureGrid :config="DEVELOPER_INTEGRATION_SECTION" />

      <!-- Frequently Asked Questions -->
      <FeaturesFaq />

      <!-- Final Call to Action -->
      <FeaturesFinalCta />
    </div>
  </UContainer>
</template>
