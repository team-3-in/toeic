import { ApiProperty } from '@nestjs/swagger';
import { Question, UploadedSheetProps } from '../upload.interface';

export class UploadedQuestionInSheet implements UploadedSheetProps {
  @ApiProperty({
    description: '엑셀파일 시트 이름입니다.',
    required: true,
  })
  title: string;

  @ApiProperty({
    description: '토익 문제입니다.',
    required: true,
  })
  data: Question[];

  constructor(title: string, data: Question[]) {
    this.title = title;
    this.data = data;
  }
}
