import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PasswordUtil } from '../utils/PasswordUtil/PasswordUtil';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Injectable()
export class SnippetsService {
  constructor(private prismaService: PrismaService) {}

  async create(createSnippetDto: CreateSnippetDto) {
    let password = createSnippetDto.password;

    if (createSnippetDto.isProtected && password) {
      password = await PasswordUtil.hashPassword(password);
    }

    return this.prismaService.snippet.create({
      data: { ...createSnippetDto, password }
    });
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
      data: { ...updateSnippetDto, updatedAt: new Date(Date.now()) }
    });
  }

  remove(id: string) {
    return this.prismaService.snippet.delete({ where: { id } });
  }
}
