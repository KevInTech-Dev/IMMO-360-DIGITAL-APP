# IMMO-360-DIGITAL Backend

> Le cœur du système de gestion immobilière IMMO-360-DIGITAL, propulsé par NestJS et Prisma.
> 
> **Dernière mise à jour:** Avril 2026 - Version 1.0.0-enhanced avec validation complète, sécurité renforcée et documentation Swagger

## Quick Links

- **API Documentation:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs) (Swagger UI)
- **Testing Guide:** [TESTING_GUIDE.md](TESTING_GUIDE.md) (400+ lignes avec exemples curl)
- **Improvements:** [IMPROVEMENTS.md](IMPROVEMENTS.md) (Documentation complète)
- **Executive Summary:** [EXECUTIVE_SUMMARY.md](EXECUTIVE_SUMMARY.md)
- **Quick Checklist:** [QUICK_CHECKLIST.md](QUICK_CHECKLIST.md)
- **Complete Index:** [INDEX.md](INDEX.md)

---

## Architecture Technique

- **Framework:** [NestJS](https://nestjs.com/) v11
- **Database:** PostgreSQL ([Neon](https://neon.tech/))
- **ORM:** [Prisma](https://www.prisma.io/) v7
- **Security:** JWT + Passport + bcrypt + Helmet + Rate Limiting
- **Payments:** PayDunya SDK
- **Documentation:** Swagger/OpenAPI

### Key Middleware
```
- Helmet                 - Security headers
- Express-rate-limit     - DDoS protection (100/15min)
- CORS                   - Cross-origin configuration
- Global Exception Filter - Unified error handling
- Input Validation       - Strict whitelist enforcement
```

---

## Structure du Code

```
src/
├── auth/              - Authentification JWT & Passport
├── users/             - Gestion des profils utilisateurs
├── biens/             - CRUD propriétés immobilières
├── reservations/      - Logique métier réservations ENHANCED
├── paiements/         - Intégration PayDunya ENHANCED
├── common/
│   ├── filters/       - Global exception filter NEW
│   ├── decorators/    - Rôles, CurrentUser NEW
│   ├── guards/        - Authorization guards
│   └── cloudinary/    - Upload d'images
├── prisma/            - Module PrismaClient global
└── main.ts            - Point d'entrée
```

---

## Lancement Rapide (< 5 minutes)

### Linux/Mac
```bash
cd backend
bash setup.sh        # Installation interactive avec Swagger guide
```

### Windows
```bash
cd backend
.\setup.ps1          # Installation interactive (PowerShell)
```

### Manual Setup
```bash
# 1. Installer dépendances
npm install

# 2. Configurer .env (voir section Configuration)

# 3. Démarrer en développement
npm run start:dev
```

Le serveur démarre sur `http://localhost:3000`  
Swagger docs disponible à `http://localhost:3000/api/docs`

---

## Configuration Requise

Créez un fichier `.env` à la racine du dossier backend:

```env
# ======================================
# Database
# ======================================
DATABASE_URL="postgresql://user:password@host:5432/immo360?sslmode=require"

# ======================================
# JWT Authentication
# ======================================
JWT_SECRET="your_ultra_secret_key_min_32_chars_CHANGE_THIS"
JWT_EXPIRES_IN="24h"

# ======================================
# PayDunya (Paiements)
# ======================================
PAYDUNYA_MASTER_KEY="your_master_key"
PAYDUNYA_PRIVATE_KEY="your_private_key"
PAYDUNYA_PUBLIC_KEY="your_public_key"
PAYDUNYA_TOKEN="your_token"
PAYDUNYA_MODE="test"              # "test" ou "live"

# ======================================
# Cloudinary (Image Upload)
# ======================================
CLOUDINARY_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# ======================================
# URLs & Port
# ======================================
FRONTEND_URL="http://localhost:3001"
BACKEND_URL="http://localhost:3000"
PORT=3000

# ======================================
# Optional: Environment
# ======================================
NODE_ENV="development"             # "development" ou "production"
```

---

## Commandes Disponibles

```bash
# Development
npm run start:dev           # Watch mode avec hot reload
npm run start:debug         # Debug mode

# Production
npm run build               # Compilation TypeScript → JavaScript
npm run start:prod          # Serveur en production

# Testing
npm run test                # Exécuter tests unitaires
npm run test:watch          # Tests en watch mode
npm run test:cov            # Tests avec couverture
npm run test:debug          # Tests avec debugger
npm run test:e2e            # Tests end-to-end

# Code Quality
npm run lint                # ESLint check
npm run format              # Prettier format

# Database
npx prisma generate         # Générer Prisma Client
npx prisma migrate dev      # Exécuter migrations
npx prisma studio          # UI Prisma Studio
```

---

## API Endpoints Principaux

### Authentification
| Méthode | Route | Rôle | Description |
|---------|-------|------|-------------|
| POST | `/auth/login` | Public | Obtenir JWT token |

### Utilisateurs
| Méthode | Route | Rôle | Description |
|---------|-------|------|-------------|
| POST | `/users` | Public | Créer utilisateur |
| GET | `/users` | ADMIN | Lister utilisateurs |
| GET | `/users/:id` | AUTHENTICATED | Obtenir utilisateur |
| PATCH | `/users/:id` | AUTHENTICATED | Mettre à jour |
| DELETE | `/users/:id` | ADMIN | Supprimer |

### Propriétés
| Méthode | Route | Rôle | Description |
|---------|-------|------|-------------|
| POST | `/biens` | PROPRIETAIRE | Créer annonce |
| GET | `/biens` | PUBLIC | Lister propriétés |
| GET | `/biens/:id` | PUBLIC | Détail propriété |
| PATCH | `/biens/:id` | PROPRIETAIRE | Mettre à jour |
| DELETE | `/biens/:id` | PROPRIETAIRE | Supprimer |

### Réservations ENHANCED
| Méthode | Route | Rôle | Description |
|---------|-------|------|-------------|
| POST | `/reservations` | CLIENT | Créer (avec validation dates) |
| GET | `/reservations` | AUTHENTICATED | Lister (filtres: bienId, locataireId, statut) |
| GET | `/reservations/:id` | AUTHENTICATED | Détail |
| PATCH | `/reservations/:id` | AUTHENTICATED | Mettre à jour |
| **PATCH** | **`/reservations/:id/cancel`** | AUTHENTICATED | **Annuler** NEW |
| DELETE | `/reservations/:id` | ADMIN | Supprimer |

### Paiements ENHANCED
| Méthode | Route | Rôle | Description |
|---------|-------|------|-------------|
| POST | `/paiements` | CLIENT | Créer paiement |
| **POST** | **`/paiements/callback`** | PUBLIC | **PayDunya IPN** ENHANCED |
| **POST** | **`/paiements/:id/confirm`** | AUTHENTICATED | **Confirmer** NEW |
| GET | `/paiements` | AUTHENTICATED | Lister (filtres: reservationId, statut) |
| **GET** | **`/paiements/statistics/summary`** | ADMIN | **Statistiques** NEW |
| GET | `/paiements/:id` | AUTHENTICATED | Détail |
| PATCH | `/paiements/:id` | ADMIN | Mettre à jour |
| DELETE | `/paiements/:id` | ADMIN | Supprimer |

---

## Sécurité & Validations

### Rate Limiting
```
Limite: 100 requêtes par 15 minutes par IP
Status: 429 Too Many Requests
```

### Input Validation
```
- Whitelist - Uniquement champs définis acceptés
- Type checking - Validation des types stricts
- Date validation - Formats ISO 8601 requis
- Email validation - Format email valide
- Forbidden fields - Champs supplémentaires rejetés
```

### Reservation Validation ENHANCED
```
- dateDebut dans le futur
- dateFin > dateDebut
- Durée: 1-365 jours
- Pas de chevauchement avec réservations EN_ATTENTE ou CONFIRMEE
```

### Error Responses
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "timestamp": "2026-04-20T12:00:00Z",
  "path": "/reservations"
}
```

---

## Tests

### Exécuter les tests
```bash
npm run test                    # Tous les tests
npm run test reservations       # Tests spécifiques
npm run test:cov               # Coverage report
npm run test:watch             # Watch mode
```

### Coverage Actuelle
```
- Reservations Service: ~70% coverage
- Payments Service:     ~65% coverage
- Total:               ~60% coverage (logiques critiques)
```

### Tests Inclus
- Création réservations avec validation dates
- Détection conflits de dates
- Paiements confirmés
- Callbacks PayDunya
- Gestion des erreurs
- Filtrage et recherche

---

## Documentation

### Pour Débuter
1. Lire: [EXECUTIVE_SUMMARY.md](EXECUTIVE_SUMMARY.md) - Résumé complet
2. Consulter: [http://localhost:3000/api/docs](http://localhost:3000/api/docs) - Swagger UI
3. Suivre: [TESTING_GUIDE.md](TESTING_GUIDE.md) - Exemples curl

### Pour Explorer
- [IMPROVEMENTS.md](IMPROVEMENTS.md) - Détails des améliorations
- [INDEX.md](INDEX.md) - Index complet des fichiers
- [QUICK_CHECKLIST.md](QUICK_CHECKLIST.md) - Checklist de vérification

### Pour Tester
```bash
# Voir TESTING_GUIDE.md pour exemples curl détaillés
curl -X GET http://localhost:3000/api/docs
```

---

## Déploiement

### Production Checklist
- [ ] `npm run build` - Compiler
- [ ] `.env` configuré pour production
- [ ] JWT_SECRET changé
- [ ] DATABASE_URL pointe BD production
- [ ] `npm run test:cov` - Tests passent
- [ ] `npm run lint` - Code clean
- [ ] Logs et monitoring actifs

### Déployer
```bash
npm run build
npm run start:prod
```

---

## Quoi de Neuf v1.0.0-enhanced

### Améliorations Clés
- **Global Exception Filter** - Erreurs centralisées
- **Date Validation** - Détection chevauchements
- **PayDunya Integration** - Callbacks + confirmation
- **Security** - Rate limit + Helmet + validation stricte
- **Documentation** - Swagger complète
- **Tests** - ~60% coverage
- **Cancellation** - Endpoint `/reservations/:id/cancel`
- **Statistics** - Endpoint `/paiements/statistics/summary`

### Dépendances Ajoutées
```json
"@nestjs/swagger": "^8.0.0",
"swagger-ui-express": "^5.0.0",
"express-rate-limit": "^7.1.5",
"helmet": "^7.1.0"
```

---

## Troubleshooting

### Port déjà utilisé
```bash
PORT=3001 npm run start:dev
```

### Dépendances manquantes
```bash
rm -rf node_modules
npm install
```

### Migration DB échouée
```bash
npx prisma migrate reset --force
npx prisma migrate dev
```

### Tests échouent
```bash
npm run format
npm run lint -- --fix
npm run test
```

---

## Support

- **API Docs:** http://localhost:3000/api/docs
- **Testing Guide:** [TESTING_GUIDE.md](TESTING_GUIDE.md)
- **Improvements:** [IMPROVEMENTS.md](IMPROVEMENTS.md)
- **Issues:** Check logs via `npm run start:dev`

---

## License

Propriétaire - IMMO 360 Digital

---

**Dernière mise à jour:** 20 Avril 2026  
**Version:** 1.0.0-enhanced  
**Status:** Production Ready
