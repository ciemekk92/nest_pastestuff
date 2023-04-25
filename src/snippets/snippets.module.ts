import { Module } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { SnippetsController } from './snippets.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { SnippetMetadatasModule } from '../snippet-metadatas/snippet-metadatas.module';

@Module({
  imports: [PrismaModule, SnippetMetadatasModule],
  controllers: [SnippetsController],
  providers: [SnippetsService],
  exports: [SnippetsService]
})
export class SnippetsModule {}
