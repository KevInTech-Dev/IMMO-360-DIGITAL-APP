import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReservationsService {
  private readonly logger = new Logger(ReservationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Check if there are overlapping reservations for a property
   */
  private async checkDateConflicts(
    bienId: string,
    dateDebut: Date,
    dateFin: Date,
    excludeReservationId?: string,
  ): Promise<boolean> {
    const dateDebutTime = new Date(dateDebut).getTime();
    const dateFinTime = new Date(dateFin).getTime();

    const conflictingReservations = await this.prisma.reservation.findMany({
      where: {
        bienId,
        statut: { in: ['EN_ATTENTE', 'CONFIRMEE'] },
        ...(excludeReservationId && { NOT: { id: excludeReservationId } }),
      },
    });

    return conflictingReservations.some((reservation) => {
      const existingStart = new Date(reservation.dateDebut).getTime();
      const existingEnd = new Date(reservation.dateFin).getTime();

      // Check if dates overlap
      return dateDebutTime < existingEnd && dateFinTime > existingStart;
    });
  }

  /**
   * Validate reservation dates
   */
  private validateDates(dateDebut: Date, dateFin: Date): void {
    const now = new Date();
    const dateDebutDate = new Date(dateDebut);
    const dateFinDate = new Date(dateFin);

    if (dateDebutDate <= now) {
      throw new BadRequestException('La date de début doit être dans le futur');
    }

    if (dateFinDate <= dateDebutDate) {
      throw new BadRequestException(
        'La date de fin doit être après la date de début',
      );
    }

    const daysDifference = Math.ceil(
      (dateFinDate.getTime() - dateDebutDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysDifference > 365) {
      throw new BadRequestException(
        'La durée de la réservation ne peut pas dépasser 365 jours',
      );
    }

    if (daysDifference < 1) {
      throw new BadRequestException(
        'La réservation doit être d\'au moins 1 jour',
      );
    }
  }

  async create(createReservationDto: CreateReservationDto) {
    try {
      // Validate dates
      this.validateDates(createReservationDto.dateDebut, createReservationDto.dateFin);

      // Check if property exists
      const bien = await this.prisma.bien.findUnique({
        where: { id: createReservationDto.bienId },
      });

      if (!bien) {
        throw new NotFoundException('Bien immobilier non trouvé');
      }

      // Check if user (locataire) exists
      const locataire = await this.prisma.user.findUnique({
        where: { id: createReservationDto.locataireId },
      });

      if (!locataire) {
        throw new NotFoundException('Locataire non trouvé');
      }

      // Check for date conflicts
      const hasConflict = await this.checkDateConflicts(
        createReservationDto.bienId,
        createReservationDto.dateDebut,
        createReservationDto.dateFin,
      );

      if (hasConflict) {
        throw new ConflictException(
          'Le bien est déjà réservé pour ces dates',
        );
      }

      const reservation = await this.prisma.reservation.create({
        data: {
          ...createReservationDto,
          statut: 'EN_ATTENTE',
        },
        include: {
          locataire: {
            select: {
              id: true,
              nom: true,
              email: true,
              telephone: true,
            },
          },
          bien: {
            select: {
              id: true,
              titre: true,
              prix: true,
            },
          },
        },
      });

      this.logger.log(
        `Reservation created: ${reservation.id} for bien ${reservation.bienId}`,
      );

      return reservation;
    } catch (error) {
      this.logger.error(`Error creating reservation: ${error.message}`);
      throw error;
    }
  }

  async findAll(filters?: { bienId?: string; locataireId?: string; statut?: string }) {
    try {
      const reservations = await this.prisma.reservation.findMany({
        where: {
          ...(filters?.bienId && { bienId: filters.bienId }),
          ...(filters?.locataireId && { locataireId: filters.locataireId }),
          ...(filters?.statut && { statut: filters.statut }),
        },
        include: {
          locataire: {
            select: {
              id: true,
              nom: true,
              email: true,
              telephone: true,
            },
          },
          bien: {
            select: {
              id: true,
              titre: true,
              prix: true,
              proprietaireId: true,
            },
          },
          paiements: {
            select: {
              id: true,
              montant: true,
              statut: true,
              datePaiement: true,
            },
          },
        },
        orderBy: { dateDebut: 'asc' },
      });

      return reservations;
    } catch (error) {
      this.logger.error(`Error fetching reservations: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const reservation = await this.prisma.reservation.findUnique({
        where: { id },
        include: {
          locataire: {
            select: {
              id: true,
              nom: true,
              email: true,
              telephone: true,
            },
          },
          bien: true,
          paiements: true,
        },
      });

      if (!reservation) {
        throw new NotFoundException(`Réservation ${id} non trouvée`);
      }

      return reservation;
    } catch (error) {
      this.logger.error(`Error fetching reservation ${id}: ${error.message}`);
      throw error;
    }
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    try {
      // Check if reservation exists
      const reservation = await this.prisma.reservation.findUnique({
        where: { id },
      });

      if (!reservation) {
        throw new NotFoundException(`Réservation ${id} non trouvée`);
      }

      // If dates are being updated, validate for conflicts
      if (
        updateReservationDto.dateDebut ||
        updateReservationDto.dateFin
      ) {
        const dateDebut = updateReservationDto.dateDebut || reservation.dateDebut;
        const dateFin = updateReservationDto.dateFin || reservation.dateFin;

        this.validateDates(dateDebut, dateFin);

        const hasConflict = await this.checkDateConflicts(
          reservation.bienId,
          dateDebut,
          dateFin,
          id,
        );

        if (hasConflict) {
          throw new ConflictException(
            'Le bien est déjà réservé pour ces dates',
          );
        }
      }

      const updatedReservation = await this.prisma.reservation.update({
        where: { id },
        data: updateReservationDto,
        include: {
          locataire: true,
          bien: true,
          paiements: true,
        },
      });

      this.logger.log(`Reservation ${id} updated`);

      return updatedReservation;
    } catch (error) {
      this.logger.error(`Error updating reservation ${id}: ${error.message}`);
      throw error;
    }
  }

  async cancel(id: string, reason?: string) {
    try {
      const reservation = await this.prisma.reservation.findUnique({
        where: { id },
      });

      if (!reservation) {
        throw new NotFoundException(`Réservation ${id} non trouvée`);
      }

      if (reservation.statut === 'ANNULEE') {
        throw new BadRequestException('La réservation est déjà annulée');
      }

      const cancelledReservation = await this.prisma.reservation.update({
        where: { id },
        data: {
          statut: 'ANNULEE',
        },
        include: {
          locataire: true,
          bien: true,
          paiements: true,
        },
      });

      this.logger.log(`Reservation ${id} cancelled. Reason: ${reason || 'No reason provided'}`);

      return cancelledReservation;
    } catch (error) {
      this.logger.error(`Error cancelling reservation ${id}: ${error.message}`);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const reservation = await this.prisma.reservation.findUnique({
        where: { id },
      });

      if (!reservation) {
        throw new NotFoundException(`Réservation ${id} non trouvée`);
      }

      // Prevent deletion of confirmed or completed reservations
      if (['CONFIRMEE', 'COMPLETEE'].includes(reservation.statut)) {
        throw new BadRequestException(
          'Impossible de supprimer une réservation confirmée ou complétée',
        );
      }

      await this.prisma.reservation.delete({
        where: { id },
      });

      this.logger.log(`Reservation ${id} deleted`);

      return { success: true, message: 'Réservation supprimée avec succès' };
    } catch (error) {
      this.logger.error(`Error deleting reservation ${id}: ${error.message}`);
      throw error;
    }
  }
}
