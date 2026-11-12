<script setup lang="ts">
import type { IntegrationItem } from '~/types/integrations'

defineOptions({
  name: 'IntegrationsFuture',
})

const futureScope: IntegrationItem[] = [
  {
    id: 'mqtt-coap',
    name: 'MQTT & CoAP Protocols',
    eyebrow: 'FUTURE // PUB-SUB PROTOCOL',
    category: 'Protocol',
    description: 'Broker-based update notifications and lightweight binary transport for low-bandwidth constrained IoT nodes.',
    status: 'planned',
    statusLabel: 'Planned Roadmap',
    methodOrTech: 'MQTT v5 Broker Integration',
    icon: 'i-lucide-radio-receiver',
    iconColor: 'text-amber-400',
  },
  {
    id: 'lorawan',
    name: 'LoRaWAN LPWAN Networks',
    eyebrow: 'FUTURE // LONG-RANGE OTA',
    category: 'Network',
    description: 'Fragmented delta firmware distribution over low-power long-range LoRaWAN radio links.',
    status: 'planned',
    statusLabel: 'Planned Roadmap',
    methodOrTech: 'FUOTA Delta Protocol',
    icon: 'i-lucide-wifi-off',
    iconColor: 'text-amber-400',
  },
  {
    id: 'cellular',
    name: 'Cellular IoT (NB-IoT / LTE-M)',
    eyebrow: 'FUTURE // CELLULAR CONNECTIVITY',
    category: 'Cellular',
    description: 'Direct cellular-connected hardware deployments with bandwidth-optimized binary chunking.',
    status: 'planned',
    statusLabel: 'Planned Roadmap',
    methodOrTech: 'SIMCOM & Quectel Modems',
    icon: 'i-lucide-signal',
    iconColor: 'text-amber-400',
  },
  {
    id: 'linux-gateways',
    name: 'Linux Embedded Gateways',
    eyebrow: 'FUTURE // EDGE COMPUTING',
    category: 'OS',
    description: 'Yocto / Debian Linux gateway firmware update management through dual-copy system image utilities.',
    status: 'planned',
    statusLabel: 'Planned Roadmap',
    methodOrTech: 'RAUC / Mender Client',
    icon: 'i-lucide-terminal-square',
    iconColor: 'text-amber-400',
  },
]
</script>

<template>
  <section class="flex flex-col gap-4 py-6">
    <div class="flex flex-col gap-1">
      <span class="font-mono text-xs font-bold text-warning uppercase">04 // ARCHITECTURE EXTENSIONS</span>
      <h2 class="font-sans text-2xl font-bold text-highlighted">
        Future Possibilities & Roadmap
      </h2>
      <p class="font-sans text-xs text-muted">
        The documented core implementation targets ESP32/ESP8266 REST/HTTPS delivery. The protocols below represent future extension directions.
      </p>
    </div>

    <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
      <div class="grid grid-cols-1 gap-px bg-border/20 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in futureScope"
          :key="item.id"
          class="flex flex-col justify-between gap-3 bg-default p-4.5 transition-colors hover:bg-elevated/40 opacity-90"
        >
          <div class="flex flex-col gap-2.5">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <div class="flex h-7 w-7 items-center justify-center rounded-xs border border-default bg-elevated/60">
                  <UIcon :name="item.icon" class="h-3.5 w-3.5" :class="item.iconColor" aria-hidden="true" />
                </div>
                <span class="font-mono text-[10px] font-bold tracking-wider text-muted uppercase">
                  {{ item.eyebrow }}
                </span>
              </div>

              <UBadge color="warning" variant="subtle" size="xs" class="rounded-xs font-mono text-[10px]">
                {{ item.statusLabel }}
              </UBadge>
            </div>

            <div class="flex flex-col gap-1">
              <h3 class="font-sans text-sm font-bold text-highlighted sm:text-base">
                {{ item.name }}
              </h3>
              <p class="font-sans text-xs leading-relaxed text-muted">
                {{ item.description }}
              </p>
            </div>
          </div>

          <div class="mt-2 font-mono text-[11px] font-semibold text-muted truncate">
            {{ item.methodOrTech }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
