interface question {
  content: string;
  choice: string;
  answer: string;
  created_at: string;
  updated_at: string | null;
  translation: string;
  id: string;
  question_number: number;
  toeic_id: number;
}

export type Problem = {
  id: number;
  title: string;
  filename: string;
  created_at: string;
  is_public: boolean;
  updated_at: string | null;
  questions: question[];
};
