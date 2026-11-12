<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({
  name: 'HomeDeveloperExperience',
})

type SnippetTabKey = 'cpp' | 'api' | 'pki'

interface DeveloperPillar {
  title: string
  description: string
  tag: string
  icon: string
}

interface IntegrationSnippet {
  key: SnippetTabKey
  label: string
  filename: string
  languageBadge: string
  caption: string
  code: string
}

const sectionContent = {
  eyebrow: 'BUILT FOR DEVELOPERS',
  heading: 'Integrate Secure OTA Without Building Everything From Scratch.',
  description:
    'A developer-oriented platform with embedded C++ libraries, a documented REST API, and dedicated integration workflows.',
  primaryCta: {
    label: 'Read the API Documentation',
    to: '/api/docs',
    icon: 'i-lucide-arrow-right',
  },
  secondaryCta: {
    label: 'Explore Integration Guides',
    to: '/docs/integration',
    icon: 'i-lucide-book-open',
  },
}

const pillars: DeveloperPillar[] = [
  {
    title: 'Embedded C++ Libraries',
    description:
      'Integrate the platform into Arduino and PlatformIO firmware projects.',
    tag: 'Arduino & PlatformIO',
    icon: 'i-lucide-code-2',
  },
  {
    title: 'REST API',
    description:
      'Access firmware, device, campaign, telemetry, and administrative capabilities through a documented API.',
    tag: 'JSON / HTTPS',
    icon: 'i-lucide-webhook',
  },
  {
    title: 'OpenAPI Documentation',
    description:
      'Explore endpoint definitions, schemas, authentication requirements, and request examples through Swagger UI.',
    tag: 'Swagger UI',
    icon: 'i-lucide-file-json-2',
  },
  {
    title: 'PKI Integration',
    description:
      'Provision device certificates through certificate signing requests and the platform\'s device certificate authority.',
    tag: 'CSR & Device CA',
    icon: 'i-lucide-badge-check',
  },
  {
    title: 'Filesystem OTA',
    description:
      'Manage LittleFS and SPIFFS filesystem images separately from application firmware.',
    tag: 'LittleFS / SPIFFS',
    icon: 'i-lucide-hard-drive',
  },
]

const snippets: IntegrationSnippet[] = [
  {
    key: 'cpp',
    label: 'ESP32 C++ Client',
    filename: 'src/main.cpp',
    languageBadge: 'C++ / Arduino',
    caption: 'Illustrative embedded client lifecycle initialization and post-boot health confirmation.',
    code: `#include <FotaClient.h>
#include <FsotaClient.h>

FotaClient fotaClient;

void setup() {
  // Configure platform endpoint, device credentials & verification keys
  fotaClient.begin(FOTA_SERVER_URL, DEVICE_ID, DEVICE_TOKEN);
  fotaClient.setPublicKey(FIRMWARE_SIGNING_PUBLIC_KEY);

  // Confirm healthy boot to prevent automatic OTA partition rollback
  fotaClient.confirmBootHealth();
}

void loop() {
  // Poll for authorized campaigns, verify SHA-256 + signature, and install
  fotaClient.handle();
}`,
  },
  {
    key: 'api',
    label: 'REST API & OpenAPI',
    filename: 'POST /api/v1/campaigns',
    languageBadge: 'HTTP / OpenAPI',
    caption: 'Illustrative REST API request using a scoped API key to orchestrate a canary rollout.',
    code: `POST /api/v1/campaigns HTTP/1.1
Host: api.nodewave.net
Authorization: Bearer <SCOPED_API_KEY>
Content-Type: application/json

{
  "name": "esp32-gateway-v1.4.2-canary",
  "firmwareId": "fw_01j9x8k2m4n6p8q0r2s4",
  "strategy": "CANARY",
  "targetHardware": "ESP32",
  "rollbackPolicy": {
    "maxFailureRatePercent": 5,
    "minCompletedDevices": 10
  }
}`,
  },
  {
    key: 'pki',
    label: 'PKI & Filesystem OTA',
    filename: 'POST /api/v1/pki/csr',
    languageBadge: 'X.509 / LittleFS',
    caption: 'Provision device certificates via CSR and deploy LittleFS/SPIFFS assets independently.',
    code: `POST /api/v1/pki/csr HTTP/1.1
Host: api.nodewave.net
Authorization: Bearer <DEVICE_BOOTSTRAP_TOKEN>
Content-Type: application/json

{
  "deviceId": "esp32-gateway-04",
  "csrPem": "-----BEGIN CERTIFICATE REQUEST-----\\n...\\n-----END CERTIFICATE REQUEST-----"
}

// Separate filesystem artefact targeting via FsotaClient:
// Type: FILESYSTEM (LittleFS | SPIFFS) -> Independent version lifecycle`,
  },
]

