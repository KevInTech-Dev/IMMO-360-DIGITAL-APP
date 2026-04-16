export class Reservation {
  id!: string;
  dateDebut!: Date;
  dateFin!: Date;
  statut!: 'ATTENTE_PAIEMENT' | 'CONFIRMEE' | 'TERMINEE' | 'ANNULEE';
  montantTotal!: number;
  locataireId!: string;
  bienId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
