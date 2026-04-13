import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    reservation: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new reservation', async () => {
      const dto = {
        dateDebut: new Date(),
        dateFin: new Date(),
        montantTotal: 500,
        locataireId: 'user1',
        bienId: 'bien1',
      };
      mockPrismaService.reservation.create.mockResolvedValue({ id: 'res1', ...dto });

      expect(await service.create(dto as any)).toEqual({ id: 'res1', ...dto });
      expect(mockPrismaService.reservation.create).toHaveBeenCalled();
    });
  });
});
