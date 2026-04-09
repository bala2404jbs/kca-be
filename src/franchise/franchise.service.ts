import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FranchiseInquiry } from '../database/entities/franchise-inquiry.entity';
import { CreateFranchiseDto } from './dto/create-franchise-inquiry.dto';
import { UpdateFranchiseStatusDto } from './dto/update-franchise-status.dto';

@Injectable()
export class FranchiseService {
  constructor(
    @InjectRepository(FranchiseInquiry)
    private readonly repository: Repository<FranchiseInquiry>,
  ) {}

  async create(createDto: CreateFranchiseDto) {
    const inquiry = this.repository.create(createDto);
    return await this.repository.save(inquiry);
  }

  async findAll() {
    return await this.repository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const inquiry = await this.repository.findOne({ where: { id } });
    if (!inquiry) throw new NotFoundException('Franchise inquiry not found');
    return inquiry;
  }

  async updateStatus(id: string, updateDto: UpdateFranchiseStatusDto) {
    const inquiry = await this.findOne(id);
    inquiry.status = updateDto.status;
    return await this.repository.save(inquiry);
  }
}
