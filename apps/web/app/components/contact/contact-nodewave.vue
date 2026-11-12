<script setup lang="ts">
defineOptions({
  name: 'ContactNodeWave',
})
</script>

<template>
  <section class="flex flex-col gap-4 py-6">
    <div class="-mx-4 flex flex-col justify-between gap-4 border-y border-default bg-elevated/40 p-5 sm:mx-0 sm:rounded-xs sm:border sm:flex-row sm:items-center sm:p-6">
      <div class="flex flex-col gap-1 max-w-xl">
        <span class="font-mono text-[10px] font-bold text-primary uppercase">ECOSYSTEM PARTNER</span>
        <h3 class="font-sans text-lg font-bold text-highlighted">
          An IoT Engineering Initiative Associated with NodeWave
        </h3>
        <p class="font-sans text-xs text-muted leading-relaxed">
          For broader business enquiries, custom IoT solutions, and software automation services, visit the NodeWave site or contact <strong class="text-highlighted">info@nodewave.net</strong>.
        </p>
      </div>

      <UButton
        to="https://nodewave.net"
        target="_blank"
        color="primary"
        variant="subtle"
        size="md"
        icon="i-lucide-external-link"
        class="rounded-xs font-mono text-xs font-bold w-fit shrink-0"
      >
        Visit nodewave.net
      </UButton>
    </div>
  </section>
</template>
