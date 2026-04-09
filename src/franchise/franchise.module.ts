import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FranchiseController } from './franchise.controller';
import { FranchiseService } from './franchise.service';
import { FranchiseInquiry } from '../database/entities/franchise-inquiry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FranchiseInquiry])],
  controllers: [FranchiseController],
  providers: [FranchiseService]
})
export class FranchiseModule {}
