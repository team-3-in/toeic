import { Module } from '@nestjs/common';
import { ToeicService } from './toeic.service';
import { ToeicController } from './toeic.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [ToeicController],
  providers: [ToeicService],
  exports: [ToeicService],
})
export class ToeicModule {}
