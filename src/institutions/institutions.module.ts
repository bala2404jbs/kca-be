import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionsController } from './institutions.controller';
import { InstitutionsService } from './institutions.service';
import { InstitutionInquiry } from '../database/entities/institution-inquiry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstitutionInquiry])],
  controllers: [InstitutionsController],
  providers: [InstitutionsService]
})
export class InstitutionsModule {}
