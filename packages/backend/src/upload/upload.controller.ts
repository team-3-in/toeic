import {
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiSwagger } from '../common/swagger/api.decorator';
import { ApiFile } from './swagger/file-api.decorator';
import { ResponseEntity } from '../common/entity/response.entity';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '../auth/constant/roles.enum';
import { Roles } from '../auth/decorator/roles.decorator';
import { ToeicService } from '../toeic/toeic.service';
import { ParseWorkbookPipe } from './pipe/workbook.pipe';
import { QuestionInFile } from './upload.interface';
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('upload')
@UseGuards(RolesGuard)
@ApiTags('문제 업로드')
export class UploadController {
  constructor(private readonly toeicService: ToeicService) {}

  @Post('xlsx')
  @ApiSwagger({
    name: '토익 문제 업로드',
    success: 201,
  })
  @Roles([Role.MANAGER])
  @ApiFile()
  async handleXlsxFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'sheet' })],
      }),
      ParseWorkbookPipe,
    )
    file: QuestionInFile,
  ) {
    file.sheets.map(async (sheet) => {
      await this.toeicService.createToeic(file.name, sheet);
    });

    return ResponseEntity.CREATED_WITH(
      `Successfully saved ${file.questionAmount} qeustions, filename: ${file.name}, size: ${file.size} bytes`,
      file.sheets,
    );
  }
}
