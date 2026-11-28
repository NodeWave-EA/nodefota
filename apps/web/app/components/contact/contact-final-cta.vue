<script setup lang="ts">
defineOptions({
  name: 'ContactFinalCTA',
})
</script>

<template>
  <section aria-labelledby="contact-final-cta-heading" class="w-full">
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
          START A CONVERSATION
        </UBadge>

        <h2
          id="contact-final-cta-heading"
          class="font-sans text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl"
        >
          Have an IoT challenge to solve?
        </h2>

        <p class="font-sans text-base leading-relaxed text-muted">
          Let's discuss how secure firmware delivery, device management, and reliable OTA workflows can fit into your project.
        </p>
      </div>

      <div class="flex shrink-0 flex-wrap items-center gap-3">
        <UButton
          to="#contact-form"
          color="primary"
          variant="solid"
          size="xl"
          trailing-icon="i-lucide-arrow-up"
          class="rounded-xs font-semibold"
        >
          Contact the Team
        </UButton>
        <UButton
          to="/features"
          color="neutral"
          variant="outline"
          size="xl"
          leading-icon="i-lucide-layers"
          class="rounded-xs font-semibold"
        >
          Explore Platform Features
        </UButton>
      </div>
    </div>
  </section>
</template>
