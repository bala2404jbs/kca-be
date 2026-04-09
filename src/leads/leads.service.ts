import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../database/entities/lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadStatusDto } from './dto/update-lead-status.dto';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async create(createLeadDto: CreateLeadDto) {
    const lead = this.leadRepository.create(createLeadDto);
    // TODO: Send confirmation email
    return await this.leadRepository.save(lead);
  }

  async findAll() {
    return await this.leadRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const lead = await this.leadRepository.findOne({ where: { id } });
    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }

  async updateStatus(id: string, updateLeadStatusDto: UpdateLeadStatusDto) {
    const lead = await this.findOne(id);
    lead.status = updateLeadStatusDto.status;
    return await this.leadRepository.save(lead);
  }

  async remove(id: string) {
    const lead = await this.findOne(id);
    return await this.leadRepository.remove(lead);
  }
}
