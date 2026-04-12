import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('visitor_stats')
export class VisitorStats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pagePath: string;

  @Column({ nullable: true })
  ipHash: string;

  @CreateDateColumn()
  timestamp: Date;
}
