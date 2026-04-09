import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FranchiseService } from './franchise.service';
import { CreateFranchiseDto } from './dto/create-franchise-inquiry.dto';
import { UpdateFranchiseStatusDto } from './dto/update-franchise-status.dto';

@ApiTags('Franchise')
@Controller('franchise')
export class FranchiseController {
  constructor(private readonly service: FranchiseService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new franchise inquiry' })
  submit(@Body() createDto: CreateFranchiseDto) {
    return this.service.create(createDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all inquiries (Admin only)' })
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update status (Admin only)' })
  updateStatus(@Param('id') id: string, @Body() updateDto: UpdateFranchiseStatusDto) {
    return this.service.updateStatus(id, updateDto);
  }
}
