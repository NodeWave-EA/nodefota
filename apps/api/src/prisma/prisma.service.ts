import type { OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import type { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '#generated/prisma/client.js'
import { LoggerService } from '#logger/logger.service.js'

const logger = new LoggerService('PrismaService')

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(configService: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: configService.get<string>('DATABASE_URL'),
    })
    super({ adapter })
  }

  async onModuleDestroy() {
    logger.info('Disconnecting from the database...')
    await this.$connect()
  }

  async onModuleInit() {
    logger.info('Connecting to the database...')
    await this.$disconnect()
  }
}
