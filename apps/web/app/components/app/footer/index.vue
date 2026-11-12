<script setup lang="ts">
import { computed } from 'vue'
import { FOOTER_SOCIALS } from '~/utils/navigations'

defineOptions({
  name: 'AppFooter',
})

const route = useRoute()

interface FooterRouteLink {
  label: string
  to: string
  active: boolean
}

interface FooterNavGroup {
  label: string
  children: FooterRouteLink[]
}

const footerBrand = {
  name: 'NodeFOTA - Secure FOTA Platform',
  description:
    'A security-focused firmware lifecycle management platform for IoT devices. Secure firmware distribution, manage device fleets, orchestrate OTA deployments, and monitor device update operations.',
  taglineLabel: 'OTA LIFECYCLE',
  tagline: 'Built for secure and reliable IoT firmware management.',
  copyrightOwner: 'Secure FOTA Platform',
}

function isLinkActive(target: string): boolean {
  const [rawPath, rawHash] = target.split('#')
  const targetPath = rawPath || '/'
  const targetHash = rawHash
    ? `#${rawHash}`
    : ''

  if (targetPath === '/' && !targetHash) {
    return route.path === '/' && !route.hash
  }

  if (targetHash) {
    return route.path === targetPath && route.hash === targetHash
  }

  return route.path === targetPath || route.path.startsWith(`${targetPath}/`)
}

const footerGroups = computed<FooterNavGroup[]>(() => [
  {
    label: 'Platform',
    children: [
      {
        label: 'Overview',
        to: '/',
        active: isLinkActive('/'),
      },
      {
        label: 'Features',
        to: '/features',
        active: isLinkActive('/features'),
      },
      {
        label: 'Security',
        to: '/security',
        active: isLinkActive('/security'),
      },
      {
        label: 'Device Compatibility',
        to: '/docs/integration',
        active: isLinkActive('/docs/integration'),
      },
      {
        label: 'Architecture',
        to: '/#architecture',
        active: isLinkActive('/#architecture'),
      },
    ],
  },
  {
    label: 'Developers',
    children: [
      {
        label: 'Documentation',
        to: '/docs',
        active: isLinkActive('/docs'),
      },
      {
        label: 'API Reference',
        to: '/api/docs',
        active: isLinkActive('/api/docs'),
      },
      {
        label: 'ESP32 Integration',
        to: '/docs/integration#esp32',
        active: isLinkActive('/docs/integration#esp32'),
      },
      {
        label: 'ESP8266 Integration',
        to: '/docs/integration#esp8266',
        active: isLinkActive('/docs/integration#esp8266'),
      },
      {
        label: 'Firmware Updates',
        to: '/#workflow',
        active: isLinkActive('/#workflow'),
      },
    ],
  },
  {
    label: 'Resources',
    children: [
      {
        label: 'Technical Guides',
        to: '/docs/guides',
        active: isLinkActive('/docs/guides'),
      },
      {
        label: 'FAQ',
        to: '/#faq',
        active: isLinkActive('/#faq'),
      },
      {
        label: 'Blog',
        to: '/blog',
        active: isLinkActive('/blog'),
      },
      {
        label: 'Contact Support',
        to: '/contact',
        active: isLinkActive('/contact'),
      },
    ],
  },
  {
    label: 'Account',
    children: [
      {
        label: 'Sign In',
        to: '/login',
        active: isLinkActive('/login'),
      },
      {
        label: 'Create Account',
        to: '/register',
        active: isLinkActive('/register'),
      },
    ],
  },
])
</script>

<template>
  <UFooter
    :ui="{
      root: 'border-t border-default bg-default',
      top: 'border-b border-default py-0 sm:py-8 lg:py-12',
    }"
  >
    <template #top>
      <UContainer class="px-0 sm:px-6 lg:px-8">
        <div
          class="grid w-full grid-cols-1 gap-px bg-border sm:overflow-hidden sm:rounded-xs sm:border sm:border-default lg:grid-cols-12"
        >
          <div class="flex flex-col gap-px bg-border lg:col-span-4">
            <div class="flex flex-1 flex-col items-start gap-4 bg-default px-4 py-6 sm:p-6">
              <NuxtLink
                to="/"
                aria-label="NodeFOTA Home"
                class="inline-flex items-center rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <AppLogo
                  :width="148"
                  :height="60"
                  :title="footerBrand.name"
                />
              </NuxtLink>

              <p class="font-sans text-sm leading-relaxed text-muted">
                {{ footerBrand.description }}
              </p>
            </div>

            <div class="flex items-start gap-3 bg-elevated/50 px-4 py-4 sm:px-6">
              <div
                class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xs border border-default bg-default text-primary"
              >
                <UIcon name="i-lucide-shield-check" aria-hidden="true" class="h-3.5 w-3.5" />
              </div>

              <div class="flex flex-col gap-0.5">
                <span class="font-mono text-[10px] font-semibold tracking-wider text-primary uppercase">
                  {{ footerBrand.taglineLabel }}
                </span>
                <p class="font-sans text-xs font-medium leading-snug text-highlighted">
                  {{ footerBrand.tagline }}
                </p>
              </div>
            </div>
          </div>

          <div
            class="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4"
          >
            <nav
              v-for="group in footerGroups"
              :key="group.label"
              :aria-label="`${group.label} navigation`"
              class="flex flex-col gap-4 bg-default px-4 py-6 sm:p-6"
            >
              <h3 class="font-mono text-xs font-semibold tracking-wider text-highlighted uppercase">
                {{ group.label }}
              </h3>

              <ul class="flex flex-col gap-2.5">
                <li
                  v-for="link in group.children"
                  :key="link.label"
                >
                  <ULink
                    :to="link.to"
                    :active="link.active"
                    active-class="text-primary font-medium"
                    inactive-class="text-muted hover:text-highlighted"
                    class="inline-flex items-center gap-2 whitespace-nowrap rounded-xs font-sans text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span
                      v-if="link.active"
                      aria-hidden="true"
                      class="h-1.5 w-1.5 shrink-0 rounded-xs bg-primary"
                    />
                    <span>{{ link.label }}</span>
                  </ULink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </UContainer>
    </template>

    <template #left>
      <p class="font-sans text-xs text-muted sm:text-sm">
        © {{ new Date().getFullYear() }} {{ footerBrand.copyrightOwner }}. All rights reserved.
      </p>
    </template>

    <template #right>
      <div class="flex items-center gap-1.5">
        <UTooltip
          v-for="social in FOOTER_SOCIALS"
          :key="social.label"
          arrow
          :text="social.label"
        >
          <UButton
            :aria-label="social.label"
            :icon="social.icon"
            :color="social.color"
            :variant="social.variant"
            :to="social.to"
            :target="social.target"
            external
            rel="noopener noreferrer"
            class="rounded-xs"
          />
        </UTooltip>
      </div>
    </template>
  </UFooter>
</template>
