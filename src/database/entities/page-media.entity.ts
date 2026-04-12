import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

export type PageKey = 'about' | 'franchise' | 'teacher-training' | 'institutions';

@Entity('page_media')
export class PageMedia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  page: string;

  @Column({ nullable: true })
  heroImageUrl: string;

  @Column('simple-array', { nullable: true })
  galleryImages: string[];

  @Column('simple-array', { nullable: true })
  youtubeVideoIds: string[];

  @Column({ default: 0 })
  order: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
