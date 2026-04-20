# IMMO 360 Backend - Script d'installation et de test (Windows)
# Ce script aide a configurer et tester les ameliorations du backend

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  IMMO 360 DIGITAL - Script d'installation et de test" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

function Write-Section {
    param([string]$Title)
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "  $Title" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Write-ScriptError {
    param([string]$Message)
    Write-Host "[ERREUR] $Message" -ForegroundColor Red
}

function Write-ScriptInfo {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Cyan
}

function Write-ScriptWarning {
    param([string]$Message)
    Write-Host "[ATTENTION] $Message" -ForegroundColor Yellow
}

# Verifier si on est dans le bon repertoire
if (-not (Test-Path "package.json")) {
    Write-ScriptError "package.json non trouvé!"
    Write-Host "   Veuillez lancer ce script depuis le repertoire backend:" -ForegroundColor Red
    Write-Host "   cd backend" -ForegroundColor Red
    Write-Host "   .\setup.ps1" -ForegroundColor Red
    exit 1
}

# Verifier la version de Node.js
Write-Section "1. Verification de l'installation de Node.js"
$nodeVersion = node --version
if ($LASTEXITCODE -eq 0) {
    Write-Success "Node.js est installe: $nodeVersion"
} else {
    Write-ScriptError "Node.js n'est pas installe!"
    Write-Host "   Veuillez installer Node.js depuis https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Verifier la version de npm
$npmVersion = npm --version
if ($LASTEXITCODE -eq 0) {
    Write-Success "npm est installe: $npmVersion"
} else {
    Write-ScriptError "npm n'est pas installe!"
    exit 1
}

# Installer les dependances
Write-Section "2. Installation des dependances"
if (Test-Path "node_modules") {
    Write-ScriptWarning "node_modules existe deja. Saut de npm install..."
    Write-Host "   Pour reinstaller, supprimez node_modules et executez a nouveau:" -ForegroundColor Yellow
    Write-Host "   Remove-Item node_modules -Recurse -Force" -ForegroundColor Yellow
    Write-Host "   npm install" -ForegroundColor Yellow
} else {
    Write-ScriptInfo "Installation des packages npm... (cela peut prendre quelques minutes)"
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Dependances installees avec succes"
    } else {
        Write-ScriptError "Erreur lors de l'installation des dependances"
        exit 1
    }
}

# Verifier le fichier .env
Write-Section "3. Verification de la configuration d'environnement"
if (Test-Path ".env") {
    Write-Success "Le fichier .env existe"
} else {
    Write-ScriptWarning "Le fichier .env n'a pas ete trouve!"
    Write-Host ""
    Write-Host "   Veuillez creer un fichier .env avec les variables suivantes:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   # Base de donnees" -ForegroundColor DarkGray
    Write-Host "   DATABASE_URL=postgresql://user:password@localhost:5432/immo360" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "   # JWT" -ForegroundColor DarkGray
    Write-Host "   JWT_SECRET=votre_cle_secrete_ici" -ForegroundColor DarkGray
    Write-Host "   JWT_EXPIRES_IN=24h" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "   # Cloudinary" -ForegroundColor DarkGray
    Write-Host "   CLOUDINARY_NAME=votre_cloudinary_name" -ForegroundColor DarkGray
    Write-Host "   CLOUDINARY_API_KEY=votre_api_key" -ForegroundColor DarkGray
    Write-Host "   CLOUDINARY_API_SECRET=votre_api_secret" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "   # PayDunya" -ForegroundColor DarkGray
    Write-Host "   PAYDUNYA_MASTER_KEY=votre_master_key" -ForegroundColor DarkGray
    Write-Host "   PAYDUNYA_PRIVATE_KEY=votre_private_key" -ForegroundColor DarkGray
    Write-Host "   PAYDUNYA_PUBLIC_KEY=votre_public_key" -ForegroundColor DarkGray
    Write-Host "   PAYDUNYA_TOKEN=votre_token" -ForegroundColor DarkGray
    Write-Host "   PAYDUNYA_MODE=test" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "   # URLs" -ForegroundColor DarkGray
    Write-Host "   FRONTEND_URL=http://localhost:3001" -ForegroundColor DarkGray
    Write-Host "   BACKEND_URL=http://localhost:3000" -ForegroundColor DarkGray
    Write-Host "   PORT=3000" -ForegroundColor DarkGray
    Write-Host ""
}

# Afficher les commandes disponibles
Write-Section "4. Commandes disponibles"
Write-Host ""
Write-Host "npm run start:dev        " -ForegroundColor Green -NoNewline
Write-Host "- Demarrer en mode developpement avec rechargement auto"
Write-Host "npm run start:prod       " -ForegroundColor Green -NoNewline
Write-Host "- Demarrer en mode production"
Write-Host "npm run test             " -ForegroundColor Green -NoNewline
Write-Host "- Lancer les tests unitaires"
Write-Host "npm run test:cov         " -ForegroundColor Green -NoNewline
Write-Host "- Lancer les tests avec rapport de couverture"
Write-Host "npm run test:e2e         " -ForegroundColor Green -NoNewline
Write-Host "- Lancer les tests end-to-end"
Write-Host "npm run test:watch       " -ForegroundColor Green -NoNewline
Write-Host "- Lancer les tests en mode watch"
Write-Host "npm run lint             " -ForegroundColor Green -NoNewline
Write-Host "- Lancer ESLint"
Write-Host "npm run format           " -ForegroundColor Green -NoNewline
Write-Host "- Formater le code avec Prettier"
Write-Host "npm run build            " -ForegroundColor Green -NoNewline
Write-Host "- Compiler pour la production"
Write-Host ""

# Afficher les ameliorations
Write-Section "5. Ameliorations clés implementees"
Write-Host ""
Write-Host "[OK] Filtre global des exceptions     " -ForegroundColor Green -NoNewline
Write-Host "- Gestion d'erreurs unifiee"
Write-Host "[OK] Validation des dates             " -ForegroundColor Green -NoNewline
Write-Host "- Previent les chevauchements de reservations"
Write-Host "[OK] Integration PayDunya             " -ForegroundColor Green -NoNewline
Write-Host "- Traitement des callbacks et confirmation"
Write-Host "[OK] Securite renforcee               " -ForegroundColor Green -NoNewline
Write-Host "- Rate limiting, Helmet, validation stricte"
Write-Host "[OK] Documentation Swagger            " -ForegroundColor Green -NoNewline
Write-Host "- API interactive a /api/docs"
Write-Host "[OK] Tests complets                   " -ForegroundColor Green -NoNewline
Write-Host "- Tests unitaires pour la logique critique"
Write-Host "[OK] Controleurs ameliores            " -ForegroundColor Green -NoNewline
Write-Host "- Filtrage et pagination"
Write-Host ""

# Afficher les fichiers de documentation
Write-Section "6. Fichiers de documentation"
Write-Host ""
Write-Host "TESTING_GUIDE.md         " -ForegroundColor Cyan -NoNewline
Write-Host "- Guide complet pour tester tous les endpoints"
Write-Host "IMPROVEMENTS.md          " -ForegroundColor Cyan -NoNewline
Write-Host "- Liste detaillee de toutes les ameliorations"
Write-Host "README.md                " -ForegroundColor Cyan -NoNewline
Write-Host "- Vue d'ensemble du projet"
Write-Host ""

# Afficher les prochaines etapes
Write-Section "7. Pret a commencer?"
Write-Host ""
Write-ScriptInfo "Pour demarrer le serveur de developpement, lancez:"
Write-Host "npm run start:dev" -ForegroundColor Green
Write-Host ""
Write-ScriptInfo "Puis visitez:"
Write-Host "http://localhost:3000/api/docs              " -ForegroundColor Green -NoNewline
Write-Host "- Documentation Swagger"
Write-Host "http://localhost:3000                       " -ForegroundColor Green -NoNewline
Write-Host "- Base de l'API"
Write-Host ""

# Demander de demarrer le serveur
$response = Read-Host "Voulez-vous demarrer le serveur de developpement maintenant? (o/n)"
if ($response -eq "o" -or $response -eq "O") {
    Write-Section "Demarrage du serveur de developpement"
    npm run start:dev
}

Write-Host ""
Write-Section "Installation terminee!"
Write-Host ""
Write-Success "Le backend est pret pour le developpement et les tests"
Write-Host ""
Write-Host "Guide de test detaille: TESTING_GUIDE.md" -ForegroundColor Cyan
Write-Host "Ameliorations effectuees: IMPROVEMENTS.md" -ForegroundColor Cyan
Write-Host ""
