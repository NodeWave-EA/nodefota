<script setup lang="ts">
defineOptions({
  name: 'HomeDeviceEcosystem',
})

interface TargetPlatformSpec {
  id: string
  chipset: string
  libraryName: string
  versionBadge?: string
  environment: string
  description: string
  icon: string
  features: string[]
}

const sectionContent = {
  eyebrow: 'BUILT FOR EMBEDDED SYSTEMS',
  heading: 'Designed for the ESP32 and ESP8266 Ecosystem.',
  description:
    'Integrate secure firmware updates into Arduino-compatible embedded applications using dedicated C++ client libraries.',
  compatibilityHeading: 'Hardware & Cryptographic Toolchain Constraints',
  compatibilityNote:
    'ESP8266 hardware has more restrictive memory and cryptographic library constraints than ESP32. Algorithm availability and supported security configurations vary by client implementation and must be verified against your target firmware toolchain.',
  cta: {
    label: 'Explore Device Integration',
    to: '/docs/integration',
    icon: 'i-lucide-arrow-right',
  },
}

const platforms: TargetPlatformSpec[] = [
  {
    id: 'esp32',
    chipset: 'ESP32',
    libraryName: 'FOTA-Client-ESP32',
    versionBadge: 'v1.2.0',
    environment: 'Arduino / PlatformIO / ESP-IDF mbedTLS',
    description:
      'A dedicated firmware update client supporting the ESP32 ecosystem with native OTA partition management, device PKI, and filesystem OTA.',
    icon: 'i-lucide-cpu',
    features: [
      'FOTA-Client-ESP32',
      'Device authentication',
      'Device PKI integration',
      'Secure firmware downloads',
      'SHA-256 verification',
      'Digital signature verification',
      'OTA partition installation',
      'Filesystem OTA through FsotaClient',
      'Lifecycle callbacks',
      'Retry handling',
      'Post-boot health watchdog',
    ],
  },
  {
    id: 'esp8266',
    chipset: 'ESP8266',
    libraryName: 'FOTA-Client-ESP8266',
    environment: 'Arduino / PlatformIO',
    description:
      'Secure OTA support tailored for legacy and resource-constrained ESP8266 devices within available flash and RAM budgets.',
    icon: 'i-lucide-microchip',
    features: [
      'FOTA-Client-ESP8266',
      'Firmware update checks',
      'Firmware downloads',
      'Integrity verification',
      'Signature verification where supported by the configured cryptographic implementation',
      'OTA installation',
      'Device authentication support according to library capabilities',
    ],
  },
]
</script>

<template>
  <section id="devices" aria-labelledby="ecosystem-heading" class="flex w-full flex-col gap-8">
    <div class="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
      <div class="flex flex-col items-start gap-3">
        <UBadge
          color="primary"
          variant="subtle"
          size="sm"
          class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
        >
          {{ sectionContent.eyebrow }}
        </UBadge>

        <h2
          id="ecosystem-heading"
          class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl"
        >
          {{ sectionContent.heading }}
        </h2>

        <p class="font-sans text-base leading-relaxed text-muted">
          {{ sectionContent.description }}
        </p>
      </div>

      <UButton
        :to="sectionContent.cta.to"
        color="neutral"
        variant="outline"
        size="lg"
        :trailing-icon="sectionContent.cta.icon"
        class="shrink-0 rounded-xs font-semibold"
      >
        {{ sectionContent.cta.label }}
      </UButton>
    </div>

    <div
      class="-mx-4 grid grid-cols-1 gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:overflow-hidden sm:rounded-xs sm:border lg:grid-cols-2"
    >
      <article
        v-for="platform in platforms"
        :id="platform.id"
        :key="platform.id"
        class="flex flex-col justify-between gap-6 bg-default px-4 py-6 sm:p-6"
      >
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2.5">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xs border border-default bg-elevated text-primary"
              >
                <UIcon :name="platform.icon" aria-hidden="true" class="h-4 w-4" />
              </div>

              <div class="flex flex-col">
                <h3 class="font-mono text-xl font-bold text-highlighted">
                  {{ platform.chipset }}
                </h3>
                <span class="font-mono text-xs text-muted">
                  {{ platform.libraryName }}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <UBadge
                v-if="platform.versionBadge"
                color="primary"
                variant="subtle"
                size="xs"
                class="rounded-xs font-mono text-xs"
              >
                Documented: {{ platform.versionBadge }}
              </UBadge>

              <UBadge
                color="neutral"
                variant="outline"
                size="xs"
                class="rounded-xs font-mono text-[11px]"
              >
                MIT C++ SDK
              </UBadge>
            </div>
          </div>

          <p class="font-sans text-sm leading-relaxed text-muted">
            {{ platform.description }}
          </p>

          <div class="flex flex-col gap-2.5 border-t border-default pt-4">
            <span class="font-mono text-[11px] font-semibold tracking-wider text-muted uppercase">
              Client Capabilities ({{ platform.environment }})
            </span>

            <ul class="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <li
                v-for="feature in platform.features"
                :key="feature"
                class="flex items-start gap-2 text-xs text-default sm:text-[13px]"
              >
                <UIcon
                  name="i-lucide-check"
                  aria-hidden="true"
                  class="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                />
                <span class="font-sans leading-snug">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </article>

      <div
        class="flex flex-col items-start gap-3 bg-elevated/60 px-4 py-5 sm:p-6 lg:col-span-2 lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="flex items-start gap-3">
          <div
            class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xs bg-warning/10 text-warning"
          >
            <UIcon name="i-lucide-alert-triangle" aria-hidden="true" class="h-4 w-4" />
          </div>

          <div class="flex flex-col gap-1">
            <span class="font-mono text-xs font-semibold tracking-wider text-warning uppercase">
              {{ sectionContent.compatibilityHeading }}
            </span>
            <p class="font-sans text-xs leading-relaxed text-highlighted sm:text-sm">
              {{ sectionContent.compatibilityNote }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
