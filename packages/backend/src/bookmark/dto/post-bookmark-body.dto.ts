import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class PostBookmarkReqBody {
  @ApiProperty({
    description: '북마크할 문제의 id와 히스토리',
    isArray: true,
    type: () => BookmarkWithHistory,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookmarkWithHistory)
  bookmarks: BookmarkWithHistory[];
}

export class BookmarkWithHistory {
  @ApiProperty({
    description: '북마크할 문제의 id',
  })
  @IsUUID()
  @IsNotEmpty()
  question_id: string;

  @ApiProperty({
    description: '북마크 틀린문제 히스토리',
    required: false,
    default: '',
  })
  @IsString()
  @IsOptional()
  history: string;
}
