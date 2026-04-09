import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsletterSubscriber } from '../database/entities/newsletter-subscriber.entity';
import { SubscribeDto } from './dto/subscribe.dto';
import { UnsubscribeDto } from './dto/unsubscribe.dto';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(NewsletterSubscriber)
    private readonly repository: Repository<NewsletterSubscriber>,
  ) {}

  async subscribe(subscribeDto: SubscribeDto) {
    const existing = await this.repository.findOne({ where: { email: subscribeDto.email } });
    if (existing) {
      if (existing.isActive) throw new ConflictException('Already subscribed');
      existing.isActive = true;
      return await this.repository.save(existing);
    }
    const subscriber = this.repository.create({ email: subscribeDto.email });
    return await this.repository.save(subscriber);
  }

  async unsubscribe(unsubscribeDto: UnsubscribeDto) {
    const existing = await this.repository.findOne({ where: { email: unsubscribeDto.email } });
    if (!existing) throw new NotFoundException('Subscriber not found');
    existing.isActive = false;
    return await this.repository.save(existing);
  }

  async findAll() {
    return await this.repository.find({ order: { subscribedAt: 'DESC' } });
  }
}
