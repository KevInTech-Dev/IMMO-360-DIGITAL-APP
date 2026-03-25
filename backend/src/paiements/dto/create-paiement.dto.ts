import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum StatutPaiement {
  EN_ATTENTE = 'EN_ATTENTE',
  SUCCES = 'SUCCES',
  ECHEC = 'ECHEC',
  REMBOURSE = 'REMBOURSE',
}

export class CreatePaiementDto {
  @IsNumber()
  @Min(0)
  montant: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  datePaiement?: Date;

  @IsEnum(StatutPaiement)
  @IsOptional()
  statut?: StatutPaiement;

  @IsString()
  @IsOptional()
  referencePayDunya?: string;

  @IsString()
  @IsNotEmpty()
  reservationId: string;
}
