import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from '../common/entity/response.entity';
import { ApiSwagger } from '../common/swagger/api.decorator';
import { ReqToken } from '../auth/decorator/token.decorator';
import { AuthToken } from '../auth/dto/req-auth-token.dto';

@ApiTags('문제 북마크')
@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  @ApiSwagger({ name: '북마크 조회' })
  async findAll() {
    // return ResponseEntity.OK_WITH(
    //   `Successfully find ${result.length} bookmarks`,
    //   result,
    // );
  }

  @Post()
  @ApiSwagger({ name: '북마크 생성', success: 201 })
  async create() {
    return ResponseEntity.CREATED('Successfully create bookmark');
  }

  @Delete('/:uuid')
  @ApiSwagger({ name: '토익 문제 수정' })
  deleteOne(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @ReqToken() token: AuthToken,
  ) {
    return ResponseEntity.OK(`Successfully delete bookmark id: ${uuid}.`);
  }
}
