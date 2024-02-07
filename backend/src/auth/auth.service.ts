import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserResponse } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import { CredentialProps } from './auth.interface';
import { AuthResponse } from './dto/res-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async signInWith(credentials: CredentialProps): Promise<AuthResponse> {
    const { data, error } =
      await this.supabaseService.client.auth.signInWithPassword(credentials);
    this.supabaseService.authFail(error);
    return new AuthResponse(data.session, credentials.email);
  }

  async signUpWith(credentials: CredentialProps): Promise<void> {
    const { data, error } =
      await this.supabaseService.client.auth.signUp(credentials);
    this.supabaseService.authFail(error);
    if (this.checkUserRole(data.user) === '') {
      throw new UnauthorizedException('User already registered');
    }
  }

  async refreshSession(
    refreshToken: string,
    accessToken: string,
  ): Promise<AuthResponse> {
    const { data, error } = await this.supabaseService.client.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    });
    this.supabaseService.authFail(error);
    return new AuthResponse(data.session);
  }

  checkUserRole(user: User): string {
    return user.role;
  }

  getCurrentUser(): Promise<UserResponse> {
    return this.supabaseService.client.auth.getUser();
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabaseService.client.auth.signOut();
    this.supabaseService.authFail(error);
  }
}
