<script setup lang="ts">
import type { FAQItem } from '~/types/integrations'

defineOptions({
  name: 'IntegrationsFAQ',
})

const faqs: FAQItem[] = [
  {
    question: 'Which devices are currently supported?',
    answer: 'The documented firmware libraries target ESP32 and ESP8266 Arduino-compatible microcontrollers. ESP32-S3 is supported through the ESP32 C++ library.',
  },
  {
    question: 'Can I use PlatformIO or Arduino IDE?',
    answer: 'Yes. Both PlatformIO and Arduino IDE are part of the documented firmware development and compilation workflow.',
  },
  {
    question: 'Can I use my own S3-compatible storage?',
    answer: 'Yes. The storage architecture uses an S3-compatible interface, with MinIO and Supabase Storage as documented implementations.',
  },
  {
    question: 'Does the platform support MQTT or LoRaWAN?',
    answer: 'MQTT and LoRaWAN are outside the current project scope and identified as future possibilities. The current device communication model relies on REST/HTTPS.',
  },
  {
    question: 'Is the platform self-hostable?',
    answer: 'Yes. The documented backend, PostgreSQL database, Supabase Auth, and MinIO storage stack can be self-hosted via Docker Compose.',
  },
]

const accordionItems = faqs.map(faq => ({
  label: faq.question,
  content: faq.answer,
}))
</script>

<template>
  <section class="flex flex-col gap-4 py-6">
    <div class="flex flex-col gap-1">
      <span class="font-mono text-xs font-bold text-primary uppercase">05 // FREQUENTLY ASKED QUESTIONS</span>
      <h2 class="font-sans text-2xl font-bold text-highlighted">
        Integration FAQ
      </h2>
    </div>

    <div class="-mx-4 border-y border-default bg-default p-4 sm:mx-0 sm:rounded-xs sm:border sm:p-6">
      <UAccordion :items="accordionItems" class="font-sans text-sm">
        <template #default="{ item }">
          <div class="flex items-center justify-between py-2.5 text-sm font-bold text-highlighted cursor-pointer">
            <span>{{ item.label }}</span>
          </div>
        </template>
        <template #content="{ item }">
          <p class="pb-3 text-xs leading-relaxed text-muted sm:text-sm">
            {{ item.content }}
          </p>
        </template>
      </UAccordion>
    </div>
  </section>
</template>
