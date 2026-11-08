<script setup lang="ts">
import { computed, useId } from 'vue'

defineOptions({
  name: 'AppLogo',
})

const props = withDefaults(defineProps<Props>(), {
  width: undefined,
  height: undefined,
  title: 'NodeFOTA Logo',
  color: undefined,
  theme: undefined,
  primaryColor: undefined,
  secondaryColor: undefined,
})

interface Props {
  /** Width shorthand or value (e.g. 400, '400px', '100%') */
  width?: number | string
  /** Height shorthand or value (e.g. 162, '162px', 'auto') */
  height?: number | string
  /** Accessible title for screen readers */
  title?: string
  /** Color mode or scheme string (e.g., 'light', 'dark', 'system', or hex/CSS color) */
  color?: string
  /** Theme mode alias (e.g., 'light', 'dark', 'system') */
  theme?: string
  /** Custom primary driver color override */
  primaryColor?: string
  /** Custom secondary driver color override */
  secondaryColor?: string
}

// Unique ID prefix to avoid DOM gradient/filter ID collisions across multiple SVG instances
const fallbackId = `nfl-${Math.random().toString(36).substring(2, 9)}`
const instanceId = typeof useId === 'function'
  ? useId()
  : fallbackId

const titleId = computed(() => `${instanceId}-title`)
const shieldGradId = computed(() => `${instanceId}-iotShieldGrad`)
const coreGradId = computed(() => `${instanceId}-iotCoreGrad`)
const nodeGlowGradId = computed(() => `${instanceId}-nodeGlowGrad`)
const glowFilterId = computed(() => `${instanceId}-adaptiveGlow`)

const computedWidth = computed(() => {
  if (props.width !== undefined) {
    return typeof props.width === 'number'
      ? `${props.width}px`
      : props.width
  }
  return '100%'
})

const computedHeight = computed(() => {
  if (props.height !== undefined) {
    return typeof props.height === 'number'
      ? `${props.height}px`
      : props.height
  }
  return '100%'
})

// Theme Awareness Logic
const activeMode = computed(() => {
  const mode = props.color ?? props.theme
  if (!mode || mode === 'system' || mode === 'auto')
    return 'system'
  return mode.toLowerCase()
})

const isExplicitDark = computed(() => activeMode.value === 'dark')
const isExplicitLight = computed(() => activeMode.value === 'light')
const isCustomColor = computed(() => activeMode.value !== 'system' && !isExplicitDark.value && !isExplicitLight.value)

const themeClass = computed(() => {
  if (isExplicitDark.value)
    return 'theme-dark'
  if (isExplicitLight.value)
    return 'theme-light'
  return ''
})

