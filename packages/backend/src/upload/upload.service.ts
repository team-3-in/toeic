import { Injectable } from '@nestjs/common';
import { WorkBook, utils } from 'xlsx';
import { UploadedSheetData } from './dto/upload.dto';

@Injectable()
export class UploadService {
  sheetToQuestions(workbook: WorkBook): UploadedSheetData[] {
    return workbook.SheetNames.map(
      (title) =>
        new UploadedSheetData(
          title,
          utils.sheet_to_json(workbook.Sheets[title]),
        ),
    );
  }
}
