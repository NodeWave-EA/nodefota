<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

definePageMeta({
  name: 'DashboardDevices',
  layout: 'dashboard',
})

useSeoMeta({
  title: 'Devices | NODEFOTA',
})

interface DeviceRow {
  id: string
  hostname: string
  platform: 'ESP32' | 'ESP32-S3' | 'ESP8266'
  firmware: string
  partition: 'ota_0' | 'ota_1' | 'single'
  mtlsStatus: 'Valid' | 'Expiring' | 'Revoked'
  status: 'Online' | 'Updating' | 'Offline'
  lastSeen: string
}

const search = ref('')
const platformFilter = ref<string>('ALL')
const statusFilter = ref<string>('ALL')
const isProvisionOpen = ref(false)

const newDevice = reactive({
  hostname: '',
  platform: 'ESP32',
  group: 'production-gateways',
})

const devices = ref<DeviceRow[]>([
  {
    id: 'dev_98a1f0',
    hostname: 'esp32-gateway-04',
    platform: 'ESP32',
    firmware: 'v1.4.2-esp32',
    partition: 'ota_1',
    mtlsStatus: 'Valid',
    status: 'Updating',
    lastSeen: 'Just now',
  },
  {
    id: 'dev_77c4b2',
    hostname: 'esp32-node-11',
    platform: 'ESP32-S3',
    firmware: 'v1.4.2-esp32',
    partition: 'ota_0',
    mtlsStatus: 'Valid',
    status: 'Online',
    lastSeen: '14s ago',
  },
  {
    id: 'dev_31e9d4',
    hostname: 'esp8266-sensor-02',
    platform: 'ESP8266',
    firmware: 'v1.4.1-esp8266',
    partition: 'single',
    mtlsStatus: 'Valid',
    status: 'Online',
    lastSeen: '42s ago',
  },
  {
    id: 'dev_54b8c1',
    hostname: 'esp32-node-09',
    platform: 'ESP32',
    firmware: 'v1.4.1-esp32',
    partition: 'ota_0',
    mtlsStatus: 'Expiring',
    status: 'Online',
    lastSeen: '2m ago',
  },
  {
    id: 'dev_19f2a7',
    hostname: 'esp32s3-edge-01',
    platform: 'ESP32-S3',
    firmware: 'v1.4.2-esp32',
    partition: 'ota_1',
    mtlsStatus: 'Valid',
    status: 'Online',
    lastSeen: '3m ago',
  },
  {
    id: 'dev_62d0e8',
    hostname: 'esp8266-relay-07',
    platform: 'ESP8266',
    firmware: 'v1.3.9-esp8266',
    partition: 'single',
    mtlsStatus: 'Revoked',
    status: 'Offline',
    lastSeen: '4h ago',
  },
])

const filteredDevices = computed(() => {
  return devices.value.filter((d) => {
    const matchesQuery
      = !search.value
        || d.hostname.toLowerCase().includes(search.value.toLowerCase())
        || d.id.toLowerCase().includes(search.value.toLowerCase())
        || d.firmware.toLowerCase().includes(search.value.toLowerCase())
    const matchesPlatform = platformFilter.value === 'ALL' || d.platform === platformFilter.value
    const matchesStatus = statusFilter.value === 'ALL' || d.status === statusFilter.value
    return matchesQuery && matchesPlatform && matchesStatus
  })
})

const columns: TableColumn<DeviceRow>[] = [
  { accessorKey: 'hostname', header: 'Device / ID' },
  { accessorKey: 'platform', header: 'MCU' },
  { accessorKey: 'firmware', header: 'Active Firmware' },
  { accessorKey: 'partition', header: 'Partition' },
  { accessorKey: 'mtlsStatus', header: 'X.509 mTLS' },
  { accessorKey: 'status', header: 'State' },
  { accessorKey: 'lastSeen', header: 'Heartbeat' },
]

function handleProvision() {
  if (!newDevice.hostname.trim())
    return
  devices.value.unshift({
    id: `dev_${Math.random().toString(16).slice(2, 8)}`,
    hostname: newDevice.hostname.trim(),
    platform: newDevice.platform as DeviceRow['platform'],
    firmware: newDevice.platform === 'ESP8266'
      ? 'v1.4.1-esp8266'
      : 'v1.4.2-esp32',
    partition: newDevice.platform === 'ESP8266'
      ? 'single'
      : 'ota_0',
    mtlsStatus: 'Valid',
    status: 'Online',
    lastSeen: 'Just now',
  })
  newDevice.hostname = ''
  isProvisionOpen.value = false
}
</script>

