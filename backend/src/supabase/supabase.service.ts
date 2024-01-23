import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './schema/database.schema';
import { REQUEST } from '@nestjs/core';
import { ExtractJwt } from 'passport-jwt';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
  public client: SupabaseClient;

  constructor(@Inject(REQUEST) private readonly request: Request) {
    this.client = createClient<Database>(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          detectSessionInUrl: false,
          persistSession: false,
        },
        global: {
          headers: {
            Authorization: `Bearer ${ExtractJwt.fromAuthHeaderAsBearerToken()(
              this.request,
            )}`,
          },
        },
      },
    );
  }

  fail(error: Error) {
    if (error) {
      throw new NotFoundException(error.message);
    }
  }
}
