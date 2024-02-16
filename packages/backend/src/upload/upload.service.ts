import { Injectable } from '@nestjs/common';
import { WorkBook, utils } from 'xlsx';
import { UploadedQuestionInSheet } from './dto/upload.dto';

@Injectable()
export class UploadService {
  sheetToQuestions(workbook: WorkBook): UploadedQuestionInSheet[] {
    return workbook.SheetNames.map(
      (title) =>
        new UploadedQuestionInSheet(
          title,
          utils.sheet_to_json(workbook.Sheets[title]),
        ),
    );
  }
}
