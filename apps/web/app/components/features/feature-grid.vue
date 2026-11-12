<script setup lang="ts">
import type { FeatureSectionConfig } from '~/content/features'

defineOptions({
  name: 'FeatureGrid',
})

defineProps<{
  config: FeatureSectionConfig
}>()
</script>

<template>
  <section
    :id="config.id"
    :aria-labelledby="`${config.id}-heading`"
    class="flex w-full flex-col gap-8 scroll-mt-24"
  >
    <div class="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
      <div class="flex flex-col items-start gap-3">
        <UBadge
          color="primary"
          variant="subtle"
          size="sm"
          class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
        >
          {{ config.eyebrow }}
        </UBadge>

        <h2
          :id="`${config.id}-heading`"
          class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl"
        >
          {{ config.heading }}
        </h2>

        <p class="font-sans text-base leading-relaxed text-muted">
          {{ config.description }}
        </p>
      </div>

      <UButton
        :to="config.cta.to"
        color="neutral"
        variant="outline"
        size="lg"
        trailing-icon="i-lucide-arrow-right"
        class="shrink-0 rounded-xs font-semibold"
      >
        {{ config.cta.label }}
      </UButton>
    </div>

    <div
      class="-mx-4 grid grid-cols-1 gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:overflow-hidden sm:rounded-xs sm:border md:grid-cols-2 lg:grid-cols-3"
    >
      <article
        v-for="item in config.items"
        :key="item.title"
        class="flex flex-col justify-between gap-4 bg-default px-4 py-5 sm:p-6"
      >
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between gap-2">
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border border-default bg-elevated text-primary"
            >
              <UIcon :name="item.icon" aria-hidden="true" class="h-4 w-4" />
            </div>

            <UBadge
              v-if="item.tag"
              color="neutral"
              variant="outline"
              size="xs"
              class="rounded-xs font-mono text-[10px]"
            >
              {{ item.tag }}
            </UBadge>
          </div>

          <h3 class="font-sans text-lg font-bold text-highlighted">
            {{ item.title }}
          </h3>

          <p class="font-sans text-sm leading-relaxed text-muted">
            {{ item.description }}
          </p>
        </div>
      </article>

      <div
        v-if="config.callout"
        class="flex items-start gap-3 bg-elevated/60 px-4 py-4 sm:p-6 md:col-span-2 lg:col-span-3"
      >
        <UIcon
          name="i-lucide-info"
          aria-hidden="true"
          class="mt-0.5 h-4 w-4 shrink-0 text-primary"
        />
        <p class="font-sans text-xs font-medium leading-relaxed text-highlighted sm:text-sm">
          {{ config.callout }}
        </p>
      </div>
    </div>
  </section>
</template>
