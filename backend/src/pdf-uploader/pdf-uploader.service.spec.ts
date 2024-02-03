import { Test, TestingModule } from '@nestjs/testing';
import { PdfUploaderService } from './pdf-uploader.service';

describe('PdfUploaderService', () => {
  let service: PdfUploaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfUploaderService],
    }).compile();

    service = module.get<PdfUploaderService>(PdfUploaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
