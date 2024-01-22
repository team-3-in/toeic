import { Injectable } from '@nestjs/common';
import { AuthTokenResponsePassword, UserResponse } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthTokenResponsePassword> {
    return this.supabaseService.client.auth.signInWithPassword({
      email,
      password,
    });
  }

  // async setSession(currentSession: {
  //   access_token: string;
  //   refresh_token: string;
  // }): Promise<void> {
  //   this.supabaseService.client.auth.setSession(currentSession);
  // }

  async getCurrentUser(): Promise<UserResponse> {
    return this.supabaseService.client.auth.getUser();
  }
}