<template>
  <UDashboardPanel id="devices">
    <template #header>
      <UDashboardNavbar title="Devices">
        <template #leading>
          <UDashboardSidebarCollapse class="rounded-xs" />
        </template>

        <template #right>
          <AppThemeToggle />

          <UButton
            color="primary"
            variant="solid"
            size="xs"
            icon="i-lucide-plus"
            class="rounded-xs font-mono text-xs font-bold"
            @click="isProvisionOpen = true"
          >
            Provision Device
          </UButton>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UInput
            v-model="search"
            icon="i-lucide-search"
            placeholder="Filter hostname, ID, or version..."
            size="xs"
            class="w-64"
            :ui="{ base: 'rounded-xs font-mono text-xs' }"
          />

          <USelect
            v-model="platformFilter"
            :items="['ALL', 'ESP32', 'ESP32-S3', 'ESP8266']"
            size="xs"
            class="w-32"
            :ui="{ base: 'rounded-xs font-mono text-xs' }"
          />

          <USelect
            v-model="statusFilter"
            :items="['ALL', 'Online', 'Updating', 'Offline']"
            size="xs"
            class="w-32"
            :ui="{ base: 'rounded-xs font-mono text-xs' }"
          />
        </template>

        <template #right>
          <span class="font-mono text-xs text-muted">
            Showing <strong class="text-highlighted">{{ filteredDevices.length }}</strong> of {{ devices.length }} nodes
          </span>
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="overflow-hidden rounded-xs border border-default bg-default">
        <UTable :data="filteredDevices" :columns="columns">
          <template #hostname-cell="{ row }">
            <div class="flex flex-col">
              <span class="font-mono text-xs font-bold text-highlighted">{{ row.original.hostname }}</span>
              <span class="font-mono text-[10px] text-muted">{{ row.original.id }}</span>
            </div>
          </template>

          <template #platform-cell="{ row }">
            <UBadge color="neutral" variant="outline" size="xs" class="rounded-xs font-mono text-[10px]">
              {{ row.original.platform }}
            </UBadge>
          </template>

          <template #firmware-cell="{ row }">
            <code class="font-mono text-xs font-semibold text-primary">{{ row.original.firmware }}</code>
          </template>

          <template #partition-cell="{ row }">
            <span class="font-mono text-xs text-muted">{{ row.original.partition }}</span>
          </template>

          <template #mtlsStatus-cell="{ row }">
            <UBadge
              :color="row.original.mtlsStatus === 'Valid' ? 'success' : row.original.mtlsStatus === 'Expiring' ? 'warning' : 'error'"
              variant="subtle"
              size="xs"
              class="rounded-xs font-mono text-[10px]"
            >
              {{ row.original.mtlsStatus }}
            </UBadge>
          </template>

          <template #status-cell="{ row }">
            <div class="inline-flex items-center gap-1.5 font-mono text-xs">
              <span
                class="size-2 rounded-xs"
                :class="row.original.status === 'Online' ? 'bg-success' : row.original.status === 'Updating' ? 'bg-warning' : 'bg-error'"
              />
              <span class="text-highlighted">{{ row.original.status }}</span>
            </div>
          </template>

          <template #lastSeen-cell="{ row }">
            <span class="font-mono text-xs text-muted">{{ row.original.lastSeen }}</span>
          </template>
        </UTable>
      </div>

      <UModal v-model:open="isProvisionOpen" title="Provision New Device">
        <template #body>
          <form class="flex flex-col gap-4" @submit.prevent="handleProvision">
            <div class="flex flex-col gap-1.5">
              <label class="font-mono text-xs font-bold text-highlighted">Device Hostname *</label>
              <UInput
                v-model="newDevice.hostname"
                required
                placeholder="e.g. esp32-gateway-05"
                :ui="{ base: 'rounded-xs font-mono text-xs' }"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="font-mono text-xs font-bold text-highlighted">Target MCU Platform</label>
              <USelect
                v-model="newDevice.platform"
                :items="['ESP32', 'ESP32-S3', 'ESP8266']"
                :ui="{ base: 'rounded-xs font-mono text-xs' }"
              />
            </div>

            <div class="flex justify-end gap-2 pt-2">
              <UButton color="neutral" variant="outline" size="sm" class="rounded-xs font-mono text-xs" @click="isProvisionOpen = false">
                Cancel
              </UButton>
              <UButton type="submit" color="primary" variant="solid" size="sm" class="rounded-xs font-mono text-xs font-bold">
                Register & Issue CSR Token
              </UButton>
            </div>
          </form>
        </template>
      </UModal>
    </template>
  </UDashboardPanel>
</template>
