import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum InquiryStatus {
  NEW = 'NEW',
  REVIEW = 'REVIEW',
  ONBOARDED = 'ONBOARDED',
  REJECTED = 'REJECTED',
}

@Entity('institution_inquiries')
export class InstitutionInquiry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  institutionName: string;

  @Column()
  contactPerson: string;

  @Column()
  contactNumber: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: InquiryStatus, default: InquiryStatus.NEW })
  status: InquiryStatus;

  @CreateDateColumn()
  createdAt: Date;
}
