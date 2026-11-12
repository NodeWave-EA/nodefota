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
  <section class="flex flex-col gap-4 py-6">
    <div class="flex flex-col gap-1">
      <span class="font-mono text-xs font-bold text-primary uppercase">04 // SELF-SERVICE RESOURCES</span>
      <h2 class="font-sans text-2xl font-bold text-highlighted">
        Find Answers Before Opening a Request
      </h2>
    </div>

    <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
      <div class="grid grid-cols-1 gap-px bg-border/20 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="res in docsResources"
          :key="res.title"
          class="flex flex-col justify-between gap-3 bg-default p-4.5 transition-colors hover:bg-elevated/40"
        >
          <div class="flex flex-col gap-1">
            <h3 class="font-sans text-sm font-bold text-highlighted">
              {{ res.title }}
            </h3>
            <p class="font-sans text-xs text-muted leading-relaxed">
              {{ res.desc }}
            </p>
          </div>
          <UButton
            to="/docs"
            color="neutral"
            variant="ghost"
            size="xs"
            icon="i-lucide-arrow-right"
            trailing
            class="rounded-xs font-mono text-[11px] font-bold w-fit p-0 hover:bg-transparent text-primary"
          >
            Read Guide
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>
