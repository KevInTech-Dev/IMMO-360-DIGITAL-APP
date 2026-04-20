import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
  ApiOperation,
} from '@nestjs/swagger';
import { PaiementsService } from './paiements.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/dto/create-user.dto';

interface PayDunyaCallback {
  status?: 'completed' | 'failed' | 'cancelled';
  token?: string;
  amount?: number;
  [key: string]: unknown;
}

@ApiTags('Paiements')
@ApiBearerAuth('access-token')
@Controller('paiements')
export class PaiementsController {
  private readonly logger = new Logger(PaiementsController.name);

  constructor(private readonly paiementsService: PaiementsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT, UserRole.PROPRIETAIRE)
  @ApiOperation({ summary: 'Creer un nouveau paiement' })
  async create(@Body() createPaiementDto: CreatePaiementDto) {
    return this.paiementsService.create(createPaiementDto);
  }

  @Post('callback')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Callback IPN PayDunya',
    description: 'Point d\'entree webhook pour les notifications de paiement instantane de PayDunya',
  })
  async handleCallback(@Body() body: PayDunyaCallback) {
    try {
      // Parser et traiter le callback
      if (body.token && body.status) {
        const result = await this.paiementsService.handlePaydunyaCallback({
          status: body.status,
          token: body.token,
          ...body,
        });
        return { status: 'success', data: result };
      }

      this.logger.warn(`Callback PayDunya invalide: ${JSON.stringify(body)}`);
      return { status: 'invalid_payload' };
    } catch (error) {
      this.logger.error(`Erreur lors du traitement du callback PayDunya: ${error.message}`);
      return { status: 'error', message: error.message };
    }
  }

  @Post(':id/confirm')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT, UserRole.PROPRIETAIRE, UserRole.ADMIN)
  @ApiOperation({ summary: 'Confirmer un paiement avec un token PayDunya' })
  async confirmPayment(
    @Param('id') id: string,
    @Query('token') token: string,
  ) {
    return this.paiementsService.confirmPayment(id, token);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PROPRIETAIRE)
  @ApiQuery({
    name: 'reservationId',
    required: false,
    description: 'Filtrer par ID de reservation',
  })
  @ApiQuery({
    name: 'statut',
    required: false,
    enum: ['EN_ATTENTE', 'CONFIRMEE', 'ECHOUEE', 'ANNULEE'],
    description: 'Filtrer par statut de paiement',
  })
  @ApiOperation({ summary: 'Obtenir tous les paiements avec filtres optionnels' })
  async findAll(
    @Query('reservationId') reservationId?: string,
    @Query('statut') statut?: string,
  ) {
    return this.paiementsService.findAll({
      reservationId,
      statut,
    });
  }

  @Get('statistics/summary')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PROPRIETAIRE)
  @ApiQuery({
    name: 'startDate',
    required: false,
    description: 'Date de debut pour les statistiques (format ISO)',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    description: 'Date de fin pour les statistiques (format ISO)',
  })
  @ApiOperation({ summary: 'Obtenir les statistiques de paiement' })
  async getStatistics(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.paiementsService.getPaymentStatistics(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Obtenir un paiement par ID' })
  async findOne(@Param('id') id: string) {
    return this.paiementsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PROPRIETAIRE)
  @ApiOperation({ summary: 'Mettre a jour un paiement' })
  async update(
    @Param('id') id: string,
    @Body() updatePaiementDto: UpdatePaiementDto,
  ) {
    return this.paiementsService.update(id, updatePaiementDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Supprimer un paiement' })
  async remove(@Param('id') id: string) {
    return this.paiementsService.remove(id);
  }
}
