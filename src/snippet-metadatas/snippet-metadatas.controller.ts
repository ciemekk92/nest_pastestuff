import { Controller } from '@nestjs/common';
import { SnippetMetadatasService } from './snippet-metadatas.service';

@Controller('snippet-metadatas')
export class SnippetMetadatasController {
  constructor(
    private readonly snippetMetadatasService: SnippetMetadatasService
  ) {}
}
