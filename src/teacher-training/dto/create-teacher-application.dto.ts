import { IsString, IsEmail, IsNotEmpty, IsEnum, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TeacherSpecialization } from '../../database/entities/teacher-application.entity';

export class CreateTeacherApplicationDto {
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

  @ApiProperty({ enum: TeacherSpecialization })
  @IsEnum(TeacherSpecialization)
  specialization: TeacherSpecialization;
}
