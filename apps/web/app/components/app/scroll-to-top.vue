<script setup lang="ts">
import { useEventListener, useWindowScroll } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'

defineOptions({
  name: 'AppScrollToTop',
})

const { y: windowY } = useWindowScroll()
const scrollProgress = ref(0)
const isVisible = ref(false)

// SVG circle dimensions
const radius = 20
const circumference = 2 * Math.PI * radius
const strokeDashoffset = computed(() => {
  return circumference - (scrollProgress.value / 100) * circumference
})

/**
 * Calculates current scroll percentage across document, body, or active child container.
 */
function updateScroll(event?: Event) {
  const scrollingEl = document.scrollingElement || document.documentElement || document.body
  let currentScrollTop = windowY.value || scrollingEl.scrollTop || 0
  let maxScrollPx = scrollingEl.scrollHeight - scrollingEl.clientHeight

  // Inspect target element if event fired from a scrollable child container
  if (event?.target) {
    const target = (event.target === document
      ? scrollingEl
      : event.target) as HTMLElement
    if (target && target.scrollTop !== undefined && target.scrollHeight > target.clientHeight) {
      if (target.scrollTop > currentScrollTop) {
        currentScrollTop = target.scrollTop
        maxScrollPx = target.scrollHeight - target.clientHeight
      }
    }
  }

  // Fallback scan for active scrollable layout wrappers
  if (currentScrollTop === 0) {
    const activeScrollable = document.querySelector('.overflow-y-auto, .overflow-auto, main') as HTMLElement
    if (activeScrollable && activeScrollable.scrollTop > 0) {
      currentScrollTop = activeScrollable.scrollTop
      maxScrollPx = activeScrollable.scrollHeight - activeScrollable.clientHeight
    }
  }

  const progress = maxScrollPx > 0
    ? (currentScrollTop / maxScrollPx) * 100
    : 0

  scrollProgress.value = Math.min(100, Math.max(0, Math.round(progress)))
  isVisible.value = currentScrollTop > 50
}

/**
 * Smoothly scrolls window and nested scrollable containers back to top.
 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' })
  document.body.scrollTo({ top: 0, behavior: 'smooth' })

  const scrollables = document.querySelectorAll<HTMLElement>('.overflow-y-auto, .overflow-auto, main')
  scrollables.forEach((el) => {
    if (el.scrollTop > 0) {
      el.scrollTo({ top: 0, behavior: 'smooth' })
    }
  })
}

// VueUse event listeners
useEventListener(window, 'scroll', updateScroll, { capture: true, passive: true })
useEventListener(window, 'resize', updateScroll, { passive: true })

// Sync state on mount and route change
onMounted(() => {
  updateScroll()
})
</script>

<template>
  <ClientOnly>
    <Transition name="scroll-top-fade">
      <div
        v-if="isVisible"
        class="fixed bottom-6 right-6 z-999 flex items-center justify-center select-none"
      >
        <LazyUTooltip :text="`Back to top (${scrollProgress}%)`">
          <UButton
            color="neutral"
            variant="outline"
            aria-label="Scroll to top"
            class="group relative flex h-12 w-12 items-center justify-center rounded-full bg-background/95 p-0 text-foreground shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95"
            @click="scrollToTop"
          >
            <!-- SVG Circular Progress Ring -->
            <svg
              class="absolute inset-0 h-full w-full -rotate-90 pointer-events-none p-0.5"
              viewBox="0 0 48 48"
            >
              <!-- Background Track -->
              <circle
                cx="24"
                cy="24"
                :r="radius"
                class="stroke-current opacity-15 text-foreground"
                stroke-width="3"
                fill="none"
              />
              <!-- Dynamic Progress Fill -->
              <circle
                cx="24"
                cy="24"
                :r="radius"
                class="stroke-primary transition-all duration-150 ease-out"
                stroke-width="3"
                stroke-linecap="round"
                fill="none"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="strokeDashoffset"
              />
            </svg>

            <!-- Center Icon -->
            <UIcon
              name="i-line-md-arrow-up"
              class="relative z-10 h-5 w-5 text-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-primary"
            />
          </UButton>
        </LazyUTooltip>
      </div>
    </Transition>
  </ClientOnly>
</template>

<style scoped>
.scroll-top-fade-enter-active,
.scroll-top-fade-leave-active {
  transition:
    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-top-fade-enter-from,
.scroll-top-fade-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.9);
}
</style>
