export class Bien {
  id!: string;
  titre!: string;
  description!: string;
  prix!: number;
  adresse!: string;
  statutPublication!: 'BROUILLON' | 'PUBLIE' | 'ARCHIVE';
  isActive!: boolean;
  proprietaireId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
