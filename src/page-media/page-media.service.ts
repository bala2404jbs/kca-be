import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageMedia } from '../database/entities/page-media.entity';
import { UpdatePageMediaDto } from './dto/update-page-media.dto';

@Injectable()
export class PageMediaService {
  constructor(
    @InjectRepository(PageMedia)
    private readonly repo: Repository<PageMedia>,
  ) {}

  async findByPage(page: string): Promise<PageMedia> {
    const record = await this.repo.findOne({ where: { page } });
    if (!record) throw new NotFoundException(`No media found for page: ${page}`);
    return record;
  }

  async upsert(page: string, dto: UpdatePageMediaDto): Promise<PageMedia> {
    let record = await this.repo.findOne({ where: { page } });
    if (!record) {
      record = this.repo.create({ page });
    }
    Object.assign(record, dto);
    return this.repo.save(record);
  }
}
