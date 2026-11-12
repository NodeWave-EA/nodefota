<script setup lang="ts">
defineOptions({
  name: 'ContactHero',
})
</script>

<template>
  <section class="flex flex-col gap-6 py-8 sm:py-12">
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <UBadge color="warning" variant="subtle" size="xs" class="rounded-xs font-mono text-[10px] font-bold tracking-wider uppercase">
          CONTACT & SUPPORT
        </UBadge>
      </div>

      <h1 class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl lg:text-5xl">
        Let's build more reliable IoT systems.
      </h1>

      <p class="max-w-3xl font-sans text-sm text-muted sm:text-base leading-relaxed">
        Have a question about secure firmware updates, device integration, deployment, or the platform? Get in touch with the team.
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <UButton
        to="#contact-form"
        color="primary"
        variant="solid"
        size="md"
        class="rounded-xs font-mono text-xs font-bold"
      >
        Send an Enquiry
      </UButton>
      <UButton
        to="/docs"
        color="neutral"
        variant="outline"
        size="md"
        class="rounded-xs font-mono text-xs font-bold"
      >
        Explore Documentation
      </UButton>
    </div>

    <div class="mt-2 rounded-xs border border-default bg-elevated/40 p-4 font-mono text-xs text-muted sm:p-5">
      <span class="text-primary">"</span>Tell us what you're building, what you're trying to achieve, or where you're running into trouble.<span class="text-primary">"</span>
    </div>
  </section>
</template>
