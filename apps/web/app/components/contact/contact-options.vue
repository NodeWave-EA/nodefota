<script setup lang="ts">
import type { ContactOption } from '~/types/contact'

defineOptions({
  name: 'ContactOptions',
})

const emit = defineEmits<{
  selectCategory: [category: ContactOption['categoryKey']]
}>()

const options: ContactOption[] = [
  {
    id: 'general',
    eyebrow: 'NODEWAVE ECOSYSTEM',
    title: 'General Enquiries',
    description: 'Questions about the platform, its capabilities, business enquiries, partnerships, and the NodeWave technology ecosystem.',
    contactEmail: 'info@nodewave.net',
    ctaLabel: 'Email NodeWave',
    icon: 'i-lucide-mail',
    iconColor: 'text-primary',
    categoryKey: 'GENERAL',
  },
  {
    id: 'support',
    eyebrow: 'INTEGRATION & TROUBLESHOOTING',
    title: 'Technical Support',
    description: 'Need help implementing or troubleshooting an integration? Request assistance with device auth, OTA flows, and client libraries.',
    ctaLabel: 'Request Technical Assistance',
    icon: 'i-lucide-wrench',
    iconColor: 'text-primary',
    categoryKey: 'TECHNICAL_SUPPORT',
  },
  {
    id: 'integration',
    eyebrow: 'HARDWARE & REST API',
    title: 'Integration Enquiries',
    description: 'Planning to connect your existing IoT infrastructure? Ask about supported microcontrollers, C++ libraries, REST API, and storage.',
    ctaLabel: 'Discuss an Integration',
    icon: 'i-lucide-cpu',
    iconColor: 'text-info',
    categoryKey: 'DEVICE_INTEGRATION',
  },
  {
    id: 'security',
    eyebrow: 'RESPONSIBLE DISCLOSURE',
    title: 'Security Reporting',
    description: 'Found a potential security concern? Report suspected vulnerabilities privately so our engineering team can investigate.',
    ctaLabel: 'Report a Security Concern',
    icon: 'i-lucide-shield-alert',
    iconColor: 'text-warning',
    categoryKey: 'SECURITY_REPORT',
  },
]

function handleSelect(category: ContactOption['categoryKey']) {
  emit('selectCategory', category)
  const el = document.getElementById('contact-form')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section aria-labelledby="contact-options-heading" class="flex flex-col gap-6">
    <div class="flex flex-col items-start gap-3">
      <UBadge color="primary" variant="subtle" size="sm" class="rounded-xs font-mono text-xs font-semibold uppercase">
        01 // CHANNELS
      </UBadge>
      <h2 id="contact-options-heading" class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
        Communication & Support Options
      </h2>
    </div>

    <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
      <div class="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in options"
          :key="item.id"
          class="flex flex-col justify-between gap-4 bg-default p-5 transition-colors hover:bg-elevated/40"
        >
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <div class="flex size-7 items-center justify-center rounded-xs border border-default bg-elevated/60">
                <UIcon :name="item.icon" class="size-3.5" :class="item.iconColor" aria-hidden="true" />
              </div>
              <span class="font-mono text-[10px] font-bold tracking-wider text-muted uppercase">
                {{ item.eyebrow }}
              </span>
            </div>

            <div class="flex flex-col gap-1">
              <h3 class="font-sans text-sm font-bold text-highlighted sm:text-base">
                {{ item.title }}
              </h3>
              <p class="font-sans text-xs leading-relaxed text-muted">
                {{ item.description }}
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-2 pt-2">
            <a
              v-if="item.contactEmail"
              :href="`mailto:${item.contactEmail}`"
              class="font-mono text-xs font-semibold text-primary hover:underline"
            >
              {{ item.contactEmail }}
            </a>
            <UButton
              color="neutral"
              variant="outline"
              size="xs"
              class="w-full justify-center rounded-xs font-mono text-[11px] font-bold"
              @click="handleSelect(item.categoryKey)"
            >
              {{ item.ctaLabel }}
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
