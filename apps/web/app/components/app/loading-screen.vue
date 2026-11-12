<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

defineOptions({
  name: 'AppLoadingScreen',
})

interface BootStage {
  minProgress: number
  code: string
  label: string
  detail: string
}

interface SubsystemCheck {
  id: string
  label: string
  threshold: number
}

const bootStages: BootStage[] = [
  {
    minProgress: 0,
    code: '01/04',
    label: 'INITIALIZING RUNTIME',
    detail: 'Mounting control-plane interface modules...',
  },
  {
    minProgress: 30,
    code: '02/04',
    label: 'CRYPTOGRAPHIC CONTEXT',
    detail: 'Verifying SHA-256 & manifest signing engines...',
  },
  {
    minProgress: 60,
    code: '03/04',
    label: 'FLEET TELEMETRY SYNC',
    detail: 'Preparing ESP32 & ESP8266 workspace...',
  },
  {
    minProgress: 92,
    code: '04/04',
    label: 'SYSTEM READY',
    detail: 'Control-plane handshake complete.',
  },
]

const subsystems: SubsystemCheck[] = [
  { id: 'auth', label: 'AUTH / PKI', threshold: 25 },
  { id: 'ota', label: 'OTA ENGINE', threshold: 55 },
  { id: 'telemetry', label: 'TELEMETRY', threshold: 85 },
]

const progress = ref(0)
const isLoaded = ref(false)
const nuxtApp = useNuxtApp()

let progressTimer: ReturnType<typeof setInterval> | null = null
let failsafeTimer: ReturnType<typeof setTimeout> | null = null
let exitTimer: ReturnType<typeof setTimeout> | null = null

const currentStage = computed<BootStage>(() => {
  for (let i = bootStages.length - 1; i >= 0; i--) {
    const stage = bootStages[i]
    if (stage && progress.value >= stage.minProgress) {
      return stage
    }
  }
  return bootStages[0]!
})

function clearTimers() {
  if (progressTimer) {
    clearInterval(progressTimer)
    progressTimer = null
  }
  if (failsafeTimer) {
    clearTimeout(failsafeTimer)
    failsafeTimer = null
  }
}

function completeProgress() {
  if (isLoaded.value)
    return

  clearTimers()
  progress.value = 100

  exitTimer = setTimeout(() => {
    isLoaded.value = true
  }, 380)
}

onMounted(() => {
  progressTimer = setInterval(() => {
    if (progress.value < 90) {
      const remaining = 90 - progress.value
      const step = Math.max(1, Math.ceil(remaining * 0.14))
      progress.value = Math.min(90, progress.value + step)
    }
  }, 40)

  // Guarantee dismissal even if suspense hook resolves early or is bypassed
  failsafeTimer = setTimeout(() => {
    completeProgress()
  }, 3500)

  nuxtApp.hook('app:suspense:resolve', () => {
    completeProgress()
  })

  if (!nuxtApp.isHydrating) {
    completeProgress()
  }
})

onUnmounted(() => {
  clearTimers()
  if (exitTimer) {
    clearTimeout(exitTimer)
  }
})
</script>

<template>
  <Transition name="fade-loader">
    <div
      v-if="!isLoaded"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Initializing NodeFOTA Platform"
      class="loader-overlay fixed inset-0 z-99999 flex items-center justify-center px-4 select-none"
    >
      <div aria-hidden="true" class="loader-grid pointer-events-none absolute inset-0" />

      <div
        class="relative grid w-full max-w-md grid-cols-1 gap-px overflow-hidden rounded-xs border border-default bg-border"
      >
        <div class="flex items-center justify-between gap-2 bg-elevated/70 px-4 py-2.5">
          <div class="flex items-center gap-2">
            <span
              aria-hidden="true"
              class="h-2 w-2 rounded-xs bg-primary motion-safe:animate-pulse"
            />
            <span class="font-mono text-[11px] font-semibold tracking-wider text-highlighted uppercase">
              nodefota // boot-sequence
            </span>
          </div>

          <span class="font-mono text-[11px] text-muted">
            ESP32 • ESP8266
          </span>
        </div>

        <div class="flex flex-col items-center justify-center gap-4 bg-default px-6 py-8 text-center">
          <AppIcon size="92" />

          <div class="flex flex-col items-center gap-1">
            <div class="font-sans text-xl font-extrabold tracking-tight">
              <span class="text-highlighted">NODE</span>
              <span class="text-primary">FOTA</span>
            </div>
            <p class="font-mono text-[11px] tracking-wider text-muted uppercase">
              Secure Firmware Lifecycle Platform
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-3 bg-default px-4 py-4 sm:px-5">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="font-mono text-[11px] font-bold text-primary">
                [{{ currentStage.code }}]
              </span>
              <span class="font-mono text-xs font-semibold tracking-wider text-highlighted uppercase">
                {{ currentStage.label }}
              </span>
            </div>

            <span class="font-mono text-xs font-bold tabular-nums text-primary">
              {{ progress }}%
            </span>
          </div>

          <div
            role="progressbar"
            :aria-valuenow="progress"
            aria-valuemin="0"
            aria-valuemax="100"
            class="h-1.5 w-full overflow-hidden rounded-xs bg-elevated"
          >
            <div
              class="h-full rounded-xs bg-primary transition-[width] duration-150 ease-out"
              :style="{ width: `${progress}%` }"
            />
          </div>

          <p class="font-mono text-[11px] text-muted">
            {{ currentStage.detail }}
          </p>
        </div>

        <div class="grid grid-cols-3 gap-px bg-border">
          <div
            v-for="sub in subsystems"
            :key="sub.id"
            class="flex items-center justify-center gap-1.5 bg-elevated/40 px-2.5 py-2.5"
          >
            <UIcon
              v-if="progress >= sub.threshold"
              name="i-lucide-check"
              aria-hidden="true"
              class="h-3.5 w-3.5 shrink-0 text-primary"
            />
            <span
              v-else
              aria-hidden="true"
              class="h-1.5 w-1.5 shrink-0 rounded-xs bg-muted/50"
            />

            <span
              class="font-mono text-[10px] font-semibold tracking-wider uppercase transition-colors"
              :class="progress >= sub.threshold ? 'text-highlighted' : 'text-muted'"
            >
              {{ sub.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loader-overlay {
  background-color: var(--ui-bg, #ffffff);
}

@media (prefers-color-scheme: dark) {
  .loader-overlay {
    background-color: var(--ui-bg, #090d16);
  }
}

:root.dark .loader-overlay,
.dark .loader-overlay {
  background-color: var(--ui-bg, #090d16);
}

.loader-grid {
  background-image:
    linear-gradient(to right, var(--ui-border, rgba(148, 163, 184, 0.12)) 1px, transparent 1px),
    linear-gradient(to bottom, var(--ui-border, rgba(148, 163, 184, 0.12)) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(circle at center, black 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 75%);
  opacity: 0.45;
}

.fade-loader-leave-active {
  transition: opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-loader-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .fade-loader-leave-active {
    transition: opacity 0.15s linear;
  }
}
</style>
