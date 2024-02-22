import { Module } from '@nestjs/common';
import { ToeicService } from './toeic.service';
import { ToeicController } from './toeic.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ToeicController],
  providers: [ToeicService],
  exports: [ToeicService],
})
export class ToeicModule {}
