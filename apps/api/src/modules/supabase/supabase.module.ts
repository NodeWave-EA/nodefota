import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SupabaseStrategy } from './strategies/supabase.strategy.js'
import { SupabaseService } from './supabase.service.js'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [SupabaseService, SupabaseStrategy],
  exports: [SupabaseService],
})
export class SupabaseModule {}
