import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ToeicService } from './toeic.service';
import { ApiSwagger } from '../common/swagger/api.decorator';
import { ResponseEntity } from '../common/entity/response.entity';
import { PatchToeicWithQuestion } from './dto/patch-quesion.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '../auth/constant/roles.enum';
import { Roles } from '../auth/decorator/roles.decorator';
import { ToeicQueryParam } from './dto/req-toeic-query.dto';

@ApiTags('토익 문제')
@Controller('toeic')
export class ToeicController {
  constructor(private readonly toeicService: ToeicService) {}

  @Get()
  @ApiSwagger({ name: '토익 문제 조회' })
  async findAll(@Query() query: ToeicQueryParam) {
    const result = await this.toeicService.findAllToeic(query.getQueryProps());
    return ResponseEntity.OK_WITH(
      `Successfully find ${result.length} questsions`,
      result,
    );
  }

  @Get('question/:uuid')
  @ApiSwagger({ name: '문제 아이디로 상세 조회' })
  async findQuestionUnique(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const result = await this.toeicService.findQuestionUnique(uuid);
    return ResponseEntity.OK_WITH(
      `Successfully find question number ${result.question_number} in toeic id ${result.toeic_id}.`,
      result,
    );
  }

  @Get('/:id')
  @ApiSwagger({ name: '토익 문제 상세 조회' })
  async findToeicUnique(@Param('id', ParseIntPipe) id: number) {
    const result = await this.toeicService.findToeicUnique(+id);
    return ResponseEntity.OK_WITH(
      `Successfully find question id: ${id}.`,
      result,
    );
  }

  @Patch('/:id')
  @Roles([Role.MANAGER])
  @ApiSwagger({ name: '토익 문제 수정' })
  updateToeicUnique(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: PatchToeicWithQuestion,
  ) {
    const result = this.toeicService.updateToeicUnique(+id, request.toEntity());
    return ResponseEntity.OK_WITH(
      `Successfully update question id: ${id}.`,
      result,
    );
  }

  @Delete('/:id')
  @Roles([Role.MANAGER])
  @ApiSwagger({ name: '토익 문제 삭제' })
  deleteToeicUnique(@Param('id', ParseIntPipe) id: number) {
    const result = this.toeicService.deleteToeicUnique(+id);
    return ResponseEntity.OK_WITH(
      `Successfully delete question id: ${id}.`,
      result,
    );
  }
}
