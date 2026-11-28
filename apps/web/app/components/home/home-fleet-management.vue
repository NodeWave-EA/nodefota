<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({
  name: 'HomeFleetManagement',
})

type FleetTabKey = 'devices' | 'firmware' | 'campaigns' | 'telemetry' | 'audit'
type TelemetryCategory = 'HEARTBEAT' | 'STATUS_UPDATE' | 'ERROR' | 'PROGRESS' | 'CUSTOM'

interface FleetCapabilityView {
  key: FleetTabKey
  label: string
  icon: string
  title: string
  description: string
  displayedFields: string[]
}

interface DeviceRecord {
  deviceId: string
  name: string
  hardwareModel: string
  firmwareVersion: string
  status: 'ONLINE' | 'UPDATING' | 'OFFLINE'
  lastSeen: string
}

interface FirmwareRecord {
  version: string
  hardwareCompatibility: string
  releaseDescription: string
  status: 'ACTIVE' | 'STAGED' | 'DEPRECATED'
  checksum: string
  signingInfo: string
}

interface CampaignRecord {
  campaignName: string
  targetCount: number
  strategy: 'IMMEDIATE' | 'GRADUAL' | 'CANARY' | 'SCHEDULED'
  status: 'IN_PROGRESS' | 'COMPLETED' | 'SCHEDULED'
  succeeded: number
  failed: number
  progressPercent: number
}

interface TelemetryRecord {
  category: TelemetryCategory
  deviceId: string
  summary: string
  timestamp: string
}

interface AuditRecord {
  action: string
  actor: string
  resource: string
  ipAddress: string
  timestamp: string
  recordedChanges: string
}

const sectionContent = {
  eyebrow: 'OPERATIONAL VISIBILITY',
  heading: 'Know What Is Happening Across Your Device Fleet.',
  description:
    'A centralised view of your connected devices, firmware versions, deployment states, and operational events.',
}

const views: FleetCapabilityView[] = [
  {
    key: 'devices',
    label: 'Device Registry',
    icon: 'i-lucide-cpu',
    title: 'Device Registry',
    description: 'Maintain an organised inventory of registered IoT devices.',
    displayedFields: [
      'Device identifier',
      'Device name',
      'Hardware model',
      'Current firmware version',
      'Device status',
      'Last-seen timestamp',
    ],
  },
  {
    key: 'firmware',
    label: 'Firmware Repository',
    icon: 'i-lucide-package-check',
    title: 'Firmware Repository',
    description: 'Manage firmware releases and their lifecycle.',
    displayedFields: [
      'Firmware version',
      'Hardware compatibility',
      'Release description',
      'Firmware status',
      'Checksum',
      'Signing information',
    ],
  },
  {
    key: 'campaigns',
    label: 'Deployment Monitoring',
    icon: 'i-lucide-radio',
    title: 'Deployment Monitoring',
    description: 'Understand how OTA campaigns are progressing.',
    displayedFields: [
      'Campaign name',
      'Target device count',
      'Update strategy',
      'Deployment status',
      'Successful updates',
      'Failed updates',
      'Progress percentage',
    ],
  },
  {
    key: 'telemetry',
    label: 'Telemetry and Events',
    icon: 'i-lucide-activity',
    title: 'Telemetry and Events',
    description: 'Review device activity and update lifecycle events.',
    displayedFields: [
      'HEARTBEAT',
      'STATUS_UPDATE',
      'ERROR',
      'PROGRESS',
      'CUSTOM',
    ],
  },
  {
    key: 'audit',
    label: 'Audit Trail',
    icon: 'i-lucide-scroll-text',
    title: 'Audit Trail',
    description: 'Review security-sensitive administrative and operational actions.',
    displayedFields: [
      'Action',
      'Actor',
      'Resource',
      'IP address',
      'Timestamp',
      'Recorded changes',
    ],
  },
]

