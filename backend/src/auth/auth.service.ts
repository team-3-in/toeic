import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Session, User, UserResponse } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import { CredentialProps } from './auth.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly supabaseService: SupabaseService) {}

  async signInWith(credentials: CredentialProps): Promise<Session> {
    const { data, error } =
      await this.supabaseService.client.auth.signInWithPassword(credentials);
    this.supabaseService.fail(error);
    return data.session;
  }

  async signUpWith(credentials: CredentialProps): Promise<void> {
    const { data, error } =
      await this.supabaseService.client.auth.signUp(credentials);
    this.supabaseService.fail(error);
    if (this.checkUserRole(data.user) === '') {
      throw new UnauthorizedException('User already registered');
    }
  }

  checkUserRole(user: User): string {
    return user.role;
  }

  getCurrentUser(): Promise<UserResponse> {
    return this.supabaseService.client.auth.getUser();
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabaseService.client.auth.signOut();
    this.supabaseService.fail(error);
  }
}
