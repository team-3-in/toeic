import { ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { readFile } from 'xlsx';
import { UploadService } from '../upload.service';
import { QuestionInFile } from '../upload.interface';

/**
 * Validator supports service container in the case if want to inject dependencies into your custom validator constraint classes
 * @see also https://github.com/leosuncin/nest-api-example/blob/master/src/blog/pipes/article.pipe.ts
 * @see also https://github.com/typestack/class-validator?tab=readme-ov-file#using-service-container
 * @see also https://docs.nestjs.com/techniques/validation
 */
@Injectable()
export class ParseWorkbookPipe
  implements PipeTransform<Express.Multer.File, Promise<QuestionInFile>>
{
  private readonly uploadService = new UploadService();

  async transform(value: Express.Multer.File) {
    const workbook = readFile(value.path);
    const name = value.filename;
    const size = value.size;
    const sheets = this.uploadService.sheetToQuestions(workbook);
    let questionAmount = 0;
    for (const sheet of sheets) {
      questionAmount += sheet.data.length;
    }
    if (sheets.length === 0) {
      throw new ConflictException('No sheet found');
    }

    return { size, name, sheets, questionAmount };
  }
}
