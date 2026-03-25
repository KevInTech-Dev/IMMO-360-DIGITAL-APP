# IMMO-360-DIGITAL-APP

Plateforme moderne de gestion immobilière avec fonctionnalités de visites 3D et paiements intégrés.

## Fonctionnalités
- **Gestion des Biens** : Publication, modification et recherche d'annonces immobilières.
- **Réservations en ligne** : Système de réservation fluide pour les locataires.
- **Paiements Sécurisés** : Intégration de **PayDunya** pour des transactions automatiques.
- **Sécurité Avancée** : Authentification JWT et gestion des accès par rôles (Admin, Propriétaire, Client).
- **Visites 3D** : (En cours) Immersion totale dans les propriétés.

## Stack Technique
- **Backend** : NestJS (Node.js framework)
- **Base de données** : PostgreSQL (Neon)
- **ORM** : Prisma
- **Authentification** : Passport JWT & bcrypt
- **Paiement** : SDK PayDunya

## Installation (Backend)

1. Accédez au dossier backend :
   ```bash
   cd backend
   ```

2. Installez les dépendances :
   ```bash
   npm install --legacy-peer-deps
   ```

3. Configurez les variables d'environnement (`.env`) :
   ```env
   DATABASE_URL="votre_url_neon"
   JWT_SECRET="votre_secret"
   PAYDUNYA_MASTER_KEY="votre_key"
   # ... voir .env.example
   ```

4. Lancez les migrations Prisma :
   ```bash
   npx prisma migrate dev
   ```

5. Démarrez le serveur :
   ```bash
   npm run start:dev
   ```

## Sécurité & API
Toutes les routes de l'API (sauf `/auth/login` et `/paiements/callback`) nécessitent un token JWT valide dans le header `Authorization`.

| Rôle | Permissions |
| :--- | :--- |
| **ADMIN** | Contrôle total du système et des utilisateurs. |
| **PROPRIETAIRE** | Gestion de ses propres biens et réservations. |
| **CLIENT** | Consultation et réservation de biens. |

## Licence
Propriété de IMMO-360-DIGITAL.

## Auteurs
- Caleb ADJEODA (ReedBelca) : [calebadjeoda@gmail.com]
- Kévin ADJAKLI (KevDevInTech) : [EMAIL_ADDRESS]