import { Injectable } from '@nestjs/common'
import { PrismaService } from '#prisma/prisma.service.js'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) { }
  async signIn() {
    return this.prisma.user.findFirst()
  }

  async signUp() {
    return 'User signed up successfully'
  }
}
