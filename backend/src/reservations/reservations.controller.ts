import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/dto/create-user.dto';

@ApiTags('Reservations')
@ApiBearerAuth('access-token')
@Controller('reservations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @Roles(UserRole.CLIENT, UserRole.PROPRIETAIRE)
  async create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  @ApiQuery({ name: 'bienId', required: false, description: 'Filter by property ID' })
  @ApiQuery({
    name: 'locataireId',
    required: false,
    description: 'Filter by tenant ID',
  })
  @ApiQuery({
    name: 'statut',
    required: false,
    enum: ['EN_ATTENTE', 'CONFIRMEE', 'COMPLETEE', 'ANNULEE'],
    description: 'Filter by reservation status',
  })
  async findAll(
    @Query('bienId') bienId?: string,
    @Query('locataireId') locataireId?: string,
    @Query('statut') statut?: string,
  ) {
    return this.reservationsService.findAll({
      bienId,
      locataireId,
      statut,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.CLIENT, UserRole.PROPRIETAIRE, UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Patch(':id/cancel')
  @Roles(UserRole.CLIENT, UserRole.PROPRIETAIRE, UserRole.ADMIN)
  async cancel(
    @Param('id') id: string,
    @Query('reason') reason?: string,
  ) {
    return this.reservationsService.cancel(id, reason);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.PROPRIETAIRE)
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
