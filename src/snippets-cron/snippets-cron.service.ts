import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { CRON_INTERVAL } from '../config/config.constants';
import { SnippetsService } from '../snippets/snippets.service';
import { hoursToMs } from '../utils/hoursToMs';

@Injectable()
export class SnippetsCronService {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Interval(CRON_INTERVAL)
  async deleteOutdatedSnippets(): Promise<void> {
    const snippets = await this.snippetsService.findSnippetsToDelete();

    snippets.forEach(async ({ id, createdAt, metadata }) => {
      if (!metadata || !metadata.timeToLiveMs) return;

      const dateToDelete = new Date(
        createdAt.getTime() + (metadata.timeToLiveMs ?? 0)
      );

      if (dateToDelete.getTime() < Date.now()) {
        await this.snippetsService.remove(id);
        Logger.log(
          `Removed snippet with id ${id} after ${metadata?.timeToLiveMs} ms.`
        );
      }
    });
  }
}
