<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'

defineOptions({
  name: 'HomeFAQ',
})

const sectionContent = {
  eyebrow: 'FREQUENTLY ASKED QUESTIONS',
  heading: 'Technical Answers for Embedded & Platform Teams.',
  description:
    'Clear answers on supported microcontrollers, cryptographic verification, mTLS device authentication, rollout strategies, rollback behaviour, and licensing.',
  docsCta: {
    label: 'Read Full Documentation',
    to: '/docs',
    icon: 'i-lucide-book-open',
  },
  supportCta: {
    label: 'Contact Support',
    to: '/support',
    icon: 'i-lucide-lifebuoy',
  },
}

const faqItems: AccordionItem[] = [
  {
    value: 'what-is-secure-fota',
    label: 'What is a Secure FOTA platform?',
    content:
      'A Secure Firmware Over-The-Air platform enables operators to distribute firmware updates remotely while enforcing device authentication, firmware integrity checks, digital signature verification, and update lifecycle monitoring.',
  },
  {
    value: 'supported-devices',
    label: 'Which devices are supported?',
    content:
      'The current embedded client libraries target ESP32 and ESP8266 devices using Arduino-compatible development environments.',
  },
  {
    value: 'firmware-integrity',
    label: 'How is firmware integrity verified?',
    content:
      'Firmware images are checked using SHA-256 checksums. Digital signatures are also verified using the configured cryptographic signing algorithm before installation.',
  },
  {
    value: 'mutual-tls',
    label: 'Does the platform support mutual TLS?',
    content:
      'Yes. The platform includes X.509 certificate provisioning and mTLS-based device authentication capabilities.',
  },
  {
    value: 'deployment-strategies',
    label: 'What deployment strategies are available?',
    content:
      'The platform supports IMMEDIATE, GRADUAL, CANARY, and SCHEDULED OTA campaign strategies.',
  },
  {
    value: 'automatic-rollback',
    label: 'Does it support automatic rollback?',
    content:
      'The platform includes configurable rollback policies and ESP32 native OTA rollback integration. Actual rollback behaviour depends on device-side support and successful post-boot health validation.',
  },
  {
    value: 'filesystem-images',
    label: 'Can I update filesystem images?',
    content:
      'Yes. Separate filesystem OTA management supports LittleFS and SPIFFS image versioning.',
  },
  {
    value: 'custom-application',
    label: 'Can I integrate my own application?',
    content:
      'Yes. Developers can integrate the embedded C++ libraries into compatible firmware projects and interact with the backend using its REST API.',
  },
  {
    value: 'open-source',
    label: 'Is the platform open source?',
    content:
      'The project documentation identifies the Arduino client libraries as MIT-licensed. The licensing of the complete platform and its individual components should be described according to their actual repository licences.',
  },
  {
    value: 'every-microcontroller',
    label: 'Does the platform support every IoT microcontroller?',
    content:
      'The current implementation focuses on ESP32 and ESP8266. Support for additional microcontrollers requires compatible device-side integration.',
  },
]
</script>

<template>
  <section id="faq" aria-labelledby="faq-heading" class="w-full">
    <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
      <div class="flex flex-col items-start gap-4 lg:col-span-4">
        <UBadge
          color="primary"
          variant="subtle"
          size="sm"
          class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
        >
          {{ sectionContent.eyebrow }}
        </UBadge>

        <h2
          id="faq-heading"
          class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl"
        >
          {{ sectionContent.heading }}
        </h2>

        <p class="font-sans text-sm leading-relaxed text-muted sm:text-base">
          {{ sectionContent.description }}
        </p>

        <div class="flex flex-wrap items-center gap-2.5 pt-2">
          <UButton
            :to="sectionContent.docsCta.to"
            color="neutral"
            variant="outline"
            size="md"
            :leading-icon="sectionContent.docsCta.icon"
            class="rounded-xs font-semibold"
          >
            {{ sectionContent.docsCta.label }}
          </UButton>

          <UButton
            :to="sectionContent.supportCta.to"
            color="neutral"
            variant="ghost"
            size="md"
            :leading-icon="sectionContent.supportCta.icon"
            class="rounded-xs font-semibold"
          >
            {{ sectionContent.supportCta.label }}
          </UButton>
        </div>
      </div>

      <div class="lg:col-span-8">
        <div
          class="-mx-4 overflow-hidden border-y border-default bg-default sm:mx-0 sm:w-full sm:rounded-xs sm:border"
        >
          <UAccordion
            type="single"
            collapsible
            :default-value="['what-is-secure-fota']"
            :items="faqItems"
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
