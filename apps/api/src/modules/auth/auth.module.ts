import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { PrismaModule } from '#modules/prisma/prisma.module.js'
import { SupabaseStrategy } from '#modules/supabase/strategies/supabase.strategy.js'
import { SupabaseModule } from '#modules/supabase/supabase.module.js'
import { AuthController } from './auth.controller.js'
import { AuthService } from './auth.service.js'
import { SupabaseAuthGuard } from './guards/supabase-auth.guard.js'

@Module({
  imports: [SupabaseModule, PrismaModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, SupabaseStrategy, SupabaseAuthGuard],
  exports: [AuthService, SupabaseAuthGuard],
})
export class AuthModule {}
