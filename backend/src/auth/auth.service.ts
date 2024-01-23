import { Injectable } from '@nestjs/common';
import { Session, UserResponse } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import { LoginCredentials } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async signInWith(credentials: LoginCredentials): Promise<Session> {
    const { data, error } =
      await this.supabaseService.client.auth.signInWithPassword(credentials);
    this.supabaseService.fail(error);
    return data.session;
  }

  getCurrentUser(jwt?: string): Promise<UserResponse> {
    return this.supabaseService.client.auth.getUser(jwt);
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabaseService.client.auth.signOut();
    this.supabaseService.fail(error);
  }
}
