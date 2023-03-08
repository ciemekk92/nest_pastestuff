import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { RequiredWhenTrue } from '../../decorators/RequiredWhenTrue';

export class CreateSnippetDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isProtected?: boolean;

  @ApiProperty()
  @RequiredWhenTrue('isProtected', { message: 'Password is required.' })
  password?: string;
}
