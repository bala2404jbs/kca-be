import { IsString, IsEmail, IsNotEmpty, IsEnum, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FranchiseType } from '../../database/entities/franchise-inquiry.entity';

export class CreateFranchiseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @Matches(/^[0-9+\-\s]{7,15}$/)
  phone: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: FranchiseType })
  @IsEnum(FranchiseType)
  franchiseType: FranchiseType;
}
