<script setup lang="ts">
defineOptions({
  name: 'ContactNodeWave',
})
</script>

<template>
  <section aria-labelledby="contact-nodewave-heading" class="w-full">
    <div
      class="-mx-4 flex flex-col justify-between gap-6 border-y border-default bg-elevated/40 px-4 py-6 sm:mx-0 sm:rounded-xs sm:border sm:p-8 lg:flex-row lg:items-center"
    >
      <div class="flex max-w-2xl flex-col gap-3">
        <div class="flex flex-wrap items-center gap-3">
          <AppNodewaveLogo :as-link="false" />
          <UBadge
            color="primary"
            variant="subtle"
            size="xs"
            class="rounded-xs font-mono text-[10px] font-bold tracking-wider uppercase"
          >
            ECOSYSTEM PARTNER
          </UBadge>
        </div>

        <h3
          id="contact-nodewave-heading"
          class="font-sans text-lg font-bold text-highlighted sm:text-xl"
        >
          An IoT Engineering Initiative Associated with NodeWave
        </h3>

        <p class="font-sans text-xs leading-relaxed text-muted sm:text-sm">
          For broader business enquiries, custom IoT solutions, and software automation services, visit the NodeWave site or contact
          <a href="mailto:info@nodewave.net" class="font-mono font-semibold text-primary hover:underline">info@nodewave.net</a>.
        </p>
      </div>

      <UButton
        to="https://nodewave.net"
        target="_blank"
        external
        rel="noopener noreferrer"
        color="primary"
        variant="subtle"
        size="md"
        trailing-icon="i-lucide-arrow-up-right"
        class="w-fit shrink-0 rounded-xs font-mono text-xs font-bold"
      >
        Visit nodewave.net
      </UButton>
    </div>
  </section>
</template>
