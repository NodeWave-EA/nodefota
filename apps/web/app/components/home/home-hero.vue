<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import { useIntervalFn } from '@vueuse/core'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'HomeHero',
})

type CampaignStrategy = 'IMMEDIATE' | 'GRADUAL' | 'CANARY' | 'SCHEDULED'
type DeviceEventCategory = 'HEARTBEAT' | 'STATUS_UPDATE' | 'PROGRESS' | 'ERROR'
type PreviewTabValue = 'campaign' | 'release'

interface HeroAction {
  label: string
  to: string
  icon: string
  color: 'primary' | 'neutral'
  variant: 'solid' | 'outline'
}

interface FleetOverviewStats {
  totalRegistered: number
  activeDevices: number
  updatingNow: number
}

interface FirmwareReleaseInfo {
  version: string
  hardwareTarget: string
  sha256: string
  signatureScheme: string
  manifestStatus: string
  artifactSize: string
}

interface ActiveCampaignInfo {
  name: string
  strategy: CampaignStrategy
  targetCount: number
  succeededCount: number
  failedCount: number
  inProgressCount: number
  progressPercent: number
}

interface DeviceActivityEvent {
  id: string
  deviceId: string
  hardware: 'ESP32' | 'ESP8266'
  category: DeviceEventCategory
  message: string
  timestamp: string
}

const heroCopy = {
  eyebrow: 'SECURE IOT FIRMWARE MANAGEMENT',
  statusBadge: 'Now in Beta',
  headline: 'Secure Firmware. Reliable Updates.',
  highlightedText: 'Complete Fleet Control.',
  description:
    'Manage your IoT firmware lifecycle from a single, security-focused platform. Upload and cryptographically sign firmware, authenticate devices, orchestrate controlled OTA deployments, and monitor update progress across your ESP32 and ESP8266 device fleets.',
  supportingMicrocopy:
    'Built for embedded developers. Designed around firmware security. Engineered for reliable OTA deployments.',
  actions: [
    {
      label: 'Get Started',
      to: '/auth/register',
      icon: 'i-lucide-arrow-right',
      color: 'primary',
      variant: 'solid',
    },
    {
      label: 'Explore Documentation',
      to: '/docs',
      icon: 'i-lucide-book-open',
      color: 'neutral',
      variant: 'outline',
    },
  ] satisfies HeroAction[],
  ecosystemPillars: [
    {
      title: 'Target Hardware',
      label: 'ESP32 & ESP8266',
      icon: 'i-lucide-cpu',
    },
    {
      title: 'Verification',
      label: 'SHA-256 & Signed Manifests',
      icon: 'i-lucide-file-check-2',
    },
    {
      title: 'Device Integration',
      label: 'MIT C++ Client SDKs',
      icon: 'i-lucide-code-2',
    },
  ],
}

const previewTabs: TabsItem[] = [
  {
    label: 'Active OTA Campaign',
    value: 'campaign',
    icon: 'i-lucide-radio',
  },
  {
    label: 'Firmware Release',
    value: 'release',
    icon: 'i-lucide-file-code-2',
  },
]

const activePreviewTab = ref<PreviewTabValue>('campaign')

const fleetStats = ref<FleetOverviewStats>({
  totalRegistered: 24,
  activeDevices: 21,
  updatingNow: 3,
})

const firmwareRelease = ref<FirmwareReleaseInfo>({
  version: 'v1.4.2-esp32',
  hardwareTarget: 'ESP32 (OTA Partition)',
  sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  signatureScheme: 'ECDSA P-256 / Ed25519 / RSA',
  manifestStatus: 'Signed Firmware Manifest',
  artifactSize: '612 KB',
})

const activeCampaign = ref<ActiveCampaignInfo>({
  name: 'v1.4.2-canary-rollout',
  strategy: 'CANARY',
  targetCount: 22,
  succeededCount: 18,
  failedCount: 1,
  inProgressCount: 3,
  progressPercent: 82,
})

