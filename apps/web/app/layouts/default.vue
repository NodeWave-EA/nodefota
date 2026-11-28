<template>
  <div class="min-h-screen flex flex-col bg-default text-default">
    <AppHeader />

    <UMain class="flex-1">
      <slot />
    </UMain>

    <LazyAppLangSwitcher hydrate-on-idle />
    <AppFooter />
  </div>
</template>
