import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnippetsModule } from './snippets/snippets.module';
import { SnippetMetadatasModule } from './snippet-metadatas/snippet-metadatas.module';

@Module({
  imports: [SnippetsModule, SnippetMetadatasModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
