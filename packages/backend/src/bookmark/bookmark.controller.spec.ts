import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { AuthService } from '../auth/auth.service';

class MockBookmarkService {}
class MockAuthService {}

describe('BookmarkController', () => {
  let controller: BookmarkController;
  let bookmarkService: BookmarkService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookmarkController],
      providers: [
        { provide: BookmarkService, useClass: MockBookmarkService },
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compile();

    bookmarkService = module.get<BookmarkService>(BookmarkService);
    authService = module.get<AuthService>(AuthService);
    controller = module.get<BookmarkController>(BookmarkController);
  });

  it('should be defined', () => {
    expect(bookmarkService).toBeDefined();
    expect(authService).toBeDefined();
    expect(controller).toBeDefined();
  });
});
