<script setup lang="ts">
import IntegrationArchitecture from '~/components/integrations/integrations-architecture.vue'
import IntegrationsDevelopmentTools from '~/components/integrations/integrations-development-tools.vue'
import IntegrationsDeviceEcosystem from '~/components/integrations/integrations-device-ecosystem.vue'
import IntegrationsFAQ from '~/components/integrations/integrations-faq.vue'
import IntegrationsFinalCTA from '~/components/integrations/integrations-final-cta.vue'
import IntegrationsFuture from '~/components/integrations/integrations-future.vue'
import IntegrationsHero from '~/components/integrations/integrations-hero.vue'
import IntegrationsInfrastructure from '~/components/integrations/integrations-infrastructure.vue'

useSeoMeta({
  title: 'Integrations & Ecosystem | Secure FOTA Platform',
  description:
    'Explore the microcontrollers, C++ libraries, REST APIs, Supabase/MinIO storage, and security mechanisms powering Secure FOTA Platform.',
  ogTitle: 'Integrations & Ecosystem | Secure FOTA Platform',
  ogDescription:
    'Unify ESP32, ESP8266, C++ libraries, REST APIs, and S3 storage into a single secure update workflow.',
  ogType: 'website',
})
</script>

<template>
  <UContainer class="py-10 sm:py-16 lg:py-20">
    <div class="flex w-full flex-col gap-20 sm:gap-28 lg:gap-32">
      <IntegrationsHero />
      <IntegrationArchitecture />
      <IntegrationsDeviceEcosystem />
      <IntegrationsDevelopmentTools />
      <IntegrationsInfrastructure />
      <IntegrationsFuture />
      <IntegrationsFAQ />
      <IntegrationsFinalCTA />
    </div>
  </UContainer>
</template>
