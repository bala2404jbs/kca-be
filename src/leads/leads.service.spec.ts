import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LeadsService } from './leads.service';
import { Lead, LeadStatus, ProgramInterest, LeadSource } from '../database/entities/lead.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('LeadsService', () => {
  let service: LeadsService;
  let repo: Repository<Lead>;

  const mockLead = {
    id: '1',
    parentName: 'John Doe',
    childName: 'Johnny Doe',
    childAge: 10,
    phone: '1234567890',
    email: 'john@example.com',
    whatsappNumber: '1234567890',
    programInterested: ProgramInterest.CBDP,
    source: LeadSource.PROGRAM_PAGE,
    status: LeadStatus.NEW,
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockLead),
    save: jest.fn().mockReturnValue(mockLead),
    find: jest.fn().mockReturnValue([mockLead]),
    findOne: jest.fn().mockReturnValue(mockLead),
    remove: jest.fn().mockReturnValue(mockLead),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        {
          provide: getRepositoryToken(Lead),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
    repo = module.get<Repository<Lead>>(getRepositoryToken(Lead));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new lead', async () => {
      const dto = {
        parentName: 'John Doe',
        childName: 'Johnny Doe',
        childAge: 10,
        phone: '1234567890',
        email: 'john@example.com',
        programInterested: ProgramInterest.CBDP,
        source: LeadSource.PROGRAM_PAGE,
      };
      const result = await service.create(dto as any);
      expect(result).toEqual(mockLead);
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of leads', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockLead]);
      expect(repo.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single lead', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockLead);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw NotFoundException if lead not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateStatus', () => {
    it('should update lead status', async () => {
      const updateDto = { status: LeadStatus.CONTACTED };
      const result = await service.updateStatus('1', updateDto);
      expect(result.status).toEqual(LeadStatus.CONTACTED);
      expect(repo.save).toHaveBeenCalled();
    });
  });
});
