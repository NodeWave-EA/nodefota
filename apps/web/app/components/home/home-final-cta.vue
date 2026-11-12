<script setup lang="ts">
defineOptions({
  name: 'HomeFinalCTA',
})

const sectionContent = {
  eyebrow: 'TAKE CONTROL OF YOUR FIRMWARE LIFECYCLE',
  heading: 'Make Every Firmware Update Count.',
  description:
    'Secure your firmware distribution workflow, simplify device management, and gain visibility into every deployment with a platform designed for modern IoT development.',
  primaryCta: {
    label: 'Get Started',
    to: '/register',
    icon: 'i-lucide-arrow-right',
  },
  secondaryCta: {
    label: 'Explore Documentation',
    to: '/docs',
    icon: 'i-lucide-book-open',
  },
  supportingText:
    'Secure firmware delivery starts with trusted device identity, verified releases, and reliable deployment workflows.',
}

const readinessRoutes = [
  {
    step: '01',
    title: 'Provision & Authenticate Devices',
    detail: 'Register ESP32/ESP8266 targets with per-device JWT or X.509 / mTLS credentials.',
    to: '/docs/integration',
    linkLabel: 'Integration Guide',
  },
  {
    step: '02',
    title: 'Sign & Publish Releases',
    detail: 'Generate SHA-256 checksums and signed manifests for firmware and LittleFS/SPIFFS assets.',
    to: '/security',
    linkLabel: 'Security Model',
  },
  {
    step: '03',
    title: 'Automate via REST & OpenAPI',
    detail: 'Connect CI/CD pipelines and fleet operations through documented endpoints.',
    to: '/api/docs',
    linkLabel: 'API Reference',
  },
]
</script>

<template>
  <section id="get-started" aria-labelledby="final-cta-heading" class="w-full">
    <div
      class="-mx-4 grid grid-cols-1 gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:overflow-hidden sm:rounded-xs sm:border lg:grid-cols-12"
    >
      <div class="flex flex-col justify-between gap-8 bg-default px-4 py-8 sm:p-8 lg:col-span-7 lg:p-10">
        <div class="flex flex-col items-start gap-4">
          <UBadge
            color="primary"
            variant="subtle"
            size="sm"
            class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
          >
            {{ sectionContent.eyebrow }}
          </UBadge>

          <h2
            id="final-cta-heading"
            class="font-sans text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl"
          >
            {{ sectionContent.heading }}
          </h2>

          <p class="font-sans text-base leading-relaxed text-muted">
            {{ sectionContent.description }}
          </p>

          <div class="flex flex-wrap items-center gap-3 pt-2">
            <UButton
              :to="sectionContent.primaryCta.to"
              color="primary"
              variant="solid"
              size="xl"
              :trailing-icon="sectionContent.primaryCta.icon"
              class="rounded-xs font-semibold transition-transform duration-200 motion-safe:hover:-translate-y-0.5"
            >
              {{ sectionContent.primaryCta.label }}
            </UButton>

            <UButton
              :to="sectionContent.secondaryCta.to"
              color="neutral"
              variant="outline"
              size="xl"
              :leading-icon="sectionContent.secondaryCta.icon"
              class="rounded-xs font-semibold"
            >
              {{ sectionContent.secondaryCta.label }}
            </UButton>
          </div>
        </div>

        <div class="flex items-start gap-2.5 border-t border-default pt-5 sm:items-center">
          <UIcon name="i-lucide-shield-check" aria-hidden="true" class="mt-0.5 h-4 w-4 shrink-0 text-primary sm:mt-0" />
          <p class="font-sans text-xs font-medium text-muted sm:text-sm">
            {{ sectionContent.supportingText }}
          </p>
        </div>
      </div>

      <div class="flex flex-col gap-px bg-border lg:col-span-5">
        <div
          v-for="item in readinessRoutes"
          :key="item.step"
          class="flex flex-1 flex-col justify-between gap-2 bg-elevated/40 px-4 py-5 sm:p-6"
        >
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between gap-2">
              <span class="font-mono text-xs font-bold text-primary">
                STEP {{ item.step }}
              </span>

              <UButton
                :to="item.to"
                color="neutral"
                variant="link"
                size="xs"
                trailing-icon="i-lucide-arrow-up-right"
                class="rounded-xs p-0 font-mono text-xs"
              >
                {{ item.linkLabel }}
              </UButton>
            </div>

            <h3 class="font-sans text-base font-bold text-highlighted">
              {{ item.title }}
            </h3>

            <p class="font-sans text-xs leading-relaxed text-muted sm:text-sm">
              {{ item.detail }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
