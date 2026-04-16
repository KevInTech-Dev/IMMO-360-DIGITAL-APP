export class Paiement {
  id!: string;
  montant!: number;
  datePaiement?: Date;
  statut!: 'EN_ATTENTE' | 'SUCCES' | 'ECHEC' | 'REMBOURSE';
  referencePayDunya?: string;
  reservationId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
