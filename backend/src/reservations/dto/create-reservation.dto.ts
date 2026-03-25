import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum StatutReservation {
  ATTENTE_PAIEMENT = 'ATTENTE_PAIEMENT',
  CONFIRMEE = 'CONFIRMEE',
  TERMINEE = 'TERMINEE',
  ANNULEE = 'ANNULEE',
}

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dateDebut: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dateFin: Date;

  @IsNumber()
  @Min(0)
  montantTotal: number;

  @IsEnum(StatutReservation)
  @IsOptional()
  statut?: StatutReservation;

  @IsString()
  @IsNotEmpty()
  locataireId: string;

  @IsString()
  @IsNotEmpty()
  bienId: string;
}
