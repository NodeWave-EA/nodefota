import type { Request } from 'express'
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { LoggerService } from '#modules/logger/logger.service.js'
import { AuthService } from './auth.service.js'
import { ForgotPasswordDto } from './dto/forgot-password.dto.js'
import { RefreshTokenDto } from './dto/refresh-token.dto.js'
import { ResendVerificationDto } from './dto/resend-verification.dto.js'
import { SigninDto } from './dto/signin.dto.js'
import { SignupDto } from './dto/signup.dto.js'
import { SupabaseAuthGuard } from './guards/supabase-auth.guard.js'

const logger = new LoggerService('AuthController')

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user with email verification support' })
  async signUp(@Body() signupDto: SignupDto) {
    logger.info('User signing up', { email: signupDto.email })
    return this.authService.signUp(signupDto)
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in a user with email and password' })
  async signIn(@Body() signinDto: SigninDto) {
    return this.authService.signIn(signinDto)
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto)
  }

  @Post('signout')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign out user' })
  async signOut(@Req() req: Request) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : undefined
    return this.authService.signOut(token)
  }

  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resend email verification link' })
  async resendVerification(@Body() dto: ResendVerificationDto) {
    return this.authService.resendVerificationEmail(dto)
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send password reset email' })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto)
  }

  @Get('me')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  async getProfile(@Req() req: any) {
    return this.authService.getProfile(req.user.id)
  }
}
