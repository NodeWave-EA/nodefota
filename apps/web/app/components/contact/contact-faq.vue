<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'

defineOptions({
  name: 'ContactFAQ',
})

const faqs = [
  {
    q: 'How do I get technical support?',
    a: 'Submit the contact form and select Technical support. Include hardware model, firmware version, error details, and reproduction steps where possible.',
  },
  {
    q: 'Which devices can I ask about?',
    a: 'The platform documented client ecosystem includes ESP32-family devices and ESP8266. Specify your exact microcontroller board model when submitting an enquiry.',
  },
  {
    q: 'Can I ask about integrating a custom device?',
    a: 'Yes. Describe the MCU, networking interface, available flash/RAM, and firmware build environment so compatibility can be evaluated.',
  },
  {
    q: 'Can you help with self-hosted deployments?',
    a: 'Yes. Enquire about the platform self-hosted architecture and deployment stack, including Docker Compose, PostgreSQL, Supabase, and MinIO.',
  },
  {
    q: 'How do I report a security vulnerability?',
    a: 'Select Security vulnerability report in the form. Share a concise description, component name, and safe reproduction steps. Do not include passwords, private keys, or secret tokens.',
  },
  {
    q: 'How long does support take?',
    a: 'We follow up on all technical and general enquiries as quickly as possible using the email address provided in your form submission.',
  },
  {
    q: 'Can I request a new integration or feature?',
    a: 'Yes. Select General enquiry or Device integration and describe your use case, expected functionality, and hardware constraints.',
  },
]

const accordionItems: AccordionItem[] = faqs.map((f, idx) => ({
  value: `contact-faq-${idx}`,
  label: f.q,
  content: f.a,
}))
</script>

<template>
  <section id="faq" aria-labelledby="contact-faq-heading" class="w-full scroll-mt-24">
    <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
      <div class="flex flex-col items-start gap-4 lg:col-span-4">
        <UBadge
          color="primary"
          variant="subtle"
          size="sm"
          class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
        >
          05 // FAQ
        </UBadge>

        <h2
          id="contact-faq-heading"
          class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl"
        >
          Frequently Asked Questions
        </h2>

        <p class="font-sans text-sm leading-relaxed text-muted sm:text-base">
          Common questions about technical support scope, custom hardware evaluation, self-hosted deployments, and responsible security disclosure.
        </p>
      </div>

      <div class="lg:col-span-8">
        <div
          class="-mx-4 overflow-hidden border-y border-default bg-default sm:mx-0 sm:w-full sm:rounded-xs sm:border"
        >
          <UAccordion
            type="single"
            collapsible
            :default-value="['contact-faq-0']"
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
