<script setup lang="ts">
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

const accordionItems = faqs.map(f => ({
  label: f.q,
  content: f.a,
}))
</script>

<template>
  <section class="flex flex-col gap-4 py-6">
    <div class="flex flex-col gap-1">
      <span class="font-mono text-xs font-bold text-primary uppercase">05 // FAQ</span>
      <h2 class="font-sans text-2xl font-bold text-highlighted">
        Frequently Asked Questions
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
