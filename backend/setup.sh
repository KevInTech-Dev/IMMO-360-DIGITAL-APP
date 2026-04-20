#!/bin/bash

# IMMO 360 Backend - Script d'installation et de test
# Ce script aide a configurer et tester les ameliorations du backend

set -e

echo "════════════════════════════════════════════════════════════"
echo "  IMMO 360 DIGITAL - Script d'installation et de test"
echo "════════════════════════════════════════════════════════════"
echo ""

# Codes de couleur
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verifier si on est dans le bon repertoire
if [ ! -f "package.json" ]; then
    echo -e "${RED}Erreur: package.json non trouvé!${NC}"
    echo "   Veuillez lancer ce script depuis le repertoire backend:"
    echo "   cd backend && bash setup.sh"
    exit 1
fi

# Fonction pour afficher les en-tetes de section
print_section() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# Fonction pour afficher les succes
print_success() {
    echo -e "${GREEN}[OK] $1${NC}"
}

# Fonction pour afficher les infos
print_info() {
    echo -e "${BLUE}[INFO] $1${NC}"
}

# Fonction pour afficher les avertissements
print_warning() {
    echo -e "${YELLOW}[ATTENTION] $1${NC}"
}

# Verifier la version de Node.js
print_section "Verification de l'installation de Node.js"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    print_success "Node.js est installe: $NODE_VERSION"
else
    echo -e "${RED}Erreur: Node.js n'est pas installe!${NC}"
    echo "   Veuillez installer Node.js depuis https://nodejs.org/"
    exit 1
fi

# Verifier la version de npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    print_success "npm est installe: $NPM_VERSION"
else
    echo -e "${RED}Erreur: npm n'est pas installe!${NC}"
    exit 1
fi

# Installer les dependances
print_section "Installation des dependances"
if [ -d "node_modules" ]; then
    print_warning "node_modules existe deja. Saut de npm install..."
    echo "   Pour reinstaller, supprimez node_modules et executez a nouveau:"
    echo "   rm -rf node_modules pnpm-lock.yaml && npm install"
else
    print_info "Installation des packages npm... (cela peut prendre quelques minutes)"
    npm install
    print_success "Dependances installees avec succes"
fi

# Verifier le fichier .env
print_section "Verification de la configuration d'environnement"
if [ -f ".env" ]; then
    print_success "Le fichier .env existe"
else
    print_warning "Le fichier .env n'a pas ete trouve!"
    echo "   Veuillez creer un fichier .env avec les variables suivantes:"
    echo ""
    echo "   # Base de donnees"
    echo "   DATABASE_URL=postgresql://user:password@localhost:5432/immo360"
    echo ""
    echo "   # JWT"
    echo "   JWT_SECRET=votre_cle_secrete_ici"
    echo "   JWT_EXPIRES_IN=24h"
    echo ""
    echo "   # Cloudinary"
    echo "   CLOUDINARY_NAME=votre_cloudinary_name"
    echo "   CLOUDINARY_API_KEY=votre_api_key"
    echo "   CLOUDINARY_API_SECRET=votre_api_secret"
    echo ""
    echo "   # PayDunya"
    echo "   PAYDUNYA_MASTER_KEY=votre_master_key"
    echo "   PAYDUNYA_PRIVATE_KEY=votre_private_key"
    echo "   PAYDUNYA_PUBLIC_KEY=votre_public_key"
    echo "   PAYDUNYA_TOKEN=votre_token"
    echo "   PAYDUNYA_MODE=test"
    echo ""
    echo "   # URLs"
    echo "   FRONTEND_URL=http://localhost:3001"
    echo "   BACKEND_URL=http://localhost:3000"
    echo "   PORT=3000"
    echo ""
fi

# Afficher les commandes disponibles
print_section "Commandes disponibles"
echo ""
echo -e "${GREEN}npm run start:dev${NC}        - Demarrer en mode developpement avec rechargement auto"
echo -e "${GREEN}npm run start:prod${NC}       - Demarrer en mode production"
echo -e "${GREEN}npm run test${NC}             - Lancer les tests unitaires"
echo -e "${GREEN}npm run test:cov${NC}         - Lancer les tests avec rapport de couverture"
echo -e "${GREEN}npm run test:e2e${NC}         - Lancer les tests end-to-end"
echo -e "${GREEN}npm run test:watch${NC}       - Lancer les tests en mode watch"
echo -e "${GREEN}npm run lint${NC}             - Lancer ESLint"
echo -e "${GREEN}npm run format${NC}           - Formater le code avec Prettier"
echo -e "${GREEN}npm run build${NC}            - Compiler pour la production"
echo ""

# Afficher les ameliorations
print_section "Ameliorations clés implementees"
echo ""
echo -e "${GREEN}[OK] Filtre global des exceptions${NC}     - Gestion d'erreurs unifiee"
echo -e "${GREEN}[OK] Validation des dates${NC}            - Previent les chevauchements de reservations"
echo -e "${GREEN}[OK] Integration PayDunya${NC}            - Traitement des callbacks et confirmation"
echo -e "${GREEN}[OK] Securite renforcee${NC}              - Rate limiting, Helmet, validation stricte"
echo -e "${GREEN}[OK] Documentation Swagger${NC}           - API interactive a /api/docs"
echo -e "${GREEN}[OK] Tests complets${NC}                  - Tests unitaires pour la logique critique"
echo -e "${GREEN}[OK] Controleurs ameliores${NC}           - Filtrage et pagination"
echo ""

# Afficher les fichiers de documentation
print_section "Fichiers de documentation"
echo ""
echo -e "${BLUE}TESTING_GUIDE.md${NC}         - Guide complet pour tester tous les endpoints"
echo -e "${BLUE}IMPROVEMENTS.md${NC}          - Liste detaillee de toutes les ameliorations"
echo -e "${BLUE}README.md${NC}                - Vue d'ensemble du projet"
echo ""

# Demander si on peut demarrer le serveur
print_section "Pret a commencer?"
echo ""
print_info "Pour demarrer le serveur de developpement, lancez:"
echo -e "${GREEN}npm run start:dev${NC}"
echo ""
print_info "Puis visitez:"
echo -e "${GREEN}http://localhost:3000/api/docs${NC}              - Documentation Swagger"
echo -e "${GREEN}http://localhost:3000${NC}                       - Base de l'API"
echo ""

# Demarrage rapide
read -p "Voulez-vous demarrer le serveur de developpement maintenant? (o/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Oo]$ ]]; then
    print_section "Demarrage du serveur de developpement"
    npm run start:dev
fi

echo ""
print_section "Installation terminee!"
echo ""
print_success "Le backend est pret pour le developpement et les tests"
echo ""
echo "Guide de test detaille: TESTING_GUIDE.md"
echo "Ameliorations effectuees: IMPROVEMENTS.md"
echo ""
