<script setup lang="ts">
import { siteConfig } from '~/app.meta'
import { isNavLinkActive } from '~/composables/use-nav-bubble'
import { navLinks } from '~/constants'

const emit = defineEmits<{
  navigate: []
}>()

const route = useRoute()
const user = useSupabaseUser()
const { open: openSearchPalette } = useContentSearch()

function handleOpenSearch() {
  emit('navigate')
  openSearchPalette.value = true
}
</script>

<template>
  <div class="flex h-full w-full flex-col justify-between gap-6 select-none">
    <div class="space-y-5">
      <!-- Primary Route List -->
      <nav aria-label="Mobile viewport navigation menu" class="w-full space-y-2.5">
        <p class="px-1 font-mono text-[10px] font-bold tracking-[0.2em] text-muted uppercase">
          Navigation
        </p>

        <ul class="m-0 w-full list-none space-y-1 rounded-xs border border-default bg-muted/50 p-1.5">
          <li
            v-for="link in navLinks"
            :key="link.to"
            class="w-full"
          >
            <NuxtLink
              :to="link.to"
              :aria-current="isNavLinkActive(link.to, route.path) ? 'page' : undefined"
              class="group relative flex w-full items-center gap-3 rounded-xs border px-3.5 py-2.5 font-mono text-xs tracking-wider uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              :class="
                isNavLinkActive(link.to, route.path)
                  ? 'border-primary/30 bg-default font-bold text-primary shadow-2xs'
                  : 'border-transparent font-medium text-default hover:border-default hover:bg-elevated hover:text-highlighted'
              "
              @click="emit('navigate')"
            >
              <span
                v-if="isNavLinkActive(link.to, route.path)"
                aria-hidden="true"
                class="absolute inset-y-2 left-0 w-0.5 rounded-r-full bg-primary"
              />

              <span class="flex min-w-0 items-center gap-3">
                <UIcon
                  v-if="link.icon"
                  :name="link.icon"
                  class="size-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
                  :class="
                    isNavLinkActive(link.to, route.path)
                      ? 'text-primary'
                      : 'text-muted group-hover:text-primary'
                  "
                  aria-hidden="true"
                />
                <span class="truncate">{{ link.label }}</span>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Operator Auth CTAs -->
      <div class="space-y-2.5">
        <p class="px-1 font-mono text-[10px] font-bold tracking-[0.2em] text-muted uppercase">
          Operator Access
        </p>

        <div v-if="user">
          <UButton
            to="/dashboard"
            color="primary"
            variant="solid"
            size="md"
            leading-icon="i-lucide-layout-dashboard"
            block
            class="rounded-xs font-mono text-xs font-bold uppercase"
            @click="emit('navigate')"
          >
            Open Console
          </UButton>
        </div>

        <div v-else class="grid grid-cols-2 gap-2">
          <UButton
            to="/auth/login"
            color="neutral"
            variant="outline"
            size="md"
            block
            class="justify-center rounded-xs font-mono text-xs font-bold"
            @click="emit('navigate')"
          >
            Sign In
          </UButton>

          <UButton
            to="/auth/register"
            color="primary"
            variant="solid"
            size="md"
            trailing-icon="i-lucide-arrow-right"
            block
            class="justify-center rounded-xs font-mono text-xs font-bold"
            @click="emit('navigate')"
          >
            Register
          </UButton>
        </div>
      </div>
    </div>

    <!-- Bottom Quick Utilities -->
    <div class="space-y-2.5 border-t border-default pt-4">
      <p class="px-1 font-mono text-[10px] font-bold tracking-[0.2em] text-muted uppercase">
        Quick Actions
      </p>

      <button
        type="button"
        class="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xs border border-default bg-muted/50 px-3.5 py-2.5 font-mono text-xs text-default shadow-2xs transition-colors hover:border-primary/40 hover:bg-elevated hover:text-highlighted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        @click="handleOpenSearch"
      >
        <span class="flex items-center gap-2.5">
          <UIcon
            name="i-line-md-file-search"
            class="size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          <span>Quick Search</span>
        </span>
        <UKbd
          value="⌘K"
          size="sm"
          class="hidden sm:inline-flex"
        />
      </button>

      <div class="flex items-center justify-between gap-3 rounded-xs border border-default bg-muted/50 px-3.5 py-2 font-mono text-xs text-default shadow-2xs">
        <span class="flex items-center gap-2.5">
          <UIcon
            name="i-lucide-contrast"
            class="size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          <span>Appearance</span>
        </span>
        <AppThemeToggle />
      </div>

      <NuxtLink
        :to="siteConfig.social.github"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex items-center justify-between gap-3 rounded-xs border border-default bg-muted/50 px-3.5 py-2.5 font-mono text-xs text-default shadow-2xs transition-colors hover:border-primary/40 hover:bg-elevated hover:text-highlighted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        @click="emit('navigate')"
      >
        <span class="flex items-center gap-2.5">
          <UIcon
            name="i-line-md-github-loop"
            class="size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          <span>GitHub Repository</span>
        </span>
        <UIcon
          name="i-lucide-arrow-up-right"
          class="size-3.5 text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
          aria-hidden="true"
        />
      </NuxtLink>
    </div>
  </div>
</template>
