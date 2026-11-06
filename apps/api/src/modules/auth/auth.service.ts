import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { LoggerService } from '#modules/logger/logger.service.js'
import { PrismaService } from '#modules/prisma/prisma.service.js'
import { SupabaseService } from '#modules/supabase/supabase.service.js'
import { ForgotPasswordDto } from './dto/forgot-password.dto.js'
import { RefreshTokenDto } from './dto/refresh-token.dto.js'
import { ResendVerificationDto } from './dto/resend-verification.dto.js'
import { SigninDto } from './dto/signin.dto.js'
import { SignupDto } from './dto/signup.dto.js'

const logger = new LoggerService('AuthService')

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly prismaService: PrismaService,
  ) {}

  /**
   * Synchronizes Supabase auth user into Prisma User database model
   */
  private async syncUserToPrisma(
    supabaseUser: any,
    metadata?: { first_name?: string, last_name?: string },
  ) {
    const emailConfirmedAt = supabaseUser.email_confirmed_at
      ? new Date(supabaseUser.email_confirmed_at)
      : null
    const isConfirmed = !!emailConfirmedAt || !!supabaseUser.confirmed_at

    return await this.prismaService.user.upsert({
      where: { email: supabaseUser.email! },
      update: {
        email_confirmed: isConfirmed,
        email_confirmed_at: emailConfirmedAt,
        first_name: metadata?.first_name ?? supabaseUser.user_metadata?.first_name,
        last_name: metadata?.last_name ?? supabaseUser.user_metadata?.last_name,
        updatedAt: new Date(),
      },
      create: {
        id: supabaseUser.id,
        email: supabaseUser.email!,
        password: '[SUPABASE_MANAGED]',
        first_name: metadata?.first_name ?? supabaseUser.user_metadata?.first_name ?? null,
        last_name: metadata?.last_name ?? supabaseUser.user_metadata?.last_name ?? null,
        email_confirmed: isConfirmed,
        email_confirmed_at: emailConfirmedAt,
        provider: 'supabase',
        provider_id: supabaseUser.id,
        provider_email: supabaseUser.email,
      },
    })
  }

  /**
   * Signup user via Supabase and synchronize profile to Prisma
   */
  async signUp(dto: SignupDto) {
    const supabaseClient = this.supabaseService.getClient()

    logger.info('Signing up user with Supabase', { email: dto.email })

    const { data, error } = await supabaseClient.auth.signUp({
      email: dto.email,
      password: dto.password,
      options: {
        data: {
          first_name: dto.first_name,
          last_name: dto.last_name,
        },
      },
    })

    if (error) {
      logger.error('Error signing up user:', error)
      throw new BadRequestException(`Sign up failed: ${error.message}`)
    }
    logger.info('User data returned from Supabase during sign up', { user: data.user })

    if (!data.user) {
      logger.error('No user data returned from Supabase during sign up')
      throw new InternalServerErrorException('Failed to create user account')
    }

    const prismaUser = await this.syncUserToPrisma(data.user, {
      first_name: dto.first_name,
      last_name: dto.last_name,
    })

    logger.log(`User signed up successfully: ${data.user.email}`)

    return {
      message: data.session
        ? 'User registered and signed in successfully.'
        : 'User registered successfully. Please check your email for confirmation.',
      user: prismaUser,
      session: data.session
        ? {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            token_type: data.session.token_type,
            expires_in: data.session.expires_in,
            expires_at: data.session.expires_at,
          }
        : null,
    }
  }

  /**
   * Sign in user via Supabase and update Prisma confirmation status
   */
  async signIn(dto: SigninDto) {
    const supabaseClient = this.supabaseService.getClient()

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: dto.email,
      password: dto.password,
    })

    if (error) {
      logger.error(`Sign in error for email ${dto.email}:`, error)
      throw new UnauthorizedException(`Authentication failed: ${error.message}`)
    }

    if (!data.user || !data.session) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const prismaUser = await this.syncUserToPrisma(data.user)

    logger.log(`User signed in successfully: ${dto.email}`)

    return {
      message: 'Signed in successfully',
      user: prismaUser,
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        token_type: data.session.token_type,
        expires_in: data.session.expires_in,
        expires_at: data.session.expires_at,
      },
    }
  }

  /**
   * Refresh session tokens using refresh token
   */
  async refreshToken(dto: RefreshTokenDto) {
    const supabaseClient = this.supabaseService.getClient()

    const { data, error } = await supabaseClient.auth.refreshSession({
      refresh_token: dto.refresh_token,
    })

    if (error) {
      logger.error('Error refreshing token:', error)
      throw new UnauthorizedException(`Token refresh failed: ${error.message}`)
    }

    if (!data.session) {
      throw new UnauthorizedException('Invalid or expired refresh token')
    }

    if (data.user) {
      await this.syncUserToPrisma(data.user)
    }

    return {
      message: 'Token refreshed successfully',
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        token_type: data.session.token_type,
        expires_in: data.session.expires_in,
        expires_at: data.session.expires_at,
      },
    }
  }

  /**
   * Sign out user in Supabase
   */
  async signOut(accessToken?: string) {
    const supabaseClient = this.supabaseService.getClient(accessToken)

    const { error } = await supabaseClient.auth.signOut()

    if (error) {
      logger.error('Error signing out:', error)
      throw new BadRequestException(`Sign out failed: ${error.message}`)
    }

    return { message: 'Signed out successfully' }
  }

  /**
   * Resend signup email verification
   */
  async resendVerificationEmail(dto: ResendVerificationDto) {
    const supabaseClient = this.supabaseService.getClient()

    const { error } = await supabaseClient.auth.resend({
      type: 'signup',
      email: dto.email,
    })

    if (error) {
      logger.error(`Error resending verification email to ${dto.email}:`, error)
      throw new BadRequestException(`Failed to resend verification email: ${error.message}`)
    }

    return { message: 'Verification email resent successfully' }
  }

  /**
   * Send password reset email
   */
  async forgotPassword(dto: ForgotPasswordDto) {
    const supabaseClient = this.supabaseService.getClient()

    const { error } = await supabaseClient.auth.resetPasswordForEmail(dto.email)

    if (error) {
      logger.error(`Error requesting password reset for ${dto.email}:`, error)
      throw new BadRequestException(`Failed to send password reset email: ${error.message}`)
    }

    return { message: 'Password reset email sent successfully' }
  }

  /**
   * Get user profile from Prisma database
   */
  async getProfile(userId: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { id: userId },
          { provider_id: userId },
        ],
      },
    })

    if (!user) {
      throw new BadRequestException('User profile not found')
    }

    return user
  }
}
