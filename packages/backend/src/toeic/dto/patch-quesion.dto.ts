import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  PatchQuestionToEntity,
  QuestionWithId,
  ToeicReqBodyProps,
} from '../toeic.interface';

export class PatchToeicWithQuestion implements ToeicReqBodyProps {
  @ApiProperty({
    description: '토익 문제 제목입니다.',
    example: '해커스 토익 실전 1회',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  @IsOptional()
  @Type(() => String)
  title: string;

  @ApiProperty({
    description: '토익 문제 공개 여부입니다.',
  })
  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  is_public: boolean;

  @ApiProperty({
    description: '토익 문제입니다.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PatchQuestion)
  questions: PatchQuestion[];

  toEntity(): PatchQuestionToEntity {
    return {
      title: this.title,
      is_public: this.is_public,
      questions: {
        update: this.questions.map((question) => ({
          where: { id: question.id },
          data: {
            question_number: question.question_number,
            answer: question.answer,
            content: question.content,
            choice: question.choice,
            translation: question.translation,
          },
        })),
      },
    };
  }
}

export class PatchQuestion implements QuestionWithId {
  @ApiProperty({
    description: '문제 DB 고유 ID입니다.',
    example: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: '문제 번호입니다.',
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  question_number: number;

  @ApiProperty({
    description: '정답입니다.',
    example: 'A',
  })
  @IsString()
  @MaxLength(1)
  @IsOptional()
  answer: string;

  @ApiProperty({
    description: '문제입니다.',
    example: '문제입니다.',
  })
  @IsString()
  @IsOptional()
  content: string;

  @ApiProperty({
    description: '선택지입니다.',
    example: '(A) --- (B) --- (C) --- (D) ---.',
  })
  @IsString()
  @IsOptional()
  choice: string;

  @ApiProperty({
    description: '문제 한글 번역입니다.',
    example: '문제 한글 번역입니다.',
  })
  @IsString()
  @IsOptional()
  translation: string;
}
