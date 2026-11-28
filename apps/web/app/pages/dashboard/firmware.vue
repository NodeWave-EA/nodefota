<script setup lang="ts">
definePageMeta({
  name: 'DashboardFirmware',
  layout: 'dashboard',
})

useSeoMeta({
  title: 'Firmware Vault | NODEFOTA',
})

const isUploadOpen = ref(false)
const newRelease = reactive({
  version: '',
  target: 'ESP32',
  type: 'Application Binary',
  notes: '',
})

const releases = ref([
  {
    version: 'v1.4.2-esp32',
    target: 'ESP32 / ESP32-S3',
    type: 'Application Binary',
    size: '1,042 KB',
    sha256: 'e3b0c44298fc1c14...9b934ca495991b7852b855',
    signature: 'ECDSA P-256 Verified',
    channel: 'Canary',
    createdAt: '2 hours ago',
  },
  {
    version: 'v1.4.1-esp32',
    target: 'ESP32 / ESP32-S3',
    type: 'Application Binary',
    size: '1,038 KB',
    sha256: '8f434346648f6b96...1a2b3c4d5e6f708192a3b4',
    signature: 'ECDSA P-256 Verified',
    channel: 'Stable',
    createdAt: '5 days ago',
  },
  {
    version: 'v1.4.1-esp8266',
    target: 'ESP8266',
    type: 'Application Binary',
    size: '412 KB',
    sha256: '4b227777d4dd1fc6...7e8f9a0b1c2d3e4f5a6b7c',
    signature: 'Ed25519 Verified',
    channel: 'Stable',
    createdAt: '5 days ago',
  },
  {
    version: 'fs-v2.1.0-littlefs',
    target: 'ESP32 / ESP32-S3',
    type: 'LittleFS Image',
    size: '256 KB',
    sha256: '2c26b46b68ffc68f...9d8e7f6a5b4c3d2e1f0a9b',
    signature: 'ECDSA P-256 Verified',
    channel: 'Stable',
    createdAt: '2 weeks ago',
  },
])

function handleUploadRelease() {
  if (!newRelease.version.trim())
    return
  releases.value.unshift({
    version: newRelease.version.trim(),
    target: newRelease.target,
    type: newRelease.type,
    size: '1,048 KB',
    sha256: '9f86d081884c7d65...d5f6a7b8c9e0f1a2b3c4d5',
    signature: 'ECDSA P-256 Verified',
    channel: 'Staging',
    createdAt: 'Just now',
  })
  newRelease.version = ''
  newRelease.notes = ''
  isUploadOpen.value = false
}
</script>

<template>
  <UDashboardPanel id="firmware-vault">
    <template #header>
      <UDashboardNavbar title="Firmware Vault">
        <template #leading>
          <UDashboardSidebarCollapse class="rounded-xs" />
        </template>

        <template #right>
          <AppThemeToggle />

          <UButton
            color="primary"
            variant="solid"
            size="xs"
            icon="i-lucide-upload"
            class="rounded-xs font-mono text-xs font-bold"
            @click="isUploadOpen = true"
          >
            Upload Binary
          </UButton>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <span class="font-mono text-xs text-muted">
            S3 BUCKET // <strong class="text-highlighted">minio://nodefota-releases</strong> • Signed Manifests Enforced
          </span>
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-1 gap-px overflow-hidden rounded-xs border border-default bg-border lg:grid-cols-2">
          <div
            v-for="rel in releases"
            :key="rel.version"
            class="flex flex-col justify-between gap-4 bg-default p-5 transition-colors hover:bg-elevated/40"
          >
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-package-check" class="size-4 text-primary" aria-hidden="true" />
                  <h2 class="font-mono text-sm font-bold text-highlighted">
                    {{ rel.version }}
                  </h2>
                </div>

                <UBadge
                  :color="rel.channel === 'Stable' ? 'success' : rel.channel === 'Canary' ? 'warning' : 'info'"
                  variant="subtle"
                  size="xs"
                  class="rounded-xs font-mono text-[10px]"
                >
                  {{ rel.channel }}
                </UBadge>
              </div>

              <div class="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted">
                <span>{{ rel.target }}</span>
                <span>•</span>
                <span>{{ rel.type }}</span>
                <span>•</span>
                <span>{{ rel.size }}</span>
              </div>

              <div class="rounded-xs border border-default bg-elevated/40 p-2.5 font-mono text-[11px]">
                <div class="text-[10px] text-muted uppercase">
                  SHA-256 Digest
                </div>
                <div class="mt-0.5 truncate text-highlighted">
                  {{ rel.sha256 }}
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between border-t border-default pt-3 font-mono text-[11px]">
              <span class="inline-flex items-center gap-1.5 font-semibold text-success">
                <UIcon name="i-lucide-shield-check" class="size-3.5" aria-hidden="true" />
                {{ rel.signature }}
              </span>
              <span class="text-muted">{{ rel.createdAt }}</span>
            </div>
          </div>
        </div>

        <UModal v-model:open="isUploadOpen" title="Upload & Sign Firmware Release">
          <template #body>
            <form class="flex flex-col gap-4" @submit.prevent="handleUploadRelease">
              <div class="flex flex-col gap-1.5">
                <label class="font-mono text-xs font-bold text-highlighted">Release Tag *</label>
                <UInput
                  v-model="newRelease.version"
                  required
                  placeholder="e.g. v1.4.3-esp32"
                  :ui="{ base: 'rounded-xs font-mono text-xs' }"
                />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="flex flex-col gap-1.5">
                  <label class="font-mono text-xs font-bold text-highlighted">Target Architecture</label>
                  <USelect
                    v-model="newRelease.target"
                    :items="['ESP32 / ESP32-S3', 'ESP8266']"
                    :ui="{ base: 'rounded-xs font-mono text-xs' }"
                  />
                </div>

                <div class="flex flex-col gap-1.5">
                  <label class="font-mono text-xs font-bold text-highlighted">Artifact Type</label>
                  <USelect
                    v-model="newRelease.type"
                    :items="['Application Binary', 'LittleFS Image', 'SPIFFS Image']"
                    :ui="{ base: 'rounded-xs font-mono text-xs' }"
                  />
                </div>
              </div>

              <div class="flex justify-end gap-2 pt-2">
                <UButton color="neutral" variant="outline" size="sm" class="rounded-xs font-mono text-xs" @click="isUploadOpen = false">
                  Cancel
                </UButton>
                <UButton type="submit" color="primary" variant="solid" size="sm" class="rounded-xs font-mono text-xs font-bold">
                  Compute SHA-256 & Sign
                </UButton>
              </div>
            </form>
          </template>
        </UModal>
      </div>
    </template>
  </UDashboardPanel>
</template>
