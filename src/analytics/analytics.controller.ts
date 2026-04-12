import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly service: AnalyticsService) {}

  @Post('track')
  @ApiOperation({ summary: 'Track a page visit' })
  track(@Body('path') path: string, @Req() req: any) {
    const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
    return this.service.trackVisit(path || '/', ip);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get visitor statistics (Admin only)' })
  getStats() {
    return this.service.getVisitorCount();
  }

  @Get('public-stats')
  @ApiOperation({ summary: 'Get public visitor count' })
  getPublicStats() {
    return this.service.getVisitorCount();
  }
}
