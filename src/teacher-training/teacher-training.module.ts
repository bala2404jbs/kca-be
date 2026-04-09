import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherTrainingController } from './teacher-training.controller';
import { TeacherTrainingService } from './teacher-training.service';
import { TeacherApplication } from '../database/entities/teacher-application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherApplication])],
  controllers: [TeacherTrainingController],
  providers: [TeacherTrainingService]
})
export class TeacherTrainingModule {}
