import { Module } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { SnippetsController } from './snippets.controller';
import { PrismaModule } from '../../src/prisma/prisma.module';

@Module({
  controllers: [SnippetsController],
  providers: [SnippetsService],
  imports: [PrismaModule],
})
export class SnippetsModule {}
