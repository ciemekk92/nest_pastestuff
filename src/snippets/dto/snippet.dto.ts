import { Expose } from 'class-transformer';

export class SnippetDto {
  @Expose()
  id: string;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  isProtected: boolean;
}
