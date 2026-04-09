import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NewsletterService } from './newsletter.service';
import { SubscribeDto } from './dto/subscribe.dto';
import { UnsubscribeDto } from './dto/unsubscribe.dto';

@ApiTags('Newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly service: NewsletterService) {}

  @Post('subscribe')
  @ApiOperation({ summary: 'Subscribe to newsletter' })
  subscribe(@Body() subscribeDto: SubscribeDto) {
    return this.service.subscribe(subscribeDto);
  }

  @Post('unsubscribe')
  @ApiOperation({ summary: 'Unsubscribe from newsletter' })
  unsubscribe(@Body() unsubscribeDto: UnsubscribeDto) {
    return this.service.unsubscribe(unsubscribeDto);
  }

  @Get('subscribers')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all subscribers (Admin only)' })
  findAll() {
    return this.service.findAll();
  }
}
