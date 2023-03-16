import { Test, TestingModule } from '@nestjs/testing';
import { SnippetMetadatasController } from './snippet-metadatas.controller';
import { SnippetMetadatasService } from './snippet-metadatas.service';

describe('SnippetMetadatasController', () => {
  let controller: SnippetMetadatasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnippetMetadatasController],
      providers: [SnippetMetadatasService],
    }).compile();

    controller = module.get<SnippetMetadatasController>(SnippetMetadatasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
