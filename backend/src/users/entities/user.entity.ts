export class User {
  id!: string;
  nom!: string;
  email!: string;
  password?: string; // Never expose in response
  role!: 'CLIENT' | 'PROPRIETAIRE' | 'ADMIN';
  telephone?: string;
  photoUrl?: string;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
