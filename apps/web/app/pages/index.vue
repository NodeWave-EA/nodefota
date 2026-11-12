<script setup lang="ts">
import HomeArchitecture from '~/components/home/home-architecture.vue'
import HomeDeploymentStrategies from '~/components/home/home-deployment-strategies.vue'
import HomeDeveloperExperience from '~/components/home/home-developer-experience.vue'
import HomeDeviceEcosystem from '~/components/home/home-device-ecosystem.vue'
import HomeFaq from '~/components/home/home-faq.vue'
import HomeFeatures from '~/components/home/home-features.vue'
import HomeFinalCta from '~/components/home/home-final-cta.vue'
import HomeFleetManagement from '~/components/home/home-fleet-management.vue'
import HomeHero from '~/components/home/home-hero.vue'
import HomeProblem from '~/components/home/home-problem.vue'
import HomeSecurity from '~/components/home/home-security.vue'
import HomeTrustIndicators from '~/components/home/home-trust-indicators.vue'
import HomeWorkflow from '~/components/home/home-workflow.vue'

defineOptions({
  name: 'HomePage',
})

useSeoMeta({
  title: 'NodeFOTA - Secure FOTA Platform',
  description:
    'Secure firmware distribution, manage IoT device fleets, orchestrate OTA campaigns and monitor firmware updates across ESP32 and ESP8266 devices.',
  ogTitle: 'NodeFOTA - Secure FOTA Platform',
  ogDescription:
    'Secure firmware. Reliable updates. Complete fleet control.',
  ogType: 'website',
})
</script>

<template>
  <div class="flex w-full flex-col gap-20 py-12 sm:gap-28 sm:py-16 lg:py-20">
    <!-- Hero -->
    <HomeHero class="scroll-mt-24" />

    <!-- Trust & Technical Indicators -->
    <HomeTrustIndicators class="scroll-mt-24" />

    <!-- Problem Statement -->
    <HomeProblem class="scroll-mt-24" />

    <!-- Core Platform Capabilities -->
    <HomeFeatures class="scroll-mt-24" />

    <!-- How It Works (5-Stage Update Lifecycle) -->
    <HomeWorkflow class="scroll-mt-24" />

    <!-- Security Architecture -->
    <HomeSecurity class="scroll-mt-24" />

    <!-- Supported Device Ecosystem (ESP32 & ESP8266) -->
    <HomeDeviceEcosystem class="scroll-mt-24" />

    <!-- Fleet Management & Operational Visibility -->
    <HomeFleetManagement class="scroll-mt-24" />

    <!-- Controlled Deployments & Rollback Policies -->
    <HomeDeploymentStrategies class="scroll-mt-24" />

    <!-- Developer Experience & Integration Workbench -->
    <HomeDeveloperExperience class="scroll-mt-24" />

    <!-- Platform Architecture & Modular Stack -->
    <HomeArchitecture class="scroll-mt-24" />

    <!-- Frequently Asked Questions -->
    <HomeFaq class="scroll-mt-24" />

    <!-- Final Call to Action -->
    <HomeFinalCta class="scroll-mt-24" />
  </div>
</template>
