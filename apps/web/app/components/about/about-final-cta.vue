<script setup lang="ts">
defineOptions({
  name: 'AboutFinalCTA',
})
</script>

<template>
  <section class="flex flex-col items-center justify-between gap-6 rounded-xs border border-default bg-elevated/40 p-6 text-center sm:p-10 my-8">
    <div class="flex max-w-2xl flex-col gap-2">
      <h2 class="font-sans text-2xl font-bold text-highlighted sm:text-3xl">
        Build, connect, and update with confidence.
      </h2>
      <p class="font-sans text-xs text-muted sm:text-sm leading-relaxed">
        Secure firmware management is an essential part of building reliable IoT products. Explore the platform and discover how NodeWave approaches intelligent IoT engineering.
      </p>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-3">
      <UButton
        to="/features"
        color="primary"
        variant="solid"
        size="md"
        class="rounded-xs font-mono text-xs font-bold"
      >
        Explore Features
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
        Visit NodeWave
      </UButton>
    </div>
  </section>
</template>
