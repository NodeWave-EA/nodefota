<script setup lang="ts">
defineOptions({
  name: 'ContactHero',
})
</script>

<template>
  <section aria-labelledby="contact-hero-heading" class="w-full">
    <div class="flex flex-col items-start gap-6 text-left">
      <UBadge
        color="primary"
        variant="subtle"
        size="md"
        class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
      >
        CONTACT & SUPPORT
      </UBadge>

      <h1
        id="contact-hero-heading"
        class="font-sans text-4xl font-extrabold tracking-tight text-highlighted sm:text-5xl lg:text-6xl lg:leading-[1.12]"
      >
        Let's build more reliable IoT systems.
      </h1>

      <p class="max-w-3xl font-sans text-lg leading-relaxed text-muted sm:text-xl">
        Have a question about secure firmware updates, device integration, deployment, or the platform? Get in touch with the team.
      </p>

      <div class="flex flex-wrap items-center gap-3 pt-2">
        <UButton
          to="#contact-form"
          color="primary"
          variant="solid"
          size="xl"
          trailing-icon="i-lucide-arrow-down"
          class="rounded-xs font-semibold"
        >
          Send an Enquiry
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

      <div class="-mx-4 border-y border-default bg-elevated/40 px-4 py-4 font-mono text-xs text-muted sm:mx-0 sm:w-full sm:rounded-xs sm:border sm:p-5">
        <span class="text-primary">"</span>Tell us what you're building, what you're trying to achieve, or where you're running into trouble.<span class="text-primary">"</span>
      </div>
    </div>
  </section>
</template>
