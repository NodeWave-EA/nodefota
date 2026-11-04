import type { PrismaService } from '#prisma/prisma.service.js'
import { Injectable } from '@nestjs/common'

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