const deviceRows: DeviceRecord[] = [
  {
    deviceId: 'dev_esp32_gw04',
    name: 'Cold-Chain Gateway 04',
    hardwareModel: 'ESP32',
    firmwareVersion: 'v1.4.2',
    status: 'ONLINE',
    lastSeen: '2026-11-11 07:49:12 UTC',
  },
  {
    deviceId: 'dev_esp32_nd11',
    name: 'Substation Telemetry Node 11',
    hardwareModel: 'ESP32',
    firmwareVersion: 'v1.4.1',
    status: 'UPDATING',
    lastSeen: '2026-11-11 07:50:04 UTC',
  },
  {
    deviceId: 'dev_esp8266_sn02',
    name: 'Ambient Sensor 02',
    hardwareModel: 'ESP8266',
    firmwareVersion: 'v1.3.0',
    status: 'ONLINE',
    lastSeen: '2026-11-11 07:48:39 UTC',
  },
  {
    deviceId: 'dev_esp32_nd09',
    name: 'Pump Controller 09',
    hardwareModel: 'ESP32',
    firmwareVersion: 'v1.4.1',
    status: 'OFFLINE',
    lastSeen: '2026-11-11 06:15:20 UTC',
  },
]

const firmwareRows: FirmwareRecord[] = [
  {
    version: 'v1.4.2',
    hardwareCompatibility: 'ESP32',
    releaseDescription: 'mTLS session reuse & watchdog timeout tuning',
    status: 'ACTIVE',
    checksum: 'sha256:e3b0c442...852b855',
    signingInfo: 'ECDSA P-256 • Manifest Signed',
  },
  {
    version: 'v1.4.1',
    hardwareCompatibility: 'ESP32',
    releaseDescription: 'LittleFS partition health check improvements',
    status: 'ACTIVE',
    checksum: 'sha256:9f86d081...a495991',
    signingInfo: 'Ed25519 • Manifest Signed',
  },
  {
    version: 'v1.3.0',
    hardwareCompatibility: 'ESP8266',
    releaseDescription: 'Incremental OTA check backoff & memory optimization',
    status: 'STAGED',
    checksum: 'sha256:4b227777...d1a3c09',
    signingInfo: 'SHA-256 Verified • Client Configured',
  },
]

const campaignRows: CampaignRecord[] = [
  {
    campaignName: 'esp32-v1.4.2-canary',
    targetCount: 22,
    strategy: 'CANARY',
    status: 'IN_PROGRESS',
    succeeded: 18,
    failed: 1,
    progressPercent: 86,
  },
  {
    campaignName: 'esp32-v1.4.1-gradual',
    targetCount: 40,
    strategy: 'GRADUAL',
    status: 'COMPLETED',
    succeeded: 40,
    failed: 0,
    progressPercent: 100,
  },
  {
    campaignName: 'esp8266-v1.3.0-window',
    targetCount: 15,
    strategy: 'SCHEDULED',
    status: 'SCHEDULED',
    succeeded: 0,
    failed: 0,
    progressPercent: 0,
  },
]

const telemetryRows: TelemetryRecord[] = [
  {
    category: 'PROGRESS',
    deviceId: 'dev_esp32_nd11',
    summary: 'OTA partition write at 78% • SHA-256 stream verified',
    timestamp: '07:50:04 UTC',
  },
  {
    category: 'STATUS_UPDATE',
    deviceId: 'dev_esp32_gw04',
    summary: 'Booted v1.4.2 • Post-boot health watchdog confirmed',
    timestamp: '07:49:12 UTC',
  },
  {
    category: 'HEARTBEAT',
    deviceId: 'dev_esp8266_sn02',
    summary: 'Device authenticated • Uptime 14d 06h • Free heap 26.4 KB',
    timestamp: '07:48:39 UTC',
  },
  {
    category: 'ERROR',
    deviceId: 'dev_esp32_nd09',
    summary: 'TLS socket timeout during chunk fetch • Retry scheduled',
    timestamp: '06:15:20 UTC',
  },
  {
    category: 'CUSTOM',
    deviceId: 'dev_esp32_gw04',
    summary: 'fsota.littlefs_version="v1.1.0" • Partition verified',
    timestamp: '06:10:02 UTC',
  },
]

