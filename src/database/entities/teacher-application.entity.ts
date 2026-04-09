import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum TeacherSpecialization {
  ABACUS = 'ABACUS',
  VEDIC_MATHS = 'VEDIC_MATHS',
  HANDWRITING = 'HANDWRITING',
}

export enum ApplicationStatus {
  APPLIED = 'APPLIED',
  SHORTLISTED = 'SHORTLISTED',
  TRAINING = 'TRAINING',
  CERTIFIED = 'CERTIFIED',
  REJECTED = 'REJECTED',
}

@Entity('teacher_applications')
export class TeacherApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: TeacherSpecialization })
  specialization: TeacherSpecialization;

  @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.APPLIED })
  status: ApplicationStatus;

  @CreateDateColumn()
  createdAt: Date;
}
