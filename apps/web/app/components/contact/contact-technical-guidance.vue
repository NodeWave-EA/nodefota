<script setup lang="ts">
defineOptions({
  name: 'ContactTechnicalGuidance',
})

const guidanceSteps = [
  { num: '01', title: 'Hardware', text: 'Device model, MCU platform, and exact board variant.' },
  { num: '02', title: 'Firmware', text: 'Application version and embedded client library version.' },
  { num: '03', title: 'Environment', text: 'Arduino IDE, PlatformIO, or self-hosted server setup.' },
  { num: '04', title: 'Operation', text: 'The specific update step or action being performed.' },
  { num: '05', title: 'Evidence', text: 'Relevant error logs, HTTP status codes, or sanitized API payloads.' },
  { num: '06', title: 'Reproduction', text: 'Clear steps that consistently reproduce the issue.' },
]
</script>

<template>
  <section aria-labelledby="contact-guidance-heading" class="flex flex-col gap-6">
    <div class="flex flex-col items-start gap-3">
      <UBadge color="primary" variant="subtle" size="sm" class="rounded-xs font-mono text-xs font-semibold uppercase">
        03 // INVESTIGATION CHECKLIST
      </UBadge>
      <h2 id="contact-guidance-heading" class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
        Help Us Understand Your Issue
      </h2>
      <p class="font-sans text-base text-muted">
        Including the following information in technical enquiries speeds up troubleshooting:
      </p>
    </div>

    <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
      <div class="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="step in guidanceSteps"
          :key="step.num"
          class="flex flex-col gap-2 bg-default p-5 transition-colors hover:bg-elevated/40"
        >
          <div class="flex items-center justify-between">
            <span class="font-mono text-xs font-bold text-primary">{{ step.num }}</span>
            <span class="font-mono text-[10px] text-muted uppercase">{{ step.title }}</span>
          </div>
          <p class="font-sans text-xs leading-relaxed text-muted">
            {{ step.text }}
          </p>
        </div>
      </div>

      <div class="flex items-start gap-2.5 border-t border-default bg-elevated/60 p-3.5 text-xs sm:items-center sm:p-4">
        <UIcon name="i-lucide-lock" class="mt-0.5 size-4 shrink-0 text-warning sm:mt-0" aria-hidden="true" />
        <span class="font-sans text-xs text-muted">
          <strong class="font-mono font-bold text-warning uppercase">Security reminder:</strong> Sanitize logs and remove credentials, device tokens, certificates containing private material, and API keys before sharing.
        </span>
      </div>
    </div>
  </section>
</template>
