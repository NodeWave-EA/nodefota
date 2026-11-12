<script setup lang="ts">
import { FEATURES_HERO } from '~/content/features'

defineOptions({
  name: 'FeaturesHero',
})
</script>

<template>
  <section aria-labelledby="features-hero-heading" class="w-full">
    <div class="flex flex-col items-start gap-6 text-left">
      <UBadge
        color="primary"
        variant="subtle"
        size="md"
        class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
      >
        {{ FEATURES_HERO.eyebrow }}
      </UBadge>

      <h1
        id="features-hero-heading"
        class="font-sans text-4xl font-extrabold tracking-tight text-highlighted sm:text-5xl lg:text-6xl lg:leading-[1.12]"
      >
        {{ FEATURES_HERO.title }}
      </h1>

      <p class="max-w-3xl font-sans text-lg leading-relaxed text-muted sm:text-xl">
        {{ FEATURES_HERO.subtitle }}
      </p>

      <div class="flex flex-wrap items-center gap-3 pt-2">
        <UButton
          :to="FEATURES_HERO.primaryCta.to"
          color="primary"
          variant="solid"
          size="xl"
          trailing-icon="i-lucide-arrow-down"
          class="rounded-xs font-semibold"
        >
          {{ FEATURES_HERO.primaryCta.label }}
        </UButton>

        <UButton
          :to="FEATURES_HERO.secondaryCta.to"
          color="neutral"
          variant="outline"
          size="xl"
          leading-icon="i-lucide-book-open"
          class="rounded-xs font-semibold"
        >
          {{ FEATURES_HERO.secondaryCta.label }}
        </UButton>
      </div>

      <div class="flex items-center gap-2 pt-2 font-mono text-xs text-muted">
        <span aria-hidden="true" class="h-1.5 w-1.5 rounded-xs bg-primary" />
        <span>{{ FEATURES_HERO.supportingStatement }}</span>
      </div>
    </div>
  </section>
</template>
