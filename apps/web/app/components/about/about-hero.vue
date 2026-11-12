<script setup lang="ts">
defineOptions({
  name: 'AboutHero',
})
</script>

<template>
  <section class="flex flex-col gap-6 py-8 sm:py-12">
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <UBadge color="warning" variant="subtle" size="xs" class="rounded-xs font-mono text-[10px] font-bold tracking-wider uppercase">
          AN IOT ENGINEERING INITIATIVE BY NODEWAVE
        </UBadge>
      </div>

      <h1 class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl lg:text-5xl">
        Building a more secure future for connected devices.
      </h1>

      <p class="max-w-3xl font-sans text-sm text-muted sm:text-base leading-relaxed">
        IoT devices are deployed across environments where reliability, security, and long-term maintainability matter. Keeping their firmware secure and up to date should not be complicated.
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <UButton
        to="/features"
        color="primary"
        variant="solid"
        size="md"
        class="rounded-xs font-mono text-xs font-bold"
      >
        Explore the Platform
      </UButton>
      <UButton
        to="https://nodewave.net"
        target="_blank"
        color="neutral"
        variant="outline"
        size="md"
        icon="i-lucide-external-link"
        class="rounded-xs font-mono text-xs font-bold"
      >
        Discover NodeWave
      </UButton>
    </div>

    <div class="mt-2 rounded-xs border border-default bg-elevated/40 p-4 font-mono text-xs text-muted sm:p-5">
      <span class="text-primary">"</span>Built by engineers who believe IoT devices should remain secure, manageable, and updatable throughout their lifecycle.<span class="text-primary">"</span>
    </div>
  </section>
</template>
