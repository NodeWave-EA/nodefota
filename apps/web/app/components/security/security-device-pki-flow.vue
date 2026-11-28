<script setup lang="ts">
defineOptions({
  name: 'SecurityDevicePKIFlow',
})

const pkiSteps = [
  {
    step: '01',
    eyebrow: 'STEP 01 // LOCAL OPERATION',
    badge: 'IoT Device',
    badgeColor: 'warning' as const,
    title: 'Generate ECDSA P-256 Keypair',
    method: 'mbedtls_pk_setup()',
    description: 'Device generates an ECDSA P-256 key pair locally. The private key remains in secure flash and is never transmitted.',
    icon: 'i-lucide-key-round',
    iconColor: 'text-warning',
  },
  {
    step: '02',
    eyebrow: 'STEP 02 // REQUEST →',
    badge: 'IoT Device → API',
    badgeColor: 'primary' as const,
    title: 'Submit PKCS#10 CSR',
    method: 'POST /api/v1/pki/device-certificates/csr',
    description: 'Device creates a PKCS#10 Certificate Signing Request (CSR) signed with its local private key and sends it to the API.',
    icon: 'i-lucide-send',
    iconColor: 'text-primary',
  },
  {
    step: '03',
    eyebrow: 'STEP 03 // REQUEST →',
    badge: 'FOTA API → Device CA',
    badgeColor: 'primary' as const,
    title: 'Request Certificate Signing',
    method: 'Internal CA Engine / Vault',
    description: 'Platform validates device authorization, checks enrollment credentials, and submits the CSR to the Device Certificate Authority.',
    icon: 'i-lucide-shield-check',
    iconColor: 'text-primary',
  },
  {
    step: '04',
    eyebrow: 'STEP 04 // ← RESPONSE',
    badge: 'Device CA → API',
    badgeColor: 'neutral' as const,
    title: 'Signed X.509 Certificate',
    method: 'X.509 PEM Certificate Payload',
    description: 'Device CA issues a signed X.509 client certificate bound directly to the device identifier.',
    icon: 'i-lucide-file-check-2',
    iconColor: 'text-primary',
  },
  {
    step: '05',
    eyebrow: 'STEP 05 // ← RESPONSE',
    badge: 'API → IoT Device',
    badgeColor: 'neutral' as const,
    title: 'Return Provisioned Certificate',
    method: '201 Created (X.509 Payload)',
    description: 'Returns the provisioned device certificate to the device for persistent storage in LittleFS/SPIFFS/NVS.',
    icon: 'i-lucide-download',
    iconColor: 'text-primary',
  },
  {
    step: '06',
    eyebrow: 'STEP 06 // MUTUAL TLS',
    badge: 'mTLS Handshake',
    badgeColor: 'success' as const,
    title: 'Connect Using Mutual TLS',
    method: 'HTTPS / Port 443 mTLS',
    description: 'Device connects using mutual TLS and validates device certificate for subsequent authenticated requests.',
    icon: 'i-lucide-lock',
    iconColor: 'text-success',
    highlight: 'success' as const,
  },
]
</script>

<template>
  <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
    <div class="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="item in pkiSteps"
        :key="item.step"
        class="flex flex-col justify-between gap-3 bg-default p-4.5 transition-colors hover:bg-elevated/40 sm:p-5"
        :class="item.highlight === 'success' ? 'bg-success/5' : ''"
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
      <UIcon name="i-lucide-key-round" class="mt-0.5 size-4 shrink-0 text-warning sm:mt-0" aria-hidden="true" />
      <span class="font-sans text-xs text-muted">
        <strong class="font-mono font-bold text-warning uppercase">Key custody guarantee:</strong> Device private keys are generated in local secure flash and NEVER transmitted over the wire.
      </span>
    </div>
  </div>
</template>
