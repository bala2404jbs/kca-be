import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum FranchiseType {
  FREE = 'FREE',
  FREELANCER = 'FREELANCER',
  UNIT = 'UNIT',
  MASTER = 'MASTER',
}

export enum FranchiseStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  AGREEMENT = 'AGREEMENT',
  ACTIVE = 'ACTIVE',
  REJECTED = 'REJECTED',
}

@Entity('franchise_inquiries')
export class FranchiseInquiry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: FranchiseType })
  franchiseType: FranchiseType;

  @Column({ type: 'enum', enum: FranchiseStatus, default: FranchiseStatus.NEW })
  status: FranchiseStatus;

  @CreateDateColumn()
  createdAt: Date;
}
