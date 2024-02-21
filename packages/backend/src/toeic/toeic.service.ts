import { Injectable } from '@nestjs/common';
import { UploadedQuestionInSheet } from '../upload/dto/upload.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PatchQuestionToEntity } from './toeic.interface';

@Injectable()
export class ToeicService {
  constructor(private prisma: PrismaService) {}

  async createToeic(
    filename: string,
    questionInSheet: UploadedQuestionInSheet,
  ) {
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

  async findAllToeic() {
    return this.prisma.toeic.findMany();
  }

  async findToeicUnique(id: number) {
    return this.prisma.toeic.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        questions: true,
      },
    });
  }

  async deleteToeicUnique(id: number) {
    return this.prisma.toeic.update({
      where: {
        id,
      },
      data: {
        is_public: false,
      },
    });
  }

  async updateToeicUnique(id: number, data: PatchQuestionToEntity) {
    return this.prisma.toeic.update({
      where: {
        id,
      },
      data,
    });
  }

  async findQuestionUnique(uuid: string) {
    return this.prisma.question.findUniqueOrThrow({
      where: {
        id: uuid,
      },
    });
  }
}
