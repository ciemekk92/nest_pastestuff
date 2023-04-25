import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { CRON_INTERVAL } from '../config/config.constants';
import { SnippetsService } from '../snippets/snippets.service';

@Injectable()
export class SnippetsCronService {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Interval(CRON_INTERVAL)
  async deleteOutdatedSnippets(): Promise<void> {
    const snippets = await this.snippetsService.findSnippetsToDelete();

    snippets.forEach((snippet) =>
      this.snippetsService.removeSnippetIfOutdated(snippet.id, snippet)
    );
  }
}
