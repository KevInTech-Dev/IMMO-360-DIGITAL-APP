import { Injectable } from '@nestjs/common';
import { CreateBienDto, StatutPublication } from './dto/create-bien.dto';
import { UpdateBienDto } from './dto/update-bien.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BiensService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBienDto: CreateBienDto) {
    return this.prisma.bien.create({
      data: {
        ...createBienDto,
        statutPublication: StatutPublication.BROUILLON,
      },
    });
  }

  findAll() {
    return this.prisma.bien.findMany({
      where: { isActive: true },
      include: { proprietaire: true },
    });
  }

  findOne(id: string) {
    return this.prisma.bien.findUnique({
      where: { id },
      include: { proprietaire: true, reservations: true },
    });
  }

  update(id: string, updateBienDto: UpdateBienDto) {
    return this.prisma.bien.update({
      where: { id },
      data: updateBienDto,
    });
  }

  remove(id: string) {
    return this.prisma.bien.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
