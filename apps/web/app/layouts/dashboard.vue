<script setup lang="ts">
import type { CommandPaletteGroup, CommandPaletteItem, DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'
import { useAuthActions } from '~/composables/auth/use-auth-actions'
import { useAuthSession } from '~/composables/auth/use-auth-session'

const route = useRoute()
const { user } = useAuthSession()
const { signOut } = useAuthActions()

const open = ref(false)
const signingOut = ref(false)

async function handleSignOut() {
  signingOut.value = true
  try {
    await signOut()
  }
  finally {
    signingOut.value = false
  }
}

const primaryLinks = computed<NavigationMenuItem[][]>(() => [
  [
    {
      label: 'Fleet Overview',
      icon: 'i-lucide-layout-dashboard',
      to: '/dashboard',
      exact: true,
      onSelect: () => { open.value = false },
    },
    {
      label: 'Devices',
      icon: 'i-lucide-cpu',
      to: '/dashboard/devices',
      badge: '24',
      onSelect: () => { open.value = false },
    },
    {
      label: 'Firmware Vault',
      icon: 'i-lucide-package-check',
      to: '/dashboard/firmware',
      onSelect: () => { open.value = false },
    },
    {
      label: 'OTA Campaigns',
      icon: 'i-lucide-radio-tower',
      to: '/dashboard/campaigns',
      onSelect: () => { open.value = false },
    },
    {
      label: 'Device PKI & CA',
      icon: 'i-lucide-shield-check',
      to: '/dashboard/pki',
      onSelect: () => { open.value = false },
    },
    {
      label: 'Audit Logs',
      icon: 'i-lucide-scroll-text',
      to: '/dashboard/audit',
      onSelect: () => { open.value = false },
    },
  ],
  [
    {
      label: 'Settings',
      icon: 'i-lucide-settings',
      to: '/dashboard/settings',
      defaultOpen: route.path.startsWith('/dashboard/settings'),
      children: [
        {
          label: 'General',
          to: '/dashboard/settings',
          exact: true,
          onSelect: () => { open.value = false },
        },
        {
          label: 'API Keys & Tokens',
          to: '/dashboard/settings/tokens',
          onSelect: () => { open.value = false },
        },
        {
          label: 'Signing Keys',
          to: '/dashboard/settings/keys',
          onSelect: () => { open.value = false },
        },
      ],
    },
  ],
])

const footerLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Documentation',
    icon: 'i-lucide-book-open',
    to: '/docs',
  },
  {
    label: 'Back to Site',
    icon: 'i-lucide-arrow-up-right',
    to: '/',
  },
])

function toCommandItems(items: NavigationMenuItem[]): CommandPaletteItem[] {
  return items.flatMap((item): CommandPaletteItem[] => {
    const base: CommandPaletteItem = {
      label: item.label,
      icon: item.icon,
      to: item.to,
      onSelect: item.onSelect,
      ...(typeof item.chip === 'object'
        ? { chip: item.chip }
        : {}),
    }

    if (item.children?.length) {
      return [
        base,
        ...item.children.map((child): CommandPaletteItem => ({
          label: `${item.label} › ${child.label}`,
          icon: child.icon ?? item.icon,
          to: child.to,
          onSelect: child.onSelect,
          ...(typeof child.chip === 'object'
            ? { chip: child.chip }
            : {}),
        })),
      ]
    }

    return [base]
  })
}

const searchGroups = computed<CommandPaletteGroup<CommandPaletteItem>[]>(() => [
  {
    id: 'navigation',
    label: 'Control Plane',
    items: toCommandItems(primaryLinks.value.flat()),
  },
  {
    id: 'resources',
    label: 'Resources',
    items: toCommandItems(footerLinks.value),
  },
])

const operatorDisplayName = computed(() => {
  const meta = user.value?.user_metadata as Record<string, unknown> | undefined
  if (typeof meta?.full_name === 'string' && meta.full_name.trim()) {
    return meta.full_name
  }
  return user.value?.email?.split('@')[0] || 'Operator'
})

const userMenuItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      type: 'label',
      label: operatorDisplayName.value,
      description: user.value?.email || 'Authenticated Session',
      icon: 'i-lucide-shield-user',
    },
  ],
  [
    {
      label: 'Account Settings',
      icon: 'i-lucide-settings',
      to: '/dashboard/settings',
    },
    {
      label: 'API Keys & Tokens',
      icon: 'i-lucide-key-round',
      to: '/dashboard/settings/tokens',
    },
  ],
  [
    {
      label: signingOut.value ? 'Signing Out...' : 'Sign Out',
      icon: 'i-lucide-log-out',
      color: 'error',
      disabled: signingOut.value,
      onSelect: handleSignOut,
    },
  ],
])
</script>

<template>
  <UDashboardGroup unit="rem" storage="local">
    <UDashboardSidebar
      id="nodefota-console"
      v-model:open="open"
      collapsible
      resizable
      :min-size="14"
      :default-size="17"
      :max-size="22"
      class="bg-elevated/30 border-r border-default"
      :ui="{
        header: 'border-b border-default px-3.5',
        footer: 'border-t border-default p-2.5',
      }"
    >
      <template #header="{ collapsed }">
        <NuxtLink
          to="/dashboard"
          aria-label="NODEFOTA Control Plane"
          class="flex min-w-0 items-center justify-center rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          :class="collapsed ? 'w-full' : 'gap-2.5'"
        >
          <AppLogo
            v-if="!collapsed"
            :width="118"
            :height="44"
            title="NODEFOTA Control Plane"
          />
          <AppIcon
            v-else
            :size="34"
            title="NODEFOTA Control Plane"
          />
        </NuxtLink>
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton
          :collapsed="collapsed"
          class="rounded-xs font-mono text-xs bg-default"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="primaryLinks[0]"
          orientation="vertical"
          tooltip
          popover
          :ui="{
            link: 'rounded-xs font-mono text-xs tracking-wide',
          }"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="primaryLinks[1]"
          orientation="vertical"
          tooltip
          popover
          :ui="{
            link: 'rounded-xs font-mono text-xs tracking-wide',
          }"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="footerLinks"
          orientation="vertical"
          tooltip
          class="mt-auto"
          :ui="{
            link: 'rounded-xs font-mono text-xs text-muted',
          }"
        />
      </template>

      <template #footer="{ collapsed }">
        <UDropdownMenu
          :items="userMenuItems"
          :content="{ align: 'center', collisionPadding: 12 }"
          :ui="{ content: collapsed ? 'w-56' : 'w-(--reka-dropdown-menu-trigger-width)' }"
        >
          <UButton
            color="neutral"
            variant="ghost"
            block
            :square="collapsed"
            class="justify-between rounded-xs px-2 py-2 text-left"
          >
            <div class="flex min-w-0 items-center gap-2.5">
              <UAvatar
                :alt="operatorDisplayName"
                :src="user?.user_metadata?.avatar_url"
                size="xs"
                class="shrink-0 rounded-xs bg-primary/15 font-mono font-bold text-primary"
              />
              <div v-if="!collapsed" class="flex min-w-0 flex-col">
                <span class="truncate font-mono text-xs font-bold text-highlighted">
                  {{ operatorDisplayName }}
                </span>
                <span class="truncate font-mono text-[10px] text-muted">
                  {{ user?.email }}
                </span>
              </div>
            </div>

            <UIcon
              v-if="!collapsed"
              name="i-lucide-chevrons-up-down"
              class="size-3.5 shrink-0 text-muted"
              aria-hidden="true"
            />
          </UButton>
        </UDropdownMenu>
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="searchGroups" />

    <slot />
  </UDashboardGroup>
</template>
