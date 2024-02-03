import { Module } from '@nestjs/common';
import { PdfUploaderService } from './pdf-uploader.service';
import { PdfUploaderController } from './pdf-uploader.controller';

@Module({
  controllers: [PdfUploaderController],
  providers: [PdfUploaderService],
})
export class PdfUploaderModule {}
