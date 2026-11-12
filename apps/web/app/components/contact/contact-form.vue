<script setup lang="ts">
import type { ContactFormPayload, EnquiryCategory } from '~/types/contact'
import { reactive, ref, watch } from 'vue'

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
  catch (_err) {
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
  <section id="contact-form" class="flex flex-col gap-4 py-6">
    <div class="flex flex-col gap-1">
      <span class="font-mono text-xs font-bold text-primary uppercase">02 // INQUIRY FORM</span>
      <h2 class="font-sans text-2xl font-bold text-highlighted">
        Send Us a Message
      </h2>
      <p class="font-sans text-xs text-muted">
        Provide details below so our engineering team can direct your request appropriately.
      </p>
    </div>

    <div class="-mx-4 overflow-hidden border-y border-default bg-default p-4.5 sm:mx-0 sm:rounded-xs sm:border sm:p-6 lg:p-8">
      <!-- Success View -->
      <div v-if="isSuccess" class="flex flex-col gap-4 rounded-xs border border-emerald-500/40 bg-emerald-950/20 p-6 text-center">
        <UIcon name="i-lucide-check-circle-2" class="mx-auto h-8 w-8 text-emerald-400" />
        <h3 class="font-sans text-xl font-bold text-highlighted">
          Message received
        </h3>
        <p class="font-sans text-xs text-muted sm:text-sm max-w-lg mx-auto">
          Thank you for contacting us. Your enquiry has been submitted successfully. Our engineering team will review your message and follow up via <strong class="text-highlighted">{{ form.email }}</strong>.
        </p>
        <UButton
          color="neutral"
          variant="outline"
          size="xs"
          class="rounded-xs font-mono text-xs font-bold w-fit mx-auto mt-2"
          @click="resetForm"
        >
          Send Another Enquiry
        </UButton>
      </div>

      <form v-else class="flex flex-col gap-5" @submit.prevent="handleSubmit">
        <div v-if="submitError" class="flex items-center gap-2 rounded-xs border border-red-500/50 bg-red-950/20 p-3 text-xs text-red-300">
          <UIcon name="i-lucide-alert-triangle" class="h-4 w-4 shrink-0 text-red-400" />
          <span>{{ submitError }}</span>
        </div>

        <div v-if="isSecurityReport" class="flex items-start gap-2.5 rounded-xs border border-purple-500/50 bg-purple-950/20 p-4 text-xs">
          <UIcon name="i-lucide-shield-alert" class="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />
          <div class="flex flex-col gap-1">
            <span class="font-mono font-bold text-purple-300 uppercase">RESPONSIBLE DISCLOSURE REMINDER</span>
            <span class="font-sans text-purple-200/80">
              Please describe vulnerability reproduction steps securely. Do not submit passwords, private signing keys, access tokens, API secrets, or confidential firmware binaries.
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <!-- Full Name -->
          <div class="flex flex-col gap-1.5">
            <label for="name" class="font-mono text-xs font-bold text-highlighted">Full Name *</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              placeholder="e.g. Jane Developer"
              class="rounded-xs border border-default bg-elevated/40 px-3 py-2 font-sans text-xs text-highlighted placeholder:text-muted focus:border-primary focus:outline-none"
            >
          </div>

          <!-- Email -->
          <div class="flex flex-col gap-1.5">
            <label for="email" class="font-mono text-xs font-bold text-highlighted">Work Email *</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              placeholder="jane@example.com"
              class="rounded-xs border border-default bg-elevated/40 px-3 py-2 font-sans text-xs text-highlighted placeholder:text-muted focus:border-primary focus:outline-none"
            >
          </div>

          <!-- Organization -->
          <div class="flex flex-col gap-1.5">
            <label for="organization" class="font-mono text-xs font-bold text-highlighted">Organization</label>
            <input
              id="organization"
              v-model="form.organization"
              type="text"
              placeholder="e.g. NodeWave Systems"
              class="rounded-xs border border-default bg-elevated/40 px-3 py-2 font-sans text-xs text-highlighted placeholder:text-muted focus:border-primary focus:outline-none"
            >
          </div>

          <!-- Category Select -->
          <div class="flex flex-col gap-1.5">
            <label for="category" class="font-mono text-xs font-bold text-highlighted">Enquiry Type *</label>
            <select
              id="category"
              v-model="form.category"
              required
              class="rounded-xs border border-default bg-elevated/40 px-3 py-2 font-sans text-xs text-highlighted focus:border-primary focus:outline-none"
            >
              <option v-for="opt in categoryOptions" :key="opt.value" :value="opt.value" class="bg-default text-highlighted">
                {{ opt.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Conditional Technical Details Section -->
        <div v-if="showTechnicalFields" class="flex flex-col gap-3 rounded-xs border border-default bg-elevated/20 p-4">
          <span class="font-mono text-xs font-bold text-primary uppercase">// CONDITIONAL TECHNICAL DETAILS</span>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div class="flex flex-col gap-1">
              <label for="deviceModel" class="font-mono text-[11px] text-muted">Device / Hardware Model</label>
              <input
                id="deviceModel"
                v-model="form.technicalDetails!.deviceModel"
                type="text"
                placeholder="e.g. ESP32-S3-WROOM-1"
                class="rounded-xs border border-default bg-elevated/40 px-3 py-1.5 font-sans text-xs text-highlighted placeholder:text-muted focus:border-primary focus:outline-none"
              >
            </div>

            <div class="flex flex-col gap-1">
              <label for="mcuPlatform" class="font-mono text-[11px] text-muted">MCU / Platform</label>
              <input
                id="mcuPlatform"
                v-model="form.technicalDetails!.mcuPlatform"
                type="text"
                placeholder="e.g. ESP32 / ESP8266"
                class="rounded-xs border border-default bg-elevated/40 px-3 py-1.5 font-sans text-xs text-highlighted placeholder:text-muted focus:border-primary focus:outline-none"
              >
            </div>

            <div class="flex flex-col gap-1">
              <label for="firmwareVersion" class="font-mono text-[11px] text-muted">Firmware / Library Version</label>
              <input
                id="firmwareVersion"
                v-model="form.technicalDetails!.firmwareVersion"
                type="text"
                placeholder="e.g. v1.4.2 / FotaClient v2.1"
                class="rounded-xs border border-default bg-elevated/40 px-3 py-1.5 font-sans text-xs text-highlighted placeholder:text-muted focus:border-primary focus:outline-none"
              >
            </div>

            <div class="flex flex-col gap-1">
              <label for="environment" class="font-mono text-[11px] text-muted">Deployment Environment</label>
              <input
                id="environment"
                v-model="form.technicalDetails!.environment"
                type="text"
                placeholder="e.g. PlatformIO / Arduino IDE / Docker"
                class="rounded-xs border border-default bg-elevated/40 px-3 py-1.5 font-sans text-xs text-highlighted placeholder:text-muted focus:border-primary focus:outline-none"
              >
            </div>
          </div>
        </div>

        <!-- Subject -->
        <div class="flex flex-col gap-1.5">
          <label for="subject" class="font-mono text-xs font-bold text-highlighted">Subject *</label>
          <input
            id="subject"
            v-model="form.subject"
            type="text"
            required
            placeholder="Brief summary of your enquiry"
            class="rounded-xs border border-default bg-elevated/40 px-3 py-2 font-sans text-xs text-highlighted placeholder:text-muted focus:border-primary focus:outline-none"
          >
        </div>

        <!-- Message -->
        <div class="flex flex-col gap-1.5">
          <label for="message" class="font-mono text-xs font-bold text-highlighted">Message *</label>
          <textarea
            id="message"
            v-model="form.message"
            required
            rows="5"
            placeholder="Describe your issue, requirements, or enquiry in detail..."
            class="rounded-xs border border-default bg-elevated/40 px-3 py-2 font-sans text-xs text-highlighted placeholder:text-muted focus:border-primary focus:outline-none resize-y"
          />
        </div>

        <!-- Privacy Consent -->
        <div class="flex items-start gap-2 pt-1">
          <input
            id="privacyConsent"
            v-model="form.privacyConsent"
            type="checkbox"
            required
            class="mt-0.5 rounded-xs border-default bg-elevated/40 text-primary focus:ring-0"
          >
          <label for="privacyConsent" class="font-sans text-xs text-muted leading-relaxed">
            By submitting this form, you agree that the information provided may be used to respond to your enquiry. Do not submit passwords, private signing keys, API secrets, access tokens, or confidential firmware binaries.
          </label>
        </div>

        <!-- Submit Button -->
        <div class="pt-2">
          <UButton
            type="submit"
            color="primary"
            variant="solid"
            size="md"
            :disabled="isSubmitting || !form.privacyConsent"
            class="rounded-xs font-mono text-xs font-bold"
          >
            <UIcon v-if="isSubmitting" name="i-lucide-loader-2" class="h-4 w-4 animate-spin" />
            <span>{{ isSubmitting ? 'Sending Message...' : 'Send Message' }}</span>
          </UButton>
        </div>
      </form>
    </div>
  </section>
</template>
