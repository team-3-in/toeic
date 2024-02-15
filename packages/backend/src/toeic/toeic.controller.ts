import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ToeicService } from './toeic.service';
import { ApiSwagger } from '../common/swagger/api.decorator';
import { ResponseEntity } from '../common/entity/response.entity';
import { PatchToeicWithQuestion } from './dto/patch-quesion.dto';

@Controller('toeic')
export class ToeicController {
  constructor(private readonly toeicService: ToeicService) {}

  @Get()
  @ApiSwagger({ name: '토익 문제 조회' })
  async findAll() {
    const result = await this.toeicService.findAll();
    return ResponseEntity.OK_WITH(
      `Successfully find ${result.length} questsions`,
      result,
    );
  }

  @Get('/:id')
  @ApiSwagger({ name: '토익 문제 조회' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.toeicService.findOne(+id);
    return ResponseEntity.OK_WITH(
      `Successfully find question id: ${id}.`,
      result,
    );
  }

  @Patch('/:id')
  @ApiSwagger({ name: '토익 문제 수정' })
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: PatchToeicWithQuestion,
  ) {
    const result = this.toeicService.updateOne(+id, request.toEntity());
    return ResponseEntity.OK_WITH(
      `Successfully update question id: ${id}.`,
      result,
    );
  }

  @Delete('/:id')
  @ApiSwagger({ name: '토익 문제 수정' })
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    const result = this.toeicService.deleteOne(+id);
    return ResponseEntity.OK_WITH(
      `Successfully delete question id: ${id}.`,
      result,
    );
  }
}
