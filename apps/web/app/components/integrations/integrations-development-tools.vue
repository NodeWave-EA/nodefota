<script setup lang="ts">
import type { IntegrationItem } from '~/types/integrations'

defineOptions({
  name: 'IntegrationsDevelopmentTools',
})

const tools: IntegrationItem[] = [
  {
    id: 'arduino-ide',
    name: 'Arduino IDE',
    eyebrow: 'EMBEDDED TOOLCHAIN',
    category: 'IDE',
    description: 'Develop and compile firmware binaries using Arduino IDE. Integrates client headers directly into C++ sketches.',
    status: 'supported',
    statusLabel: 'Supported',
    methodOrTech: 'Arduino C++ Library',
    icon: 'i-lucide-code-2',
    iconColor: 'text-primary',
  },
  {
    id: 'platformio',
    name: 'PlatformIO',
    eyebrow: 'EMBEDDED BUILD SYSTEM',
    category: 'IDE',
    description: 'Use PlatformIO for embedded project management, dependency resolution, board compilation, and CI/CD building.',
    status: 'supported',
    statusLabel: 'Supported',
    methodOrTech: 'platformio.ini Configuration',
    icon: 'i-lucide-terminal',
    iconColor: 'text-primary',
  },
  {
    id: 'filesystem',
    name: 'LittleFS & SPIFFS',
    eyebrow: 'FLASH STORAGE',
    category: 'Filesystem',
    description: 'Filesystem OTA updates allow supported ESP32 and ESP8266 devices to update LittleFS or SPIFFS image partitions.',
    status: 'implemented',
    statusLabel: 'Implemented',
    methodOrTech: 'FsotaClient Library',
    icon: 'i-lucide-folder-tree',
    iconColor: 'text-info',
  },
  {
    id: 'rest-api',
    name: 'REST API v1',
    eyebrow: 'CONTROL PLANE',
    category: 'API',
    description: 'Full REST API interface at /api/v1 for device registration, release management, OTA campaigns, and telemetry reporting.',
    status: 'implemented',
    statusLabel: 'Implemented',
    methodOrTech: 'HTTPS / OpenAPI v3',
    icon: 'i-lucide-webhook',
    iconColor: 'text-success',
  },
  {
    id: 'openapi',
    name: 'OpenAPI & Swagger UI',
    eyebrow: 'SPECIFICATION',
    category: 'API',
    description: 'Interactive API exploration and contract definitions generated automatically via Swagger UI.',
    status: 'implemented',
    statusLabel: 'Implemented',
    methodOrTech: '/api/docs Endpoint',
    icon: 'i-lucide-file-json',
    iconColor: 'text-warning',
  },
  {
    id: 'pki-ca',
    name: 'Internal Device CA',
    eyebrow: 'SECURITY PKI',
    category: 'PKI',
    description: 'X.509 Certificate Authority engine supporting PKCS#10 CSR signing and certificate lifecycle management.',
    status: 'implemented',
    statusLabel: 'Implemented',
    methodOrTech: 'OpenSSL / Internal CA',
    icon: 'i-lucide-shield-check',
    iconColor: 'text-warning',
  },
]
</script>

<template>
  <section aria-labelledby="integrations-tools-heading" class="flex flex-col gap-6">
    <div class="flex flex-col items-start gap-2">
      <UBadge color="primary" variant="subtle" size="sm" class="rounded-xs font-mono text-xs font-semibold uppercase">
        02 // FIRMWARE & API TOOLCHAIN
      </UBadge>
      <h2 id="integrations-tools-heading" class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
        Work with Your Existing Developer Stack
      </h2>
    </div>

    <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
      <div class="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in tools"
          :key="item.id"
          class="flex flex-col justify-between gap-3 bg-default p-4.5 transition-colors hover:bg-elevated/40"
        >
          <div class="flex flex-col gap-2.5">
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
              <h3 class="font-sans text-sm font-bold text-highlighted sm:text-base">
                {{ item.name }}
              </h3>
              <p class="font-sans text-xs leading-relaxed text-muted">
                {{ item.description }}
              </p>
            </div>
          </div>

          <div class="mt-2 truncate font-mono text-[11px] font-semibold text-primary">
            {{ item.methodOrTech }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
