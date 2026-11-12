<script setup lang="ts">
defineOptions({
  name: 'HomeProblem',
})

interface ProblemRiskItem {
  number: string
  code: string
  title: string
  description: string
  icon: string
}

const sectionContent = {
  eyebrow: 'THE CHALLENGE',
  heading: 'Your IoT Devices Should Never Be Left Behind.',
  description:
    'Connected devices operate in environments where physical access is difficult, firmware vulnerabilities can remain unpatched, and manual updates become increasingly difficult to manage. Traditional firmware distribution workflows introduce operational and security risks.',
  closingStatement:
    'Secure firmware management requires more than a download URL. It requires a complete lifecycle built around trusted identities, verified firmware, controlled deployment, and reliable recovery.',
}

const problemItems: ProblemRiskItem[] = [
  {
    number: '01',
    code: 'INTEGRITY',
    title: 'Unverified Firmware',
    description:
      'Without cryptographic verification, devices may be exposed to modified or malicious firmware distributed through compromised update channels.',
    icon: 'i-lucide-shield-alert',
  },
  {
    number: '02',
    code: 'RESILIENCE',
    title: 'Failed Updates',
    description:
      'Power interruptions, unstable connectivity, and installation failures can leave devices in an unusable state without appropriate recovery mechanisms.',
    icon: 'i-lucide-zap-off',
  },
  {
    number: '03',
    code: 'OBSERVABILITY',
    title: 'Limited Fleet Visibility',
    description:
      'Managing devices individually makes it difficult to identify outdated firmware, monitor deployment progress, and understand device health.',
    icon: 'i-lucide-eye-off',
  },
  {
    number: '04',
    code: 'OPERATIONS',
    title: 'Manual Deployment Processes',
    description:
      'Manual flashing and custom scripts become increasingly difficult to maintain as the number of deployed devices grows.',
    icon: 'i-lucide-wrench',
  },
  {
    number: '05',
    code: 'IDENTITY',
    title: 'Inadequate Authentication',
    description:
      'Shared credentials and insufficient device identity verification increase the risk of unauthorised device access.',
    icon: 'i-lucide-key-round',
  },
  {
    number: '06',
    code: 'GOVERNANCE',
    title: 'Missing Accountability',
    description:
      'Without centralised audit logs, tracking firmware changes, deployment actions, and administrative operations becomes difficult.',
    icon: 'i-lucide-file-warning',
  },
]
</script>

<template>
  <section aria-labelledby="problem-heading" class="flex w-full flex-col gap-8">
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
      <div class="flex flex-col items-start gap-3 lg:col-span-6">
        <UBadge
          color="warning"
          variant="subtle"
          size="sm"
          class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
        >
          {{ sectionContent.eyebrow }}
        </UBadge>

        <h2
          id="problem-heading"
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
      class="-mx-4 grid grid-cols-1 gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:overflow-hidden sm:rounded-xs sm:border md:grid-cols-2 lg:grid-cols-3"
    >
      <article
        v-for="item in problemItems"
        :key="item.number"
        class="flex flex-col justify-between gap-4 bg-default px-4 py-5 sm:p-6"
      >
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="font-mono text-xs font-bold text-warning">
                {{ item.number }}
              </span>
              <span aria-hidden="true" class="text-muted">/</span>
              <span class="font-mono text-[11px] font-medium tracking-wider text-muted uppercase">
                {{ item.code }}
              </span>
            </div>

            <UIcon :name="item.icon" aria-hidden="true" class="h-4 w-4 text-warning" />
          </div>

          <h3 class="font-sans text-lg font-semibold text-highlighted">
            {{ item.title }}
          </h3>

          <p class="font-sans text-sm leading-relaxed text-muted">
            {{ item.description }}
          </p>
        </div>
      </article>

      <div
        class="flex flex-col items-start justify-between gap-4 bg-elevated/60 px-4 py-5 sm:p-6 md:col-span-2 lg:col-span-3 lg:flex-row lg:items-center"
      >
        <div class="flex items-start gap-3">
          <div
            class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xs bg-primary/10 text-primary"
          >
            <UIcon name="i-lucide-shield-check" aria-hidden="true" class="h-4 w-4" />
          </div>
          <p class="font-sans text-sm font-medium leading-relaxed text-highlighted sm:text-base">
            {{ sectionContent.closingStatement }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
