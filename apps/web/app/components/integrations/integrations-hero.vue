<script setup lang="ts">
defineOptions({
  name: 'IntegrationsHero',
})

const highlights = [
  {
    label: 'ESP32 & ESP8266',
    icon: 'i-lucide-cpu',
    iconColor: 'text-warning',
  },
  {
    label: 'Arduino C++ API',
    icon: 'i-lucide-code-2',
    iconColor: 'text-primary',
  },
  {
    label: 'REST / HTTPS v1',
    icon: 'i-lucide-globe',
    iconColor: 'text-info',
  },
  {
    label: 'Docker Self-Hosted',
    icon: 'i-lucide-container',
    iconColor: 'text-success',
  },
]
</script>

<template>
  <section aria-labelledby="integrations-hero-heading" class="w-full">
    <div class="flex flex-col items-start gap-6 text-left">
      <UBadge
        color="primary"
        variant="subtle"
        size="md"
        class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
      >
        ECOSYSTEM & INTEGRATIONS
      </UBadge>

      <h1
        id="integrations-hero-heading"
        class="font-sans text-4xl font-extrabold tracking-tight text-highlighted sm:text-5xl lg:text-6xl lg:leading-[1.12]"
      >
        Connect your devices. Secure your firmware. Control every update.
      </h1>

      <p class="max-w-3xl font-sans text-lg leading-relaxed text-muted sm:text-xl">
        The Secure FOTA Platform connects microcontroller development boards, firmware libraries, backend infrastructure, and security technologies into a single firmware update workflow.
      </p>

      <div class="flex flex-wrap items-center gap-3 pt-2">
        <UButton
          to="/docs"
          color="primary"
          variant="solid"
          size="xl"
          leading-icon="i-lucide-book-open"
          class="rounded-xs font-semibold"
        >
          Explore Documentation
        </UButton>
        <UButton
          to="#devices"
          color="neutral"
          variant="outline"
          size="xl"
          trailing-icon="i-lucide-arrow-down"
          class="rounded-xs font-semibold"
        >
          View Device Matrix
        </UButton>
      </div>

      <div class="-mx-4 grid grid-cols-2 gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:grid-cols-4 sm:overflow-hidden sm:rounded-xs sm:border">
        <div
          v-for="item in highlights"
          :key="item.label"
          class="flex items-center gap-2.5 bg-default px-4 py-3.5 font-mono text-xs"
        >
          <UIcon :name="item.icon" class="size-4 shrink-0" :class="item.iconColor" aria-hidden="true" />
          <span class="font-semibold text-highlighted">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
