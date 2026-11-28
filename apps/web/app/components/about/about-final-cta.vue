<script setup lang="ts">
defineOptions({
  name: 'AboutFinalCTA',
})
</script>

<template>
  <section aria-labelledby="about-final-cta-heading" class="w-full">
    <div
      class="-mx-4 flex flex-col items-start justify-between gap-6 border-y border-default bg-default px-4 py-8 sm:mx-0 sm:w-full sm:overflow-hidden sm:rounded-xs sm:border sm:p-10 lg:flex-row lg:items-center"
    >
      <div class="flex flex-col items-start gap-3">
        <UBadge
          color="primary"
          variant="subtle"
          size="sm"
          class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
        >
          CONNECTED IOT ENGINEERING
        </UBadge>

        <h2
          id="about-final-cta-heading"
          class="font-sans text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl"
        >
          Build, connect, and update with confidence.
        </h2>

        <p class="font-sans text-base leading-relaxed text-muted">
          Secure firmware management is an essential part of building reliable IoT products. Explore the platform and discover how NodeWave approaches intelligent IoT engineering.
        </p>
      </div>

      <div class="flex shrink-0 flex-wrap items-center gap-3">
        <UButton
          to="/features"
          color="primary"
          variant="solid"
          size="xl"
          trailing-icon="i-lucide-arrow-right"
          class="rounded-xs font-semibold"
        >
          Explore Features
        </UButton>
        <UButton
          to="https://nodewave.net"
          target="_blank"
          external
          rel="noopener noreferrer"
          color="neutral"
          variant="outline"
          size="xl"
          trailing-icon="i-lucide-arrow-up-right"
          class="rounded-xs font-semibold"
        >
          Visit NodeWave
        </UButton>
      </div>
    </div>
  </section>
</template>