const auditRows: AuditRecord[] = [
  {
    action: 'CAMPAIGN_CREATED',
    actor: 'operator@nodewave.net (OPERATOR)',
    resource: 'campaign:esp32-v1.4.2-canary',
    ipAddress: '198.51.100.42',
    timestamp: '07:40:11 UTC',
    recordedChanges: 'strategy=CANARY, maxFailureRate=5%',
  },
  {
    action: 'FIRMWARE_SIGNED',
    actor: 'admin@nodewave.net (ADMIN)',
    resource: 'firmware:v1.4.2 (ESP32)',
    ipAddress: '198.51.100.18',
    timestamp: '07:35:48 UTC',
    recordedChanges: 'algorithm=ECDSA-P256, status=ACTIVE',
  },
  {
    action: 'DEVICE_CERT_ISSUED',
    actor: 'pki-service (SYSTEM)',
    resource: 'device:dev_esp32_gw04',
    ipAddress: '203.0.113.19',
    timestamp: '07:12:05 UTC',
    recordedChanges: 'x509.serial=4A:8F:12:9C, mTLS=ENABLED',
  },
]

const activeTab = ref<FleetTabKey>('devices')

const currentView = computed<FleetCapabilityView>(() => {
  return views.find(v => v.key === activeTab.value) ?? views[0]!
})

function getDeviceStatusColor(status: DeviceRecord['status']) {
  if (status === 'ONLINE')
    return 'success'
  if (status === 'UPDATING')
    return 'primary'
  return 'neutral'
}

function getTelemetryColor(category: TelemetryCategory) {
  switch (category) {
    case 'STATUS_UPDATE':
      return 'success'
    case 'PROGRESS':
      return 'primary'
    case 'ERROR':
      return 'error'
    case 'CUSTOM':
      return 'warning'
    default:
      return 'neutral'
  }
}
</script>

