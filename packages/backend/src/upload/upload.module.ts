import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { ToeicModule } from '../toeic/toeic.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ToeicModule, AuthModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
