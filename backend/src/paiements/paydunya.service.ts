import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reservation } from '../reservations/entities/reservation.entity';
// @ts-ignore - paydunya is a CommonJS module
import * as paydunya from 'paydunya';

interface PaydunyaSetup {
  masterKey: string;
  privateKey: string;
  publicKey: string;
  token: string;
  mode: string;
}

interface PaydunyaStore {
  name: string;
  tagline: string;
  phoneNumber: string;
  postalAddress: string;
  logoUrl: string;
}

@Injectable()
export class PaydunyaService {
  private readonly logger = new Logger(PaydunyaService.name);
  private setup: any;
  private store: any;

  constructor(private configService: ConfigService) {
    this.setup = new paydunya.Setup({
      masterKey: this.configService.get<string>('PAYDUNYA_MASTER_KEY'),
      privateKey: this.configService.get<string>('PAYDUNYA_PRIVATE_KEY'),
      publicKey: this.configService.get<string>('PAYDUNYA_PUBLIC_KEY'),
      token: this.configService.get<string>('PAYDUNYA_TOKEN'),
      mode: this.configService.get<string>('PAYDUNYA_MODE') || 'test',
    });

    this.store = new paydunya.Store({
      name: 'IMMO 360 DIGITAL',
      tagline: 'Votre partenaire immobilier de confiance',
      phoneNumber: '338000000',
      postalAddress: 'Dakar, Sénégal',
      logoUrl: 'https://immo360.sn/logo.png',
    });
  }

  async createInvoice(reservation: any, amount: number): Promise<any> {
    const invoice = new paydunya.CheckoutInvoice(this.setup, this.store);
    
    invoice.addItem(
      `Réservation Bien: ${reservation.bien.titre}`,
      1,
      amount,
      amount,
      `Réservation du ${reservation.dateDebut.toLocaleDateString()} au ${reservation.dateFin.toLocaleDateString()}`
    );

    invoice.totalAmount = amount;
    invoice.description = `Paiement pour la réservation ${reservation.id}`;

    // Callback URLs
    invoice.returnUrl = `${this.configService.get('FRONTEND_URL')}/reservations/success`;
    invoice.cancelUrl = `${this.configService.get('FRONTEND_URL')}/reservations/cancel`;
    
    // IPN (Instant Payment Notification) URL
    invoice.callbackUrl = `${this.configService.get('BACKEND_URL')}/paiements/callback`;

    try {
      const response = await new Promise((resolve, reject) => {
        invoice.create((success: boolean, response: any) => {
          if (success) {
            resolve(response);
          } else {
            reject(new Error(invoice.responseText || 'Erreur lors de la création de la facture PayDunya'));
          }
        });
      });
      return response;
    } catch (error) {
      this.logger.error(`Erreur PayDunya: ${error.message}`);
      throw error;
    }
  }

  async confirmPayment(token: string) {
    const invoice = new paydunya.CheckoutInvoice(this.setup, this.store);
    return new Promise((resolve, reject) => {
      invoice.confirm(token, (success: boolean, response: any) => {
        if (success) {
          resolve(response);
        } else {
          reject(new Error('Échec de la confirmation du paiement'));
        }
      });
    });
  }
}
