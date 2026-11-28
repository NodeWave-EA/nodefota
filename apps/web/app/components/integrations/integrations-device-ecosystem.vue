<script setup lang="ts">
import type { IntegrationItem } from '~/types/integrations'

defineOptions({
  name: 'IntegrationsDeviceEcosystem',
})

const devices: IntegrationItem[] = [
  {
    id: 'esp32',
    name: 'ESP32 Microcontroller',
    eyebrow: 'PRIMARY PLATFORM // DUAL-CORE',
    category: 'Hardware',
    description: 'Primary embedded platform supporting secure OTA update workflows, PKI client certificates, SHA-256 digests, and dual-partition A/B rollback.',
    status: 'implemented',
    statusLabel: 'Implemented',
    methodOrTech: 'ESP32 Arduino Client Library',
    icon: 'i-lucide-cpu',
    iconColor: 'text-primary',
    highlight: 'amber',
    details: [
      'Device PKI & X.509 mTLS',
      'SHA-256 & ECDSA/Ed25519',
      'A/B Flash Partition Rollback',
      'FsotaClient Filesystem OTA',
    ],
  },
  {
    id: 'esp32-s3',
    name: 'ESP32-S3 Ecosystem',
    eyebrow: 'EXTENDED TARGET // VECTOR ACCEL',
    category: 'Hardware',
    description: 'Supports the ESP32-S3 development board ecosystem through the shared ESP32 C++ firmware client library.',
    status: 'supported',
    statusLabel: 'Supported',
    methodOrTech: 'Arduino ESP32-S3 Toolchain',
    icon: 'i-lucide-microchip',
    iconColor: 'text-info',
    details: ['Wi-Fi Connectivity', 'Secure Delivery Pipelines', 'Application & LittleFS OTA'],
  },
  {
    id: 'esp8266',
    name: 'ESP8266 Legacy Node',
    eyebrow: 'CONSTRAINED TARGET // SINGLE-CORE',
    category: 'Hardware',
    description: 'Connects legacy ESP8266 devices using a dedicated ESP8266 C++ client library. Note RAM and flash constraints.',
    status: 'implemented',
    statusLabel: 'Implemented',
    methodOrTech: 'ESP8266HTTPUpdate Library',
    icon: 'i-lucide-circuit-board',
    iconColor: 'text-warning',
    details: ['HTTPS Firmware Fetch', 'SHA-256 Integrity Verification', 'Single Partition Flash Update'],
  },
]
</script>

<template>
  <section id="devices" aria-labelledby="integrations-devices-heading" class="flex flex-col gap-6 scroll-mt-24">
    <div class="flex flex-col items-start gap-2">
      <UBadge color="primary" variant="subtle" size="sm" class="rounded-xs font-mono text-xs font-semibold uppercase">
        01 // HARDWARE ECOSYSTEM
      </UBadge>
      <h2 id="integrations-devices-heading" class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
        Built for the Espressif Ecosystem
      </h2>
    </div>

    <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
      <div class="grid grid-cols-1 gap-px bg-border lg:grid-cols-3">
        <div
          v-for="item in devices"
          :key="item.id"
          class="flex flex-col justify-between gap-4 bg-default p-5 transition-colors hover:bg-elevated/40"
          :class="item.highlight === 'amber' ? 'bg-amber/5' : ''"
        >
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <div class="flex size-7 items-center justify-center rounded-xs border border-default bg-elevated/60">
                  <UIcon :name="item.icon" class="size-3.5" :class="item.iconColor" aria-hidden="true" />
                </div>
                <span class="font-mono text-[10px] font-bold tracking-wider text-muted uppercase">
                  {{ item.eyebrow }}
                </span>
              </div>

              <UBadge
                :color="item.status === 'implemented' ? 'success' : 'info'"
                variant="outline"
                size="xs"
                class="rounded-xs font-mono text-[10px]"
              >
                {{ item.statusLabel }}
              </UBadge>
            </div>

            <div class="flex flex-col gap-1">
              <h3 class="font-sans text-base font-bold text-highlighted">
                {{ item.name }}
              </h3>
              <p class="font-sans text-xs leading-relaxed text-muted">
                {{ item.description }}
              </p>
            </div>

            <ul class="flex flex-col gap-1 border-t border-default pt-2 font-sans text-xs text-muted">
              <li v-for="feature in item.details" :key="feature" class="flex items-center gap-1.5">
                <UIcon name="i-lucide-check" class="size-3.5 shrink-0 text-success" aria-hidden="true" />
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>

          <div class="truncate font-mono text-[11px] font-semibold text-primary">
            {{ item.methodOrTech }}
          </div>
        </div>
      </div>

      <div class="flex items-start gap-2.5 border-t border-default bg-elevated/60 p-3.5 text-xs sm:items-center sm:p-4">
        <UIcon name="i-lucide-alert-triangle" class="mt-0.5 size-4 shrink-0 text-warning sm:mt-0" aria-hidden="true" />
        <span class="font-sans text-xs text-muted">
          <strong class="font-mono font-bold text-highlighted uppercase">Hardware note:</strong> ESP8266 has tighter RAM and flash constraints than ESP32. Feature parity is not identical across all microcontrollers.
        </span>
      </div>
    </div>
  </section>
</template>
