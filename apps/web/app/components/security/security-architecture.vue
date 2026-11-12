<script setup lang="ts">
import { ARCHITECTURE_LAYERS } from '~/content/security'

defineOptions({
  name: 'SecurityArchitecture',
})
</script>

<template>
  <section id="architecture" aria-labelledby="sec-arch-heading" class="flex w-full flex-col gap-8 scroll-mt-24">
    <div class="flex flex-col items-start gap-3">
      <UBadge
        color="primary"
        variant="subtle"
        size="sm"
        class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
      >
        DEFENCE IN DEPTH
      </UBadge>

      <h2
        id="sec-arch-heading"
        class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl"
      >
        A multi-layered defense model across the update lifecycle.
      </h2>
    </div>

    <div
      class="-mx-4 grid grid-cols-1 gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:overflow-hidden sm:rounded-xs sm:border md:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="layer in ARCHITECTURE_LAYERS"
        :key="layer.layer"
        class="flex flex-col justify-between gap-4 bg-default px-4 py-5 sm:p-6"
      >
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <UIcon :name="layer.icon" aria-hidden="true" class="h-4 w-4 text-primary" />
            <span class="font-mono text-xs font-bold text-primary">
              {{ layer.layer }}
            </span>
          </div>

          <UBadge color="neutral" variant="outline" size="xs" class="rounded-xs font-mono text-[10px]">
            {{ layer.target }}
          </UBadge>
        </div>

        <div class="flex flex-col gap-1">
          <h3 class="font-sans text-lg font-bold text-highlighted">
            {{ layer.title }}
          </h3>
          <p class="font-sans text-xs leading-relaxed text-muted sm:text-sm">
            {{ layer.mechanism }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
