<script setup lang="ts">
const route = useRoute()

const isDashboardRoute = computed(() => route.path.startsWith('/dashboard'))
</script>

<template>
  <div class="app-root-container min-w-0 overflow-x-clip">
    <UApp>
      <NuxtLayout>
        <!-- Hidden target container for Google Translate widget -->
        <div
          id="google_translate_element"
          class="sr-only"
          aria-hidden="true"
        />
        <AppLoadingScreen />
        <AppScrollToTop />
        <AppSiteBackground
          :grid-opacity="isDashboardRoute ? 0.55 : 1.0"
          :surface-profile="isDashboardRoute ? 'minimal' : 'telemetry'"
          :show-signal-pulse="!isDashboardRoute"
        />
        <NuxtRouteAnnouncer />
        <NuxtLoadingIndicator
          color="repeating-linear-gradient(to right, var(--color-cyan-500) 0%, var(--color-indigo-500) 50%, var(--color-cyan-400) 100%)"
          :height="3"
        />
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
