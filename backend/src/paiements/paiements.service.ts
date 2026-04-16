import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaydunyaService } from './paydunya.service';

interface PaydunyaInvoiceResponse {
  token?: string;
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
    // 1. Vérifier si la réservation existe
    const reservation = await this.prisma.reservation.findUnique({
      where: { id: createPaiementDto.reservationId },
      include: { bien: true },
    });

    if (!reservation) {
      throw new NotFoundException('Réservation introuvable');
    }

    // 2. Créer la facture PayDunya
    const paydunyaInvoice = (await this.paydunya.createInvoice(
      reservation,
      createPaiementDto.montant || reservation.montantTotal,
    )) as PaydunyaInvoiceResponse;

    const token = paydunyaInvoice?.token;
    if (!token) {
      this.logger.warn('PayDunya token not found in invoice response');
    }

    // 3. Enregistrer le paiement en attente
    return this.prisma.paiement.create({
      data: {
        ...createPaiementDto,
        montant: createPaiementDto.montant || reservation.montantTotal,
        referencePayDunya: token || undefined,
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
