# IMMO 360 API - Guide de Test des Endpoints

## Démarrage du serveur

```bash
cd backend
npm install
npm run start:dev
```

Le serveur démarre sur `http://localhost:3000`
La documentation Swagger est disponible sur `http://localhost:3000/api/docs`

---

## Authentification

### 1. Login (Obtenir le JWT token)

**Endpoint:** `POST /auth/login`

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Réponse:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-1",
    "nom": "John Doe",
    "email": "user@example.com",
    "role": "CLIENT"
  }
}
```

Sauvegardez le `access_token` pour les requêtes suivantes.

---

## Tests des Endpoints

### Utiliser le token dans les en-têtes

```bash
TOKEN="votre_token_ici"
BASE_URL="http://localhost:3000"
```

Pour chaque requête protégée, ajoutez:
```bash
-H "Authorization: Bearer $TOKEN"
```

---

## **ENDPOINTS BIENS (Proprietes)**

### 1. Créer un bien

```bash
curl -X POST ${BASE_URL}/biens \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "titre": "Appartement 3 pièces",
    "description": "Bel appartement au centre-ville",
    "prix": 150000,
    "adresse": "123 Rue de la Paix, Dakar",
    "proprietaireId": "user-1",
    "statut": "DISPONIBLE",
    "nombreChambres": 3,
    "nombreSallesBain": 2,
    "surface": 120
  }'
```

### 2. Lister tous les biens

```bash
curl -X GET "${BASE_URL}/biens" \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Obtenir un bien par ID

```bash
BIEN_ID="bien-uuid-here"
curl -X GET "${BASE_URL}/biens/${BIEN_ID}" \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Mettre à jour un bien

```bash
curl -X PATCH "${BASE_URL}/biens/${BIEN_ID}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "prix": 160000,
    "statut": "LOUE"
  }'
```

### 5. Supprimer un bien

```bash
curl -X DELETE "${BASE_URL}/biens/${BIEN_ID}" \
  -H "Authorization: Bearer $TOKEN"
```

---

## **ENDPOINTS RESERVATIONS (Reservations)**

### 1. Créer une réservation

```bash
BIEN_ID="bien-uuid-here"
LOCATAIRE_ID="user-uuid-here"

curl -X POST ${BASE_URL}/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "bienId": "'${BIEN_ID}'",
    "locataireId": "'${LOCATAIRE_ID}'",
    "dateDebut": "2026-06-01T00:00:00Z",
    "dateFin": "2026-06-15T00:00:00Z",
    "montantTotal": 2250000
  }'
