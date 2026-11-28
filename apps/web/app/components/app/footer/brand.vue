<script setup lang="ts">
import { footerBrand } from '~/constants'

defineOptions({
  name: 'AppFooterBrand',
})

withDefaults(defineProps<{
  orientation?: 'horizontal' | 'vertical'
}>(), {
  orientation: 'vertical',
})
</script>

<template>
  <div
    class="flex gap-px bg-border"
    :class="orientation === 'horizontal' ? 'flex-row items-stretch' : 'flex-col'"
  >
    <div
      class="flex flex-1 flex-col items-start gap-3.5 bg-default"
      :class="orientation === 'horizontal' ? 'justify-between p-6 lg:flex-row lg:items-center lg:gap-8' : 'px-4 py-6 sm:p-6'"
    >
      <div class="flex flex-col items-start gap-3 max-w-2xl">
        <NuxtLink
          to="/"
          aria-label="NodeFOTA Home"
          class="inline-flex h-14 items-center rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <AppLogo
            :height="56"
            :title="footerBrand.name"
            class="h-14 w-auto"
          />
        </NuxtLink>

        <p class="font-sans text-sm leading-relaxed text-muted">
          {{ footerBrand.description }}
        </p>
      </div>

      <div
        v-if="orientation === 'horizontal'"
        class="flex shrink-0 items-start gap-3 rounded-xs border border-default bg-elevated/60 p-4 max-w-xs"
      >
        <div
          class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xs border border-default bg-default text-primary"
        >
          <UIcon
            name="i-lucide-shield-check"
            aria-hidden="true"
            class="size-4"
          />
        </div>

        <div class="flex flex-col gap-0.5">
          <span class="font-mono text-[10px] font-bold tracking-widest text-primary uppercase">
            {{ footerBrand.taglineLabel }}
          </span>
          <p class="font-sans text-xs font-medium leading-snug text-highlighted">
            {{ footerBrand.tagline }}
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="orientation === 'vertical'"
      class="flex items-start gap-3 bg-elevated/60 px-4 py-4 sm:px-6"
    >
      <div
        class="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-xs border border-default bg-default text-primary"
      >
        <UIcon
          name="i-lucide-shield-check"
          aria-hidden="true"
          class="size-3.5"
        />
      </div>

      <div class="flex flex-col gap-0.5">
        <span class="font-mono text-[10px] font-bold tracking-widest text-primary uppercase">
          {{ footerBrand.taglineLabel }}
        </span>
        <p class="font-sans text-xs font-medium leading-snug text-highlighted">
          {{ footerBrand.tagline }}
        </p>
      </div>
    </div>
  </div>
</template>
