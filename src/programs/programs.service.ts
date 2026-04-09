import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from '../database/entities/program.entity';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly repository: Repository<Program>,
  ) {}

  async create(createDto: CreateProgramDto) {
    const existing = await this.repository.findOne({ where: { slug: createDto.slug } });
    if (existing) throw new ConflictException('Program slug already exists');
    
    const program = this.repository.create(createDto);
    return await this.repository.save(program);
  }

  async findAllActive() {
    return await this.repository.find({ where: { isActive: true }, order: { createdAt: 'DESC' } });
  }
  
  async findAllAdmin() {
    return await this.repository.find({ order: { createdAt: 'DESC' } });
  }

  async findOneBySlug(slug: string) {
    const program = await this.repository.findOne({ where: { slug, isActive: true } });
    if (!program) throw new NotFoundException('Program not found');
    return program;
  }
  
  async findOneById(id: string) {
    const program = await this.repository.findOne({ where: { id } });
    if (!program) throw new NotFoundException('Program not found');
    return program;
  }

  async update(id: string, updateDto: UpdateProgramDto) {
    const program = await this.findOneById(id);
    Object.assign(program, updateDto);
    return await this.repository.save(program);
  }

  async remove(id: string) {
    const program = await this.findOneById(id);
    return await this.repository.remove(program);
  }
}
