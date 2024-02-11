import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ToeicService } from '../toeic/toeic.service';
import { AuthService } from '../auth/auth.service';

class MockToeicService {}
class MockAuthService {}

describe('UploaderController', () => {
  let controller: UploadController;
  let toeicService: ToeicService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [
        UploadService,
        { provide: ToeicService, useClass: MockToeicService },
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compile();

    toeicService = module.get<ToeicService>(ToeicService);
    authService = module.get<AuthService>(AuthService);
    controller = module.get<UploadController>(UploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
    expect(toeicService).toBeDefined();
  });
});
