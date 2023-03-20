import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from '../prisma/prisma.module';
import { SnippetsCronService } from './snippets-cron.service';

@Module({
  providers: [SnippetsCronService],
  imports: [ScheduleModule, PrismaModule],
  exports: [SnippetsCronService]
})
export class SnippetsCronModule {}
