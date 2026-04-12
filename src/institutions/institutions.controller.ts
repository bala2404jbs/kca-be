import { Controller, Get, Post, Body, Patch, Param, UseGuards, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionInquiryDto } from './dto/create-institution-inquiry.dto';
import { UpdateInstitutionStatusDto } from './dto/update-institution-status.dto';

@ApiTags('Institutions')
@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly service: InstitutionsService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new partnership inquiry' })
  submit(@Body() createDto: CreateInstitutionInquiryDto) {
    return this.service.create(createDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all inquiries (Admin only)' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a single inquiry (Admin only)' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update status (Admin only)' })
  updateStatus(@Param('id') id: string, @Body() updateDto: UpdateInstitutionStatusDto) {
    return this.service.updateStatus(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete inquiry (Admin only)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
