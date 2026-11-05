import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service.js'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Signs in a user.
   * @returns A promise that resolves to the signed-in user.
   */
  @Get('signin')
  @ApiOperation({ summary: 'Sign in a user' })
  async signIn() {
    return this.authService.signIn()
  }

  /**
   * Signs up a user.
   * @returns A promise that resolves to the signed-up user.
   */
  @Get('signup')
  @ApiOperation({ summary: 'Sign up a user' })
  async signUp() {
    return this.authService.signUp()
  }
}
