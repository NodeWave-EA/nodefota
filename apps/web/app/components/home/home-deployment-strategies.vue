<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({
  name: 'HomeDeploymentStrategies',
})

type StrategyKey = 'IMMEDIATE' | 'GRADUAL' | 'CANARY' | 'SCHEDULED'

interface RolloutWave {
  label: string
  allocation: string
  percent: number
  note: string
}

interface DeploymentStrategy {
  key: StrategyKey
  title: string
  badge: string
  description: string
  useCase: string
  icon: string
  waves: RolloutWave[]
}

const sectionContent = {
  eyebrow: 'DEPLOY WITH CONFIDENCE',
  heading: 'Release Gradually. Monitor Continuously. Recover Automatically.',
  description:
    'Avoid exposing your entire fleet to a potentially defective firmware release. Use deployment strategies that provide greater control over how updates reach your devices.',
  rollbackTitle: 'Automated Rollback & Campaign Protection',
  rollbackSummary:
    'Configure failure-rate thresholds and minimum update counts to help prevent problematic campaigns from continuing. Where configured conditions are satisfied, the platform can cancel a campaign and initiate applicable rollback operations.',
}

const strategies: DeploymentStrategy[] = [
  {
    key: 'IMMEDIATE',
    title: 'IMMEDIATE',
    badge: 'Single Wave',
    description:
      'Deploy firmware to all selected campaign targets without a gradual rollout delay.',
    useCase: 'Urgent security patches or validated lab/staging device groups.',
    icon: 'i-lucide-zap',
    waves: [
      {
        label: 'Wave 01 - Full Target Cohort',
        allocation: '100% of targeted devices',
        percent: 100,
        note: 'All eligible devices receive the signed manifest upon their next authenticated check.',
      },
    ],
  },
  {
    key: 'GRADUAL',
    title: 'GRADUAL',
    badge: 'Percentage Stages',
    description:
      'Distribute firmware using percentage-based rollout stages.',
    useCase: 'Production fleet releases where exposure is expanded incrementally across cohorts.',
    icon: 'i-lucide-trending-up',
    waves: [
      {
        label: 'Stage 01 - Initial Cohort',
        allocation: '10% target allocation',
        percent: 10,
        note: 'Monitors initial installation success and post-boot heartbeat telemetry.',
      },
      {
        label: 'Stage 02 - Expanded Cohort',
        allocation: '40% target allocation',
        percent: 40,
        note: 'Proceeds once failure-rate thresholds remain within configured limits.',
      },
      {
        label: 'Stage 03 - Fleet Completion',
        allocation: '100% target allocation',
        percent: 100,
        note: 'Completes delivery across remaining compatible target devices.',
      },
    ],
  },
  {
    key: 'CANARY',
    title: 'CANARY',
    badge: 'Validation Subset',
    description:
      'Start with a limited subset of devices before expanding the deployment.',
    useCase: 'Validating new firmware builds on representative hardware before broader rollout.',
    icon: 'i-lucide-flask-conical',
    waves: [
      {
        label: 'Canary Group - Validation Subset',
        allocation: 'Selected canary devices',
        percent: 15,
        note: 'Isolated test cohort verifies download, signature check, and post-boot watchdog.',
      },
      {
        label: 'Broad Fleet Promotion',
        allocation: 'Remaining campaign targets',
        percent: 100,
        note: 'Promoted after canary stability and health checks are confirmed.',
      },
    ],
  },
  {
    key: 'SCHEDULED',
    title: 'SCHEDULED',
    badge: 'Maintenance Window',
    description:
      'Configure deployments for a planned execution time.',
    useCase: 'Coordinating firmware updates during off-peak operational or maintenance windows.',
    icon: 'i-lucide-calendar-clock',
    waves: [
      {
        label: 'Pre-Execution Window',
        allocation: '0% active (Queued)',
        percent: 0,
        note: 'Signed manifest and target rules staged ahead of the scheduled timestamp.',
      },
      {
        label: 'Scheduled Window Activation',
        allocation: '100% of planned window',
        percent: 100,
        note: 'Campaign activates automatically at the configured maintenance window.',
      },
    ],
  },
]

const rollbackGuardrails = [
  {
    label: 'Failure-Rate Thresholds',
    detail: 'Define maximum tolerated update failure percentages per campaign.',
    icon: 'i-lucide-percent',
  },
  {
    label: 'Minimum Update Counts',
    detail: 'Require a minimum sample of device reports before evaluating threshold breaches.',
    icon: 'i-lucide-hash',
  },
  {
    label: 'Campaign Auto-Cancellation',
    detail: 'Halts active distribution automatically when configured failure conditions are met.',
    icon: 'i-lucide-octagon-x',
  },
  {
    label: 'Device-Side Rollback Coordination',
    detail: 'Pairs platform cancellation with ESP32 OTA partition rollback and post-boot health validation.',
    icon: 'i-lucide-rotate-ccw',
  },
]

