import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaydunyaService } from './paydunya.service';

@Injectable()
export class PaiementsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paydunya: PaydunyaService,
  ) {}

  async create(createPaiementDto: CreatePaiementDto) {
    // 1. Vérifier si la réservation existe
    const reservation = await this.prisma.reservation.findUnique({
      where: { id: createPaiementDto.reservationId },
      include: { bien: true },
    });

    if (!reservation) {
      throw new NotFoundException('Réservation introuvable');
    }

    // 2. Créer la facture PayDunya
    const paydunyaInvoice = await this.paydunya.createInvoice(
      reservation,
      createPaiementDto.montant || reservation.montantTotal,
    );

    // 3. Enregistrer le paiement en attente
    return this.prisma.paiement.create({
      data: {
        ...createPaiementDto,
        montant: createPaiementDto.montant || reservation.montantTotal,
        referencePayDunya: (paydunyaInvoice as any).token,
        statut: 'EN_ATTENTE',
      },
    });
  }

  findAll() {
    return this.prisma.paiement.findMany({
      include: {
        reservation: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.paiement.findUnique({
      where: { id },
      include: {
        reservation: true,
      },
    });
  }

  update(id: string, updatePaiementDto: UpdatePaiementDto) {
    return this.prisma.paiement.update({
      where: { id },
      data: updatePaiementDto,
    });
  }

  remove(id: string) {
    return this.prisma.paiement.delete({
      where: { id },
    });
  }
}
