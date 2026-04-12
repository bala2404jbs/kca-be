import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePageMediaDto {
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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  order?: number;
}
