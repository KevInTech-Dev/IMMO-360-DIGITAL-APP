import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export enum StatutPublication {
  BROUILLON = 'BROUILLON',
  PUBLIE = 'PUBLIE',
  ARCHIVE = 'ARCHIVE',
}

export class CreateBienDto {
  @IsString()
  @IsNotEmpty()
  titre: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  prix: number;

  @IsString()
  @IsNotEmpty()
  adresse: string;

  @IsEnum(StatutPublication)
  @IsOptional()
  statutPublication?: StatutPublication;
}
