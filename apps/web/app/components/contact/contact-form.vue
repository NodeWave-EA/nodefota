<script setup lang="ts">
import type { ContactFormPayload, EnquiryCategory } from '~/types/contact'

defineOptions({
  name: 'ContactForm',
})

const props = defineProps<{
  initialCategory?: EnquiryCategory
}>()

const isSubmitting = ref(false)
const isSuccess = ref(false)
const submitError = ref<string | null>(null)

const form = reactive<ContactFormPayload>({
  name: '',
  email: '',
  organization: '',
  category: props.initialCategory || 'GENERAL',
  subject: '',
  message: '',
  technicalDetails: {
    deviceModel: '',
    mcuPlatform: '',
    firmwareVersion: '',
    environment: '',
  },
  privacyConsent: false,
})

watch(() => props.initialCategory, (newVal) => {
  if (newVal) {
    form.category = newVal
  }
})

const categoryOptions = [
  { label: 'General enquiry', value: 'GENERAL' },
  { label: 'Technical support', value: 'TECHNICAL_SUPPORT' },
  { label: 'Device integration', value: 'DEVICE_INTEGRATION' },
  { label: 'API integration', value: 'API_INTEGRATION' },
  { label: 'Deployment & self-hosting', value: 'DEPLOYMENT' },
  { label: 'Security vulnerability report', value: 'SECURITY_REPORT' },
  { label: 'Partnership or business enquiry', value: 'PARTNERSHIP' },
  { label: 'Other', value: 'OTHER' },
]

const showTechnicalFields = computed(() => {
  return [
    'TECHNICAL_SUPPORT',
    'DEVICE_INTEGRATION',
    'API_INTEGRATION',
    'DEPLOYMENT',
  ].includes(form.category)
})

const isSecurityReport = computed(() => form.category === 'SECURITY_REPORT')

async function handleSubmit() {
  if (!form.privacyConsent)
    return

  isSubmitting.value = true
  submitError.value = null

  try {
    // Simulated API endpoint submission: POST /api/v1/contact
    await new Promise(resolve => setTimeout(resolve, 1200))
    isSuccess.value = true
  }
  catch {
    submitError.value = 'We couldn\'t send your message. Something went wrong while submitting your enquiry. Please try again or contact us via info@nodewave.net.'
  }
  finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.organization = ''
  form.category = 'GENERAL'
  form.subject = ''
  form.message = ''
  form.technicalDetails = {
    deviceModel: '',
    mcuPlatform: '',
    firmwareVersion: '',
    environment: '',
  }
  form.privacyConsent = false
  isSuccess.value = false
  submitError.value = null
}
</script>

