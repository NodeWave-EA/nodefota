<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import { siteConfig } from '~/app.meta'
import { useKeyboard } from '~/composables/use-keyboard'
import { useNavigate } from '~/composables/use-navigate'

const { navigate } = useNavigate()
const { addGlobalShortcut, removeGlobalShortcut } = useKeyboard()
const user = useSupabaseUser()

const githubAriaLabel = `Open ${siteConfig.name} on GitHub`

onMounted(() => {
  addGlobalShortcut('meta+g', () => {
    navigate({
      href: siteConfig.social.github,
      external: true,
      rel: 'noopener noreferrer',
    })
  })
})

onUnmounted(() => {
  if (typeof removeGlobalShortcut === 'function') {
    removeGlobalShortcut('meta+g')
  }
})
</script>

<template>
  <div class="inline-flex items-center gap-1.5">
    <!-- Auth / Console CTAs (visible on md+, mobile drawer handles < md) -->
    <template v-if="user">
      <UButton
        to="/dashboard"
        color="primary"
        variant="solid"
        size="xs"
        leading-icon="i-lucide-layout-dashboard"
        class="hidden md:inline-flex rounded-xs font-mono text-xs font-bold"
      >
        Console
      </UButton>
    </template>

    <template v-else>
      <UButton
        to="/auth/login"
        color="neutral"
        variant="ghost"
        size="xs"
        class="hidden md:inline-flex rounded-xs font-mono text-xs font-medium text-muted hover:text-highlighted"
      >
        Sign In
      </UButton>

      <UButton
        to="/auth/register"
        color="primary"
        variant="solid"
        size="xs"
        trailing-icon="i-lucide-arrow-right"
        class="hidden md:inline-flex rounded-xs font-mono text-xs font-bold"
      >
        Register
      </UButton>
    </template>

    <span
      aria-hidden="true"
      class="mx-0.5 hidden h-4 w-px bg-border md:inline-block"
    />

    <!-- Color Mode Toggle -->
    <AppThemeToggle />

    <!-- GitHub External Link (hidden on xs mobile since it lives in the mobile drawer) -->
    <UTooltip
      text="Open on GitHub"
      :kbds="['meta', 'G']"
      :popper="{ placement: 'bottom', strategy: 'fixed' }"
    >
      <UButton
        color="primary"
        variant="ghost"
        size="sm"
        :href="siteConfig.social.github"
        target="_blank"
        rel="noopener noreferrer"
        icon="i-line-md-github-loop"
        class="hidden sm:inline-flex group rounded-xs border border-transparent hover:border-default hover:bg-default transition-colors"
        :aria-label="githubAriaLabel"
      >
        <UIcon
          name="i-lucide-arrow-up-right"
          class="size-3.5 shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
          aria-hidden="true"
        />
      </UButton>
    </UTooltip>
  </div>
</template>
