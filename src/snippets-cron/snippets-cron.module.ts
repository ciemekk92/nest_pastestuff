import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { SnippetsModule } from '../snippets/snippets.module';
import { SnippetsCronService } from './snippets-cron.service';

@Module({
  providers: [SnippetsCronService],
  imports: [ScheduleModule, SnippetsModule, ConfigModule],
  exports: [SnippetsCronService]
})
export class SnippetsCronModule {}
