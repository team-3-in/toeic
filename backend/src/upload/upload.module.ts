import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { ToeicModule } from '../toeic/toeic.module';

@Module({
  imports: [ToeicModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
