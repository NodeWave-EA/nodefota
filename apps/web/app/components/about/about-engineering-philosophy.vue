<script setup lang="ts">
defineOptions({
  name: 'AboutEngineeringPhilosophy',
})

const principles = [
  {
    title: 'Security by Design',
    description: 'Firmware authenticity, device identity, authenticated communication, and access control are core parts of the update architecture.',
    icon: 'i-lucide-lock',
  },
  {
    title: 'Reliability Over Convenience',
    description: 'An update process must account for interrupted downloads, invalid checksums, failed installations, and boot watchdog resets.',
    icon: 'i-lucide-shield-alert',
  },
  {
    title: 'Designed for Constrained Devices',
    description: 'Embedded systems have limited memory and power. Workflows are optimized for ESP32 and ESP8266 flash layouts.',
    icon: 'i-lucide-cpu',
  },
  {
    title: 'Open & Interoperable Tech',
    description: 'Built on established standards including Arduino C++, REST APIs, PostgreSQL, and S3-compatible object storage.',
    icon: 'i-lucide-layers',
  },
  {
    title: 'Transparency & Observability',
    description: 'Device status, deployment progress, telemetry, and immutable audit records give operators full fleet visibility.',
    icon: 'i-lucide-eye',
  },
]
</script>

<template>
  <section class="flex flex-col gap-4 py-6">
    <div class="flex flex-col gap-1">
      <span class="font-mono text-xs font-bold text-primary uppercase">03 // CORE VALUES</span>
      <h2 class="font-sans text-2xl font-bold text-highlighted">
        Engineering Philosophy
      </h2>
    </div>

    <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
      <div class="grid grid-cols-1 gap-px bg-border/20 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in principles"
          :key="item.title"
          class="flex flex-col gap-2.5 bg-default p-4.5 transition-colors hover:bg-elevated/40"
        >
          <div class="flex items-center gap-2">
            <div class="flex h-7 w-7 items-center justify-center rounded-xs border border-default bg-elevated/60">
              <UIcon :name="item.icon" class="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <h3 class="font-sans text-sm font-bold text-highlighted">
              {{ item.title }}
            </h3>
          </div>
          <p class="font-sans text-xs leading-relaxed text-muted">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
