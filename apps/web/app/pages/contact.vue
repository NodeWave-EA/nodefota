<script setup lang="ts">
import type { EnquiryCategory } from '~/types/contact'
import { ref } from 'vue'
import ContactDocumentation from '~/components/contact/contact-documentation.vue'
import ContactFAQ from '~/components/contact/contact-faq.vue'
import ContactFinalCTA from '~/components/contact/contact-final-cta.vue'
import ContactForm from '~/components/contact/contact-form.vue'
import ContactHero from '~/components/contact/contact-hero.vue'
import ContactNodeWave from '~/components/contact/contact-nodewave.vue'
import ContactOptions from '~/components/contact/contact-options.vue'
import ContactTechnicalGuidance from '~/components/contact/contact-technical-guidance.vue'

useSeoMeta({
  title: 'Contact & Support | Secure FOTA Platform',
  description:
    'Contact the Secure FOTA Platform team for technical support, IoT device integration, deployment enquiries, and secure firmware update assistance.',
  ogTitle: 'Contact & Support | Secure FOTA Platform',
  ogDescription:
    'Get in touch with the team for technical assistance, hardware compatibility, and deployment support.',
  ogType: 'website',
})

const activeCategory = ref<EnquiryCategory>('GENERAL')

function handleCategorySelect(category: EnquiryCategory) {
  activeCategory.value = category
}
</script>

<template>
  <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <ContactHero />
    <ContactOptions @select-category="handleCategorySelect" />
    <ContactForm :initial-category="activeCategory" />
    <ContactTechnicalGuidance />
    <ContactDocumentation />
    <ContactNodeWave />
    <ContactFAQ />
    <ContactFinalCTA />
  </main>
</template>
