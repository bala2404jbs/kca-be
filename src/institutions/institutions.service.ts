import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstitutionInquiry } from '../database/entities/institution-inquiry.entity';
import { CreateInstitutionInquiryDto } from './dto/create-institution-inquiry.dto';
import { UpdateInstitutionStatusDto } from './dto/update-institution-status.dto';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(InstitutionInquiry)
    private readonly inquiryRepository: Repository<InstitutionInquiry>,
  ) {}

  async create(createDto: CreateInstitutionInquiryDto) {
    const inquiry = this.inquiryRepository.create(createDto);
    return await this.inquiryRepository.save(inquiry);
  }

  async findAll() {
    return await this.inquiryRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const inquiry = await this.inquiryRepository.findOne({ where: { id } });
    if (!inquiry) throw new NotFoundException('Inquiry not found');
    return inquiry;
  }

  async updateStatus(id: string, updateDto: UpdateInstitutionStatusDto) {
    const inquiry = await this.findOne(id);
    inquiry.status = updateDto.status;
    return await this.inquiryRepository.save(inquiry);
  }
}
