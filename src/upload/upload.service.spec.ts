import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UploadService } from './upload.service';
import { Upload } from './entities/upload.entity';
import { Repository } from 'typeorm';

describe('UploadService', () => {
  let service: UploadService;
  let repo: Repository<Upload>;

  const mockUpload = {
    id: 1,
    filename: 'test.png',
    originalName: 'original.png',
    mimeType: 'image/png',
    size: 1024,
    url: '/uploads/test.png',
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockUpload),
    save: jest.fn().mockReturnValue(mockUpload),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        {
          provide: getRepositoryToken(Upload),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UploadService>(UploadService);
    repo = module.get<Repository<Upload>>(getRepositoryToken(Upload));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveUploadData', () => {
    it('should save upload data', async () => {
      const mockFile = {
        filename: 'test.png',
        originalname: 'original.png',
        mimetype: 'image/png',
        size: 1024,
      } as Express.Multer.File;

      const url = '/uploads/test.png';
      const result = await service.saveUploadData(mockFile, url);

      expect(result).toEqual(mockUpload);
      expect(repo.create).toHaveBeenCalledWith({
        filename: mockFile.filename,
        originalName: mockFile.originalname,
        mimeType: mockFile.mimetype,
        size: mockFile.size,
        url,
      });
      expect(repo.save).toHaveBeenCalled();
    });
  });
});
