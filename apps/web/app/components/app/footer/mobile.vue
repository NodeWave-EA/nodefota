<script setup lang="ts">
defineOptions({
  name: 'AppFooterMobile',
})
</script>

<template>
  <div class="flex w-full flex-col gap-px bg-border lg:hidden">
    <AppFooterBrand orientation="vertical" />
    <AppFooterLinks />
  </div>
</template>
