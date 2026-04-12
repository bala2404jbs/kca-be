import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PageMediaService } from './page-media.service';
import { UpdatePageMediaDto } from './dto/update-page-media.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Page Media')
@Controller('page-media')
export class PageMediaController {
  constructor(private readonly service: PageMediaService) {}

  @Get()
  @ApiOperation({ summary: 'Get all page media records (Public)' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':page')
  @ApiOperation({ summary: 'Get media for a page (Public)' })
  findByPage(@Param('page') page: string) {
    return this.service.findByPage(page);
  }

  @Patch(':page')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update media for a page (Admin only)' })
  upsert(@Param('page') page: string, @Body() dto: UpdatePageMediaDto) {
    return this.service.upsert(page, dto);
  }
}
