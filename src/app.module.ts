import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnippetsModule } from './snippets/snippets.module';
import { SnippetMetadatasModule } from './snippet-metadatas/snippet-metadatas.module';
import { SnippetsCronModule } from './snippets-cron/snippets-cron.module';
import ConfigurationSchema from './config/config.schema';

@Module({
  imports: [
    SnippetsModule,
    SnippetMetadatasModule,
    SnippetsCronModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      cache: true,
      envFilePath: ['.env'],
      isGlobal: true,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true
      },
      validate: (config) => {
        const validatedConfig = ConfigurationSchema.safeParse(config);

        if (validatedConfig.success) {
          return validatedConfig.data;
        }

        Logger.error(validatedConfig.error.formErrors);
        throw Error();
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
