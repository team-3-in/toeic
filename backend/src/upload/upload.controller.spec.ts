import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ToeicService } from '../toeic/toeic.service';

class MockToeicService {}

describe('PdfUploaderController', () => {
  let controller: UploadController;
  let toeicService: ToeicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [
        UploadService,
        { provide: ToeicService, useClass: MockToeicService },
      ],
    }).compile();

    toeicService = module.get<ToeicService>(ToeicService);
    controller = module.get<UploadController>(UploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(toeicService).toBeDefined();
  });
});
