import { Test, TestingModule } from '@nestjs/testing';
import { ToeicService } from './toeic.service';
import { PrismaService } from '../prisma/prisma.service';

class MockPrisma {}

describe('ToeicService', () => {
  let service: ToeicService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToeicService,
        { provide: PrismaService, useClass: MockPrisma },
      ],
    }).compile();

    service = module.get<ToeicService>(ToeicService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
