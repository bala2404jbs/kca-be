import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UnsubscribeDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
