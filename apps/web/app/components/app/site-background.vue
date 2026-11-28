<script setup lang="ts">
import { computed, useId } from 'vue'
import { useHead } from '#imports'

defineOptions({
  name: 'SiteBackground',
})

const props = withDefaults(defineProps<Props>(), {
  gridOpacity: 1.0,
  surfaceProfile: 'telemetry',
  showSignalPulse: true,
})

interface Props {
  /**
   * Opacity multiplier for the technical grid and telemetry node (0.0 to 1.0).
   * @default 1.0
   */
  gridOpacity?: number
  /**
   * Visual surface profile tailored for the NODEFOTA platform.
   * - 'telemetry': Precision micro-grid + node intersection crosshairs + cyan/indigo ambient glow
   * - 'blueprint': Finer PCB trace grid + architectural crosshair markers
   * - 'minimal': Clean low-noise control-plane backdrop for dense tables and editors
   * @default 'telemetry'
   */
  surfaceProfile?: 'telemetry' | 'blueprint' | 'minimal'
  /**
   * Show subtle animated OTA signal pulse rings in the upper viewport.
   * @default true
   */
  showSignalPulse?: boolean
}

const instanceId = useId()
const minorGridId = computed(() => `${instanceId}-minor-grid`)
const majorGridId = computed(() => `${instanceId}-major-grid`)

useHead({
  htmlAttrs: {
    'data-surface': () => props.surfaceProfile,
  },
})

const profileConfig = computed(() => {
  switch (props.surfaceProfile) {
    case 'blueprint':
      return {
        minorSize: 20,
        majorSize: 100,
        minorOpacity: 0.35,
        majorOpacity: 0.65,
        showCrosshairs: true,
        dotOpacity: 'opacity-50 dark:opacity-40',
        vignette:
          'bg-[radial-gradient(ellipse_80%_70%_at_50%_20%,transparent_25%,var(--app-bg)_100%)]',
        glowPrimary: 'opacity-[0.09] dark:opacity-[0.12]',
        glowSecondary: 'opacity-[0.07] dark:opacity-[0.09]',
      }
    case 'minimal':
      return {
        minorSize: 32,
        majorSize: 128,
        minorOpacity: 0.18,
        majorOpacity: 0.32,
        showCrosshairs: false,
        dotOpacity: 'opacity-20 dark:opacity-15',
        vignette:
          'bg-[radial-gradient(ellipse_85%_75%_at_50%_25%,transparent_30%,var(--app-bg)_100%)]',
        glowPrimary: 'opacity-[0.04] dark:opacity-[0.06]',
        glowSecondary: 'opacity-[0.03] dark:opacity-[0.05]',
      }
    case 'telemetry':
    default:
      return {
        minorSize: 24,
        majorSize: 96,
        minorOpacity: 0.3,
        majorOpacity: 0.55,
        showCrosshairs: true,
        dotOpacity: 'opacity-45 dark:opacity-35',
        vignette:
          'bg-[radial-gradient(ellipse_75%_65%_at_50%_18%,transparent_20%,var(--app-bg)_100%)]',
        glowPrimary: 'opacity-[0.09] dark:opacity-[0.13]',
        glowSecondary: 'opacity-[0.07] dark:opacity-[0.09]',
      }
  }
})
</script>

<template>
  <div
    class="fixed inset-0 -z-50 h-full w-full overflow-hidden pointer-events-none select-none bg-(--app-bg) transition-colors duration-500 ease-in-out"
    aria-hidden="true"
  >
    <!-- 1. PRECISION HARDWARE / PCB COORDINATE GRID -->
    <svg
      class="absolute inset-0 h-full w-full text-(--app-border) transition-opacity duration-300"
      :style="{ opacity: gridOpacity }"
    >
      <defs>
        <pattern
          :id="minorGridId"
          :width="profileConfig.minorSize"
          :height="profileConfig.minorSize"
          patternUnits="userSpaceOnUse"
        >
          <path
            :d="`M ${profileConfig.minorSize} 0 L 0 0 0 ${profileConfig.minorSize}`"
            fill="none"
            stroke="currentColor"
            stroke-width="0.75"
            :stroke-opacity="profileConfig.minorOpacity"
          />
        </pattern>

        <pattern
          :id="majorGridId"
          :width="profileConfig.majorSize"
          :height="profileConfig.majorSize"
          patternUnits="userSpaceOnUse"
        >
          <rect
            :width="profileConfig.majorSize"
            :height="profileConfig.majorSize"
            :fill="`url(#${minorGridId})`"
          />
          <path
            :d="`M ${profileConfig.majorSize} 0 L 0 0 0 ${profileConfig.majorSize}`"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            :stroke-opacity="profileConfig.majorOpacity"
          />
          <!-- Major grid intersection crosshair -->
          <path
            v-if="profileConfig.showCrosshairs"
            d="M -3 0 L 3 0 M 0 -3 L 0 3"
            fill="none"
            stroke="var(--ui-primary)"
            stroke-width="1"
            stroke-opacity="0.4"
          />
        </pattern>
      </defs>

      <rect
        width="100%"
        height="100%"
        :fill="`url(#${majorGridId})`"
      />
    </svg>

    <!-- 2. FLEET NODE DOTS -->
    <div
      class="absolute inset-0 transition-opacity duration-500"
      :class="profileConfig.dotOpacity"
      :style="{
        opacity: gridOpacity,
        backgroundImage: 'radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--ui-primary) 50%, transparent) 1px, transparent 0)',
        backgroundSize: `${profileConfig.majorSize}px ${profileConfig.majorSize}px`,
      }"
    />

    <!-- 3. RADIAL EDGE MASK (KEEPS CENTER CONTENT HIGH-CONTRAST) -->
    <div
      class="absolute inset-0"
      :class="profileConfig.vignette"
    />

    <!-- 4. SUBTLE OTA TELEMETRY SIGNAL RINGS (TOP-RIGHT HERO QUADRANT) -->
    <div
      v-if="showSignalPulse"
      class="ota-signal-emitter absolute -top-36 right-[8%] hidden size-[540px] items-center justify-center lg:flex"
    >
      <span class="ota-ring ota-ring-1 absolute inset-0 rounded-full border border-primary/25" />
      <span class="ota-ring ota-ring-2 absolute inset-14 rounded-full border border-dashed border-secondary/25" />
      <span class="ota-ring ota-ring-3 absolute inset-28 rounded-full border border-primary/15" />
    </div>

    <!-- 5. COMPLEMENTARY CYAN + INDIGO AMBIENT GLOWS -->
    <div class="absolute inset-0 transition-opacity duration-700">
      <div
        class="absolute -top-[12%] -left-[6%] h-[42vw] w-[42vw] max-w-135 rounded-full bg-primary blur-[130px] transform-gpu"
        :class="profileConfig.glowPrimary"
      />
      <div
        class="absolute -bottom-[14%] -right-[6%] h-[46vw] w-[46vw] max-w-145 rounded-full bg-secondary blur-[140px] transform-gpu"
        :class="profileConfig.glowSecondary"
      />
    </div>
  </div>
</template>

<style scoped>
.ota-ring {
  animation: otaSignalPulse 7s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}

.ota-ring-2 {
  animation-delay: 1.8s;
}

.ota-ring-3 {
  animation-delay: 3.6s;
}

@keyframes otaSignalPulse {
  0%,
  100% {
    transform: scale(0.96);
    opacity: 0.35;
  }
  50% {
    transform: scale(1.03);
    opacity: 0.85;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ota-ring {
    animation: none !important;
  }
}
</style>
