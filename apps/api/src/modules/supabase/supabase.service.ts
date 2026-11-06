import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

@Injectable()
export class SupabaseService {
  private readonly supabaseUrl: string
  private readonly supabasePublishableKey: string
  private readonly supabaseSecretKey: string

  constructor(private readonly configService: ConfigService) {
    this.supabaseUrl = this.configService.get<string>('SUPABASE_URL') as string
    this.supabasePublishableKey = (
      this.configService.get<string>('SUPABASE_ANON_KEY')
      || this.configService.get<string>('ANON_KEY')
      || this.configService.get<string>('SUPABASE_PUBLISHABLE_KEY')
    ) as string
    this.supabaseSecretKey = (
      this.configService.get<string>('SERVICE_ROLE_KEY')
      || this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY')
      || this.configService.get<string>('SUPABASE_SECRET_KEY')
    ) as string
  }

  /**
   * Standard client: Accepts optional token for authenticated client calls
   */
  getClient(accessToken?: string): SupabaseClient {
    return createClient(this.supabaseUrl, this.supabasePublishableKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        ...(accessToken && {
          global: {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        }),
      },
    })
  }

  /**
   * Admin client: Bypasses RLS using secret/service role key
   */
  getAdminClient(): SupabaseClient {
    return createClient(this.supabaseUrl, this.supabaseSecretKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  }
}
