<template>
  <div class="min-h-screen flex flex-col">
    <ClientOnly>
      <AppHeader />
      <template #fallback>
        <header class="h-16 border-b border-border bg-background" />
      </template>
    </ClientOnly>

    <UMain class="flex-1">
      <slot />
    </UMain>

    <ClientOnly>
      <AppFooter />
    </ClientOnly>
  </div>
</template>