```

**Réponse:**
```json
{
  "id": "res-1",
  "bienId": "bien-1",
  "locataireId": "user-2",
  "dateDebut": "2026-06-01T00:00:00Z",
  "dateFin": "2026-06-15T00:00:00Z",
  "statut": "EN_ATTENTE",
  "bien": {
    "id": "bien-1",
    "titre": "Appartement 3 pièces",
    "prix": 150000
  },
  "locataire": {
    "id": "user-2",
    "nom": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

### 2. Lister les réservations avec filtres

```bash
# Tous les réservations
curl -X GET "${BASE_URL}/reservations" \
  -H "Authorization: Bearer $TOKEN"

# Filtrer par bien
curl -X GET "${BASE_URL}/reservations?bienId=${BIEN_ID}" \
  -H "Authorization: Bearer $TOKEN"

# Filtrer par statut
curl -X GET "${BASE_URL}/reservations?statut=CONFIRMEE" \
  -H "Authorization: Bearer $TOKEN"

# Filtrer par locataire
curl -X GET "${BASE_URL}/reservations?locataireId=${LOCATAIRE_ID}" \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Obtenir une réservation

```bash
RES_ID="res-uuid-here"
curl -X GET "${BASE_URL}/reservations/${RES_ID}" \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Mettre à jour une réservation

```bash
curl -X PATCH "${BASE_URL}/reservations/${RES_ID}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "statut": "CONFIRMEE"
  }'
```

### 5. Annuler une réservation

```bash
curl -X PATCH "${BASE_URL}/reservations/${RES_ID}/cancel?reason=Annulation+par+le+client" \
  -H "Authorization: Bearer $TOKEN"
```

### 6. Supprimer une réservation

```bash
curl -X DELETE "${BASE_URL}/reservations/${RES_ID}" \
  -H "Authorization: Bearer $TOKEN"
```

---

## **ENDPOINTS PAIEMENTS (Paiements)**

### 1. Créer un paiement

```bash
RESERVATION_ID="res-uuid-here"

curl -X POST ${BASE_URL}/paiements \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "reservationId": "'${RESERVATION_ID}'",
    "montant": 2250000
  }'
```

**Réponse:**
```json
{
  "id": "paiement-1",
  "reservationId": "res-1",
  "montant": 2250000,
  "statut": "EN_ATTENTE",
  "referencePayDunya": "token-xyz",
  "checkoutUrl": "https://app.paydunya.com/checkout/token-xyz",
  "datePaiement": null
}
```

### 2. Confirmer un paiement

```bash
PAIEMENT_ID="paiement-uuid-here"
PAYDUNYA_TOKEN="paydunya-token-from-checkout"

curl -X POST "${BASE_URL}/paiements/${PAIEMENT_ID}/confirm?token=${PAYDUNYA_TOKEN}" \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Lister les paiements avec filtres

```bash
# Tous les paiements
curl -X GET "${BASE_URL}/paiements" \
  -H "Authorization: Bearer $TOKEN"

# Filtrer par réservation
curl -X GET "${BASE_URL}/paiements?reservationId=${RESERVATION_ID}" \
  -H "Authorization: Bearer $TOKEN"

# Filtrer par statut
curl -X GET "${BASE_URL}/paiements?statut=CONFIRMEE" \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Obtenir les statistiques de paiements

```bash
# Tous les paiements
curl -X GET "${BASE_URL}/paiements/statistics/summary" \
  -H "Authorization: Bearer $TOKEN"

# Avec filtres de date
curl -X GET "${BASE_URL}/paiements/statistics/summary?startDate=2026-01-01&endDate=2026-12-31" \
  -H "Authorization: Bearer $TOKEN"
```

### 5. Obtenir un paiement

```bash
curl -X GET "${BASE_URL}/paiements/${PAIEMENT_ID}" \
  -H "Authorization: Bearer $TOKEN"
```

### 6. Mettre à jour un paiement

```bash
curl -X PATCH "${BASE_URL}/paiements/${PAIEMENT_ID}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "statut": "EN_ATTENTE"
  }'
```

### 7. Supprimer un paiement

```bash
curl -X DELETE "${BASE_URL}/paiements/${PAIEMENT_ID}" \
  -H "Authorization: Bearer $TOKEN"
```

---

## **ENDPOINTS UTILISATEURS (Utilisateurs)**

### 1. Créer un utilisateur

```bash
curl -X POST ${BASE_URL}/users \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Alice Smith",
    "email": "alice@example.com",
    "password": "SecurePass123",
    "telephone": "+221771234567",
    "role": "CLIENT"
  }'
```

### 2. Lister les utilisateurs

```bash
curl -X GET "${BASE_URL}/users" \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Obtenir un utilisateur

```bash
USER_ID="user-uuid-here"
curl -X GET "${BASE_URL}/users/${USER_ID}" \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Mettre à jour un utilisateur

```bash
curl -X PATCH "${BASE_URL}/users/${USER_ID}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "nom": "Alice Johnson",
    "telephone": "+221771234568"
  }'
```

### 5. Uploader une photo de profil

```bash
curl -X POST "${BASE_URL}/users/${USER_ID}/photo" \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/path/to/photo.jpg"
```

### 6. Supprimer un utilisateur

```bash
curl -X DELETE "${BASE_URL}/users/${USER_ID}" \
  -H "Authorization: Bearer $TOKEN"
```

---

## **Gestion des Erreurs**

### Erreur 400 - Validation échouée
```json
{
  "statusCode": 400,
  "message": ["dateDebut must be a Date instance"],
  "error": "Bad Request"
}
```

### Erreur 404 - Ressource introuvable
```json
{
  "statusCode": 404,
  "message": "Bien immobilier non trouvé",
  "error": "Not Found"
}
```

### Erreur 409 - Conflit de dates
```json
{
  "statusCode": 409,
  "message": "Le bien est déjà réservé pour ces dates",
  "error": "Conflict"
}
```

### Erreur 401 - Non autorisé
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

---

## **Utiliser Postman**

1. Importez cette [Collection Postman](./postman-collection.json)
2. Configurez les variables d'environnement:
   - `BASE_URL`: http://localhost:3000
   - `TOKEN`: Votre JWT token
   - `BIEN_ID`: ID d'un bien
   - `RESERVATION_ID`: ID d'une réservation
   - `PAIEMENT_ID`: ID d'un paiement

---

## **Tester les Validations**

### Test 1: Dates chevauchantes
```bash
# Créer réservation 1
curl -X POST ${BASE_URL}/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "bienId": "'${BIEN_ID}'",
    "locataireId": "'${LOCATAIRE_ID}'",
    "dateDebut": "2026-06-01T00:00:00Z",
    "dateFin": "2026-06-15T00:00:00Z",
    "montantTotal": 2250000
  }'

# Créer réservation 2 avec dates chevauchantes (devrait échouer)
curl -X POST ${BASE_URL}/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "bienId": "'${BIEN_ID}'",
    "locataireId": "'${LOCATAIRE_ID2}'",
    "dateDebut": "2026-06-10T00:00:00Z",
    "dateFin": "2026-06-20T00:00:00Z",
    "montantTotal": 2250000
  }'
```

### Test 2: Dates invalides
```bash
# Date de fin avant date de début (devrait échouer)
curl -X POST ${BASE_URL}/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "bienId": "'${BIEN_ID}'",
    "locataireId": "'${LOCATAIRE_ID}'",
    "dateDebut": "2026-06-20T00:00:00Z",
    "dateFin": "2026-06-10T00:00:00Z",
    "montantTotal": 2250000
  }'
```

---

## **Exécuter les tests**

```bash
# Tests unitaires
npm run test

# Tests avec couverture
npm run test:cov

# Tests e2e
npm run test:e2e

# Watch mode
npm run test:watch
```

---

## Notes importantes

- Les dates doivent être en format ISO 8601 (UTC)
- Les montants sont en FCFA (francs CFA)
- Les réservations EN_ATTENTE deviennent CONFIRMEE après paiement
- Un bien ne peut avoir qu'un seul paiement CONFIRMEE actif
- Les utilisateurs doivent avoir un email unique

