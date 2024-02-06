import {
  Controller,
  FileTypeValidator,
  Logger,
  ParseFilePipe,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiSwagger } from 'src/common/swagger/api.decorator';
import { ApiFile } from './swagger/file-api.decorator';
import { ResponseEntity } from '../common/entity/response.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('uploader')
@ApiTags('문제 업로드')
export class UploadController {
  private readonly logger = new Logger(UploadController.name);
  constructor(private readonly pdfUploaderService: UploadService) {}

  @Post('xlsx')
  @ApiSwagger({ name: 'xlsx 파일 업로드', success: 201, allowAny: true })
  @ApiFile()
  async handlePdfFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'sheet' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return ResponseEntity.CREATED(`Successfully saved ${file.filename}`);
  }
}
