<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { GITHUB_REPO, HEADER_NAVIGATION } from '~/utils/navigations'

defineOptions({
  name: 'AppHeader',
})

const route = useRoute()
const breakpoints = useBreakpoints(breakpointsTailwind)

type HeaderMenuMode = 'modal' | 'slideover' | 'drawer'

const isMobile = breakpoints.smaller('sm')
const isTablet = breakpoints.between('sm', 'lg')

const isMenuOpen = ref(false)

const currentMode = computed<HeaderMenuMode>(() => {
  if (isMobile.value) {
    return 'drawer'
  }
  if (isTablet.value) {
    return 'slideover'
  }
  return 'modal'
})

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
  },
)

const authActions = {
  signIn: {
    label: 'Sign In',
    to: '/login',
  },
  getStarted: {
    label: 'Get Started',
    to: '/register',
    icon: 'i-lucide-arrow-right',
  },
}
</script>

<template>
  <UHeader
    v-model:open="isMenuOpen"
    :mode="currentMode"
    :ui="{
      root: 'border-b border-default bg-default/90 backdrop-blur-md',
      toggle: 'rounded-xs',
    }"
  >
    <template #title>
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
    </template>

    <template #default>
      <UNavigationMenu
        highlight
        highlight-color="primary"
        :items="HEADER_NAVIGATION"
        orientation="horizontal"
        variant="link"
        aria-label="Primary navigation"
        :ui="{
          root: 'justify-center',
          list: 'gap-1',
          link: 'rounded-xs px-3 py-2 font-sans text-sm font-medium transition-colors',
          linkLeadingIcon: 'size-4',
          linkLabel: 'whitespace-nowrap',
        }"
      />
    </template>

    <template #right>
      <div class="flex items-center gap-1.5 sm:gap-2">
        <AppThemeToggle />

        <UTooltip arrow text="GitHub Repository">
          <UButton
            v-bind="GITHUB_REPO"
            color="neutral"
            variant="ghost"
            size="sm"
            aria-label="GitHub Repository"
            rel="noopener noreferrer"
            class="rounded-xs"
          />
        </UTooltip>

        <span
          aria-hidden="true"
          class="hidden h-4 w-px bg-border lg:inline-block"
        />

        <UButton
          :to="authActions.signIn.to"
          color="neutral"
          variant="ghost"
          size="sm"
          class="hidden whitespace-nowrap rounded-xs font-sans text-xs font-semibold lg:inline-flex"
        >
          {{ authActions.signIn.label }}
        </UButton>

        <UButton
          :to="authActions.getStarted.to"
          color="primary"
          variant="solid"
          size="sm"
          :trailing-icon="authActions.getStarted.icon"
          class="hidden whitespace-nowrap rounded-xs font-sans text-xs font-semibold lg:inline-flex"
        >
          {{ authActions.getStarted.label }}
        </UButton>
      </div>
    </template>

    <template #body>
      <div class="flex flex-col gap-6">
        <UNavigationMenu
          highlight
          highlight-color="primary"
          :items="HEADER_NAVIGATION"
          orientation="vertical"
          variant="pill"
          aria-label="Mobile navigation"
          :ui="{
            list: 'gap-1',
            link: 'rounded-xs px-3 py-2.5 font-sans text-sm font-medium',
            linkLeadingIcon: 'size-4',
          }"
        />

        <div class="grid grid-cols-1 gap-2 border-t border-default pt-4 sm:grid-cols-2">
          <UButton
            :to="authActions.signIn.to"
            color="neutral"
            variant="outline"
            size="md"
            block
            class="rounded-xs font-sans text-sm font-semibold"
          >
            {{ authActions.signIn.label }}
          </UButton>

          <UButton
            :to="authActions.getStarted.to"
            color="primary"
            variant="solid"
            size="md"
            block
            :trailing-icon="authActions.getStarted.icon"
            class="rounded-xs font-sans text-sm font-semibold"
          >
            {{ authActions.getStarted.label }}
          </UButton>
        </div>
      </div>
    </template>
  </UHeader>
</template>
