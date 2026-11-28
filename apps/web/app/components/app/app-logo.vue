<script setup lang="ts">
import { computed, useId } from 'vue'

defineOptions({
  name: 'AppLogo',
})

const props = withDefaults(defineProps<Props>(), {
  width: undefined,
  height: 56,
  title: 'NodeFOTA Logo',
  color: undefined,
  theme: undefined,
  primaryColor: undefined,
  secondaryColor: undefined,
})

interface Props {
  /** Width shorthand or value (e.g. 138, '138px') */
  width?: number | string
  /** Height shorthand or value (e.g. 56, '56px') */
  height?: number | string
  /** Accessible title for screen readers */
  title?: string
  /** Color mode or scheme string ('light', 'dark', 'system', or hex/CSS color) */
  color?: string
  /** Theme mode alias ('light', 'dark', 'system') */
  theme?: string
  /** Custom primary driver color override */
  primaryColor?: string
  /** Custom secondary driver color override */
  secondaryColor?: string
}

const VIEWBOX_WIDTH = 1480
const VIEWBOX_HEIGHT = 600
const ASPECT_RATIO = VIEWBOX_WIDTH / VIEWBOX_HEIGHT

const instanceId = useId()

const titleId = computed(() => `${instanceId}-title`)
const shieldGradId = computed(() => `${instanceId}-iotShieldGrad`)
const coreGradId = computed(() => `${instanceId}-iotCoreGrad`)
const nodeGlowGradId = computed(() => `${instanceId}-nodeGlowGrad`)
const glowFilterId = computed(() => `${instanceId}-adaptiveGlow`)

function parseNumericSize(val?: number | string): number | null {
  if (typeof val === 'number' && Number.isFinite(val))
    return val
  if (typeof val === 'string') {
    const match = val.trim().match(/^(\d+(?:\.\d+)?)(?:px)?$/)
    if (match)
      return Number(match[1])
  }
  return null
}

const computedHeight = computed<string | undefined>(() => {
  if (props.height === 'auto')
    return undefined
  if (typeof props.height === 'number')
    return `${props.height}px`
  if (props.height)
    return props.height
  const numW = parseNumericSize(props.width)
  return numW
    ? `${Math.round(numW / ASPECT_RATIO)}px`
    : '56px'
})

const computedWidth = computed<string | undefined>(() => {
  if (props.width === 'auto')
    return undefined
  if (typeof props.width === 'number')
    return `${props.width}px`
  if (props.width)
    return props.width
  const numH = parseNumericSize(props.height)
  return numH
    ? `${Math.round(numH * ASPECT_RATIO)}px`
    : `${Math.round(56 * ASPECT_RATIO)}px`
})

const activeMode = computed(() => {
  const mode = props.color ?? props.theme
  if (!mode || mode === 'system' || mode === 'auto')
    return 'system'
  return mode.toLowerCase()
})

