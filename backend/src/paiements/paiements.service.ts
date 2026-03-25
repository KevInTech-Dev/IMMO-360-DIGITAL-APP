import { Injectable } from '@nestjs/common';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaiementsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPaiementDto: CreatePaiementDto) {
    return this.prisma.paiement.create({
      data: createPaiementDto,
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
