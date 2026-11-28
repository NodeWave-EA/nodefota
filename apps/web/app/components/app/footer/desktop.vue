<script setup lang="ts">
defineOptions({
  name: 'AppFooterDesktop',
})
</script>

<template>
  <div class="hidden w-full flex-col gap-px overflow-hidden rounded-xs border border-default bg-border lg:flex">
    <AppFooterBrand orientation="horizontal" />
    <AppFooterLinks />
  </div>
</template>
