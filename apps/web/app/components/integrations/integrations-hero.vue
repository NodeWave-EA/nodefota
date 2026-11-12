<script setup lang="ts">
defineOptions({
  name: 'IntegrationsHero',
})
</script>

<template>
  <section class="flex flex-col gap-6 py-8 sm:py-12">
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <UBadge color="warning" variant="subtle" size="xs" class="rounded-xs font-mono text-[10px] font-bold tracking-wider uppercase">
          ECOSYSTEM & INTEGRATIONS
        </UBadge>
      </div>

      <h1 class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl lg:text-5xl">
        Connect your devices. Secure your firmware. Control every update.
      </h1>

      <p class="max-w-3xl font-sans text-sm text-muted sm:text-base leading-relaxed">
        The Secure FOTA Platform connects microcontroller development boards, firmware libraries, backend infrastructure, and security technologies into a single firmware update workflow.
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <UButton
        to="/docs"
        color="primary"
        variant="solid"
        size="md"
        class="rounded-xs font-mono text-xs font-bold"
      >
        Explore Documentation
      </UButton>
      <UButton
        to="#devices"
        color="neutral"
        variant="outline"
        size="md"
        class="rounded-xs font-mono text-xs font-bold"
      >
        View Device Matrix
      </UButton>
    </div>

    <div class="grid grid-cols-2 gap-2 pt-2 sm:grid-cols-4">
      <div class="flex items-center gap-2 rounded-xs border border-default bg-elevated/30 p-2.5 font-mono text-xs">
        <UIcon name="i-lucide-cpu" class="h-4 w-4 text-amber-400 shrink-0" />
        <span class="text-highlighted">ESP32 & ESP8266</span>
      </div>
      <div class="flex items-center gap-2 rounded-xs border border-default bg-elevated/30 p-2.5 font-mono text-xs">
        <UIcon name="i-lucide-code-2" class="h-4 w-4 text-primary shrink-0" />
        <span class="text-highlighted">Arduino C++ API</span>
      </div>
      <div class="flex items-center gap-2 rounded-xs border border-default bg-elevated/30 p-2.5 font-mono text-xs">
        <UIcon name="i-lucide-globe" class="h-4 w-4 text-teal-400 shrink-0" />
        <span class="text-highlighted">REST / HTTPS v1</span>
      </div>
      <div class="flex items-center gap-2 rounded-xs border border-default bg-elevated/30 p-2.5 font-mono text-xs">
        <UIcon name="i-lucide-container" class="h-4 w-4 text-emerald-400 shrink-0" />
        <span class="text-highlighted">Docker Self-Hosted</span>
      </div>
    </div>
  </section>
</template>
