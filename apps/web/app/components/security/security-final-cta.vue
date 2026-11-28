<script setup lang="ts">
defineOptions({
  name: 'SecurityFinalCTA',
})
</script>

<template>
  <section aria-labelledby="sec-final-cta-heading" class="w-full">
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
          VERIFIED FIRMWARE DISTRIBUTION
        </UBadge>

        <h2
          id="sec-final-cta-heading"
          class="font-sans text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl"
        >
          Make every firmware update a verified operation.
        </h2>

        <p class="font-sans text-base leading-relaxed text-muted">
          Protect device identity, verify firmware authenticity, manage deployment risk, and build recovery into your IoT update lifecycle.
        </p>

        <p class="font-sans text-xs text-muted sm:text-sm">
          Secure firmware updates begin with a process you can verify.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3 shrink-0">
        <UButton
          to="/auth/register"
          color="primary"
          variant="solid"
          size="xl"
          trailing-icon="i-lucide-arrow-right"
          class="rounded-xs font-semibold transition-transform duration-200 motion-safe:hover:-translate-y-0.5"
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
          Explore Documentation
        </UButton>
      </div>
    </div>
  </section>
</template>
