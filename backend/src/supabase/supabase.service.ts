import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './schema/database.schema';

@Injectable()
export class SupabaseService {
  public client: SupabaseClient;
  constructor() {
    this.client = createClient<Database>(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );
  }
}
