<script setup lang="ts">
defineOptions({
  name: 'AboutTechnology',
})

const techStack = [
  { area: 'Frontend', tech: 'Nuxt 4, Vue 3, Tailwind CSS v4, TypeScript' },
  { area: 'Backend', tech: 'NestJS, TypeScript, REST API v1' },
  { area: 'Database', tech: 'PostgreSQL, Prisma ORM' },
  { area: 'Auth & Storage Infrastructure', tech: 'Supabase Platform Stack' },
  { area: 'Object Storage', tech: 'MinIO, S3-Compatible Storage' },
  { area: 'Embedded Development', tech: 'C++, Arduino Framework' },
  { area: 'Supported Hardware', tech: 'ESP32, ESP32-S3, ESP8266' },
  { area: 'Cryptographic Foundations', tech: 'SHA-256, ECDSA P-256, Ed25519, RSA-SHA256' },
  { area: 'Device Identity', tech: 'Device JWT, X.509 PKI, mTLS' },
  { area: 'Infrastructure', tech: 'Docker Compose Self-Hosted' },
]
</script>

<template>
  <section aria-labelledby="about-tech-heading" class="flex flex-col gap-6">
    <div class="flex flex-col items-start gap-3">
      <UBadge color="primary" variant="subtle" size="sm" class="rounded-xs font-mono text-xs font-semibold uppercase">
        04 // ARCHITECTURE
      </UBadge>
      <h2 id="about-tech-heading" class="font-sans text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
        Technology & Engineering Stack
      </h2>
    </div>

    <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
      <div class="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
        <div
          v-for="item in techStack"
          :key="item.area"
          class="flex flex-col justify-between gap-1 bg-default p-4.5 transition-colors hover:bg-elevated/40 sm:flex-row sm:items-center sm:px-5"
        >
          <span class="font-mono text-xs font-bold text-primary uppercase">{{ item.area }}</span>
          <span class="font-mono text-xs font-semibold text-highlighted">{{ item.tech }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
