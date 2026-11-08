<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints, useColorMode } from '@vueuse/core'
import { computed } from 'vue'
import { GITHUB_REPO, HEADER_NAVIGATION } from '~/utils/navigations.ts'

defineOptions({
  name: 'AppHeader',
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const colorMode = useColorMode()

// Define responsive conditions
const isMobile = breakpoints.smaller('sm')
const isTablet = breakpoints.between('sm', 'lg')

type UHeaderModes = 'modal' | 'slideover' | 'drawer'

// Dynamically determine the mode based on the screen width
const currentMode = computed<UHeaderModes>(() => {
  if (isMobile.value) {
    return 'drawer'
  }
  if (isTablet.value) {
    return 'slideover'
  }
  return 'modal' // Default fallback mode for desktop layouts
})
</script>

<template>
  <UHeader :mode="currentMode">
    <template #title>
      <ClientOnly>
        <AppLogo
          :color="colorMode"
          class="h-12 w-auto"
        />
      </ClientOnly>
    </template>

    <!-- Desktop Navigation -->
    <template #default>
      <UNavigationMenu
        highlight
        highlight-color="primary"
        :items="HEADER_NAVIGATION"
        orientation="horizontal"
        variant="pill"
        :ui="{
          root: 'justify-around border-t border-default py-2',
          item: 'py-0',
          link: 'flex-col gap-1 px-3',
          linkLeadingIcon: 'size-5',
          linkLabel: 'text-[10px]/3 font-normal',
        }"
        class="w-full"
      />
    </template>

    <!-- Mobile Navigation -->
    <template #body>
      <UNavigationMenu
        highlight
        highlight-color="primary"
        :items="HEADER_NAVIGATION"
        orientation="vertical"
        variant="pill"
      />
    </template>

    <template #right>
      <AppThemeToggle />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          v-bind="GITHUB_REPO"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>
  </UHeader>
</template>

<style scoped>

</style>
