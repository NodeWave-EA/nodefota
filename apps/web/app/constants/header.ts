import type { ButtonProps } from '@nuxt/ui'

export const navLinks: ButtonProps[] = [
  {
    label: 'Home',
    to: '/',
    icon: 'i-line-md-home',
  },
  {
    label: 'Features',
    icon: 'i-lucide-layers',
    to: '/features',
  },
  {
    label: 'Security',
    icon: 'i-lucide-shield-check',
    to: '/security',
  },
  {
    label: 'Integrations',
    icon: 'i-lucide-plug',
    to: '/integrations',
  },
  {
    label: 'About',
    icon: 'i-lucide-info',
    to: '/about',
  },
  {
    label: 'Contact',
    icon: 'i-lucide-lifebuoy',
    to: '/contact',
  },
  // {
  //   label: 'Docs',
  //   icon: 'i-lucide-book-open',
  //   to: '/docs',
  // },
]
