import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkService } from './bookmark.service';
import { PrismaService } from '../prisma/prisma.service';

class MockPrisma {}

describe('BookmarkService', () => {
  let service: BookmarkService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookmarkService,
        { provide: PrismaService, useClass: MockPrisma },
      ],
    }).compile();

    service = module.get<BookmarkService>(BookmarkService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
