import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsStrongPassword, IsString } from 'class-validator';

export class CreateSnippetDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsStrongPassword({ minLength: 6, minUppercase: 1, minSymbols: 1 })
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  timeToLiveMs?: number;
}
