import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaydunyaService } from './paydunya.service';

interface PaydunyaInvoiceResponse {
  token?: string;
  [key: string]: unknown;
}

interface PaydunyaCallbackPayload {
  status: 'completed' | 'failed' | 'cancelled';
  token: string;
  [key: string]: unknown;
}

@Injectable()
export class PaiementsService {
  private readonly logger = new Logger(PaiementsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly paydunya: PaydunyaService,
  ) {}

  async create(createPaiementDto: CreatePaiementDto) {
    try {
      // 1. Vérifier si la réservation existe
      const reservation = await this.prisma.reservation.findUnique({
        where: { id: createPaiementDto.reservationId },
        include: {
          bien: true,
          locataire: true,
          paiements: true,
        },
      });

      if (!reservation) {
        throw new NotFoundException('Réservation introuvable');
      }

      // 2. Vérifier qu'il n'y a pas déjà un paiement confirmer pour cette réservation
      const existingConfirmedPayment = reservation.paiements.find(
        (p) => p.statut === 'CONFIRMEE',
      );

      if (existingConfirmedPayment) {
        throw new BadRequestException(
          'Un paiement confirmé existe déjà pour cette réservation',
        );
      }

      // 3. Valider le montant
      const montant = createPaiementDto.montant || reservation.montantTotal;

      if (montant <= 0) {
        throw new BadRequestException('Le montant doit être supérieur à zéro');
      }

      // 4. Créer la facture PayDunya
      let token: string | undefined;
      try {
        const paydunyaInvoice = (await this.paydunya.createInvoice(
          reservation,
          montant,
        )) as PaydunyaInvoiceResponse;

        token = paydunyaInvoice?.token;

        if (!token) {
          this.logger.warn('PayDunya token not found in invoice response');
        }
      } catch (error) {
        this.logger.error(`Erreur lors de la création PayDunya: ${error.message}`);
        throw new BadRequestException(
          'Impossible de créer la facture de paiement. Veuillez réessayer.',
        );
      }

      // 5. Enregistrer le paiement en attente
      const paiement = await this.prisma.paiement.create({
        data: {
          ...createPaiementDto,
          montant,
          referencePayDunya: token || undefined,
          statut: 'EN_ATTENTE',
          datePaiement: null,
        },
        include: {
          reservation: {
            include: {
              bien: true,
              locataire: true,
            },
          },
        },
      });

      this.logger.log(
        `Paiement créé: ${paiement.id} pour réservation ${paiement.reservationId}`,
      );

      return {
        ...paiement,
        checkoutUrl: token
          ? `https://app.paydunya.com/checkout/${token}`
          : undefined,
      };
    } catch (error) {
      this.logger.error(`Erreur lors de la création du paiement: ${error.message}`);
      throw error;
    }
  }

  async handlePaydunyaCallback(payload: PaydunyaCallbackPayload) {
    try {
      // 1. Trouver le paiement avec le token PayDunya
      const paiement = await this.prisma.paiement.findFirst({
        where: { referencePayDunya: payload.token },
        include: { reservation: true },
      });

      if (!paiement) {
        this.logger.warn(
          `Callback PayDunya: Paiement introuvable pour token ${payload.token}`,
        );
        return;
      }

      // 2. Mettre à jour le statut basé sur la réponse
      const newStatus =
        payload.status === 'completed'
          ? 'CONFIRMEE'
          : payload.status === 'failed'
            ? 'ECHOUEE'
            : 'ANNULEE';

      const updatedPaiement = await this.prisma.paiement.update({
        where: { id: paiement.id },
        data: {
          statut: newStatus,
          datePaiement: newStatus === 'CONFIRMEE' ? new Date() : null,
        },
        include: { reservation: true },
      });

      // 3. Si paiement confirmé, mettre à jour le statut de réservation
      if (newStatus === 'CONFIRMEE') {
        await this.prisma.reservation.update({
          where: { id: paiement.reservationId },
          data: { statut: 'CONFIRMEE' },
        });

        this.logger.log(
          `Paiement confirmé: ${paiement.id}, réservation ${paiement.reservationId} confirmée`,
        );
      } else {
        this.logger.log(`Paiement échoué/annulé: ${paiement.id} - ${newStatus}`);
      }

      return updatedPaiement;
    } catch (error) {
      this.logger.error(
        `Erreur lors du traitement du callback PayDunya: ${error.message}`,
      );
      throw error;
    }
  }

