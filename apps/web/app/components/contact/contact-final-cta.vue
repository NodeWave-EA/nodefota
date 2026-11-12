<script setup lang="ts">
defineOptions({
  name: 'ContactFinalCTA',
})
</script>

<template>
  <section class="flex flex-col items-center justify-between gap-6 rounded-xs border border-default bg-elevated/40 p-6 text-center sm:p-10 my-8">
    <div class="flex max-w-2xl flex-col gap-2">
      <h2 class="font-sans text-2xl font-bold text-highlighted sm:text-3xl">
        Have an IoT challenge to solve?
      </h2>
      <p class="font-sans text-xs text-muted sm:text-sm leading-relaxed">
        Let's discuss how secure firmware delivery, device management, and reliable OTA workflows can fit into your project.
      </p>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-3">
      <UButton
        to="#contact-form"
        color="primary"
        variant="solid"
        size="md"
        class="rounded-xs font-mono text-xs font-bold"
      >
        Contact the Team
      </UButton>
      <UButton
        to="/features"
        color="neutral"
        variant="outline"
        size="md"
        class="rounded-xs font-mono text-xs font-bold"
      >
        Explore Platform Features
      </UButton>
    </div>
  </section>
</template>
