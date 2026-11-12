export type IntegrationStatus = 'implemented' | 'supported' | 'planned' | 'not-supported'

export interface IntegrationItem {
  id: string
  name: string
  eyebrow: string
  category: string
  description: string
  status: IntegrationStatus
  statusLabel: string
  methodOrTech?: string
  icon: string
  iconColor?: string
  highlight?: 'amber' | 'emerald' | 'teal' | 'purple'
  details?: string[]
}

export interface FAQItem {
  question: string
  answer: string
}
