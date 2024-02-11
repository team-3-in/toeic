import { Injectable } from '@nestjs/common';
import { UploadedSheetData } from '../upload/dto/upload.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ToeicService {
  constructor(private prisma: PrismaService) {}

  async create(filename: string, sheetData: UploadedSheetData) {
    return this.prisma.toeic.create({
      data: {
        filename,
        title: sheetData.title,
        questions: {
          create: sheetData.data,
        },
      },
    });
  }

  async findAll() {
    return this.prisma.toeic.findMany();
  }

  async findOne(id: number) {
    return this.prisma.toeic.findUnique({
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

  async updateOne(id: number) {
    return this.prisma.toeic.update({
      where: {
        id,
      },
      data: {
        is_public: false,
      },
    });
  }
}
