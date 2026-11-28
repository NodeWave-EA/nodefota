<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'
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

const accordionItems: AccordionItem[] = faqs.map((faq, idx) => ({
  value: `integration-faq-${idx}`,
  label: faq.question,
  content: faq.answer,
}))
</script>

<template>
  <section id="faq" aria-labelledby="integrations-faq-heading" class="w-full scroll-mt-24">
    <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
      <div class="flex flex-col items-start gap-4 lg:col-span-4">
        <UBadge
          color="primary"
          variant="subtle"
          size="sm"
          class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
        >
          05 // FREQUENTLY ASKED QUESTIONS
        </UBadge>

        <h2
          id="integrations-faq-heading"
          class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl"
        >
          Integration FAQ
        </h2>

        <p class="font-sans text-sm leading-relaxed text-muted sm:text-base">
          Technical guidance on microcontroller support, build toolchains, S3-compatible storage, and self-hosted deployment.
        </p>

        <UButton
          to="/contact"
          color="neutral"
          variant="outline"
          size="md"
          leading-icon="i-lucide-life-buoy"
          class="rounded-xs font-semibold"
        >
          Contact Technical Support
        </UButton>
      </div>

      <div class="lg:col-span-8">
        <div
          class="-mx-4 overflow-hidden border-y border-default bg-default sm:mx-0 sm:w-full sm:rounded-xs sm:border"
        >
          <UAccordion
            type="single"
            collapsible
            :default-value="['integration-faq-0']"
            :items="accordionItems"
            :ui="{
              root: 'divide-y divide-default',
              item: 'bg-default',
              trigger: 'px-4 py-4 sm:px-6 sm:py-4.5 font-sans text-sm sm:text-base font-semibold text-highlighted hover:bg-elevated/40 transition-colors rounded-none',
              content: 'px-4 pb-5 pt-1 sm:px-6 font-sans text-sm leading-relaxed text-muted',
              trailingIcon: 'text-primary',
            }"
          />
        </div>
      </div>
    </div>
  </section>
</template>
