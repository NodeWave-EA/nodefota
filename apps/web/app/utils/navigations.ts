import type { ButtonProps, NavigationMenuItem } from '@nuxt/ui'
import type { NuxtLinkProps } from '#app'

export const HEADER_NAVIGATION = ref<NavigationMenuItem[]>([
  {
    label: 'Home',
    icon: 'i-lucide-home',
    to: '/',
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
  // {
  //   label: 'Contact',
  //   icon: 'i-lucide-lifebuoy',
  //   to: '/contact',
  // },
  // {
  //   label: 'Docs',
  //   icon: 'i-lucide-book-open',
  //   to: '/docs',
  // },
])

export const FOOTER_NAVIGATION = ref<NavigationMenuItem[]>([
  {
    label: 'NodewaveHQ',
    to: 'https://nodewave.net',
    external: true,
    target: '_blank',
  },
  {
    label: 'Status',
    to: 'https://status.nodewave.net',
    external: true,
    target: '_blank',
  },
])

export const FOOTER_SOCIALS = ref<ButtonProps[]>([
  {
    label: 'Twitter X',
    icon: 'i-line-md-twitter-x',
    color: 'neutral',
    variant: 'ghost',
    to: 'https://x.com/nodewave-ea',
    target: '_blank',
  },
  {
    label: 'TikTok',
    icon: 'i-line-md-tiktok',
    color: 'neutral',
    variant: 'ghost',
    to: 'https://www.tiktok.com/@nodewave-ea',
    target: '_blank',
  },
  {
    label: 'LinkedIn',
    icon: 'i-line-md-linkedin',
    color: 'neutral',
    variant: 'ghost',
    to: 'https://www.linkedin.com/company/nodewave-ea',
    target: '_blank',
  },
])

export const COMPANY = ref<NuxtLinkProps>({
  to: 'https://nodewave.net',
  external: true,
  target: '_blank',
})

export const GITHUB_REPO = ref<ButtonProps>({
  to: 'https://github.com/nodewave-ea',
  icon: 'i-line-md-github-twotone-loop',
  external: true,
  target: '_blank',
})

export const BLOG = ref<ButtonProps>({
  to: 'https://blog.nodewave.net',
  icon: 'i-line-md-blog',
  external: true,
  target: '_blank',
})
