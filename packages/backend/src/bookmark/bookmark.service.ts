import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookmarkWithHistory } from './dto/post-bookmark-body.dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async upsertBookmark(userId: string, bookmark: BookmarkWithHistory) {
    const where = {
      user_id: userId,
      bookmark_question_id: bookmark.question_id,
    };
    const Bookmarked = await this.prisma.bookmark.findFirst({
      select: { id: true },
      where,
    });

    if (!Bookmarked) {
      return this.prisma.bookmark.create({
        data: {
          history: bookmark.history,
          ...where,
        },
      });
    } else {
      return this.prisma.bookmark.update({
        where: { id: Bookmarked.id },
        data: {
          history: bookmark.history,
        },
      });
    }
  }

  findAllBookmark(userId: string) {
    return this.prisma.bookmark.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  deleteBookmark(userId: string, questionId: string) {
    return this.prisma.bookmark.deleteMany({
      where: {
        user_id: userId,
        bookmark_question_id: questionId,
      },
    });
  }
}
