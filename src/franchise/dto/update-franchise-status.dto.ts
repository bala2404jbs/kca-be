import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FranchiseStatus } from '../../database/entities/franchise-inquiry.entity';

export class UpdateFranchiseStatusDto {
  @ApiProperty({ enum: FranchiseStatus })
  @IsEnum(FranchiseStatus)
  status: FranchiseStatus;
}
