import { Question } from '../upload/upload.interface';

export interface ToeicReqBodyProps {
  title: string;
  is_public: boolean;
  questions: QuestionWithId[];
}

export interface QuestionWithId extends Question {
  id: string;
}

export interface PatchQuestionToEntity
  extends Omit<ToeicReqBodyProps, 'questions'> {
  questions: {
    update: {
      where: {
        id: string;
      };
      data: {
        question_number: number;
        answer: string;
        content: string;
        choice: string;
        translation: string;
      };
    }[];
  };
}

export interface ToeicWhereInputProps {
  is_public: boolean;
}
