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
  <section class="flex flex-col gap-4 py-6">
    <div class="flex flex-col gap-1">
      <span class="font-mono text-xs font-bold text-primary uppercase">01 // PARENT ECOSYSTEM</span>
      <h2 class="font-sans text-2xl font-bold text-highlighted">
        Associated with NodeWave
      </h2>
      <p class="font-sans text-xs text-muted leading-relaxed max-w-3xl">
        The Secure FOTA Platform is an IoT firmware lifecycle management initiative associated with <strong>NodeWave</strong>, an intelligent technology solutions brand helping businesses adopt connected systems, software, and automation.
      </p>
    </div>

    <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
      <div class="flex flex-col justify-between gap-4 border-b border-default bg-elevated/60 p-5 sm:flex-row sm:items-center">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xs border border-primary/30 bg-primary/10">
            <UIcon name="i-lucide-waves" class="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 class="font-mono text-sm font-bold text-highlighted uppercase">
              NODEWAVE
            </h3>
            <p class="font-sans text-xs text-muted">
              Intelligent IoT & Software Solutions
            </p>
          </div>
        </div>

        <UButton
          to="https://nodewave.net"
          target="_blank"
          color="primary"
          variant="subtle"
          size="xs"
          icon="i-lucide-external-link"
          class="rounded-xs font-mono text-xs font-bold w-fit"
        >
          Visit nodewave.net
        </UButton>
      </div>

      <div class="grid grid-cols-1 gap-px bg-border/20 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in capabilities"
          :key="item.title"
          class="flex flex-col gap-2 bg-default p-4.5 transition-colors hover:bg-elevated/40"
        >
          <div class="flex items-center gap-2">
            <UIcon :name="item.icon" class="h-4 w-4 text-amber-400 shrink-0" />
            <h4 class="font-sans text-xs font-bold text-highlighted">
              {{ item.title }}
            </h4>
          </div>
          <p class="font-sans text-xs leading-relaxed text-muted">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
