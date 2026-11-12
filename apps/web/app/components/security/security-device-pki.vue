<script setup lang="ts">
defineOptions({
  name: 'SecurityDevicePKIFlow',
})

const pkiSteps = [
  {
    step: '01',
    actor: 'IoT Device',
    action: 'Generate Keypair',
    detail: 'Device generates ECDSA P-256 keypair locally. Private key NEVER leaves flash.',
    icon: 'i-lucide-cpu',
  },
  {
    step: '02',
    actor: 'IoT Device -> API',
    action: 'Submit CSR',
    detail: 'Submits PKCS#10 Certificate Signing Request signed by device private key.',
    icon: 'i-lucide-send',
  },
  {
    step: '03',
    actor: 'Device CA',
    action: 'Issue X.509 Cert',
    detail: 'Device CA verifies bootstrap token & issues signed X.509 client certificate.',
    icon: 'i-lucide-award',
  },
  {
    step: '04',
    actor: 'API -> IoT Device',
    action: 'Return Cert',
    detail: 'Provisioned client certificate returned to device for secure storage.',
    icon: 'i-lucide-download',
  },
  {
    step: '05',
    actor: 'mTLS Transport',
    action: 'Mutual Auth',
    detail: 'Subsequent requests authenticate mutually over mTLS HTTPS connection.',
    icon: 'i-lucide-lock',
  },
]
</script>

<template>
  <div
    class="-mx-4 flex flex-col gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:overflow-hidden sm:rounded-xs sm:border"
  >
    <div class="flex flex-wrap items-center justify-between gap-2 bg-elevated/60 px-4 py-3 sm:px-5">
      <div class="flex items-center gap-2">
        <span aria-hidden="true" class="h-2 w-2 rounded-xs bg-teal-400 motion-safe:animate-pulse" />
        <span class="font-mono text-xs font-semibold tracking-wider text-highlighted uppercase">
          VISUAL B // DEVICE PKI PROVISIONING & MTLS FLOW
        </span>
      </div>

      <UBadge color="primary" variant="subtle" size="xs" class="rounded-xs font-mono text-[10px]">
        X.509 / PKCS#10
      </UBadge>
    </div>

    <div class="grid grid-cols-1 gap-px bg-border sm:grid-cols-5">
      <div
        v-for="item in pkiSteps"
        :key="item.step"
        class="flex flex-col justify-between gap-3 bg-default px-4 py-4 sm:p-4"
      >
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between gap-1">
            <span class="font-mono text-xs font-bold text-teal-400">
              STEP {{ item.step }}
            </span>
            <UIcon :name="item.icon" aria-hidden="true" class="h-4 w-4 text-primary" />
          </div>

          <span class="font-mono text-[10px] font-semibold text-muted uppercase">
            {{ item.actor }}
          </span>

          <h4 class="font-sans text-sm font-bold text-highlighted">
            {{ item.action }}
          </h4>
        </div>

        <p class="border-t border-default pt-2 font-sans text-xs text-muted">
          {{ item.detail }}
        </p>
      </div>
    </div>

    <div class="flex items-center gap-2.5 bg-elevated/40 px-4 py-3 text-xs text-muted sm:px-5">
      <UIcon name="i-lucide-key-round" aria-hidden="true" class="h-4 w-4 shrink-0 text-primary" />
      <span class="font-mono text-xs">
        KEY CUSTODY: Device private keys are generated in local secure storage and never transmitted to the cloud platform.
      </span>
    </div>
  </div>
</template>
