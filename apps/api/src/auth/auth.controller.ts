import type { AuthService } from './auth.service.js'
import { Controller, Get } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Signs in a user.
   * @returns A promise that resolves to the signed-in user.
   */
  @Get('signin')
  async signIn() {
    return this.authService.signIn()
  }

  /**
   * Signs up a user.
   * @returns A promise that resolves to the signed-up user.
   */
  @Get('signup')
  async signUp() {
    return this.authService.signUp()
  }
}
