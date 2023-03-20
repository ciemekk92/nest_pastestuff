import { Module } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { SnippetsController } from './snippets.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { SnippetMetadatasModule } from '../snippet-metadatas/snippet-metadatas.module';
import { SnippetsCronModule } from '../snippets-cron/snippets-cron.module';

@Module({
  imports: [PrismaModule, SnippetMetadatasModule, SnippetsCronModule],
  controllers: [SnippetsController],
  providers: [SnippetsService]
})
export class SnippetsModule {}
