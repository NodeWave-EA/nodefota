import type { NestExpressApplication } from '@nestjs/platform-express'
import process from 'node:process'
import { VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { json, urlencoded } from 'express'
import { AppModule, ObserveInstrument } from '#app/app.module.js'
import { LoggerService } from '#modules/logger/logger.service.js'

const logger = new LoggerService()
logger.setContext('Bootstrap')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new LoggerService(),
    bufferLogs: true,
    instrument: ObserveInstrument,
  })

  // Set up global validation pipe
  app.useGlobalPipes()

  // Set up global exception filter
  app.useGlobalFilters()

  // Set up global interceptors
  app.useGlobalInterceptors()

  // Set up global guards
  app.useGlobalGuards()

  //  ConfigService
  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('PORT') as number
  const HOST = configService.get<string>('HOST') as string
  const allowedOrigins = configService.get<string>('ALLOWED_ORIGINS')?.split(',') || []

  // Set up global prefix for all routes
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  })

  app.use(json({ limit: '20mb' }))
  app.use(urlencoded({ extended: true, limit: '20mb' }))

  // Enable CORS with allowed origins
  app.enableCors({
    origin: process.env.NODE_ENV === 'production'
      ? allowedOrigins
      : '*',
    credentials: true,
    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })

  // Swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('FOTA API')
    .setDescription('Firmware Over The Air platform API')
    .setVersion('1.0')
    .setContact('FOTA Team', 'https://nodewave.net', 'info@nodewave.net')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer(`http://${HOST}:${PORT}`, 'Server')
    .build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/', app, swaggerDocument, {
    swaggerOptions: {
      persistAuthorization: true,
      deepLinking: true,
      defaultModelsExpandDepth: -1,
    },
  })

  // Enable shutdown hooks for graceful shutdown
  app.enableShutdownHooks()

  // Start the server
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
