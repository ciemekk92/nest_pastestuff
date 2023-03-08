import { ApiProperty } from '@nestjs/swagger';

export class CreateSnippetDto {
  @ApiProperty()
  content: string;
}
