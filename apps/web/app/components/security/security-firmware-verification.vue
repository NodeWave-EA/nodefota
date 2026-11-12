<script setup lang="ts">
import { VERIFICATION_PIPELINE } from '~/content/security'

defineOptions({
  name: 'SecurityFirmwareVerification',
})
</script>

<template>
  <div
    class="-mx-4 flex flex-col gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:overflow-hidden sm:rounded-xs sm:border"
  >
    <div class="flex flex-wrap items-center justify-between gap-2 bg-elevated/60 px-4 py-3 sm:px-5">
      <div class="flex items-center gap-2">
        <span aria-hidden="true" class="h-2 w-2 rounded-xs bg-teal-400 motion-safe:animate-pulse" />
        <span class="font-mono text-xs font-semibold tracking-wider text-highlighted uppercase">
          VISUAL A // DEVICE-SIDE VERIFICATION SEQUENCE
        </span>
      </div>

      <UBadge color="primary" variant="subtle" size="xs" class="rounded-xs font-mono text-[10px]">
        FOTA C++ Engine
      </UBadge>
    </div>

    <div class="grid grid-cols-1 gap-px bg-border sm:grid-cols-5">
      <div
        v-for="(item, idx) in VERIFICATION_PIPELINE"
        :key="item.step"
        class="flex flex-col justify-between gap-3 bg-default px-4 py-4 sm:p-4"
      >
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between gap-1">
            <span class="font-mono text-xs font-bold text-teal-400">
              STEP {{ item.step }}
            </span>

            <UBadge
              :color="idx < 2 ? 'success' : idx === 2 ? 'warning' : 'neutral'"
              variant="subtle"
              size="xs"
              class="rounded-xs font-mono text-[9px]"
            >
              {{ idx < 2 ? 'VERIFIED' : idx === 2 ? 'CHECKING' : 'PENDING' }}
            </UBadge>
          </div>

          <h4 class="font-sans text-sm font-bold text-highlighted">
            {{ item.title }}
          </h4>

          <p class="font-sans text-xs text-muted">
            {{ item.action }}
          </p>
        </div>

        <div class="flex flex-col gap-1 border-t border-default pt-2.5">
          <span class="font-mono text-[10px] text-teal-400">
            {{ item.mechanism }}
          </span>
          <span class="font-sans text-[11px] text-muted">
            {{ item.detail }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2.5 bg-red-950/20 px-4 py-3 text-xs text-red-400 dark:bg-red-950/30 sm:px-5">
      <UIcon name="i-lucide-shield-alert" aria-hidden="true" class="h-4 w-4 shrink-0 text-red-400" />
      <span class="font-mono text-xs font-semibold">
        SECURITY RULE: Any firmware payload failing checksum or signature verification MUST BE REJECTED before committing to flash.
      </span>
    </div>
  </div>
</template>
