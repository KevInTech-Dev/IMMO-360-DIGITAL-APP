import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';

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
    bien: {
      findUnique: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  };

  const mockBien = {
    id: 'bien-1',
    titre: 'Appartement test',
    prix: 5000,
    proprietaireId: 'user-1',
  };

  const mockUser = {
    id: 'user-2',
    nom: 'John Doe',
    email: 'john@example.com',
    telephone: '+221123456789',
    role: 'CLIENT',
  };

  const mockReservation = {
    id: 'res-1',
    bienId: 'bien-1',
    locataireId: 'user-2',
    dateDebut: new Date('2026-05-01'),
    dateFin: new Date('2026-05-10'),
    montantTotal: 50000,
    statut: 'EN_ATTENTE',
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a reservation successfully', async () => {
      const createDto = {
        bienId: 'bien-1',
        locataireId: 'user-2',
        dateDebut: new Date('2026-05-01'),
        dateFin: new Date('2026-05-10'),
        montantTotal: 50000,
      };

      mockPrismaService.bien.findUnique.mockResolvedValue(mockBien);
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.reservation.findMany.mockResolvedValue([]);
      mockPrismaService.reservation.create.mockResolvedValue({
        ...mockReservation,
        locataire: mockUser,
        bien: mockBien,
      });

      const result = await service.create(createDto as any);

      expect(result).toHaveProperty('id');
      expect(result.statut).toBe('EN_ATTENTE');
      expect(mockPrismaService.bien.findUnique).toHaveBeenCalledWith({
        where: { id: 'bien-1' },
      });
    });

    it('should throw NotFoundException if property does not exist', async () => {
      const createDto = {
        bienId: 'invalid-id',
        locataireId: 'user-2',
        dateDebut: new Date('2026-05-01'),
        dateFin: new Date('2026-05-10'),
        montantTotal: 50000,
      };

      mockPrismaService.bien.findUnique.mockResolvedValue(null);

      await expect(service.create(createDto as any)).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if dates overlap', async () => {
      const createDto = {
        bienId: 'bien-1',
        locataireId: 'user-2',
        dateDebut: new Date('2026-05-01'),
        dateFin: new Date('2026-05-10'),
        montantTotal: 50000,
      };

      mockPrismaService.bien.findUnique.mockResolvedValue(mockBien);
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.reservation.findMany.mockResolvedValue([
        {
          id: 'existing-res',
          dateDebut: new Date('2026-05-05'),
          dateFin: new Date('2026-05-15'),
          statut: 'CONFIRMEE',
        },
      ]);

      await expect(service.create(createDto as any)).rejects.toThrow(ConflictException);
    });

    it('should throw BadRequestException if end date is before start date', async () => {
      const createDto = {
        bienId: 'bien-1',
        locataireId: 'user-2',
        dateDebut: new Date('2026-05-10'),
        dateFin: new Date('2026-05-01'),
        montantTotal: 50000,
      };

      await expect(service.create(createDto as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all reservations', async () => {
      mockPrismaService.reservation.findMany.mockResolvedValue([mockReservation]);

      const result = await service.findAll();

      expect(result).toEqual([mockReservation]);
      expect(mockPrismaService.reservation.findMany).toHaveBeenCalled();
    });

    it('should filter by bienId', async () => {
      mockPrismaService.reservation.findMany.mockResolvedValue([mockReservation]);

      await service.findAll({ bienId: 'bien-1' });

      expect(mockPrismaService.reservation.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ bienId: 'bien-1' }),
        }),
      );
    });
  });

  describe('findOne', () => {
    it('should return a reservation by id', async () => {
      mockPrismaService.reservation.findUnique.mockResolvedValue(mockReservation);

      const result = await service.findOne('res-1');

      expect(result).toEqual(mockReservation);
    });

    it('should throw NotFoundException if reservation does not exist', async () => {
      mockPrismaService.reservation.findUnique.mockResolvedValue(null);

      await expect(service.findOne('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('cancel', () => {
    it('should cancel a reservation', async () => {
      mockPrismaService.reservation.findUnique.mockResolvedValue(mockReservation);
      const cancelledReservation = { ...mockReservation, statut: 'ANNULEE' };
      mockPrismaService.reservation.update.mockResolvedValue(cancelledReservation);

      const result = await service.cancel('res-1');

      expect(result.statut).toBe('ANNULEE');
    });

    it('should throw BadRequestException if already cancelled', async () => {
      mockPrismaService.reservation.findUnique.mockResolvedValue({
        ...mockReservation,
        statut: 'ANNULEE',
      });

      await expect(service.cancel('res-1')).rejects.toThrow(BadRequestException);
    });
  });
});
