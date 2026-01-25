import { Test, TestingModule } from '@nestjs/testing';
import { ModuleService } from './module.service';
import { MODULE_REPO } from '../tokens';
import { NotFoundException } from '@nestjs/common';

const mockModuleRepo = {
  findAll: jest.fn(),
  findByCode: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('ModuleService', () => {
  let service: ModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModuleService,
        {
          provide: MODULE_REPO,
          useValue: mockModuleRepo,
        },
      ],
    }).compile();

    service = module.get<ModuleService>(ModuleService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should return an array of modules', async () => {
      const result = [{ code: 'M1' }];
      mockModuleRepo.findAll.mockResolvedValue(result);
      const modules = await service.list({});
      expect(modules).toBe(result);
      expect(mockModuleRepo.findAll).toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('should return a module by code', async () => {
      const result = { code: 'M1' };
      mockModuleRepo.findByCode.mockResolvedValue(result);
      const module = await service.get('M1');
      expect(module).toBe(result);
    });
  });

  describe('ensure', () => {
    it('should throw NotFoundException if module does not exist', async () => {
      mockModuleRepo.findByCode.mockResolvedValue(null);
      await expect(service.ensure('M1')).rejects.toThrow(NotFoundException);
    });

    it('should return module if it exists', async () => {
      const result = { code: 'M1' };
      mockModuleRepo.findByCode.mockResolvedValue(result);
      expect(await service.ensure('M1')).toBe(result);
    });
  });

  describe('delete', () => {
    it('should throw NotFoundException if delete returns false', async () => {
      mockModuleRepo.delete.mockResolvedValue(false);
      await expect(service.delete('M1')).rejects.toThrow(NotFoundException);
    });

    it('should return true if delete succeeds', async () => {
      mockModuleRepo.delete.mockResolvedValue(true);
      expect(await service.delete('M1')).toBe(true);
    });
  });
});
