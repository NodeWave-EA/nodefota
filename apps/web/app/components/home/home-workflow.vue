<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({
  name: 'HomeWorkflow',
})

interface DevicePipelineStep {
  order: string
  label: string
}

interface WorkflowStage {
  step: string
  shortTitle: string
  title: string
  actor: 'Platform Cloud' | 'Embedded Device Client'
  summary: string
  icon: string
  detailsTitle: string
  details: string[]
  devicePipeline?: DevicePipelineStep[]
}

const sectionContent = {
  eyebrow: 'THE UPDATE LIFECYCLE',
  heading: 'From Firmware Upload to Verified Installation.',
  description:
    'Manage the complete OTA workflow through a structured process that connects firmware releases, device authentication, cryptographic verification, and deployment monitoring.',
  closingStatement:
    'Every update becomes a traceable operation, from release creation to device-side verification and deployment reporting.',
}

const stages: WorkflowStage[] = [
  {
    step: '01',
    shortTitle: 'Upload',
    title: 'Upload Your Firmware',
    actor: 'Platform Cloud',
    summary: 'Upload a firmware binary through the platform.',
    icon: 'i-lucide-upload-cloud',
    detailsTitle: 'Automated Platform Ingestion',
    details: [
      'Stores firmware artefacts in object storage',
      'Calculates SHA-256 checksums automatically',
      'Identifies supported hardware targets where applicable',
      'Generates structured firmware metadata',
      'Creates a cryptographically signed firmware manifest',
    ],
  },
  {
    step: '02',
    shortTitle: 'Configure',
    title: 'Configure Your Deployment',
    actor: 'Platform Cloud',
    summary: 'Select the firmware release and target devices.',
    icon: 'i-lucide-sliders-horizontal',
    detailsTitle: 'Campaign Targeting & Guardrails',
    details: [
      'Target hardware model selection',
      'Individual or group device selection',
      'Firmware version constraints',
      'Rollout strategy (Immediate, Gradual, Canary, Scheduled)',
      'Deployment execution schedule',
      'Automated rollback thresholds',
    ],
  },
  {
    step: '03',
    shortTitle: 'Distribute',
    title: 'Authenticate and Distribute',
    actor: 'Platform Cloud',
    summary: 'Devices authenticate with the platform before accessing authorised firmware updates.',
    icon: 'i-lucide-key-round',
    detailsTitle: 'Authenticated Update Delivery',
    details: [
      'Device identity verification (JWT or X.509 / mTLS)',
      'Authenticated OTA update availability checks',
      'Time-limited signed firmware download URLs',
      'Encrypted HTTPS transport',
      'Delivery of firmware metadata and signature information',
    ],
  },
  {
    step: '04',
    shortTitle: 'Verify & Install',
    title: 'Verify and Install',
    actor: 'Embedded Device Client',
    summary:
      'The device-side client executes a deterministic seven-stage validation and installation pipeline before booting new firmware.',
    icon: 'i-lucide-cpu',
    detailsTitle: 'On-Device Validation Guarantees',
    details: [
      'Rejects tampered or corrupted binaries prior to flash commit',
      'Verifies manifest authenticity against trusted public keys',
      'Writes exclusively to inactive OTA partition slots',
      'Validates post-boot health before marking partition active',
    ],
    devicePipeline: [
      { order: '01', label: 'Check for available firmware' },
      { order: '02', label: 'Retrieve update metadata' },
      { order: '03', label: 'Download firmware binary' },
      { order: '04', label: 'Verify SHA-256 integrity' },
      { order: '05', label: 'Verify digital signature' },
      { order: '06', label: 'Write firmware to OTA partition' },
      { order: '07', label: 'Restart and perform health validation' },
    ],
  },
  {
    step: '05',
    shortTitle: 'Monitor',
    title: 'Monitor and Recover',
    actor: 'Platform Cloud',
    summary: 'The device reports its update lifecycle state back to the control plane.',
    icon: 'i-lucide-activity',
    detailsTitle: 'Lifecycle Telemetry & Automated Recovery',
    details: [
      'Real-time update progress reporting',
      'Installation success and failure status',
      'Continuous device heartbeat telemetry',
      'Structured diagnostic error information',
      'Campaign-level success and failure rate tracking',
      'Configurable rollback policies on threshold breach',
    ],
  },
]

const activeIndex = ref(3)

const activeStage = computed<WorkflowStage>(() => {
  return stages[activeIndex.value] ?? stages[0]!
})

function selectStage(index: number) {
  activeIndex.value = index
}

function nextStage() {
  activeIndex.value = (activeIndex.value + 1) % stages.length
}

function previousStage() {
  activeIndex.value = (activeIndex.value - 1 + stages.length) % stages.length
}
</script>

