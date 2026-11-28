import type { ButtonProps } from '@nuxt/ui'
import { siteConfig } from '~/app.meta'

export interface FooterLinkGroup {
  title: string
  links: Array<ButtonProps & { external?: boolean }>
}

export const footerBrand = {
  name: 'NodeFOTA - Secure FOTA Platform',
  description:
    'A security-focused firmware lifecycle management platform for IoT devices. Secure firmware distribution, manage device fleets, orchestrate OTA deployments, and monitor device update operations.',
  taglineLabel: 'OTA LIFECYCLE',
  tagline: 'Built for secure and reliable IoT firmware management.',
  copyrightOwner: 'NodeFOTA // Secure FOTA Platform',
} as const

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: 'Platform',
    links: [
      {
        label: 'Overview',
        to: '/',
        icon: 'i-lucide-layout-grid',
      },
      {
        label: 'Features',
        to: '/features',
        icon: 'i-lucide-layers',
      },
      {
        label: 'Security',
        to: '/security',
        icon: 'i-lucide-shield-check',
      },
      {
        label: 'Integrations',
        to: '/integrations',
        icon: 'i-lucide-plug',
      },
      {
        label: 'Architecture',
        to: '/#architecture',
        icon: 'i-lucide-cpu',
      },
    ],
  },
  {
    title: 'Developers',
    links: [
      {
        label: 'Documentation',
        to: '/docs',
        icon: 'i-lucide-book-open',
      },
      {
        label: 'API Reference',
        to: '/api/docs',
        icon: 'i-lucide-terminal',
      },
      {
        label: 'ESP32 Integration',
        to: '/docs/integration#esp32',
        icon: 'i-lucide-microchip',
      },
      {
        label: 'ESP8266 Integration',
        to: '/docs/integration#esp8266',
        icon: 'i-lucide-circuit-board',
      },
      {
        label: 'Firmware Workflow',
        to: '/#workflow',
        icon: 'i-lucide-git-branch',
      },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        label: 'Technical Guides',
        to: '/docs/guides',
        icon: 'i-lucide-file-code-2',
      },
      {
        label: 'FAQ',
        to: '/#faq',
        icon: 'i-lucide-circle-help',
      },
      {
        label: 'About',
        to: '/about',
        icon: 'i-lucide-info',
      },
      {
        label: 'Contact Support',
        to: '/contact',
        icon: 'i-lucide-lifebuoy',
      },
      {
        label: 'System Status',
        to: 'https://status.nodewave.net',
        icon: 'i-lucide-activity',
        target: '_blank',
        external: true,
      },
    ],
  },
  {
    title: 'Account',
    links: [
      {
        label: 'Sign In',
        to: '/auth/login',
        icon: 'i-lucide-log-in',
      },
      {
        label: 'Create Account',
        to: '/auth/register',
        icon: 'i-lucide-user-plus',
      },
      {
        label: 'Nodewave HQ',
        to: siteConfig.company.website || 'https://nodewave.net',
        icon: 'i-lucide-globe',
        target: '_blank',
        external: true,
      },
    ],
  },
]

export const footerSocials: ButtonProps[] = [
  {
    label: 'GitHub',
    icon: 'i-line-md-github-loop',
    color: 'neutral',
    variant: 'ghost',
    size: 'sm',
    to: siteConfig.social.github,
    target: '_blank',
  },
  {
    label: 'Twitter X',
    icon: 'i-line-md-twitter-x',
    color: 'neutral',
    variant: 'ghost',
    size: 'sm',
    to: 'https://x.com/nodewave-ea',
    target: '_blank',
  },
  {
    label: 'TikTok',
    icon: 'i-line-md-tiktok',
    color: 'neutral',
    variant: 'ghost',
    size: 'sm',
    to: 'https://www.tiktok.com/@nodewave-ea',
    target: '_blank',
  },
  {
    label: 'LinkedIn',
    icon: 'i-line-md-linkedin',
    color: 'neutral',
    variant: 'ghost',
    size: 'sm',
    to: 'https://www.linkedin.com/company/nodewave-ea',
    target: '_blank',
  },
]
