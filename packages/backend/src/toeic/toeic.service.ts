import { Injectable } from '@nestjs/common';
import { UploadedQuestionInSheet } from '../upload/dto/upload.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PatchQuestionToEntity } from './toeic.interface';

@Injectable()
export class ToeicService {
  constructor(private prisma: PrismaService) {}

  async create(filename: string, questionInSheet: UploadedQuestionInSheet) {
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

  async findAll() {
    return this.prisma.toeic.findMany();
  }

  async findOne(id: number) {
    return this.prisma.toeic.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        questions: true,
      },
    });
  }

  async deleteOne(id: number) {
    return this.prisma.toeic.update({
      where: {
        id,
      },
      data: {
        is_public: false,
      },
    });
  }

  async updateOne(id: number, data: PatchQuestionToEntity) {
    return this.prisma.toeic.update({
      where: {
        id,
      },
      data,
    });
  }
}
