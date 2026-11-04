import process from 'node:process'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { createObserveModule } from '@nestjs/observe'
import { AppController } from '#app/app.controller.js'
import { AppService } from '#app/app.service.js'
import { AuthModule } from '#auth/auth.module.js'
import { LoggerModule } from '#logger/logger.module.js'
import { PrismaModule } from '#prisma/prisma.module.js'

export const { ObserveModule, ObserveInstrument } = createObserveModule()
const { OBSERVE_APP_KEY, OBSERVE_APP_SECRET } = process.env

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: OBSERVE_APP_KEY,
      appSecret: OBSERVE_APP_SECRET,
      serviceId: 'api',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
    }),
    LoggerModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
