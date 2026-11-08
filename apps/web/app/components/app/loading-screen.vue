<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineOptions({
  name: 'AppLoadingScreen',
})

const progress = ref(0)
const isLoaded = ref(false)
const nuxtApp = useNuxtApp()
let timer: ReturnType<typeof setInterval> | null = null

function completeProgress() {
  if (timer)
    clearInterval(timer)
  progress.value = 100
  setTimeout(() => {
    isLoaded.value = true
  }, 400)
}

onMounted(() => {
  timer = setInterval(() => {
    if (progress.value < 90) {
      const remaining = 90 - progress.value
      const step = Math.max(1, Math.ceil(remaining * 0.12))
      progress.value = Math.min(90, progress.value + step)
    }
  }, 40)

  nuxtApp.hook('app:suspense:resolve', () => {
    completeProgress()
  })

  if (!nuxtApp.isHydrating) {
    completeProgress()
  }
})

onUnmounted(() => {
  if (timer)
    clearInterval(timer)
})
</script>

<template>
  <Transition name="fade-loader">
    <div
      v-if="!isLoaded"
      class="loader-overlay fixed inset-0 z-99999 flex items-center justify-center text-foreground select-none"
      aria-live="polite"
      aria-busy="true"
    >
      <div class="flex flex-col items-center gap-7">
        <AppIcon size="120" />

        <div class="flex flex-col items-center gap-2.5">
          <div
            class="flex items-center justify-between w-40 text-[0.85rem] font-medium tracking-widest uppercase opacity-80"
          >
            <span>Initializing</span>
            <span class="font-mono text-xs tabular-nums text-primary font-semibold">
              {{ progress }}%
            </span>
          </div>

          <div class="progress-track">
            <div
              class="progress-bar bg-primary transition-[width] duration-150 ease-out"
              :style="{ width: `${progress}%` }"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loader-overlay {
  background-color: var(--ui-bg, #ffffff);
  opacity: 1;
}

@media (prefers-color-scheme: dark) {
  .loader-overlay {
    background-color: var(--ui-bg, #0f172a);
  }
}

:root.dark .loader-overlay,
.dark .loader-overlay {
  background-color: var(--ui-bg, #0f172a);
}

.progress-track {
  width: 160px;
  height: 4px;
  background-color: var(--ui-border, rgba(148, 163, 184, 0.2));
  border-radius: 9999px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  border-radius: 9999px;
}

.fade-loader-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-loader-leave-to {
  opacity: 0;
}
</style>
