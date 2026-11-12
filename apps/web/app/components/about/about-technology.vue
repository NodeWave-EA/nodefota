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
  <section class="flex flex-col gap-4 py-6">
    <div class="flex flex-col gap-1">
      <span class="font-mono text-xs font-bold text-primary uppercase">04 // ARCHITECTURE</span>
      <h2 class="font-sans text-2xl font-bold text-highlighted">
        Technology & Engineering Stack
      </h2>
    </div>

    <div class="-mx-4 flex flex-col overflow-hidden border-y border-default bg-default sm:mx-0 sm:rounded-xs sm:border">
      <div class="grid grid-cols-1 gap-px bg-border/20 sm:grid-cols-2 lg:grid-cols-2">
        <div
          v-for="item in techStack"
          :key="item.area"
          class="flex flex-col justify-between gap-1 bg-default p-4 transition-colors hover:bg-elevated/40 sm:flex-row sm:items-center"
        >
          <span class="font-mono text-xs font-bold text-primary uppercase">{{ item.area }}</span>
          <span class="font-mono text-xs font-semibold text-highlighted">{{ item.tech }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