<template>
  <section id="contact-form" aria-labelledby="contact-form-heading" class="flex flex-col gap-6 scroll-mt-24">
    <div class="flex flex-col items-start gap-3">
      <UBadge color="primary" variant="subtle" size="sm" class="rounded-xs font-mono text-xs font-semibold uppercase">
        02 // INQUIRY FORM
      </UBadge>
      <h2 id="contact-form-heading" class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
        Send Us a Message
      </h2>
      <p class="font-sans text-base text-muted">
        Provide details below so our engineering team can direct your request appropriately.
      </p>
    </div>

    <div class="-mx-4 overflow-hidden border-y border-default bg-default px-4 py-6 sm:mx-0 sm:rounded-xs sm:border sm:p-8">
      <!-- Success View -->
      <div v-if="isSuccess" class="flex flex-col items-center gap-4 rounded-xs border border-success/40 bg-success/5 p-6 text-center sm:p-8">
        <UIcon name="i-lucide-check-circle-2" class="size-8 text-success" aria-hidden="true" />
        <h3 class="font-sans text-xl font-bold text-highlighted">
          Message received
        </h3>
        <p class="mx-auto max-w-lg font-sans text-xs text-muted sm:text-sm">
          Thank you for contacting us. Your enquiry has been submitted successfully. Our engineering team will review your message and follow up via <strong class="text-highlighted">{{ form.email }}</strong>.
        </p>
        <UButton
          color="neutral"
          variant="outline"
          size="sm"
          class="mt-2 rounded-xs font-mono text-xs font-bold"
          @click="resetForm"
        >
          Send Another Enquiry
        </UButton>
      </div>

      <form v-else class="flex flex-col gap-5" @submit.prevent="handleSubmit">
        <UAlert
          v-if="submitError"
          color="error"
          variant="subtle"
          icon="i-lucide-alert-triangle"
          :description="submitError"
          class="rounded-xs"
        />

        <UAlert
          v-if="isSecurityReport"
          color="warning"
          variant="subtle"
          icon="i-lucide-shield-alert"
          title="RESPONSIBLE DISCLOSURE REMINDER"
          description="Please describe vulnerability reproduction steps securely. Do not submit passwords, private signing keys, access tokens, API secrets, or confidential firmware binaries."
          class="rounded-xs"
        />

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <!-- Full Name -->
          <div class="flex flex-col gap-1.5">
            <label for="name" class="font-mono text-xs font-bold text-highlighted">Full Name *</label>
            <UInput
              id="name"
              v-model="form.name"
              type="text"
              required
              placeholder="e.g. Jane Developer"
              size="md"
              :ui="{ base: 'rounded-xs' }"
            />
          </div>

          <!-- Email -->
          <div class="flex flex-col gap-1.5">
            <label for="email" class="font-mono text-xs font-bold text-highlighted">Work Email *</label>
            <UInput
              id="email"
              v-model="form.email"
              type="email"
              required
              placeholder="jane@example.com"
              size="md"
              :ui="{ base: 'rounded-xs' }"
            />
          </div>

          <!-- Organization -->
          <div class="flex flex-col gap-1.5">
            <label for="organization" class="font-mono text-xs font-bold text-highlighted">Organization</label>
            <UInput
              id="organization"
              v-model="form.organization"
              type="text"
              placeholder="e.g. NodeWave Systems"
              size="md"
              :ui="{ base: 'rounded-xs' }"
            />
          </div>

          <!-- Category Select -->
          <div class="flex flex-col gap-1.5">
            <label for="category" class="font-mono text-xs font-bold text-highlighted">Enquiry Type *</label>
            <USelect
              id="category"
              v-model="form.category"
              :items="categoryOptions"
              value-key="value"
              label-key="label"
              size="md"
              :ui="{ base: 'rounded-xs' }"
            />
          </div>
        </div>

        <!-- Conditional Technical Details Section -->
        <div v-if="showTechnicalFields" class="flex flex-col gap-3 rounded-xs border border-default bg-elevated/40 p-4">
          <span class="font-mono text-xs font-bold text-primary uppercase">// CONDITIONAL TECHNICAL DETAILS</span>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div class="flex flex-col gap-1">
              <label for="deviceModel" class="font-mono text-[11px] text-muted">Device / Hardware Model</label>
              <UInput
                id="deviceModel"
                v-model="form.technicalDetails!.deviceModel"
                type="text"
                placeholder="e.g. ESP32-S3-WROOM-1"
                size="sm"
                :ui="{ base: 'rounded-xs' }"
              />
            </div>

            <div class="flex flex-col gap-1">
              <label for="mcuPlatform" class="font-mono text-[11px] text-muted">MCU / Platform</label>
              <UInput
                id="mcuPlatform"
                v-model="form.technicalDetails!.mcuPlatform"
                type="text"
                placeholder="e.g. ESP32 / ESP8266"
                size="sm"
                :ui="{ base: 'rounded-xs' }"
              />
            </div>

            <div class="flex flex-col gap-1">
              <label for="firmwareVersion" class="font-mono text-[11px] text-muted">Firmware / Library Version</label>
              <UInput
                id="firmwareVersion"
                v-model="form.technicalDetails!.firmwareVersion"
                type="text"
                placeholder="e.g. v1.4.2 / FotaClient v2.1"
                size="sm"
                :ui="{ base: 'rounded-xs' }"
              />
            </div>

            <div class="flex flex-col gap-1">
              <label for="environment" class="font-mono text-[11px] text-muted">Deployment Environment</label>
              <UInput
                id="environment"
                v-model="form.technicalDetails!.environment"
                type="text"
                placeholder="e.g. PlatformIO / Arduino IDE / Docker"
                size="sm"
                :ui="{ base: 'rounded-xs' }"
              />
            </div>
          </div>
        </div>

        <!-- Subject -->
        <div class="flex flex-col gap-1.5">
          <label for="subject" class="font-mono text-xs font-bold text-highlighted">Subject *</label>
          <UInput
            id="subject"
            v-model="form.subject"
            type="text"
            required
            placeholder="Brief summary of your enquiry"
            size="md"
            :ui="{ base: 'rounded-xs' }"
          />
        </div>

        <!-- Message -->
        <div class="flex flex-col gap-1.5">
          <label for="message" class="font-mono text-xs font-bold text-highlighted">Message *</label>
          <UTextarea
            id="message"
            v-model="form.message"
            required
            :rows="5"
            placeholder="Describe your issue, requirements, or enquiry in detail..."
            :ui="{ base: 'rounded-xs' }"
          />
        </div>

        <!-- Privacy Consent -->
        <UCheckbox
          id="privacyConsent"
          v-model="form.privacyConsent"
          required
          label="By submitting this form, you agree that the information provided may be used to respond to your enquiry. Do not submit passwords, private signing keys, API secrets, access tokens, or confidential firmware binaries."
          :ui="{ label: 'font-sans text-xs text-muted leading-relaxed', base: 'rounded-xs' }"
        />

        <!-- Submit Button -->
        <div class="pt-2">
          <UButton
            type="submit"
            color="primary"
            variant="solid"
            size="lg"
            :loading="isSubmitting"
            :disabled="isSubmitting || !form.privacyConsent"
            class="rounded-xs font-semibold"
          >
            {{ isSubmitting ? 'Sending Message...' : 'Send Message' }}
          </UButton>
        </div>
      </form>
    </div>
  </section>
</template>
