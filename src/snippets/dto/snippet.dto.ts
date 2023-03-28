import { Expose } from 'class-transformer';

export class SnippetDto {
  @Expose()
  id: string;

  @Expose()
  content: string;

  @Expose()
  title: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
