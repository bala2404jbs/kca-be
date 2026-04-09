import { IsString, IsNotEmpty, IsEnum, IsBoolean, IsOptional, IsArray, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProgramCategory } from '../../database/entities/program.entity';

export class CreateProgramDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug must be lower-case with hyphens' })
  slug: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ageRange: string;

  @ApiProperty({ enum: ProgramCategory })
  @IsEnum(ProgramCategory)
  category: ProgramCategory;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  scope: string;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  youtubeVideoId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  heroImageUrl?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  galleryImages?: string[];

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  youtubeVideoIds?: string[];
}
