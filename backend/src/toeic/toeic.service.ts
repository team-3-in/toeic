import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UploadedSheetData } from '../upload/dto/upload.dto';

@Injectable()
export class ToeicService {
  constructor(private readonly supabase: SupabaseService) {}

  async createToeic(
    filename: string,
    sheetData: UploadedSheetData,
  ): Promise<number> {
    const { data: toeic, error: toeicInsertError } = await this.supabase.client
      .from('toeic')
      .upsert({ title: sheetData.title, filename })
      .select('id')
      .single();

    this.supabase.dbFail(toeicInsertError);

    return toeic.id;
  }
  async createQuestion(
    toeicId: number,
    sheetData: UploadedSheetData,
  ): Promise<number> {
    const { error: questionInsertError } = await this.supabase.client
      .from('question')
      .insert(
        sheetData.data.map((question) => ({
          toeic_id: toeicId,
          ...question,
        })),
      );

    this.supabase.dbFail(questionInsertError);
    return sheetData.data.length;
  }
}
