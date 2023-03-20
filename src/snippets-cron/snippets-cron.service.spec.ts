import { Test, TestingModule } from '@nestjs/testing';
import { SnippetsCronService } from './snippets-cron.service';

describe('SnippetsCronService', () => {
  let service: SnippetsCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnippetsCronService],
    }).compile();

    service = module.get<SnippetsCronService>(SnippetsCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
