import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger } from '@nestjs/common';
import { PaiementsService } from './paiements.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/dto/create-user.dto';

interface PayDunyaCallback {
  status?: string;
  token?: string;
  amount?: number;
  [key: string]: unknown;
}

@Controller('paiements')
export class PaiementsController {
  private readonly logger = new Logger(PaiementsController.name);

  constructor(private readonly paiementsService: PaiementsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard) // Garder la protection pour la création manuelle
  create(@Body() createPaiementDto: CreatePaiementDto) {
    return this.paiementsService.create(createPaiementDto);
  }

  @Post('callback') // IPN de PayDunya
  async handleCallback(@Body() body: PayDunyaCallback) {
    // Logique IPN : Vérifier le token et mettre à jour le statut
    // Dans une implémentation réelle, on vérifierait l'IPN de PayDunya
    this.logger.log(`PayDunya IPN received: ${JSON.stringify(body)}`);
    return { status: 'success' };
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.paiementsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.paiementsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updatePaiementDto: UpdatePaiementDto) {
    return this.paiementsService.update(id, updatePaiementDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.paiementsService.remove(id);
  }
}
