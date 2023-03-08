import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSnippetDto } from './create-snippet.dto';

export class UpdateSnippetDto extends PartialType(CreateSnippetDto) {
  @ApiProperty()
  content?: string;
}
