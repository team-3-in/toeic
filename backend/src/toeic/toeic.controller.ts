import { Controller, Get, Param } from '@nestjs/common';
import { ToeicService } from './toeic.service';
import { ApiSwagger } from 'src/common/swagger/api.decorator';

@Controller('toeic')
export class ToeicController {
  constructor(private readonly toeicService: ToeicService) {}

  @Get()
  @ApiSwagger({ name: '토익 문제 조회' })
  findAll() {
    return this.toeicService.findAll();
  }

  @Get('/:id')
  @ApiSwagger({ name: '토익 문제 조회' })
  findOne(@Param('id') id: number) {
    return this.toeicService.findOne(+id);
  }
}
