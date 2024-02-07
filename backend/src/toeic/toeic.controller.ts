import { Controller, Post } from '@nestjs/common';
import { ToeicService } from './toeic.service';

@Controller('toeic')
export class ToeicController {
  constructor(private readonly toeicService: ToeicService) {}

  @Post()
  create() {}
}
