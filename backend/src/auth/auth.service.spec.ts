import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SupabaseService } from '../supabase/supabase.service';

class MockSupabaseService {}

describe('AuthService', () => {
  let authService: AuthService;
  let supabaseService: SupabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: SupabaseService, useClass: MockSupabaseService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    supabaseService = module.get<SupabaseService>(SupabaseService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(supabaseService).toBeDefined();
  });
});
