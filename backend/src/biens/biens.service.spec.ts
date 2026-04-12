import { Test, TestingModule } from '@nestjs/testing';
import { BiensService } from './biens.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BiensService', () => {
  let service: BiensService;
  let prisma: PrismaService;

  const mockPrismaService = {
    bien: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BiensService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<BiensService>(BiensService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of biens', async () => {
      const result = [{ id: '1', titre: 'Test Bien' }];
      mockPrismaService.bien.findMany.mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
      expect(mockPrismaService.bien.findMany).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new bien', async () => {
      const dto = { titre: 'New Bien', description: 'Desc', prix: 100, adresse: 'Dakar', proprietaireId: 'user1' };
      mockPrismaService.bien.create.mockResolvedValue({ id: '1', ...dto });

      expect(await service.create(dto)).toEqual({ id: '1', ...dto });
      expect(mockPrismaService.bien.create).toHaveBeenCalledWith({ data: dto });
    });
  });
});