const computedStyle = computed(() => {
  const style: Record<string, string> = {
    background: 'transparent',
  }

  // Explicit Light Mode inline variables (guarantees inline specificity override)
  if (isExplicitLight.value) {
    style['--color-primary'] = props.primaryColor || '#0284c7'
    style['--color-secondary'] = props.secondaryColor || '#0f766e'
    style['--text-main'] = '#0f172a'
    style['--mode-accent-contrast'] = '#0f172a'
    style['--sub-prefix-color'] = '#475569'
    style['--sub-domain-color'] = props.primaryColor || '#0284c7'
    style['--data-packet-fill'] = props.primaryColor || '#0284c7'
    style['--shield-bg-opacity'] = '0.08'
    style['--stroke-base-opacity'] = '0.35'
    style['--glow-color'] = 'rgba(2, 132, 199, 0.15)'
  }
  // Explicit Dark Mode inline variables
  else if (isExplicitDark.value) {
    style['--color-primary'] = props.primaryColor || '#00f2fe'
    style['--color-secondary'] = props.secondaryColor || '#00f5a0'
    style['--text-main'] = '#ffffff'
    style['--mode-accent-contrast'] = '#ffffff'
    style['--sub-prefix-color'] = '#cbd5e1'
    style['--sub-domain-color'] = props.primaryColor || '#38bdf8'
    style['--data-packet-fill'] = '#ffffff'
    style['--shield-bg-opacity'] = '0.16'
    style['--stroke-base-opacity'] = '0.6'
    style['--glow-color'] = 'rgba(0, 242, 254, 0.6)'
  }
  // Custom single color prop override
  else if (isCustomColor.value) {
    const customVal = props.color || props.theme || '#0f172a'
    style['--text-main'] = customVal
    style['--mode-accent-contrast'] = customVal
  }

  // Independent primary/secondary color overrides
  if (props.primaryColor) {
    style['--color-primary'] = props.primaryColor
    style['--sub-domain-color'] = props.primaryColor
    style['--data-packet-fill'] = props.primaryColor
  }
  if (props.secondaryColor) {
    style['--color-secondary'] = props.secondaryColor
  }

  return style
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1480 600"
    :width="computedWidth"
    :height="computedHeight"
    role="img"
    :aria-labelledby="titleId"
    :style="computedStyle"
    class="node-fota-logo"
    :class="[themeClass]"
  >
    <title :id="titleId">{{ title }}</title>
    <defs>
      <!-- Dynamic IoT Gradient Palette Definitions with CSS-controlled Stop Animations -->
      <linearGradient :id="shieldGradId" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" class="stop-shield-0" />
        <stop offset="100%" class="stop-shield-1" />
      </linearGradient>

      <linearGradient :id="coreGradId" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" class="stop-core-0" />
        <stop offset="100%" class="stop-core-1" />
      </linearGradient>

      <radialGradient :id="nodeGlowGradId" cx="50%" cy="50%" r="50%">
        <stop offset="0%" class="stop-shield-0" stop-opacity="1" />
        <stop offset="100%" class="stop-shield-0" stop-opacity="0" />
      </radialGradient>

      <!-- Adaptive Glow/Shadow Filters for Light and Dark Modes -->
      <filter :id="glowFilterId" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <g class="fota-logo-group" :filter="`url(#${glowFilterId})`">
      <!-- 1. WIRELESS SIGNAL ARCS (UPWARD OVER-THE-AIR TRANSMISSION) -->
      <g :stroke="`url(#${shieldGradId})`" fill="none" stroke-linecap="round">
        <path class="signal-arc arc-1" d="M 250 110 A 55 55 0 0 1 350 110" stroke-width="5" />
        <path class="signal-arc arc-2" d="M 225 85 A 85 85 0 0 1 375 85" stroke-width="5" />
        <path class="signal-arc arc-3" d="M 200 60 A 115 115 0 0 1 400 60" stroke-width="5" />
      </g>

      <!-- 2. PROTECTIVE SHIELD STRUCTURE (OUTER & INNER BOUNDARIES) -->
      <path
        d="M 160 170 C 230 150 300 135 300 135 C 300 135 370 150 440 170 C 440 330 380 445 300 505 C 220 445 160 330 160 170 Z"
        :fill="`url(#${shieldGradId})`" fill-opacity="var(--shield-bg-opacity)"
      />
      <path
        class="shield-frame"
        d="M 160 170 C 230 150 300 135 300 135 C 300 135 370 150 440 170 C 440 330 380 445 300 505 C 220 445 160 330 160 170 Z"
        fill="none" :stroke="`url(#${shieldGradId})`" stroke-width="7" stroke-linejoin="round"
        stroke-linecap="round"
      />
      <path
        d="M 185 192 C 240 176 300 162 300 162 C 300 162 360 176 415 192 C 415 320 365 418 300 472 C 235 418 185 320 185 192 Z"
        fill="none" :stroke="`url(#${shieldGradId})`" stroke-width="2" stroke-opacity="var(--stroke-base-opacity)"
        stroke-dasharray="8 6"
      />

      <!-- 3. INTERCONNECTED HARDWARE CIRCUIT TRACES & BUS LINES -->
      <g :stroke="`url(#${coreGradId})`" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path class="circuit-line" stroke-width="3.5" d="M 300 162 L 300 230" />
        <path class="circuit-line-rev" stroke-width="3" d="M 300 390 L 300 472" />
        <path class="circuit-line" stroke-width="3" d="M 230 270 L 300 230 L 370 270" />
        <path class="circuit-line-rev" stroke-width="3" d="M 370 350 L 300 390 L 230 350" />
        <path class="circuit-line" stroke-width="3" d="M 230 270 L 230 350" />
        <path class="circuit-line-rev" stroke-width="3" d="M 370 270 L 370 350" />
        <path :stroke="`url(#${coreGradId})`" stroke-width="2" stroke-opacity="0.6" d="M 230 270 L 370 350" />
        <path :stroke="`url(#${coreGradId})`" stroke-width="2" stroke-opacity="0.6" d="M 370 270 L 230 350" />
      </g>

      <!-- 4. ROTATING DATA PACKETS (OTA FIRMWARE STREAM) -->
      <g class="data-packet">
        <circle cx="300" cy="230" r="4.5" fill="var(--data-packet-fill)" />
        <circle cx="370" cy="350" r="4.5" fill="var(--data-packet-fill)" />
      </g>

      <!-- 5. CENTRAL SECURE MESH CORE & HARDWARE NODES -->
      <polygon
        class="central-core-ring" points="300,210 380,256 380,348 300,394 220,348 220,256" fill="none"
        :stroke="`url(#${coreGradId})`" stroke-width="2.5" stroke-dasharray="6 10"
      />
      <g class="central-core-inner">
        <circle cx="300" cy="310" r="32" :fill="`url(#${nodeGlowGradId})`" />
        <polygon
          points="300,285 322,298 322,322 300,335 278,322 278,298" fill="none" :stroke="`url(#${shieldGradId})`"
          stroke-width="3.5" stroke-linejoin="round"
        />
        <path
          d="M 294 308 L 294 304 A 6 6 0 0 1 306 304 L 306 308 M 292 308 L 308 308 L 308 320 L 292 320 Z"
          fill="none" stroke="var(--mode-accent-contrast)" stroke-width="2.5" stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>

      <!-- 6. PULSING NETWORK NODES (VERIFIED HARDWARE ENDPOINTS) -->
      <g :fill="`url(#${shieldGradId})`">
        <circle class="node-point node-delay-1" cx="300" cy="230" r="7" />
        <circle cx="300" cy="230" r="3" fill="var(--mode-accent-contrast)" />
        <circle class="node-point node-delay-2" cx="370" cy="270" r="7" />
        <circle cx="370" cy="270" r="3" fill="var(--mode-accent-contrast)" />
        <circle class="node-point node-delay-3" cx="370" cy="350" r="7" />
        <circle cx="370" cy="350" r="3" fill="var(--mode-accent-contrast)" />
        <circle class="node-point node-delay-1" cx="300" cy="390" r="7" />
        <circle cx="300" cy="390" r="3" fill="var(--mode-accent-contrast)" />
        <circle class="node-point node-delay-2" cx="230" cy="350" r="7" />
        <circle cx="230" cy="350" r="3" fill="var(--mode-accent-contrast)" />
        <circle class="node-point node-delay-3" cx="230" cy="270" r="7" />
        <circle cx="230" cy="270" r="3" fill="var(--mode-accent-contrast)" />
      </g>
    </g>

    <!-- BRAND TYPOGRAPHY & ANIMATED TEXT -->
    <g class="brand-text-group">
      <!-- Line 1: NODEFOTA -->
      <text x="480" y="310" class="brand-title">
        <tspan class="text-node">NODE</tspan>
        <tspan class="text-fota" :style="{ fill: `url(#${shieldGradId})` }">FOTA</tspan>
      </text>

      <!-- Line 2: by nodewave.net -->
      <text x="486" y="445" class="brand-subtitle">
        <tspan class="sub-prefix">by</tspan>
        <tspan class="sub-domain">nodewave.net</tspan>
      </text>
    </g>
  </svg>
</template>

<style scoped>
/* LIGHT MODE DEFAULT: Driven by Accessible Sky Blue & Deep Teal */
.node-fota-logo {
  --color-primary: #0284c7; /* Light Driver Color 1 */
  --color-secondary: #0f766e; /* Light Driver Color 2 */

  --text-main: #0f172a; /* High-contrast Slate 900 for "NODE" */
  --sub-prefix-color: #475569; /* Slate 600 for "by" */
  --sub-domain-color: #0284c7; /* Sky 600 for "nodewave.net" */

  --shield-bg-opacity: 0.08;
  --stroke-base-opacity: 0.35;
  --glow-color: rgba(2, 132, 199, 0.15);
  --mode-accent-contrast: #0f172a;
  --data-packet-fill: #0284c7;
}

.node-fota-logo.theme-light {
  --color-primary: #0284c7;
  --color-secondary: #0f766e;
  --text-main: #0f172a;
  --sub-prefix-color: #475569;
  --sub-domain-color: #0284c7;
  --shield-bg-opacity: 0.08;
  --stroke-base-opacity: 0.35;
  --glow-color: rgba(2, 132, 199, 0.15);
  --mode-accent-contrast: #0f172a;
  --data-packet-fill: #0284c7;
}

/* DARK MODE: Driven by Electric Cyan & Neon Mint */
:root.dark .node-fota-logo:not(.theme-light),
.dark .node-fota-logo:not(.theme-light),
.node-fota-logo.theme-dark {
  --color-primary: #00f2fe; /* Dark Driver Color 1 */
  --color-secondary: #00f5a0; /* Dark Driver Color 2 */

  --text-main: #ffffff; /* Crisp White for "NODE" */
  --sub-prefix-color: #cbd5e1; /* Slate 300 for "by" */
  --sub-domain-color: #38bdf8; /* Sky 400 for "nodewave.net" */

  --shield-bg-opacity: 0.16;
  --stroke-base-opacity: 0.6;
  --glow-color: rgba(0, 242, 254, 0.6);
  --mode-accent-contrast: #ffffff;
  --data-packet-fill: #ffffff;
}

@media (prefers-color-scheme: dark) {
  .node-fota-logo:not(.theme-light) {
    --color-primary: #00f2fe;
    --color-secondary: #00f5a0;

    --text-main: #ffffff;
    --sub-prefix-color: #cbd5e1;
    --sub-domain-color: #38bdf8;

    --shield-bg-opacity: 0.16;
    --stroke-base-opacity: 0.6;
    --glow-color: rgba(0, 242, 254, 0.6);
    --mode-accent-contrast: #ffffff;
    --data-packet-fill: #ffffff;
  }
}

/* Dynamic 2-Color Gradient Animation Loops */
.stop-shield-0 {
  animation: animShieldStop0 10s ease-in-out infinite alternate;
}

.stop-shield-1 {
  animation: animShieldStop1 10s ease-in-out infinite alternate;
}

.stop-core-0 {
  animation: animCoreStop0 10s ease-in-out infinite alternate;
}

.stop-core-1 {
  animation: animCoreStop1 10s ease-in-out infinite alternate;
}

@keyframes animShieldStop0 {
  0% {
    stop-color: var(--color-primary);
  }
  100% {
    stop-color: var(--color-secondary);
  }
}

@keyframes animShieldStop1 {
  0% {
    stop-color: var(--color-secondary);
  }
  100% {
    stop-color: var(--color-primary);
  }
}

@keyframes animCoreStop0 {
  0% {
    stop-color: var(--color-secondary);
  }
  100% {
    stop-color: var(--color-primary);
  }
}

@keyframes animCoreStop1 {
  0% {
    stop-color: var(--color-primary);
  }
  100% {
    stop-color: var(--color-secondary);
  }
}

/* Structural Styles and Motion Keyframes */
.fota-logo-group {
  transform-origin: center;
  filter: drop-shadow(0 0 10px var(--glow-color));
}

.signal-arc {
  transform-origin: 300px 115px;
  animation: arcPulse 2.4s cubic-bezier(0.25, 1, 0.5, 1) infinite;
  opacity: 0;
}

.arc-1 {
  animation-delay: 0s;
}

.arc-2 {
  animation-delay: 0.5s;
}

.arc-3 {
  animation-delay: 1s;
}

@keyframes arcPulse {
  0% {
    opacity: 0;
    transform: scale(0.85);
    stroke-width: 4px;
  }
  50% {
    opacity: 0.9;
    stroke-width: 6px;
  }
  100% {
    opacity: 0;
    transform: scale(1.2);
    stroke-width: 2px;
  }
}

.shield-frame {
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
  animation: shieldEnergyFlow 12s linear infinite;
}

@keyframes shieldEnergyFlow {
  0% {
    stroke-dashoffset: 2000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.circuit-line {
  stroke-dasharray: 10 15;
  animation: circuitDataTransfer 1.8s linear infinite;
}

.circuit-line-rev {
  stroke-dasharray: 12 12;
  animation: circuitDataTransferRev 2.2s linear infinite;
}

@keyframes circuitDataTransfer {
  from {
    stroke-dashoffset: 50;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes circuitDataTransferRev {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 48;
  }
}

.node-point {
  animation: nodePulse 2s ease-in-out infinite alternate;
  transform-box: fill-box;
  transform-origin: center;
}

.node-delay-1 {
  animation-delay: 0.3s;
}

.node-delay-2 {
  animation-delay: 0.7s;
}

.node-delay-3 {
  animation-delay: 1.1s;
}

@keyframes nodePulse {
  0% {
    transform: scale(0.8);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.35);
    opacity: 1;
    filter: drop-shadow(0 0 6px currentColor);
  }
}

.central-core-ring {
  transform-origin: 300px 310px;
  animation: coreRotate 10s linear infinite;
}

.central-core-inner {
  transform-origin: 300px 310px;
  animation: coreBreath 3s ease-in-out infinite alternate;
}

@keyframes coreRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes coreBreath {
  0% {
    transform: scale(0.92);
  }
  100% {
    transform: scale(1.08);
  }
}

.data-packet {
  transform-origin: 300px 310px;
  animation: packetOrbit 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes packetOrbit {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.brand-title {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 800;
  font-size: 165px;
  letter-spacing: 2px;
}

.text-node {
  fill: var(--text-main);
  transition: fill 0.3s ease;
}

.text-fota {
  animation: textGlowPulse 3.2s ease-in-out infinite alternate;
}

.theme-dark .text-fota,
:root.dark .text-fota {
  filter: drop-shadow(0 0 14px rgba(0, 242, 254, 0.7));
}

.node-fota-logo:not(.theme-dark) .text-fota {
  filter: drop-shadow(0 1px 2px rgba(15, 23, 42, 0.12));
}

.brand-subtitle {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 46px;
  letter-spacing: 5px;
}

.sub-prefix {
  fill: var(--sub-prefix-color);
  font-weight: 500;
  font-size: 110px;
  opacity: 1;
  transition: fill 0.3s ease;
}

.sub-domain {
  fill: var(--sub-domain-color);
  font-weight: 700;
  font-size: 110px;
  opacity: 1;
  animation: domainShimmer 4s ease-in-out infinite alternate;
  text-decoration: underline;
  text-decoration-color: var(--sub-domain-color);
  transition:
    fill 0.3s ease,
    text-decoration-color 0.3s ease;
}

@keyframes textGlowPulse {
  0% {
    filter: drop-shadow(0 0 6px var(--glow-color));
  }
  50% {
    filter: drop-shadow(0 0 16px var(--glow-color));
  }
  100% {
    filter: drop-shadow(0 0 10px var(--glow-color));
  }
}

@keyframes domainShimmer {
  0% {
    opacity: 0.9;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.9;
  }
}

@media (prefers-reduced-motion: reduce) {
  .signal-arc,
  .shield-frame,
  .circuit-line,
  .circuit-line-rev,
  .node-point,
  .central-core-ring,
  .central-core-inner,
  .data-packet,
  .text-fota,
  .sub-domain,
  .stop-shield-0,
  .stop-shield-1,
  .stop-core-0,
  .stop-core-1 {
    animation: none !important;
  }
}
</style>
