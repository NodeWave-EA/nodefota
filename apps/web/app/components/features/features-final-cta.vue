<script setup lang="ts">
defineOptions({
  name: 'FeaturesFinalCTA',
})
</script>

<template>
  <section aria-labelledby="features-final-cta-heading" class="w-full">
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
          TAKE CONTROL OF YOUR FIRMWARE LIFECYCLE
        </UBadge>

        <h2
          id="features-final-cta-heading"
          class="font-sans text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl"
        >
          Take control of your firmware lifecycle.
        </h2>

        <p class="font-sans text-base leading-relaxed text-muted">
          Secure firmware distribution, coordinate OTA deployments, and monitor your connected devices through one platform.
        </p>

        <p class="font-sans text-xs text-muted sm:text-sm">
          Built for embedded developers, IoT engineers, and teams managing connected devices.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3 shrink-0">
        <UButton
          to="/register"
          color="primary"
          variant="solid"
          size="xl"
          trailing-icon="i-lucide-arrow-right"
          class="rounded-xs font-semibold"
        >
          Get Started
        </UButton>

        <UButton
          to="/docs"
          color="neutral"
          variant="outline"
          size="xl"
          leading-icon="i-lucide-book-open"
          class="rounded-xs font-semibold"
        >
          Read the Documentation
        </UButton>
      </div>
    </div>
  </section>
</template>
