<script setup lang="ts">
defineOptions({
  name: 'ContactDocumentation',
})

const docsResources = [
  { title: 'Getting Started', desc: 'Platform architecture & core update workflows.' },
  { title: 'Device Integration', desc: 'Configure supported ESP32 & ESP8266 embedded clients.' },
  { title: 'API Reference', desc: 'Explore REST v1 endpoints & request formats.' },
  { title: 'Firmware Vault', desc: 'Manage releases, SHA-256 digests, & manifests.' },
  { title: 'OTA Campaigns', desc: 'Deployment strategies & rollout thresholds.' },
  { title: 'Security & PKI', desc: 'Firmware verification, device identity, & mTLS.' },
]
</script>

<template>
  <section aria-labelledby="contact-docs-heading" class="flex flex-col gap-6">
    <div class="flex flex-col items-start gap-3">
      <UBadge color="primary" variant="subtle" size="sm" class="rounded-xs font-mono text-xs font-semibold uppercase">
        04 // SELF-SERVICE RESOURCES
      </UBadge>
      <h2 id="contact-docs-heading" class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
        Find Answers Before Opening a Request
      </h2>
    </div>

    <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
      <div class="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="res in docsResources"
          :key="res.title"
          class="flex flex-col justify-between gap-3 bg-default p-5 transition-colors hover:bg-elevated/40"
        >
          <div class="flex flex-col gap-1">
            <h3 class="font-sans text-sm font-bold text-highlighted">
              {{ res.title }}
            </h3>
            <p class="font-sans text-xs leading-relaxed text-muted">
              {{ res.desc }}
            </p>
          </div>
          <UButton
            to="/docs"
            color="primary"
            variant="link"
            size="xs"
            trailing-icon="i-lucide-arrow-right"
            class="w-fit p-0 font-mono text-[11px] font-bold"
          >
            Read Guide
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>
