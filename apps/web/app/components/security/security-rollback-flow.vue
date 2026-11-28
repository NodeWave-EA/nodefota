<script setup lang="ts">
defineOptions({
  name: 'SecurityRollbackFlow',
})

const rollbackSteps = [
  {
    id: 'ota_0',
    eyebrow: 'PARTITION OTA_0 // KNOWN-GOOD',
    badge: 'Active / Validated',
    badgeColor: 'success' as const,
    title: 'Firmware v1.4.1 (Stable Fallback)',
    method: 'State: ESP_OTA_IMG_VALID',
    description: 'Retained in flash as the safe fallback image. The bootloader reverts here if staged update crashes post-boot.',
    icon: 'i-lucide-hard-drive',
    iconColor: 'text-success',
    highlight: 'success' as const,
  },
  {
    id: 'watchdog',
    eyebrow: 'HARDWARE WATCHDOG // MONITOR',
    badge: 'Post-Boot Check',
    badgeColor: 'warning' as const,
    title: 'Post-Boot Health Validation',
    method: 'Subsystem: Task Watchdog Timer (TWDT)',
    description: 'Executes app validation tests upon startup. If a system panic or timeout occurs before validation, reset is triggered.',
    icon: 'i-lucide-refresh-cw',
    iconColor: 'text-warning',
  },
  {
    id: 'ota_1',
    eyebrow: 'PARTITION OTA_1 // STAGED UPDATE',
    badge: 'Pending Verify',
    badgeColor: 'warning' as const,
    title: 'Firmware v1.4.2 (New Image)',
    method: 'State: ESP_OTA_IMG_PENDING_VERIFY',
    description: 'Downloaded image is staged in inactive partition. Replaces ota_0 permanently only after health validation passes.',
    icon: 'i-lucide-binary',
    iconColor: 'text-warning',
    highlight: 'warning' as const,
  },
]
</script>

<template>
  <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
    <div class="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="item in rollbackSteps"
        :key="item.id"
        class="flex flex-col justify-between gap-3 bg-default p-4.5 transition-colors hover:bg-elevated/40 sm:p-5"
        :class="[
          item.highlight === 'success'
            ? 'bg-success/5'
            : item.highlight === 'warning'
              ? 'bg-warning/5'
              : '',
        ]"
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

        <div class="mt-2 truncate font-mono text-[11px] font-semibold text-primary">
          {{ item.method }}
        </div>
      </div>
    </div>

    <div class="flex items-start gap-2.5 border-t border-default bg-elevated/60 p-3.5 text-xs sm:items-center sm:p-4">
      <UIcon name="i-lucide-rotate-ccw" class="mt-0.5 size-4 shrink-0 text-warning sm:mt-0" aria-hidden="true" />
      <span class="font-sans text-xs text-muted">
        <strong class="font-mono font-bold text-highlighted uppercase">Validation command:</strong> Executes <code class="font-mono text-success">esp_ota_mark_app_valid_cancel_rollback()</code> to lock in verified application image.
      </span>
    </div>
  </div>
</template>
