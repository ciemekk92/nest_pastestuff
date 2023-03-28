import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PasswordUtil } from '../utils/PasswordUtil/PasswordUtil';
import {
  SnippetMetadataConfig,
  SnippetMetadataUpdateDto
} from './snippet-metadatas.types';

@Injectable()
export class SnippetMetadatasService {
  constructor(private prismaService: PrismaService) {}

  async createSnippetMetadata({
    password,
    deleteAfterHours
  }: SnippetMetadataConfig) {
    return {
      password: await PasswordUtil.hashPassword(password),
      deleteAfterHours
    };
  }

  async updateSnippetMetadata(
    snippetId: string,
    { newPassword }: Partial<SnippetMetadataUpdateDto>
  ) {
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
