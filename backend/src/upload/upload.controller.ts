import {
  Controller,
  FileTypeValidator,
  Logger,
  ParseFilePipe,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiSwagger } from '../common/swagger/api.decorator';
import { ApiFile } from './swagger/file-api.decorator';
import { ResponseEntity } from '../common/entity/response.entity';
import { ApiTags } from '@nestjs/swagger';
import { readFile } from 'xlsx';
import { Role } from '../auth/constant/roles.enum';
import { Roles } from '../auth/decorator/roles.decorator';
import { ToeicService } from '../toeic/toeic.service';

@Controller('upload')
@ApiTags('문제 업로드')
export class UploadController {
  private readonly logger = new Logger(UploadController.name);
  constructor(
    private readonly uploadService: UploadService,
    private readonly toeicService: ToeicService,
  ) {}

  @Post('xlsx')
  @ApiSwagger({
    name: 'xlsx 토익 문제 파일 업로드',
    success: 201,
  })
  @Roles([Role.MANAGER])
  @ApiFile()
  async handleXlsxFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'sheet' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const workbook = readFile(file.path);
    const sheetData = this.uploadService.sheetToToeicQuestion(workbook);
    let count = 0;
    sheetData.map(async (sheet) => {
      const toeicId = await this.toeicService.createToeic(file.filename, sheet);
      count += await this.toeicService.createQuestion(toeicId, sheet);
    });
    return ResponseEntity.CREATED(
      `Successfully saved ${count} qeustions, filename: ${file.filename}, size: ${file.size} bytes`,
    );
  }
}
