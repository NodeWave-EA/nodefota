<script setup lang="ts">
defineOptions({
  name: 'IntegrationsFinalCTA',
})
</script>

<template>
  <section aria-labelledby="integrations-final-cta-heading" class="w-full">
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
          UNIFIED IOT WORKFLOW
        </UBadge>

        <h2
          id="integrations-final-cta-heading"
          class="font-sans text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl"
        >
          Bring your IoT ecosystem together.
        </h2>

        <p class="font-sans text-base leading-relaxed text-muted">
          Connect embedded devices, manage firmware releases, and coordinate secure updates from one centralised platform.
        </p>
      </div>

      <div class="flex shrink-0 flex-wrap items-center gap-3">
        <UButton
          to="/auth/register"
          color="primary"
          variant="solid"
          size="xl"
          trailing-icon="i-lucide-arrow-right"
          class="rounded-xs font-semibold"
        >
          Get Started
        </UButton>
        <UButton
          to="/security"
          color="neutral"
          variant="outline"
          size="xl"
          leading-icon="i-lucide-shield-check"
          class="rounded-xs font-semibold"
        >
          Explore Security Architecture
        </UButton>
      </div>
    </div>
  </section>
</template>
