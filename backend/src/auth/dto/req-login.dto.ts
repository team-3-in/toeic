import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginCredentials } from '../auth.interface';

export class LoginUser {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  toCredentials(): LoginCredentials {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