const recentActivity = ref<DeviceActivityEvent[]>([
  {
    id: 'evt-1',
    deviceId: 'esp32-gateway-04',
    hardware: 'ESP32',
    category: 'PROGRESS',
    message: 'Writing OTA partition (78%) • Verifying SHA-256 integrity',
    timestamp: 'Just now',
  },
  {
    id: 'evt-2',
    deviceId: 'esp32-node-11',
    hardware: 'ESP32',
    category: 'STATUS_UPDATE',
    message: 'Signature verified • Post-boot health check passed',
    timestamp: '14s ago',
  },
  {
    id: 'evt-3',
    deviceId: 'esp8266-sensor-02',
    hardware: 'ESP8266',
    category: 'HEARTBEAT',
    message: 'Authenticated check complete • Running v1.4.1',
    timestamp: '42s ago',
  },
  {
    id: 'evt-4',
    deviceId: 'esp32-node-09',
    hardware: 'ESP32',
    category: 'ERROR',
    message: 'Download interrupted • Rollback policy armed',
    timestamp: '2m ago',
  },
])

const { pause, resume, isActive } = useIntervalFn(
  () => {
    if (activeCampaign.value.progressPercent >= 100) {
      activeCampaign.value = {
        ...activeCampaign.value,
        succeededCount: 16,
        inProgressCount: 5,
        progressPercent: 73,
      }
      fleetStats.value = {
        ...fleetStats.value,
        updatingNow: 5,
      }
      return
    }

    const nextProgress = Math.min(100, activeCampaign.value.progressPercent + 4)
    const isComplete = nextProgress === 100

    activeCampaign.value = {
      ...activeCampaign.value,
      progressPercent: nextProgress,
      succeededCount: isComplete
        ? 21
        : Math.min(20, activeCampaign.value.succeededCount + 1),
      inProgressCount: isComplete
        ? 0
        : Math.max(1, activeCampaign.value.inProgressCount - 1),
    }

    fleetStats.value = {
      ...fleetStats.value,
      updatingNow: isComplete ? 0 : activeCampaign.value.inProgressCount,
    }
  },
  2600,
  { immediate: false },
)

function toggleSimulation() {
  if (isActive.value) {
    pause()
  }
  else {
    resume()
  }
}

onMounted(() => {
  resume()
})

function getEventBadgeColor(category: DeviceEventCategory) {
  switch (category) {
    case 'STATUS_UPDATE':
      return 'success'
    case 'PROGRESS':
      return 'primary'
    case 'ERROR':
      return 'error'
    default:
      return 'neutral'
  }
}
</script>

