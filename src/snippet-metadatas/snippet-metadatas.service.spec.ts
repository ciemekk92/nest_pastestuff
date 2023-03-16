import { Test, TestingModule } from '@nestjs/testing';
import { SnippetMetadatasService } from './snippet-metadatas.service';

describe('SnippetMetadatasService', () => {
  let service: SnippetMetadatasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnippetMetadatasService],
    }).compile();

    service = module.get<SnippetMetadatasService>(SnippetMetadatasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
