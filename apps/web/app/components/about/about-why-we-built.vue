<script setup lang="ts">
defineOptions({
  name: 'AboutWhyWeBuilt',
})

const challenges = [
  {
    num: '01',
    title: 'Firmware Integrity',
    description: 'Preventing corrupted or tampered firmware binaries from being flashed onto device storage.',
    icon: 'i-lucide-binary',
  },
  {
    num: '02',
    title: 'Device Identity',
    description: 'Distinguishing legitimate, provisioned devices from unauthorized or impersonated clients.',
    icon: 'i-lucide-shield-check',
  },
  {
    num: '03',
    title: 'Deployment Reliability',
    description: 'Deploying releases progressively through percentage rollouts rather than exposing an entire fleet at once.',
    icon: 'i-lucide-git-branch',
  },
  {
    num: '04',
    title: 'Operational Visibility',
    description: 'Monitoring real-time update progress, telemetry, and device-reported error codes.',
    icon: 'i-lucide-activity',
  },
  {
    num: '05',
    title: 'Device Recovery',
    description: 'Automatically reverting to safe fallback partitions when a newly installed firmware fails post-boot.',
    icon: 'i-lucide-rotate-ccw',
  },
]
</script>

<template>
  <section aria-labelledby="about-why-heading" class="flex flex-col gap-6">
    <div class="flex flex-col items-start gap-3">
      <UBadge color="warning" variant="subtle" size="sm" class="rounded-xs font-mono text-xs font-semibold uppercase">
        02 // PROBLEM SPACE
      </UBadge>
      <h2 id="about-why-heading" class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
        Firmware updates should not become a security risk.
      </h2>
      <p class="max-w-3xl font-sans text-base leading-relaxed text-muted">
        Firmware controls how connected devices operate and communicate. Updating deployed hardware introduces critical operational challenges that require a security-first update workflow.
      </p>
    </div>

    <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
      <div class="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in challenges"
          :key="item.num"
          class="flex flex-col justify-between gap-3 bg-default p-5 transition-colors hover:bg-elevated/40"
        >
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <div class="flex size-7 items-center justify-center rounded-xs border border-default bg-elevated/60">
                <UIcon :name="item.icon" class="size-3.5 text-warning" aria-hidden="true" />
              </div>
              <span class="font-mono text-xs font-bold text-primary">{{ item.num }}</span>
            </div>

            <h3 class="font-sans text-sm font-bold text-highlighted sm:text-base">
              {{ item.title }}
            </h3>
            <p class="font-sans text-xs leading-relaxed text-muted">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
