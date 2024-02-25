import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Max, Min } from 'class-validator';
import { ToeicWhereInputProps } from '../toeic.interface';
import { Type } from 'class-transformer';

export class ToeicQueryParam {
  @ApiProperty({
    description: '문제 공개 여부 (0: 비공개, 1: 공개)',
    required: false,
    default: 1,
  })
  @Min(0)
  @Max(1)
  @IsOptional()
  @Type(() => Number)
  isPublic: number;

  getQueryProps(): ToeicWhereInputProps {
    return {
      is_public:
        typeof this.isPublic === 'undefined' ? true : Boolean(this.isPublic),
    };
  }
}
