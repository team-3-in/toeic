import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CredentialProps } from '../auth.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UserCredential implements CredentialProps {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '유저의 email 입니다',
    required: true,
    example: 'example@domain.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: '유저의 password 입니다',
    required: true,
    example: 'password',
  })
  password: string;

  toCredentials(): CredentialProps {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
