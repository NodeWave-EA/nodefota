import type { NestExpressApplication } from '@nestjs/platform-express'
import process from 'node:process'
import { VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule, ObserveInstrument } from '#app/app.module.js'
import { LoggerService } from '#logger/logger.service.js'

const logger = new LoggerService()
logger.setContext('Bootstrap')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new LoggerService(),
    bufferLogs: true,
    instrument: ObserveInstrument,
  })
  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('PORT') as number
  const HOST = configService.get<string>('HOST') as string

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  })

  const swaggerConfig = new DocumentBuilder()
    .setTitle('FOTA API')
    .setDescription('Firmware Over The Air platform API')
    .setVersion('1.0')
    .build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/', app, swaggerDocument)

  app.enableShutdownHooks()

  await app.listen(PORT, HOST)
  return { PORT, HOST }
}

bootstrap()
  .then(({ PORT, HOST }) => {
    logger.info(`Server is running on http://${HOST}:${PORT}`)
  })
  .catch((error) => {
    logger.error('Error starting the server', error)
    process.exit(1)
  })
