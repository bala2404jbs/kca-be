import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InquiryStatus } from '../../database/entities/institution-inquiry.entity';

export class UpdateInstitutionStatusDto {
  @ApiProperty({ enum: InquiryStatus })
  @IsEnum(InquiryStatus)
  status: InquiryStatus;
}
