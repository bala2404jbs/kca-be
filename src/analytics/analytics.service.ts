import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisitorStats } from '../database/entities/visitor-stats.entity';
import * as crypto from 'crypto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(VisitorStats)
    private readonly repository: Repository<VisitorStats>,
  ) {}

  async trackVisit(path: string, ip: string) {
    // Basic IP hashing for privacy and unique tracking in a simplified way
    const ipHash = crypto.createHash('md5').update(ip || 'anonymous').digest('hex');
    
    // Check if this IP tracked ANY visit in the last 24 hours to avoid inflation
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existing = await this.repository.findOne({
      where: {
        ipHash: ipHash,
      },
      order: { timestamp: 'DESC' }
    });

    if (existing && existing.timestamp > twentyFourHoursAgo) {
      return { status: 'skipped' };
    }

    const hit = this.repository.create({ pagePath: path, ipHash });
    await this.repository.save(hit);
    return { status: 'logged' };
  }

  async getVisitorCount() {
    const BASE_COUNT = 29863;
    // Total hits
    const currentHits = await this.repository.count();
    // Unique visitors (by IP hash)
    const uniqueResult = await this.repository
      .createQueryBuilder('hit')
      .select('COUNT(DISTINCT(hit.ipHash))', 'count')
      .getRawOne();
    
    return {
      totalHits: BASE_COUNT + parseInt(uniqueResult.count || '0'),
      uniqueVisitors: parseInt(uniqueResult.count || '0'),
    };
  }
}
