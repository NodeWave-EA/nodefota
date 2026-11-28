<script setup lang="ts">
definePageMeta({
  name: 'DashboardPki',
  layout: 'dashboard',
})

useSeoMeta({
  title: 'Device PKI & CA | NODEFOTA',
})

const certificates = ref([
  {
    serial: '4A:91:0F:E2:18:C4',
    subject: 'CN=esp32-gateway-04',
    algorithm: 'ECDSA P-256',
    issuedAt: '2026-09-12',
    expiresAt: '2027-09-12',
    status: 'Active',
  },
  {
    serial: '7B:22:9D:10:44:A1',
    subject: 'CN=esp32-node-11',
    algorithm: 'ECDSA P-256',
    issuedAt: '2026-10-01',
    expiresAt: '2027-10-01',
    status: 'Active',
  },
  {
    serial: '1C:84:3E:77:92:B0',
    subject: 'CN=esp32-node-09',
    algorithm: 'ECDSA P-256',
    issuedAt: '2025-12-10',
    expiresAt: '2026-12-10',
    status: 'Expiring Soon',
  },
  {
    serial: '9E:05:61:D3:55:F8',
    subject: 'CN=esp8266-relay-07',
    algorithm: 'ECDSA P-256',
    issuedAt: '2026-03-18',
    expiresAt: '2027-03-18',
    status: 'Revoked',
  },
])

function revokeCert(serial: string) {
  const cert = certificates.value.find(c => c.serial === serial)
  if (cert) {
    cert.status = 'Revoked'
  }
}
</script>

<template>
  <UDashboardPanel id="device-pki">
    <template #header>
      <UDashboardNavbar title="Device PKI & CA">
        <template #leading>
          <UDashboardSidebarCollapse class="rounded-xs" />
        </template>

        <template #right>
          <AppThemeToggle />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-6">
        <!-- Root CA Summary Banner -->
        <div class="grid grid-cols-1 gap-px overflow-hidden rounded-xs border border-default bg-border md:grid-cols-3">
          <div class="bg-default p-5">
            <span class="font-mono text-[10px] font-bold text-primary uppercase">INTERNAL DEVICE CA</span>
            <div class="mt-1 font-mono text-sm font-bold text-highlighted">
              CN=NODEFOTA Root Device CA v1
            </div>
            <p class="mt-1 font-mono text-[11px] text-muted">
              ECDSA P-256 • X.509 v3 • mTLS Client Auth
            </p>
          </div>

          <div class="bg-default p-5">
            <span class="font-mono text-[10px] font-bold text-muted uppercase">CSR ENDPOINT</span>
            <div class="mt-1 truncate font-mono text-xs font-semibold text-highlighted">
              POST /api/v1/pki/device-certificates/csr
            </div>
            <p class="mt-1 font-mono text-[11px] text-muted">
              PKCS#10 PEM enrollment active
            </p>
          </div>

          <div class="bg-default p-5">
            <span class="font-mono text-[10px] font-bold text-muted uppercase">KEY CUSTODY POLICY</span>
            <div class="mt-1 font-mono text-xs font-bold text-success">
              On-Device Key Generation Enforced
            </div>
            <p class="mt-1 font-mono text-[11px] text-muted">
              Private keys never leave secure flash
            </p>
          </div>
        </div>

        <!-- Issued Device Certificates -->
        <div class="overflow-hidden rounded-xs border border-default bg-default">
          <div class="border-b border-default bg-elevated/40 px-5 py-3.5 font-mono text-xs font-bold text-highlighted uppercase">
            ISSUED X.509 CLIENT CERTIFICATES
          </div>

          <div class="divide-y divide-default">
            <div
              v-for="cert in certificates"
              :key="cert.serial"
              class="flex flex-col justify-between gap-3 px-5 py-4 sm:flex-row sm:items-center"
            >
              <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2.5">
                  <span class="font-mono text-xs font-bold text-highlighted">{{ cert.subject }}</span>
                  <UBadge
                    :color="cert.status === 'Active' ? 'success' : cert.status === 'Expiring Soon' ? 'warning' : 'error'"
                    variant="subtle"
                    size="xs"
                    class="rounded-xs font-mono text-[10px]"
                  >
                    {{ cert.status }}
                  </UBadge>
                </div>
                <span class="font-mono text-[11px] text-muted">
                  Serial: {{ cert.serial }} • {{ cert.algorithm }} • Valid {{ cert.issuedAt }} → {{ cert.expiresAt }}
                </span>
              </div>

              <UButton
                v-if="cert.status !== 'Revoked'"
                color="error"
                variant="outline"
                size="xs"
                icon="i-lucide-ban"
                class="w-fit rounded-xs font-mono text-xs"
                @click="revokeCert(cert.serial)"
              >
                Revoke
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
