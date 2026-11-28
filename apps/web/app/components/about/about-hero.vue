<script setup lang="ts">
defineOptions({
  name: 'AboutHero',
})
</script>

<template>
  <section aria-labelledby="about-hero-heading" class="w-full">
    <div class="flex flex-col items-start gap-6 text-left">
      <UBadge
        color="primary"
        variant="subtle"
        size="md"
        class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
      >
        AN IOT ENGINEERING INITIATIVE BY NODEWAVE
      </UBadge>

      <h1
        id="about-hero-heading"
        class="font-sans text-4xl font-extrabold tracking-tight text-highlighted sm:text-5xl lg:text-6xl lg:leading-[1.12]"
      >
        Building a more secure future for connected devices.
      </h1>

      <p class="max-w-3xl font-sans text-lg leading-relaxed text-muted sm:text-xl">
        IoT devices are deployed across environments where reliability, security, and long-term maintainability matter. Keeping their firmware secure and up to date should not be complicated.
      </p>

      <div class="flex flex-wrap items-center gap-3 pt-2">
        <UButton
          to="/features"
          color="primary"
          variant="solid"
          size="xl"
          trailing-icon="i-lucide-arrow-right"
          class="rounded-xs font-semibold"
        >
          Explore the Platform
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
          Discover NodeWave
        </UButton>
      </div>

      <div class="-mx-4 border-y border-default bg-elevated/40 px-4 py-4 font-mono text-xs text-muted sm:mx-0 sm:w-full sm:rounded-xs sm:border sm:p-5">
        <span class="text-primary">"</span>Built by engineers who believe IoT devices should remain secure, manageable, and updatable throughout their lifecycle.<span class="text-primary">"</span>
      </div>
    </div>
  </section>
</template>