<template>
  <section id="workflow" aria-labelledby="workflow-heading" class="flex w-full flex-col gap-8">
    <div class="flex flex-col items-start gap-3">
      <UBadge
        color="primary"
        variant="subtle"
        size="sm"
        class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
      >
        {{ sectionContent.eyebrow }}
      </UBadge>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
        <h2
          id="workflow-heading"
          class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl lg:col-span-6"
        >
          {{ sectionContent.heading }}
        </h2>

        <p class="font-sans text-base leading-relaxed text-muted lg:col-span-6">
          {{ sectionContent.description }}
        </p>
      </div>
    </div>

    <div
      class="-mx-4 flex flex-col gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:overflow-hidden sm:rounded-xs sm:border"
    >
      <div
        role="tablist"
        aria-label="OTA Update Lifecycle Stages"
        class="grid grid-cols-1 gap-px bg-border sm:grid-cols-5"
      >
        <button
          v-for="(stage, idx) in stages"
          :key="stage.step"
          type="button"
          role="tab"
          :aria-selected="activeIndex === idx"
          :aria-controls="`workflow-panel-${stage.step}`"
          class="group flex flex-col items-start justify-between gap-3 px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:p-4"
          :class="activeIndex === idx
            ? 'bg-elevated text-highlighted'
            : 'bg-default text-muted hover:bg-elevated/40 hover:text-highlighted'"
          @click="selectStage(idx)"
        >
          <div class="flex w-full items-center justify-between gap-2">
            <span
              class="font-mono text-xs font-bold"
              :class="activeIndex === idx ? 'text-primary' : 'text-muted'"
            >
              STEP {{ stage.step }}
            </span>

            <UIcon
              :name="stage.icon"
              aria-hidden="true"
              class="h-4 w-4 transition-colors"
              :class="activeIndex === idx ? 'text-primary' : 'text-muted group-hover:text-highlighted'"
            />
          </div>

          <div class="flex flex-col gap-1">
            <span class="font-sans text-sm font-bold text-highlighted">
              {{ stage.shortTitle }}
            </span>
            <span class="font-mono text-[11px] text-muted">
              {{ stage.actor }}
            </span>
          </div>

          <span
            aria-hidden="true"
            class="h-0.5 w-full rounded-xs transition-colors"
            :class="activeIndex === idx ? 'bg-primary' : 'bg-transparent'"
          />
        </button>
      </div>

      <div
        :id="`workflow-panel-${activeStage.step}`"
        role="tabpanel"
        class="grid grid-cols-1 gap-px bg-border lg:grid-cols-12"
      >
        <div class="flex flex-col justify-between gap-6 bg-default px-4 py-6 sm:p-6 lg:col-span-5">
          <div class="flex flex-col gap-4">
            <div class="flex flex-wrap items-center gap-2">
              <UBadge
                :color="activeStage.actor === 'Embedded Device Client' ? 'success' : 'primary'"
                variant="subtle"
                size="xs"
                class="rounded-xs font-mono text-xs"
              >
                {{ activeStage.actor }}
              </UBadge>

              <span class="font-mono text-xs text-muted">
                Stage {{ activeStage.step }} of 05
              </span>
            </div>

            <h3 class="font-sans text-2xl font-bold text-highlighted">
              {{ activeStage.title }}
            </h3>

            <p class="font-sans text-sm leading-relaxed text-muted sm:text-base">
              {{ activeStage.summary }}
            </p>
          </div>

          <div class="flex items-center gap-2 pt-2">
            <UButton
              color="neutral"
              variant="outline"
              size="sm"
              icon="i-lucide-arrow-left"
              aria-label="Previous lifecycle stage"
              class="rounded-xs font-mono text-xs"
              @click="previousStage"
            >
              Prev
            </UButton>
            <UButton
              color="neutral"
              variant="outline"
              size="sm"
              trailing-icon="i-lucide-arrow-right"
              aria-label="Next lifecycle stage"
              class="rounded-xs font-mono text-xs"
              @click="nextStage"
            >
              Next Stage
            </UButton>
          </div>
        </div>

        <div class="flex flex-col justify-center gap-5 bg-elevated/30 px-4 py-6 sm:p-6 lg:col-span-7">
          <div v-if="activeStage.devicePipeline" class="flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
                Device-Side Validation & Installation Pipeline
              </span>
              <span class="font-mono text-[11px] text-muted">
                FOTA C++ Client
              </span>
            </div>

            <ol
              class="grid grid-cols-1 gap-px overflow-hidden rounded-xs border border-default bg-border sm:grid-cols-2"
            >
              <li
                v-for="pipe in activeStage.devicePipeline"
                :key="pipe.order"
                class="flex items-center gap-3 bg-default px-3.5 py-2.5 text-xs"
                :class="{ 'sm:col-span-2': pipe.order === '07' }"
              >
                <span
                  class="flex h-5 w-5 shrink-0 items-center justify-center rounded-xs bg-primary/10 font-mono text-[11px] font-bold text-primary"
                >
                  {{ pipe.order }}
                </span>
                <span class="font-mono text-xs text-highlighted">
                  {{ pipe.label }}
                </span>
              </li>
            </ol>
          </div>

          <div v-else class="flex flex-col gap-3">
            <span class="font-mono text-xs font-semibold tracking-wider text-muted uppercase">
              {{ activeStage.detailsTitle }}
            </span>

            <ul class="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <li
                v-for="detail in activeStage.details"
                :key="detail"
                class="flex items-start gap-2.5 rounded-xs border border-default bg-default p-3 text-xs text-default sm:text-sm"
              >
                <UIcon
                  name="i-lucide-check-circle-2"
                  aria-hidden="true"
                  class="mt-0.5 h-4 w-4 shrink-0 text-primary"
                />
                <span class="font-sans leading-snug">{{ detail }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 bg-elevated/60 px-4 py-4 sm:px-6">
        <UIcon name="i-lucide-git-commit-horizontal" aria-hidden="true" class="h-4 w-4 shrink-0 text-primary" />
        <p class="font-sans text-xs font-medium text-highlighted sm:text-sm">
          {{ sectionContent.closingStatement }}
        </p>
      </div>
    </div>
  </section>
</template>
