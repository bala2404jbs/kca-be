import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@ApiTags('Programs')
@Controller('programs')
export class ProgramsController {
  constructor(private readonly service: ProgramsService) {}

  @Get()
  @ApiOperation({ summary: 'List active programs (Public)' })
  findAllActive() {
    return this.service.findAllActive();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get single active program by slug (Public)' })
  findOneBySlug(@Param('slug') slug: string) {
    return this.service.findOneBySlug(slug);
  }

  // Admin Endpoints
  
  @Get('admin/all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all programs (Admin only)' })
  findAllAdmin() {
    return this.service.findAllAdmin();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create program (Admin only)' })
  create(@Body() createDto: CreateProgramDto) {
    return this.service.create(createDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update program (Admin only)' })
  update(@Param('id') id: string, @Body() updateDto: UpdateProgramDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete program (Admin only)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
