import { Module } from '@nestjs/common';
import { SnippetMetadatasService } from './snippet-metadatas.service';
import { SnippetMetadatasController } from './snippet-metadatas.controller';

@Module({
  controllers: [SnippetMetadatasController],
  providers: [SnippetMetadatasService]
})
export class SnippetMetadatasModule {}
