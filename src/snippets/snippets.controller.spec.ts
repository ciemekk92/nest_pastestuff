import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { SnippetsController } from './snippets.controller';
import { SnippetsService } from './snippets.service';

describe('SnippetsController', () => {
  let controller: SnippetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnippetsController],
      providers: [SnippetsService, PrismaService]
    }).compile();

    controller = module.get<SnippetsController>(SnippetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
