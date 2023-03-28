import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { PrismaService } from '../prisma/prisma.service';
import { hoursToMs } from '../utils/hoursToMs';

@Injectable()
export class SnippetsCronService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private prismaService: PrismaService
  ) {}

  createDeleteSnippetJob(snippetId: string, hours: number) {
    Logger.log(`Created delete job for snippet with id ${snippetId}`);
    const job = new CronJob(
      new Date(Date.now() + hoursToMs(hours)),
      async () => {
        await this.prismaService.snippet.delete({ where: { id: snippetId } });
        Logger.log(
          `Removed snippet with id ${snippetId} after ${hours} hours.`
        );
      }
    );

    this.schedulerRegistry.addCronJob(`remove_${snippetId}`, job);
    job.start();
  }

  async restartSavedJobs() {
    const snippets = await this.prismaService.snippet.findMany({
      where: { metadata: { deleteAfterHours: { gte: 0 } } },
      include: { metadata: true }
    });

    snippets.forEach(async ({ id, createdAt, metadata }) => {
      const dateToDelete = new Date(
        createdAt.getTime() + hoursToMs(metadata?.deleteAfterHours ?? 0)
      );

      if (dateToDelete.getTime() < Date.now()) {
        await this.prismaService.snippet.delete({ where: { id } });
        Logger.log(
          `Removed snippet with id ${id} after ${metadata?.deleteAfterHours} hours.`
        );
      } else {
        Logger.log(
          `Recreating job to delete snippet with id ${id} at ${dateToDelete}`
        );
        const job = new CronJob(dateToDelete, async () => {
          async () => {
            await this.prismaService.snippet.delete({ where: { id } });
            Logger.log(
              `Removed snippet with id ${id} after ${metadata?.deleteAfterHours} hours.`
            );
          };
        });

        this.schedulerRegistry.addCronJob(`remove_${id}`, job);
        job.start();
      }
    });
  }

  async onModuleInit(): Promise<void> {
    await this.restartSavedJobs();
  }
}
