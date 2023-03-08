import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { RequiredWhenTrue } from '../../decorators/RequiredWhenTrue';
import { CreateSnippetDto } from './create-snippet.dto';

export class UpdateSnippetDto extends PartialType(CreateSnippetDto) {
  @ApiProperty()
  @IsString()
  content?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isProtected?: boolean;

  @ApiProperty()
  @RequiredWhenTrue('isProtected', { message: 'Password is required.' })
  password?: string;
}
