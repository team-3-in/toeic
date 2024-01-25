import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CredentialProps } from '../auth.interface';

export class UserCredential implements CredentialProps {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  toCredentials(): CredentialProps {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
