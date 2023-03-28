import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnippetsModule } from './snippets/snippets.module';
import { SnippetMetadatasModule } from './snippet-metadatas/snippet-metadatas.module';
import { SnippetsCronModule } from './snippets-cron/snippets-cron.module';

@Module({
  imports: [
    SnippetsModule,
    SnippetMetadatasModule,
    SnippetsCronModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
