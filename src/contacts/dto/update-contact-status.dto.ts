import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContactStatus } from '../../database/entities/contact.entity';

export class UpdateContactStatusDto {
  @ApiProperty({ enum: ContactStatus })
  @IsEnum(ContactStatus)
  status: ContactStatus;
}
