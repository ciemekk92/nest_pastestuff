import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Injectable()
export class SnippetsService {
  constructor(private prismaService: PrismaService) {}

  create(createSnippetDto: CreateSnippetDto) {
    return this.prismaService.snippet.create({ data: createSnippetDto });
  }

  findAll() {
    return this.prismaService.snippet.findMany();
  }

  findOne(id: string) {
    return this.prismaService.snippet.findUnique({ where: { id } });
  }

  update(id: string, updateSnippetDto: UpdateSnippetDto) {
    return this.prismaService.snippet.update({
      where: { id },
      data: updateSnippetDto,
    });
  }

  remove(id: string) {
    return this.prismaService.snippet.delete({ where: { id } });
  }
}
