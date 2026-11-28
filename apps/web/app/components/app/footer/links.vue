<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { footerLinkGroups } from '~/constants'

defineOptions({
  name: 'AppFooterLinks',
})

const route = useRoute()

function isLinkActive(target?: RouteLocationRaw, external?: boolean): boolean {
  if (!target || external || typeof target !== 'string')
    return false

  const [rawPath, rawHash] = target.split('#')
  const targetPath = rawPath || '/'
  const targetHash = rawHash
    ? `#${rawHash}`
    : ''

  if (targetPath === '/' && !targetHash) {
    return route.path === '/' && !route.hash
  }

  if (targetHash) {
    return route.path === targetPath && route.hash === targetHash
  }

  return route.path === targetPath || route.path.startsWith(`${targetPath}/`)
}
</script>

<template>
  <div class="grid w-full grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
    <nav
      v-for="group in footerLinkGroups"
      :key="group.title"
      :aria-label="`${group.title} navigation`"
      class="flex flex-col gap-4 bg-default px-4 py-6 sm:p-6"
    >
      <h3 class="font-mono text-xs font-bold tracking-wider text-highlighted uppercase">
        {{ group.title }}
      </h3>

      <ul class="m-0 flex list-none flex-col gap-1 p-0">
        <li
          v-for="link in group.links"
          :key="link.label"
        >
          <UButton
            :to="link.to"
            :target="link.target"
            :external="link.external"
            :rel="link.external ? 'noopener noreferrer' : undefined"
            :icon="link.icon"
            :trailing-icon="link.external ? 'i-lucide-arrow-up-right' : undefined"
            :color="isLinkActive(link.to, link.external) ? 'primary' : 'neutral'"
            variant="ghost"
            size="sm"
            :aria-current="isLinkActive(link.to, link.external) ? 'page' : undefined"
            class="group -mx-2 w-[calc(100%+1rem)] justify-start rounded-xs px-2 py-1.5 font-sans text-sm transition-colors"
            :class="
              isLinkActive(link.to, link.external)
                ? 'bg-elevated/80 font-semibold text-primary'
                : 'font-normal text-muted hover:bg-elevated/50 hover:text-highlighted'
            "
            :ui="{
              leadingIcon: isLinkActive(link.to, link.external)
                ? 'size-3.5 text-primary'
                : 'size-3.5 text-muted group-hover:text-primary transition-colors',
              trailingIcon: 'ms-auto size-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform',
            }"
          >
            {{ link.label }}
          </UButton>
        </li>
      </ul>
    </nav>
  </div>
</template>
