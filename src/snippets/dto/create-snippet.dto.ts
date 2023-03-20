import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

export class CreateSnippetDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(6, { message: 'Password must have minimum 6 characters' })
  @MaxLength(20, { message: 'Password must have maximum of 20 characters' })
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  deleteAfterHours?: number;
}
