import { Test, TestingModule } from '@nestjs/testing';
import { PaiementsService } from './paiements.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaydunyaService } from './paydunya.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('PaiementsService', () => {
  let service: PaiementsService;
  let prisma: PrismaService;
  let paydunya: PaydunyaService;

  const mockPrismaService = {
    paiement: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      aggregate: jest.fn(),
      groupBy: jest.fn(),
    },
    reservation: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockPaydunyaService = {
    createInvoice: jest.fn(),
    confirmPayment: jest.fn(),
  };

  const mockReservation = {
    id: 'res-1',
    bienId: 'bien-1',
    locataireId: 'user-2',
    montantTotal: 50000,
    dateDebut: new Date('2026-05-01'),
    dateFin: new Date('2026-05-10'),
    statut: 'EN_ATTENTE',
    bien: { id: 'bien-1', titre: 'Appartement' },
    locataire: { id: 'user-2', nom: 'John Doe' },
    paiements: [],
  };

  const mockPaiement = {
    id: 'paiement-1',
    reservationId: 'res-1',
    montant: 50000,
    statut: 'EN_ATTENTE',
    referencePayDunya: 'token-123',
    datePaiement: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaiementsService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: PaydunyaService, useValue: mockPaydunyaService },
      ],
    }).compile();

    service = module.get<PaiementsService>(PaiementsService);
    prisma = module.get<PrismaService>(PrismaService);
    paydunya = module.get<PaydunyaService>(PaydunyaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a payment successfully', async () => {
      const createDto = {
        reservationId: 'res-1',
        montant: 50000,
      };

      mockPrismaService.reservation.findUnique.mockResolvedValue(mockReservation);
      mockPaydunyaService.createInvoice.mockResolvedValue({ token: 'token-123' });
      mockPrismaService.paiement.create.mockResolvedValue({
        ...mockPaiement,
        reservation: mockReservation,
      });

      const result = await service.create(createDto as any);

      expect(result).toHaveProperty('id');
      expect(result.statut).toBe('EN_ATTENTE');
      expect(mockPrismaService.paiement.create).toHaveBeenCalled();
    });

    it('should throw NotFoundException if reservation does not exist', async () => {
      const createDto = {
        reservationId: 'invalid-id',
        montant: 50000,
      };

      mockPrismaService.reservation.findUnique.mockResolvedValue(null);

      await expect(service.create(createDto as any)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if amount is zero or negative', async () => {
      const createDto = {
        reservationId: 'res-1',
        montant: -100,
      };

      mockPrismaService.reservation.findUnique.mockResolvedValue(mockReservation);

      await expect(service.create(createDto as any)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if payment already confirmed', async () => {
      const createDto = {
        reservationId: 'res-1',
        montant: 50000,
      };

      mockPrismaService.reservation.findUnique.mockResolvedValue({
        ...mockReservation,
        paiements: [{ ...mockPaiement, statut: 'CONFIRMEE' }],
      });

      await expect(service.create(createDto as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('handlePaydunyaCallback', () => {
    it('should update payment to CONFIRMEE on successful callback', async () => {
      const payload = {
        status: 'completed' as const,
        token: 'token-123',
      };

      mockPrismaService.paiement.findFirst.mockResolvedValue({
        ...mockPaiement,
        reservation: mockReservation,
      });

      const updatedPaiement = { ...mockPaiement, statut: 'CONFIRMEE' };
      mockPrismaService.paiement.update.mockResolvedValue(updatedPaiement);

      const result = await service.handlePaydunyaCallback(payload);

      expect(result.statut).toBe('CONFIRMEE');
      expect(mockPrismaService.reservation.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'res-1' },
          data: { statut: 'CONFIRMEE' },
        }),
      );
    });

    it('should update payment to ECHOUEE on failed callback', async () => {
      const payload = {
        status: 'failed' as const,
        token: 'token-123',
      };

      mockPrismaService.paiement.findFirst.mockResolvedValue({
        ...mockPaiement,
        reservation: mockReservation,
      });

      const updatedPaiement = { ...mockPaiement, statut: 'ECHOUEE' };
      mockPrismaService.paiement.update.mockResolvedValue(updatedPaiement);

      const result = await service.handlePaydunyaCallback(payload);

      expect(result.statut).toBe('ECHOUEE');
    });
  });

  describe('findOne', () => {
    it('should return a payment by id', async () => {
      mockPrismaService.paiement.findUnique.mockResolvedValue(mockPaiement);

      const result = await service.findOne('paiement-1');

      expect(result).toEqual(mockPaiement);
    });

    it('should throw NotFoundException if payment does not exist', async () => {
      mockPrismaService.paiement.findUnique.mockResolvedValue(null);

      await expect(service.findOne('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getPaymentStatistics', () => {
    it('should return payment statistics', async () => {
      mockPrismaService.paiement.aggregate.mockResolvedValue({
        _sum: { montant: 150000 },
        _count: 3,
      });

      mockPrismaService.paiement.groupBy.mockResolvedValue([
        {
          statut: 'CONFIRMEE',
          _sum: { montant: 100000 },
          _count: 2,
        },
      ]);

      const result = await service.getPaymentStatistics();

      expect(result.totalConfirmed).toBe(150000);
      expect(result.countConfirmed).toBe(3);
      expect(result.byStatus).toHaveLength(1);
    });
  });
});