<template>
  <section id="fleet" aria-labelledby="fleet-heading" class="flex w-full flex-col gap-8">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
      <div class="flex flex-col items-start gap-3 lg:col-span-6">
        <UBadge
          color="primary"
          variant="subtle"
          size="sm"
          class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
        >
          {{ sectionContent.eyebrow }}
        </UBadge>

        <h2
          id="fleet-heading"
          class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl"
        >
          {{ sectionContent.heading }}
        </h2>
      </div>

      <p class="font-sans text-base leading-relaxed text-muted lg:col-span-6">
        {{ sectionContent.description }}
      </p>
    </div>

    <div
      class="-mx-4 flex flex-col gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:overflow-hidden sm:rounded-xs sm:border"
    >
      <div
        role="tablist"
        aria-label="Fleet management dashboard views"
        class="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-5"
      >
        <button
          v-for="(view, idx) in views"
          :key="view.key"
          type="button"
          role="tab"
          :aria-selected="activeTab === view.key"
          :aria-controls="`fleet-panel-${view.key}`"
          class="flex items-center justify-between gap-2 px-4 py-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:px-4"
          :class="[
            activeTab === view.key
              ? 'bg-elevated text-highlighted'
              : 'bg-default text-muted hover:bg-elevated/40 hover:text-highlighted',
            idx === views.length - 1 ? 'col-span-2 sm:col-span-1' : '',
          ]"
          @click="activeTab = view.key"
        >
          <div class="flex items-center gap-2">
            <UIcon
              :name="view.icon"
              aria-hidden="true"
              class="h-4 w-4 shrink-0"
              :class="activeTab === view.key ? 'text-primary' : 'text-muted'"
            />
            <span class="font-mono text-xs font-semibold">
              {{ view.label }}
            </span>
          </div>

          <span
            v-if="activeTab === view.key"
            aria-hidden="true"
            class="h-1.5 w-1.5 shrink-0 rounded-xs bg-primary"
          />
        </button>
      </div>

      <div
        :id="`fleet-panel-${currentView.key}`"
        role="tabpanel"
        class="flex flex-col gap-px bg-border"
      >
        <div
          class="flex flex-col justify-between gap-4 bg-elevated/40 px-4 py-4 sm:px-6 lg:flex-row lg:items-center"
        >
          <div class="flex flex-col gap-1">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="font-sans text-base font-bold text-highlighted">
                {{ currentView.title }}
              </h3>
              <UBadge
                color="warning"
                variant="subtle"
                size="xs"
                class="rounded-xs font-mono text-[10px]"
              >
                Illustrative Console Preview
              </UBadge>
            </div>
            <p class="font-sans text-xs text-muted sm:text-sm">
              {{ currentView.description }}
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-1.5">
            <UBadge
              v-for="field in currentView.displayedFields"
              :key="field"
              color="neutral"
              variant="outline"
              size="xs"
              class="rounded-xs font-mono text-[11px]"
            >
              {{ field }}
            </UBadge>
          </div>
        </div>

        <div v-if="activeTab === 'devices'" class="overflow-x-auto bg-default">
          <table class="w-full min-w-170 border-collapse text-left text-xs">
            <thead>
              <tr class="border-b border-default bg-elevated/20 font-mono text-[11px] text-muted uppercase">
                <th scope="col" class="px-4 py-3 sm:px-6">
                  Device Identifier
                </th>
                <th scope="col" class="px-4 py-3">
                  Device Name
                </th>
                <th scope="col" class="px-4 py-3">
                  Hardware Model
                </th>
                <th scope="col" class="px-4 py-3">
                  Current Firmware
                </th>
                <th scope="col" class="px-4 py-3">
                  Status
                </th>
                <th scope="col" class="px-4 py-3 sm:px-6">
                  Last-Seen Timestamp
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-default">
              <tr
                v-for="row in deviceRows"
                :key="row.deviceId"
                class="transition-colors hover:bg-elevated/30"
              >
                <td class="px-4 py-3.5 font-mono font-semibold text-highlighted sm:px-6">
                  {{ row.deviceId }}
                </td>
                <td class="px-4 py-3.5 font-sans text-default">
                  {{ row.name }}
                </td>
                <td class="px-4 py-3.5 font-mono text-muted">
                  {{ row.hardwareModel }}
                </td>
                <td class="px-4 py-3.5 font-mono text-primary">
                  {{ row.firmwareVersion }}
                </td>
                <td class="px-4 py-3.5">
                  <UBadge
                    :color="getDeviceStatusColor(row.status)"
                    variant="subtle"
                    size="xs"
                    class="rounded-xs font-mono text-[10px]"
                  >
                    {{ row.status }}
                  </UBadge>
                </td>
                <td class="px-4 py-3.5 font-mono text-muted sm:px-6">
                  {{ row.lastSeen }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else-if="activeTab === 'firmware'" class="overflow-x-auto bg-default">
          <table class="w-full min-w-180 border-collapse text-left text-xs">
            <thead>
              <tr class="border-b border-default bg-elevated/20 font-mono text-[11px] text-muted uppercase">
                <th scope="col" class="px-4 py-3 sm:px-6">
                  Version
                </th>
                <th scope="col" class="px-4 py-3">
                  Hardware
                </th>
                <th scope="col" class="px-4 py-3">
                  Release Description
                </th>
                <th scope="col" class="px-4 py-3">
                  Status
                </th>
                <th scope="col" class="px-4 py-3">
                  Checksum
                </th>
                <th scope="col" class="px-4 py-3 sm:px-6">
                  Signing Information
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-default">
              <tr
                v-for="row in firmwareRows"
                :key="row.version"
                class="transition-colors hover:bg-elevated/30"
              >
                <td class="px-4 py-3.5 font-mono font-bold text-primary sm:px-6">
                  {{ row.version }}
                </td>
                <td class="px-4 py-3.5 font-mono text-highlighted">
                  {{ row.hardwareCompatibility }}
                </td>
                <td class="px-4 py-3.5 font-sans text-default">
                  {{ row.releaseDescription }}
                </td>
                <td class="px-4 py-3.5">
                  <UBadge
                    :color="row.status === 'ACTIVE' ? 'success' : 'neutral'"
                    variant="subtle"
                    size="xs"
                    class="rounded-xs font-mono text-[10px]"
                  >
                    {{ row.status }}
                  </UBadge>
                </td>
                <td class="px-4 py-3.5 font-mono text-muted">
                  {{ row.checksum }}
                </td>
                <td class="px-4 py-3.5 font-mono text-highlighted sm:px-6">
                  {{ row.signingInfo }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else-if="activeTab === 'campaigns'" class="overflow-x-auto bg-default">
          <table class="w-full min-w-180 border-collapse text-left text-xs">
            <thead>
              <tr class="border-b border-default bg-elevated/20 font-mono text-[11px] text-muted uppercase">
                <th scope="col" class="px-4 py-3 sm:px-6">
                  Campaign Name
                </th>
                <th scope="col" class="px-4 py-3">
                  Targets
                </th>
                <th scope="col" class="px-4 py-3">
                  Strategy
                </th>
                <th scope="col" class="px-4 py-3">
                  Status
                </th>
                <th scope="col" class="px-4 py-3">
                  Succeeded / Failed
                </th>
                <th scope="col" class="px-4 py-3 sm:px-6">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-default">
              <tr
                v-for="row in campaignRows"
                :key="row.campaignName"
                class="transition-colors hover:bg-elevated/30"
              >
                <td class="px-4 py-3.5 font-mono font-semibold text-highlighted sm:px-6">
                  {{ row.campaignName }}
                </td>
                <td class="px-4 py-3.5 font-mono text-default">
                  {{ row.targetCount }} devices
                </td>
                <td class="px-4 py-3.5">
                  <UBadge color="primary" variant="outline" size="xs" class="rounded-xs font-mono text-[10px]">
                    {{ row.strategy }}
                  </UBadge>
                </td>
                <td class="px-4 py-3.5 font-mono text-muted">
                  {{ row.status }}
                </td>
                <td class="px-4 py-3.5 font-mono">
                  <span class="text-success">{{ row.succeeded }} ok</span>
                  <span class="text-muted"> / </span>
                  <span :class="row.failed > 0 ? 'text-error' : 'text-muted'">
                    {{ row.failed }} failed
                  </span>
                </td>
                <td class="px-4 py-3.5 font-mono font-bold text-primary sm:px-6">
                  {{ row.progressPercent }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else-if="activeTab === 'telemetry'" class="divide-y divide-default bg-default">
          <div
            v-for="event in telemetryRows"
            :key="`${event.category}-${event.timestamp}`"
            class="flex flex-col justify-between gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:px-6"
          >
            <div class="flex flex-wrap items-center gap-2.5">
              <UBadge
                :color="getTelemetryColor(event.category)"
                variant="subtle"
                size="xs"
                class="rounded-xs font-mono text-[10px]"
              >
                {{ event.category }}
              </UBadge>
              <span class="font-mono text-xs font-semibold text-highlighted">
                {{ event.deviceId }}
              </span>
              <span class="font-sans text-xs text-muted">
                {{ event.summary }}
              </span>
            </div>

            <span class="shrink-0 font-mono text-[11px] text-muted">
              {{ event.timestamp }}
            </span>
          </div>
        </div>

        <div v-else class="overflow-x-auto bg-default">
          <table class="w-full min-w-190 border-collapse text-left text-xs">
            <thead>
              <tr class="border-b border-default bg-elevated/20 font-mono text-[11px] text-muted uppercase">
                <th scope="col" class="px-4 py-3 sm:px-6">
                  Action
                </th>
                <th scope="col" class="px-4 py-3">
                  Actor
                </th>
                <th scope="col" class="px-4 py-3">
                  Resource
                </th>
                <th scope="col" class="px-4 py-3">
                  IP Address
                </th>
                <th scope="col" class="px-4 py-3">
                  Timestamp
                </th>
                <th scope="col" class="px-4 py-3 sm:px-6">
                  Recorded Changes
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-default">
              <tr
                v-for="row in auditRows"
                :key="`${row.action}-${row.timestamp}`"
                class="transition-colors hover:bg-elevated/30"
              >
                <td class="px-4 py-3.5 font-mono font-bold text-primary sm:px-6">
                  {{ row.action }}
                </td>
                <td class="px-4 py-3.5 font-mono text-highlighted">
                  {{ row.actor }}
                </td>
                <td class="px-4 py-3.5 font-mono text-default">
                  {{ row.resource }}
                </td>
                <td class="px-4 py-3.5 font-mono text-muted">
                  {{ row.ipAddress }}
                </td>
                <td class="px-4 py-3.5 font-mono text-muted">
                  {{ row.timestamp }}
                </td>
                <td class="px-4 py-3.5 font-mono text-default sm:px-6">
                  {{ row.recordedChanges }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
