import { Injectable } from '@nestjs/common';
import { UploadedQuestionInSheet } from '../upload/dto/upload.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PatchQuestionToEntity, ToeicWhereInputProps } from './toeic.interface';

@Injectable()
export class ToeicService {
  constructor(private prisma: PrismaService) {}

  createToeic(filename: string, questionInSheet: UploadedQuestionInSheet) {
    return this.prisma.toeic.create({
      data: {
        filename,
        title: questionInSheet.title,
        questions: {
          create: questionInSheet.data,
        },
      },
    });
  }

  findAllToeic(where: ToeicWhereInputProps) {
    return this.prisma.toeic.findMany({ where });
  }

  findToeicUnique(id: number) {
    return this.prisma.toeic.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        questions: true,
      },
    });
  }

  deleteToeicUnique(id: number) {
    return this.prisma.toeic.update({
      where: {
        id,
      },
      data: {
        is_public: false,
      },
    });
  }

  updateToeicUnique(id: number, data: PatchQuestionToEntity) {
    return this.prisma.toeic.update({
      where: {
        id,
      },
      data,
    });
  }

  findQuestionUnique(uuid: string) {
    return this.prisma.question.findUniqueOrThrow({
      where: {
        id: uuid,
      },
    });
  }
}
