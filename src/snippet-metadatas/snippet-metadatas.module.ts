import { Module } from '@nestjs/common';
import { SnippetMetadatasService } from './snippet-metadatas.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [SnippetMetadatasService],
  imports: [PrismaModule],
  exports: [SnippetMetadatasService]
})
export class SnippetMetadatasModule {}
