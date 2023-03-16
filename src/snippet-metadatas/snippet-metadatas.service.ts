import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PasswordUtil } from '../utils/PasswordUtil/PasswordUtil';

@Injectable()
export class SnippetMetadatasService {
  constructor(private prismaService: PrismaService) {}

  async createSnippetMetadata(password?: string) {
    return { password: await PasswordUtil.hashPassword(password) };
  }

  async updateSnippetMetadata(snippetId: string, newPassword?: string) {
    return this.prismaService.snippetMetadata.update({
      where: {
        snippetId
      },
      data: {
        password: await PasswordUtil.hashPassword(newPassword)
      }
    });
  }
}
