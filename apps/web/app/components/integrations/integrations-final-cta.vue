<script setup lang="ts">
defineOptions({
  name: 'IntegrationsFinalCTA',
})
</script>

<template>
  <section class="flex flex-col items-center justify-between gap-6 rounded-xs border border-default bg-elevated/40 p-6 text-center sm:p-10 my-8">
    <div class="flex max-w-2xl flex-col gap-2">
      <h2 class="font-sans text-2xl font-bold text-highlighted sm:text-3xl">
        Bring your IoT ecosystem together.
      </h2>
      <p class="font-sans text-xs text-muted sm:text-sm leading-relaxed">
        Connect embedded devices, manage firmware releases, and coordinate secure updates from one centralised platform.
      </p>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-3">
      <UButton
        to="/docs"
        color="primary"
        variant="solid"
        size="md"
        class="rounded-xs font-mono text-xs font-bold"
      >
        Get Started
      </UButton>
      <UButton
        to="/security"
        color="neutral"
        variant="outline"
        size="md"
        class="rounded-xs font-mono text-xs font-bold"
      >
        Explore Security Architecture
      </UButton>
    </div>
  </section>
</template>
