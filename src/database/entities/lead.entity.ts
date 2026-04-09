import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ProgramInterest {
  ABACUS = 'ABACUS',
  VEDIC_MATHS = 'VEDIC_MATHS',
  HANDWRITING = 'HANDWRITING',
  CBDP = 'CBDP',
  FEEP = 'FEEP',
  SEEP = 'SEEP',
  AIP = 'AIP',
  ROBOTICS = 'ROBOTICS',
}

export enum LeadSource {
  BOOK_DEMO_PAGE = 'BOOK_DEMO_PAGE',
  PROGRAM_PAGE = 'PROGRAM_PAGE',
  HOME_PAGE = 'HOME_PAGE',
}

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  CONVERTED = 'CONVERTED',
  CLOSED = 'CLOSED',
}

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  parentName: string;

  @Column()
  childName: string;

  @Column()
  childAge: number;

  @Column({ type: 'enum', enum: ProgramInterest })
  programInterested: ProgramInterest;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  whatsappNumber: string;

  @Column({ type: 'enum', enum: LeadSource })
  source: LeadSource;

  @Column({ type: 'enum', enum: LeadStatus, default: LeadStatus.NEW })
  status: LeadStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
