import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherApplication } from '../database/entities/teacher-application.entity';
import { CreateTeacherApplicationDto } from './dto/create-teacher-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';

@Injectable()
export class TeacherTrainingService {
  constructor(
    @InjectRepository(TeacherApplication)
    private readonly repository: Repository<TeacherApplication>,
  ) {}

  async create(createDto: CreateTeacherApplicationDto) {
    const application = this.repository.create(createDto);
    return await this.repository.save(application);
  }

  async findAll() {
    return await this.repository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const application = await this.repository.findOne({ where: { id } });
    if (!application) throw new NotFoundException('Application not found');
    return application;
  }

  async updateStatus(id: string, updateDto: UpdateApplicationStatusDto) {
    const application = await this.findOne(id);
    application.status = updateDto.status;
    return await this.repository.save(application);
  }

  async remove(id: string) {
    const application = await this.findOne(id);
    return await this.repository.remove(application);
  }
}
