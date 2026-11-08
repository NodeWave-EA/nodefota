<script setup lang="ts">
import { FOOTER_NAVIGATION, FOOTER_SOCIALS } from '~/utils/navigations.ts'

defineOptions({
  name: 'AppFooter',
})
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">
        Copyright © {{ new Date().getFullYear() }}
      </p>
    </template>

    <UNavigationMenu :items="FOOTER_NAVIGATION" variant="link" />

    <template #right>
      <template
        v-for="social in FOOTER_SOCIALS"
        :key="social.label"
      >
        <UButton
          v-bind="social"
        />
      </template>
    </template>
  </UFooter>
</template>

<style scoped>

</style>