<template>
  <section id="overview" aria-labelledby="hero-heading" class="w-full">
    <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
      <div class="flex flex-col items-start gap-6 text-left lg:col-span-6">
        <div class="flex flex-wrap items-center gap-2">
          <UBadge
            color="primary"
            variant="subtle"
            size="md"
            class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
          >
            {{ heroCopy.eyebrow }}
          </UBadge>

          <UBadge
            color="neutral"
            variant="outline"
            size="md"
            class="rounded-xs font-mono text-xs"
          >
            <template #leading>
              <span aria-hidden="true" class="size-1.5 rounded-xs bg-success" />
            </template>
            {{ heroCopy.statusBadge }}
          </UBadge>
        </div>

        <h1
          id="hero-heading"
          class="font-sans text-4xl font-extrabold tracking-tight text-highlighted sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]"
        >
          {{ heroCopy.headline }}
          <span
            class="block bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
          >
            {{ heroCopy.highlightedText }}
          </span>
        </h1>

        <p class="font-sans text-base leading-relaxed text-muted sm:text-lg">
          {{ heroCopy.description }}
        </p>

        <div class="flex flex-wrap items-center gap-3">
          <UButton
            v-for="(action, index) in heroCopy.actions"
            :key="action.label"
            :to="action.to"
            :color="action.color"
            :variant="action.variant"
            size="xl"
            class="rounded-xs font-semibold transition-transform duration-200 motion-safe:hover:-translate-y-0.5"
          >
            <template v-if="index === 1" #leading>
              <UIcon :name="action.icon" aria-hidden="true" class="size-4" />
            </template>

            {{ action.label }}

            <template v-if="index === 0" #trailing>
              <UIcon :name="action.icon" aria-hidden="true" class="size-4" />
            </template>
          </UButton>
        </div>

        <p class="font-sans text-xs text-muted sm:text-sm">
          {{ heroCopy.supportingMicrocopy }}
        </p>

        <div
          class="-mx-4 grid grid-cols-1 gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:grid-cols-3 sm:overflow-hidden sm:rounded-xs sm:border"
        >
          <div
            v-for="item in heroCopy.ecosystemPillars"
            :key="item.label"
            class="flex flex-col gap-1 bg-default px-4 py-3.5 sm:p-3.5"
          >
            <div class="flex items-center gap-1.5 text-muted">
              <UIcon :name="item.icon" aria-hidden="true" class="size-3.5 text-primary" />
              <span class="font-sans text-[11px] font-medium tracking-wider uppercase">
                {{ item.title }}
              </span>
            </div>
            <span class="font-mono text-xs font-semibold text-highlighted">
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>

      <div
        role="region"
        aria-label="Illustrative fleet and OTA campaign dashboard preview"
        class="lg:col-span-6"
      >
        <div
          class="-mx-4 grid grid-cols-1 gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:grid-cols-12 sm:overflow-hidden sm:rounded-xs sm:border"
        >
          <div
            class="flex flex-wrap items-center justify-between gap-2 bg-elevated/60 px-4 py-2.5 sm:col-span-12"
          >
            <div class="flex items-center gap-2">
              <span aria-hidden="true" class="size-2 rounded-xs bg-primary" />
              <span class="font-mono text-xs font-medium text-muted">
                console / fleet-overview
              </span>
            </div>

            <div class="flex items-center gap-2">
              <UBadge
                color="warning"
                variant="subtle"
                size="xs"
                class="rounded-xs font-mono text-[11px]"
              >
                Illustrative Demo Data
              </UBadge>

              <UTooltip :text="isActive ? 'Pause live preview' : 'Resume live preview'">
                <UButton
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  :icon="isActive ? 'i-lucide-pause' : 'i-lucide-play'"
                  :aria-label="isActive ? 'Pause live demo simulation' : 'Resume live demo simulation'"
                  :aria-pressed="!isActive"
                  class="rounded-xs"
                  @click="toggleSimulation"
                />
              </UTooltip>
            </div>
          </div>

          <dl class="contents">
            <div
              class="flex items-center justify-between gap-2 bg-default px-4 py-3.5 sm:col-span-4 sm:flex-col sm:items-start sm:justify-start sm:gap-1 sm:p-4"
            >
              <dt class="font-sans text-xs font-medium text-muted">
                Total Registered
              </dt>
              <dd class="font-mono text-xl font-bold tabular-nums text-highlighted sm:text-2xl">
                {{ fleetStats.totalRegistered }}
              </dd>
            </div>

            <div
              class="flex items-center justify-between gap-2 bg-default px-4 py-3.5 sm:col-span-4 sm:flex-col sm:items-start sm:justify-start sm:gap-1 sm:p-4"
            >
              <dt class="font-sans text-xs font-medium text-muted">
                Active Devices
              </dt>
              <dd class="flex items-center gap-2 font-mono text-xl font-bold tabular-nums text-highlighted sm:text-2xl">
                <span aria-hidden="true" class="size-2 rounded-xs bg-success" />
                {{ fleetStats.activeDevices }}
              </dd>
            </div>

            <div
              class="flex items-center justify-between gap-2 bg-default px-4 py-3.5 sm:col-span-4 sm:flex-col sm:items-start sm:justify-start sm:gap-1 sm:p-4"
            >
              <dt class="font-sans text-xs font-medium text-muted">
                Updating Now
              </dt>
              <dd class="flex items-center gap-2 font-mono text-xl font-bold tabular-nums text-primary sm:text-2xl">
                <span
                  aria-hidden="true"
                  class="size-2 rounded-xs bg-primary"
                  :class="{ 'motion-safe:animate-pulse': isActive }"
                />
                {{ fleetStats.updatingNow }}
              </dd>
            </div>
          </dl>

          <div
            class="flex flex-wrap items-center justify-between gap-2 bg-elevated/40 px-4 py-2.5 sm:col-span-12"
          >
            <UTabs
              v-model="activePreviewTab"
              :items="previewTabs"
              :content="false"
              size="xs"
              color="primary"
              variant="pill"
              aria-label="Dashboard preview view"
              :ui="{
                root: 'rounded-xs',
                list: 'rounded-xs bg-muted/60 p-0.5',
                indicator: 'rounded-xs',
                trigger: 'rounded-xs font-sans text-xs',
              }"
            />

            <span class="font-mono text-xs font-medium text-muted">
              {{ firmwareRelease.version }}
            </span>
          </div>

          <div class="bg-default px-4 py-4 sm:col-span-12 sm:p-4">
            <div v-if="activePreviewTab === 'campaign'" class="flex flex-col gap-3.5">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex flex-col gap-0.5">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="font-mono text-xs font-bold text-highlighted">
                      {{ activeCampaign.name }}
                    </span>
                    <UBadge color="primary" variant="subtle" size="xs" class="rounded-xs font-mono">
                      {{ activeCampaign.strategy }}
                    </UBadge>
                  </div>
                  <p class="font-sans text-xs text-muted">
                    Release: {{ firmwareRelease.version }} • {{ activeCampaign.targetCount }} Target Devices
                  </p>
                </div>

                <span class="font-mono text-sm font-bold tabular-nums text-primary">
                  {{ activeCampaign.progressPercent }}%
                </span>
              </div>

              <UProgress
                v-model="activeCampaign.progressPercent"
                size="xs"
                color="primary"
                aria-label="OTA campaign rollout progress"
                :ui="{
                  base: 'rounded-xs',
                  indicator: 'rounded-xs',
                }"
              />

              <div class="grid grid-cols-3 gap-2 pt-1 text-xs">
                <div class="flex items-center gap-1.5">
                  <UIcon name="i-lucide-check-circle-2" aria-hidden="true" class="size-3.5 shrink-0 text-success" />
                  <span class="font-mono text-highlighted">
                    {{ activeCampaign.succeededCount }} <span class="text-muted">Succeeded</span>
                  </span>
                </div>

                <div class="flex items-center gap-1.5">
                  <UIcon name="i-lucide-refresh-cw" aria-hidden="true" class="size-3.5 shrink-0 text-primary" />
                  <span class="font-mono text-highlighted">
                    {{ activeCampaign.inProgressCount }} <span class="text-muted">Updating</span>
                  </span>
                </div>

                <div class="flex items-center gap-1.5">
                  <UIcon name="i-lucide-alert-triangle" aria-hidden="true" class="size-3.5 shrink-0 text-error" />
                  <span class="font-mono text-highlighted">
                    {{ activeCampaign.failedCount }} <span class="text-muted">Failed</span>
                  </span>
                </div>
              </div>
            </div>

            <dl v-else class="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
              <div class="flex flex-col gap-0.5">
                <dt class="text-muted">
                  Target Ecosystem
                </dt>
                <dd class="font-mono font-medium text-highlighted">
                  {{ firmwareRelease.hardwareTarget }}
                </dd>
              </div>

              <div class="flex flex-col gap-0.5">
                <dt class="text-muted">
                  Supported Signing
                </dt>
                <dd class="font-mono font-medium text-primary">
                  {{ firmwareRelease.signatureScheme }}
                </dd>
              </div>

              <div class="flex flex-col gap-0.5 sm:col-span-2">
                <dt class="text-muted">
                  Artefact Metadata
                </dt>
                <dd class="font-mono font-medium text-highlighted">
                  {{ firmwareRelease.artifactSize }} • {{ firmwareRelease.manifestStatus }}
                </dd>
              </div>

              <div class="flex flex-col gap-0.5 sm:col-span-2">
                <dt class="text-muted">
                  SHA-256 Checksum
                </dt>
                <dd class="truncate font-mono text-[11px] text-default">
                  {{ firmwareRelease.sha256 }}
                </dd>
              </div>
            </dl>
          </div>

          <div class="flex flex-col gap-3 bg-default px-4 py-4 sm:col-span-12 sm:p-4">
            <div class="flex items-center justify-between text-xs">
              <span class="font-sans font-semibold tracking-wider text-muted uppercase">
                Recent Device Activity
              </span>
              <span class="font-mono text-[11px] text-muted">
                Lifecycle Events
              </span>
            </div>

            <ul class="grid grid-cols-1 gap-px overflow-hidden rounded-xs border border-default bg-border">
              <li
                v-for="event in recentActivity"
                :key="event.id"
                class="flex items-start justify-between gap-3 bg-elevated/30 px-3 py-2 text-xs"
              >
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-1.5">
                    <span class="font-mono font-semibold text-highlighted">
                      {{ event.deviceId }}
                    </span>
                    <UBadge
                      :color="getEventBadgeColor(event.category)"
                      variant="subtle"
                      size="xs"
                      class="rounded-xs font-mono text-[10px]"
                    >
                      {{ event.category }}
                    </UBadge>
                  </div>
                  <p class="truncate font-sans text-[11px] text-muted">
                    {{ event.message }}
                  </p>
                </div>

                <span class="shrink-0 font-mono text-[11px] text-muted">
                  {{ event.timestamp }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
