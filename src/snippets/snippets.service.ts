import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
    const { title, content, password, timeToLiveMs } = createSnippetDto;

    return this.prismaService.snippet.create({
      data: {
        title,
        content,
        metadata: {
          create: await this.snippetMetadatasService.createSnippetMetadata({
            password,
            timeToLiveMs
          })
        }
      }
    });
  }

  findAll() {
    return this.prismaService.snippet.findMany({
      where: { metadata: { password: null } }
    });
  }

  async findOne(id: string) {
    const snippet = await this.prismaService.snippet.findUnique({
      where: { id },
      include: { metadata: true }
    });

    if (!snippet) {
      throw new NotFoundException(`Snippet with given id: ${id} not found`);
    }

    if (snippet.metadata && snippet.metadata.timeToLiveMs) {
      const dateToDelete = new Date(
        snippet.createdAt.getTime() + (snippet.metadata.timeToLiveMs ?? 0)
      );

      if (dateToDelete.getTime() < Date.now()) {
        await this.remove(id);
        Logger.log(
          `Removed snippet with id ${id} after ${snippet.metadata.timeToLiveMs} ms.`
        );
        throw new NotFoundException(`Snippet with given id: ${id} not found`);
      }
    }

    return snippet;
  }

  findSnippetsToDelete() {
    return this.prismaService.snippet.findMany({
      where: { metadata: { timeToLiveMs: { gte: 0 } } },
      include: { metadata: true }
    });
  }

  async update(id: string, { newPassword, title, content }: UpdateSnippetDto) {
    const currentSnippet = await this.prismaService.snippet.findUnique({
      where: { id }
    });

    if (!currentSnippet) throw new NotFoundException('Snippet not found');

    if (newPassword) {
      await this.snippetMetadatasService.updateSnippetMetadata(
        currentSnippet.id,
        { newPassword }
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