const isExplicitDark = computed(() => activeMode.value === 'dark')
const isExplicitLight = computed(() => activeMode.value === 'light')
const isCustomColor = computed(
  () => activeMode.value !== 'system' && !isExplicitDark.value && !isExplicitLight.value,
)

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

  if (isExplicitLight.value) {
    style['--logo-primary'] = props.primaryColor || 'var(--color-primary-600)'
    style['--logo-secondary'] = props.secondaryColor || 'var(--color-primary-800)'
    style['--logo-text-main'] = '#09090b'
    style['--logo-accent-contrast'] = '#09090b'
    style['--logo-sub-prefix'] = '#52525b'
    style['--logo-sub-domain'] = props.primaryColor || 'var(--color-primary-600)'
    style['--logo-packet-fill'] = props.primaryColor || 'var(--color-primary-600)'
    style['--logo-shield-opacity'] = '0.1'
    style['--logo-stroke-opacity'] = '0.4'
    style['--logo-glow'] = 'color-mix(in srgb, var(--color-primary-500) 20%, transparent)'
  }
  else if (isExplicitDark.value) {
    style['--logo-primary'] = props.primaryColor || 'var(--color-primary-400)'
    style['--logo-secondary'] = props.secondaryColor || 'var(--color-success-400)'
    style['--logo-text-main'] = '#ffffff'
    style['--logo-accent-contrast'] = '#ffffff'
    style['--logo-sub-prefix'] = '#a1a1aa'
    style['--logo-sub-domain'] = props.primaryColor || 'var(--color-primary-400)'
    style['--logo-packet-fill'] = '#ffffff'
    style['--logo-shield-opacity'] = '0.16'
    style['--logo-stroke-opacity'] = '0.6'
    style['--logo-glow'] = 'color-mix(in srgb, var(--color-primary-400) 45%, transparent)'
  }
  else if (isCustomColor.value) {
    const customVal = props.color || props.theme || 'currentColor'
    style['--logo-text-main'] = customVal
    style['--logo-accent-contrast'] = customVal
  }

  if (props.primaryColor) {
    style['--logo-primary'] = props.primaryColor
    style['--logo-sub-domain'] = props.primaryColor
    style['--logo-packet-fill'] = props.primaryColor
  }
  if (props.secondaryColor) {
    style['--logo-secondary'] = props.secondaryColor
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
    preserveAspectRatio="xMinYMid meet"
    role="img"
    :aria-labelledby="titleId"
    :style="computedStyle"
    class="node-fota-logo block shrink-0 select-none"
    :class="[themeClass]"
  >
    <title :id="titleId">{{ title }}</title>
    <defs>
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

      <filter :id="glowFilterId" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <g class="fota-logo-group" :filter="`url(#${glowFilterId})`">
      <!-- Wireless Signal Arcs -->
      <g :stroke="`url(#${shieldGradId})`" fill="none" stroke-linecap="round">
        <path class="signal-arc arc-1" d="M 250 110 A 55 55 0 0 1 350 110" stroke-width="6" />
        <path class="signal-arc arc-2" d="M 225 85 A 85 85 0 0 1 375 85" stroke-width="6" />
        <path class="signal-arc arc-3" d="M 200 60 A 115 115 0 0 1 400 60" stroke-width="6" />
      </g>

      <!-- Protective Shield -->
      <path
        d="M 160 170 C 230 150 300 135 300 135 C 300 135 370 150 440 170 C 440 330 380 445 300 505 C 220 445 160 330 160 170 Z"
        :fill="`url(#${shieldGradId})`"
        fill-opacity="var(--logo-shield-opacity)"
      />
      <path
        class="shield-frame"
        d="M 160 170 C 230 150 300 135 300 135 C 300 135 370 150 440 170 C 440 330 380 445 300 505 C 220 445 160 330 160 170 Z"
        fill="none"
        :stroke="`url(#${shieldGradId})`"
        stroke-width="8"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
      <path
        d="M 185 192 C 240 176 300 162 300 162 C 300 162 360 176 415 192 C 415 320 365 418 300 472 C 235 418 185 320 185 192 Z"
        fill="none"
        :stroke="`url(#${shieldGradId})`"
        stroke-width="2.5"
        stroke-opacity="var(--logo-stroke-opacity)"
        stroke-dasharray="8 6"
      />

      <!-- Hardware Circuit Traces -->
      <g :stroke="`url(#${coreGradId})`" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path class="circuit-line" stroke-width="4" d="M 300 162 L 300 230" />
        <path class="circuit-line-rev" stroke-width="3.5" d="M 300 390 L 300 472" />
        <path class="circuit-line" stroke-width="3.5" d="M 230 270 L 300 230 L 370 270" />
        <path class="circuit-line-rev" stroke-width="3.5" d="M 370 350 L 300 390 L 230 350" />
        <path class="circuit-line" stroke-width="3.5" d="M 230 270 L 230 350" />
        <path class="circuit-line-rev" stroke-width="3.5" d="M 370 270 L 370 350" />
        <path :stroke="`url(#${coreGradId})`" stroke-width="2" stroke-opacity="0.6" d="M 230 270 L 370 350" />
        <path :stroke="`url(#${coreGradId})`" stroke-width="2" stroke-opacity="0.6" d="M 370 270 L 230 350" />
      </g>

      <!-- Data Packets -->
      <g class="data-packet">
        <circle cx="300" cy="230" r="5" fill="var(--logo-packet-fill)" />
        <circle cx="370" cy="350" r="5" fill="var(--logo-packet-fill)" />
      </g>

      <!-- Central Secure Core -->
      <polygon
        class="central-core-ring"
        points="300,210 380,256 380,348 300,394 220,348 220,256"
        fill="none"
        :stroke="`url(#${coreGradId})`"
        stroke-width="3"
        stroke-dasharray="6 10"
      />
      <g class="central-core-inner">
        <circle cx="300" cy="310" r="32" :fill="`url(#${nodeGlowGradId})`" />
        <polygon
          points="300,285 322,298 322,322 300,335 278,322 278,298"
          fill="none"
          :stroke="`url(#${shieldGradId})`"
          stroke-width="4"
          stroke-linejoin="round"
        />
        <path
          d="M 294 308 L 294 304 A 6 6 0 0 1 306 304 L 306 308 M 292 308 L 308 308 L 308 320 L 292 320 Z"
          fill="none"
          stroke="var(--logo-accent-contrast)"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>

      <!-- Network Nodes -->
      <g :fill="`url(#${shieldGradId})`">
        <circle class="node-point node-delay-1" cx="300" cy="230" r="7.5" />
        <circle cx="300" cy="230" r="3" fill="var(--logo-accent-contrast)" />
        <circle class="node-point node-delay-2" cx="370" cy="270" r="7.5" />
        <circle cx="370" cy="270" r="3" fill="var(--logo-accent-contrast)" />
        <circle class="node-point node-delay-3" cx="370" cy="350" r="7.5" />
        <circle cx="370" cy="350" r="3" fill="var(--logo-accent-contrast)" />
        <circle class="node-point node-delay-1" cx="300" cy="390" r="7.5" />
        <circle cx="300" cy="390" r="3" fill="var(--logo-accent-contrast)" />
        <circle class="node-point node-delay-2" cx="230" cy="350" r="7.5" />
        <circle cx="230" cy="350" r="3" fill="var(--logo-accent-contrast)" />
        <circle class="node-point node-delay-3" cx="230" cy="270" r="7.5" />
        <circle cx="230" cy="270" r="3" fill="var(--logo-accent-contrast)" />
      </g>
    </g>

    <!-- Brand Typography -->
    <g class="brand-text-group">
      <text x="485" y="305" class="brand-title">
        <tspan class="text-node">NODE</tspan>
        <tspan class="text-fota" :style="{ fill: `url(#${shieldGradId})` }">FOTA</tspan>
      </text>

      <text x="490" y="435" class="brand-subtitle">
        <tspan class="sub-prefix">by </tspan>
        <tspan class="sub-domain">nodewave.net</tspan>
      </text>
    </g>
  </svg>
</template>

<style scoped>
/* Default (Light Mode): Bound to Nuxt UI / Tailwind v4 semantic theme tokens */
.node-fota-logo {
  --logo-primary: var(--ui-primary, var(--color-primary-600));
  --logo-secondary: var(--color-primary-700, #0f766e);
  --logo-text-main: var(--ui-text-highlighted, #09090b);
  --logo-sub-prefix: var(--ui-text-muted, #52525b);
  --logo-sub-domain: var(--ui-primary, var(--color-primary-600));
  --logo-shield-opacity: 0.1;
  --logo-stroke-opacity: 0.4;
  --logo-glow: color-mix(in srgb, var(--ui-primary, #14b8a6) 18%, transparent);
  --logo-accent-contrast: var(--ui-text-highlighted, #09090b);
  --logo-packet-fill: var(--ui-primary, var(--color-primary-600));
}

/* Dark Mode: Automatically adapts when .dark is active on <html> */
:global(.dark) .node-fota-logo:not(.theme-light),
.node-fota-logo.theme-dark {
  --logo-primary: var(--ui-primary, var(--color-primary-400));
  --logo-secondary: var(--color-success-400, #34d399);
  --logo-text-main: var(--ui-text-highlighted, #ffffff);
  --logo-sub-prefix: var(--ui-text-muted, #a1a1aa);
  --logo-sub-domain: var(--ui-primary, var(--color-primary-400));
  --logo-shield-opacity: 0.16;
  --logo-stroke-opacity: 0.6;
  --logo-glow: color-mix(in srgb, var(--ui-primary, #2dd4bf) 40%, transparent);
  --logo-accent-contrast: #ffffff;
  --logo-packet-fill: #ffffff;
}

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
    stop-color: var(--logo-primary);
  }
  100% {
    stop-color: var(--logo-secondary);
  }
}

@keyframes animShieldStop1 {
  0% {
    stop-color: var(--logo-secondary);
  }
  100% {
    stop-color: var(--logo-primary);
  }
}

@keyframes animCoreStop0 {
  0% {
    stop-color: var(--logo-secondary);
  }
  100% {
    stop-color: var(--logo-primary);
  }
}

@keyframes animCoreStop1 {
  0% {
    stop-color: var(--logo-primary);
  }
  100% {
    stop-color: var(--logo-secondary);
  }
}

.fota-logo-group {
  transform-origin: center;
  filter: drop-shadow(0 0 8px var(--logo-glow));
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
    transform: scale(1.3);
    opacity: 1;
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
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-weight: 800;
  font-size: 162px;
  letter-spacing: 2px;
}

.text-node {
  fill: var(--logo-text-main);
  transition: fill 0.3s ease;
}

.text-fota {
  animation: textGlowPulse 3.2s ease-in-out infinite alternate;
}

.brand-subtitle {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 92px;
  letter-spacing: 3px;
}

.sub-prefix {
  fill: var(--logo-sub-prefix);
  font-weight: 500;
  transition: fill 0.3s ease;
}

.sub-domain {
  fill: var(--logo-sub-domain);
  font-weight: 700;
  transition: fill 0.3s ease;
}

@keyframes textGlowPulse {
  0% {
    filter: drop-shadow(0 0 4px var(--logo-glow));
  }
  50% {
    filter: drop-shadow(0 0 12px var(--logo-glow));
  }
  100% {
    filter: drop-shadow(0 0 6px var(--logo-glow));
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
  .stop-shield-0,
  .stop-shield-1,
  .stop-core-0,
  .stop-core-1 {
    animation: none !important;
  }
}
</style>
