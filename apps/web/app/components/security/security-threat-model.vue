<script setup lang="ts">
import { THREAT_MODEL } from '~/content/security'

defineOptions({
  name: 'SecurityThreatModel',
})
</script>

<template>
  <section id="threat-model" aria-labelledby="threat-model-heading" class="flex w-full flex-col gap-8 scroll-mt-24">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
      <div class="flex flex-col items-start gap-3 lg:col-span-6">
        <UBadge
          color="warning"
          variant="subtle"
          size="sm"
          class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
        >
          RISK MANAGEMENT
        </UBadge>

        <h2
          id="threat-model-heading"
          class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl"
        >
          Security controls address real attack scenarios.
        </h2>
      </div>

      <p class="font-sans text-base leading-relaxed text-muted lg:col-span-6">
        Understanding what each security control protects against helps operators design appropriate deployment configurations and defense-in-depth policies.
      </p>
    </div>

    <div
      class="-mx-4 flex flex-col gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:overflow-hidden sm:rounded-xs sm:border"
    >
      <div class="overflow-x-auto bg-default">
        <table class="w-full min-w-180 border-collapse text-left text-xs">
          <thead>
            <tr class="border-b border-default bg-elevated/40 font-mono text-[11px] text-muted uppercase">
              <th scope="col" class="px-4 py-3 sm:px-6">
                Threat Scenario
              </th>
              <th scope="col" class="px-4 py-3">
                Potential Impact
              </th>
              <th scope="col" class="px-4 py-3">
                Relevant Protection
              </th>
              <th scope="col" class="px-4 py-3 sm:px-6">
                Mitigating Subsystem
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-default">
            <tr
              v-for="row in THREAT_MODEL"
              :key="row.threat"
              class="transition-colors hover:bg-elevated/30"
            >
              <td class="px-4 py-3.5 font-mono font-bold text-warning sm:px-6">
                {{ row.threat }}
              </td>
              <td class="px-4 py-3.5 font-sans text-muted">
                {{ row.impact }}
              </td>
              <td class="px-4 py-3.5 font-sans font-medium text-highlighted">
                {{ row.protection }}
              </td>
              <td class="px-4 py-3.5 font-mono text-primary sm:px-6">
                {{ row.mitigatedBy }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex items-start gap-3 bg-elevated/60 px-4 py-4 sm:px-6">
        <UIcon name="i-lucide-info" aria-hidden="true" class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p class="font-sans text-xs text-muted leading-relaxed sm:text-sm">
          Disclaimer: Security mechanisms depend on correct deployment configuration, key management, certificate validation, and operational procedures. Signature verification proves authenticity, not the complete absence of software bugs.
        </p>
      </div>
    </div>
  </section>
</template>
