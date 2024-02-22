import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SupabaseService } from '../supabase/supabase.service';
import { JwtService } from '@nestjs/jwt';

class MockSupabaseService {}
class MockJwtService {}

describe('AuthService', () => {
  let authService: AuthService;
  let supabaseService: SupabaseService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: SupabaseService, useClass: MockSupabaseService },
        { provide: JwtService, useClass: MockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    supabaseService = module.get<SupabaseService>(SupabaseService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(supabaseService).toBeDefined();
    expect(jwtService).toBeDefined();
  });
});