  async confirmPayment(paiementId: string, token: string) {
    try {
      // 1. Vérifier le paiement existe
      const paiement = await this.prisma.paiement.findUnique({
        where: { id: paiementId },
        include: { reservation: true },
      });

      if (!paiement) {
        throw new NotFoundException('Paiement introuvable');
      }

      if (paiement.statut === 'CONFIRMEE') {
        throw new BadRequestException('Ce paiement est déjà confirmé');
      }

      // 2. Confirmer auprès de PayDunya
      try {
        await this.paydunya.confirmPayment(token);
      } catch (error) {
        throw new BadRequestException(
          'Impossible de confirmer le paiement avec PayDunya',
        );
      }

      // 3. Mettre à jour le paiement
      const updatedPaiement = await this.prisma.paiement.update({
        where: { id: paiementId },
        data: {
          statut: 'CONFIRMEE',
          datePaiement: new Date(),
        },
        include: { reservation: true },
      });

      // 4. Mettre à jour la réservation
      await this.prisma.reservation.update({
        where: { id: paiement.reservationId },
        data: { statut: 'CONFIRMEE' },
      });

      this.logger.log(`Paiement confirmé: ${paiementId}`);

      return updatedPaiement;
    } catch (error) {
      this.logger.error(`Erreur lors de la confirmation du paiement: ${error.message}`);
      throw error;
    }
  }

  async findAll(filters?: { reservationId?: string; statut?: string }) {
    try {
      const paiements = await this.prisma.paiement.findMany({
        where: {
          ...(filters?.reservationId && {
            reservationId: filters.reservationId,
          }),
          ...(filters?.statut && { statut: filters.statut }),
        },
        include: {
          reservation: {
            include: {
              bien: {
                select: {
                  id: true,
                  titre: true,
                  prix: true,
                },
              },
              locataire: {
                select: {
                  id: true,
                  nom: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: { datePaiement: 'desc' },
      });

      return paiements;
    } catch (error) {
      this.logger.error(`Erreur lors de la récupération des paiements: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const paiement = await this.prisma.paiement.findUnique({
        where: { id },
        include: {
          reservation: {
            include: {
              bien: true,
              locataire: true,
            },
          },
        },
      });

      if (!paiement) {
        throw new NotFoundException('Paiement introuvable');
      }

      return paiement;
    } catch (error) {
      this.logger.error(`Erreur lors de la récupération du paiement: ${error.message}`);
      throw error;
    }
  }

  async update(id: string, updatePaiementDto: UpdatePaiementDto) {
    try {
      const paiement = await this.prisma.paiement.findUnique({
        where: { id },
      });

      if (!paiement) {
        throw new NotFoundException('Paiement introuvable');
      }

      // Empêcher la modification de paiements confirmés
      if (paiement.statut === 'CONFIRMEE') {
        throw new BadRequestException(
          'Impossible de modifier un paiement confirmé',
        );
      }

      const updatedPaiement = await this.prisma.paiement.update({
        where: { id },
        data: updatePaiementDto,
        include: { reservation: true },
      });

      this.logger.log(`Paiement ${id} mis à jour`);

      return updatedPaiement;
    } catch (error) {
      this.logger.error(`Erreur lors de la mise à jour du paiement: ${error.message}`);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const paiement = await this.prisma.paiement.findUnique({
        where: { id },
      });

      if (!paiement) {
        throw new NotFoundException('Paiement introuvable');
      }

      // Empêcher la suppression de paiements confirmés
      if (paiement.statut === 'CONFIRMEE') {
        throw new BadRequestException(
          'Impossible de supprimer un paiement confirmé',
        );
      }

      await this.prisma.paiement.delete({
        where: { id },
      });

      this.logger.log(`Paiement ${id} supprimé`);

      return { success: true, message: 'Paiement supprimé avec succès' };
    } catch (error) {
      this.logger.error(`Erreur lors de la suppression du paiement: ${error.message}`);
      throw error;
    }
  }

  async getPaymentStatistics(startDate?: Date, endDate?: Date) {
    try {
      const where: any = {};

      if (startDate || endDate) {
        where.datePaiement = {};
        if (startDate) where.datePaiement.gte = startDate;
        if (endDate) where.datePaiement.lte = endDate;
      }

      const stats = await this.prisma.paiement.aggregate({
        where: { ...where, statut: 'CONFIRMEE' },
        _sum: { montant: true },
        _count: true,
      });

      const byStatus = await this.prisma.paiement.groupBy({
        by: ['statut'],
        where,
        _sum: { montant: true },
        _count: true,
      });

      return {
        totalConfirmed: stats._sum.montant || 0,
        countConfirmed: stats._count,
        byStatus,
      };
    } catch (error) {
      this.logger.error(
        `Erreur lors de la récupération des statistiques: ${error.message}`,
      );
      throw error;
    }
  }
}
