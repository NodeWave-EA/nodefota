<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { isNavLinkActive, useNavBubble } from '~/composables/use-nav-bubble'
import { navLinks } from '~/constants'

const route = useRoute()
const { isMotionReduced } = useReduceMotion()
const {
  setLinkRef,
  setHoveredIndex,
  hoveredIndex,
  isReady,
  bubbleStyles,
} = useNavBubble(route, navLinks)
</script>

<template>
  <nav
    class="relative hidden items-center rounded-xs border border-default bg-muted/50 p-1 lg:flex"
    aria-label="Global desktop site navigation"
    @mouseleave="setHoveredIndex(null)"
  >
    <!-- Sliding Active / Hover Pill -->
    <div
      :style="bubbleStyles"
      aria-hidden="true"
      class="pointer-events-none absolute top-1 bottom-1 left-0 z-0 rounded-xs border shadow-2xs transition-[transform,width,opacity,background-color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      :class="[
        !isReady || isMotionReduced ? 'transition-none' : '',
        hoveredIndex !== null
          ? 'border-default bg-elevated/80'
          : 'border-primary/30 bg-default',
      ]"
    >
      <span
        class="absolute inset-x-2.5 bottom-0 h-0.5 rounded-full bg-primary transition-opacity duration-200"
        :class="hoveredIndex !== null ? 'opacity-40' : 'opacity-100'"
      />
    </div>

    <!-- Navigation Links -->
    <NuxtLink
      v-for="(link, idx) in navLinks"
      :key="link.to"
      :ref="(el) => setLinkRef(el as Element | ComponentPublicInstance | null, idx)"
      :to="link.to"
      :aria-current="isNavLinkActive(link.to, route.path) ? 'page' : undefined"
      class="group relative z-10 flex items-center gap-1.5 rounded-xs px-3 py-1.5 font-mono text-xs tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      :class="
        isNavLinkActive(link.to, route.path)
          ? 'font-bold text-primary'
          : 'font-medium text-muted hover:text-highlighted'
      "
      @mouseenter="setHoveredIndex(idx)"
      @focus="setHoveredIndex(idx)"
      @blur="setHoveredIndex(null)"
    >
      <UIcon
        v-if="link.icon"
        :name="link.icon"
        class="size-3.5 shrink-0 transition-transform duration-200 group-hover:scale-110"
        :class="
          isNavLinkActive(link.to, route.path)
            ? 'text-primary'
            : 'text-muted group-hover:text-primary'
        "
        aria-hidden="true"
      />

      <span class="whitespace-nowrap">
        {{ link.label }}
      </span>
    </NuxtLink>
  </nav>
</template>
