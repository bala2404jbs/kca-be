import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum ProgramCategory {
  MATHS = 'MATHS',
  ENGLISH = 'ENGLISH',
  BRAIN_DEVELOPMENT = 'BRAIN_DEVELOPMENT',
  TEACHER_TRAINING = 'TEACHER_TRAINING',
}

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  ageRange: string;

  @Column({ type: 'enum', enum: ProgramCategory })
  category: ProgramCategory;

  @Column()
  duration: string;

  @Column()
  scope: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column({ nullable: true })
  youtubeVideoId: string;

  @Column({ nullable: true })
  heroImageUrl: string;

  @Column('simple-array', { nullable: true })
  galleryImages: string[];

  @Column('simple-array', { nullable: true })
  youtubeVideoIds: string[];

  @CreateDateColumn()
  createdAt: Date;
}