const selectedKey = ref<StrategyKey>('CANARY')

const activeStrategy = computed<DeploymentStrategy>(() => {
  return strategies.find(s => s.key === selectedKey.value) ?? strategies[0]!
})
</script>

<template>
  <section id="deployments" aria-labelledby="deployments-heading" class="flex w-full flex-col gap-8">
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
          id="deployments-heading"
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
        aria-label="OTA Deployment Strategies"
        class="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4"
      >
        <button
          v-for="strategy in strategies"
          :key="strategy.key"
          type="button"
          role="tab"
          :aria-selected="selectedKey === strategy.key"
          :aria-controls="`strategy-panel-${strategy.key}`"
          class="group flex flex-col justify-between gap-3 px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:p-5"
          :class="selectedKey === strategy.key
            ? 'bg-elevated text-highlighted'
            : 'bg-default text-muted hover:bg-elevated/40 hover:text-highlighted'"
          @click="selectedKey = strategy.key"
        >
          <div class="flex w-full items-center justify-between gap-2">
            <span
              class="font-mono text-sm font-bold"
              :class="selectedKey === strategy.key ? 'text-primary' : 'text-highlighted'"
            >
              {{ strategy.title }}
            </span>

            <UBadge
              :color="selectedKey === strategy.key ? 'primary' : 'neutral'"
              variant="subtle"
              size="xs"
              class="rounded-xs font-mono text-[10px]"
            >
              {{ strategy.badge }}
            </UBadge>
          </div>

          <p class="font-sans text-xs leading-relaxed text-muted">
            {{ strategy.description }}
          </p>

          <span
            aria-hidden="true"
            class="h-0.5 w-full rounded-xs transition-colors"
            :class="selectedKey === strategy.key ? 'bg-primary' : 'bg-transparent'"
          />
        </button>
      </div>

      <div
        :id="`strategy-panel-${activeStrategy.key}`"
        role="tabpanel"
        class="grid grid-cols-1 gap-px bg-border lg:grid-cols-12"
      >
        <div class="flex flex-col justify-between gap-4 bg-default px-4 py-6 sm:p-6 lg:col-span-5">
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border border-default bg-elevated text-primary"
              >
                <UIcon :name="activeStrategy.icon" aria-hidden="true" class="h-4 w-4" />
              </div>
              <span class="font-mono text-xs font-bold text-primary">
                STRATEGY: {{ activeStrategy.title }}
              </span>
            </div>

            <p class="font-sans text-sm leading-relaxed text-highlighted sm:text-base">
              {{ activeStrategy.description }}
            </p>
          </div>

          <div class="rounded-xs border border-default bg-elevated/40 p-3.5">
            <span class="block font-mono text-[11px] font-semibold tracking-wider text-muted uppercase">
              Operational Profile
            </span>
            <p class="mt-1 font-sans text-xs leading-relaxed text-default">
              {{ activeStrategy.useCase }}
            </p>
          </div>
        </div>

        <div class="flex flex-col justify-center gap-4 bg-elevated/30 px-4 py-6 sm:p-6 lg:col-span-7">
          <span class="font-mono text-xs font-semibold tracking-wider text-muted uppercase">
            Rollout Execution Stages
          </span>

          <div class="flex flex-col gap-3">
            <div
              v-for="wave in activeStrategy.waves"
              :key="wave.label"
              class="flex flex-col gap-2 rounded-xs border border-default bg-default p-4"
            >
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="font-mono text-xs font-bold text-highlighted">
                  {{ wave.label }}
                </span>
                <span class="font-mono text-xs font-semibold text-primary">
                  {{ wave.allocation }}
                </span>
              </div>

              <UProgress
                :model-value="wave.percent"
                size="xs"
                color="primary"
                :aria-label="`${wave.label} target allocation`"
                :ui="{
                  base: 'rounded-xs',
                  indicator: 'rounded-xs',
                }"
              />

              <p class="font-sans text-xs text-muted">
                {{ wave.note }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-px bg-border lg:grid-cols-12">
        <div class="flex flex-col justify-center gap-2 bg-elevated/60 px-4 py-5 sm:p-6 lg:col-span-5">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-shield-ban" aria-hidden="true" class="h-4 w-4 text-warning" />
            <h3 class="font-sans text-base font-bold text-highlighted">
              {{ sectionContent.rollbackTitle }}
            </h3>
          </div>
          <p class="font-sans text-xs leading-relaxed text-muted sm:text-sm">
            {{ sectionContent.rollbackSummary }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:col-span-7">
          <div
            v-for="item in rollbackGuardrails"
            :key="item.label"
            class="flex items-start gap-3 bg-default px-4 py-4 sm:p-4"
          >
            <UIcon :name="item.icon" aria-hidden="true" class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div class="flex flex-col gap-0.5">
              <span class="font-mono text-xs font-bold text-highlighted">
                {{ item.label }}
              </span>
              <span class="font-sans text-xs leading-snug text-muted">
                {{ item.detail }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
