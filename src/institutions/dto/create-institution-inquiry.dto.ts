import { IsString, IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInstitutionInquiryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  institutionName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  contactPerson: string;

  @ApiProperty()
  @Matches(/^[0-9+\-\s]{7,15}$/)
  contactNumber: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
