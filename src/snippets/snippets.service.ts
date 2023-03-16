import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SnippetMetadatasService } from '../snippet-metadatas/snippet-metadatas.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Injectable()
export class SnippetsService {
  constructor(
    private prismaService: PrismaService,
    private snippetMetadatasService: SnippetMetadatasService
  ) {}

  async create(createSnippetDto: CreateSnippetDto) {
    const { title, content, password } = createSnippetDto;

    return this.prismaService.snippet.create({
      data: {
        title,
        content,
        metadata: {
          create: this.snippetMetadatasService.createSnippetMetadata(password)
        }
      }
    });
  }

  findAll() {
    return this.prismaService.snippet.findMany();
  }

  findOne(id: string) {
    return this.prismaService.snippet.findUnique({ where: { id } });
  }

  async update(id: string, { newPassword, title, content }: UpdateSnippetDto) {
    const currentSnippet = await this.prismaService.snippet.findUnique({
      where: { id }
    });

    if (!currentSnippet) throw new NotFoundException('Snippet not found');

    if (newPassword) {
      await this.snippetMetadatasService.updateSnippetMetadata(
        currentSnippet.id,
        newPassword
      );
    }

    return this.prismaService.snippet.update({
      where: { id },
      data: { title, content }
    });
  }

  remove(id: string) {
    return this.prismaService.snippet.delete({ where: { id } });
  }
}
