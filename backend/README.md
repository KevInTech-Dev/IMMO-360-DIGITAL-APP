# IMMO-360-DIGITAL Backend

Le cœur du système de gestion immobilière IMMO-360-DIGITAL, propulsé par NestJS et Prisma.

## Architecture Technique
- **Framework** : [NestJS](https://nestjs.com/) v11
- **Base de données** : PostgreSQL hébergé sur [Neon](https://neon.tech/)
- **ORM** : [Prisma](https://www.prisma.io/) v7
- **Sécurité** : 
  - Authentification JWT (Passport)
  - Hachage de mots de passe (bcrypt)
  - Authorization Guard basé sur les Rôles
- **Paiement** : SDK Officiel PayDunya

## Structure du Code
- `src/auth` : Logique d'authentification, stratégie JWT et login.
- `src/users` : Gestion des profils et hachage sécurisé.
- `src/biens` : CRUD des annonces immobilières.
- `src/reservations` : Logique métier des réservations.
- `src/paiements` : Intégration PayDunya (Checkout & IPN Callback).
- `src/prisma` : Module global pour l'instance PrismaClient.
- `src/common` : Décorateurs, Guards et éléments partagés.

## Configuration Requise

Créez un fichier `.env` à la racine de ce dossier :

```env
# Database
DATABASE_URL="postgresql://user:pass@ep-restless-bird.aws.neon.tech/neondb?sslmode=require"

# Security
JWT_SECRET="votre_cle_secrete_ultra_longue"
JWT_EXPIRES_IN="1d"

# PayDunya
PAYDUNYA_MASTER_KEY="votre_master_key"
PAYDUNYA_PRIVATE_KEY="votre_private_key"
PAYDUNYA_PUBLIC_KEY="votre_public_key"
PAYDUNYA_TOKEN="votre_token"
PAYDUNYA_MODE="test" # ou "live"

# URLs
FRONTEND_URL="http://localhost:3000"
BACKEND_URL="http://localhost:3001"
```

## Lancement Rapide

```bash
# 1. Installation
npm install --legacy-peer-deps

# 2. Synchronisation DB
npx prisma generate
npx prisma migrate dev

# 3. Développement
npm run start:dev

# 4. Production
npm run build
npm run start:prod
```

## Détail des API (Endpoints)

| Méthode | Route | Rôle requis | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/auth/login` | Public | Obtenir un token JWT |
| **POST** | `/users` | ADMIN | Création d'un utilisateur |
| **GET** | `/biens` | CLIENT/PROPRIO | Liste des annonces |
| **POST** | `/biens` | PROPRIO/ADMIN | Création d'annonce |
| **POST** | `/paiements` | CLIENT | Initier un paiement PayDunya |
| **POST** | `/paiements/callback` | Public | Notification IPN PayDunya |

## Dépendances Principales
- `@nestjs/jwt` & `@nestjs/passport`
- `@prisma/client` & `prisma`
- `bcrypt` & `class-validator`
- `paydunya`
