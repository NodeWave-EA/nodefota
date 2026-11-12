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
  <section class="flex flex-col gap-4 py-6">
    <div class="flex flex-col gap-1">
      <span class="font-mono text-xs font-bold text-primary uppercase">05 // TARGET FLEETS</span>
      <h2 class="font-sans text-2xl font-bold text-highlighted">
        Who This Platform Is For
      </h2>
    </div>

    <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
      <div class="grid grid-cols-1 gap-px bg-border/20 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in audience"
          :key="item.title"
          class="flex flex-col gap-2 bg-default p-4.5 transition-colors hover:bg-elevated/40"
        >
          <UIcon :name="item.icon" class="h-4 w-4 text-amber-400 shrink-0" />
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
