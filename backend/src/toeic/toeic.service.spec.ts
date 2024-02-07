import { Test, TestingModule } from '@nestjs/testing';
import { ToeicService } from './toeic.service';
import { SupabaseService } from '../supabase/supabase.service';

class MockSupabaseService {}

describe('ToeicService', () => {
  let service: ToeicService;
  let supabaseService: SupabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToeicService,
        { provide: SupabaseService, useClass: MockSupabaseService },
      ],
    }).compile();

    service = module.get<ToeicService>(ToeicService);
    supabaseService = module.get<SupabaseService>(SupabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(supabaseService).toBeDefined();
  });
});
