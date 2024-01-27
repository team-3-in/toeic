import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AuthToken {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '리프레시 토큰 값입니다.',
    required: true,
  })
  refreshToken: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '액세스 토큰 값입니다.',
    required: true,
  })
  accessToken: string;
}
