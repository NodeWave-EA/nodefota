<script setup lang="ts">
defineOptions({
  name: 'SecurityLimitations',
})

const limitations = [
  {
    topic: 'ESP32 Cryptographic Compatibility',
    detail: 'Ed25519 verification requires ESP-IDF 5.0 or later. Older Arduino-ESP32 environments using ESP-IDF 4.x may require ECDSA P-256 as the documented alternative.',
    icon: 'i-lucide-cpu',
  },
  {
    topic: 'ESP8266 Constraints',
    detail: 'ESP8266 devices operate under strict RAM and flash limits. Cryptographic library support and OTA partition layouts differ from ESP32 and must be verified per build.',
    icon: 'i-lucide-microchip',
  },
  {
    topic: 'TLS Certificate Validation',
    detail: 'Devices must validate server certificates against a trusted CA root. Disabling TLS certificate verification in embedded clients severely compromises transport security.',
    icon: 'i-lucide-shield-alert',
  },
  {
    topic: 'Infrastructure Hardening',
    detail: 'Production suitability requires proper database backups, bucket policies, rate limiting, HSM key custody, certificate lifecycle management, and administrative audit reviews.',
    icon: 'i-lucide-server-cog',
  },
]
</script>

<template>
  <section id="limitations" aria-labelledby="limitations-heading" class="flex w-full flex-col gap-8 scroll-mt-24">
    <div class="flex flex-col items-start gap-3">
      <UBadge
        color="warning"
        variant="subtle"
        size="sm"
        class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
      >
        TRANSPARENCY & CONSTRAINTS
      </UBadge>

      <h2
        id="limitations-heading"
        class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl"
      >
        Security Considerations & Hardware Limits
      </h2>
    </div>

    <div
      class="-mx-4 grid grid-cols-1 gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:overflow-hidden sm:rounded-xs sm:border md:grid-cols-2"
    >
      <div
        v-for="item in limitations"
        :key="item.topic"
        class="flex flex-col gap-2.5 bg-default px-4 py-5 sm:p-6"
      >
        <div class="flex items-center gap-2">
          <UIcon :name="item.icon" aria-hidden="true" class="h-4 w-4 text-warning" />
          <h3 class="font-mono text-sm font-bold text-highlighted">
            {{ item.topic }}
          </h3>
        </div>

        <p class="font-sans text-xs leading-relaxed text-muted sm:text-sm">
          {{ item.detail }}
        </p>
      </div>
    </div>
  </section>
</template>
