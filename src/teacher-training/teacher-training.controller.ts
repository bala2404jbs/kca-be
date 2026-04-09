import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TeacherTrainingService } from './teacher-training.service';
import { CreateTeacherApplicationDto } from './dto/create-teacher-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';

@ApiTags('Teacher Training')
@Controller('teacher-training')
export class TeacherTrainingController {
  constructor(private readonly service: TeacherTrainingService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new teacher application' })
  submit(@Body() createDto: CreateTeacherApplicationDto) {
    return this.service.create(createDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all applications (Admin only)' })
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update status (Admin only)' })
  updateStatus(@Param('id') id: string, @Body() updateDto: UpdateApplicationStatusDto) {
    return this.service.updateStatus(id, updateDto);
  }
}
