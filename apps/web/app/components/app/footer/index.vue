<script setup lang="ts">
defineOptions({
  name: 'AppFooter',
})
</script>

<template>
  <UFooter
    :ui="{
      root: 'w-full border-t border-default bg-default transition-colors duration-300',
      top: 'border-b border-default py-0 lg:py-12',
      bottom: 'py-4 sm:py-6',
    }"
  >
    <template #top>
      <UContainer
        :ui="{
          base: 'w-full max-w-(--ui-container) mx-auto px-0 lg:px-8',
        }"
      >
        <AppFooterDesktop />
        <AppFooterMobile />
      </UContainer>
    </template>

    <template #default>
      <UContainer
        :ui="{
          base: 'w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8',
        }"
      >
        <AppFooterButton />
      </UContainer>
    </template>
  </UFooter>
</template>
