export type EnquiryCategory
  = | 'GENERAL'
    | 'TECHNICAL_SUPPORT'
    | 'DEVICE_INTEGRATION'
    | 'API_INTEGRATION'
    | 'DEPLOYMENT'
    | 'SECURITY_REPORT'
    | 'PARTNERSHIP'
    | 'OTHER'

export interface ContactFormPayload {
  name: string
  email: string
  organization?: string
  category: EnquiryCategory
  subject: string
  message: string
  technicalDetails?: {
    deviceModel?: string
    mcuPlatform?: string
    firmwareVersion?: string
    environment?: string
  }
  privacyConsent: boolean
}

export interface ContactOption {
  id: string
  eyebrow: string
  title: string
  description: string
  contactEmail?: string
  ctaLabel: string
  icon: string
  iconColor: string
  categoryKey: EnquiryCategory
}
