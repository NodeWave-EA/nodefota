import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class RefreshTokenDto {
  @ApiProperty({ description: 'Supabase refresh token' })
  @IsNotEmpty({ message: 'Refresh token is required' })
  @IsString()
  refresh_token: string
}
