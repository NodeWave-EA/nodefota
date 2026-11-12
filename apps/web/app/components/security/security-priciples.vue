<script setup lang="ts">
import { SECURITY_PRINCIPLES } from '~/content/security'

defineOptions({
  name: 'SecurityPrinciples',
})
</script>

<template>
  <section id="principles" aria-labelledby="principles-heading" class="flex w-full flex-col gap-8 scroll-mt-24">
    <div class="flex flex-col items-start gap-3">
      <UBadge
        color="primary"
        variant="subtle"
        size="sm"
        class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
      >
        CORE ARCHITECTURE
      </UBadge>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
        <h2
          id="principles-heading"
          class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl lg:col-span-6"
        >
          Security throughout the firmware lifecycle.
        </h2>

        <p class="font-sans text-base leading-relaxed text-muted lg:col-span-6">
          A secure update mechanism must do more than protect a connection. It must protect firmware authenticity, identify authorised devices, detect failures, and provide a recovery path.
        </p>
      </div>
    </div>

    <div
      class="-mx-4 grid grid-cols-1 gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:overflow-hidden sm:rounded-xs sm:border md:grid-cols-2 lg:grid-cols-5"
    >
      <article
        v-for="item in SECURITY_PRINCIPLES"
        :key="item.id"
        class="flex flex-col justify-between gap-4 bg-default px-4 py-5 sm:p-5"
      >
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between gap-2">
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border border-default bg-elevated text-primary"
            >
              <UIcon :name="item.icon" aria-hidden="true" class="h-4 w-4" />
            </div>

            <UBadge color="neutral" variant="outline" size="xs" class="rounded-xs font-mono text-[10px]">
              {{ item.badge }}
            </UBadge>
          </div>

          <h3 class="font-sans text-base font-bold text-highlighted">
            {{ item.title }}
          </h3>

          <p class="font-sans text-xs leading-relaxed text-muted">
            {{ item.description }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>
