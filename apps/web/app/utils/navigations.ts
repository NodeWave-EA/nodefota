import type { ButtonProps, NavigationMenuItem } from '@nuxt/ui'

import type { NuxtLinkProps } from '#app'

export const HEADER_NAVIGATION = ref<NavigationMenuItem[]>([
  {
    label: 'Home',
    icon: 'i-line-md-home-simple-twotone',
    to: '/',
  },
  {
    label: 'Docs',
    icon: 'i-tabler-book-filled',
    to: '/docs',
  },
  {
    label: 'Blog',
    icon: 'i-line-md-text-box-multiple-twotone',
    to: '/blog',
  },
  {
    label: 'Support',
    icon: 'i-tabler-lifebuoy',
    to: '/support',
  },
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
    icon: 'i-line-md-twitter-x',
    color: 'neutral',
    variant: 'ghost',
    to: 'https://x.com/nodewave-ea',
    target: '_blank',
  },
  {
    icon: 'i-line-md-tiktok',
    color: 'neutral',
    variant: 'ghost',
    to: 'https://www.tiktok.com/@nodewave-ea',
    target: '_blank',
  },
  {
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
