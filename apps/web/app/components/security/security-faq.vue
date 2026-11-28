<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'
import { SECURITY_FAQ } from '~/content/security'

defineOptions({
  name: 'SecurityFAQ',
})

const faqAccordionItems = computed<AccordionItem[]>(() => {
  return SECURITY_FAQ.map(f => ({
    value: f.value,
    label: f.label,
    content: f.content,
  }))
})
</script>

<template>
  <section id="faq" aria-labelledby="security-faq-heading" class="w-full scroll-mt-24">
    <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
      <div class="flex flex-col items-start gap-4 lg:col-span-4">
        <UBadge
          color="primary"
          variant="subtle"
          size="sm"
          class="rounded-xs font-mono text-xs font-semibold tracking-wider uppercase"
        >
          SECURITY FAQ
        </UBadge>

        <h2
          id="security-faq-heading"
          class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl"
        >
          Technical Security Answers
        </h2>

        <p class="font-sans text-sm leading-relaxed text-muted sm:text-base">
          Detailed explanations covering signing key custody, mTLS certificate provisioning, ESP8266 constraints, and rollback mechanisms.
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
            :default-value="['verification-process']"
            :items="faqAccordionItems"
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
