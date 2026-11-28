<script setup lang="ts">
import { footerBrand, footerSocials } from '~/constants'

defineOptions({
  name: 'AppFooterButton',
})

const year = new Date().getFullYear()
</script>

<template>
  <div class="flex w-full flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
    <p class="font-mono text-xs text-muted">
      © {{ year }} {{ footerBrand.copyrightOwner }}. All rights reserved.
    </p>

    <div class="flex flex-wrap items-center justify-center gap-1.5 sm:justify-end">
      <UTooltip
        v-for="social in footerSocials"
        :key="social.label"
        arrow
        :text="social.label"
      >
        <UButton
          v-bind="social"
          :aria-label="social.label"
          external
          rel="noopener noreferrer"
          class="rounded-xs border border-transparent hover:border-default hover:bg-elevated"
        />
      </UTooltip>
    </div>
  </div>
</template>
