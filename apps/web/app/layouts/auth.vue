<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <div class="flex h-dvh flex-col overflow-hidden bg-default text-default">
    <header class="shrink-0 border-b border-default bg-default/90 backdrop-blur-md">
      <UContainer class="flex h-14 items-center justify-between sm:h-16">
        <NuxtLink
          to="/"
          aria-label="NodeFOTA Home"
          class="inline-flex items-center rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <AppLogo
            :width="124"
            :height="50"
            title="NodeFOTA - Secure FOTA Platform"
          />
        </NuxtLink>

        <div class="flex items-center gap-1.5 sm:gap-2">
          <UButton
            to="/"
            color="neutral"
            variant="ghost"
            size="xs"
            icon="i-lucide-arrow-left"
            class="rounded-xs font-mono text-xs"
          >
            Back to Site
          </UButton>

          <span
            aria-hidden="true"
            class="h-4 w-px bg-border"
          />

          <AppThemeToggle />
        </div>
      </UContainer>
    </header>

    <UMain class="flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
      <div class="my-auto w-full max-w-md">
        <slot />
      </div>
    </UMain>

    <LazyAppLangSwitcher hydrate-on-idle />
    <footer class="shrink-0 border-t border-default bg-elevated/20 py-3 text-center">
      <UContainer class="flex flex-col items-center justify-between gap-1.5 font-mono text-[11px] text-muted sm:flex-row">
        <span>© {{ year }} NODEFOTA // Zero-Trust Over-The-Air Firmware Management</span>
        <div class="flex items-center gap-4">
          <NuxtLink to="/security" class="transition-colors hover:text-highlighted">
            Security
          </NuxtLink>
          <NuxtLink to="/contact" class="transition-colors hover:text-highlighted">
            Support
          </NuxtLink>
        </div>
      </UContainer>
    </footer>
  </div>
</template>