const activeSnippetKey = ref<SnippetTabKey>('cpp')

const activeSnippet = computed<IntegrationSnippet>(() => {
  return snippets.find(s => s.key === activeSnippetKey.value) ?? snippets[0]!
})
</script>

<template>
  <section id="developers" aria-labelledby="developers-heading" class="flex w-full flex-col gap-8">
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
          id="developers-heading"
          class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl"
        >
          {{ sectionContent.heading }}
        </h2>

        <p class="font-sans text-base leading-relaxed text-muted">
          {{ sectionContent.description }}
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <UButton
          :to="sectionContent.primaryCta.to"
          color="primary"
          variant="solid"
          size="lg"
          :trailing-icon="sectionContent.primaryCta.icon"
          class="rounded-xs font-semibold"
        >
          {{ sectionContent.primaryCta.label }}
        </UButton>

        <UButton
          :to="sectionContent.secondaryCta.to"
          color="neutral"
          variant="outline"
          size="lg"
          :leading-icon="sectionContent.secondaryCta.icon"
          class="rounded-xs font-semibold"
        >
          {{ sectionContent.secondaryCta.label }}
        </UButton>
      </div>
    </div>

    <div
      class="-mx-4 grid grid-cols-1 gap-px border-y border-default bg-border sm:mx-0 sm:w-full sm:overflow-hidden sm:rounded-xs sm:border lg:grid-cols-12"
    >
      <div class="flex flex-col gap-px bg-border lg:col-span-5">
        <div
          v-for="pillar in pillars"
          :key="pillar.title"
          class="flex flex-1 flex-col justify-center gap-1.5 bg-default px-4 py-4 sm:px-5"
        >
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <UIcon :name="pillar.icon" aria-hidden="true" class="h-4 w-4 shrink-0 text-primary" />
              <h3 class="font-sans text-sm font-bold text-highlighted">
                {{ pillar.title }}
              </h3>
            </div>

            <UBadge
              color="neutral"
              variant="outline"
              size="xs"
              class="rounded-xs font-mono text-[10px]"
            >
              {{ pillar.tag }}
            </UBadge>
          </div>

          <p class="font-sans text-xs leading-relaxed text-muted">
            {{ pillar.description }}
          </p>
        </div>
      </div>

      <div class="flex flex-col justify-between bg-default lg:col-span-7">
        <div
          role="tablist"
          aria-label="Developer integration examples"
          class="flex flex-wrap items-center justify-between gap-2 border-b border-default bg-elevated/60 px-4 py-2.5 sm:px-5"
        >
          <div class="flex flex-wrap items-center gap-1.5">
            <button
              v-for="tab in snippets"
              :key="tab.key"
              type="button"
              role="tab"
              :aria-selected="activeSnippetKey === tab.key"
              :aria-controls="`snippet-panel-${tab.key}`"
              class="rounded-xs px-2.5 py-1 font-mono text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              :class="activeSnippetKey === tab.key
                ? 'bg-primary text-inverted'
                : 'bg-default text-muted hover:text-highlighted'"
              @click="activeSnippetKey = tab.key"
            >
              {{ tab.label }}
            </button>
          </div>

          <UBadge
            color="neutral"
            variant="subtle"
            size="xs"
            class="rounded-xs font-mono text-[11px]"
          >
            {{ activeSnippet.languageBadge }}
          </UBadge>
        </div>

        <div
          :id="`snippet-panel-${activeSnippet.key}`"
          role="tabpanel"
          class="flex flex-1 flex-col justify-between"
        >
          <div class="flex items-center justify-between border-b border-default bg-elevated/20 px-4 py-2 sm:px-5">
            <span class="font-mono text-xs text-muted">
              {{ activeSnippet.filename }}
            </span>
            <span class="font-mono text-[11px] text-muted">
              Illustrative Example
            </span>
          </div>

          <pre
            class="overflow-x-auto bg-default px-4 py-4 font-mono text-xs leading-relaxed text-highlighted sm:p-5"
          ><code>{{ activeSnippet.code }}</code></pre>

          <div class="border-t border-default bg-elevated/40 px-4 py-3 sm:px-5">
            <p class="font-sans text-xs text-muted">
              {{ activeSnippet.caption }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
