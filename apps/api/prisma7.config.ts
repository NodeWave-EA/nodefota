import process from 'node:process'
import { defineConfig, env } from 'prisma/config'
import 'dotenv/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
    ...(process.env.SHADOW_DATABASE_URL
      ? {
          shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
        }
      : {}),
  },
})
