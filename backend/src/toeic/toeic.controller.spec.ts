import { Test, TestingModule } from '@nestjs/testing';
import { ToeicController } from './toeic.controller';
import { ToeicService } from './toeic.service';

class MockToeicService {}

describe('ToeicController', () => {
  let controller: ToeicController;
  let toeicService: ToeicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToeicController],
      providers: [{ provide: ToeicService, useClass: MockToeicService }],
    }).compile();

    toeicService = module.get<ToeicService>(ToeicService);
    controller = module.get<ToeicController>(ToeicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(toeicService).toBeDefined();
  });
});
