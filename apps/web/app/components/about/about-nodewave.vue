<script setup lang="ts">
defineOptions({
  name: 'AboutNodeWave',
})

const capabilities = [
  {
    title: 'IoT Engineering & Systems',
    description: 'Embedded firmware design, microcontrollers, and connected hardware architecture.',
    icon: 'i-lucide-cpu',
  },
  {
    title: 'Software & Web Applications',
    description: 'High-throughput backend APIs, cloud platform engineering, and custom web systems.',
    icon: 'i-lucide-code-2',
  },
  {
    title: 'Dashboard & Monitoring',
    description: 'Real-time telemetry collection, operational metrics, and command dashboards.',
    icon: 'i-lucide-layout-dashboard',
  },
  {
    title: 'Automation & Integration',
    description: 'Intelligent technology solutions, system integration, and workflow automation.',
    icon: 'i-lucide-workflow',
  },
]
</script>

<template>
  <section aria-labelledby="about-nodewave-heading" class="flex flex-col gap-6">
    <div class="flex flex-col items-start gap-3">
      <UBadge color="primary" variant="subtle" size="sm" class="rounded-xs font-mono text-xs font-semibold uppercase">
        01 // PARENT ECOSYSTEM
      </UBadge>
      <h2 id="about-nodewave-heading" class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
        Associated with NodeWave
      </h2>
      <p class="max-w-3xl font-sans text-base leading-relaxed text-muted">
        The Secure FOTA Platform is an IoT firmware lifecycle management initiative associated with <strong class="text-highlighted">NodeWave</strong>, an intelligent technology solutions brand helping businesses adopt connected systems, software, and automation.
      </p>
    </div>

    <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
      <div class="flex flex-col justify-between gap-4 border-b border-default bg-elevated/60 p-5 sm:flex-row sm:items-center">
        <AppNodewaveLogo :as-link="false" />

        <UButton
          to="https://nodewave.net"
          target="_blank"
          external
          rel="noopener noreferrer"
          color="primary"
          variant="subtle"
          size="xs"
          trailing-icon="i-lucide-arrow-up-right"
          class="w-fit rounded-xs font-mono text-xs font-bold"
        >
          Visit nodewave.net
        </UButton>
      </div>

      <div class="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in capabilities"
          :key="item.title"
          class="flex flex-col gap-2.5 bg-default p-5 transition-colors hover:bg-elevated/40"
        >
          <div class="flex items-center gap-2">
            <UIcon :name="item.icon" class="size-4 shrink-0 text-primary" aria-hidden="true" />
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
