<script setup lang="ts">
defineOptions({
  name: 'SecurityFirmwareVerificationFlow',
})

const verificationSteps = [
  {
    step: '01',
    eyebrow: 'STEP 01 // STAGE 1',
    badge: 'Stage 1',
    badgeColor: 'neutral' as const,
    title: '1. Update check',
    method: 'GET /api/v1/ota/check',
    description: 'Device authenticates and requests an available release.',
    icon: 'i-lucide-search',
    iconColor: 'text-amber-400',
  },
  {
    step: '02',
    eyebrow: 'STEP 02 // STAGE 2',
    badge: 'Stage 2',
    badgeColor: 'neutral' as const,
    title: '2. Firmware download',
    method: 'HTTPS / Signed Storage URL',
    description: 'Retrieve the firmware image and its manifest over HTTPS.',
    icon: 'i-lucide-download-cloud',
    iconColor: 'text-amber-400',
  },
  {
    step: '03',
    eyebrow: 'STEP 03 // INTEGRITY',
    badge: 'Integrity check',
    badgeColor: 'warning' as const,
    title: '3. SHA-256 verification',
    method: 'mbedtls_sha256()',
    description: 'Compare the calculated checksum against the trusted manifest value.',
    icon: 'i-lucide-binary',
    iconColor: 'text-amber-400',
    highlight: 'teal',
  },
  {
    step: '04',
    eyebrow: 'STEP 04 // AUTHENTICITY',
    badge: 'Authenticity check',
    badgeColor: 'success' as const,
    title: '4. Signature verification',
    method: 'ECDSA_verify() / ed25519_verify()',
    description: 'Verify the signed manifest using the trusted public key.',
    icon: 'i-lucide-shield-check',
    iconColor: 'text-emerald-400',
    highlight: 'emerald',
  },
  {
    step: '05',
    eyebrow: 'STEP 05 // BOOTLOADER',
    badge: 'Validation',
    badgeColor: 'neutral' as const,
    title: '5. Flash and boot validation',
    method: 'esp_ota_write() & Watchdog',
    description: 'Install the verified image and execute supported health checks.',
    icon: 'i-lucide-cpu',
    iconColor: 'text-amber-400',
  },
  {
    step: '06',
    eyebrow: 'DECISION // GATE',
    badge: 'Outcome',
    badgeColor: 'info' as const,
    title: 'Valid → Continue / Invalid → Reject',
    method: 'esp_ota_mark_app_valid_cancel_rollback()',
    description: 'Valid images proceed to boot. Invalid images trigger instant bootloader rollback.',
    icon: 'i-lucide-git-fork',
    iconColor: 'text-primary',
  },
]
</script>

<template>
  <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
    <div class="grid grid-cols-1 gap-px bg-border/20 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="item in verificationSteps"
        :key="item.step"
        class="flex flex-col justify-between gap-3 bg-default p-4.5 transition-colors sm:p-5 hover:bg-elevated/40"
        :class="[
          item.highlight === 'teal'
            ? 'bg-teal-950/10 dark:bg-teal-950/20'
            : item.highlight === 'emerald'
              ? 'bg-emerald-950/10 dark:bg-emerald-950/20'
              : '',
        ]"
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

            <UBadge
              :color="item.badgeColor"
              variant="outline"
              size="xs"
              class="rounded-xs font-mono text-[10px]"
            >
              {{ item.badge }}
            </UBadge>
          </div>

          <div class="flex flex-col gap-1">
            <h4 class="font-sans text-sm font-bold text-highlighted sm:text-base">
              {{ item.title }}
            </h4>
            <p class="font-sans text-xs leading-relaxed text-muted">
              {{ item.description }}
            </p>
          </div>
        </div>

        <div class="mt-2 font-mono text-[11px] font-semibold text-primary truncate">
          {{ item.method }}
        </div>
      </div>
    </div>

    <div class="flex items-start gap-2.5 border-t border-default bg-elevated/40 p-3.5 text-xs sm:items-center sm:p-4">
      <UIcon name="i-lucide-info" class="mt-0.5 h-4 w-4 shrink-0 text-amber-400 sm:mt-0" aria-hidden="true" />
      <span class="font-sans text-xs text-muted">
        <strong class="font-mono font-bold text-highlighted uppercase">Security rule:</strong> An image that fails integrity or signature verification must not be installed.
      </span>
    </div>
  </div>
</template>
