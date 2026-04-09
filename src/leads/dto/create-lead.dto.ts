import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, IsOptional, Min, Max, IsInt, IsEnum, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProgramInterest, LeadSource } from '../../database/entities/lead.entity';

export class CreateLeadDto {
  @ApiProperty({ example: 'John Doe Parents' })
  @IsString()
  @IsNotEmpty()
  parentName: string;

  @ApiProperty({ example: 'Johnny Doe' })
  @IsString()
  @IsNotEmpty()
  childName: string;

  @ApiProperty({ example: 8 })
  @IsInt()
  @Min(3)
  @Max(18)
  childAge: number;

  @ApiProperty({ enum: ProgramInterest })
  @IsEnum(ProgramInterest)
  programInterested: ProgramInterest;

  @ApiProperty({ example: '+1234567890' })
  @Matches(/^[0-9+\-\s]{7,15}$/)
  phone: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+1234567890', required: false })
  @IsOptional()
  @IsString()
  whatsappNumber?: string;

  @ApiProperty({ enum: LeadSource })
  @IsEnum(LeadSource)
  source: LeadSource;
}
