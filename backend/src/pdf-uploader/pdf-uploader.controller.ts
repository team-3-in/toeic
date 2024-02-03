import {
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { PdfUploaderService } from './pdf-uploader.service';
import { ApiSwagger } from 'src/common/swagger/api.decorator';
import { ApiFile } from './swagger/file-api.decorator';
import { ResponseEntity } from '../common/entity/response.entity';

@Controller('uploader')
export class PdfUploaderController {
  constructor(private readonly pdfUploaderService: PdfUploaderService) {}

  @Post('pdf')
  @ApiSwagger({ name: 'PDF 파일 업로드', success: 201 })
  @ApiFile()
  async handlePdfFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'pdf' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return ResponseEntity.CREATED(`Successfully saved`);
  }
}
