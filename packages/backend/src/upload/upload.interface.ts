import { Database } from 'src/supabase/schema/database.schema';

export interface UploadedSheetProps {
  title: Database['public']['Tables']['toeic']['Row']['title'];
  data: Question[];
}

export interface Question {
  question_number: Database['public']['Tables']['question']['Row']['question_number'];
  answer: Database['public']['Tables']['question']['Row']['answer'];
  content: Database['public']['Tables']['question']['Row']['content'];
  choice: Database['public']['Tables']['question']['Row']['choice'];
  translation: Database['public']['Tables']['question']['Row']['translation'];
}

export interface QuestionInFile {
  size: number;
  name: string;
  questionAmount: number;
  sheets: UploadedSheetProps[];
}
