<script setup lang="ts">
defineOptions({
  name: 'AboutAudience',
})

const audience = [
  {
    title: 'Embedded Systems Developers',
    description: 'Integrate reliable firmware update functionality into ESP32 and ESP8266 C++ applications.',
    icon: 'i-lucide-cpu',
  },
  {
    title: 'IoT Product Developers',
    description: 'Establish a centralized firmware management workflow for commercial connected products.',
    icon: 'i-lucide-box',
  },
  {
    title: 'Industrial IoT Operators',
    description: 'Manage fleet-wide releases with controlled rollout strategies and real-time telemetry.',
    icon: 'i-lucide-factory',
  },
  {
    title: 'Cybersecurity Engineers',
    description: 'Apply device identity, firmware signature verification, and mTLS transport controls.',
    icon: 'i-lucide-shield-check',
  },
]
</script>

<template>
  <section aria-labelledby="about-audience-heading" class="flex flex-col gap-6">
    <div class="flex flex-col items-start gap-3">
      <UBadge color="primary" variant="subtle" size="sm" class="rounded-xs font-mono text-xs font-semibold uppercase">
        05 // TARGET FLEETS
      </UBadge>
      <h2 id="about-audience-heading" class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
        Who This Platform Is For
      </h2>
    </div>

    <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
      <div class="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in audience"
          :key="item.title"
          class="flex flex-col gap-2.5 bg-default p-5 transition-colors hover:bg-elevated/40"
        >
          <div class="flex size-7 items-center justify-center rounded-xs border border-default bg-elevated/60">
            <UIcon :name="item.icon" class="size-3.5 text-primary" aria-hidden="true" />
          </div>
          <h3 class="font-sans text-sm font-bold text-highlighted">
            {{ item.title }}
          </h3>
          <p class="font-sans text-xs leading-relaxed text-muted">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
