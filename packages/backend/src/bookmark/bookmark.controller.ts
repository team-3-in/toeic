import {
  Body,
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
import { PostBookmarkReqBody } from './dto/post-bookmark-body.dto';
import { ParseUserIdPipe } from './pipe/payload.pipe';

@ApiTags('문제 북마크')
@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  @ApiSwagger({ name: '북마크 조회' })
  async findAllBookmark(
    @ReqToken(ParseUserIdPipe, ParseUUIDPipe) userId: string,
  ) {
    const result = await this.bookmarkService.findAllBookmark(userId);
    return ResponseEntity.OK_WITH(
      `Successfully find ${result.length} bookmarks`,
      result,
    );
  }

  @Post()
  @ApiSwagger({ name: '북마크 생성' })
  async upsertBookmark(
    @ReqToken(ParseUserIdPipe, ParseUUIDPipe) userId: string,
    @Body() request: PostBookmarkReqBody,
  ) {
    request.bookmarks.map(async (bookmark) => {
      await this.bookmarkService.upsertBookmark(userId, bookmark);
    });
    return ResponseEntity.CREATED(`Successfully create bookmarks`);
  }

  @Delete('/:uuid')
  @ApiSwagger({ name: '북마크 삭제' })
  async deleteBookmark(
    @Param('uuid', ParseUUIDPipe) questionId: string,
    @ReqToken(ParseUserIdPipe, ParseUUIDPipe) userId: string,
  ) {
    const result = await this.bookmarkService.deleteBookmark(
      userId,
      questionId,
    );
    return ResponseEntity.OK(
      `Successfully delete ${result.count} bookmark id: ${questionId}.`,
    );
  }
}
