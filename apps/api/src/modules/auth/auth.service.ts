import { Injectable } from '@nestjs/common'
import { LoggerService } from '#modules/logger/logger.service.js'
import { PrismaService } from '#modules/prisma/prisma.service.js'

const logger = new LoggerService('AuthService')

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) { }
  async signIn() {
    logger.log('User signed in successfully')
    return 'User signed in successfully'
  }

  async signUp() {
    logger.log('User signed up successfully')
    return 'User signed up successfully'
  }
}
