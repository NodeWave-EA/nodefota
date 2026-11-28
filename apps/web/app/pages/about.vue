<script setup lang="ts">
import AboutAudience from '~/components/about/about-audience.vue'
import AboutEngineeringPhilosophy from '~/components/about/about-engineering-philosophy.vue'
import AboutFinalCta from '~/components/about/about-final-cta.vue'
import AboutHero from '~/components/about/about-hero.vue'
import AboutNodeWave from '~/components/about/about-nodewave.vue'
import AboutTechnology from '~/components/about/about-technology.vue'
import AboutWhyWeBuilt from '~/components/about/about-why-we-built.vue'

useSeoMeta({
  title: 'About Us | Secure FOTA Platform',
  description:
    'Discover the engineering vision behind Secure FOTA Platform, an IoT firmware update management initiative associated with NodeWave.',
  ogTitle: 'About Us | Secure FOTA Platform & NodeWave',
  ogDescription:
    'Built by engineers who believe IoT devices should remain secure, manageable, and updatable throughout their lifecycle.',
  ogType: 'website',
})
</script>

<template>
  <UContainer class="py-10 sm:py-16 lg:py-20">
    <div class="flex w-full flex-col gap-20 sm:gap-28 lg:gap-32">
      <AboutHero />
      <AboutNodeWave />
      <AboutWhyWeBuilt />
      <AboutEngineeringPhilosophy />
      <AboutTechnology />
      <AboutAudience />
      <AboutFinalCta />
    </div>
  </UContainer>
</template>
