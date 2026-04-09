import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageMedia } from '../database/entities/page-media.entity';
import { PageMediaController } from './page-media.controller';
import { PageMediaService } from './page-media.service';

@Module({
  imports: [TypeOrmModule.forFeature([PageMedia])],
  controllers: [PageMediaController],
  providers: [PageMediaService],
})
export class PageMediaModule {}
